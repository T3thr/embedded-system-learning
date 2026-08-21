# Appendix B: Complexity and Computability

> **Textbook**: Introduction to Embedded Systems - A Cyber-Physical Systems Approach (UC Berkeley)  
> **Authors**: Edward Ashford Lee and Sanjit Arunkumar Seshia  
> **PDF Page Range**: 457 - 474


---


<!-- Page 457 -->
### [PDF Page 457]

B
Complexity and Computability
Contents
B.1
Effectiveness and Complexity of Algorithms
. . . . . . . . . . . . 438
B.1.1
Big O Notation . . . . . . . . . . . . . . . . . . . . . . . . . 439
B.2
Problems, Algorithms, and Programs . . . . . . . . . . . . . . . . 441
B.2.1
Fundamental Limitations of Programs . . . . . . . . . . . . . 442
B.3
Turing Machines and Undecidability . . . . . . . . . . . . . . . . . 443
B.3.1
Structure of a Turing Machine . . . . . . . . . . . . . . . . . 445
B.3.2
Decidable and Undecidable Problems . . . . . . . . . . . . . 446

### Sidebar: Probing Further: Recursive Functions and Sets . . . . . . . 447

B.4
Intractability: P and NP . . . . . . . . . . . . . . . . . . . . . . . . 449
B.5

### Summary . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 453


### Exercises . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 454

Complexity theory and computability theory are areas of Computer Science that study
the efﬁciency and the limits of computation. Informally, computability theory studies
which problems can be solved by computers, while complexity theory studies how efﬁ-
ciently a problem can be solved by computers. Both areas are problem-centric, meaning
that they are more concerned with the intrinsic ease or difﬁculty of problems and less
concerned with speciﬁc techniques (algorithms) for solving them.
437



<!-- Page 458 -->
### [PDF Page 458]

B.1. EFFECTIVENESS AND COMPLEXITY OF ALGORITHMS
In this appendix, we very brieﬂy review selected topics from complexity and computabil-
ity theory that are relevant for this book. There are excellent books that offer a detailed
treatment of these topics, including Papadimitriou (1994), Sipser (2005), and Hopcroft
et al. (2007). We begin with a discussion of the complexity of algorithms. Algorithms are
realized by computer programs, and we show that there are limitations on what computer
programs can do. We then describe Turing machines, which can be used to deﬁne what
we have come to accept as “computation,” and show how the limitations of programs
manifest themselves as undecidable problems. Finally, we close with a discussion of the
complexity of problems, as distinct from the complexity of the algorithms that solve the
problems.
B.1
Effectiveness and Complexity of Algorithms
An algorithm is a step-by-step procedure for solving a problem. To be effective, an
algorithm must complete in a ﬁnite number of steps and use a ﬁnite amount of resources
(such as memory). To be useful, an algorithm must complete in a reasonable number
of steps and use a reasonable amount of resources. Of course, what is “reasonable” will
depend on the problem being solved.
Some problems are known to have no effective algorithm, as we will see below when we
discuss undecidability. For other problems, one or more effective algorithms are known,
but it is not known whether the best algorithm has been found, by some measure of “best.”
There are even problems where we know that there exists an effective algorithm, but no
effective algorithm is known. The following example describes such a problem.
Example B.1:
Consider a function f : N →{YES, NO} where f(n) = YES if
there is a sequence of n consecutive ﬁves in the decimal representation of π, and
f(n) = NO otherwise. This function has one of two forms. Either
f(n) = YES
∀n ∈N,
or there is a k ∈N such that
f(n) =
 YES
if n < k
NO
otherwise
438
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 459 -->
### [PDF Page 459]

