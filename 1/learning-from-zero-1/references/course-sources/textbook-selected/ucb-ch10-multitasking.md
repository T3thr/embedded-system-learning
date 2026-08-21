# Chapter 10: Multitasking

> **Textbook**: Introduction to Embedded Systems - A Cyber-Physical Systems Approach (UC Berkeley)  
> **Authors**: Edward Ashford Lee and Sanjit Arunkumar Seshia  
> **PDF Page Range**: 285 - 312


---


<!-- Page 285 -->
### [PDF Page 285]

10
Multitasking
Contents

## 10.1 Imperative Programs . . . . . . . . . . . . . . . . . . . . . . . . . 268


### Sidebar: Linked Lists in C

. . . . . . . . . . . . . . . . . . . . . . . 271

## 10.2 Threads . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 272


### 10.2.1 Creating Threads . . . . . . . . . . . . . . . . . . . . . . . . 272


### 10.2.2 Implementing Threads . . . . . . . . . . . . . . . . . . . . . 275


### 10.2.3 Mutual Exclusion . . . . . . . . . . . . . . . . . . . . . . . . 276


### 10.2.4 Deadlock . . . . . . . . . . . . . . . . . . . . . . . . . . . . 279


### Sidebar: Operating Systems

. . . . . . . . . . . . . . . . . . . . . . 280

### 10.2.5 Memory Consistency Models

. . . . . . . . . . . . . . . . . 282

### 10.2.6 The Problem with Threads . . . . . . . . . . . . . . . . . . . 283


## 10.3 Processes and Message Passing . . . . . . . . . . . . . . . . . . . . 285


## 10.4 Summary . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 290


### Exercises . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 291

In this chapter, we discuss mid-level mechanisms that are used in software to provide
concurrent execution of sequential code. There are a number of reasons for executing
multiple sequential programs concurrently, but they all involve timing. One reason is to
improve responsiveness by avoiding situations where long-running programs can block a
265



<!-- Page 286 -->
### [PDF Page 286]

Concurrent model of computation
dataflow, time triggered, synchronous, etc.
Multitasking
processes, threads, message passing
Processor
interrupts, pipelining, multicore, etc.

![Figure 10.1: Layers of abstraction for concurrency in programs.](images/fig_286_figure_10_1.png)
*Description*: Technical diagram and schematic model illustrating cyber-physical system behavior, algorithmic logic, and state progression for Figure 10.1: Layers of abstraction for concurrency in programs..

> **Figure 10.1: Layers of abstraction for concurrency in programs.**

program that responds to external stimuli, such as sensor data or a user request. Improved
responsiveness reduces latency, the time between the occurrence of a stimulus and the
response. Another reason is to improve performance by allowing a program to run simul-
taneously on multiple processors or cores. This is also a timing issue, since it presumes
that it is better to complete tasks earlier than later. A third reason is to directly control
the timing of external interactions. A program may need to perform some action, such as
updating a display, at particular times, regardless of what other tasks might be executing
at that time.
We have already discussed concurrency in a variety of contexts. Figure 10.1 shows the
relationship between the subject of this chapter and those of other chapters. Chapters 7
and 9 cover the lowest layer in Figure 10.1, which represents how hardware provides con-
current mechanisms to the software designer. Chapters 5 and 6 cover the highest layer,
which consists of abstract models of concurrency, including synchronous composition,
dataﬂow, and time-triggered models. This chapter bridges these two layers. It describes
mechanisms that are implemented using the low-level mechanisms and can provide infras-
tructure for realizing the high-level mechanisms. Collectively, these mid-level techniques
are called multitasking, meaning the simultaneous execution of multiple tasks.
Embedded system designers frequently use these mid-level mechanisms directly to build
applications, but it is becoming increasingly common for designers to use instead the
high-level mechanisms. The designer constructs a model using a software tool that sup-
266
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 287 -->
### [PDF Page 287]

10. MULTITASKING
1

```c
#include <stdlib.h>
```

2

```c
#include <stdio.h>
```

3

```c
int x;
// Value that gets updated.
```

4
typedef void notifyProcedure(int);
// Type of notify proc.
5

```c
struct element {
```

6
notifyProcedure* listener;
// Pointer to notify procedure.
7

```c
struct element* next;
// Pointer to the next item.
```

8
};
9
typedef struct element element_t;
// Type of list elements.
10
element_t* head = 0;
// Pointer to start of list.
11
element_t* tail = 0;
// Pointer to end of list.
12
13
// Procedure to add a listener.
14

```c
void addListener(notifyProcedure* listener) {
```

15

```c
if (head == 0) {
```

16
head = malloc(sizeof(element_t));
17
head->listener = listener;
18
head->next = 0;
19
tail = head;
20
} else {
21
tail->next = malloc(sizeof(element_t));
22
tail = tail->next;
23
tail->listener = listener;
24
tail->next = 0;
25
}
26
}
27
// Procedure to update x.
28

```c
void update(int newx) {
```

29
x = newx;
30
// Notify listeners.
31
element_t* element = head;
32

```c
while (element != 0) {
```

33
(*(element->listener))(newx);
34
element = element->next;
35
}
36
}
37
// Example of notify procedure.
38

```c
void print(int arg) {
```

39
printf("%d ", arg);
40
}

![Figure 10.2: A C program used in a series of examples in this chapter.](images/fig_287_figure_10_2.png)
*Description*: Technical diagram and schematic model illustrating cyber-physical system behavior, algorithmic logic, and state progression for Figure 10.2: A C program used in a series of examples in this chapter..

> **Figure 10.2: A C program used in a series of examples in this chapter.**

Lee & Seshia, Introduction to Embedded Systems
267



<!-- Page 288 -->
### [PDF Page 288]

10.1. IMPERATIVE PROGRAMS
ports a model of computation (or several models of computation). The model is then
automatically or semi-automatically translated into a program that uses the mid-level or
low-level mechanisms. This translation process is variously called code generation or
autocoding.
The mechanisms described in this chapter are typically provided by an operating system,
a microkernel, or a library of procedures. They can be rather tricky to implement cor-
rectly, and hence the implementation should be done by experts (for some of the pitfalls,
see Boehm (2005)). Embedded systems application programmers often ﬁnd themselves
having to implement such mechanisms on bare iron (a processor without an operating
system). Doing so correctly requires deep understanding of concurrency issues.
This chapter begins with a brief description of models for sequential programs, which
enable models of concurrent compositions of such sequential programs. We then progress
to discuss threads, processes, and message passing, which are three styles of composition
of sequential programs.
10.1
Imperative Programs
A programming language that expresses a computation as a sequence of operations is
called an imperative language. C is an imperative language.
Example 10.1: In this chapter, we illustrate several key points using the example
C program shown in Figure 10.2. This program implements a commonly used
design pattern called the observer pattern (Gamma et al., 1994). In this pattern, an
update procedure changes the value of a variable x. Observers (which are other
programs or other parts of the program) will be notiﬁed whenever x is changed by
calling a callback procedure. For example, the value of x might be displayed by an
observer on a screen. Whenever the value changes, the observer needs to be notiﬁed
so that it can update the display on the screen. The following main procedure uses
the procedures deﬁned in Figure 10.2:
1

