# Appendix A: Sets and Functions

> **Textbook**: Introduction to Embedded Systems - A Cyber-Physical Systems Approach (UC Berkeley)  
> **Authors**: Edward Ashford Lee and Sanjit Arunkumar Seshia  
> **PDF Page Range**: 447 - 456


---


<!-- Page 447 -->
### [PDF Page 447]

A
Sets and Functions
Contents
A.1
Sets . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 427
A.2
Relations and Functions . . . . . . . . . . . . . . . . . . . . . . . . 428
A.2.1
Restriction and Projection
. . . . . . . . . . . . . . . . . . . 431
A.3
Sequences . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 432

### Sidebar: Exponential Notation for Sets of Functions . . . . . . . . . . 433


### Exercises . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 435

This appendix reviews some basic notation for sets and functions.
A.1
Sets
In this section, we review the notation for sets. A set is a collection of objects. When
object a is in set A, we write a ∈A. We deﬁne the following sets:
• B = {0,1}, the set of binary digits.
• N = {0,1,2,···}, the set of natural numbers.
• Z = {··· ,−1,0,1,2,···}, the set of integers.
• R, the set of real numbers.
• R+, the set of non-negative real numbers.
427



<!-- Page 448 -->
### [PDF Page 448]

A.2. RELATIONS AND FUNCTIONS
When set A is entirely contained by set B, we say that A is a subset of B and write A ⊆B.
For example, B ⊆N ⊆Z ⊆R. The sets may be equal, so the statement N ⊆N is true, for
example. The powerset of a set A is deﬁned to be the set of all subsets. It is written 2A.
The empty set, written /0, is always a member of the powerset, /0 ∈2A.
We deﬁne set subtraction as follows,
A\B = {a ∈A : a /∈B}
for all sets A and B. This notation is read “the set of elements a from A such that a is not
in B.”
A cartesian product of sets A and B is a set written A×B and deﬁned as follows,
A×B = {(a,b) : a ∈A,b ∈B}.
A member of this set (a,b) is called a tuple. This notation is read “the set of tuples (a,b)
such that a is in A and b is in B.” A cartesian product can be formed with three or more
sets, in which case the tuples have three or more elements. For example, we might write
(a,b,c) ∈A × B ×C. A cartesian product of a set A with itself is written A2 = A × A. A
cartesian product of a set A with itself n times, where n ∈N is written An. A member of
the set An is called an n-tuple. By convention, A0 is a singleton set, or a set with exactly
one element, regardless of the size of A. Speciﬁcally, we deﬁne A0 = {/0}. Note that A0 is
not itself the empty set. It is a singleton set containing the empty set (for insight into the
rationale for this deﬁnition, see the box on page 433).
A.2
Relations and Functions
A relation from set A to set B is a subset of A × B. A partial function f from set A
to set B is a relation where (a,b) ∈f and (a,b′) ∈f imply that b = b′. Such a partial
function is written f : A ⇀B. A total function or simply function f from A to B is a
partial function where for all a ∈A, there is a b ∈B such that (a,b) ∈f. Such a function
is written f : A →B, and the set A is called its domain and the set B its codomain. Rather
than writing (a,b) ∈f, we can equivalently write f(a) = b.
Example A.1: An example of a partial function is f : R ⇀R deﬁned by f(x) = √x
for all x ∈R+. It is undeﬁned for any x < 0 in its domain R.
428
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 449 -->
### [PDF Page 449]

A. SETS AND FUNCTIONS
A partial function f : A ⇀B may be deﬁned by an assignment rule, as done in the above
example, where an assignment rule simply explains how to obtain the value of f(a) given
a ∈A. Alternatively, the function may be deﬁned by its graph, which is a subset of A×B.
Example A.2: The same partial function from the previous example has the graph
f ⊆R2 given by
f = {(x,y) ∈R2 : x ≥0 and y = √x} .
Note that we use the same notation f for the function and its graph when it is clear

```python
from context which we are talking about.
```

The set of all functions f : A →B is written (A →B) or BA. The former notation is used
when the exponential notation proves awkward. For a justiﬁcation of the notation BA, see
the box on page 433.
The function composition of f : A →B and g: B →C is written (g ◦f): A →C and
deﬁned by
(g◦f)(a) = g(f(a))
for any a ∈A. Note that in the notation (g ◦f), the function f is applied ﬁrst. For a
function f : A →A, the composition with itself can be written (f ◦f) = f 2, or more
generally
(f ◦f ◦···◦f)
|
{z
}
= f n
n times
for any n ∈N. In case n = 1, f 1 = f. For the special case n = 0, the function f 0 is
by convention the identity function, so f 0(a) = a for all a ∈A. When the domain and
codomain of a function are the same, i.e., f ∈AA, then f n ∈AA for all n ∈N.
For every function f : A →B, there is an associated image function ˆf : 2A →2B deﬁned
on the powerset of A as follows,
∀A′ ⊆A,
ˆf(A′) = {b ∈B : ∃a ∈A′, f(a) = b}.
The image function ˆf is applied to sets A′ of elements in the domain, rather than to single
elements. Rather than returning a single value, it returns the set of all values that f would
Lee & Seshia, Introduction to Embedded Systems
429



