# Chapter 11: Scheduling

> **Textbook**: Introduction to Embedded Systems - A Cyber-Physical Systems Approach (UC Berkeley)  
> **Authors**: Edward Ashford Lee and Sanjit Arunkumar Seshia  
> **PDF Page Range**: 313 - 346


---


<!-- Page 313 -->
### [PDF Page 313]

11
Scheduling
Contents

## 11.1 Basics of Scheduling . . . . . . . . . . . . . . . . . . . . . . . . . . 294


### 11.1.1 Scheduling Decisions . . . . . . . . . . . . . . . . . . . . . . 294


### 11.1.2 Task Models

. . . . . . . . . . . . . . . . . . . . . . . . . . 296

### 11.1.3 Comparing Schedulers . . . . . . . . . . . . . . . . . . . . . 298


### 11.1.4 Implementation of a Scheduler . . . . . . . . . . . . . . . . . 299


## 11.2 Rate Monotonic Scheduling . . . . . . . . . . . . . . . . . . . . . . 300


## 11.3 Earliest Deadline First . . . . . . . . . . . . . . . . . . . . . . . . . 305


### 11.3.1 EDF with Precedences . . . . . . . . . . . . . . . . . . . . . 308


## 11.4 Scheduling and Mutual Exclusion . . . . . . . . . . . . . . . . . . 310


### 11.4.1 Priority Inversion . . . . . . . . . . . . . . . . . . . . . . . . 310


### 11.4.2 Priority Inheritance Protocol . . . . . . . . . . . . . . . . . . 312


### 11.4.3 Priority Ceiling Protocol . . . . . . . . . . . . . . . . . . . . 313


## 11.5 Multiprocessor Scheduling . . . . . . . . . . . . . . . . . . . . . . 315


### 11.5.1 Scheduling Anomalies . . . . . . . . . . . . . . . . . . . . . 316


## 11.6 Summary . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 319


### Sidebar: Further Reading . . . . . . . . . . . . . . . . . . . . . . . . 320


### Exercises . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 321

293



<!-- Page 314 -->
### [PDF Page 314]

11.1. BASICS OF SCHEDULING

# Chapter 10 has explained multitasking, where multiple imperative tasks execute concur-

rently, either interleaved on a single processor or in parallel on multiple processors. When
there are fewer processors than tasks (the usual case), or when tasks must be performed at
a particular time, a scheduler must intervene. A scheduler makes the decision about what
to do next at certain points in time, such as the time when a processor becomes available.
Real-time systems are collections of tasks where in addition to any ordering constraints
imposed by precedences between the tasks, there are also timing constraints. These con-
straints relate the execution of a task to real time, which is physical time in the envi-
ronment of the computer executing the task. Typically, tasks have deadlines, which are
values of physical time by which the task must be completed. More generally, real-time
programs can have all manner of timing constraints, not just deadlines. For example,
a task may be required to be executed no earlier than a particular time; or it may be re-
quired to be executed no more than a given amount of time after another task is executed;
or it may be required to execute periodically with some speciﬁed period. Tasks may be
dependent on one another, and may cooperatively form an application. Or they may be
unrelated except that they share processor resources. All of these situations require a
scheduling strategy.
11.1
Basics of Scheduling
In this section, we discuss the range of possibilities for scheduling, the properties of tasks
that a scheduler uses to guide the process, and the implementation of schedulers in an
operating system or microkernel.
11.1.1
Scheduling Decisions
A scheduler decides what task to execute next when faced with a choice in the execu-
tion of a concurrent program or set of programs. In general, a scheduler may have more
than one processor available to it (for example in a multicore system). A multiproces-
sor scheduler needs to decide not only which task to execute next, but also on which
processor to execute it. The choice of processor is called processor assignment.
A scheduling decision is a decision to execute a task, and it has the following three
parts:
294
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 315 -->
### [PDF Page 315]

11. SCHEDULING
• assignment: which processor should execute the task;
• ordering: in what order each processor should execute its tasks; and
• timing: the time at which each task executes.
Each of these three decisions may be made at design time, before the program begins
executing, or at run time, during the execution of the program.
Depending on when the decisions are made, we can distinguish a few different types of
schedulers (Lee and Ha, 1989). A fully-static scheduler makes all three decisions at
design time. The result of scheduling is a precise speciﬁcation for each processor of what
to do when. A fully-static scheduler typically does not need semaphores or locks. It
can use timing instead to enforce mutual exclusion and precedence constraints. However,
fully-static schedulers are difﬁcult to realize with most modern microprocessors because
the time it takes to execute a task is difﬁcult to predict precisely, and because tasks will
typically have data-dependent execution times (see Chapter 15).
A static order scheduler performs the task assignment and ordering at design time, but
defers until run time the decision of when in physical time to execute a task. That deci-
sion may be affected, for example, by whether a mutual exclusion lock can be acquired,
or whether precedence constraints have been satisﬁed. In static order scheduling, each
processor is given its marching orders before the program begins executing, and it simply
executes those orders as quickly as it can. It does not, for example, change the order of
tasks based on the state of a semaphore or a lock. A task itself, however, may block on a
semaphore or lock, in which case it blocks the entire sequence of tasks on that processor.
A static order scheduler is often called an off-line scheduler.
A static assignment scheduler performs the assignment at design time and everything
else at run time. Each processor is given a set of tasks to execute, and a run-time sched-
uler decides during execution what task to execute next.
A fully-dynamic scheduler performs all decisions at run time. When a processor be-
comes available (e.g., it ﬁnishes executing a task, or a task blocks acquiring a mutex), the
scheduler makes a decision at that point about what task to execute next on that processor.
Both static assignment and fully-dynamic schedulers are often called on-line schedulers.
There are, of course, other scheduler possibilities. For example, the assignment of a task
may be done once for a task, at run time just prior to the ﬁrst execution of the task. For
subsequent runs of the same task, the same assignment is used. Some combinations do not
make much sense. For example, it does not make sense to determine the time of execution
of a task at design time and the order at run time.
Lee & Seshia, Introduction to Embedded Systems
295



<!-- Page 316 -->
### [PDF Page 316]

11.1. BASICS OF SCHEDULING
A preemptive scheduler may make a scheduling decision during the execution of a task,
assigning a new task to the same processor. That is, a task may be in the middle of exe-
cuting when the scheduler decides to stop that execution and begin execution of another
task. The interruption of the ﬁrst task is called preemption. A scheduler that always lets
tasks run to completion before assigning another task to execute on the same processor is
called a non-preemptive scheduler.
In preemptive scheduling, a task may be preempted if it attempts to acquire a mutual
exclusion lock and the lock is not available. When this occurs, the task is said to be
blocked on the lock. When another task releases the lock, the blocked task may resume.
Moreover, a task may be preempted when it releases a lock. This can occur for example
if there is a higher priority task that is blocked on the lock. We will assume in this chapter
well-structured programs, where any task that acquires a lock eventually releases it.
11.1.2
Task Models
For a scheduler to make its decisions, it needs some information about the structure of the
program. A typical assumption is that the scheduler is given a ﬁnite set T of tasks. Each
task may be assumed to be ﬁnite (it terminates in ﬁnite time), or not. A typical operating
system scheduler does not assume that tasks terminate, but real-time schedulers often do.
A scheduler may make many more assumptions about tasks, a few of which we discuss in
this section. The set of assumptions is called the task model of the scheduler.
Some schedulers assume that all tasks to be executed are known before scheduling begins,
and some support arrival of tasks, meaning tasks become known to the scheduler as
other tasks are being executed. Some schedulers support scenarios where each task τ ∈T
executes repeatedly, possibly forever, and possibly periodically. A task could also be
sporadic, which means that it repeats, and its timing is irregular, but that there is a lower
bound on the time between task executions. In situations where a task τ ∈T executes
repeatedly, we need to make a distinction between the task τ and the task executions
τ1,τ2,···. If each task executes exactly once, then no such distinction is necessary.
Task executions may have precedence constraints, a requirement that one execution pre-
cedes another. If execution i must precede j, we can write i < j. Here, i and j may be
distinct executions of the same task, or executions of different tasks.
A task execution i may have some preconditions to start or resume execution. These
are conditions that must be satisﬁed before the task can execute. When the preconditions
296
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 317 -->
### [PDF Page 317]

