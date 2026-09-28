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

/** Headless tests of SLIDING_DOOR_CLASSROOM.asm on the actual EdSim51 assembler
 * and CPU. External P2 pin stimuli only; never writes firmware RAM, PC, timers.
 * Run with Java source-file mode; see TEST_RESULTS_CLASSROOM.md for the command. */
class EdSimClassroomTest {
    static final int START=0, CLOSED=1, OPENING=2, HOLD=3, CLOSING=4,
        REV_WAIT=5, REOPEN=6, FAULT=7;
    static final String[] NAMES={"START","CLOSED","OPENING","HOLD","CLOSING","REV_WAIT","REOPEN","FAULT"};
    static final int[] OUTPUTS={0xEC,0xFC,0xD9,0xDC,0x6A,0x6C,0x69,0x6C};
    static final int INSIDE=0, OUTSIDE=1, LOW_BEAM=2, LO=3, LC=4, HIGH_BEAM=5, RESET=6, ESTOP=7;
    static final int PINS_CLOSED=0x4B, PINS_OPEN=0x53, PINS_MID=0x5B, HARDWARE_ID=123;
    static final Field CYCLES;
    static InstructionInfo[] image;
    static int passed, failed;
    static long totalInstructions;
    static final List<String> results=new ArrayList<>();
    static final List<String> measurements=new ArrayList<>();
    static { try { CYCLES=Cpu.class.getDeclaredField("programCycles"); CYCLES.setAccessible(true); }
        catch(Exception e) { throw new ExceptionInInitializerError(e); } }
    @FunctionalInterface interface Scenario { void run() throws Exception; }

