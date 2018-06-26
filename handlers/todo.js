const db = require('../db.js');

const todo = {};
module.exports = todo;

todo.renderPage = (request, h) => h.file('./form.html');

todo.add = (request) => {
  const { text } = request.payload;
  db.addTodo(text);
};

todo.getTodos = () => db.getTodos();

todo.update = (request) => {
  const { id, value } = request.payload;
  db.update(id, value);
};

todo.delete = (request) => {
  const { id } = request.payload;
  db.delete(id);
};