B. COMPLEXITY AND COMPUTABILITY
It is not known which of these two forms is correct, nor, if the second form is
correct, what k is. However, no matter what the answer is, there is an effective
algorithm for solving this problem. In fact, the algorithm is rather simple. Either
the algorithm immediately returns YES, or it compares n to k and returns YES if
n < k. We know that one of these is the right algorithm, but we do not know which.
Knowing that one of these is correct is sufﬁcient to know that there is an effective
algorithm.
For a problem with known effective algorithms, there are typically many algorithms that
will solve the problem. Generally, we prefer algorithms with lower complexity. How do
we choose among these? This is the topic of the next subsection.
B.1.1
Big O Notation
Many problems have several known algorithms for solving them, as illustrated in the
following example.
Example B.2:
Suppose we have a list (a1,a2,··· ,an) of n integers, arranged in
increasing order. We would like to determine whether the list contains a particular
integer b. Here are two algorithms that accomplish this:
1. Use a linear search. Starting at the beginning of the list, compare the input
b against each entry in the list. If it is equal, return YES. Otherwise, proceed
to the next entry in the list. In the worst case, this algorithm will require n
comparisons before it can give an answer.
2. Use a binary search. Start in the middle of the list and compare b to the
entry a(n/2) in the middle. If it is equal, return YES. Otherwise, determine
whether b < a(n/2). If it is, then repeat the search, but over only the ﬁrst
half of the list. Otherwise, repeat the search over the second half of the list.
Although each step of this algorithm is more complicated than the steps of the
ﬁrst algorithm, usually fewer steps will be required. In the worst case, log2(n)
steps are required.
Lee & Seshia, Introduction to Embedded Systems
439



<!-- Page 460 -->
### [PDF Page 460]

B.1. EFFECTIVENESS AND COMPLEXITY OF ALGORITHMS
The difference between these two algorithms can be quite dramatic if n is large.
Suppose that n = 4096. The ﬁrst algorithm will require 4096 steps in the worst
case, whereas the second algorithm will require only 12 steps in the worst case.
The number of steps required by an algorithm is the time complexity of the algorithm. It
is customary when comparing algorithms to simplify the measure of time complexity by
ignoring some details. In the previous example, we might ignore the complexity of each
step of the algorithm and consider only how the complexity grows with the input size n.
So if algorithm (1) in Example B.2 takes K1n seconds to execute, and algorithm (2) takes
K2 log2(n) seconds to execute, we would typically ignore the constant factors K1 and K2.
For large n, they are not usually very helpful in determining which algorithm is better.
To facilitate such comparisons, it is customary to use big O notation. This notation
ﬁnds the term in a time complexity measure that grows fastest as a function of the size
of the input, for large input sizes, and ignores all other terms. In addition, it discards
any constant factors in the term. Such a measure is an asymptotic complexity measure
because it studies only the limiting growth rate as the size of the input gets large.
Example B.3: Suppose that an algorithm has time complexity 5+2n+7n3, where
n is the size of the input. This algorithm is said to have O(n3) time complexity,
which is read “order n cubed.” The term 7n3 grows fastest with n, and the number
7 is a relatively unimportant constant factor.
The following complexity measures are commonly used:
1. constant time: The time complexity does not depend at all on the size of the input.
The complexity is O(1).
2. logarithmic time: O(logm(n)) complexity, for any ﬁxed m.
3. linear time: O(n) complexity.
4. quadratic time: O(n2) complexity.
5. polynomial time: O(nm) complexity, for any ﬁxed m ∈N.
6. exponential time: O(mn) complexity for any m > 1.
7. factorial time: O(n!) complexity.
440
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 461 -->
### [PDF Page 461]

B. COMPLEXITY AND COMPUTABILITY
The above list is ordered by costliness. Algorithms later in the list are usually more
expensive to realize than algorithms earlier in the list, at least for large input size n.
Example B.4:
Algorithm 1 in Example B.2 is a linear-time algorithm, whereas
algorithm 2 is a logarithmic-time algorithm. For large n, algorithm (2) is more
efﬁcient.
The number of steps required by an algorithm, of course, is not the only measure of its
cost. Some algorithms execute in rather few steps but require a great deal of memory. The
size of the memory required can be similarly characterized using big O notation, giving a
measure of space complexity.
B.2
Problems, Algorithms, and Programs
Algorithms are developed to solve some problem. How do we know whether we have
found the best algorithm to solve a problem? The time complexity of known algorithms
can be compared, but what about algorithms we have not thought of? Are there problems
for which there is no algorithm that can solve them? These are difﬁcult questions.
Assume that the input to an algorithm is a member of a set W of all possible inputs, and the
output is a member of a set Z of all possible outputs. The algorithm computes a function
f : W →Z. The function f, a mathematical object, is the problem to be solved, and the
algorithm is the mechanism by which the problem is solved.
It is important to understand the distinction between the problem and the mechanism.
Many different algorithms may solve the same problem. Some algorithms will be better
than others; for example, one algorithm may have lower time complexity than another.
We next address two interesting questions:
• Is there a function of the form f : W →Z for which there is no algorithm that can
compute the function for all inputs w ∈W? This is a computability question.
• Given a particular function f : W →Z, is there a lower bound on the time complex-
ity of an algorithm to compute the function? This is a complexity question.
Lee & Seshia, Introduction to Embedded Systems
441



