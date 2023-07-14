// knexfile.js

// Load environment variables from .env file
require('dotenv').config();

// Define the database connection parameters
const connection = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'todos'
};

// Export the Knex configuration for different environments
module.exports = {
  development: {
    client: 'mysql',
    connection,
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  },
  testing: {
    client: 'mysql',
    connection,
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  },
  production: {
    client: 'mysql',
    connection,
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  }
};
