import edsim51sh.Assembler;
import edsim51sh.Cpu;
import edsim51sh.instructions.Instruction;
import edsim51sh.instructions.InstructionInfo;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.nio.file.Files;
import java.nio.file.Path;
import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.HexFormat;
import java.util.List;
import java.util.Vector;

/** Headless tests of actual EdSim51 machine code. Emits results to stdout only.
 * Run using Java source-file mode; see TEST_RESULTS.md for the full command.
 * External P2 pin stimuli only: never writes firmware RAM, PC, or timer registers.
 */
class EdSimDoorTest {
    static final int INIT=0, CLOSED=1, OPENING=2, HOLD=3, CLOSING=4,
        REV_WAIT=5, REOPEN=6, FAULT=7;
    static final String[] NAMES={"INIT","CLOSED","OPENING","HOLD","CLOSING","REV_WAIT","REOPEN","FAULT"};
    static final int[] OUTPUTS={0xEC,0xFC,0xD9,0xDC,0x6A,0x6C,0x69,0x6C};
    static final int INSIDE=0, OUTSIDE=1, LOW_BEAM=2, LO=3, LC=4,
        HIGH_BEAM=5, RESET=6, ESTOP=7;
    static final int DEFAULT_CLOSED=0x4B, HARDWARE_ID=123;
    static final Field CYCLES;
    static InstructionInfo[] image;
    static int passed, failed;
    static long totalInstructions;
    static final List<String> results=new ArrayList<>();
    static final List<String> measurements=new ArrayList<>();
    static {
        try { CYCLES=Cpu.class.getDeclaredField("programCycles"); CYCLES.setAccessible(true); }
        catch(Exception e) { throw new ExceptionInInitializerError(e); }
    }
    @FunctionalInterface interface Scenario { void run() throws Exception; }
    static void check(boolean condition, String message) {
        if(!condition) throw new AssertionError(message);
    }
    static InstructionInfo[] assemble(String source) throws Exception {
        var assembler=new Assembler(null,source);
        Method first=Assembler.class.getDeclaredMethod("firstPass");
        Method second=Assembler.class.getDeclaredMethod("secondPass",Instruction[].class);
        first.setAccessible(true); second.setAccessible(true);
        try { return (InstructionInfo[])second.invoke(assembler,first.invoke(assembler)); }
        catch(InvocationTargetException e) { throw new Exception("EdSim assembler: "+e.getCause(),e.getCause()); }
    }
    static final class Sim {
        final Cpu cpu=new Cpu();
        final Vector<Integer> breakpoints=new Vector<>();
        final List<String> trace=new ArrayList<>();
        int inputs, previousState=-1, previousP1=0xFF;
        boolean outputsInitialized;
        long stateSince;
        Sim(int initialPins) throws Exception {
            cpu.reset(); cpu.setMachineCycleLength(1.0); cpu.loadCode(image);
            inputs=initialPins; applyPins();
        }
        long us() throws Exception { return CYCLES.getLong(cpu); }
        int p1() throws Exception { return cpu.memory.readPortLatches(Cpu.P1); }
        int state() throws Exception {
            int p0=cpu.memory.readPortLatches(Cpu.P0);
            return outputsInitialized && (p0&0xF8)==0xF8 ? p0&7 : -1;
        }
        void applyPins() {
            for(int bit=0;bit<8;bit++) {
                if((inputs&(1<<bit))==0) cpu.memory.port2.hardwareClearPortPin(bit,HARDWARE_ID);
                else cpu.memory.port2.hardwareSetPortPin(bit,HARDWARE_ID);
            }
        }
        void pin(int bit, boolean high) {
            inputs=high ? inputs|(1<<bit) : inputs&~(1<<bit); applyPins();
        }
        void step() throws Exception {
            cpu.executeInstructions(1,breakpoints,false); totalInstructions++;
            int motor=p1();
            // Reset latches are FF before firmware's first P1 write. Check every
            // instruction after that write, including transient output updates.
            if(motor!=0xFF) outputsInitialized=true;
            if(cpu.memory.readPortLatches(Cpu.P2)!=0xFF) throw new AssertionError("P2 latch changed: "+context());
            if(outputsInitialized && (motor&3)==3) throw new AssertionError("Both motor commands asserted: "+context());
            if((motor&3)!=(previousP1&3) && ((motor&4)==0 || (previousP1&4)==0))
                throw new AssertionError("Direction changed without EN disabled before and after write: "+context());
            previousP1=motor;
            int s=state();
            if(s!=previousState) {
                stateSince=us(); previousState=s;
                trace.add(String.format("%.3fms:%s/P1=%02X",us()/1000.0,s<0?"BOOT":NAMES[s],motor));
            }
        }
        void run(double ms) throws Exception {
            long end=us()+Math.round(ms*1000);
            while(us()<end) step();
        }
        void remains(int expected,double ms) throws Exception {
            long end=us()+Math.round(ms*1000);
            while(us()<end) {
                step(); if(state()!=expected) throw new AssertionError("Expected to remain "+NAMES[expected]+": "+context());
            }
            output(expected);
        }
        long await(int expected,double timeoutMs) throws Exception {
            long end=us()+Math.round(timeoutMs*1000);
            while(us()<end && (state()!=expected || p1()!=OUTPUTS[expected])) step();
            check(state()==expected && p1()==OUTPUTS[expected],"Timed out waiting for "+NAMES[expected]+": "+context());
            long entered=stateSince;
            // Allow sequential P0/P1 output instructions to complete.
            run(0.10); output(expected);
            return entered;
        }
        void output(int expected) throws Exception {
            check(state()==expected,"Wrong state: "+context());
            check(cpu.memory.readPortLatches(Cpu.P0)==(0xF8|expected),"Wrong P0: "+context());
            check(p1()==OUTPUTS[expected],"Wrong P1 for "+NAMES[expected]+": "+context());
        }
        String context() throws Exception {
            return String.format("t=%.3fms PC=%04X P0=%02X P1=%02X pins=%02X trace=%s",
                us()/1000.0,cpu.getPc(),cpu.memory.readPortLatches(Cpu.P0),p1(),inputs,trace);
        }
    }
    static Sim closed() throws Exception {
        var s=new Sim(DEFAULT_CLOSED); s.await(CLOSED,60); s.run(220); s.output(CLOSED); return s;
    }
    static void opening(Sim s,int button) throws Exception {
        s.pin(button,false); s.await(OPENING,60); s.pin(button,true);
    }
    static Sim atHold() throws Exception {
        var s=closed(); opening(s,INSIDE); s.run(50); s.pin(LC,true);
        s.run(100); s.pin(LO,false); s.await(HOLD,60); return s;
    }
    static Sim closing() throws Exception {
        var s=atHold(); s.await(CLOSING,3100); s.pin(LO,true); s.run(40); return s;
    }
    static void test(String name,Scenario scenario) {
        try { scenario.run(); passed++; results.add("PASS | "+name); }
        catch(Throwable e) { failed++; results.add("FAIL | "+name+" | "+e); }
        System.out.println(results.get(results.size()-1));
    }
    static void timing(long elapsedUs,double lowMs,double highMs,String label) {
        measurements.add(String.format("%s: %.3fms (bounds %.3f..%.3fms)",label,elapsedUs/1000.0,lowMs,highMs));
        check(elapsedUs>=lowMs*1000 && elapsedUs<=highMs*1000,
            label+": "+elapsedUs/1000.0+"ms, expected "+lowMs+".."+highMs+"ms");
    }
    public static void main(String[] args) throws Exception {
        Path source=Path.of(args.length==0?"embedded-system/1/mini-project/firmware/SLIDING_DOOR.asm":args[0]);
        byte[] bytes=Files.readAllBytes(source);
        System.out.println("Firmware: "+source.toAbsolutePath());
        System.out.println("SHA-256: "+HexFormat.of().formatHex(MessageDigest.getInstance("SHA-256").digest(bytes)));
        System.out.println("Java: "+System.getProperty("java.version")+"; headless="+System.getProperty("java.awt.headless"));
        image=assemble(new String(bytes,java.nio.charset.StandardCharsets.UTF_8));
        System.out.println("ASSEMBLY PASS: actual EdSim51 two-pass assembler; image slots="+image.length);

        test("normal full cycle, exact P0/P1 outputs",()->{
            var s=closed(); opening(s,INSIDE); s.run(50); s.pin(LC,true);
            s.run(200); s.pin(LO,false); long held=s.await(HOLD,60);
            long shut=s.await(CLOSING,3100); timing(shut-held,3000,3030,"HOLD");
            s.pin(LO,true); s.run(200); s.pin(LC,false); s.await(CLOSED,60); s.remains(CLOSED,250);
        });
        test("outside request",()->{ var s=closed(); opening(s,OUTSIDE); });
        test("CLOSED 200ms minimum age",()->{
            var s=new Sim(DEFAULT_CLOSED); long entered=s.await(CLOSED,60);
            s.pin(INSIDE,false); s.remains(CLOSED,175);
            long opened=s.await(OPENING,70); timing(opened-entered,200,240,"CLOSED age");
        });
        test("short button pulse rejected; stable 20ms accepted",()->{
            var s=closed(); s.pin(INSIDE,false); s.run(5); s.pin(INSIDE,true); s.remains(CLOSED,60);
            long pressed=s.us(); s.pin(INSIDE,false); long opened=s.await(OPENING,50);
            timing(opened-pressed,20,40,"continuous request debounce");
        });
        for(int beam:new int[]{LOW_BEAM,HIGH_BEAM}) {
            final int b=beam;
            test("beam P2."+b+" during CLOSING; 200ms reversal; REOPEN",()->{
                var s=closing(); s.pin(b,true); long stopped=s.await(REV_WAIT,40);
                s.remains(REV_WAIT,175); long reopened=s.await(REOPEN,60);
                timing(reopened-stopped,200,230,"reversal dead time");
                s.pin(b,false); s.run(80); s.pin(LO,false); s.await(HOLD,50);
            });
            test("HOLD continuous-clear 3s resets on beam P2."+b,()->{
                var s=atHold(); s.remains(HOLD,2000); s.pin(b,true); s.remains(HOLD,1200);
                long cleared=s.us(); s.pin(b,false); s.remains(HOLD,2900);
                long shut=s.await(CLOSING,160); timing(shut-cleared,3000,3040,"clear interval");
            });
        }
        test("HOLD clear countdown resets on button",()->{
            var s=atHold(); s.remains(HOLD,2000); s.pin(INSIDE,false); s.remains(HOLD,1200);
            long released=s.us(); s.pin(INSIDE,true); s.remains(HOLD,2900);
            timing(s.await(CLOSING,180)-released,3000,3060,"button release hold interval");
        });
        test("boot INIT stopped, classification after 20ms",()->{
            var s=new Sim(DEFAULT_CLOSED); s.await(INIT,2); s.remains(INIT,8);
            check(s.cpu.memory.readByte(Cpu.TMOD)==2,"TMOD is not Mode 2");
            check(s.cpu.memory.readByte(Cpu.TH0)==6,"TH0 is not 06H");
            check(s.cpu.memory.readByte(Cpu.IE)==0x82,"IE is not Timer0-only 82H");
            long classified=s.await(CLOSED,50); timing(classified,20,40,"boot classification");
        });
        test("boot open endpoint",()->{
            var s=new Sim((DEFAULT_CLOSED|(1<<LC))&~(1<<LO)); s.await(HOLD,60);
        });
        test("unknown boot position faults",()->{
            var s=new Sim(DEFAULT_CLOSED|(1<<LC)); s.await(FAULT,60); s.remains(FAULT,200);
        });
        test("conflicting limits at boot",()->{
            var s=new Sim(DEFAULT_CLOSED&~(1<<LO)); s.await(FAULT,60);
        });
        test("conflicting limits during opening",()->{
            var s=closed(); opening(s,INSIDE); s.pin(LO,false); s.await(FAULT,40);
        });
        test("E-stop during opening; latched FAULT",()->{
            var s=closed(); opening(s,INSIDE); s.pin(ESTOP,true); s.await(FAULT,40);
            s.pin(ESTOP,false); s.remains(FAULT,100);
        });
        test("E-stop during closing",()->{
            var s=closing(); s.pin(ESTOP,true); s.await(FAULT,40);
        });
        test("E-stop unsafe at boot",()->{
            var s=new Sim(DEFAULT_CLOSED|(1<<ESTOP)); s.await(FAULT,60);
        });
        test("opening 5s travel timeout",()->{
            var s=closed(); opening(s,INSIDE); long started=s.stateSince; s.pin(LC,true);
            s.remains(OPENING,4800); timing(s.await(FAULT,260)-started,5000,5040,"opening timeout");
        });
        test("closing 5s travel timeout",()->{
            var s=closing(); long started=s.stateSince; s.remains(CLOSING,4750);
            timing(s.await(FAULT,300)-started,5000,5040,"closing timeout");
        });
        test("REOPEN 5s travel timeout",()->{
            var s=closing(); s.pin(LOW_BEAM,true); s.await(REV_WAIT,40);
            long started=s.await(REOPEN,260); s.pin(LOW_BEAM,false); s.remains(REOPEN,4800);
            timing(s.await(FAULT,260)-started,5000,5040,"reopen timeout");
        });
        test("opening source LC stuck 500ms",()->{
            var s=closed(); opening(s,INSIDE); long started=s.stateSince; s.remains(OPENING,450);
            timing(s.await(FAULT,100)-started,500,540,"LC release timeout");
        });
        test("closing source LO stuck 500ms",()->{
            var s=atHold(); long started=s.await(CLOSING,3100); s.remains(CLOSING,450);
            timing(s.await(FAULT,100)-started,500,540,"LO release timeout");
        });
        test("source released before 500ms permits continued opening",()->{
            var s=closed(); opening(s,INSIDE); s.run(350); s.pin(LC,true); s.remains(OPENING,300);
        });
        test("FAULT reset release then stable press at safe closed endpoint",()->{
            var s=closed(); s.pin(ESTOP,true); s.await(FAULT,40);
            s.pin(ESTOP,false); s.run(40); long pressed=s.us(); s.pin(RESET,false);
            long reset=s.await(INIT,50); timing(reset-pressed,20,40,"reset debounce");
            s.await(CLOSED,60); s.remains(CLOSED,250);
        });
        test("RESET held across fault cannot auto-clear; re-press clears",()->{
            var s=closed(); s.pin(RESET,false); s.run(40); s.pin(ESTOP,true); s.await(FAULT,40);
            s.pin(ESTOP,false); s.remains(FAULT,250); s.pin(RESET,true); s.run(40);
            s.pin(RESET,false); s.await(CLOSED,80);
        });
        test("RESET held at unsafe boot cannot auto-clear",()->{
            var s=new Sim((DEFAULT_CLOSED|(1<<ESTOP))&~(1<<RESET)); s.await(FAULT,60);
            s.pin(ESTOP,false); s.remains(FAULT,250); s.pin(RESET,true); s.run(40);
            s.pin(RESET,false); s.await(CLOSED,80);
        });
        test("reset at safe open endpoint returns HOLD",()->{
            var s=atHold(); s.pin(ESTOP,true); s.await(FAULT,40);
            s.pin(ESTOP,false); s.run(40); s.pin(RESET,false); s.await(HOLD,80);
        });
        test("short reset pulse rejected",()->{
            var s=closed(); s.pin(ESTOP,true); s.await(FAULT,40); s.pin(ESTOP,false); s.run(40);
            s.pin(RESET,false); s.run(5); s.pin(RESET,true); s.remains(FAULT,80);
        });
        test("reset cannot clear E-stop",()->{
            var s=closed(); s.pin(ESTOP,true); s.await(FAULT,40); s.run(40);
            s.pin(RESET,false); s.remains(FAULT,120);
        });
        test("reset cannot clear unknown position",()->{
            var s=new Sim(DEFAULT_CLOSED|(1<<LC)); s.await(FAULT,60); s.run(40);
            s.pin(RESET,false); s.remains(FAULT,120);
        });
        test("reset cannot clear conflicting limits",()->{
            var s=new Sim(DEFAULT_CLOSED&~(1<<LO)); s.await(FAULT,60); s.run(40);
            s.pin(RESET,false); s.remains(FAULT,120);
        });
        test("reset cannot clear obstructed endpoint",()->{
            var s=closed(); s.pin(ESTOP,true); s.await(FAULT,40); s.pin(ESTOP,false);
            s.pin(LOW_BEAM,true); s.run(40); s.pin(RESET,false); s.remains(FAULT,120);
        });
        test("obstruction wins over simultaneous destination LC",()->{
            var s=closing(); s.pin(LOW_BEAM,true); s.pin(HIGH_BEAM,true); s.pin(LC,false);
            s.await(REV_WAIT,40); s.await(REOPEN,260);
        });
        test("request during closing reverses immediately",()->{
            var s=closing(); s.pin(OUTSIDE,false); s.await(REV_WAIT,40); s.await(REOPEN,260);
        });
        test("E-stop overrides reversal wait",()->{
            var s=closing(); s.pin(LOW_BEAM,true); s.await(REV_WAIT,40);
            s.pin(ESTOP,true); s.await(FAULT,40); s.remains(FAULT,250);
        });
        test("invalid reset consumes arm; held reset cannot clear when beams recover",()->{
            var s=closed(); s.pin(ESTOP,true); s.await(FAULT,40); s.pin(ESTOP,false); s.run(40);
            s.pin(HIGH_BEAM,true); s.pin(RESET,false); s.remains(FAULT,40);
            s.pin(HIGH_BEAM,false); s.remains(FAULT,100); s.pin(RESET,true); s.run(40);
            s.pin(RESET,false); s.await(CLOSED,80);
        });
        for(String measurement:measurements) System.out.println("TIMING | "+measurement);
        System.out.printf("TOTAL: %d PASS, %d FAIL; %,d instructions checked%n",passed,failed,totalInstructions);
        System.out.println("Every stepped instruction: P2 latch FF; motor P1.0/P1.1 mutually exclusive after initial P1 write.");
        System.exit(failed==0?0:1);
    }
}