<!-- Page 462 -->
### [PDF Page 462]

B.2. PROBLEMS, ALGORITHMS, AND PROGRAMS
If W is a ﬁnite set, then the answer to the ﬁrst question is clearly no. Given a particular
function f : W →Z, one algorithm that will always work uses a lookup table listing f(w)
for all w ∈W. Given an input w ∈W, this algorithm simply looks up the answer in the
table. This is a constant-time algorithm; it requires only one step, a table lookup. Hence,
this algorithm provides the answer to the second question, which is that if W is a ﬁnite
set, then the lowest time complexity is constant time.
A lookup table algorithm may not be the best choice, even though its time complexity
is constant. Suppose that W is the set of all 32-bit integers. This is a ﬁnite set with
232 elements, so a table will require more than four billion entries. In addition to time
complexity, we must consider the memory required to implement the algorithm.
The above questions become particularly interesting when the set W of possible inputs
is inﬁnite. We will focus on decision problems, where Z = {YES, NO}, a set with
only two elements. A decision problem seeks a yes or no answer for each w ∈W. The
simplest inﬁnite set of possible inputs is W = N, the natural numbers. Hence, we will next
consider fundamental limits on decision problems of the form f : N →{YES, NO}. We
will see next that for such problems, the answer to the ﬁrst question above is yes. There
are functions of this form that are not computable.
B.2.1
Fundamental Limitations of Programs
One way to describe an algorithm is to give a computer program. A computer program
is always representable as a member of the set {0,1}∗, i.e., the set of ﬁnite sequences of
bits. A programming language is a subset of {0,1}∗. It turns out that not all decision
problems can be solved by computer programs.
Proposition B.1. No programming language can express a program for each and every
function of the form f : N →{YES, NO}.
Proof.
To prove this proposition, it is enough to show that there are strictly more
functions of the form f : N →{YES, NO} than there are programs in a programming
language. It is sufﬁcient to show that the set {YES, NO}N is strictly larger than the set
{0,1}∗, because a programming language is a subset of {0,1}∗. This can be done with
a variant of Cantor’s diagonal argument, which goes as follows.
442
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 463 -->
### [PDF Page 463]

B. COMPLEXITY AND COMPUTABILITY
First, note that the members of the set {0,1}∗can be listed in order. Speciﬁcally, we list
them in the order of binary numbers,
λ,0,1,00,01,10,11,000,001,010,011,··· ,
(B.1)
where λ is the empty sequence. This list is inﬁnite, but it includes all members of the
set {0,1}∗. Because the members of the set can be so listed, the set {0,1}∗is said to be
countable or countably inﬁnite.
For any programming language, every program that can be written will appear some-
where in the list (B.1). Assume the ﬁrst such program in the list realizes the decision
function f1 : N →{YES, NO}, the second one in the list realizes f2 : N →{YES, NO},
etc. We can now construct a function g: N →{YES, NO} that is not computed by any
program in the list. Speciﬁcally, let
g(i) =
 YES
if fi(i) = NO
NO
if fi(i) = YES
for all i ∈N. This function g differs from every function fi in the list, and hence it is not
included in the list. Thus, there is no computer program in the language that computes
function g.
This theorem tells us that programs, and hence algorithms, are not capable of solving all
decision problems. We next explore the class of problems they can solve, known as the
effectively computable functions. We do this using Turing machines.
B.3
Turing Machines and Undecidability
In 1936, Alan Turing proposed a model for computation that is now called the Turing
machine (Turing, 1936). A Turing machine, depicted in Figure B.1, is similar to a ﬁnite-
state machine, but with an unlimited amount of memory. This memory has the form of an
inﬁnite tape that the Turing machine can read from and write to. The machine comprises
a ﬁnite-state machine (FSM) controller, a read/write head, and an inﬁnite tape organized
as a sequence of cells. Each cell contains a value drawn from a ﬁnite set Σ or the special
Lee & Seshia, Introduction to Embedded Systems
443



