// Insert some sample projects into the projects table

exports.seed = function(knex) {
    return knex('projects').del()
      .then(function () {
        return knex('projects').insert([
          {id: 1, name: 'Todo App', description: 'A simple app for managing personal tasks'},
          {id: 2, name: 'Blog', description: 'A platform for sharing thoughts and opinions'},
          {id: 3, name: 'E-commerce', description: 'An online store for selling products and services'}
        ]);
      });
  };