11. SCHEDULING
















	




oi







ei
ri
si
fi
di
i

![Figure 11.1: Summary of times associated with a task execution.](images/fig_317_figure_11_1.png)
*Description*: Technical diagram and schematic model illustrating cyber-physical system behavior, algorithmic logic, and state progression for Figure 11.1: Summary of times associated with a task execution..

> **Figure 11.1: Summary of times associated with a task execution.**

are satisﬁed, the task execution is said to be enabled. Precedences, for example, specify
preconditions to start a task execution. Availability of a lock may be a precondition for
resumption of a task.
We next deﬁne a few terms that are summarized in Figure 11.1.
For a task execution i, we deﬁne the release time ri (also called the arrival time) to be
the earliest time at which a task is enabled. We deﬁne the start time si to be the time at
which the execution actually starts. Obviously, we require that
si ≥ri .
We deﬁne the ﬁnish time fi to be the time at which the task completes execution. Hence,
fi ≥si .
The response time oi is given by
oi = fi −ri .
The response time, therefore, is the time that elapses between when the task is ﬁrst enabled
and when it completes execution.
The execution time ei of τi is deﬁned to be the total time that the task is actually executing.
It does not include any time that the task may be blocked or preempted. Many scheduling
Lee & Seshia, Introduction to Embedded Systems
297



<!-- Page 318 -->
### [PDF Page 318]

11.1. BASICS OF SCHEDULING
strategies assume (often unrealistically) that the execution time of a task is known and
ﬁxed. If the execution time is variable, it is common to assume (often unrealistically)
that the worst-case execution time (WCET) is known. Determining execution times of
software can be quite challenging, as discussed in Chapter 15.
The deadline di is the time by which a task must be completed. Sometimes, a deadline
is a real physical constraint imposed by the application, where missing the deadline is
considered an error. Such a deadline is called a hard deadline. Scheduling with hard
deadlines is called hard real-time scheduling.
Often, a deadline reﬂects a design decision that need not be enforced strictly. It is better
to meet the deadline, but missing the deadline is not an error. Generally it is better to not
miss the deadline by much. This case is called soft real-time scheduling.
A scheduler may use priority rather than (or in addition to) a deadline. A priority-based
scheduler assumes each task is assigned a number called a priority, and the scheduler will
always choose to execute the task with the highest priority (which is often represented by
the lowest priority number). A ﬁxed priority is a priority that remains constant over all
executions of a task. A dynamic priority is allowed to change for during execution.
A preemptive priority-based scheduler is a scheduler that supports arrivals of tasks and
at all times is executing the enabled task with the highest priority. A non-preemptive
priority-based scheduler is a scheduler that uses priorities to determine which task to
execute next after the current task execution completes, but never interrupts a task during
execution to schedule another task.
11.1.3
Comparing Schedulers
The choice of scheduling strategy is governed by considerations that depend on the goals
of the application. A rather simple goal is that all task executions meet their deadlines,
fi ≤di. A schedule that accomplishes this is called a feasible schedule. A scheduler that
yields a feasible schedule for any task set (that conforms to its task model) for which there
is a feasible schedule is said to be optimal with respect to feasibility.
A criterion that might be used to compare scheduling algorithms is the achievable pro-
cessor utilization. The utilization is the percentage of time that the processor spends
executing tasks (vs. being idle). This metric is most useful for tasks that execute peri-
odically. A scheduling algorithm that delivers a feasible schedule whenever processor
utilization is less than or equal to 100% is obviously optimal with respect to feasibility. It
298
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 319 -->
### [PDF Page 319]

11. SCHEDULING
only fails to deliver a feasible schedule in circumstances where all scheduling algorithms
will fail to deliver a feasible schedule.
Another criterion that might be used to compare schedulers is the maximum lateness,
deﬁned for a set of task executions T as
Lmax = max
i∈T (fi −di) .
For a feasible schedule, this number is zero or negative. But maximum lateness can also
be used to compare infeasible schedules. For soft real-time problems, it may be tolerable
for this number to be positive, as long as it does not get too large.
A third criterion that might be used for a ﬁnite set T of task executions is the total com-
pletion time or makespan, deﬁned by
M = max
i∈T fi −min
i∈T ri .
If the goal of scheduling is to minimize the makespan, this is really more of a performance
goal rather than a real-time requirement.
11.1.4
Implementation of a Scheduler
A scheduler may be part of a compiler or code generator (for scheduling decisions made at
design time), part of an operating system or microkernel (for scheduling decisions made
at run time), or both (if some scheduling decisions are made at design time and some at
run time).
A run-time scheduler will typically implement tasks as threads (or as processes, but the
distinction is not important here). Sometimes, the scheduler assumes these threads com-
plete in ﬁnite time, and sometimes it makes no such assumption. In either case, the sched-
uler is a procedure that gets invoked at certain times. For very simple, non-preemptive
schedulers, the scheduling procedure may be invoked each time a task completes. For
preemptive schedulers, the scheduling procedure is invoked when any of several things
occur:
• A timer interrupt occurs, for example at a jiffy interval.
• An I/O interrupt occurs.
• An operating system service is invoked.
• A task attempts to acquire a mutex.
Lee & Seshia, Introduction to Embedded Systems
299



<!-- Page 320 -->
### [PDF Page 320]

11.2. RATE MONOTONIC SCHEDULING
• A task tests a semaphore.
For interrupts, the scheduling procedure is called by the interrupt service routine (ISR).
In the other cases, the scheduling procedure is called by the operating system procedure
that provides the service. In both cases, the stack contains the information required to
resume execution. However, the scheduler may choose not to simply resume execution.
I.e., it may choose not to immediately return from the interrupt or service procedure. It
may choose instead to preempt whatever task is currently running and begin or resume
another task.
To accomplish this preemption, the scheduler needs to record the fact that the task is
preempted (and, perhaps, why it is preempted), so that it can later resume this task. It can
then adjust the stack pointer to refer to the state of the task to be started or resumed. At
that point, a return is executed, but instead of resuming execution with the task that was
preempted, execution will resume for another task.
Implementing a preemptive scheduler can be quite challenging. It requires very careful
control of concurrency. For example, interrupts may need to be disabled for signiﬁcant
parts of the process to avoid ending up with a corrupted stack. This is why scheduling
is one of the most central functions of an operating system kernel or microkernel. The
quality of the implementation strongly affects system reliability and stability.
11.2
Rate Monotonic Scheduling
Consider a scenario with T = {τ1,τ2,··· ,τn} of n tasks, where the tasks must execute
periodically. Speciﬁcally, we assume that each task τi must execute to completion exactly
once in each time interval pi. We refer to pi as the period of the task. Thus, the deadline
for the j-th execution of τi is ri,1 + jpi, where ri,1 is the release time of the ﬁrst execution.
Liu and Layland (1973) showed that a simple preemptive scheduling strategy called rate
monotonic (RM) scheduling is optimal with respect to feasibility among ﬁxed priority
uniprocessor schedulers for the above task model. This scheduling strategy gives higher
priority to a task with a smaller period.
The simplest form of the problem has just two tasks, T = {τ1,τ2} with execution times
e1 and e2 and periods p1 and p2, as depicted in Figure 11.2. In the ﬁgure, the execution
time e2 of task τ2 is longer than the period p1 of task τ1. Thus, if these two tasks are to
execute on the same processor, then it is clear that a non-preemptive scheduler will not
300
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 321 -->
### [PDF Page 321]