<!-- Page 464 -->
### [PDF Page 464]

B.3. TURING MACHINES AND UNDECIDABILITY
FSM
Control
0
. . .
1
1
0
1
0
Infinite Tape
Read/Write Head
write
move
read
. . .
empty cells
Figure B.1: Illustration of a Turing machine.
value 2, which indicates an empty cell. The FSM acts as a control for the read/write head
by producing outputs that move the read/write head over the tape.
In Figure B.1, the symbols on the non-empty cells of the tape are drawn from the set
Σ = {0,1}, the binary digits. The FSM has two output ports. The top output port is write,
which has type Σ and produces a value to write to the cell at the current position of the
read/write head. The bottom output port is move, which has type {L,R}, where the output
symbol L causes the read/write head to move to the left (but not off the beginning of the
tape), and R causes it to move to the right. The FSM has one input port, read, which has
type Σ and receives the current value held by the cell under the read/write head.
The tape is initialized with an input string, which is an element of the set Σ∗of ﬁnite
sequences of elements of Σ, followed by an inﬁnite sequence of empty cells. The Turing
machine starts in the initial state of the FSM with the read/write head on the left end of
the tape. At each reaction, the FSM receives as input the value from the current cell under
the read/write head. It produces an output that speciﬁes the new value of that cell (which
may be the same as the current value) and a command to move the head left or right.
The control FSM of the Turing machine has two ﬁnal states: an accepting state accept
and a rejecting state reject. If the Turing machine reaches accept or reject after a ﬁnite
number of reactions, then it is said to terminate, and the execution is called a halting
computation. If it terminates in accept, then the execution is called an accepting com-
putation. If it terminates in reject, then the execution is called a rejecting computation.
It is also possible for a Turing machine to reach neither accept nor reject, meaning that
it does not halt. When a Turing machine does not halt, we say that it loops.
444
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 465 -->
### [PDF Page 465]

B. COMPLEXITY AND COMPUTABILITY
When the control FSM is deterministic, we say that the Turing machine is also determin-
istic. Given an input string w ∈Σ∗, a deterministic Turing machine D will exhibit a unique
computation. Therefore, given an input string w ∈Σ∗, a deterministic Turing machine D
will either halt or not, and if it halts, it will either accept w or reject it. For simplicity,
we will limit ourselves in this section to deterministic Turing machines, unless explicitly
stated otherwise.
B.3.1
Structure of a Turing Machine
More formally, each deterministic Turing machine can be represented by a pair D =
(Σ,M), where Σ is a ﬁnite set of symbols and M is any FSM with the following proper-
ties:
• a ﬁnite set StatesM of states that includes two ﬁnal states accept and reject;
• an input port read of type Σ;
• an output port write of type Σ; and
• an output port move of type {L,R}.
As with any FSM, it also must have an initial state s0 and a transition function updateM,
as explained in Section 3.3.3. If the read/write head is over a cell containing 2, then the
input to the read port of the FSM will be absent. If at a reaction the write output of the
FSM is absent, then the cell under the read/write head will be erased, setting its contents
to 2.
A Turing machine described by D = (Σ,M) is a synchronous composition of two ma-
chines, the FSM M and a tape T. The tape T is distinctly not an FSM, since it does not
have ﬁnite state. Nonetheless, the tape is a state machine, and can be described using the
same ﬁve-tuple used in Section 3.3.3 for FSMs, except that the set StatesT is now inﬁnite.
The data on the tape can be modeled as a function with domain N and codomain Σ∪{2},
and the position of the read/write head can be modeled as a natural number, so
StatesT = N×(Σ∪{2})N.
The machine T has input port write of type Σ, input port move of type {L,R}, and output
port read of type Σ. The updateT transition function is now easy to deﬁne formally (see
Exercise 1).
Note that the machine T is the same for all Turing machines, so there is no need to include
it in the description D = (Σ,M) of a particular Turing machine. The description D can be
Lee & Seshia, Introduction to Embedded Systems
445



<!-- Page 466 -->
### [PDF Page 466]

