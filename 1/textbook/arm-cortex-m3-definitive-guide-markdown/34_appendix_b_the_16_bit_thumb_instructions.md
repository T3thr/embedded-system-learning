# Appendix B The 16-Bit Thumb Instructions and Architecture Versions

> **Source PDF**: THE_DEFINITIVE_GUIDE_TO_THE_ARM_CORTEX-МЗ_Stellaris_MCU_9000Series_TEINSTRUMENTS_ARM_SECOND_EDITION.pdf  
> **PDF Page Range**: 432 - 433


---


<!-- Page 432 -->
### [PDF Page 432]

405
B
Most of the 16-bit Thumb® instructions are available in architecture v4T (ARM7TDMI). However, a
number of them are added in architecture v5, v6, and v7. Table B.1 lists these instructions.
The 16-Bit Thumb Instructions
and Architecture Versions
APPENDIX
Table B.1  Change of 16-bit Instruction Support in Various Recent ARM Architecture Versions
Instruction
V4T
v5
v6
Cortex™-M3 (v7-M)
BKPT
N
Y
Y
Y
BLX
N
Y
Y
BLX <reg> only
CBZ, CBNZ
N
N
N
Y
CPS
N
N
Y
CPSIE <i/f>, CPSID <i/f>
CPY
N
N
Y
Y
NOP
N
N
N
Y
IT
N
N
N
Y
REV (various forms)
N
N
Y
REV, REV16, REVSH
SEV
N
N
N
Y
SETEND
N
N
Y
N
SWI
Y
Y
Y
Changed to SVC
SXTB, SXTH
N
N
Y
Y
UXTB, UXTH
N
N
Y
Y
WFE, WFI
N
N
N
Y



<!-- Page 433 -->
### [PDF Page 433]

This page intentionally left blank