11. SCHEDULING
e2
p2
e1
p1
τ1,1
τ1,2
τ2,2
τ2,1
τ1,7
τ1,6
τ1,5
τ1,4
τ1,3
τ1
τ2

![Figure 11.2: Two periodic tasks T = {τ1,τ2} with execution times e1 and e2 and](images/fig_321_figure_11_2.png)
*Description*: Technical diagram and schematic model illustrating cyber-physical system behavior, algorithmic logic, and state progression for Figure 11.2: Two periodic tasks T = {τ1,τ2} with execution times e1 and e2 and.

> **Figure 11.2: Two periodic tasks T = {τ1,τ2} with execution times e1 and e2 and**

periods p1 and p2.
e2
p2
p1
	

+



τ1
τ2

![Figure 11.3: Two periodic tasks T = {τ1,τ2} with a preemptive schedule that gives](images/fig_321_figure_11_3.png)
*Description*: Task scheduling and execution timeline depicting thread activation, priority preemption, deadline limits, and response times for Figure 11.3: Two periodic tasks T = {τ1,τ2} with a preemptive schedule that gives.

> **Figure 11.3: Two periodic tasks T = {τ1,τ2} with a preemptive schedule that gives**

higher priority to τ1.
yield a feasible schedule. If task τ2 must execute to completion without interruption, then
task τ1 will miss some deadlines.
A preemptive schedule that follows the rate monotonic principle is shown in Figure 11.3.
In that ﬁgure, task τ1 is given higher priority, because its period is smaller. So it executes
at the beginning of each period interval, regardless of whether τ2 is executing. If τ2 is
executing, then τ1 preempts it. The ﬁgure assumes that the time it takes to perform the
Lee & Seshia, Introduction to Embedded Systems
301



<!-- Page 322 -->
### [PDF Page 322]

11.2. RATE MONOTONIC SCHEDULING
preemption, called the context switch time, is negligible.1 This schedule is feasible,
whereas if τ2 had been given higher priority, then the schedule would not be feasible.
For the two task case, it is easy to show that among all preemptive ﬁxed priority sched-
ulers, RM is optimal with respect to feasibility, under the assumed task model with neg-
ligible context switch time. This is easy to show because there are only two ﬁxed priority
schedules for this simple case, the RM schedule, which gives higher priority to task τ1,
and the non-RM schedule, which gives higher priority to task τ2. To show optimality, we
simply need to show that if the non-RM schedule is feasible, then so is the RM schedule.
1The assumption that context switch time is negligible is problematic in practice. On processors with
caches, a context switch often causes substantial cache-related delays. In addition, the operating system
overhead for context switching can be substantial.
τ1
τ2
τ1
τ2
τ1
τ2
τ1
τ2


	


o2

![Figure 11.4: Response time o2 of task τ2 is worst when its cycle starts at the same](images/fig_322_figure_11_4.png)
*Description*: Technical diagram and schematic model illustrating cyber-physical system behavior, algorithmic logic, and state progression for Figure 11.4: Response time o2 of task τ2 is worst when its cycle starts at the same.

> **Figure 11.4: Response time o2 of task τ2 is worst when its cycle starts at the same**

time that the cycle of τ1 starts.
302
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 323 -->
### [PDF Page 323]

11. SCHEDULING
e2
p2
e1
p1
τ1
τ2

![Figure 11.5: The non-RM schedule gives higher priority to τ2. It is feasible if and](images/fig_323_figure_11_5.png)
*Description*: Task scheduling and execution timeline depicting thread activation, priority preemption, deadline limits, and response times for Figure 11.5: The non-RM schedule gives higher priority to τ2. It is feasible if and.

> **Figure 11.5: The non-RM schedule gives higher priority to τ2. It is feasible if and**

only if e1 +e2 ≤p1 for this scenario.
Before we can do this, we need to consider the possible alignments of task executions that
can affect feasibility. As shown in Figure 11.4, the response time of the lower priority
task is worst when its starting phase matches that of higher priority tasks. That is, the
worst-case scenario occurs when all tasks start their cycles at the same time. Hence, we
only need to consider this scenario.
Under this worst-case scenario, where release times align, the non-RM schedule is feasi-
ble if and only if
e1 +e2 ≤p1 .
(11.1)
This scenario is illustrated in Figure 11.5. Since task τ1 is preempted by τ2, for τ1 to not
miss its deadline, we require that e2 ≤p1 −e1, so that τ2 leaves enough time for τ1 to
execute before its deadline.
e2
p2
e1
p1
τ1
τ2

![Figure 11.6: The RM schedule gives higher priority to τ1. For the RM schedule to](images/fig_323_figure_11_6.png)
*Description*: Task scheduling and execution timeline depicting thread activation, priority preemption, deadline limits, and response times for Figure 11.6: The RM schedule gives higher priority to τ1. For the RM schedule to.

> **Figure 11.6: The RM schedule gives higher priority to τ1. For the RM schedule to**

be feasible, it is sufﬁcient, but not necessary, for e1 +e2 ≤p1.
Lee & Seshia, Introduction to Embedded Systems
303



<!-- Page 324 -->
### [PDF Page 324]

11.2. RATE MONOTONIC SCHEDULING
To show that RM is optimal with respect to feasibility, all we need to do is show that if the
non-RM schedule is feasible, then the RM schedule is also feasible. Examining Figure
11.6, it is clear that if equation (11.1) is satisﬁed, then the RM schedule is feasible. Since
these are the only two ﬁxed priority schedules, the RM schedule is optimal with respect to
feasibility. The same proof technique can be generalized to an arbitrary number of tasks,
yielding the following theorem (Liu and Layland, 1973):
Theorem 11.1. Given a preemptive, ﬁxed priority scheduler and a ﬁnite set of repeating
tasks T = {τ1,τ2,··· ,τn} with associated periods p1, p2,··· , pn and no precedence con-
straints, if any priority assignment yields a feasible schedule, then the rate monotonic
priority assignment yields a feasible schedule.
RM schedules are easily implemented with a timer interrupt with a time interval equal to
the greatest common divisor of the periods of the tasks. They can also be implemented
with multiple timer interrupts.
It turns out that RM schedulers cannot always achieve 100% utilization. In particular,
RM schedulers are constrained to have ﬁxed priority. This constraint results in situations
where a task set that yields a feasible schedule has less than 100% utilization and yet
cannot tolerate any increase in execution times or decrease in periods. This means that
there are idle processor cycles that cannot be used without causing deadlines to be missed.
An example is studied in Exercise 3.
Fortunately, Liu and Layland (1973) show that this effect is bounded. First note that the
utilization of n independent tasks with execution times ei and periods pi can be written
µ =
n
∑
i=1
ei
pi
.
If µ = 1, then the processor is busy 100% of the time. So clearly, if µ > 1 for any task set,
then that task set has no feasible schedule. Liu and Layland (1973) show that if µ is less
than or equal to a utilization bound given by
µ ≤n(21/n −1),
(11.2)
then the RM schedule is feasible.
To understand this (rather remarkable) result, consider a few cases. First, if n = 1 (there
is only one task), then n(21/n −1) = 1, so the result tells us that if utilization is 100% or
less, then the RM schedule is feasible. This is obvious, of course, because with only one
task, µ = e1/p1, and clearly the deadline can only be met if e1 ≤p1.
304
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 325 -->
### [PDF Page 325]