```c
int main(void) {
```

2
addListener(&print);
3
addListener(&print);
4
update(1);
5
addListener(&print);
6
update(2);
268
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 289 -->
### [PDF Page 289]

10. MULTITASKING
7

```c
return 0;
```

8
}
This test program registers the print procedure as a callback twice, then performs
an update (setting x = 1), then registers the print procedure again, and ﬁnally
performs another update (setting x = 2). The print procedure simply prints the
current value, so the output when executing this test program is 1 1 2 2 2.
A C program speciﬁes a sequence of steps, where each step changes the state of the
memory in the machine. In C, the state of the memory in the machine is represented by
the values of variables.
Example 10.2:
In the program in Figure 10.2, the state of the memory of the
machine includes the value of variable x (which is a global variable) and a list of
elements pointed to by the variable head (another global variable). The list itself
is represented as a linked list, where each element in the list contains a function
pointer referring to a procedure to be called when x changes.
During execution of the C program, the state of the memory of the machine will
need to include also the state of the stack, which includes any local variables.
Using extended state machines, we can model the execution of certain simple C programs,
assuming the programs have a ﬁxed and bounded number of variables. The variables of
the C program will be the variables of the state machine. The states of the state machine
will represent positions in the program, and the transitions will represent execution of the
program.
Example 10.3:

![Figure 10.3: shows a model of the update procedure in Figure](images/fig_289_figure_10_3.png)
*Description*: Technical diagram and schematic model illustrating cyber-physical system behavior, algorithmic logic, and state progression for Figure 10.3: shows a model of the update procedure in Figure.

> **Figure 10.3: shows a model of the update procedure in Figure**

10.2. The machine transitions from the initial Idle state when the update proce-
dure is called. The call is signaled by the input arg being present; its value will be
the int argument to the update procedure. When this transition is taken, newx
(on the stack) will be assigned the value of the argument. In addition, x (a global
variable) will be updated.
Lee & Seshia, Introduction to Embedded Systems
269



<!-- Page 290 -->
### [PDF Page 290]

10.1. IMPERATIVE PROGRAMS

![Figure 10.3: Model of the update procedure in Figure 10.2.](images/fig_290_figure_10_3.png)
*Description*: Technical diagram and schematic model illustrating cyber-physical system behavior, algorithmic logic, and state progression for Figure 10.3: Model of the update procedure in Figure 10.2..

> **Figure 10.3: Model of the update procedure in Figure 10.2.**

After this ﬁrst transition, the machine is in state 31, corresponding to the program
counter position just prior to the execution of line 31 in Figure 10.2. It then uncon-
ditionally transitions to state 32 and sets the value of element. From state 32, there
are two possibilities; if element = 0, then the machine transitions back to Idle and
produces the pure output return. Otherwise, it transitions to 33.
On the transition from 33 to 34, the action is a procedure call to the listener with
the argument being the stack variable newx. The transition from 34 back to 32
occurs upon receiving the pure input returnFromListener, which indicates that the
listener procedure returns.
The model in Figure 10.3 is not the only model we could have constructed of the update
procedure. In constructing such a model, we need to decide on the level of detail, and we
need to decide which actions can be safely treated as atomic operations. Figure 10.3 uses
270
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 291 -->
### [PDF Page 291]

10. MULTITASKING
Linked Lists in C
A linked list is a data structure for storing a list of elements that varies in length during
execution of a program. Each element in the list contains a payload (the value of the
element) and a pointer to the next element in the list (or a null pointer if the element is the
last one). For the program in Figure 10.2, the linked list data structure is deﬁned by:
1
typedef void notifyProcedure(int);
2

```c
struct element {
```

3
notifyProcedure* listener;
4

```c
struct element* next;
```

5
};
6
typedef struct element element_t;
7
element_t* head = 0;
8
element_t* tail = 0;
The ﬁrst line declares that notifyProcedure is a type whose value is a C procedure
that takes an int and returns nothing. Lines 2–5 declare a struct, a composite data
type in C. It has two pieces, listener (with type notifyProcedure*, which is a
function pointer, a pointer to a C procedure) and next (a pointer to an instance of the
same struct). Line 6 declares that element t is a type referring to an instance of the
structure element.
Line 7 declares head, a pointer to a list element. It is initialized to 0, a value that
indicates an empty list. The addListener procedure in Figure 10.2 creates the ﬁrst list
element using the following code:
1
head = malloc(sizeof(element_t));
2
head->listener = listener;
3
head->next = 0;
4
tail = head;
Line 1 allocates memory from the heap using malloc to store a list element and sets
head to point to that element. Line 2 sets the payload of the element, and line 3 indicates
that this is the last element in the list. Line 4 sets tail, a pointer to the last list element.
When the list is not empty, the addListener procedure will use the tail pointer
rather than head to append an element to the list.
Lee & Seshia, Introduction to Embedded Systems
271



<!-- Page 292 -->
### [PDF Page 292]

