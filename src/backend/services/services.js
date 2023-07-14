// services.js

// Import Feathers and Objection
const feathers = require('@feathersjs/feathers');
const objection = require('@feathersjs-objection');

// Import the models
const { Project, User, Todo } = require('./models');

// Create the project service
const projectService = objection({
  modelClass: Project,
  whitelist:['$eager', '$joinRelation'],
  allowedEager:'[users, todos]',
});

// Create the user service
const userService = objection({
  modelClass: User,
  whitelist:['$eager', '$joinRelation'],
  allowedEager:'[projects, todosAssignedByMe, todosAssignedToMe]',
});

// Create the todo service
const todoService = objection({
  modelClass: Todo,
  whitelist:['$eager', '$joinRelation'],
  allowedEager:'[project, assigner, assignee]',
});

// Export the services
module.exports = { projectService, userService, todoService };