11. SCHEDULING
If n = 2, then n(21/n −1) ≈0.828. Thus, if a task set with two tasks does not attempt to
use more than 82.8% of the available processor time, then the RM schedule will meet all
deadlines.
As n gets large, the utilization bound approaches ln(2) ≈0.693. That is
lim
n→∞n(21/n −1) = ln(2) ≈0.693.
This means that if a task set with any number of tasks does not attempt to use more than
69.3% of the available processor time, then the RM schedule will meet all deadlines.
In the next section, we relax the ﬁxed-priority constraint and show that dynamic priority
schedulers can do better than ﬁxed priority schedulers, in the sense that they can achieve
higher utilization. The cost is a somewhat more complicated implementation.
11.3
Earliest Deadline First
Given a ﬁnite set of non-repeating tasks with deadlines and no precedence constraints,
a simple scheduling algorithm is earliest due date (EDD), also known as Jackson’s
algorithm (Jackson, 1955). The EDD strategy simply executes the tasks in the same
order as their deadlines, with the one with the earliest deadline going ﬁrst. If two tasks
have the same deadline, then their relative order does not matter.
Theorem 11.2. Given a ﬁnite set of non-repeating tasks T = {τ1,τ2,··· ,τn} with asso-
ciated deadlines d1,d2,··· ,dn and no precedence constraints, an EDD schedule is opti-
mal in the sense that it minimizes the maximum lateness, compared to all other possible
orderings of the tasks.
Proof. This theorem is easy to prove with a simple interchange argument. Consider
an arbitrary schedule that is not EDD. In such a schedule, because it is not EDD, there
must be two tasks τi and τj where τi immediately precedes τj, but dj < di. This is
depicted here:
0
fi
task i
fj
dj
di
task j
Lee & Seshia, Introduction to Embedded Systems
305



<!-- Page 326 -->
### [PDF Page 326]

11.3. EARLIEST DEADLINE FIRST
Since the tasks are independent (there are no precedence constraints), reversing the order
of these two tasks yields another valid schedule, depicted here:
0
f’i
task i
f’j
dj
di
task j
We can show that the new schedule has a maximum lateness no greater than that of
the original schedule. If we repeat the above interchange until there are no more tasks
eligible for such an interchange, then we have constructed the EDD schedule. Since this
schedule has a maximum lateness no greater than that of the original schedule, the EDD
schedule has the minimum maximum lateness of all schedules.
To show that the second schedule has a maximum lateness no greater than that of the
ﬁrst schedule, ﬁrst note that if the maximum lateness is determined by some task other
than τi or τ j, then the two schedules have the same maximum lateness, and we are done.
Otherwise, it must be that the maximum lateness of the ﬁrst schedule is
Lmax = max(fi −di, f j −dj) = f j −dj,
where the latter equality is obvious from the picture and follows from the facts that
fi ≤f j and dj < di.
The maximum lateness of the second schedule is given by
L′
max = max(f ′
i −di, f ′
j −dj) .
Consider two cases:
Case 1: L′
max = f ′
i −di. In this case, since f ′
i = f j, we have
L′
max = f j −di ≤f j −dj ,
where the latter inequality follows because dj < di. Hence, L′
max ≤Lmax.
Case 2: L′
max = f ′
j −dj. In this case, since f ′
j ≤f j, we have
L′
max ≤f j −dj ,
306
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 327 -->
### [PDF Page 327]

11. SCHEDULING
and again L′
max ≤Lmax.
In both cases, the second schedule has a maximum lateness no greater than that of the
ﬁrst schedule. QED.
EDD is also optimal with respect to feasibility, because it minimizes the maximum late-
ness. However, EDD does not support arrival of tasks, and hence also does not sup-
port periodic or repeated execution of tasks. Fortunately, EDD is easily extended to
support these, yielding what is known as earliest deadline ﬁrst (EDF) or Horn’s al-
gorithm (Horn, 1974).
Theorem 11.3. Given a set of n independent tasks T = {τ1,τ2,··· ,τn} with associated
deadlines d1,d2,··· ,dn and arbitrary arrival times, any algorithm that at any instant ex-
ecutes the task with the earliest deadline among all arrived tasks is optimal with respect
to minimizing the maximum lateness.
The proof of this uses a similar interchange argument. Moreover, the result is easily
extended to support an unbounded number of arrivals. We leave it as an exercise.
Note that EDF is a dynamic priority scheduling algorithm. If a task is repeatedly executed,
it may be assigned a different priority on each execution. This can make it more complex
to implement. Typically, for periodic tasks, the deadline used is the end of the period of
the task, though it is certainly possible to use other deadlines for tasks.
Although EDF is more expensive to implement than RM, in practice its performance is
generally superior (Buttazzo, 2005b). First, RM is optimal with respect to feasibility
only among ﬁxed priority schedulers, whereas EDF is optimal w.r.t. feasibility among
dynamic priority schedulers. In addition, EDF also minimizes the maximum lateness.
Also, in practice, EDF results in fewer preemptions (see Exercise 2), which means less
overhead for context switching. This often compensates for the greater complexity in
the implementation. In addition, unlike RM, any EDF schedule with less than 100%
utilization can tolerate increases in execution times and/or reductions in periods and still
be feasible.
Lee & Seshia, Introduction to Embedded Systems
307



<!-- Page 328 -->
### [PDF Page 328]

11.3. EARLIEST DEADLINE FIRST
0
1
d1= 2
d2= 5
d3= 4
d6= 6
d5= 5
d4= 3
6
4
2
3
2
4
5
6
EDF
1
2
4
3
5
6
LDF
1
2
4
3
5
6
EDF*

![Figure 11.7: An example of a precedence graph for six tasks and the schedule](images/fig_328_figure_11_7.png)
*Description*: Task scheduling and execution timeline depicting thread activation, priority preemption, deadline limits, and response times for Figure 11.7: An example of a precedence graph for six tasks and the schedule.

> **Figure 11.7: An example of a precedence graph for six tasks and the schedule**

under three scheduling policies. Execution times for all tasks are one time unit.
11.3.1
EDF with Precedences
Theorem 11.2 shows that EDF is optimal (it minimizes maximum lateness) for a task
set without precedences. What if there are precedences? Given a ﬁnite set of tasks,
precedences between them can be represented by a precedence graph.
Example 11.1: Consider six tasks T = {1,··· ,6}, each with execution time ei = 1,
with precedences as shown in Figure 11.7. The diagram means that task 1 must
execute before either 2 or 3 can execute, that 2 must execute before either 4 or 5,
and that 3 must execute before 6. The deadline for each task is shown in the ﬁgure.
The schedule labeled EDF is the EDF schedule. This schedule is not feasible. Task
4 misses its deadline. However, there is a feasible schedule. The schedule labeled
LDF meets all deadlines.
308
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 329 -->
### [PDF Page 329]

