# W2D2 Lecture

## Web Servers

- A Web server handles requests from a http client and
- Interact with the Database for Data

- Apache (44%)
- Nginx (41%)
- Microsoft IIS (9%)
- LiteSpeed (3.8%)
- Google Servers (0.9%)
- NodeJS (0.6%)

## What is NodeJS

**A JavaScript run-time environement(Chrome V8) + I/O built-in libraries (file system, http, net) + module system (npm)**

- Back in the days, JavaScript could only be executed in the browser
- In 2009, Ryan Dahl took the Google V8 engine and wrapped it in a c++ program
- A JavaScript runtime environment built on chrome V8 that can be run on a computer as a standalone application
- With NodeJS, network applications such as web servers (http) can be written in JavaScript
- It has an event driver architecture and asynchronous I/O
- Node has a huge ecosystem thanks to npm (main reason of the popularity of node)

[2018 Node Survey](https://nodejs.org/en/user-survey-report/)

## Create a Web Server with Node

- We'll be creating a todos API using pure NodeJS
- We'll then use Express to see what is the difference

### Running the app

- `node server.js` from the **nodejs** folder for the node version
- For the Express version:

  - npm install from the **ex_framework** folder
  - `node server.js`
