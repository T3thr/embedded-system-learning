# Foreword by Paul Kimelman

> **Source PDF**: THE_DEFINITIVE_GUIDE_TO_THE_ARM_CORTEX-МЗ_Stellaris_MCU_9000Series_TEINSTRUMENTS_ARM_SECOND_EDITION.pdf  
> **PDF Page Range**: 18 - 20


---


<!-- Page 18 -->
### [PDF Page 18]

xvii
Foreword
When I first approached ARM management to propose a new MCU architecture in 2003, I did not
know what kind of response I would get. I carefully explained the MCU landscape in terms of the wide
array of incompatible 8-bit, 16-bit, and 32-bit parts. My point was that the world was crying out for a
standard architecture to make things easier for the developer, but that the ARM7/ARM9 was not in that
lineage. Of course many people at ARM had previously suggested an MCU strategy, but my perspec-
tive was that you had to learn from the successes (and failures) of the real workhorse MCUs, not just
the ARM history, which was based on desktop computers. Since I had developed code for many of the
8-bit and 16-bit parts from 8051 and 8080/Z80 to PIC to MSP430 and ARM7, I had the battle scars
needed to understand what worked and what did not.
Internally we called this new architecture “Thumbnail”, since the intent was to build it from Thumb
and the new Thumb-2 extensions we were designing. We decided that it had to be focused on both
general purpose MCU and Automotive. The basic architectural design was refined through discussions
with ARM partners, automotive developers, and potential users of this new processor. Some features
that may seem odd to the general purpose developer were put there specifically for the automotive
world and in particular AUTOSAR; these extensions turned out to be fortuitous for the general devel-
oper because of the increased focus on functional safety and security.
From the beginning, I was determined to make this an interrupt processor, much as a 68K or 8051
was. Although that would be quite contrary to the ARM tradition, interrupt processing is often what
deeply embedded applications are all about. By determining that interrupt processing would be in the
DNA of the architecture and processor, it meant extending past the normal ARM definition of a core
processor to including a proper interrupt controller. Having the interrupt controller integrated into the
processor meant that we could change the very nature of what the processor could do. Although I
looked at the usual “shadow registers” model employed by various processors to handle nesting, there
are always developers who need just one more set to meet their needs, and the cost of saving/restoring
is too painful to contemplate. So, the logical conclusion was to have the processor save the registers
on the stack in hardware. From that, we were able to develop a number of patented techniques that
not only made it faster and smaller, but also ensured standard compiled languages could just work
normally and naturally. Equally, we built an RTOS kernel concept right into the architecture to ensure
the smoothest use of an RTOS if wanted, or to comfortably skip one if not. Finally, I was determined
to end the “debug as afterthought” approach I had suffered with so many times in the past. Every effort
was made to provide Champagne debug support on a Beer transistor budget; this included plenty of
breakpoints on code in flash, powerful watch-points, meta-trace that could be handled by very low cost
hardware probes, and access to the system while it was running. Every aspect of debug support was
oriented to the needs of the developer and what was likely to be supported by the tools they buy—if it
won’t be supported, why bother adding it?
To grow from an architecture to an actual processor is not an easy birthing. After a few false starts,
a couple of us started a skunk-works project we called “TazCat”. We named it that because at the time
we were using types of cats for project names at ARM, and TazCat was based on the Tazmanian Tiger,
which was thought extinct but continues to have sightings. TazCat became an official project at the
end of 2004 and was renamed SandCat. Thumbnail was renamed ARMv7-M (M for MCU) as part
of a new architectural naming—we could not very well call a cut-down architecture ARMv8, as the



<!-- Page 19 -->
### [PDF Page 19]