11. SCHEDULING
The previous example shows that EDF is not optimal if there are precedences. In 1973,
Lawler (1973) gave a simple algorithm that is optimal with precedences, in the sense that it
minimizes the maximum lateness. The strategy is very simple. Given a ﬁxed, ﬁnite set of
tasks with deadlines, Lawler’s strategy constructs the schedule backwards, choosing ﬁrst
the last task to execute. The last task to execute is the one on which no other task depends
that has the latest deadline. The algorithm proceeds to construct the schedule backwards,
each time choosing from among the tasks whose dependents have already been scheduled
the one with the latest deadline. For the previous example, the resulting schedule, labeled
LDF in Figure 11.7, is feasible. Lawler’s algorithm is called latest deadline ﬁrst (LDF).
LDF is optimal in the sense that it minimizes the maximum lateness, and hence it is
also optimal with respect to feasibility. However, it does not support arrival of tasks.
Fortunately, there is a simple modiﬁcation of EDF, proposed by Chetto et al. (1990).
EDF* (EDF with precedences), supports arrivals and minimizes the maximal lateness. In
this modiﬁcation, we adjust the deadlines of all the tasks. Suppose the set of all tasks is
T. For a task execution i ∈T, let D(i) ⊂T be the set of task executions that immediately
depend on i in the precedence graph. For all executions i ∈T, we deﬁne a modiﬁed
deadline
d′
i = min(di, min
j∈D(i)(d′
j −ej)) .
EDF* is then just like EDF except that it uses these modiﬁed deadlines.
Example 11.2: In Figure 11.7, we see that the EDF* schedule is the same as the
LDF schedule. The modiﬁed deadlines are as follows:
d′
1 = 1,
d′
2 = 2,
d′
3 = 4,
d′
4 = 3,
d′
5 = 5,
d′
6 = 6 .
The key is that the deadline of task 2 has changed from 5 to 2, reﬂecting the fact
that its successors have early deadlines. This causes EDF* to schedule task 2 before
task 3, which results in a feasible schedule.
EDF* can be thought of as a technique for rationalizing deadlines. Instead of accepting
arbitrary deadlines as given, this algorithm ensures that the deadlines take into account
deadlines of successor tasks. In the example, it makes little sense for task 2 to have a later
deadline, 5, than its successors. So EDF* corrects this anomaly before applying EDF.
Lee & Seshia, Introduction to Embedded Systems
309



<!-- Page 330 -->
### [PDF Page 330]

11.4. SCHEDULING AND MUTUAL EXCLUSION
11.4
Scheduling and Mutual Exclusion
Although the algorithms given so far are conceptually simple, the effects they have in
practice are far from simple and often surprise system designers. This is particularly true
when tasks share resources and use mutual exclusion to guard access to those resources.
11.4.1
Priority Inversion
In principle, a priority-based preemptive scheduler is executing at all times the high-
priority enabled task. However, when using mutual exclusion, it is possible for a task to
become blocked during execution. If the scheduling algorithm does not account for this
possibility, serious problems can occur.

![Figure 11.8: The Mars Pathﬁnder and a view of the surface of Mars from the](images/fig_330_figure_11_8.png)
*Description*: Technical diagram and schematic model illustrating cyber-physical system behavior, algorithmic logic, and state progression for Figure 11.8: The Mars Pathﬁnder and a view of the surface of Mars from the.

> **Figure 11.8: The Mars Pathﬁnder and a view of the surface of Mars from the**

camera of the lander (image from the Wikipedia Commons).
310
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 331 -->
### [PDF Page 331]

11. SCHEDULING
Example 11.3:
The Mars Pathﬁnder, shown in Figure 11.8, landed on Mars on
July 4th, 1997. A few days into the mission, the Pathﬁnder began sporadically
missing deadlines, causing total system resets, each with loss of data. Engineers on
the ground diagnosed the problem as priority inversion, where a low priority mete-
orological task was holding a lock and blocking a high-priority task, while medium
priority tasks executed. (Source: What Really Happened on Mars? Mike Jones,
RISKS-19.49 on the comp.programming.threads newsgroup, Dec. 07, 1997, and
What Really Happened on Mars? Glenn Reeves, Mars Pathﬁnder Flight Software
Cognizant Engineer, email message, Dec. 15, 1997.)
Priority inversion is a scheduling anomaly where a high-priority task is blocked while
unrelated lower-priority tasks are executing. The phenomenon is illustrated in Figure 11.9.
In the ﬁgure, task 3, a low priority task, acquires a lock at time 1. At time 2, it is preempted
by task 1, a high-priority task, which then at time 3 blocks trying to acquire the same lock.
Before task 3 reaches the point where it releases the lock, however, it gets preempted by
an unrelated task 2, which has medium priority. Task 2 can run for an unbounded amount
0
2
4
6
8
10
task 1
task 2
task 3
acquire lock
preempt
block
preempt
release
done
task 1 blocked

![Figure 11.9: Illustration of priority inversion. Task 1 has highest priority, task 3](images/fig_331_figure_11_9.png)
*Description*: Technical diagram and schematic model illustrating cyber-physical system behavior, algorithmic logic, and state progression for Figure 11.9: Illustration of priority inversion. Task 1 has highest priority, task 3.

> **Figure 11.9: Illustration of priority inversion. Task 1 has highest priority, task 3**

lowest. Task 3 acquires a lock on a shared object, entering a critical section. It
gets preempted by task 1, which then tries to acquire the lock and blocks. Task
2 preempts task 3 at time 4, keeping the higher priority task 1 blocked for an
unbounded amount of time. In effect, the priorities of tasks 1 and 2 get inverted,
since task 2 can keep task 1 waiting arbitrarily long.
Lee & Seshia, Introduction to Embedded Systems
311



<!-- Page 332 -->
### [PDF Page 332]

11.4. SCHEDULING AND MUTUAL EXCLUSION
of time, and effectively prevents the higher-priority task 1 from executing. This is almost
certainly not desirable.
11.4.2
Priority Inheritance Protocol
In 1990, Sha et al. (1990) gave a solution to the priority inversion problem called priority
inheritance. In their solution, when a task blocks attempting to acquire a lock, then the
task that holds the lock inherits the priority of the blocked task. Thus, the task that holds
the lock cannot be preempted by a task with lower priority than the one attempting to
acquire the lock.
Example 11.4:

![Figure 11.10: illustrates priority inheritance. In the ﬁgure, when](images/fig_332_figure_11_10.png)
*Description*: Technical diagram and schematic model illustrating cyber-physical system behavior, algorithmic logic, and state progression for Figure 11.10: illustrates priority inheritance. In the ﬁgure, when.

> **Figure 11.10: illustrates priority inheritance. In the ﬁgure, when**

task 1 blocks trying to acquire the lock held by task 3, task 3 resumes executing,
but now with the higher priority of task 1. Thus, when task 2 becomes enabled at
time 4, it does not preempt task 3. Instead, task 3 runs until it releases the lock at
time 5. At that time, task 3 reverts to its original (low) priority, and task 1 resumes
executing. Only when task 1 completes is task 2 able to execute.
0
2
4
6
8
10
task 1
task 2
task 3
acquire lock
preempt
block
release
done
task 1 blocked
at priority of 1
done
task 2 preempted

![Figure 11.10: Illustration of the priority inheritance protocol. Task 1 has highest](images/fig_332_figure_11_10.png)
*Description*: Technical diagram and schematic model illustrating cyber-physical system behavior, algorithmic logic, and state progression for Figure 11.10: Illustration of the priority inheritance protocol. Task 1 has highest.

> **Figure 11.10: Illustration of the priority inheritance protocol. Task 1 has highest**

