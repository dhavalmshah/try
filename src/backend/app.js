// Import Feathers and other dependencies
const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const authentication = require('@feathersjs/authentication');
const local = require('@feathersjs/authentication-local');
const jwt = require('@feathersjs/authentication-jwt');
const objection = require('@feathersjs-objection');

// Import the models, services, and hooks
const { Project, User, Todo } = require('./models');
const { projectService, userService, todoService } = require('./services');
const { projectHooks, userHooks, todoHooks } = require('./hooks');

// Create an Express app with Feathers
const app = express(feathers());

// Enable JSON parsing, REST and Socket.io transports
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.configure(express.rest());
app.configure(socketio());

// Configure authentication with JWT and local strategies
app.configure(authentication({
  secret: 'your-secret-key',
  service: 'users'
}));
app.configure(jwt());
app.configure(local());

// Register the models with Feathers ORM
app.set('models', { Project, User, Todo });
app.configure(objection());

// Register the services with Feathers
app.use('/projects', projectService);
app.use('/users', userService);
app.use('/todos', todoService);

// Register the hooks with Feathers
app.service('projects').hooks(projectHooks);
app.service('users').hooks(userHooks);
app.service('todos').hooks(todoHooks);

// Start the server on port 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