10.2. THREADS
lines of code as a level of detail, but there is no assurance that a line of C code executes
atomically (it usually does not).
In addition, accurate models of C programs are often not ﬁnite state systems. Considering
only the code in Figure 10.2, a ﬁnite-state model is not appropriate because the code
supports adding an arbitrary number of listeners to the list. If we combine Figure 10.2
with the main procedure in Example 10.1, then the system is ﬁnite state because only
three listeners are put on the list. An accurate ﬁnite-state model, therefore, would need to
include the complete program, making modular reasoning about the code very difﬁcult.
The problems get much worse when we add concurrency to the mix. We will show in
this chapter that accurate reasoning about C programs with mid-level concurrency mech-
anisms such as threads is astonishingly difﬁcult and error prone. It is for this reason that
designers are tending towards the upper layer in Figure 10.1.
10.2
Threads
Threads are imperative programs that run concurrently and share a memory space. They
can access each others’ variables. Many practitioners in the ﬁeld use the term “threads”
more narrowly to refer to particular ways of constructing programs that share memory, but
here we will use the term broadly to refer to any mechanism where imperative programs
run concurrently and share memory. In this broad sense, threads exist in the form of
interrupts on almost all microprocessors, even without any operating system at all (bare
iron).
10.2.1
Creating Threads
Most operating systems provide a higher-level mechanism than interrupts to realize im-
perative programs that share memory. The mechanism is provided in the form of a col-
lection of procedures that a programmer can use. Such procedures typically conform to
a standardized API (application program interface), which makes it possible to write
programs that are portable (they will run on multiple processors and/or multiple operating
systems). Pthreads (or POSIX threads) is such an API; it is integrated into many modern
operating systems. Pthreads deﬁnes a set of C programming language types, functions and
constants. It was standardized by the IEEE in 1988 to unify variants of Unix. In Pthreads,
272
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 293 -->
### [PDF Page 293]

10. MULTITASKING
1

```c
#include <pthread.h>
```

2

```c
#include <stdio.h>
```

3
void* printN(void* arg) {
4

```c
int i;
```

5

```c
for (i = 0; i < 10; i++) {
```

6
printf("My ID: %d\n", *(int*)arg);
7
}
8

```c
return NULL;
```

9
}
10

```c
int main(void) {
```

11
pthread_t threadID1, threadID2;
12
void* exitStatus;
13

```c
int x1 = 1, x2 = 2;
```

14
pthread_create(&threadID1, NULL, printN, &x1);
15
pthread_create(&threadID2, NULL, printN, &x2);
16
printf("Started threads.\n");
17
pthread_join(threadID1, &exitStatus);
18
pthread_join(threadID2, &exitStatus);
19

```c
return 0;
```

20
}

![Figure 10.4: Simple multithreaded C program using Pthreads.](images/fig_293_figure_10_4.png)
*Description*: Technical diagram and schematic model illustrating cyber-physical system behavior, algorithmic logic, and state progression for Figure 10.4: Simple multithreaded C program using Pthreads..

> **Figure 10.4: Simple multithreaded C program using Pthreads.**

a thread is deﬁned by a C procedure and created by invoking the pthread create
procedure.1
Example 10.4:
A simple multithreaded C program using Pthreads is shown in

![Figure 10.4: The printN procedure (lines 3–9) — the procedure that the thread](images/fig_293_figure_10_4.png)
*Description*: Technical diagram and schematic model illustrating cyber-physical system behavior, algorithmic logic, and state progression for Figure 10.4: The printN procedure (lines 3–9) — the procedure that the thread.

> **Figure 10.4: The printN procedure (lines 3–9) — the procedure that the thread**

begins executing — is called the start routine; in this case, the start routine prints
the argument passed to it 10 times and then exits, which will cause the thread to
terminate. The main procedure creates two threads, each of which will execute the
start routine. The ﬁrst one, created on line 14, will print the value 1. The second
one, created on line 15, will print the value 2. When you run this program, the
1For brevity, in the examples in this text we do not check for failures, as any well-written program using
Pthreads should. For example, pthread create will return 0 if it succeeds, and a non-zero error code if
it fails. It could fail, for example, due to insufﬁcient system resources to create another thread. Any program
that uses pthread create should check for this failure and handle it in some way. Refer to the Pthreads
documentation for details.
Lee & Seshia, Introduction to Embedded Systems
273



<!-- Page 294 -->
### [PDF Page 294]

10.2. THREADS
values 1 and 2 will be printed in some interleaved order that depends on the thread
scheduler. Typically, repeated runs will yield different interleaved orders of 1’s and
2’s.
The pthread create procedure creates a thread and returns immediately. The
start routine may or may not have actually started running when it returns. Lines
17 and 18 use pthread join to ensure that the main program does not terminate
before the threads have ﬁnished. Without these two lines, running the program may
not yield any output at all from the threads.
A start routine may or may not return. In embedded applications, it is quite common to
deﬁne start routines that never return. For example, the start routine might execute forever
and update a display periodically. If the start routine does not return, then any other thread
that calls its pthread join will be blocked indeﬁnitely.
As shown in Figure 10.4, the start routine can be provided with an argument and can

```c
return a value. The fourth argument to pthread create is the address of the argument
```

to be passed to the start routine. It is important to understand the memory model of C,
explained in Section 8.3.5, or some very subtle errors could occur, as illustrated in the
next example.
Example 10.5: Suppose we attempt to create a thread inside a procedure like this:
1
pthread_t createThread(int x) {
2
pthread_t ID;
3
pthread_create(&ID, NULL, printN, &x);
4

```c
return ID;
```

5
}
This code would be incorrect because the argument to the start routine is given by
a pointer to a variable on the stack. By the time the thread accesses the speciﬁed
memory address, the createThread procedure will likely have returned and the
memory address will have been overwritten by whatever went on the stack next.
274
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 295 -->
### [PDF Page 295]

10. MULTITASKING
10.2.2
Implementing Threads
The core of an implementation of threads is a scheduler that decides which thread to
execute next when a processor is available to execute a thread. The decision may be
based on fairness, where the principle is to give every active thread an equal opportunity
to run, on timing constraints, or on some measure of importance or priority. Scheduling
algorithms are discussed in detail in Chapter 11. In this section, we simply describe how
a thread scheduler will work without worrying much about how it makes a decision on
which thread to execute.
The ﬁrst key question is how and when the scheduler is invoked. A simple technique
called cooperative multitasking does not interrupt a thread unless the thread itself calls
a certain procedure or one of a certain set of procedures. For example, the scheduler may
intervene whenever any operating system service is invoked by the currently executing
thread. An operating system service is invoked by making a call to a library procedure.
Each thread has its own stack, and when the procedure call is made, the return address
will be pushed onto the stack. If the scheduler determines that the currently executing
thread should continue to execute, then the requested service is completed and the pro-
cedure returns as normal. If instead the scheduler determines that the thread should be
suspended and another thread should be selected for execution, then instead of returning,
the scheduler makes a record of the stack pointer of the currently executing thread, and
then modiﬁes the stack pointer to point to the stack of the selected thread. It then returns
as normal by popping the return address off the stack and resuming execution, but now in
a new thread.
The main disadvantage of cooperative multitasking is that a program may execute for a
long time without making any operating system service calls, in which case other threads
will be starved. To correct for this, most operating systems include an interrupt service
routine that runs at ﬁxed time intervals. This routine will maintain a system clock, which
provides application programmers with a way to obtain the current time of day and enables
periodic invocation of the scheduler via a timer interrupt. For an operating system with a
system clock, a jiffy is the time interval at which the system-clock ISR is invoked.
Example 10.6: The jiffy values in Linux versions have typically varied between 1
ms and 10 ms.
Lee & Seshia, Introduction to Embedded Systems
275