priority, task 3 lowest. Task 3 acquires a lock on a shared object, entering a
critical section. It gets preempted by task 1, which then tries to acquire the lock
and blocks. Task 3 inherits the priority of task 1, preventing preemption by task 2.
312
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 333 -->
### [PDF Page 333]

11. SCHEDULING
0
2
4
6
task 1
task 2
acquire lock a
preempt
block on a
acquire lock b
a
b
block on b
a

![Figure 11.11: Illustration of deadlock. The lower priority task starts ﬁrst and ac-](images/fig_333_figure_11_11.png)
*Description*: Technical diagram and schematic model illustrating cyber-physical system behavior, algorithmic logic, and state progression for Figure 11.11: Illustration of deadlock. The lower priority task starts ﬁrst and ac-.

> **Figure 11.11: Illustration of deadlock. The lower priority task starts ﬁrst and ac-**

quires lock a, then gets preempted by the higher priority task, which acquires lock
b and then blocks trying to acquire lock a. The lower priority task then blocks
trying to acquire lock b, and no further progress is possible.
11.4.3
Priority Ceiling Protocol
Priorities can interact with mutual exclusion locks in even more interesting ways. In
particular, in 1990, Sha et al. (1990) showed that priorities can be used to prevent certain
kinds of deadlocks.
Example 11.5:

![Figure 11.11: illustrates a scenario in which two tasks deadlock.](images/fig_333_figure_11_11.png)
*Description*: Technical diagram and schematic model illustrating cyber-physical system behavior, algorithmic logic, and state progression for Figure 11.11: illustrates a scenario in which two tasks deadlock..

> **Figure 11.11: illustrates a scenario in which two tasks deadlock.**

In the ﬁgure, task 1 has higher priority. At time 1, task 2 acquires lock a. At time
2, task 1 preempts task 2, and at time 3, acquires lock b. While holding lock b, it
attempts to acquire lock a. Since a is held by task 2, it blocks. At time 4, task 2
resumes executing. At time 5, it attempts to acquire lock b, which is held by task 1.
Deadlock!
The deadlock in the previous example can be prevented by a clever technique called the
priority ceiling protocol (Sha et al., 1990). In this protocol, every lock or semaphore is
assigned a priority ceiling equal to the priority of the highest-priority task that can lock it.
A task τ can acquire a lock a only if the task’s priority is strictly higher than the priority
ceilings of all locks currently held by other tasks. Intuitively, if we prevent task τ from
Lee & Seshia, Introduction to Embedded Systems
313



<!-- Page 334 -->
### [PDF Page 334]

11.4. SCHEDULING AND MUTUAL EXCLUSION
0
2
4
6
task 1
task 2
lock a
preempt
prevented from locking  b
by priority ceiling protocol
a
b
a
b
unlock b, then a
a

![Figure 11.12: Illustration of the priority ceiling protocol. In this version, locks a and](images/fig_334_figure_11_12.png)
*Description*: Technical diagram and schematic model illustrating cyber-physical system behavior, algorithmic logic, and state progression for Figure 11.12: Illustration of the priority ceiling protocol. In this version, locks a and.

> **Figure 11.12: Illustration of the priority ceiling protocol. In this version, locks a and**

b have priority ceilings equal to the priority of task 1. At time 3, task 1 attempts
to lock b, but it cannot because task 2 currently holds lock a, which has priority
ceiling equal to the priority of task 1.
acquiring lock a, then we ensure that task τ will not hold lock a while later trying to
acquire other locks held by other tasks. This prevents certain deadlocks from occurring.
Example 11.6:
The priority ceiling protocol prevents the deadlock of Example
11.5, as shown in Figure 11.12. In the ﬁgure, when task 1 attempts to acquire lock
b at time 3, it is prevented from doing so. At that time, lock a is currently held by
another task (task 2). The priority ceiling assigned to lock a is equal to the priority
of task 1, since task 1 is the highest priority task that can acquire lock a. Since
the priority of task 1 is not strictly higher than this priority ceiling, task 1 is not
permitted to acquire lock b. Instead, task 1 becomes blocked, allowing task 2 to
run to completion. At time 4, task 2 acquires lock b unimpeded, and at time 5,
it releases both locks. Once it has released both locks, task 1, which has higher
priority, is no longer blocked, so it resumes executing, preempting task 2.
Of course, implementing the priority ceiling protocol requires being able to determine in
advance which tasks acquire which locks. A simple conservative strategy is to examine
the source code for each task and inventory the locks that are acquired in the code. This is
conservative because a particular program may or may not execute any particular line of
314
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 335 -->
### [PDF Page 335]

11. SCHEDULING
code, so just because a lock is mentioned in the code does not necessarily mean that the
task will attempt to acquire the lock.
11.5
Multiprocessor Scheduling
Scheduling tasks on a single processor is hard enough. Scheduling them on multiple pro-
cessors is even harder. Consider the problem of scheduling a ﬁxed ﬁnite set of tasks with
precedences on a ﬁnite number of processors with the goal of minimizing the makespan.
This problem is known to be NP-hard. Nonetheless, effective and efﬁcient scheduling
strategies exist. One of the simplest is known as the Hu level scheduling algorithm. It
assigns a priority to each task τ based on the level, which is the greatest sum of exe-
cution times of tasks on a path in the precedence graph from τ to another task with no
dependents. Tasks with larger levels have higher priority than tasks with smaller levels.
Example 11.7: For the precedence graph in Figure 11.7, task 1 has level 3, tasks
2 and 3 have level 2, and tasks 4, 5, and 6 have level 1. Hence, a Hu level scheduler
will give task 1 highest priority, tasks 2 and 3 medium priority, and tasks 4, 5, and
6 lowest priority.
Hu level scheduling is one of a family of critical path methods because it emphasizes the
path through the precedence graph with the greatest total execution time. Although it is
not optimal, it is known to closely approximate the optimal solution for most graphs (Kohler,
1975; Adam et al., 1974).
Once priorities are assigned to tasks, a list scheduler sorts the tasks by priorities and
assigns them to processors in the order of the sorted list as processors become available.
Example 11.8: A two-processor schedule constructed with the Hu level schedul-
ing algorithm for the precedence graph shown in Figure 11.7 is given in Fig-
ure 11.13. The makespan is 4.
Lee & Seshia, Introduction to Embedded Systems
315



<!-- Page 336 -->
### [PDF Page 336]

11.5. MULTIPROCESSOR SCHEDULING
11.5.1
Scheduling Anomalies
Among the worst pitfalls in embedded systems design are scheduling anomalies, where
unexpected or counterintuitive behaviors emerge due to small changes in the operating
conditions of a system. We have already illustrated two such anomalies, priority inversion
and deadlock. There are many others. The possible extent of the problems that can
arise are well illustrated by the so-called Richard’s anomalies (Graham, 1969). These
show that multiprocessor schedules are non-montonic, meaning that improvements in
performance at a local level can result in degradations in performance at a global level,
and brittle, meaning that small changes can have big consequences.
Richard’s anomalies are summarized in the following theorem.
Theorem 11.4. If a task set with ﬁxed priorities, execution times, and precedence con-
straints is scheduled on a ﬁxed number of processors in accordance with the priorities,
then increasing the number of processors, reducing execution times, or weakening prece-
dence constraints can increase the schedule length.
Proof.
The theorem can be proved with the example in Figure 11.14. The example
has nine tasks with execution times as shown in the ﬁgure. We assume the tasks are
assigned priorities so that the lower numbered tasks have higher priority than the higher
numbered tasks. Note that this does not correspond to a critical path priority assignment,
but it sufﬁces to prove the theorem. The ﬁgure shows a three-processor schedule in
accordance with the priorities. Notice that the makespan is 12.
First, consider what happens if the execution times are all reduced by one time unit. A
schedule conforming to the priorities and precedences is shown below:
0
1
4
2
3
5
6
Processor A:
2
4
Processor B:

