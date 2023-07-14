// Create the todos table with the following columns:
// id: an auto-incrementing integer as the primary key
// title: a string that cannot be null
// description: a text that can be null
// deadline: a date that can be null
// status: a string that can be one of 'pending', 'in progress', 'completed', or 'cancelled'
// assigner_id: a foreign key referencing the users table
// assignee_id: a foreign key referencing the users table
// project_id: a foreign key referencing the projects table
// created_at: a timestamp that defaults to the current time
// updated_at: a timestamp that defaults to the current time and updates on every change

exports.up = function(knex) {
    return knex.schema.createTable('todos', table => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.text('description');
      table.date('deadline');
      table.string('status').defaultTo('pending').in(['pending', 'in progress', 'completed', 'cancelled']);
      table.integer('assigner_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.integer('assignee_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.integer('project_id').unsigned().references('id').inTable('projects').onDelete('CASCADE');
      table.timestamps(true, true);
    });
};
  
exports.down = function(knex) {
    return knex.schema.dropTable('todos');
};
  