<!-- Page 450 -->
### [PDF Page 450]

A.2. RELATIONS AND FUNCTIONS
return, given an element of A′ as an argument. We call ˆf the lifted version of f. When
there is no ambiguity, we may write the lifted version of f simply as f rather than ˆf (see
problem 2(c) for an example of a situation where there is ambiguity).
For any A′ ⊆A, ˆf(A′) is called the image of A′ for the function f. The image ˆf(A) of the
domain is called the range of the function f.
Example A.3: The image ˆf(R) of the function f : R →R deﬁned by f(x) = x2 is
R+.
A function f : A →B is onto (or surjective) if ˆf(A) = B. A function f : A →B is one-to-
one (or injective) if for all a,a′ ∈A,
a ̸= a′ ⇒f(a) ̸= f(a′).
(A.1)
That is, no two distinct values in the domain yield the same values in the codomain. A
function that is both one-to-one and onto is bijective.
Example A.4:
The function f : R →R deﬁned by f(x) = 2x is bijective. The
function f : Z →Z deﬁned by f(x) = 2x is one-to-one, but not onto. The function
f : R2 →R deﬁned by f(x,y) = xy is onto but not one-to-one.
The previous example underscores the fact that an essential part of the deﬁnition of a
function is its domain and codomain.
Proposition A.1. If f : A →B is onto, then there is a one-to-one function h: B →A.
Proof.
Let h be deﬁned by h(b) = a where a is any element in A such that f(a) = b.
There must always be at least one such element because f is onto. We can now show
that h is one-to-one. To do this, consider any two elements b,b′ ∈B where b ̸= b′. We
need to show that h(b) ̸= h(b′). Assume to the contrary that h(b) = h(b′) = a for some
a ∈A. But then by the deﬁnition of h, f(a) = b and f(a) = b′, which implies b = b′, a
contradiction.
430
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 451 -->
### [PDF Page 451]

A. SETS AND FUNCTIONS
The converse of this proposition is also easy to prove.
Proposition A.2. If h: B →A is one-to-one, then there is an onto function f : A →B.
Any bijection f : A →B has an inverse f −1 : B →A deﬁned as follows,
f −1(b) = a ∈A such that f(a) = b ,
(A.2)
for all b ∈B. This function is deﬁned for all b ∈B because f is onto. And for each b ∈B
there is a single unique a ∈A satisfying (A.2) because f is one-to-one. For any bijection
f, its inverse is also bijective.
A.2.1
Restriction and Projection
Given a function f : A →B and a subset C ⊆A, we can deﬁne a new function f|C that is
the restriction of f to C. It is deﬁned so that for all x ∈C, f|C(x) = f(x).
Example A.5:
The function f : R →R deﬁned by f(x) = x2 is not one-to-one.
But the function f|R+ is.
Consider an n-tuple a = (a0,a1,··· ,an−1) ∈A0 × A1 × ··· × An−1. A projection of this
n-tuple extracts elements of the tuple to create a new tuple. Speciﬁcally, let
I = (i0,i1,··· ,im) ∈{0,1,··· ,n−1}m
for some m ∈N\{0}. That is, I is an m-tuple of indexes. Then we deﬁne the projection
of a onto I by
πI(a) = (ai0,ai1,··· ,aim) ∈Ai0 ×Ai1 ×···×Aim .
The projection may be used to permute elements of a tuple, to discard elements, or to
repeat elements.
Projection of a tuple and restriction of a function are related. An n-tuple a ∈An where
a = (a0,a1,··· ,an−1) may be considered a function of the form a: {0,1,··· ,n−1} →A,
in which case a(0) = a0, a(1) = a1, etc. Projection is similar to restriction of this function,
differing in that restriction, by itself, does not provide the ability to permute, repeat, or
Lee & Seshia, Introduction to Embedded Systems
431



<!-- Page 452 -->
### [PDF Page 452]