![Figure 11.13: A two-processor parallel schedule for the tasks with precedence](images/fig_336_figure_11_13.png)
*Description*: Task scheduling and execution timeline depicting thread activation, priority preemption, deadline limits, and response times for Figure 11.13: A two-processor parallel schedule for the tasks with precedence.

> **Figure 11.13: A two-processor parallel schedule for the tasks with precedence**

graph shown in Figure 11.7.
316
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 337 -->
### [PDF Page 337]

11. SCHEDULING
0
4
8
12
16
proc1
proc2
proc3
2
6
10
14
3
2
1
4
9
5
7
8
6
time
e1 = 3
e2 = 2
e3 = 2
e4 = 2
e9 = 9
e8 = 4
e7 = 4
e6 = 4
e5 = 4

![Figure 11.14: A precedence graph with nine tasks, where the lower numbered](images/fig_337_figure_11_14.png)
*Description*: Technical diagram and schematic model illustrating cyber-physical system behavior, algorithmic logic, and state progression for Figure 11.14: A precedence graph with nine tasks, where the lower numbered.

> **Figure 11.14: A precedence graph with nine tasks, where the lower numbered**

tasks have higher priority than the higher numbered tasks.
0
4
8
12
16
proc1
proc2
proc3
2
6
10
14
3
2
1
4
9
5
7
8
6
time
Notice that the makespan has increased to 13, even though the total amount of computa-
tion has decreased signiﬁcantly. Since computation times are rarely known exactly, this
form of brittleness is particularly troubling.
Consider next what happens if we add a fourth processor and keep everything else the
same as in the original problem. A resulting schedule is shown below:
Lee & Seshia, Introduction to Embedded Systems
317



<!-- Page 338 -->
### [PDF Page 338]

11.5. MULTIPROCESSOR SCHEDULING
0
4
8
12
16
proc1
proc2
proc3
2
6
10
14
3
2
1
4
9
5
7
8
6
time
proc4
Again, the makespan has increased (to 15 this time) even though we have added 33%
more processing power than originally available.
Consider ﬁnally what happens if we weaken the precedence constraints by removing the
precedences between task 4 and tasks 7 and 8. A resulting schedule is shown below:
0
4
8
12
16
proc1
proc2
proc3
2
6
10
14
3
2
1
4
9
5
7
8
6
time
The makespan has now increased to 16, even though weakening precedence constraints
increases scheduling ﬂexibility. A simple priority-based scheduling scheme such as this
does not take advantage of the weakened constraints.
This theorem is particularly troubling when we realize that execution times for software
are rarely known exactly (see Chapter 15). Scheduling policies will be based on approxi-
mations, and behavior at run time may be quite unexpected.
Another form of anomaly arises when there are mutual exclusion locks. An illustration is
given in Figure 11.15. In this example, ﬁve tasks are assigned to two processors using a
static assignment scheduler. Tasks 2 and 4 contend for a mutex. If the execution time of
task 1 is reduced, then the order of execution of tasks 2 and 4 reverses, which results in
an increased execution time. This kind of anomaly is quite common in practice.
318
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 339 -->
### [PDF Page 339]

11. SCHEDULING
0
4
8
12
proc1
proc2
2
6
10
3
1
4
5
time
2
proc1
proc2
3
1
4
5
2
0
4
8
12
2
6
10
time

![Figure 11.15: Anomaly due to mutual exclusion locks, where a reduction in the](images/fig_339_figure_11_15.png)
*Description*: Technical diagram and schematic model illustrating cyber-physical system behavior, algorithmic logic, and state progression for Figure 11.15: Anomaly due to mutual exclusion locks, where a reduction in the.

> **Figure 11.15: Anomaly due to mutual exclusion locks, where a reduction in the**

execution time of task 1 results in an increased makespan.
11.6

### Summary

Embedded software is particularly sensitive to timing effects because it inevitably inter-
acts with external physical systems. A designer, therefore, needs to pay considerable
attention to the scheduling of tasks. This chapter has given an overview of some of the
basic techniques for scheduling real-time tasks and parallel scheduling. It has explained
some of the pitfalls, such as priority inversion and scheduling anomalies. A designer that
is aware of the pitfalls is better equipped to guard against them.
Lee & Seshia, Introduction to Embedded Systems
319



<!-- Page 340 -->
### [PDF Page 340]

11.6. SUMMARY
Further Reading
Scheduling is a well-studied topic, with many basic results dating back to the 1950s. This
chapter covers only the most basic techniques and omits several important topics. For real-
time scheduling textbooks, we particularly recommend Buttazzo (2005a), Stankovic and
Ramamritham (1988), and Liu (2000), the latter of which has particularly good coverage
of scheduling of sporadic tasks. An excellent overview article is Sha et al. (2004). A
hands-on practical guide can be found in Klein et al. (1993). For an excellent overview
of the evolution of ﬁxed-priority scheduling techniques through 2003, see Audsley et al.
(2005). For soft real-time scheduling, we recommend studying time utility functions,
introduced by Douglas Jensen in 1977 as a way to overcome the limited expressiveness in
classic deadline constraints in real-time systems (see, for example, Jensen et al. (1985);
Ravindran et al. (2007)).
There are many more scheduling strategies than those described here. For example,
deadline monotonic (DM) scheduling modiﬁes rate monotonic to allow periodic tasks
to have deadlines less than their periods (Leung and Whitehead, 1982). The Spring al-
gorithm is a set of heuristics that support arrivals, precedence relations, resource con-
straints, non-preemptive properties, and importance levels (Stankovic and Ramamritham,
1987, 1988).
An important topic that we do not cover is feasibility analysis, which provides tech-
niques for analyzing programs to determine whether feasible schedules exist. Much of
the foundation for work in this area can be found in Harter (1987) and Joseph and Pandya
(1986).
Multiprocessor scheduling is also a well-studied topic, with many core results origi-
nating in the ﬁeld of operations research. Classic texts on the subject are Conway et al.
(1967) and Coffman (1976). Sriram and Bhattacharyya (2009) focus on embedded mul-
tiprocessors and include innovative techniques for reducing synchronization overhead in
multiprocessor schedules.
It is also worth noting that a number of projects have introduced programming language
constructs that express real-time behaviors of software. Most notable among these is Ada,
a language developed under contract from the US Department of Defense (DoD) from
1977 to 1983. The goal was to replace the hundreds of programming languages then used
in DoD projects with a single, uniﬁed language. An excellent discussion of language
constructs for real time can be found in Lee and Gehlot (1985) and Wolfe et al. (1993).
320
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 341 -->
### [PDF Page 341]

11. SCHEDULING

### Exercises

