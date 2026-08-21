# Front Matter (Title, Copyright, Prefaces)

> **Textbook**: Introduction to Embedded Systems - A Cyber-Physical Systems Approach (UC Berkeley)  
> **Authors**: Edward Ashford Lee and Sanjit Arunkumar Seshia  
> **PDF Page Range**: 1 - 20


---


<!-- Page 1 -->
### [PDF Page 1]

Introduction to
Embedded Systems
A Cyber-Physical Systems Approach
Edward Ashford Lee
Sanjit Arunkumar Seshia
UC Berkeley
First Edition
http://LeeSeshia.org



<!-- Page 2 -->
### [PDF Page 2]

Copyright c⃝2011-2012
Edward Ashford Lee & Sanjit Arunkumar Seshia
All rights reserved
First Edition, Version 1.06
ISBN 978-0-557-70857-4
Please cite this book as:
E. A. Lee and S. A. Seshia,
Introduction to Embedded Systems - A Cyber-Physical Systems Approach,
LeeSeshia.org, 2011.



<!-- Page 3 -->
### [PDF Page 3]

This book is dedicated to our families.



<!-- Page 4 -->
### [PDF Page 4]




<!-- Page 5 -->
### [PDF Page 5]

Contents
Preface . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
xi
1
Introduction
1
1.1
Applications . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
2
1.2
Motivating Example
. . . . . . . . . . . . . . . . . . . . . . . . . . . .
6
1.3
The Design Process . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
8
1.4

### Summary

. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
15
I
Modeling Dynamic Behaviors
17
2
Continuous Dynamics
19
2.1
Newtonian Mechanics . . . . . . . . . . . . . . . . . . . . . . . . . . . .
20
2.2
Actor Models . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
25
2.3
Properties of Systems . . . . . . . . . . . . . . . . . . . . . . . . . . . .
29
2.4
Feedback Control . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
32
2.5

### Summary

. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
37

### Exercises

. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
38
v



<!-- Page 6 -->
### [PDF Page 6]

3
Discrete Dynamics
41
3.1
Discrete Systems . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
42
3.2
The Notion of State . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
46
3.3
Finite-State Machines . . . . . . . . . . . . . . . . . . . . . . . . . . . .
47
3.4
Extended State Machines . . . . . . . . . . . . . . . . . . . . . . . . . .
57
3.5
Nondeterminism
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
63
3.6
Behaviors and Traces . . . . . . . . . . . . . . . . . . . . . . . . . . . .
66
3.7

### Summary

. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
70

### Exercises

. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
71
4
Hybrid Systems
77
4.1
Modal Models . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
78
4.2
Classes of Hybrid Systems . . . . . . . . . . . . . . . . . . . . . . . . .
82
4.3

### Summary

. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
98

### Exercises

. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 100
5
Composition of State Machines
107
5.1
Concurrent Composition . . . . . . . . . . . . . . . . . . . . . . . . . . 109
5.2
Hierarchical State Machines
. . . . . . . . . . . . . . . . . . . . . . . . 123
5.3

### Summary

. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 127

### Exercises

. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 129
6
Concurrent Models of Computation
131
6.1
Structure of Models . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 133
6.2
Synchronous-Reactive Models . . . . . . . . . . . . . . . . . . . . . . . 134
6.3
Dataﬂow Models of Computation . . . . . . . . . . . . . . . . . . . . . . 144
6.4
Timed Models of Computation . . . . . . . . . . . . . . . . . . . . . . . 156
6.5

### Summary

. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 166

### Exercises

. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 167
vi
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 7 -->
### [PDF Page 7]

II
Design of Embedded Systems
173
7
Embedded Processors
175
7.1
Types of Processors . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 177
7.2
Parallelism
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 184
7.3

### Summary

. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 201

### Exercises

. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 202
8
Memory Architectures
203
8.1
Memory Technologies
. . . . . . . . . . . . . . . . . . . . . . . . . . . 204
8.2
Memory Hierarchy . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 206
8.3
Memory Models . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 215
8.4

### Summary

. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 219

### Exercises

. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 221
9
Input and Output
223
9.1
I/O Hardware . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 224
9.2
Sequential Software in a Concurrent World
. . . . . . . . . . . . . . . . 236
9.3
The Analog/Digital Interface . . . . . . . . . . . . . . . . . . . . . . . . 246
9.4

