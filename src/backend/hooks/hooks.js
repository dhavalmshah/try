// hooks.js

// Import Feathers and other dependencies
const feathers = require('@feathersjs/feathers');
const { authenticate } = require('@feathersjs/authentication').hooks;
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;
const { iff, isProvider, preventChanges } = require('feathers-hooks-common');
const { transaction } = require('objection');

// Define a hook for checking if a user belongs to a project
const checkProjectMembership = async context => {
  // Get the user and the project from the context
  const { user, data, params } = context;
  const { projectId } = data || params.query;

  // Find the project with the given id and eager load the users
  const project = await context.app.service('projects').get(projectId, {
    query: {
      $eager: 'users'
    }
  });

  // Check if the user is one of the project users
  const isMember = project.users.some(u => u.id === user.id);

  // If not, throw an error
  if (!isMember) {
    throw new Error('You are not a member of this project');
  }

  // Otherwise, return the context
  return context;
};

// Define a hook for setting the assigner of a todo to the current user
const setAssigner = async context => {
  // Get the user from the context
  const { user } = context;

  // Set the assigner_id of the todo to the user id
  context.data.assigner_id = user.id;

  // Return the context
  return context;
};

// Define a hook for checking if a user is the assigner or assignee of a todo
const checkTodoOwnership = async context => {
  // Get the user and the todo from the context
  const { user, id, params } = context;
  const todo = await context.app.service('todos').get(id || params.query.id, {
    query: {
      $eager: '[assigner, assignee]'
    }
  });

  // Check if the user is the assigner or assignee of the todo
  const isOwner = (user.id === todo.assigner.id) || (user.id === todo.assignee.id);

  // If not, throw an error
  if (!isOwner) {
    throw new Error('You are not the assigner or assignee of this todo');
  }

  // Otherwise, return the context
  return context;
};

// Define a hook for updating the project's progress when a todo is created, updated, or deleted
const updateProjectProgress = async context => {
  // Start a transaction
  const trx = await transaction.start(context.app.get('models').Project.knex());

  try {
    // Get the project and the todo from the context
    const { result } = context;
    const project = await context.app.service('projects').get(result.project_id, {
      query: {
        $eager: 'todos'
      },
      knex: trx
    });

    // Calculate the total and completed todos of the project
    const totalTodos = project.todos.length;
    const completedTodos = project.todos.filter(t => t.completed).length;

    // Calculate the progress percentage of the project
    const progress = totalTodos ? Math.round((completedTodos / totalTodos) * 100) : 0;

    // Update the project with the new progress value
    await context.app.service('projects').patch(result.project_id, { progress }, { knex: trx });

    // Commit the transaction
    await trx.commit();

    // Return the context
    return context;
    
  } catch (error) {
    // Rollback the transaction
    await trx.rollback();
    
    // Throw the error
    throw error;
    
  }
};

// Define hooks for each service

const projectHooks = {
  before: {
    all: [ authenticate('jwt') ],
    find: [ checkProjectMembership ],
    get: [ checkProjectMembership ],
    create: [],
    update: [ checkProjectMembership ],
    patch: [ checkProjectMembership ],
    remove: [ checkProjectMembership ]
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
};

const userHooks = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt') ],
    create: [ hashPassword('password') ],
    update: [ hashPassword('password'), authenticate('jwt') ],
    patch: [ hashPassword('password'), authenticate('jwt') ],
    remove: [ authenticate('jwt') ]
  },
  after: {
    all: [
      protect('password')
      // Add any other fields to protect here
      ],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: []
   },
};

// hooks.js (continued)

const todoHooks = {
    before: {
      all: [ authenticate('jwt') ],
      find: [ checkProjectMembership ],
      get: [ checkProjectMembership ],
      create: [ checkProjectMembership, setAssigner ],
      update: [ checkProjectMembership, checkTodoOwnership, preventChanges(true, 'assigner_id', 'project_id') ],
      patch: [ checkProjectMembership, checkTodoOwnership, preventChanges(true, 'assigner_id', 'project_id') ],
      remove: [ checkProjectMembership, checkTodoOwnership ]
    },
    after: {
      all: [],
      find: [],
      get: [],
      create: [ updateProjectProgress ],
      update: [ updateProjectProgress ],
      patch: [ updateProjectProgress ],
      remove: [ updateProjectProgress ]
    },
  };  