<!-- Page 296 -->
### [PDF Page 296]

10.2. THREADS
The value of a jiffy is determined by balancing performance concerns with required timing
precision. A smaller jiffy means that scheduling functions are performed more often,
which can degrade overall performance. A larger jiffy means that the precision of the
system clock is coarser and that task switching occurs less often, which can cause real-
time constraints to be violated. Sometimes, the jiffy interval is dictated by the application.
Example 10.7:
Game consoles will typically use a jiffy value synchronized to the
frame rate of the targeted television system because the major time-critical task for
such systems is to generate graphics at this frame rate. For example, NTSC is the
analog television system historically used in most of the Americas, Japan, South
Korea, Taiwan, and a few other places. It has a frame rate of 59.94 Hz, so a suitable
jiffy would be 1/59.94 or about 16.68 ms. With the PAL (phase alternating line)
television standard, used in most of Europe and much of the rest of the world, the
frame rate is 50 Hz, yielding a jiffy of 20 ms.
Analog television is steadily being replaced by digital formats such as ATSC. ATSC
supports a number of frame rates ranging from just below 24 Hz to 60 Hz and a
number of resolutions. Assuming a standard-compliant TV, a game console de-
signer can choose the frame rate and resolution consistent with cost and quality
objectives.
In addition to periodic interrupts and operating service calls, the scheduler might be in-
voked when a thread blocks for some reason. We discuss some of the mechanisms for
such blocking next.
10.2.3
Mutual Exclusion
A thread may be suspended between any two atomic operations to execute another thread
and/or an interrupt service routine. This fact can make it extremely difﬁcult to reason
about interactions among threads.
Example 10.8: Recall the following procedure from Figure 10.2:
276
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 297 -->
### [PDF Page 297]

10. MULTITASKING
14

```c
void addListener(notifyProcedure* listener) {
```

15

```c
if (head == 0) {
```

16
head = malloc(sizeof(element_t));
17
head->listener = listener;
18
head->next = 0;
19
tail = head;
20
} else {
21
tail->next = malloc(sizeof(element_t));
22
tail = tail->next;
23
tail->listener = listener;
24
tail->next = 0;
25
}
26
}
Suppose that addListener is called from more than one thread. Then what
could go wrong? First, two threads may be simultaneously modifying the linked
list data structure, which can easily result in a corrupted data structure. Suppose
for example that a thread is suspended just prior to executing line 23. Suppose that

```python
while the thread is suspended, another thread calls addListener. When the ﬁrst
```

thread resumes executing at line 23, the value of tail has changed. It is no longer
the value that was set in line 22! Careful analysis reveals that this could result in
a list where the second to last element of the list points to a random address for
the listener (whatever was in the memory allocated by malloc), and the second
listener that was added to the list is no longer on the list. When update is called,
it will try to execute a procedure at the random address, which could result in a
segmentation fault, or worse, execution of random memory contents as if they were
instructions!
The problem illustrated in the previous example is known as a race condition. Two
concurrent pieces of code race to access the same resource, and the exact order in which
their accesses occurs affects the results of the program. Not all race conditions are as
bad as the previous example, where some outcomes of the race cause catastrophic failure.
One way to prevent such disasters is by using a mutual exclusion lock (or mutex), as
illustrated in the next example.
Lee & Seshia, Introduction to Embedded Systems
277



<!-- Page 298 -->
### [PDF Page 298]

10.2. THREADS
Example 10.9:
In Pthreads, mutexes are implemented by creating an instance
of a structure called a pthread mutex t. For example, we could modify the
addListener procedure as follows:
pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;

```c
void addListener(notifyProcedure* listener) {
pthread_mutex_lock(&lock);
if (head == 0) {
```

...
} else {
...
}
pthread_mutex_unlock(&lock);
}
The ﬁrst line creates and initializes a global variable called lock. The ﬁrst line
within the addListener procedure acquires the lock. The principle is that only
one thread can hold the lock at a time. The pthread mutex lock procedure
will block until the calling thread can acquire the lock.
In the above code, when addListener is called by a thread and begins executing,
pthread mutex lock does not return until no other thread holds the lock. Once
it returns, this calling thread holds the lock. The pthread mutex unlock call
at the end releases the lock. It is a serious error in multithreaded programming to
fail to release a lock.
A mutual exclusion lock prevents any two threads from simultaneously accessing or mod-
ifying a shared resource. The code between the lock and unlock is a critical section. At
any one time, only one thread can be executing code in such a critical section. A pro-
grammer may need to ensure that all accesses to a shared resource are similarly protected
by locks.
Example 10.10: The update procedure in Figure 10.2 does not modify the list
of listeners, but it does read the list. Suppose that thread A calls addListener
and gets suspended just after line 21, which does this:
21
tail->next = malloc(sizeof(element_t));
278
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 299 -->
### [PDF Page 299]

10. MULTITASKING
Suppose that while A is suspended, another thread B calls update, which includes
the following code:
31
element_t* element = head;
32

```c
while (element != 0) {
```

33
(*(element->listener))(newx);
34
element = element->next;
35
}
What will happen on line 33 when element == tail->next? At that point,
thread B will treat whatever random contents were in the memory returned by
malloc on line 21 as a function pointer and attempt to execute a procedure pointed
to by that pointer. Again, this will result in a segmentation fault or worse.
The mutex added in Example 10.9 is not sufﬁcient to prevent this disaster. The
mutex does not prevent thread A from being suspended. Thus, we need to protect
all accesses of the data structure with mutexes, which we can do by modifying
update as follows

```c
void update(int newx) {
x = newx;
// Notify listeners.
pthread_mutex_lock(&lock);
element_t* element = head;
while (element != 0) {
(*(element->listener))(newx);
element = element->next;
}
pthread_mutex_unlock(&lock);
}
```

This will prevent the update procedure from reading the list data structure while
it is being modiﬁed by any other thread.
10.2.4
Deadlock
As mutex locks proliferate in programs, the risk of deadlock increases. A deadlock occurs
when some threads become permanently blocked trying to acquire locks. This can occur,
for example, if thread A holds lock1 and then blocks trying to acquire lock2, which
is held by thread B, and then thread B blocks trying to acquire lock1. Such deadly
embraces have no clean escape. The program needs to be aborted.
Lee & Seshia, Introduction to Embedded Systems
279