### Summary

. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 255

### Exercises

. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 256
10 Multitasking
265

## 10.1 Imperative Programs

. . . . . . . . . . . . . . . . . . . . . . . . . . . . 268

## 10.2 Threads . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 272


## 10.3 Processes and Message Passing . . . . . . . . . . . . . . . . . . . . . . . 285


## 10.4 Summary

. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 290

### Exercises

. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 291
11 Scheduling
293

## 11.1 Basics of Scheduling . . . . . . . . . . . . . . . . . . . . . . . . . . . . 294

Lee & Seshia, Introduction to Embedded Systems
vii



<!-- Page 8 -->
### [PDF Page 8]


## 11.2 Rate Monotonic Scheduling

. . . . . . . . . . . . . . . . . . . . . . . . 300

## 11.3 Earliest Deadline First

. . . . . . . . . . . . . . . . . . . . . . . . . . . 305

## 11.4 Scheduling and Mutual Exclusion

. . . . . . . . . . . . . . . . . . . . . 310

## 11.5 Multiprocessor Scheduling . . . . . . . . . . . . . . . . . . . . . . . . . 315


## 11.6 Summary

. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 319

### Exercises

. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 321
III
Analysis and Veriﬁcation
327
12 Invariants and Temporal Logic
329

## 12.1 Invariants . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 331


## 12.2 Linear Temporal Logic . . . . . . . . . . . . . . . . . . . . . . . . . . . 333


## 12.3 Summary

. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 341

### Exercises

. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 343
13 Equivalence and Reﬁnement
347

## 13.1 Models as Speciﬁcations . . . . . . . . . . . . . . . . . . . . . . . . . . 348


## 13.2 Type Equivalence and Reﬁnement . . . . . . . . . . . . . . . . . . . . . 350


## 13.3 Language Equivalence and Containment . . . . . . . . . . . . . . . . . . 352


## 13.4 Simulation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 358


## 13.5 Bisimulation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 366


## 13.6 Summary

. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 368

### Exercises

. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 369
14 Reachability Analysis and Model Checking
373

## 14.1 Open and Closed Systems

. . . . . . . . . . . . . . . . . . . . . . . . . 374

## 14.2 Reachability Analysis . . . . . . . . . . . . . . . . . . . . . . . . . . . . 376


## 14.3 Abstraction in Model Checking . . . . . . . . . . . . . . . . . . . . . . . 383


## 14.4 Model Checking Liveness Properties . . . . . . . . . . . . . . . . . . . . 386


## 14.5 Summary

. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 391
viii
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 9 -->
### [PDF Page 9]


### Exercises

. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 394
15 Quantitative Analysis
395

## 15.1 Problems of Interest . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 397


## 15.2 Programs as Graphs . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 399


## 15.3 Factors Determining Execution Time . . . . . . . . . . . . . . . . . . . . 404


## 15.4 Basics of Execution Time Analysis . . . . . . . . . . . . . . . . . . . . . 410


## 15.5 Other Quantitative Analysis Problems . . . . . . . . . . . . . . . . . . . 419


## 15.6 Summary

. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 421

### Exercises

. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 423
IV
Appendices
425
A Sets and Functions
427
A.1
Sets . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 427
A.2
Relations and Functions . . . . . . . . . . . . . . . . . . . . . . . . . . . 428
A.3
Sequences . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 432

### Exercises

. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 435
B
Complexity and Computability
437
B.1
Effectiveness and Complexity of Algorithms . . . . . . . . . . . . . . . . 438
B.2
Problems, Algorithms, and Programs . . . . . . . . . . . . . . . . . . . . 441
B.3
Turing Machines and Undecidability . . . . . . . . . . . . . . . . . . . . 443
B.4
Intractability: P and NP . . . . . . . . . . . . . . . . . . . . . . . . . . . 449
B.5

### Summary

. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 453

### Exercises

. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 454
Bibliography
455
Notation Index
471
Index
473
Lee & Seshia, Introduction to Embedded Systems
ix



<!-- Page 10 -->
### [PDF Page 10]

x
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 11 -->
### [PDF Page 11]

