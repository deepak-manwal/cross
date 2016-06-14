Bidding App
================

Bidding App is web application in which users can exchange itmes with each other by selling and buying in Real Time.


Installation
-------

1. Git repository URL https://github.com/deepak-manwal/cross clone first.

2. npm install 

3. bower install

Change in `config.js` than:

4. npm start 


Initialization of Database
-------


1. When you run this command `npm start` Node will start running on port 3000 (Change in config.js to changing port and database details).

2. Create Database in mysql with same name and try `npm start`. IT will automatically create all tables with data.

Assumptions I have made
-------

In config.js i have created number of default Invatnory items and default conins for First time user.


Requirements that i have not coverd in my solution
-------
I have not covered queued part of Bid automatically.


Its logical solution i have created to check sequence in password. I have used simple **for** loops and **array** for this solution. Gives repeted string and its times also.

Instructions to configure and prepare the source code to build and run properly
--------

Already mentaioned.


Instructions to prepare and run the test suites
---------

After Entering into root directory of project enter into `test` directory which contains test cases. 

`cd /project_path/test`

then

`mocha`

Node: I have mantioned in video.



Issues you have faced while completing the assignment, if any
-------

1. Big requirement took lot of time and code.



Constructive feedback for improving the assignment
-------

None





