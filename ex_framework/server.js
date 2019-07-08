const express = require('express');
const PORT = process.env.PORT || 3001;
const todos = require('./todos');
const bodyParser = require('body-parser');
const { uid } = require('./util');

const app = express();

// static files in public folder
app.use(express.static('public'));

// Adding the body parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// defining our routes
// app.get('/', (req, res) => {
//   console.log('rendering home page');
// });

app.set('view engine', 'ejs');

const addTodo = (type, description) => {
  const id = uid();

  const newTodo = {
    id,
    type,
    description,
  };

  todos.push(newTodo);
};

app.get('/todos', (req, res) => {
  // ouput list of todos

  res.render('todos', { todos });
});

app.post('/todos', (req, res) => {
  // extact the info from the request

  const { type, description } = req.body;

  // adding a new todo
  addTodo(type, description);
  res.status(302).redirect('/todos');
});

app.use((req, res, next) => {
  res.render('404');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
