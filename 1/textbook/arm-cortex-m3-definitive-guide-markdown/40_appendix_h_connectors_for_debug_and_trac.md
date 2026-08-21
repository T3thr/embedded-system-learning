# Appendix H Connectors for Debug and Tracers

> **Source PDF**: THE_DEFINITIVE_GUIDE_TO_THE_ARM_CORTEX-МЗ_Stellaris_MCU_9000Series_TEINSTRUMENTS_ARM_SECOND_EDITION.pdf  
> **PDF Page Range**: 474 - 477


---


<!-- Page 474 -->
### [PDF Page 474]

447
H
H.1  Overview
A number of commonly used debug connectors are shown here. Most of the ARM development tools
use one of these pins out. When developing your ARM circuit board, it is recommended to use a stan-
dard debug signal arrangement to make connection to the debugger easier.
H.2  the 20-Pin Cortex Debug + ETM Connector
Newer ARM microcontroller boards use a 0.05" 20 pin header (Samtec FTSH-120) for both debug and
trace. (The signals greyed out in the following figures are not available on the Cortex™-M3.)
The 20-pin Cortex Debug + ETM connector supports both JTAG and Serial-Wire debug protocols
(see Figures H.1 and H.2). When the Serial debug protocol is used, the TDO signal can be used for
Serial-Wire Viewer (SWV) output for trace capture. The connector also provides a 4-bit wide trace port
for capturing of trace that requires a higher trace bandwidth (e.g., when ETM trace is enabled).
The FTSH-120 connector is smaller than the traditional IDC connector and is recommended for
new designs. An example development board that uses this new connector is the Keil MCBSTM32E
evaluation board.
Appendix
Connectors for Debug
and Tracers
Figure H.1
The 20-Pin Cortex Debug + ETM Connector.



<!-- Page 475 -->
### [PDF Page 475]

448
Appendix H
1
2
19
20
TMS/SWIO
VTref
TCK/SWCLK
TDO/SWO/TRACECTL/EXTa
TDI/EXTb/NC
nRESET
TRACECLK
TRACEDATA0
GND
GND
KEY
GNDDetect
GND/TgtPwrz Cap
TRACEDATA1
TRACEDATA2
TRACEDATA3
GND
GND
GND
GND/TgtPwrz Cap
Figure H.2
The 20-Pin Cortex Debug + ETM Connector Pin Layout.
Figure H.3
The 10-Pin Cortex Debug Connector.
1
2
9
10
TMS/SWIO
VTref
TCK/SWCLK
TDO/SWO
TDI
nRESET
GND
GND
KEY
GNDDetect
Figure H.4
The 10-Pin Cortex Debug Connector Pin Layout.



<!-- Page 476 -->
### [PDF Page 476]

449
Connectors for Debug and Tracers
H.3  The 10-Pin Cortex Debug Connector
For devices without ETM, you can use an even smaller 0.05" 10-pin connector for debug. Similar to
the 20-pin Cortex Debug + ETM connector, both JTAG and Serial-Wire debug protocols are supported
in the 10-pin version (see Figures H.3 and H.4).
H.4  Legacy 20-Pin IDC Connector
A common debug connector used in ARM development boards is the 20-pin IDC connector (see
­Figure H.5). The 20 pin IDC connector arrangement support JTAG debug, Serial-Wire debug (SWIO
and SWCLK), and SWV. The nICEDETECT pin allows the target system to detect if a debugger is
­connected. When no debugger is attached, this pin is pulled high. A debugger connection connects this
pin to the ground. This is used in some development boards that support multiple JTAG configurations.
The nSRST connection is optional; debugger can reset a Cortex-M3 system through the NVIC so this
connection is often omitted from the top level of microcontroller designs.
H.5  Legacy 38-Pin Mictor Connector
In some ARM system designs, a Mictor connector is used when trace port is required (e.g., for instruc-
tion trace with ETM; see Figure H.6). It can also be used for JTAG/SWD connection. The 20-pin IDC
connector can be connected in parallel with the Mictor connector (only one is used at a time).
Figure H.5
The 20-Pin IDC Connector.
1
2
19
20
3V3
3V3
GND
GND
GND
GND
GND
GND
GND
GND
nICEDETECT
nTRST
TDI
TMS/SWIO
TCK/SWCLK
RTCK
TDO/SWV
NC/nSRST
NC
NC



<!-- Page 477 -->
### [PDF Page 477]

450
Appendix H
Typically, a Cortex-M3 microcontroller only has 4 bits of trace data signals, so most of the trace
data pins on the Mictor connectors are not used. The Mictor connector is used mostly in other ARM
Cortex processors (Cortex-A8/A9, Cortex-R4); in some multiprocessor systems the trace system might
require a wider trace port. In such cases, some of the other unused pins on the connector will also be
used. For Cortex-M3 systems, the Cortex Debug + ETM connector is recommended.
Figure H.6
The 38-Pin Mictor Connector.
NC
NC
GND
Pulldown
NC/nSRST
TDO/SWV
RTCK
TCK/SWCLK
TMS/SWIO
TDI
nTRST
1
2
37
38
NC
NC
TRACECLK
Pulldown
Pullup (Vref)
VSupply
TRACEDATA[3]
0
0
1
Pulldown
TRACEDATA[2]
TRACEDATA[1]
TRACEDATA[0]
1
3
5
7
9
11
13
15
17
19
21
23
25
27
29
31
33
35
37
2
4
6
8
10
12
14
16
18
20
22
24
26
28
30
32
34
36
38
0/TRACEDATA[4]
0/TRACEDATA[5]
0/TRACEDATA[6]
0/TRACEDATA[7]
0/TRACEDATA[8]
0/TRACEDATA[9]
0/TRACEDATA[10]
0/TRACEDATA[11]
0/TRACEDATA[12]
0/TRACEDATA[13]
0/TRACEDATA[14]
0/TRACEDATA[15]
0/TRACECTRL