Preface
What this Book is About
The most visible use of computers and software is processing information for human
consumption. We use them to write books (like this one), search for information on
the web, communicate via email, and keep track of ﬁnancial data. The vast majority of
computers in use, however, are much less visible. They run the engine, brakes, seatbelts,
airbag, and audio system in your car. They digitally encode your voice and construct a
radio signal to send it from your cell phone to a base station. They control your microwave
oven, refrigerator, and dishwasher. They run printers ranging from desktop inkjet printers
to large industrial high-volume printers. They command robots on a factory ﬂoor, power
generation in a power plant, processes in a chemical plant, and trafﬁc lights in a city. They
search for microbes in biological samples, construct images of the inside of a human body,
and measure vital signs. They process radio signals from space looking for supernovae
and for extraterrestrial intelligence. They bring toys to life, enabling them to react to
human touch and to sounds. They control aircraft and trains. These less visible computers
are called embedded systems, and the software they run is called embedded software.
Despite this widespread prevalence of embedded systems, computer science has, through-
out its relatively short history, focused primarily on information processing. Only recently
have embedded systems received much attention from researchers. And only recently has
xi



<!-- Page 12 -->
### [PDF Page 12]

PREFACE
the community recognized that the engineering techniques required to design and ana-
lyze these systems are distinct. Although embedded systems have been in use since the
1970s, for most of their history they were seen simply as small computers. The principal
engineering problem was understood to be one of coping with limited resources (limited
processing power, limited energy sources, small memories, etc.). As such, the engineer-
ing challenge was to optimize the designs. Since all designs beneﬁt from optimization,
the discipline was not distinct from anything else in computer science. It just had to be
more aggressive about applying the same optimization techniques.
Recently, the community has come to understand that the principal challenges in em-
bedded systems stem from their interaction with physical processes, and not from their
limited resources. The term cyber-physical systems (CPS) was coined by Helen Gill at the
National Science Foundation in the U.S. to refer to the integration of computation with
physical processes. In CPS, embedded computers and networks monitor and control the
physical processes, usually with feedback loops where physical processes affect compu-
tations and vice versa. The design of such systems, therefore, requires understanding the
joint dynamics of computers, software, networks, and physical processes. It is this study
of joint dynamics that sets this discipline apart.
When studying CPS, certain key problems emerge that are rare in so-called general-
purpose computing. For example, in general-purpose software, the time it takes to per-
form a task is an issue of performance, not correctness. It is not incorrect to take longer
to perform a task. It is merely less convenient and therefore less valuable. In CPS, the
time it takes to perform a task may be critical to correct functioning of the system. In the
physical world, as opposed to the cyber world, the passage of time is inexorable.
In CPS, moreover, many things happen at once. Physical processes are compositions
of many things going on at once, unlike software processes, which are deeply rooted
in sequential steps. Abelson and Sussman (1996) describe computer science as “proce-
dural epistemology,” knowledge through procedure. In the physical world, by contrast,
processes are rarely procedural. Physical processes are compositions of many parallel
processes. Measuring and controlling the dynamics of these processes by orchestrating
actions that inﬂuence the processes are the main tasks of embedded systems. Conse-
quently, concurrency is intrinsic in CPS. Many of the technical challenges in designing
and analyzing embedded software stem from the need to bridge an inherently sequential
semantics with an intrinsically concurrent physical world.
xii
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 13 -->
### [PDF Page 13]