    static void check(boolean ok, String message) { if(!ok) throw new AssertionError(message); }

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
        boolean initialized;
        long stateSince;
        Sim(int pins) throws Exception {
            cpu.reset(); cpu.setMachineCycleLength(1.0); cpu.loadCode(image);
            inputs=pins; applyPins();
        }
        long us() throws Exception { return CYCLES.getLong(cpu); }
        int p1() throws Exception { return cpu.memory.readPortLatches(Cpu.P1); }
        int p0() throws Exception { return cpu.memory.readPortLatches(Cpu.P0); }
        int state() throws Exception { int v=p0(); return initialized && (v&0xF8)==0xF8 ? v&7 : -1; }
        void applyPins() {
            for(int bit=0;bit<8;bit++) {
                if((inputs&(1<<bit))==0) cpu.memory.port2.hardwareClearPortPin(bit,HARDWARE_ID);
                else cpu.memory.port2.hardwareSetPortPin(bit,HARDWARE_ID);
            }
        }
        void pin(int bit, boolean high) { inputs=high?inputs|(1<<bit):inputs&~(1<<bit); applyPins(); }
        void step() throws Exception {
            cpu.executeInstructions(1,breakpoints,false); totalInstructions++;
            int motor=p1();
            if(motor!=0xFF) initialized=true;
            check(cpu.memory.readPortLatches(Cpu.P2)==0xFF,"P2 latch changed: "+context());
            check(!initialized||(motor&3)!=3,"Both motor inputs asserted: "+context());
            check((motor&3)==(previousP1&3)||((motor&4)!=0&&(previousP1&4)!=0),
                "Direction changed while drive enabled: "+context());
            previousP1=motor;
            int s=state();
            if(s!=previousState) { stateSince=us(); previousState=s;
                trace.add(String.format("%.1fms:%s/P1=%02X",us()/1000.0,s<0?"BOOT":NAMES[s],motor)); }
        }
        void run(double ms) throws Exception { long end=us()+Math.round(ms*1000); while(us()<end) step(); }
        void remains(int expected,double ms) throws Exception {
            long end=us()+Math.round(ms*1000);
            while(us()<end) { step(); check(state()==expected,"Left "+NAMES[expected]+": "+context()); }
        }
        long await(int expected,double timeoutMs) throws Exception {
            long end=us()+Math.round(timeoutMs*1000);
            while(us()<end&&(state()!=expected||p1()!=OUTPUTS[expected])) step();
            check(state()==expected&&p1()==OUTPUTS[expected],"Timed out waiting for "+NAMES[expected]+": "+context());
            long entered=stateSince; run(0.05);
            check(p0()==(0xF8|expected),"Wrong P0 for "+NAMES[expected]+": "+context());
            check(p1()==OUTPUTS[expected],"Wrong P1 for "+NAMES[expected]+": "+context());
            return entered;
        }
        long awaitDriveOff(double timeoutMs) throws Exception {
            long end=us()+Math.round(timeoutMs*1000);
            while(us()<end&&(p1()&4)==0) step();
            check((p1()&4)!=0,"Drive was not disabled: "+context());
            return us();
        }
        String context() throws Exception {
            return String.format("t=%.1fms PC=%04X P0=%02X P1=%02X pins=%02X trace=%s",
                us()/1000.0,cpu.getPc(),p0(),p1(),inputs,trace);
        }
    }

    static void measure(String label,double actualMs,double min,double max) {
        measurements.add(String.format("TIMING | %s: %.3fms (bounds %.3f..%.3fms)",label,actualMs,min,max));
        check(actualMs>=min&&actualMs<=max,String.format("%s out of bounds: %.3fms",label,actualMs));
    }

    static void scenario(String name,Scenario body) {
        try { body.run(); passed++; results.add("PASS | "+name); }
        catch(Throwable t) { failed++; results.add("FAIL | "+name+" -> "+t); }
    }

    /** Drives a complete opening sequence and stops in HOLD. */
    static Sim toHold() throws Exception {
        Sim s=new Sim(PINS_CLOSED);
        s.await(CLOSED,400);
        s.pin(INSIDE,false);
        s.await(OPENING,600);
        s.pin(INSIDE,true); s.pin(LC,true); s.run(100);
        s.pin(LO,false);
        s.await(HOLD,600);
        return s;
    }

    public static void main(String[] args) throws Exception {
        Path firmware=Path.of("embedded-system/1/mini-project/firmware/SLIDING_DOOR_CLASSROOM.asm");
        String source=Files.readString(firmware);
        System.out.println("Firmware: "+firmware.toAbsolutePath());
        System.out.println("SHA-256: "+HexFormat.of().formatHex(
            MessageDigest.getInstance("SHA-256").digest(source.getBytes(java.nio.charset.StandardCharsets.UTF_8))));
        System.out.println("Java: "+System.getProperty("java.version")+"; headless="+System.getProperty("java.awt.headless"));
        image=assemble(source);
        System.out.println("ASSEMBLY PASS: actual EdSim51 two-pass assembler; image slots="+image.length);

        scenario("boot at closed limit reaches CLOSED with exact P0/P1",()->{
            Sim s=new Sim(PINS_CLOSED); s.await(CLOSED,400); s.remains(CLOSED,150);
        });
        scenario("boot at open limit reaches HOLD",()->{
            Sim s=new Sim(PINS_OPEN); s.await(HOLD,400);
        });
        scenario("unknown boot position latches FAULT",()->{
            Sim s=new Sim(PINS_MID); s.await(FAULT,400); s.remains(FAULT,200);
        });
        scenario("conflicting limits at boot latch FAULT",()->{
            Sim s=new Sim(PINS_CLOSED&~(1<<LO)); s.await(FAULT,400);
        });
        scenario("CLOSED settle 200ms then 20ms button qualification",()->{
            Sim s=new Sim(PINS_CLOSED);
            long closed=s.await(CLOSED,400);
            s.pin(INSIDE,false);
            long opening=s.await(OPENING,900);
            measure("CLOSED settle plus button qualification",(opening-closed)/1000.0,220,260);
        });
        scenario("short button pulse does not open the door",()->{
            Sim s=new Sim(PINS_CLOSED); s.await(CLOSED,400); s.run(250);
            s.pin(INSIDE,false); s.run(5); s.pin(INSIDE,true);
            s.remains(CLOSED,200);
        });
        scenario("outside button opens the door",()->{
            Sim s=new Sim(PINS_CLOSED); s.await(CLOSED,400); s.run(250);
            s.pin(OUTSIDE,false); s.await(OPENING,200);
        });
        scenario("full cycle: OPENING, HOLD, 3s clear, CLOSING, CLOSED",()->{
            Sim s=toHold();
            long hold=s.stateSince;
            long closing=s.await(CLOSING,3600);
            measure("HOLD continuous clear",(closing-hold)/1000.0,3000,3120);
            s.pin(LO,true); s.run(100); s.pin(LC,false);
            s.await(CLOSED,400);
        });
        scenario("lower beam during CLOSING disables drive then REOPENs",()->{
            Sim s=toHold(); s.await(CLOSING,3600);
            s.pin(LO,true); s.run(60);
            long blocked=s.us(); s.pin(LOW_BEAM,true);
            long off=s.awaitDriveOff(60);
            measure("drive disabled after obstruction",(off-blocked)/1000.0,0,40);
            long rev=s.await(REV_WAIT,60);
            long reopen=s.await(REOPEN,400);
            measure("reversal dead time",(reopen-rev)/1000.0,200,260);
            s.pin(LOW_BEAM,false); s.pin(LO,false); s.await(HOLD,600);
        });
        scenario("upper beam during CLOSING reverses the door",()->{
            Sim s=toHold(); s.await(CLOSING,3600);
            s.pin(LO,true); s.run(60); s.pin(HIGH_BEAM,true);
            s.await(REV_WAIT,60); s.await(REOPEN,400);
        });
        scenario("button during CLOSING reverses the door",()->{
            Sim s=toHold(); s.await(CLOSING,3600);
            s.pin(LO,true); s.run(60); s.pin(OUTSIDE,false);
            s.await(REV_WAIT,60); s.await(REOPEN,400);
        });
        scenario("obstruction wins over a simultaneous closed limit",()->{
            Sim s=toHold(); s.await(CLOSING,3600);
            s.pin(LO,true); s.run(60);
            s.pin(LOW_BEAM,true); s.pin(LC,false);
            s.await(REV_WAIT,60);
        });
        scenario("HOLD countdown restarts while a beam is blocked",()->{
            Sim s=toHold();
            s.run(2000); s.pin(LOW_BEAM,true); s.run(500);
            long cleared=s.us(); s.pin(LOW_BEAM,false);
            long closing=s.await(CLOSING,3600);
            measure("HOLD restart after obstruction",(closing-cleared)/1000.0,3000,3120);
        });
        scenario("OPENING travel timeout latches FAULT",()->{
            Sim s=new Sim(PINS_CLOSED); s.await(CLOSED,400); s.run(250);
            s.pin(INSIDE,false); long opening=s.await(OPENING,400);
            s.pin(INSIDE,true); s.pin(LC,true);
            long fault=s.await(FAULT,6000);
            measure("opening travel timeout",(fault-opening)/1000.0,5000,5120);
        });
        scenario("CLOSING travel timeout latches FAULT",()->{
            Sim s=toHold(); long closing=s.await(CLOSING,3600);
            s.pin(LO,true);
            long fault=s.await(FAULT,6000);
            measure("closing travel timeout",(fault-closing)/1000.0,5000,5120);
        });
        scenario("emergency stop during OPENING latches FAULT",()->{
            Sim s=new Sim(PINS_CLOSED); s.await(CLOSED,400); s.run(250);
            s.pin(INSIDE,false); s.await(OPENING,400);
            s.pin(ESTOP,true); s.await(FAULT,120); s.remains(FAULT,200);
        });
        scenario("emergency stop during REV_WAIT latches FAULT",()->{
            Sim s=toHold(); s.await(CLOSING,3600);
            s.pin(LO,true); s.run(60); s.pin(LOW_BEAM,true);
            s.await(REV_WAIT,60); s.pin(ESTOP,true); s.await(FAULT,120);
        });
        scenario("held reset cannot clear FAULT; release then press recovers",()->{
            Sim s=new Sim(PINS_MID&~(1<<RESET)); s.await(FAULT,400);
            s.remains(FAULT,400);
            s.pin(LO,true); s.pin(LC,false);
            s.remains(FAULT,200);
            s.pin(RESET,true); s.run(60); s.pin(RESET,false);
            s.await(CLOSED,600);
        });
        scenario("short reset pulse is rejected",()->{
            Sim s=new Sim(PINS_MID); s.await(FAULT,400);
            s.pin(LO,true); s.pin(LC,false);
            s.pin(RESET,false); s.run(5); s.pin(RESET,true);
            s.remains(FAULT,300);
        });
        scenario("reset is refused while a beam is still blocked",()->{
            Sim s=new Sim(PINS_MID|(1<<LOW_BEAM)); s.await(FAULT,400);
            s.pin(LO,true); s.pin(LC,false);
            s.pin(RESET,false); s.remains(FAULT,300);
            s.pin(LOW_BEAM,false); s.await(CLOSED,600);
        });

        for(String line:results) System.out.println(line);
        for(String line:measurements) System.out.println(line);
        System.out.printf("TOTAL: %d PASS, %d FAIL; %,d instructions checked%n",passed,failed,totalInstructions);
        System.out.println("Every stepped instruction: P2 latch FF; motor P1.0/P1.1 mutually exclusive; "
            +"direction only changed while the drive was disabled.");
        if(failed>0) System.exit(1);
    }
}