B.3. TURING MACHINES AND UNDECIDABILITY
understood as a program in a rather special programming language. Since all sets in the
formal description of a Turing machine are ﬁnite, any Turing machine can be encoded as
a ﬁnite sequence of bits in {0,1}∗.
Note that although the control FSM M and the tape machine T both generate output, the
Turing machine itself does not. It only computes by transitioning between states of the
control FSM, updating the tape, and moving left (L) or right (R). On any input string
w, we are only concerned with whether the Turing machine halts, and if so, whether it
accepts or rejects w. Thus, a Turing machine attempts to map an input string w ∈Σ∗to
{accept, reject}, but for some input strings, it may be unable to produce an answer.
We can now see that Proposition B.1 applies, and the fact that a Turing machine may not
produce an answer on some input strings is not surprising. Let Σ = {0,1}. Then any input
string w ∈Σ∗can be interpreted as a binary encoding of a natural number in N. Thus, a
Turing machine implements a partial function of the form f : N →{accept, reject}. The
function is partial because for some n ∈N, the machine may loop. Since a Turing machine
is a program, Proposition B.1 tells that Turing machines are incapable of realizing all
functions of the form f : N →{accept, reject}. This limitation manifests itself as looping.
A principle that lies at heart of computer science, known as the Church-Turing thesis,
asserts that every effectively computable function can be realized by a Turing machine.
This principle is named for mathematicians Alonzo Church and Alan Turing. Our intuitive
notion of computation, as expressed in today’s computers, is equivalent to the Turing
machine model of computation in this sense. Computers can realize exactly the functions
that can be realized by Turing machines: no more, no less. This connection between the
informal notion of an algorithm and the precise Turing machine model of computation
is not a theorem; it cannot be proved. It is a principle that underlies what we mean by
computation.
B.3.2
Decidable and Undecidable Problems
Turing machines, as described here, are designed to solve decision problems, which only
have a YES or NO answer. The input string to a Turing machine represents the encoding
of a problem instance. If the Turing machine accepts, it is viewed as a YES answer, and
if it rejects, it is viewed as a NO answer. There is the third possibility that the Turing
machine might loop.
446
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 467 -->
### [PDF Page 467]

B. COMPLEXITY AND COMPUTABILITY
Example B.5:
Consider the problem of determining, given a directed graph G
with two nodes s and t in G, whether there is a path from s to t. One can think of
writing down the problem as a long string listing all nodes and edges of G, followed
by s and t. Thus, an instance of this path problem can be presented to the Turing
machine as an input string on its tape. The instance of the problem is the particular
graph G, and nodes s and t. If there exists a path from s to t in G, then this is a YES
problem instance; otherwise, it is a NO problem instance.
Turing machines are typically designed to solve problems, rather than speciﬁc prob-
lem instances. In this example, we would typically design a Turing machine that,
for any graph G, nodes s and t, determines whether there is a path in G from s to t.
Recall that a decision problem is a function f : W →{YES,NO}. For a Turing machine,
the domain is a set W ⊆Σ∗of ﬁnite sequences of symbols from the set Σ. A problem
instance is a particular w ∈W, for which the “answer” to the problem is either f(w) = YES

### Probing Further: Recursive Functions and Sets

Logicians make distinctions between the functions that can be realized by Turing ma-
chines. The so-called total recursive functions are those where a Turing machine real-
izing the function terminates for all inputs w ∈Σ∗. The partial recursive functions are
those where a Turing machine may or may not terminate on a particular input w ∈Σ∗. By
these deﬁnitions, every total recursive function is also a partial recursive function, but not
vice-versa.
Logicians also use Turing machines to make useful distinctions between sets. Consider
sets of natural numbers, and consider Turing machines where Σ = {0,1} and an input
w ∈Σ∗is the binary encoding of a natural number. Then a set C of natural numbers is a
computable set (or synonymously a recursive set or decidable set) if there is a Turing
machine that terminates for all inputs w ∈N and yields accept if w ∈C and reject if
w /∈C. A set E ⊂N is a computably enumerable set (or synonymously a recursively
enumerable set or a semidecidable set) if there is a Turing machine that terminates if
and only if the input w is in E.
Lee & Seshia, Introduction to Embedded Systems
447



<!-- Page 468 -->
### [PDF Page 468]