<!-- Page 300 -->
### [PDF Page 300]

10.2. THREADS
Operating Systems
The computers in embedded systems often do not interact directly with humans in the
same way that desktop or handheld computers do. As a consequence, the collection of
services that they need from an operating system (OS) may be very different. The dom-
inant general-purpose OSs for desktops today, Microsoft Windows, Mac OS X, and
Linux, provide services that may or may not be required in an embedded processor. For
example, many embedded applications do not require a graphical user interface (GUI), a
ﬁle system, font management, or even a network stack.
Several operating systems have been developed speciﬁcally for embedded applications,
including Windows CE (WinCE) (from Microsoft), VxWorks (from Wind River Systems,
acquired by Intel in 2009), QNX (from QNX Software Systems, acquired in 2010 by
Research in Motion (RIM)), Embedded Linux (an open source community effort), and
FreeRTOS (another open source community effort). These OSs share many features with
general-purpose OSs, but typically have specialized the kernel to become a real-time
operating system (RTOS). An RTOS provides bounded latency on interrupt servicing as
well as a scheduler for processes that takes into account real-time constraints.
Mobile operating systems are a third class of OS designed speciﬁcally for handheld
devices such as cell phones and PDAs. Examples are Symbian OS (an open-source effort
maintained by the Symbian Foundation), Android (from Google), BlackBerry OS (from
RIM), iPhone OS (from Apple), Palm OS (from Palm, Inc., acquired by Hewlett Packard
in 2010), and Windows Mobile (from Microsoft). These OSs have specialized support for
wireless connectivity and media formats.
The core of any operating system is the kernel, which controls the order in which
processes are executed, how memory is used, and how information is communicated to
peripheral devices and networks (via device drivers). A microkernel is very small oper-
ating system that provides only these services (or even a subset of these services). OSs
may provide many other services, however. These could include user interface infras-
tructure (integral to Mac OS X and Windows), virtual memory, memory allocation and
deallocation, memory protection (to isolate applications from the kernel and from each
other), a ﬁle system, and services for programs to interact such as semaphores, mutexes,
and message passing libraries.
280
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 301 -->
### [PDF Page 301]

10. MULTITASKING
Example 10.11: Suppose that both addListener and update in Figure 10.2
are protected by a mutex, as in the two previous examples. The update procedure
includes the line
33
(*(element->listener))(newx);
which calls a procedure pointed to by the list element. It would not be unreasonable
for that procedure to itself need to acquire a mutex lock. Suppose for example that
the listener procedure needs to update a display. A display is typically a shared re-
source, and therefore will likely have to be protected with its own mutex lock. Sup-
pose that thread A calls update, which reaches line 33 and then blocks because
the listener procedure tries to acquire a different lock held by thread B. Suppose
then that thread B calls addListener. Deadlock!
Deadlock can be difﬁcult to avoid. In a classic paper, Coffman et al. (1971) give necessary
conditions for deadlock to occur, any of which can be removed to avoid deadlock. One
simple technique is to use only one lock throughout an entire multithreaded program. This
technique does not lead to very modular programming, however. Moreover, it can make it
difﬁcult to meet real-time constraints because some shared resources (e.g., displays) may
need to be held long enough to cause deadlines to be missed in other threads.
In a very simple microkernel, we can sometimes use the enabling and disabling of inter-
rupts as a single global mutex. Assume that we have a single processor (not a multicore),
and that interrupts are the only mechanism by which a thread may be suspended (i.e.,
they do not get suspended when calling kernel services or blocking on I/O). With these
assumptions, disabling interrupts prevents a thread from being suspended. In most OSs,
however, threads can be suspended for many reasons, so this technique won’t work.
A third technique is to ensure that when there are multiple mutex locks, every thread
acquires the locks in the same order. This can be difﬁcult to guarantee, however, for
several reasons (see Exercise 2). First, most programs are written by multiple people, and
the locks acquired within a procedure are not part of the signature of the procedure. So
this technique relies on very careful and consistent documentation and cooperation across
a development team. And any time a lock is added, then all parts of the program that
acquire locks may have to be modiﬁed.
Second, it can make correct coding extremely difﬁcult. If a programmer wishes to call a
procedure that acquires lock1, which by convention in the program is always the ﬁrst
Lee & Seshia, Introduction to Embedded Systems
281



<!-- Page 302 -->
### [PDF Page 302]

10.2. THREADS
lock acquired, then it must ﬁrst release any locks it holds. As soon as it releases those
locks, it may be suspended, and the resource that it held those locks to protect may be
modiﬁed. Once it has acquired lock1, it must then reacquire those locks, but it will then
need to assume it no longer knows anything about the state of the resources, and it may
have to redo considerable work.
There are many more ways to prevent deadlock. For example, a particularly elegant tech-
nique synthesizes constraints on a scheduler to prevent deadlock (Wang et al., 2009).
Nevertheless, most available techniques either impose severe constraints on the program-
mer or require considerable sophistication to apply, which suggests that the problem may
be with the concurrent programming model of threads.
10.2.5
Memory Consistency Models
As if race conditions and deadlock were not problematic enough, threads also suffer from
potentially subtle problems with the memory model of the programs. Any particular im-
plementation of threads offers some sort of memory consistency model, which deﬁnes
how variables that are read and written by different threads appear to those threads. Intu-
itively, reading a variable should yield the last value written to the variable, but what does
“last” mean? Consider a scenario, for example, where all variables are initialized with
value zero, and thread A executes the following two statements:
1
x = 1;
2
w = y;

```python
while thread B executes the following two statements:
```

1
y = 1;
2
z = x;
Intuitively, after both threads have executed these statements, we would expect that at
least one of the two variables w and z to have value 1. Such a guarantee is referred to as
sequential consistency (Lamport, 1979). Sequential consistency means that the result of
any execution is the same as if the operations of all threads are executed in some sequential
order, and the operations of each individual thread appear in this sequence in the order
speciﬁed by the thread.
However, sequential consistency is not guaranteed by most (or possibly all) implemen-
tations of Pthreads. In fact, providing such a guarantee is rather difﬁcult on modern
282
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 303 -->
### [PDF Page 303]