xviii
Foreword
larger ­number is supposed to mean yet more features. Similarly, the Cortex processor naming was used
because an ARM13 processor could not be tiny compared to an ARM12.
Cortex-M3 was developed with a very heavy focus on gate count, power use, dynamic speed range,
and efficiency. Gate count was a major consideration only because it affects power and efficiency and
is usually a good metric for whether you did it well vs. brute force. Significant focus was put on power
because the MSP430 had shown the value of very low power consumption in broad MCU applications.
Yet, at the same time, a lot of focus was put on maximum clock speed. One of the major issues with
most existing MCU processors is that they are very limited in top speed. Although many applications
may be fine at 10 or 20MHz, many applications need more. Further, many existing applications will
need to do more or do it faster over time, so top speed cannot be capped. That said, MCUs run from
flash memory, and flash becomes the major limiting factor in process geometry choice and top speed.
So, extra effort was made to allow Cortex-M3 to run efficiently even when the flash was slower than
the core speed.
Cortex-M3 was co-developed between our small group in Walnut Creek, California, and a team in
Cambridge, UK. We had verification and validation engineers in India. This was not only a truly global
endeavor, but the sun never set on the development team! We used that time difference to maximize our
development and were able to come in under budget and on schedule. We also used additional testing
and validation techniques to ensure highest quality: we ran real applications from day 1. By working
with the compiler team from the outset and by compiling real-world applications (and not just vectors
and benchmark suites), we could find bugs that only real developers would see. Our demonstration sys-
tem running on a regular speed/size FPGA included running the DivX decoder showing 15fps video on
a VGA screen, MP3 and WMA encode and decode in realtime, GPS decode from raw data, Doom (the
game), spinning a brushless DC fan motor (with speed control input and output via serial), and many
applications sent to us by various developers in automotive and industrial companies; of course we also
ran all of the normal benchmarks from Dhrystone to EEMBC. What is important is that this technique
also allowed us to tune timing on instructions to optimize real code generated by real compilers.
Part of the original concept proposed to the ARM management and board was that we needed a
real lead partner in the general purpose market. The new architecture would have to be evangelized
and we could not wait 2 years for the 1st Silicon as was usual for ARM’s partners. Further, we wanted
a company that was not trying to protect their own proprietary processor. Coincidentally, Jean Anne
Booth of newly-formed Luminary Micro approached ARM about doing an MCU. It was a perfect fit,
and Luminary Micro quickly became the 1st lead partner for Cortex-M3. Luminary was exactly what
we were looking for—a strong management team with broad experience in the embedded space and
the know-how to set up worldwide distribution. Further, Luminary put together a strong engineering
team with significant ARM experience, so we did not have to worry about them not understanding how
to work with an AHB-Lite bus. Our 2nd lead partner was Texas Instruments’ automotive group, so we
had covered the two main objectives perfectly.
When we shipped our early access release (the 1st production version of the processor) in early
2006, Luminary taped it out 2 weeks later! This was unheard of in the industry and a real testament to
their IC engineering team as well as to the close relationship between ARM and Luminary. Further,
they were willing to do this because we in the SandCat team had convinced them that it was bug free;
being a startup, Luminary could not afford to fabricate a buggy and therefore worthless chip. The other
lead partners took much longer to have 1st parts, as was typical. By Luminary having a chip right away,
ARM was able to show the world Cortex-M3 as a real product and not just slides or an FPGA demo



<!-- Page 20 -->
### [PDF Page 20]

xix
Foreword
board. Further, by Luminary pricing the 1st chip at $1 (US), it broke all notions of the price barriers
between 8-bit and 32-bit processors. Cortex-M3 was off and running.
One of the real strengths of Luminary Micro from the beginning was that they understood the
importance of tools and software to MCU developers. Luminary raised the standard by a wide margin
from the very beginning: from low cost evaluation boards and easy out of box experience to a wide
variety of examples, developers were able to get started quickly and easily—a tradition still found
today with Texas Instruments’ Stellaris Cortex-M3 products.
I think the 5 truly innovative approaches to the MCU world that Luminary used (and many have
tried to copy) were: low cost evaluation boards that had their own USB debug HW probe built in, being
able to use the same low cost evaluation boards as debug probes for the customer’s own board, hav-
ing broad and interesting examples that worked with multiple tools, providing a standard open driver
package (called DriverLib then, now more broadly called StellarisWare) that meant you did not have
to read the datasheet, and having powerful reference designs that were available in source form. Nor-
mally, MCU vendors have a few examples that blink some LEDs and print “hello world” on a serial
port; after that, they rely on customers and FAEs and a lot of time to get a hodgepodge of examples
and demos that often do not work on newer parts nor with different tools. Luminary took the approach
of very sophisticated examples that allowed developers to start from real code and extend from there.
They had reference designs that were more real-world, such as the autonomous robot car, the CNC
milling machine, and the like; each demonstrating real-world embedded system techniques. Further,
they not only understood the importance of RTOS and tools support, they made sure that all examples
worked with all tools and all OS-oriented examples worked with all RTOSes. This coupled with a well
thought-out standard software library (drivers for peripherals, startup code, protocol stacks, etc) meant
that developers could be productive in minutes. That approach has helped to launch Cortex-M3 into
many applications around the world.
Since I believed that Luminary Micro was already bringing innovation to the general developers, it
should come as no surprise to you that when I left ARM in 2007, I joined Luminary to help drive further
adoption of Cortex-M3.  Luminary Micro was acquired by Texas Instruments in May 2009, and is now
the Stellaris Business Unit, still doing everything Luminary was doing and more.
With that background, know that you will be using a processor and tools and system all designed
to make your job easier, more enjoyable, and more effective. There will no doubt be many features of
Cortex-M3 you never use, but they are there for the day when you find you need them.
—Paul Kimelman


