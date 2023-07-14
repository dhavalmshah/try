// Create the projects table with the following columns:
// id: an auto-incrementing integer as the primary key
// name: a string that cannot be null
// description: a text that can be null
// created_at: a timestamp that defaults to the current time
// updated_at: a timestamp that defaults to the current time and updates on every change

exports.up = function (knex) {
    return knex.schema.createTable('projects', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.text('description');
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('projects');
};