10. MULTITASKING
processors using modern compilers. A compiler, for example, is free to re-order the in-
structions in each of these threads because there is no dependency between them (that is
visible to the compiler). Even if the compiler does not reorder them, the hardware might.
A good defensive tactic is to very carefully guard such accesses to shared variables us-
ing mutual exclusion locks (and to hope that those mutual exclusion locks themselves are
implemented correctly).
An authoritative overview of memory consistency issues is provided by Adve and Ghara-
chorloo (1996), who focus on multiprocessors. Boehm (2005) provides an analysis of the
memory consistency problems with threads on a single processor.
10.2.6
The Problem with Threads
Multithreaded programs can be very difﬁcult to understand. Moreover, it can be difﬁcult
to build conﬁdence in the programs because problems in the code may not show up in
testing. A program may have the possibility of deadlock, for example, but nonetheless
run correctly for years without the deadlock ever appearing. Programmers have to be
very cautious, but reasoning about the programs is sufﬁciently difﬁcult that programming
errors are likely to persist.
In the example of Figure 10.2, we can avoid the potential deadlock of Example 10.11
using a simple trick, but the trick leads to a more insidious error (an error that may
not occur in testing, and may not be noticed when it occurs, unlike a deadlock, which is
almost always noticed when it occurs).
Example 10.12: Suppose we modify the update procedure as follows:

```c
void update(int newx) {
x = newx;
// Copy the list
pthread_mutex_lock(&lock);
element_t* headc = NULL;
element_t* tailc = NULL;
element_t* element = head;
while (element != 0) {
if (headc == NULL) {
headc = malloc(sizeof(element_t));
headc->listener = head->listener;
headc->next = 0;
```

Lee & Seshia, Introduction to Embedded Systems
283



<!-- Page 304 -->
### [PDF Page 304]

10.2. THREADS
tailc = headc;
} else {
tailc->next = malloc(sizeof(element_t));
tailc = tailc->next;
tailc->listener = element->listener;
tailc->next = 0;
}
element = element->next;
}
pthread_mutex_unlock(&lock);
// Notify listeners using the copy
element = headc;

```c
while (element != 0) {
(*(element->listener))(newx);
element = element->next;
}
}
```

This implementation does not hold lock when it calls the listener procedure. In-
stead, it holds the lock while it constructs a copy of the list of the listeners, and then
it releases the lock. After releasing the lock, it uses the copy of the list of listeners
to notify the listeners.
This code, however, has a potentially serious problem that may not be detected in
testing. Speciﬁcally, suppose that thread A calls update with argument newx =
0, indicating “all systems normal.” Suppose that A is suspended just after releasing
the lock, but before performing the notiﬁcations. Suppose that while it is sus-
pended, thread B calls update with argument newx = 1, meaning “emergency!
the engine is on ﬁre!” Suppose that this call to update completes before thread
A gets a chance to resume. When thread A resumes, it will notify all the listeners,
but it will notify them of the wrong value! If one of the listeners is updating a pilot
display for an aircraft, the display will indicate that all systems are normal, when
in fact the engine is on ﬁre.
Many programmers are familiar with threads and appreciate the ease with which they ex-
ploit underlying parallel hardware. It is possible, but not easy, to construct reliable and
correct multithreaded programs. See for example Lea (1997) for an excellent “how to”
guide to using threads in Java. By 2005, standard Java libraries included concurrent data
structures and mechanisms based on threads (Lea, 2005). Libraries like OpenMP (Chap-
284
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 305 -->
### [PDF Page 305]

10. MULTITASKING
man et al., 2007) also provide support for commonly used multithreaded patterns such
as parallel loop constructs. However, embedded systems programmers rarely use Java or
large sophisticated packages like OpenMP. And even if they did, the same deadlock risks
and insidious errors would occur.
Threads have a number of difﬁculties that make it questionable to expose them to pro-
grammers as a way to build concurrent programs (Ousterhout, 1996; Sutter and Larus,
2005; Lee, 2006; Hayes, 2007). In fact, before the 1990s, threads were not used at all by
application programmers. It was the emergence of libraries like Pthreads and languages
like Java and C# that exposed these mechanisms to application programmers.
Nontrivial multithreaded programs are astonishingly difﬁcult to understand, and can yield
insidious errors, race conditions, and deadlock. Problems can lurk in multithreaded pro-
grams through years of even intensive use of the programs. These concerns are partic-
ularly important for embedded systems that affect the safety and livelihood of humans.
Since virtually every embedded system involves concurrent software, engineers that de-
sign embedded systems must confront the pitfalls.
10.3
Processes and Message Passing
Processes are imperative programs with their own memory spaces. These programs can-
not refer to each others’ variables, and consequently they do not exhibit the same dif-
ﬁculties as threads. Communication between the programs must occur via mechanisms
provided by the operating system, microkernel, or a library.
Implementing processes correctly generally requires hardware support in the form of a
memory management unit or MMU. The MMU protects the memory of one process from
accidental reads or writes by another process. It typically also provides address trans-
lation, providing for each process the illusion of a ﬁxed memory address space that is
the same for all processes. When a process accesses a memory location in that address
space, the MMU shifts the address to refer to a location in the portion of physical memory
allocated to that process.
To achieve concurrency, processes need to be able to communicate. Operating systems
typically provide a variety of mechanisms, often even including the ability to create shared
memory spaces, which of course opens the programmer to all the potential difﬁculties of
multithreaded programming.
Lee & Seshia, Introduction to Embedded Systems
285



<!-- Page 306 -->
### [PDF Page 306]

10.3. PROCESSES AND MESSAGE PASSING
1
void* producer(void* arg) {
2

```c
int i;
```

3

```c
for (i = 0; i < 10; i++) {
```

4
send(i);
5
}
6

```c
return NULL;
```

7
}
8
void* consumer(void* arg) {
9

```c
while(1) {
```

10
printf("received %d\n", get());
11
}
12

```c
return NULL;
```

13
}
14

```c
int main(void) {
```

15
pthread_t threadID1, threadID2;
16
void* exitStatus;
17
pthread_create(&threadID1, NULL, producer, NULL);
18
pthread_create(&threadID2, NULL, consumer, NULL);
19
pthread_join(threadID1, &exitStatus);
20
pthread_join(threadID2, &exitStatus);
21

```c
return 0;
```

22
}

![Figure 10.5: Example of a simple message-passing application.](images/fig_306_figure_10_5.png)
*Description*: Technical diagram and schematic model illustrating cyber-physical system behavior, algorithmic logic, and state progression for Figure 10.5: Example of a simple message-passing application..

