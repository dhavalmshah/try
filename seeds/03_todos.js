// Insert some sample todos into the todos table

exports.seed = function (knex) {
    return knex('todos').del()
        .then(function () {
            return knex('todos').insert([
                { id: 1, title: 'Create database schema', description: 'Use Knex migrations to create the tables and relations', deadline: '2021-07-15', status: 'completed', assigner_id: 1, assignee_id: 1, project_id: 1 },
                { id: 2, title: 'Seed database with sample data', description: 'Use Knex seeds to insert some dummy data into the tables', deadline: '2021-07-16', status: 'completed', assigner_id: 1, assignee_id: 1, project_id: 1 },
                { id: 3, title: 'Create backend services', description: 'Use Feathers and Objection to create RESTful API endpoints for each resource', deadline: '2021-07-17', status: 'in progress', assigner_id: 1, assignee_id: 2, project_id: 1 },
                {
                    id: 4, title: 'Create frontend components', description: 'Use React and Bootstrap to create UI components for displaying and interacting with the data', deadline: '2021-07-18', status: 'pending', assigner_id
                        : 1, assignee_id
                        : 3, project_id
                        : 1
                },
                {
                    id
                        : 5, title
                        : 'Write blog post about todo app', description
                        : 'Share the experience and challenges of building a todo app with Node.js and React', deadline
                        : '2021-07-19', status: 'pending', assigner_id
                        : 2, assignee_id
                        : 2, project_id
                        : 2
                },
                {
                    id
                        : 6, title
                        : 'Create product catalog', description
                        : 'Use a CMS to create and manage the products and categories', deadline
                        : '2021-07-20', status: 'pending', assigner_id
                        : 4, assignee_id
                        : 4, project_id
                        : 3
                },
                {
                    id
                        : 7, title
                        : 'Create payment gateway', description
                        : 'Use a third-party service to enable online payments and transactions', deadline
                        : '2021-07-21', status: 'pending', assigner_id
                        : 4, assignee_id
                        : 5, project_id
                        : 3
                }
            ]);
        });
};