A.3. SEQUENCES
renumber elements. But conceptually, the operations are similar, as illustrated by the
following example.
Example A.6:
Consider a 3-tuple a = (a0,a1,a2) ∈A3. This is represented by
the function a: {0,1,2} →A. Let I = {1,2}. The projection b = πI(a) = (a1,a2),
which itself can be represented by a function b: {0,1} →A, where b(0) = a1 and
b(1) = a2.
The restriction a|I is not exactly the same function as b, however. The domain of
the ﬁrst function is {1,2}, whereas the domain of the second is {0,1}. In particular,
a|I(1) = b(0) = a1 and a|I(2) = b(1) = a2.
A projection may be lifted just like ordinary functions. Given a set of n-tuples B ⊆A0 ×
A1 ×···×An−1 and an m-tuple of indexes I ∈{0,1,··· ,n−1}m, the lifted projection is
ˆπI(B) = {πI(b) : b ∈B} .
A.3
Sequences
A tuple (a0,a1) ∈A2 can be interpreted as a sequence of length 2. The order of elements
in the sequence matters, and is in fact captured by the natural ordering of the natural
numbers. The number 0 comes before the number 1. We can generalize this and recognize
that a sequence of elements from set A of length n is an n-tuple in the set An. A0 represents
the set of empty sequences, a singleton set (there is only one empty sequence).
The set of all ﬁnite sequences of elements from the set A is written A∗, where we interpret
∗as a wildcard that can take on any value in N. A member of this set with length n is an
n-tuple, a ﬁnite sequence.
The set of inﬁnite sequences of elements from A is written AN or Aω. The set of ﬁnite
and inﬁnite sequences is written
A∗∗= A∗∪AN .
Finite and inﬁnite sequences play an important role in the semantics of concurrent pro-
grams. They can be used, for example, to represent streams of messages sent from one
432
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 453 -->
### [PDF Page 453]

A. SETS AND FUNCTIONS
Exponential Notation for Sets of Functions
The exponential notation BA for the set of functions of form f : A →B is worth explaining.
Recall that A2 is the cartesian product of set A with itself, and that 2A is the powerset of A.
These two notations are naturally thought of as sets of functions. A construction attributed
to John von Neumann deﬁnes the natural numbers as follows,
0
=
/0
1
=
{0} = {/0}
2
=
{0,1} = {/0,{/0}}
3
=
{0,1,2} = {/0,{/0},{/0,{/0}}}
···
With this deﬁnition, the powerset 2A is the set of functions mapping the set A into the set
2. Consider one such function, f ∈2A. For each a ∈A, either f(a) = 0 or f(a) = 1. If
we interpret “0” to mean “nonmember” and “1” to mean “member,” then indeed the set
of functions 2A represents the set of all subsets of A. Each such function deﬁnes a subset.
Similarly, the cartesian product A2 can be interpreted as the set of functions of
form f : 2 →A, or using von Neumann’s numbers, f : {0,1} →A. Consider a tuple
a = (a0,a1) ∈A2. It is natural to associate with this tuple a function a: {0,1} →A where
a(0) = a0 and a(1) = a1. The argument to the function is the index into the tuple. We can
now interpret the set of functions BA of form f : A →B as a set of tuples indexed by the
set A instead of by the natural numbers.
Let ω = {/0,{/0},{/0,{/0}},···} represent the set of von Neumann numbers. This set
is closely related to the set N (see problem 2). Given a set A, it is now natural to interpret
Aω as the set of all inﬁnite sequences of elements from A, the same as AN.
The singleton set A0 can now be interpreted as the set of all functions whose domain
is the empty set and codomain is A. There is exactly one such function (no two such
functions are distinguishable), and that function has an empty graph. Before, we deﬁned
A0 = {/0}. Using von Neumann numbers, A0 = 1, corresponding nicely with the deﬁnition
of a zero exponent on ordinary numbers. Moreover, you can think of A0 = {/0} as the set
of all functions with an empty graph.
It is customary in the literature to omit the bold face font for A0, 2A, and A2, writing
instead simply A0, 2A, and A2.
Lee & Seshia, Introduction to Embedded Systems
433



<!-- Page 454 -->
### [PDF Page 454]

A.3. SEQUENCES
part of the program to another. Or they can represent successive assignments of values to
a variable. For programs that terminate, ﬁnite sequences will be sufﬁcient. For programs
that do not terminate, we need inﬁnite sequences.
434
Lee & Seshia, Introduction to Embedded Systems



<!-- Page 455 -->
### [PDF Page 455]

A. SETS AND FUNCTIONS

### Exercises

1. This problem explores properties of onto and one-to-one functions.
(a) Show that if f : A →B is onto and g: B →C is onto, then (g ◦f): A →C is
onto.
(b) Show that if f : A →B is one-to-one and g: B →C is one-to-one, then (g ◦
f): A →C is one-to-one.
2. Let ω = {/0,{/0},{/0,{/0}},···} be the von Neumann numbers as deﬁned in the box
on page 433. This problem explores the relationship between this set and N, the set
of natural numbers.
(a) Let f : ω →N be deﬁned by
f(x) = |x|,
∀x ∈ω .
That is, f(x) is the size of the set x. Show that f is bijective.
(b) The lifted version of the function f in part (a) is written ˆf. What is the value
of ˆf({0,{0}})? What is the value of f({0,{0}})? Note that on page 430 it
is noted that when there is no ambiguity, ˆf may be written simply f. For this
function, is there such ambiguity?
Lee & Seshia, Introduction to Embedded Systems
435



<!-- Page 456 -->
### [PDF Page 456]


### EXERCISES

436
Lee & Seshia, Introduction to Embedded Systems


