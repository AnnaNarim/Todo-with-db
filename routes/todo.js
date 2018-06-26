const Handlers = require('../handlers/todo.js');

const routes = [];
module.exports = routes;

routes.push({
  method: 'GET',
  path: '/',
  handler: Handlers.renderPage,
  config: {
    tags: ['api'],
    description: 'Page to render form.html',
  },
});

routes.push({
  method: 'GET',
  path: '/js/{name}',
  handler:
  {
    directory: {
      path: 'js',
    },
  },
  config: {
    tags: ['api'],
    description: 'Page to render form.js',
  },
});

routes.push({
  method: 'POST',
  path: '/api/todos',
  handler: Handlers.add,
  config: {
    tags: ['api'],
    description: 'to add todo',
  },
});

routes.push({
  method: 'GET',
  path: '/api/todos',
  handler: Handlers.getTodos,
  config: {
    tags: ['api'],
    description: 'to get all todos',
  },
});

routes.push({
  method: 'PUT',
  path: '/api/todos/{id}',
  handler: Handlers.update,
  config: {
    tags: ['api'],
    description: 'update todo at given index',
  },
});

routes.push({
  method: 'DELETE',
  path: '/api/todos/{id}',
  handler: Handlers.delete,
  config: {
    tags: ['api'],
    description: 'delete todo at given index (change active to 0)',
  },
});
