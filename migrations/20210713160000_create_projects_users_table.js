// Create the projects_users table with the following columns:
// project_id: a foreign key referencing the projects table as part of the primary key
// user_id: a foreign key referencing the users table as part of the primary key
// role: a string that can be one of 'owner', 'admin', 'member', or 'guest'

exports.up = function (knex) {
    return knex.schema.createTable('projects_users', table => {
        table.integer('project_id').unsigned().references('id').inTable('projects').onDelete('CASCADE');
        table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
        table.string('role').defaultTo('member').in(['owner', 'admin', 'member', 'guest']);
        table.primary(['project_id', 'user_id']);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('projects_users');
};