1. This problem studies ﬁxed-priority scheduling. Consider two tasks to be executed
periodically on a single processor, where task 1 has period p1 = 4 and task 2 has
period p2 = 6.
(a) Let the execution time of task 1 be e1 = 1. Find the maximum value for the
execution time e2 of task 2 such that the RM schedule is feasible.
(b) Again let the execution time of task 1 be e1 = 1. Let non-RMS be a ﬁxed-
priority schedule that is not an RM schedule. Find the maximum value for the
execution time e2 of task 2 such that non-RMS is feasible.
(c) For both your solutions to (a) and (b) above, ﬁnd the processor utilization.
Which is better?
(d) For RM scheduling, are there any values for e1 and e2 that yield 100% utiliza-
tion? If so, give an example.
2. This problem studies dynamic-priority scheduling. Consider two tasks to be exe-
cuted periodically on a single processor, where task 1 has period p1 = 4 and task
2 has period p2 = 6. Let the deadlines for each invocation of the tasks be the end
of their period. That is, the ﬁrst invocation of task 1 has deadline 4, the second
invocation of task 1 has deadline 8, and so on.
(a) Let the execution time of task 1 be e1 = 1. Find the maximum value for the
execution time e2 of task 2 such that EDF is feasible.
(b) For the value of e2 that you found in part (a), compare the EDF schedule
against the RM schedule from Exercise 1 (a). Which schedule has less pre-
emption? Which schedule has better utilization?
3. This problem compares RM and EDF schedules. Consider two tasks with periods
p1 = 2 and p2 = 3 and execution times e1 = e2 = 1. Assume that the deadline for
each execution is the end of the period.
(a) Give the RM schedule for this task set and ﬁnd the processor utilization.
How does this utilization compare to the Liu and Leland utilization bound
of (11.2)?
(b) Show that any increase in e1 or e2 makes the RM schedule infeasible. If you
hold e1 = e2 = 1 and p2 = 3 constant, is it possible to reduce p1 below 2 and
Lee & Seshia, Introduction to Embedded Systems
321



<!-- Page 342 -->
### [PDF Page 342]


### EXERCISES

still get a feasible schedule? By how much? If you hold e1 = e2 = 1 and
p1 = 2 constant, is it possible to reduce p2 below 3 and still get a feasible
schedule? By how much?
(c) Increase the execution time of task 2 to be e2 = 1.5, and give an EDF schedule.
Is it feasible? What is the processor utilization?
4. This problem compares ﬁxed vs. dynamic priorities, and is based on an example by
Burns and Baruah (2008). Consider two periodic tasks, where task τ1 has period
p1 = 2, and task τ2 has period p2 = 3. Assume that the execution times are e1 = 1
and e2 = 1.5. Suppose that the release time of execution i of task τ1 is given by
r1,i = 0.5+2(i−1)
for i = 1,2,···. Suppose that the deadline of execution i of task τ1 is given by
d1,i = 2i.
Correspondingly, assume that the release times and deadlines for task τ2 are
r2,i = 3(i−1)
and
d2,i = 3i.
(a) Give a feasible ﬁxed-priority schedule.
(b) Show that if the release times of all executions of task τ1 are reduced by 0.5,
then no ﬁxed-priority schedule is feasible.
(c) Give a feasible dynamic-priority schedule with the release times of task τ1
reduced to
r1,i = 2(i−1).
5. This problem studies scheduling anomalies. Consider the task precedence graph
depicted in Figure 11.16 with eight tasks. In the ﬁgure, ei denotes the execution
time of task i. Assume task i has higher priority than task j if i < j. There is no
preemption. The tasks must be scheduled respecting all precedence constraints and
priorities. We assume that all tasks arrive at time t = 0.
(a) Consider scheduling these tasks on two processors. Draw the schedule for
these tasks and report the makespan.
322
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 343 -->
### [PDF Page 343]

11. SCHEDULING
e1= 3
e2= 2
e3= 2
e8= 5
e7 = 10
e4 = 5
e5 = 5
e6 = 5

![Figure 11.16: Precedence Graph for Exercise 5.](images/fig_343_figure_11_16.png)
*Description*: Technical diagram and schematic model illustrating cyber-physical system behavior, algorithmic logic, and state progression for Figure 11.16: Precedence Graph for Exercise 5..

> **Figure 11.16: Precedence Graph for Exercise 5.**

(b) Now consider scheduling these tasks on three processors. Draw the schedule
for these tasks and report the makespan. Is the makespan bigger or smaller
than that in part (a) above?
(c) Now consider the case when the execution time of each task is reduced by
1 time unit. Consider scheduling these tasks on two processors. Draw the
schedule for these tasks and report the makespan. Is the makespan bigger or
smaller than that in part (a) above?
6. This problem studies the interaction between real-time scheduling and mutual ex-
clusion, and was formulated by Kevin Weekly.
Consider the following excerpt of code:
1
pthread_mutex_t X; // Resource X: Radio communication
2
pthread_mutex_t Y; // Resource Y: LCD Screen
3
pthread_mutex_t Z; // Resource Z: External Memory (slow)
4
5

```c
void ISR_A() { // Safety sensor Interrupt Service Routine
```

6
pthread_mutex_lock(&Y);
7
pthread_mutex_lock(&X);
8
display_alert(); // Uses resource Y
9
send_radio_alert(); // Uses resource X
10
pthread_mutex_unlock(&X);
11
pthread_mutex_unlock(&Y);
12
}
13
14

```c
void taskB() { // Status recorder task
```

15

```c
while (1) {
```

16
static time_t starttime = time();
Lee & Seshia, Introduction to Embedded Systems
323



<!-- Page 344 -->
### [PDF Page 344]


### EXERCISES

17
pthread_mutex_lock(&X);
18
pthread_mutex_lock(&Z);
19
stats_t stat = get_stats();
20
radio_report( stat ); // uses resource X
21
record_report( stat ); // uses resource Z
22
pthread_mutex_unlock(&Z);
23
pthread_mutex_unlock(&X);
24
sleep(100-(time()-starttime)); // schedule next excecution
25
}
26
}
27
28

```c
void taskC() { // UI Updater task
```

29

```c
while(1) {
```

30
pthread_mutex_lock(&Z);
31
pthread_mutex_lock(&Y);
32
read_log_and_display(); // uses resources Y and Z
33
pthread_mutex_unlock(&Y);
34
pthread_mutex_unlock(&Z);
35
}
36
}
You may assume that the comments fully disclose the resource usage of the proce-
dures. That is, if a comment says ”uses resource X”, then the relevant procedure
uses only resource X. The scheduler running aboard the system is a priority-based
preemptive scheduler, where taskB is higher priority than taskC. In this problem,
ISR A can be thought of as an asynchronous task with the highest priority.
The intended behavior is for the system to send out a radio report every 100ms and
for the UI to update constantly. Additionally, if there is a safety interrupt, a radio
report is sent immediately and the UI alerts the user.
(a) Every so often, when there is a safety interrupt, the system completely stops
working. In a scheduling diagram (like Figure 11.11 in the text), using the
tasks {A,B,C}, and resources {X,Y,Z}, explain the cause of this behavior.
Execution times do not have to be to scale in your diagram. Label your dia-
gram clearly. You will be graded in part on the clarity of your answer, not just
on its correctness.
(b) Using the priority ceiling protocol, show the scheduling diagram for the same
sequence of events that you gave in part (a). Be sure to show all resource locks
and unlocks until all tasks are ﬁnished or reached the end of an iteration. Does
execution stop as before?
324
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 345 -->
### [PDF Page 345]

11. SCHEDULING
(c) Without changing the scheduler, how could the code in taskB be reordered
to ﬁx the issue? Using an exhaustive search of all task/resource locking sce-
narios, prove that this system will not encounter deadlock. (Hint: Your proof
should enumerate 6 cases because the 3 tasks each have 2 possible resources
they could block on.)
Lee & Seshia, Introduction to Embedded Systems
325



<!-- Page 346 -->
### [PDF Page 346]


### EXERCISES

326
Lee & Seshia, Introduction to Embedded Systems


