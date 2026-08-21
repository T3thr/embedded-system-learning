# Appendix B: Basics of Wire Wrapping

> **Textbook**: The AVR Microcontroller and Embedded Systems using Assembly and C

> **PDF Page Range**: 740 - 742


---


<!-- Page 740 -->
### [PDF Page 740]

APPENDIX B
BASICS OF
WIRE WRAPPING
OVERVIEW
This appendix shows the basics of wire wrapping.
733



<!-- Page 741 -->
### [PDF Page 741]

BASICS OF WIRE WRAPPING
Note: For this tutorial appendix, you will need the following:
Wire-wrapping tool (Radio Shack part number 276-1570)
30-gauge (30-AWG) wire for wire wrapping
(Thanks to Shannon Looper and Greg Boyle for their assistance on this section.)
The following describes the basics of wire wrapping.
1. There are several different types of wire-wrap tools available. The best one is
available from Radio Shack for less than $10. The part number for Radio
Shack is 276-1570. This tool combines the wrap and unwrap functions in the
same end of the tool and includes a separate stripper. We found this to be much
easier to use than the tools that combined all these features on one two-ended
shaft. There are also wire-wrap guns, which are, of course, more expensive.
2. Wire-wrapping wire is available prestripped in various lengths or in bulk on a
spool. The prestripped wire is usually more expensive and you are restricted to
the different wire lengths you can afford to buy. Bulk wire can be cut to any
length you wish, which allows each wire to be custom fit.
3. Serveral different types of wire-wrap boards are available. These are usually
called perfboards or wire-wrap boards. These types of boards are sold at many
electronics stores (such as Radio Shack). The best type of board has plating
around the holes on the bottom of the board. These boards are better because
the sockets and pins can be soldered to the board, which makes the circuit more
mechanically stable.
4. Choose a board that is large enough to accommodate all the parts in your
design with room to spare so that the wiring does not become too cluttered. If
you wish to expand your project in the future, you should be sure to include
enough room on the original board for the complete circuit. Also, if possible,
the layout of the IC on the board needs to be such that signals go from left to
right just like the schematics.
5. To make the wiring easier and to keep pressure off the pins, install one stand-
off on each corner of the board. You may also wish to put standoffs on the top
of the board to add stability when the board is on its back.
6. For power hook-up, use some type of standard binding post. Solder a few sin-
gle wire-wrap pins to each power post to make circuit connections (to at least
one pin for each IC in the circuit)
7. To further reduce problems with power, each IC must have its own connection
to the main power of the board. If your perfboard does not have built-in power
buses, run a separate power and ground wire from each IC to the main power
In other words, DO NOT daisy chain (making a chip-to-chip connection is
called daisy chaining) power connections, as each connection down the line
will have more wire and more resistance to get power through. However, daisy
chaining is acceptable for other connections such as data, address, and control
buses.
8. You must use wire-wrap sockets. These sockets have long square pins whose
edges will cut into the wire as it is wrapped around the pin.
9. Wire wrapping will not work on round legs. If you need to wrap to compo-
734



<!-- Page 742 -->
### [PDF Page 742]

nents, such as capacitors, that have round legs, you must also solder these con-
nections. The best way to connect single components is to install individual
wire-wrap pins into the board and then solder the components to the pins. An
alternate method is to use an empty IC socket to hold small components such
as resistors and wrap them to the socket.
10. The wire should be stripped about 1 inch. This will allow 7 to 10 turns for each
connection. The first turn or turn-and-a-half should be insulated. This prevents
stripped wire from coming in contact with other pins. This can be accom-
plished by inserting the wire as far as it will go into the tool before making the
connection.
11. Try to keep wire lengths to a minimum. This prevents the circuit from looking
like a bird nest. Be neat and use color coding as much as possible. Use only
red wires for Vcc and black wires for ground connections. Also use different
colors for data, address, and control signal connections. These suggestions will
make troubleshooting much easier.
12. It is standard practice to connect all power lines first and check them for con-
tinuity. This will eliminate trouble later on.
13. It's also a good idea to mark the pin orientation on the bottom of the board.
Plastic templates are available with pin numbers preprinted on them specifi-
cally for this purpose or you can make your own from paper. Forgetting to
reverse pin order when looking at the bottom of the board is a very common
mistake when wire wrapping circuits.
14. To prevent damage to your circuit, place a diode (such as IN5338) in reverse
bias across the power supply. If the power gets hooked up backwards, the
diode will be forward biased and will act as a short, keeping the reversed volt-
age from your circuit.
15. In digital circuits, there can be a problem with current demand on the power
supply. To filter the noise on the power supply, a 100 uF electrolytic capacitor
and a O.1 uF monolithic capacitor are connected from Voc to ground, in par-
allel with each other, at the entry point of the power supply to the board. These
two together will filter both the high- and the low-frequency noises. Instead of
using two capacitors in parallel, you can use a single 20-100 uF tantalum
capacitor. Remember that the long lead is the positive one.
16. To filter the transient current, use a 0.1 uF monolithic capacitor for each IC.
Place the 0.1 uF monolithic capacitor between Vcc and ground of each IC.
Make sure the leads are as short as possible.
IC#1
IC #2
IC #3
IC #4
Figure B-1. Daisy Chain Connection (not recommended for power lines)
APPENDIX B: BASIC OF WIRE WRAPPING
735