B.3. TURING MACHINES AND UNDECIDABILITY
or f(w) = NO. Let Y ⊆W denote the set of all YES instances of problem f. That is,
Y = {w ∈W | f(w) = YES}.
Given a decision problem f, a Turing machine D = (Σ,M) is called a decision procedure
for f if D accepts every string w ∈Y, and D rejects every w ∈W \Y, where \ denotes set
subtraction. Note that a decision procedure always halts for any input string w ∈W.
A problem f is said to be decidable (or solvable) if there exists a Turing machine that
is a decision procedure for f. Otherwise, we say that the problem is undecidable (or
unsolvable). For an undecidable problem f, there is no Turing machine that terminates
with the correct answer f(w) for all input strings w ∈W.
One of the important philosophical results of 20th century mathematics and computer
science is the existence of problems that are undecidable. One of the ﬁrst problems to be
proved undecidable is the so-called halting problem for Turing machines. This problem
can be stated as follows:
Given a Turing machine D = (Σ,M) initialized with input string w ∈Σ∗on
its tape, decide whether or not M will halt.
Proposition B.2. (Turing, 1936) The halting problem is undecidable.
Proof.
This is a decision problem h: W ′ →{YES,NO}, where W ′ denotes the set of
all Turing machines and their inputs. The proposition can be proved using a variant of
Cantor’s diagonal argument.
It is sufﬁcient to prove the theorem for the subset of Turing machines with binary tape
symbols, Σ = {0,1}. Moreover, we can assume without loss of generality that every
Turing machine in this set can be represented by a ﬁnite sequence of binary digits (bits),
so
W ′ = Σ∗×Σ∗.
Assume further that every ﬁnite sequence of bits represents a Turing machine. The form
of the decision problem becomes
h: Σ∗×Σ∗→{YES,NO}.
(B.2)
We seek a procedure to determine the value of h(D,w), where D is a ﬁnite sequence
of bits representing a Turing machine and w is a ﬁnite sequence of bits representing an
448
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 469 -->
### [PDF Page 469]

B. COMPLEXITY AND COMPUTABILITY
input to the Turing machine. The answer h(D,w) will be YES if the Turing machine D
halts with input w and NO if it loops.
Consider the set of all effectively computable functions of the form
f : Σ∗×Σ∗→{YES,NO}.
These functions that can be given by a Turing machine (by the Church-Turing thesis),
and hence the set of such functions can be enumerated f0, f1, f2,···. We will show that
the halting problem (B.2) is not on this list. That is, there is no fi such that h = fi.
Consider a sequence of Turing machines D0,D1,··· where Di is the sequence of bits
representing the ith Turing machine, and Di halts if fi(Di,Di) = NO and loops otherwise.
Since fi is a computable function, we can clearly construct such a Turing machine. Not
one of the computable functions in the list f0, f1, f2,··· can possibly equal the function h,
because every function fi in the list gives the wrong answer for input (Di,Di). If Turing
machine Di halts on input w = Di, function fi evaluates to fi(Di,Di) = NO, whereas
h(Di,Di) = YES. Since no function in the list f0, f1, f2,··· of computable functions
works, the function h is not computable.
B.4
Intractability: P and NP
Section B.1 above studied asymptotic complexity, a measure of how quickly the cost (in
time or space) of solving a problem with a particular algorithm grows with the size of the
input. In this section, we consider problems rather than algorithms. We are interested in
whether an algorithm with a particular asymptotic complexity exists to solve a problem.
This is not the same as asking whether an algorithm with a particular complexity class is
known.
A complexity class is a collection of problems for which there exist algorithms with the
same asymptotic complexity. In this section, we very brieﬂy introduce the complexity
classes P and NP.
First recall the concept of a deterministic Turing machine from the preceding section. A
nondeterministic Turing machine N = (Σ,M) is identical to its deterministic counter-
part, except that the control FSM M can be a nondeterministic FSM. On any input string
Lee & Seshia, Introduction to Embedded Systems
449



<!-- Page 470 -->
### [PDF Page 470]

