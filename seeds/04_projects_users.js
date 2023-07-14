// Insert some sample relations between projects and users into the projects_users table

exports.seed = function (knex) {
    return knex('projects_users').del()
        .then(function () {
            return knex('projects_users').insert([
                { project_id: 1, user_id: 1, role: 'owner' },
                { project_id: 1, user_id: 2, role: 'admin' },
                { project_id: 1, user_id: 3, role: 'member' },
                { project_id: 2, user_id: 2, role: 'owner' },
                { project_id: 2, user_id: 1, role: 'guest' },
                { project_id: 3, user_id: 4, role: 'owner' },
                { project_id: 3, user_id: 5, role: 'member' }
            ]);
        });
};