import edsim51sh.Assembler;
import edsim51sh.Cpu;
import edsim51sh.instructions.Instruction;
import edsim51sh.instructions.InstructionInfo;
import java.lang.reflect.*;
import java.nio.file.*;
import java.util.*;
class Q56FirmwareAudit {
 static InstructionInfo[] image;
 static Field cycles;
 static int pass=0,fail=0;
 static long ins=0;
 static final int[] OUT={0xEC,0xD9,0xDC,0xEA,0xFC,0xD9,0xBC,0xFC};
 interface Case {void run() throws Exception;}
 static void need(boolean b,String s){if(!b)throw new AssertionError(s);}
 static class Sim {
  Cpu cpu=new Cpu(); Vector<Integer> bp=new Vector<>(); int pins,prev=255;
  Sim(int p)throws Exception{cpu.reset();cpu.setMachineCycleLength(1);cpu.loadCode(image);pins=p;apply();}
  void apply(){for(int b=0;b<8;b++)if((pins&(1<<b))==0)cpu.memory.port2.hardwareClearPortPin(b,123);else cpu.memory.port2.hardwareSetPortPin(b,123);}
  void pin(int b,boolean high){pins=high?pins|(1<<b):pins&~(1<<b);apply();}
  long us()throws Exception{return cycles.getLong(cpu);}
  int p1()throws Exception{return cpu.memory.readPortLatches(Cpu.P1);}
  int state()throws Exception{return cpu.memory.readPortLatches(Cpu.P0)&7;}
  void step()throws Exception{
   cpu.executeInstructions(1,bp,false);ins++;int now=p1();
   need(cpu.memory.readPortLatches(Cpu.P2)==255,"P2 latch changed");
   if((now&3)!=(prev&3))need((now&4)!=0&&(prev&4)!=0,"direction changed without disabled enable");
   if(now!=255)need((now&3)!=3,"both direction bits set");prev=now;
  }
  void run(double ms)throws Exception{long end=us()+Math.round(ms*1000);while(us()<end)step();}
  void await(int s,double ms)throws Exception{long end=us()+Math.round(ms*1000);while(us()<end&&(state()!=s||p1()!=OUT[s]))step();need(state()==s&&p1()==OUT[s],"expected state "+s+", got "+state()+" P1="+Integer.toHexString(p1()));run(.1);}
  void stay(int s,double ms)throws Exception{long end=us()+Math.round(ms*1000);while(us()<end){step();need(state()==s,"left state "+s+" -> "+state());}need(p1()==OUT[s],"output mismatch");}
 }
 static Sim closed()throws Exception{Sim s=new Sim(0x6F);s.await(0,50);s.run(1);return s;}
 static Sim opening()throws Exception{Sim s=closed();s.pin(0,false);s.await(1,30);s.pin(0,true);s.pin(4,true);return s;}
 static Sim hold()throws Exception{Sim s=opening();s.run(1);s.pin(3,false);s.await(2,30);s.run(25);return s;}
 static Sim closing()throws Exception{Sim s=hold();s.pin(5,false);s.await(3,30);s.pin(5,true);s.pin(3,true);return s;}
 static Sim coast()throws Exception{Sim s=closing();s.pin(2,false);s.await(4,25);return s;}
 static Sim reopening()throws Exception{Sim s=coast();s.await(5,220);return s;}
 static Sim safehold()throws Exception{Sim s=reopening();s.pin(3,false);s.await(6,30);return s;}
 static void test(String n,Case c){try{c.run();pass++;System.out.println("PASS "+n);}catch(Throwable e){fail++;System.out.println("FAIL "+n+": "+e.getMessage());}}
 public static void main(String[] a)throws Exception{
  cycles=Cpu.class.getDeclaredField("programCycles");cycles.setAccessible(true);
  var asm=new Assembler(null,Files.readString(Path.of(a[0])));
  Method f=Assembler.class.getDeclaredMethod("firstPass"),g=Assembler.class.getDeclaredMethod("secondPass",Instruction[].class);f.setAccessible(true);g.setAccessible(true);
  image=(InstructionInfo[])g.invoke(asm,f.invoke(asm));
  System.out.println("ASSEMBLY PASS");
  test("boot closed",()->closed().stay(0,50));
  test("boot open",()->{Sim s=new Sim(0x77);s.await(2,50);s.stay(2,60);});
  test("boot neither limit",()->{Sim s=new Sim(0x7F);s.await(7,50);});
  test("boot both limits",()->{Sim s=new Sim(0x67);s.await(7,50);});
  test("boot E-stop",()->{Sim s=new Sim(0xEF);s.await(7,50);});
  test("inside button opens",()->opening());
  test("outside button opens",()->{Sim s=closed();s.pin(1,false);s.await(1,30);});
  test("opening debounce rejects 10 ms",()->{Sim s=closed();s.pin(0,false);s.run(10);s.pin(0,true);s.stay(0,30);});
  test("no automatic close for 6 s",()->hold().stay(2,6000));
  test("new close command accepted",()->closing());
  test("old close held on entering hold rejected",()->{Sim s=opening();s.pin(5,false);s.pin(3,false);s.await(2,30);s.stay(2,70);});
  test("release below 20 ms rejected",()->{Sim s=opening();s.pin(5,false);s.pin(3,false);s.await(2,30);s.pin(5,true);s.run(10);s.pin(5,false);s.stay(2,50);});
  test("fresh close press below 20 ms rejected",()->{Sim s=hold();s.pin(5,false);s.run(10);s.pin(5,true);s.stay(2,40);});
  test("blocked close not saved for beam restoration",()->{Sim s=hold();s.pin(2,false);s.pin(5,false);s.run(40);s.pin(2,true);s.stay(2,40);s.pin(5,true);s.run(25);s.pin(5,false);s.await(3,30);});
  test("open-button guard rejects close",()->{Sim s=hold();s.pin(0,false);s.pin(5,false);s.run(40);s.pin(0,true);s.stay(2,40);});
  test("closing reaches LC",()->{Sim s=closing();s.pin(4,false);s.await(0,25);});
  test("beam response without 20 ms blind window",()->{Sim s=closing();s.run(1);long t=s.us();s.pin(2,false);while((s.p1()&4)==0&&s.us()-t<1000)s.step();need((s.p1()&4)!=0&&s.us()-t<1000,"cutoff >=1 ms");System.out.println("MEASURE beam-to-RUN_N "+(s.us()-t)+" us");});
  test("coast at least 200 ms",()->{Sim s=closing();s.pin(2,false);while((s.p1()&4)==0)s.step();long t=s.us();s.await(5,230);long d=s.us()-t;need(d>=200000,"coast too short");System.out.println("MEASURE coast including await settling "+d+" us");});
  test("obstacle reopening ends in safety hold",()->safehold().stay(6,6000));
  test("manual reopening ends in open hold",()->{Sim s=closing();s.pin(1,false);s.await(4,25);s.pin(1,true);s.await(5,220);s.pin(3,false);s.await(2,30);});
  test("beam priority over LC",()->{Sim s=closing();s.pin(2,false);s.pin(4,false);s.await(4,25);});
  test("beam priority over manual open",()->{Sim s=closing();s.pin(2,false);s.pin(0,false);s.await(4,25);s.pin(0,true);s.await(5,220);s.pin(3,false);s.await(6,30);});
  test("safety hold valid re-close",()->{Sim s=safehold();s.pin(2,true);s.pin(5,false);s.stay(6,40);s.pin(5,true);s.run(25);s.pin(5,false);s.await(3,30);});
  for(int state=0;state<7;state++){final int st=state;
   test("global E-stop state "+st,()->{Sim s=switch(st){case 0->closed();case 1->opening();case 2->hold();case 3->closing();case 4->coast();case 5->reopening();default->safehold();};s.pin(7,true);s.await(7,1);});
   test("global conflicting limits state "+st,()->{Sim s=switch(st){case 0->closed();case 1->opening();case 2->hold();case 3->closing();case 4->coast();case 5->reopening();default->safehold();};s.pin(3,false);s.pin(4,false);s.await(7,1);});
  }
  test("opening timeout near 5 s",()->{Sim s=opening();s.stay(1,4990);s.await(7,30);});
  test("closing timeout near 5 s",()->{Sim s=closing();s.stay(3,4990);s.await(7,30);});
  test("reopening timeout near 5 s",()->{Sim s=reopening();s.stay(5,4990);s.await(7,30);});
  test("manual fault reset rechecks endpoints",()->{Sim s=closed();s.pin(7,true);s.await(7,1);s.pin(7,false);s.run(25);s.pin(5,false);s.await(0,60);});
  test("reset cannot clear unknown position",()->{Sim s=new Sim(0x7F);s.await(7,50);s.run(25);s.pin(5,false);s.stay(7,80);});
  System.out.println("TOTAL "+pass+" PASS, "+fail+" FAIL; instructions="+ins);
  System.exit(fail==0?0:1);
 }
}
