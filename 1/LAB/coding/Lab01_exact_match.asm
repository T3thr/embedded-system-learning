;66362416 Theerapat Pooraya
;Lab 1.1
mov 01H,#06H
mov 02H,#06H
mov 03H,#03H
mov 04H,#06H
mov 05H,#02H
mov 06H,#04H
mov 07H,#01H
mov 08H,#06H
;Lab 1.2
mov p0,01H
mov p0,02H
mov p0,03H
mov p0,04H
mov p0,05H
mov p0,06H
mov p0,07H
mov p0,08H
;Lab 1.3
mov r0,#01H
loop:
mov p0,@r0
inc r0
cjne r0,#09H,loop
;Lab 1.4
mov SP,#10H
mov r0,#08H
loop:
mov B,@r0
PUSH B
dec r0
cjne r0,#00H,loop
mov r0,#01H
loop1:
POP p0
inc r0
cjne r0,#09H,loop1