B.4. INTRACTABILITY: P AND NP
w ∈Σ∗, a nondeterministic Turing machine N can exhibit several computations. N is said
to accept w if any computation accepts w, and N rejects w if all its computations reject
w.
A decision problem is a function f : W →{YES,NO}, where W ⊆Σ∗. N is said to
be a decision procedure for f if for each input w ∈W, all of its computations halt, no
matter what nondeterministic choices are made. Note that a particular execution of a
nondeterministic Turing machine N may give the wrong answer. That is, it could yield
NO for input w when the right answer is f(w) = YES. It can still be a decision procedure,
however, because we deﬁne the ﬁnal answer to be YES if any execution yields YES. We
do not require that all executions yield YES. This subtle point underlies the expressive
power of nondeterministic Turing machines.
An execution that accepts an input w is called a certiﬁcate. A certiﬁcate can be repre-
sented by a ﬁnite list of choices made by the Turing machine such that it accepts w. We
need only one valid certiﬁcate to know that f(w) = YES.
Given the above deﬁnitions, we are ready to introduce P and NP. P is the set of problems
decidable by a deterministic Turing machine in polynomial time. NP, on the other hand, is
the set of problems decidable by a nondeterministic Turing machine in polynomial time.
That is, a problem f is in NP if there is a nondeterministic Turing machine N that is a
decision procedure for f, and for all inputs w ∈W, every execution of the Turing machine
has time complexity no greater than O(nm), for some m ∈N.
An equivalent alternative deﬁnition of NP is the set of all problems for which one can
check the validity of a certiﬁcate for a YES answer in polynomial time. Speciﬁcally, a
problem f is in NP if there is a nondeterministic Turing machine N that is a decision
procedure for f, and given an input w and a certiﬁcate, we can check in polynomial
time whether the certiﬁcate is valid (i.e., whether the choices it lists do indeed result in
accepting w). Note that this says nothing about NO answers. This asymmetry is part of
the meaning of NP.
An important notion that helps systematize the study of complexity classes is that of
completeness, in which we identify problems that are “representative” of a complexity
class. In the context of NP, we say that a problem A is NP-hard if any other problem B
in NP can be reduced (“translated”) to A in polynomial time. Intuitively, A is “as hard as”
any problem in NP — if we had a polynomial-time algorithm for A, we could derive one
for B by ﬁrst translating the instance of B to one of A, and then invoking the algorithm to
solve A. A problem A is said to be NP-complete if (i) A is in NP, and (ii) A is NP-hard.
450
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 471 -->
### [PDF Page 471]

B. COMPLEXITY AND COMPUTABILITY
In other words, an NP-complete problem is a problem in NP that is as hard as any other
problem in NP.
Several core problems in the modeling, design, and analysis of embedded systems are NP-
complete. One of these is the very ﬁrst problem to be proved NP-complete, the Boolean
satisﬁability (SAT) problem. The SAT problem is to decide, given a propositional logic
formula φ expressed over Boolean variables x1,x2,...,xn, whether there exists a valuation
of the xi variables such that φ(x1,x2,...,xn) = true. If there exists such a valuation, we
say φ is satisﬁable; otherwise, we say that φ is unsatisﬁable. The SAT problem is a
decision problem of the form f : W →{YES,NO}, where each w ∈W is an encoding of
a propositional logic formula φ.
Example B.6: Consider the following propositional logic formula φ:
(x1 ∨¬x2)∧(¬x1 ∨x3 ∨x2)∧(x1 ∨¬x3)
We can see that setting x1 = x3 = true will make φ evaluate to true. It is possible to
construct a nondeterministic Turing machine that takes as input an encoding of the
formula, where the nondeterministic choices correspond to choices of valuations
for each variable xi, and where the machine will accept the input formula if it is
satisﬁable and reject it otherwise. If the input w encodes the above formula φ, then
one of the certiﬁcates demonstrating that f(w) = YES is the choices x1 = x2 = x3 =
true.
Next consider the alternative formula φ′:
(x1 ∨¬x2)∧(¬x1 ∨x2)∧(x1 ∨x2)∧(¬x1 ∨¬x2)
In this case, no matter how we assign Boolean values to the xi variables, we cannot
make φ′ = true. Thus while φ is satisﬁable, φ′ is unsatisﬁable. The same nonde-
terministic Turing machine as above will reject an input w′ that is an encoding of
φ′. Rejecting this input means that all choices result in executions that terminate in
reject.
Another problem that is very useful, but NP-complete, is checking the feasibility of an
integer linear program (ILP). Informally, the feasibility problem for integer linear pro-
Lee & Seshia, Introduction to Embedded Systems
451



<!-- Page 472 -->
### [PDF Page 472]

