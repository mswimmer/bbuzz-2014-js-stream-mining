Description
===========

A quick and dirty implementation of two stream mining algorithms, Top-K and CountMin Sketch. These 
are lossy counting algorithms for data streams.

Count-Min Sketch algorithm
--------------------------

http://en.wikipedia.org/wiki/Count%E2%80%93min_sketch

Metwally Space-Saver Top-K algorithm
------------------------------------

http://boundary.com/blog/2013/05/14/approximate-heavy-hitters-the-spacesaving-algorithm/
https://icmi.cs.ucsb.edu/research/tech_reports/reports/2005-23.pdf

Actually, this isn't a precise implementation. It uses the LfuMap object to simulate the
same effect, but I'm not sure if the results would be the same. LfuMap will remove the elements
that are least frequently used when the capacity is reached. This should have the same result,
but I can't be sure.

Installation
============

You'll need to do an

	npm install
	
first.

You also need to 0MQ stream from the lab, so this wont work anywhere else. But you should be able
to adapt it.

TODO
----

