const http = require('http');
const fs = require('fs');
const PORT = process.env.PORT || 3002;

const todos = require('./todos');
const { uid } = require('./util');

// Read the HTML file from the file system
const getHTML = (fileName, cb) => {
  fs.readFile(fileName, cb);
};

const renderHome = (req, res) => {
  // Read the index.html
  getHTML('index.html', (err, content) => {
    if (err) throw err;

    // set the type of content
    res.setHeader('Content-Type', 'text/html');

    // setting the status code. 200 means OK.
    res.statusCode = 200;

    // sending bacl the HTML content as the response
    res.write(content);

    // closing the response
    res.end();
  });
};

const renderTodos = (req, res) => {
  // Set the content type to be JSON
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;

  // todos is an array of objects. It needs to be JSON.
  res.write(JSON.stringify(todos));
  res.end();
};

const render404 = (req, res) => {
  // Read the 404.html
  getHTML('404.html', (err, content) => {
    if (err) throw err;

    // set the type of content
    res.setHeader('Content-Type', 'text/html');

    // setting the status code. 200 means OK.
    res.statusCode = 404;

    // sending bacl the HTML content as the response
    res.write(content);

    // closing the response
    res.end();
  });
};

// get the body of the request
const getBody = (req, res, cb) => {
  // attach the body to the the request object
  req.body = '';

  req.on('data', part => (req.body += part));

  req.on('error', err => {
    cb(err);
  });

  req.on('end', () => {
    req.body = JSON.parse(req.body);
    cb(null);
  });
};

const addTodo = (req, res) => {
  getBody(req, res, err => {
    // extracting type and description from req.body
    const { type, description } = req.body;

    // Create a new todo

    // create a randomId

    const id = uid();

    const newTodo = {
      id,
      type,
      description,
    };

    // Add the new todo to the list of todos

    todos.push(newTodo);
    res.statusCode = 201;
    res.end();
  });
};

const server = http.createServer((req, res) => {
  // Catch the requests here

  const { method, url } = req;

  // Creating the possible routes

  const routes = {
    'GET /': renderHome,
    'GET /todos': renderTodos,
    'POST /todos': addTodo,
  };

  // route = 'GET /todos'
  const route = `${method} ${url}`;

  if (routes[route]) {
    // Execute the associated function to that route in routes
    routes[route](req, res);
  } else {
    render404(req, res);
  }

  // GET request
  // if '/' => index.html

  // if '/todos' => list of todos

  // Anything else => 404

  // POST request

  // '/todos' creating a new todo

  // With regular if statements

  // if (method === 'GET') {
  //   console.log({ method });

  //   if (url === '/') {
  //     console.log({ url });
  //     res.statusCode = 200;
  //     res.write('This is the home page');
  //     res.end();
  //   }
  // }
});

server.listen(PORT, () => {
  console.log(`Server listens on port ${PORT}`);
});
