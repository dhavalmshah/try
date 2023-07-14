// models.js

// Import Objection and Knex
const { Model } = require('objection');
const Knex = require('knex');

// Initialize Knex with MySQL connection
const knex = Knex({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'your-password',
    database: 'todos'
  }
});

// Bind Objection to Knex
Model.knex(knex);

// Define the Project model
class Project extends Model {
  static get tableName() {
    return 'projects';
  }

  static get relationMappings() {
    return {
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'projects.id',
          through: {
            from: 'projects_users.project_id',
            to: 'projects_users.user_id'
          },
          to: 'users.id'
        }
      },
      todos: {
        relation: Model.HasManyRelation,
        modelClass: Todo,
        join: {
          from: 'projects.id',
          to: 'todos.project_id'
        }
      }
    };
  }
}

// Define the User model
class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get relationMappings() {
    return {
      projects: {
        relation: Model.ManyToManyRelation,
        modelClass: Project,
        join: {
          from: 'users.id',
          through: {
            from: 'projects_users.user_id',
            to: 'projects_users.project_id'
          },
          to: 'projects.id'
        }
      },
      todosAssignedByMe: {
        relation: Model.HasManyRelation,
        modelClass: Todo,
        join: {
          from: 'users.id',
          to: 'todos.assigner_id'
        }
      },
      todosAssignedToMe: {
        relation: Model.HasManyRelation,
        modelClass: Todo,
        join: {
          from: 'users.id',
          to: 'todos.assignee_id'
        }
      }
    };
  }

  // Hash the password before inserting or updating a user
  async $beforeInsert() {
    this.password = await local.hashPassword(this.password);
  }

  async $beforeUpdate() {
    this.password = await local.hashPassword(this.password);
  }
}

// Define the Todo model
class Todo extends Model {
  static get tableName() {
    return 'todos';
  }

  static get relationMappings() {
    return {
      project: {
        relation: Model.BelongsToOneRelation,
        modelClass: Project,
        join: {
          from: 'todos.project_id',
          to: 'projects.id'
        }
      },
      assigner: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'todos.assigner_id',
          to: 'users.id'
        }
      },
      assignee: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'todos.assignee_id',
          to: 'users.id'
        }
      }
    };
  }
}

// Export the models
module.exports = { Project, User, Todo };
