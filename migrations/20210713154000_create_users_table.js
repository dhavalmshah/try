// Create the users table with the following columns:
// id: an auto-incrementing integer as the primary key
// name: a string that cannot be null
// email: a string that cannot be null and must be unique
// password: a string that cannot be null and must be hashed
// created_at: a timestamp that defaults to the current time
// updated_at: a timestamp that defaults to the current time and updates on every change

exports.up = function (knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('users');
};
