// Insert some sample users into the users table

exports.seed = function (knex) {
    return knex('users').del()
        .then(function () {
            return knex('users').insert([
                { id: 1, name: 'Alice', email: 'alice@example.com', password: '$2b$10$ZwQ7j0yf5Q4zqL8v5c9s6OJ2XZx6n4w0Yt7uqUW8a3Gk0xQnGg2l.' }, // password is 'password'
                { id: 2, name: 'Bob', email: 'bob@example.com', password: '$2b$10$ZwQ7j0yf5Q4zqL8v5c9s6OJ2XZx6n4w0Yt7uqUW8a3Gk0xQnGg2l.' },
                { id: 3, name: 'Charlie', email: 'charlie@example.com', password: '$2b$10$ZwQ7j0yf5Q4zqL8v5c9s6OJ2XZx6n4w0Yt7uqUW8a3Gk0xQnGg2l.' },
                { id: 4, name: 'David', email: 'david@example.com', password: '$2b$10$ZwQ7j0yf5Q4zqL8v5c9s6OJ2XZx6n4w0Yt7uqUW8a3Gk0xQnGg2l.' },
                { id: 5, name: 'Eve', email: 'eve@example.com', password: '$2b$10$ZwQ7j0yf5Q4zqL8v5c9s6OJ2XZx6n4w0Yt7uqUW8a3Gk0xQnGg2l.' }
            ]);
        });
};