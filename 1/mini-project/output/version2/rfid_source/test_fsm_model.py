import unittest,json
from pathlib import Path
from fsm_model import Controller,PressEvent,State,p1,OUTPUTS
class FSMTests(unittest.TestCase):
 def test_output_bytes(self):self.assertEqual([p1(s) for s in State],[0xEC,0xD9,0xDC,0xEA,0xFC,0xD9,0xBC])
 def test_orange_only_rfid_hold(self):self.assertEqual([s for s,o in OUTPUTS.items() if o[5]==0],[State.RFID_HOLD])
 def test_motor_disabled_in_stop_states(self):
  for s in [State.CLOSED,State.OPEN_HOLD,State.REV_WAIT,State.RFID_HOLD]:self.assertTrue(p1(s)&4)
 def test_open_button_opens(self):
  c=Controller();c.step(open_event=True,lc=0);self.assertEqual(c.state,State.OPENING)
 def test_open_limit_holds(self):
  c=Controller(State.OPENING);c.step(lo=0);self.assertEqual(c.state,State.OPEN_HOLD)
 def test_no_automatic_close(self):
  for s in [State.OPEN_HOLD,State.RFID_HOLD]:
   c=Controller(s)
   for _ in range(10000):c.step(close_released=True,lo=0)
   self.assertEqual(c.state,s)
 def test_new_close_press(self):
  c=Controller(State.RFID_HOLD);c.step(close_released=True,lo=0);c.step(close_event=True,lo=0);self.assertEqual(c.state,State.CLOSING)
 def test_close_without_release_ignored(self):
  c=Controller(State.RFID_HOLD);c.step(close_event=True,lo=0);self.assertEqual(c.state,State.RFID_HOLD)
 def test_close_while_tag_present_consumed(self):
  c=Controller(State.RFID_HOLD);c.step(close_released=True,lo=0);c.step(close_event=True,rfid_det=0,lo=0)
  for _ in range(500):c.step(rfid_det=1,lo=0)
  self.assertEqual(c.state,State.RFID_HOLD);self.assertFalse(c.close_armed)
 def test_rfid_immediate_disable(self):
  c=Controller(State.CLOSING);c.step(rfid_det=0);self.assertEqual(c.state,State.REV_WAIT);self.assertEqual(c.p1,0xFC)
 def test_rfid_priority_over_closed_limit(self):
  c=Controller(State.CLOSING);c.step(rfid_det=0,lc=0);self.assertEqual(c.state,State.REV_WAIT)
 def test_coast_200ms_minimum(self):
  c=Controller(State.REV_WAIT)
  for _ in range(199):c.step()
  self.assertEqual(c.state,State.REV_WAIT);c.step();self.assertEqual(c.state,State.REOPENING)
 def test_rfid_history_survives_lost_detection(self):
  c=Controller(State.CLOSING);c.step(rfid_det=0)
  for _ in range(200):c.step(rfid_det=1)
  c.step(lo=0);self.assertEqual(c.state,State.RFID_HOLD)
 def test_open_request_while_closing_reopens_normally(self):
  c=Controller(State.CLOSING);c.step(open_event=True)
  for _ in range(200):c.step()
  c.step(lo=0);self.assertEqual(c.state,State.OPEN_HOLD)
 def test_close_limit(self):
  c=Controller(State.CLOSING);c.step(lc=0);self.assertEqual(c.state,State.CLOSED)
 def test_estop_stays_latched(self):
  c=Controller(State.CLOSING);c.step(estop=1);c.step(estop=0);self.assertTrue(c.fault);self.assertEqual(c.p1,0xFC)
 def test_reset_requires_release_and_endpoint(self):
  c=Controller(State.CLOSING);c.step(estop=1);c.step(close_event=True,lc=0);self.assertTrue(c.fault)
  c.step(close_released=True);c.step(close_event=True);self.assertTrue(c.fault)
  c.step(close_released=True);c.step(close_event=True,lc=0);self.assertFalse(c.fault);self.assertEqual(c.state,State.CLOSED)
 def test_conflicting_limits_fault(self):
  c=Controller();c.step(lo=0,lc=0);self.assertTrue(c.fault)
 def test_travel_timeout(self):
  c=Controller(State.OPENING)
  for _ in range(5000):c.step()
  self.assertTrue(c.fault)
 def test_debounce_and_no_held_retrigger(self):
  d=PressEvent()
  for _ in range(20):d.step(1)
  for _ in range(19):self.assertFalse(d.step(0)[0])
  self.assertTrue(d.step(0)[0])
  for _ in range(100):self.assertFalse(d.step(0)[0])
 def test_open_held_blocks_close(self):
  c=Controller(State.OPEN_HOLD);c.step(close_released=True);c.step(close_event=True,open_released=False);self.assertEqual(c.state,State.OPEN_HOLD)
if __name__=='__main__':
 suite=unittest.defaultTestLoader.loadTestsFromTestCase(FSMTests);result=unittest.TextTestRunner(verbosity=2).run(suite)
 Path(__file__).with_name('logic_test_results.json').write_text(json.dumps({'test_environment':'Python reference FSM, ideal 1 ms steps; not EdSim51, not hardware','tests_run':result.testsRun,'failures':len(result.failures),'errors':len(result.errors),'passed':result.wasSuccessful()},indent=2))
 raise SystemExit(0 if result.wasSuccessful() else 1)