> **Figure 10.5: Example of a simple message-passing application.**

One such mechanism that has fewer difﬁculties is a ﬁle system. A ﬁle system is simply
a way to create a body of data that is persistent in the sense that it outlives the process
that creates it. One process can create data and write it to a ﬁle, and another process can
read data from the same ﬁle. It is up to the implementation of the ﬁle system to ensure
that the process reading the data does not read it before it is written. This can be done, for
example, by allowing no more than one process to operate on a ﬁle at a time.
A more ﬂexible mechanism for communicating between processes is message passing.
Here, one process creates a chunk of data, deposits it in a carefully controlled section of
memory that is shared, and then notiﬁes other processes that the message is ready. Those
other processes can block waiting for the data to become ready. Message passing requires
some memory to be shared, but it is implemented in libraries that are presumably written
by experts. An application programmer invokes a library procedure to send a message or
to receive a message.
286
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 307 -->
### [PDF Page 307]

10. MULTITASKING
1

```c
#include <pthread.h>
```

2

```c
struct element {int payload; struct element* next;};
```

3
typedef struct element element_t;
4
element_t *head = 0, *tail = 0;
5

```c
int size = 0;
```

6
pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;
7
pthread_cond_t sent = PTHREAD_COND_INITIALIZER;
8
9

```c
void send(int message) {
```

10
pthread_mutex_lock(&mutex);
11

```c
if (head == 0) {
```

12
head = malloc(sizeof(element_t));
13
head->payload = message;
14
head->next = 0;
15
tail = head;
16
} else {
17
tail->next = malloc(sizeof(element_t));
18
tail = tail->next;
19
tail->payload = message;
20
tail->next = 0;
21
}
22
size++;
23
pthread_cond_signal(&sent);
24
pthread_mutex_unlock(&mutex);
25
}
26

```c
int get() {
```

27
element_t* element;
28

```c
int result;
```

29
pthread_mutex_lock(&mutex);
30

```c
while (size == 0) {
```

31
pthread_cond_wait(&sent, &mutex);
32
}
33
result = head->payload;
34
element = head;
35
head = head->next;
36
free(element);
37
size--;
38
pthread_mutex_unlock(&mutex);
39

```c
return result;
```

40
}

![Figure 10.6: Message-passing procedures to send and get messages.](images/fig_307_figure_10_6.png)
*Description*: Technical diagram and schematic model illustrating cyber-physical system behavior, algorithmic logic, and state progression for Figure 10.6: Message-passing procedures to send and get messages..

> **Figure 10.6: Message-passing procedures to send and get messages.**

Lee & Seshia, Introduction to Embedded Systems
287



<!-- Page 308 -->
### [PDF Page 308]

10.3. PROCESSES AND MESSAGE PASSING
Example 10.13:
A simple example of a message passing program is shown in

![Figure 10.5: This program uses a producer/consumer pattern, where one thread](images/fig_308_figure_10_5.png)
*Description*: Technical diagram and schematic model illustrating cyber-physical system behavior, algorithmic logic, and state progression for Figure 10.5: This program uses a producer/consumer pattern, where one thread.

> **Figure 10.5: This program uses a producer/consumer pattern, where one thread**

produces a sequence of messages (a stream), and another thread consumes the
messages. This pattern can be used to implement the observer pattern without
deadlock risk and without the insidious error discussed in the previous section. The
update procedure would always execute in a different thread from the observers,
and would produce messages that are consumed by the observers.
In Figure 10.5, the code executed by the producing thread is given by the
producer procedure, and the code for the consuming thread by the consumer
procedure. The producer invokes a procedure called send (to be deﬁned) on line
4 to send an integer-valued message. The consumer uses get (also to be deﬁned)
on line 10 to receive the message. The consumer is assured that get does not re-
turn until it has actually received the message. Notice that in this case, consumer
never returns, so this program will not terminate on its own.
An implementation of send and get using Pthreads is shown in Figure 10.6. This
implementation uses a linked list similar to that in Figure 10.2, but where the pay-
load is an int. Here, the linked list is implementing an unbounded ﬁrst-in, ﬁrst-
out (FIFO) queue, where new elements are inserted at the tail and old elements
are removed from the head.
Consider ﬁrst the implementation of send. It uses a mutex to ensure that send and
get are not simultaneously modifying the linked list, as before. But in addition,
it uses a condition variable to communicate to the consumer process that the size
of the queue has changed. The condition variable called sent is declared and ini-
tialized on line 7. On line 23, the producer thread calls pthread cond signal,
which will “wake up” another thread that is blocked on the condition variable, if
there is such a thread.
To see what it means to “wake up” another thread, look at the get procedure. On
line 31, if the thread calling get has discovered that the current size of the queue is
zero, then it calls pthread cond wait, which will block the thread until some
other thread calls pthread cond signal. (There are other conditions that will
cause pthread cond wait to return, so the code has to wait repeatedly until it
ﬁnds that the queue size is non-zero.)
It
is
critical
that
the
procedures
pthread cond signal
and
pthread cond wait be called while holding the mutex lock.
Why?
288
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 309 -->
### [PDF Page 309]

10. MULTITASKING
Suppose that lines 23 and 24 were reversed, and pthread cond signal were
called after releasing the mutex lock. Then in this case, it would be possible for
pthread cond signal to be called while the consumer thread is suspended
(but not yet blocked) between lines 30 and 31. In this case, when the consumer
thread resumes, it will execute line 31 and block, waiting for a signal. But the
signal has already been sent! And it may not be sent again, so the consumer thread
could be permanently blocked.
Notice further on line 31 that pthread cond wait takes &mutex as an ar-
gument. In fact, while the thread is blocked on the wait, it releases the mutex
lock temporarily. If it were not to do this, then the producer thread would be
unable to enter its critical section, and therefore would be unable to send a mes-
sage. The program would deadlock. Before pthread cond wait returns, it
will re-acquire the mutex lock. Programmers have to be very careful when call-
ing pthread cond wait, because the mutex lock is temporarily released dur-
ing the call. As a consequence, the value of any shared variable after the call to
pthread cond wait may not be the same as it was before the call (see Exercise
3).
The condition variables used in the previous example are a generalized form of semaphores.
Semaphores are named after mechanical signals traditionally used on railroad tracks to
signal that a section of track has a train on it. Using such semaphores, it is possible to use
a single section of track for trains to travel in both directions (the semaphore implements
mutual exclusion, preventing two trains from simultaneously being on the same section
of track).
In the 1960s, Edsger W. Dijkstra, a professor in the Department of Mathematics at the
Eindhoven University of Technology, Netherlands, borrowed this idea to show how pro-
grams could safely share resources. A counting semaphore (which Dijkstra called a PV
semaphore) is a variable whose value is a non-negative integer. A value of zero is treated
as distinctly different from a value greater than zero. In fact, the size variable in Ex-
ample 10.13 functions as such a semaphore. It is incremented by sending a message,
and a value of zero blocks the consumer until the value is non-zero. Condition variables
generalize this idea by supporting arbitrary conditions, rather than just zero or non-zero,
as the gating criterion for blocking. Moreover, at least in Pthreads, condition variables
also coordinate with mutexes to make patterns like that in Example 10.13 easier to write.
Dijkstra received the 1972 Turing Award for his work on concurrent programming.
Lee & Seshia, Introduction to Embedded Systems
289