PREFACE
Why We Wrote this Book
Today, getting computers to work together with physical processes requires technically
intricate, low-level design. Embedded software designers are forced to struggle with inter-
rupt controllers, memory architectures, assembly-level programming (to exploit special-
ized instructions or to precisely control timing), device driver design, network interfaces,
and scheduling strategies, rather than focusing on specifying desired behavior. The sheer
mass and complexity of these technologies tempts us to focus an introductory course on
mastering them. But a better introductory course would focus on how to model and design
the joint dynamics of software, networks, and physical processes. Such a course would
present the technologies only as today’s (rather primitive) means of accomplishing those
joint dynamics. This book is our attempt at a textbook for such a course.
Most texts on embedded systems focus on the collection of technologies needed to get
computers to interact with physical systems (Barr and Massa, 2006; Berger, 2002; Burns
and Wellings, 2001; Kamal, 2008; Noergaard, 2005; Parab et al., 2007; Simon, 2006; Val-
vano, 2007; Wolf, 2000). Others focus on adaptations of computer-science techniques
(like programming languages, operating systems, networking, etc.) to deal with techni-
cal problems in embedded systems (Buttazzo, 2005a; Edwards, 2000; Pottie and Kaiser,
2005). While these implementation technologies are (today) necessary for system de-
signers to get embedded systems working, they do not form the intellectual core of the
discipline. The intellectual core is instead in models and abstractions that conjoin com-
putation and physical dynamics.
A few textbooks offer efforts in this direction. Jantsch (2003) focuses on concurrent mod-
els of computation, Marwedel (2011) focuses on models of software and hardware behav-
ior, and Sriram and Bhattacharyya (2009) focus on dataﬂow models of signal processing
behavior and their mapping onto programmable DSPs. These are excellent starting points.
Models of concurrency (such as dataﬂow) and abstract models of software (such as Stat-
echarts) provide a better starting point than imperative programming languages (like C),
interrupts and threads, and architectural annoyances that a designer must work around
(like caches). These texts, however, are not suitable for an introductory course. They are
either too specialized or too advanced or both. This book is our attempt to provide an
introductory text that follows the spirit of focusing on models and their relationship to
realizations of systems.
The major theme of this book is on models and their relationship to realizations of sys-
tems. The models we study are primarily about dynamics, the evolution of a system state
Lee & Seshia, Introduction to Embedded Systems
xiii



<!-- Page 14 -->
### [PDF Page 14]

PREFACE
in time. We do not address structural models, which represent static information about the
construction of a system, although these too are important to embedded system design.
Working with models has a major advantage. Models can have formal properties. We can
say deﬁnitive things about models. For example, we can assert that a model is determinate,
meaning that given the same inputs it will always produce the same outputs. No such
absolute assertion is possible with any physical realization of a system. If our model is
a good abstraction of the physical system (here, “good abstraction” means that it omits
only inessential details), then the deﬁnitive assertion about the model gives us conﬁdence
in the physical realization of the system. Such conﬁdence is hugely valuable, particularly
for embedded systems where malfunctions can threaten human lives. Studying models of
systems gives us insight into how those systems will behave in the physical world.
Our focus is on the interplay of software and hardware with the physical environment in
which they operate. This requires explicit modeling of the temporal dynamics of soft-
ware and networks and explicit speciﬁcation of concurrency properties intrinsic to the
application. The fact that the implementation technologies have not yet caught up with
this perspective should not cause us to teach the wrong engineering approach. We should
teach design and modeling as it should be, and enrich this with a critical presentation of
how to (partially) accomplish our objectives with today’s technology. Embedded systems
technologies today, therefore, should not be presented dispassionately as a collection of
facts and tricks, as they are in many of the above cited books, but rather as stepping stones
towards a sound design practice. The focus should be on what that sound design practice
is, and on how today’s technologies both impede and achieve it.
Stankovic et al. (2005) support this view, stating that “existing technology for RTES [real-
time embedded systems] design does not effectively support the development of reliable
and robust embedded systems.” They cite a need to “raise the level of programming
abstraction.” We argue that raising the level of abstraction is insufﬁcient. We have also
to fundamentally change the abstractions that are used. Timing properties of software,
for example, cannot be effectively introduced at higher levels of abstraction if they are
entirely absent from the lower levels of abstraction on which these are built.
We require robust and predictable designs with repeatable temporal dynamics (Lee, 2009a).
We must do this by building abstractions that appropriately reﬂect the realities of cyber-
physical systems. The result will be CPS designs that can be much more sophisticated,
including more adaptive control logic, evolvability over time, and improved safety and re-
liability, all without suffering from the brittleness of today’s designs, where small changes
have big consequences.
xiv
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 15 -->
### [PDF Page 15]

