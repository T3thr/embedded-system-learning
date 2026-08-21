# Conventions

> **Source PDF**: THE_DEFINITIVE_GUIDE_TO_THE_ARM_CORTEX-МЗ_Stellaris_MCU_9000Series_TEINSTRUMENTS_ARM_SECOND_EDITION.pdf  
> **PDF Page Range**: 25 - 25


---


<!-- Page 25 -->
### [PDF Page 25]

xxiv
Conventions
Various typographical conventions have been used in this book, as follows:
Normal assembly program codes:
•
MOV   R0, R1;  Move data from Register R1 to Register R0
Assembly code in generalized syntax; items inside < > must be replaced by real register names:
•
MRS  <reg>, <special_reg>
C program codes:
•
for (i=0;i<3;i++) { func1(); }
Pseudocode:
•
if (a > b) { ...
Values:
•
4’hC, 0x123 are both hexadecimal values
1.
2.	 #3 indicates item number 3 (e.g., IRQ #3 means IRQ number 3)
3.	 #immed_12 refers to 12-bit immediate data
Register bits:
•
Typically used to illustrate a part of a value based on bit position; for example, bit[15:12] means
bit number 15 down to 12.
Register access types are as follows:
•
R is Read only
1.
W is Write only
2.
R/W is Read or Write accessible
3.
R/Wc is Readable and clear by a Write access
4.