<!-- Page 310 -->
### [PDF Page 310]

10.4. SUMMARY
Using message passing in applications can be easier than directly using threads and shared
variables. But even message passing is not without peril. The implementation of the pro-
ducer/consumer pattern in Example 10.13, in fact, has a fairly serious ﬂaw. Speciﬁcally, it
imposes no constraints on the size of the message queue. Any time a producer thread calls
send, memory will be allocated to store the message, and that memory will not be deal-
located until the message is consumed. If the producer thread produces messages faster
than the consumer consumes them, then the program will eventually exhaust available
memory. This can be ﬁxed by limiting the size of the buffer (see Exercise 4), but what
size is appropriate? Choosing buffers that are too small can cause a program to deadlock,
and choosing buffers that are too large is wasteful of resources. This problem is not trivial
to solve (Lee, 2009b).
There are other pitfalls as well.
Programmers may inadvertently construct message-
passing programs that deadlock, where a set of threads are all waiting for messages from
one another. In addition, programmers can inadvertently construct message-passing pro-
grams that are nondeterminate, in the sense that the results of the computation depend on
the (arbitrary) order in which the thread scheduler happens to schedule the threads.
The simplest solution is for application programmers to use higher-levels of abstraction
for concurrency, the top layer in Figure 10.1, as described in Chapter 6. Of course, they
can only use that strategy if they have available a reliable implementation of a higher-level
concurrent model of computation.
10.4

### Summary

This chapter has focused on mid-level abstractions for concurrent programs, above the
level of interrupts and parallel hardware, but below the level of concurrent models of
computation. Speciﬁcally, it has explained threads, which are sequential programs that
execute concurrently and share variables. We have explained mutual exclusion and the
use of semaphores. We have shown that threads are fraught with peril, and that writing
correct multithreaded programs is extremely difﬁcult. Message passing schemes avoid
some of the difﬁculties, but not all, at the expense of being somewhat more constraining
by prohibiting direct sharing of data. In the long run, designers will be better off using
higher-levels of abstraction, as discussed in Chapter 6.
290
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 311 -->
### [PDF Page 311]

10. MULTITASKING

### Exercises

1. Give an extended state-machine model of the addListener procedure in Figure

## 10.2 similar to that in Figure 10.3,

2. Suppose that two int global variables a and b are shared among several threads.
Suppose that lock a and lock b are two mutex locks that guard access to a and
b. Suppose you cannot assume that reads and writes of int global variables are
atomic. Consider the following code:
1

```c
int a, b;
```

2
pthread_mutex_t lock_a
3
= PTHREAD_MUTEX_INITIALIZER;
4
pthread_mutex_t lock_b
5
= PTHREAD_MUTEX_INITIALIZER;
6
7

```c
void proc1(int arg) {
```

8
pthread_mutex_lock(&lock_a);
9

```c
if (a == arg) {
```

10
proc2(arg);
11
}
12
pthread_mutex_unlock(&lock_a);
13
}
14
15

```c
void proc2(int arg) {
```

16
pthread_mutex_lock(&lock_b);
17
b = arg;
18
pthread_mutex_unlock(&lock_b);
19
}
Suppose that to ensure that deadlocks do not occur, the development team has
agreed that lock b should always be acquired before lock a by any code that
acquires both locks. Moreover, for performance reasons, the team insists that no
lock be acquired unnecessarily. Consequently, it would not be acceptable to mod-
ify proc1 as follows:
1

```c
void proc1(int arg) {
```

2
pthread_mutex_lock(&lock_b);
3
pthread_mutex_lock(&lock_a);
4

```c
if (a == arg) {
```

5
proc2(arg);
6
}
7
pthread_mutex_unlock(&lock_a);
8
pthread_mutex_unlock(&lock_b);
Lee & Seshia, Introduction to Embedded Systems
291



<!-- Page 312 -->
### [PDF Page 312]


### EXERCISES

9
}
A thread calling proc1 will acquire lock b unnecessarily when a is not equal
to arg. 2 Give a design for proc1 that minimizes unnecessary acquisitions of
lock b. Does your solution eliminate unnecessary acquisitions of lock b? Is
there any solution that does this?
3. The implementation of get in Figure 10.6 permits there to be more than one thread
calling get.
However, if we change the code on lines 31-33 to: pthread cond wait
1

```c
if (size == 0) {
```

2
pthread_cond_wait(&sent, &mutex);
3
}
then this code would only work if two conditions are satisﬁed:
• pthread cond wait returns only if there is a matching call to
pthread cond signal, and
• there is only one consumer thread.
Explain why the second condition is required.
4. The producer/consumer pattern implementation in Example 10.13 has the draw-
back that the size of the queue used to buffer messages is unbounded. A program
could fail by exhausting all available memory (which will cause malloc to fail).
Construct a variant of the send and get procedures of Figure 10.6 that limits the
buffer size to 5 messages.
5. An alternative form of message passing called rendezvous is similar to the pro-
ducer/consumer pattern of Example 10.13, but it synchronizes the producer and
consumer more tightly. In particular, in Example 10.13, the send procedure re-
turns immediately, regardless of whether there is any consumer thread ready to
receive the message. In a rendezvous-style communication, the send procedure
will not return until a consumer thread has reached a corresponding call to get.
Consequently, no buffering of the messages is needed. Construct implementations
of send and get that implement such a rendezvous.
2In some thread libraries, such code is actually incorrect, in that a thread will block trying to acquire a
lock it already holds. But we assume for this problem that if a thread attempts to acquire a lock it already
holds, then it is immediately granted the lock.
292
Lee & Seshia, Introduction to Embedded Systems


