const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();
const todos = require('./todos');
const bodyParser = require('body-parser');
const { randomId } = require('./utils');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

const addTodo = (type, description) => {
  const id = randomId();

  const newTodo = {
    id,
    type,
    description,
  };

  todos.push(newTodo);
};

app.get('/todos', (req, res) => {
  res.status(200).render('todos', { todos });
});

app.post('/todos', (req, res) => {
  const { type, description } = req.body;
  addTodo(type, description);
  res.redirect('/todos');
});

app.use((req, res, next) => {
  res.status(404).redirect('404.html');
  next();
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