PREFACE
In addition to dealing with temporal dynamics, CPS designs invariably face challenging
concurrency issues. Because software is so deeply rooted in sequential abstractions, con-
currency mechanisms such as interrupts and multitasking, using semaphores and mutual
exclusion, loom large. We therefore devote considerable effort in this book to developing
a critical understanding of threads, message passing, deadlock avoidance, race conditions,
and data determinism.
What is Missing
This version of the book is not complete. It is arguable, in fact, that complete coverage of
embedded systems in the context of CPS is impossible. Speciﬁc topics that we cover in
the undergraduate Embedded Systems course at Berkeley (see http://LeeSeshia.org) and
hope to include in future versions of this book include sensors and actuators, networking,
fault tolerance, security, simulation techniques, control systems, and hardware/software
codesign.
How to Use this Book
This book is divided into three major parts, focused on modeling, design, and analysis, as
shown in Figure 1. The three parts of the book are relatively independent of one another
and are largely meant to be read concurrently. A systematic reading of the text can be
accomplished in seven segments, shown with dashed outlines. Each segment includes two
chapters, so complete coverage of the text is possible in a 15 week semester, assuming
each of the seven modules takes two weeks, and one week is allowed for introduction and
closing.
The appendices provide background material that is well covered in other textbooks, but
which can be quite helpful in reading this text. Appendix A reviews the notation of
sets and functions. This notation enables a higher level of precision that is common
in the study of embedded systems. Appendix B reviews basic results in the theory of
computability and complexity. This facilitates a deeper understanding of the challenges
in modeling and analysis of systems. Note that Appendix B relies on the formalism of
state machines covered in Chapter 3, and hence should be read after reading Chapter 3.
In recognition of recent advances in technology that are fundamentally changing the tech-
nical publishing industry, this book is published in a non-traditional way. At least the
present version is available free in the form of PDF ﬁle designed speciﬁcally for on-line
Lee & Seshia, Introduction to Embedded Systems
xv



<!-- Page 16 -->
### [PDF Page 16]

PREFACE
reading. It can be obtained from the website http://LeeSeshia.org. The layout is optimized
for medium-sized screens, particularly laptop computers and the iPad and other tablets.
Extensive use of hyperlinks and color enhance the online reading experience.
Figure 1: Map of the book with strong and weak dependencies between chapters.
Strong dependencies between chapters are shown with arrows in black. Weak
dependencies are shown in grey. When there is a weak dependency from chapter
i to chapter j, then j may mostly be read without reading i, at most requiring
skipping some examples or specialized analysis techniques.
xvi
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 17 -->
### [PDF Page 17]

PREFACE
We attempted to adapt the book to e-book formats, which, in theory, enable reading on
various sized screens, attempting to take best advantage of the available screen. However,
like HTML documents, e-book formats use a reﬂow technology, where page layout is
recomputed on the ﬂy. The results are highly dependent on the screen size and prove
ludicrous on many screens and suboptimal on all. As a consequence, we have opted
for controlling the layout, and we do not recommend attempting to read the book on an
iPhone.
Although the electronic form is convenient, we recognize that there is real value in a
tangible manifestation on paper, something you can thumb through, something that can
live on a bookshelf to remind you of its existence. Hence, the book is also available in print
form from a print-on-demand service. This has the advantages of dramatically reduced
cost to the reader (compared with traditional publishers) and the ability to quickly and
frequently update the version of the book to correct errors and discuss new technologies.
See the website http://LeeSeshia.org for instructions on obtaining the printed version.
Two disadvantages of print media compared to electronic media are the lack of hyperlinks
and the lack of text search. We have attempted to compensate for those limitations by
providing page number references in the margin of the print version whenever a term is
used that is deﬁned elsewhere. The term that is deﬁned elsewhere is underlined with a
discrete light gray line. In addition, we have provided an extensive index, with more than
2,000 entries.
There are typographic conventions worth noting. When a term is being deﬁned, it will ap-
pear in bold face, and the corresponding index entry will also be in bold face. Hyperlinks
are shown in blue in the electronic version. The notation used in diagrams, such as those
for ﬁnite-state machines, is intended to be familiar, but not to conform with any particular
programming or modeling language.
Intended Audience
This book is intended for students at the advanced undergraduate level or introductory
graduate level, and for practicing engineers and computer scientists who wish to under-
stand the engineering principles of embedded systems. We assume that the reader has
some exposure to machine structures (e.g., should know what an ALU is), computer pro-
gramming (we use C throughout the text), basic discrete mathematics and algorithms, and
at least an appreciation for signals and systems (what it means to sample a continuous-
time signal, for example).
Lee & Seshia, Introduction to Embedded Systems
xvii



<!-- Page 18 -->
### [PDF Page 18]

PREFACE
Acknowledgements
The authors gratefully acknowledge contributions and helpful suggestions from Murat
Arcak, Dai Bui, Janette Cardoso, Gage Eads, Stephen Edwards, Suhaib Fahmy, Shanna-
Shaye Forbes, Jeff C. Jensen, Jonathan Kotker, Wenchao Li, Isaac Liu, Slobodan Matic,
Le Ngoc Minh, Christian Motika, Steve Neuendorffer, David Olsen, Minxue Pan, Hiren
Patel, Jan Reineke, Rhonda Righter, Chris Shaver, Shih-Kai Su (together with students
in CSE 522, lectured by Dr. Georgios E. Fainekos at Arizona State University), Stavros
Tripakis, Pravin Varaiya, Reinhard von Hanxleden, Kevin Weekly, Maarten Wiggers, Qi
Zhu, and the students in UC Berkeley’s EECS 149 class over the past three years, partic-
ularly Ned Bass and Dan Lynch. The authors are especially grateful to Elaine Cheong,
who carefully read most chapters and offered helpful editorial suggestions. We give spe-
cial thanks to our families for their patience and support, particularly to Helen, Katalina,
and Rhonda (from Edward), and Appa, Amma, Ashwin, and Bharathi (from Sanjit).
This book is almost entirely constructed using open-source software. The typesetting is
done using LaTeX, and many of the ﬁgures are created using Ptolemy II. See:
http://Ptolemy.org
Reporting Errors
If you ﬁnd errors or typos in this book, or if you have suggestions for improvements or
other comments, please send email to:
authors@leeseshia.org
Please include the version number of the book, whether it is the electronic or the hardcopy
distribution, and the relevant page numbers. Thank you!
xviii
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 19 -->
### [PDF Page 19]

PREFACE
Further Reading
Many textbooks on embedded systems have appeared in recent years. These books ap-
proach the subject in surprisingly diverse ways, often reﬂecting the perspective of a more
established discipline that has migrated into embedded systems, such as VLSI design,
control systems, signal processing, robotics, real-time systems, or software engineering.
Some of these books complement the present one nicely. We strongly recommend them
to the reader who wishes to broaden his or her understanding of the subject.
Speciﬁcally, Patterson and Hennessy (1996), although not focused on embedded pro-
cessors, is the canonical reference for computer architecture, and a must-read for any-
one interested embedded processor architectures. Sriram and Bhattacharyya (2009) fo-
cus on signal processing applications, such as wireless communications and digital me-
dia, and give particularly thorough coverage to dataﬂow programming methodologies.
Wolf (2000) gives an excellent overview of hardware design techniques and microproces-
sor architectures and their implications for embedded software design. Mishra and Dutt
(2005) give a view of embedded architectures based on architecture description languages
(ADLs). Oshana (2006) specializes in DSP processors from Texas Instruments, giving an
overview of architectural approaches and a sense of assembly-level programming.
Focused more on software, Buttazzo (2005a) is an excellent overview of scheduling
techniques for real-time software. Liu (2000) gives one of the best treatments yet of
techniques for handling sporadic real-time events in software. Edwards (2000) gives
a good overview of domain-speciﬁc higher-level programming languages used in some
embedded system designs. Pottie and Kaiser (2005) give a good overview of network-
ing technologies, particularly wireless, for embedded systems. Koopman (2010) focuses
on design process for embedded software, including requirements management, project
management, testing plans, and security plans.
No single textbook can comprehensively cover the breadth of technologies available to
the embedded systems engineer. We have found useful information in many of the books
that focus primarily on today’s design techniques (Barr and Massa, 2006; Berger, 2002;
Burns and Wellings, 2001; Gajski et al., 2009; Kamal, 2008; Noergaard, 2005; Parab et al.,
2007; Simon, 2006; Schaumont, 2010; Vahid and Givargis, 2010).
Lee & Seshia, Introduction to Embedded Systems
xix



<!-- Page 20 -->
### [PDF Page 20]

PREFACE
Notes for Instructors
At Berkeley, we use this text for an advanced undergraduate course called Introduction
to Embedded Systems. A great deal of material for lectures and labs can be found via the
main web page for this text:
http://LeeSeshia.org
In addition, a solutions manual and other instructional material are available to qualiﬁed
instructors at bona ﬁde teaching institutions. See
http://chess.eecs.berkeley.edu/instructors/
or contact authors@leeseshia.org.
xx
Lee & Seshia, Introduction to Embedded Systems