B.4. INTRACTABILITY: P AND NP
grams is to ﬁnd a valuation of integer variables such that each inequality in a collection
of linear inequalities over those variables is satisﬁed.
Given that both SAT and ILP are NP-complete, one can transform an instance of either
problem into an instance of the other problem, in polynomial time.
Example B.7:
The following integer linear program is equivalent to the SAT
problem corresponding to formula φ′ of Example B.6:
ﬁnd x1,x2 ∈{0,1}
such that:
x1 −x2
≥
0
−x1 +x2
≥
0
x1 +x2
≥
1
−x1 −x2
≥
−1
One can observe that there is no valuation of x1 and x2 that will make all the above
inequalities simultaneously true.
NP-complete problems seem to be harder than those in P; for large enough input sizes,
these problems can become intractable, meaning that they cannot be practically solved.
In general, it appears that to determine that f(w) = YES for some w without being given
a certiﬁcate, we might have to explore all executions of the nondeterministic Turing ma-
chine before ﬁnding, on the last possibility, an execution that accepts w. The number
of possible executions can be exponential in the size of the input. Indeed, there are no
known polynomial-time algorithms that solve NP-complete problems. Surprisingly, as of
this writing, there is no proof that no such algorithm exists. It is widely believed that NP
is a strictly larger set of problems than P, but without a proof, we cannot be sure. The P
versus NP question is one of the great unsolved problems in mathematics today.
Despite the lack of polynomial-time algorithms for solving NP-complete problems, many
such problems turn out to be solvable in practice. SAT problems, for example, can often
be solved rather quickly, and a number of very effective SAT solvers are available. These
solvers use algorithms that have worst-case exponential complexity, which means that
for some inputs they can take a very long time to complete. Yet for most inputs, they
452
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 473 -->
### [PDF Page 473]

B. COMPLEXITY AND COMPUTABILITY
complete quickly. Hence, we should not be deterred from tackling a problem just because
it is NP-complete.
B.5

### Summary

This appendix has very brieﬂy introduced two rather large interrelated topics, the theo-
ries of complexity and computability. The chapter began with a discussion of complexity
measures for algorithms, and then established a fundamental distinction between a prob-
lem to be solved and an algorithm for solving the problem. It then showed that there
are problems that cannot be solved. We then explained Turing machines, which are ca-
pable of describing solution procedures for all problems that have come to be considered
“computable.” The chapter then closed with a brief discussion of the complexity classes P
and NP, which are classes of problems that can be solved by algorithms with comparable
complexity.
Lee & Seshia, Introduction to Embedded Systems
453



<!-- Page 474 -->
### [PDF Page 474]


### EXERCISES


### Exercises

1. Complete the formal deﬁnition of the tape machine T by giving the initial state of
T and the mathematical description of its transition function updateT.
2. Directed, acyclic graphs (DAGs) have several uses in modeling, design, and analy-
sis of embedded systems; e.g., they are used to represent precedence graphs of tasks
(see Chapter 11) and control-ﬂow graphs of loop-free programs (see Chapter 15).
A common operation on DAGs is to topologically sort the nodes of the graph. For-
mally, consider a DAG G = (V,E) where V is the set of vertices {v1,v2,...,vn}
and E is the set of edges. A topological sort of G is a linear ordering of vertices
{v1,v2,...,vn} such that if (vi,vj) ∈E (i.e., there is a directed edge from vi to vj),
then vertex vi appears before vertex vj in this ordering.
The following algorithm due to Kahn (1962) topologically sorts the vertices of a
DAG:
input : A DAG G = (V,E) with n vertices and m edges.
output: A list L of vertices in V in topologically-sorted order.
1 L ←empty list
2 S ←{v|v is a vertex with no incoming edges}
3 while S is non-empty do
4
Remove vertex v from S
5
Insert v at end of list L
6
for each vertex u such that edge (v,u) is in E do
7
Mark edge (u,v)
8
if all incoming edges to u are marked then
9
Add u to set S
10
end
11
end
12 end
L contains all vertices of G in topologically sorted order.
Algorithm B.1: Topological sorting of vertices in a DAG
State the asymptotic time complexity of Algorithm B.1 using Big O notation. Prove
the correctness of your answer.
454
Lee & Seshia, Introduction to Embedded Systems


