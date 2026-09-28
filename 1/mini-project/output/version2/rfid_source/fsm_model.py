"""Reference logic model, not 8051 firmware or an RF/motor simulation.
Inputs to step are already debounced press EVENTS except RFID and limits.
Every step represents 1 ms. No automatic-close timer exists.
"""
from dataclasses import dataclass
from enum import IntEnum

class State(IntEnum):
    CLOSED=0; OPENING=1; OPEN_HOLD=2; CLOSING=3; REV_WAIT=4; REOPENING=5; RFID_HOLD=6

# [IN1, IN2, RUN_N, LED_RED_N, LED_GREEN_N, LED_RFID_N]
OUTPUTS={
    State.CLOSED:(0,0,1,0,1,1), State.OPENING:(1,0,0,1,0,1),
    State.OPEN_HOLD:(0,0,1,1,0,1), State.CLOSING:(0,1,0,0,1,1),
    State.REV_WAIT:(0,0,1,1,1,1), State.REOPENING:(1,0,0,1,0,1),
    State.RFID_HOLD:(0,0,1,1,1,0)}
SHAFT={s:('CW' if s in (State.OPENING,State.REOPENING) else 'CCW' if s==State.CLOSING else 'Coast' if s==State.REV_WAIT else 'STOP') for s in State}
def p1(s):
    a,b,en,r,g,o=OUTPUTS[s]
    return 0x88|a|(b<<1)|(en<<2)|(r<<4)|(g<<5)|(o<<6)

@dataclass
class Controller:
    state:State=State.CLOSED
    elapsed:int=0
    fault:bool=False
    rfid_seen:bool=False
    close_armed:bool=False
    reset_armed:bool=False
    def enter(self,state):
        self.state=state;self.elapsed=0;self.close_armed=False
    @property
    def p1(self):return 0xFC if self.fault else p1(self.state)
    def step(self,*,open_event=False,close_event=False,close_released=False,
             open_released=True,rfid_det=1,lo=1,lc=1,estop=0):
        # RFID is not debounced. ESTOP/latches dominate ordinary transitions.
        if estop or (lo==0 and lc==0):
            self.fault=True;self.reset_armed=False
        if self.fault:
            if close_released:self.reset_armed=True
            if self.reset_armed and close_event and not estop and rfid_det==1 and open_released and ((lo==0) != (lc==0)):
                self.fault=False;self.reset_armed=False;self.rfid_seen=False
                self.enter(State.CLOSED if lc==0 else State.OPEN_HOLD)
            return
        self.elapsed+=1
        s=self.state
        if s==State.CLOSED:
            if open_event:self.rfid_seen=False;self.enter(State.OPENING)
        elif s in (State.OPEN_HOLD,State.RFID_HOLD):
            # Release must be observed AFTER entry. A press while blocked is consumed.
            if close_released:self.close_armed=True
            if close_event:
                accept=self.close_armed and rfid_det==1 and open_released
                self.close_armed=False
                if accept:self.rfid_seen=False;self.enter(State.CLOSING)
        elif s==State.CLOSING:
            if rfid_det==0 or open_event:
                self.rfid_seen=(rfid_det==0);self.enter(State.REV_WAIT)
            elif lc==0:self.enter(State.CLOSED)
            elif self.elapsed>=5000:self.fault=True;self.reset_armed=False
        elif s in (State.OPENING,State.REOPENING):
            if lo==0:
                self.enter(State.RFID_HOLD if s==State.REOPENING and self.rfid_seen else State.OPEN_HOLD)
            elif self.elapsed>=5000:self.fault=True;self.reset_armed=False
        elif s==State.REV_WAIT and self.elapsed>=200:self.enter(State.REOPENING)

class PressEvent:
    """20 consecutive ms at each level, one event per stable falling edge.
    Initialize unarmed: a release is required, so power-on with a held button
    cannot create a new command.
    """
    def __init__(self):self.raw=1;self.count=0;self.stable=1;self.armed=False
    def step(self,level):
        self.count=self.count+1 if level==self.raw else 1;self.raw=level
        event=False
        if self.count>=20:
            if level==1:self.armed=True
            elif self.stable==1 and self.armed:event=True;self.armed=False
            self.stable=level
        return event,self.count>=20 and self.stable==1
