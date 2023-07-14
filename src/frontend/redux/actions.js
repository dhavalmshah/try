// actions.js

// Import Feathers client and Redux
import feathers from '@feathersjs/client';
import { createAction } from '@reduxjs/toolkit';

// Define the action types
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const FETCH_PROJECT_BY_ID = 'FETCH_PROJECT_BY_ID';
export const CREATE_PROJECT = 'CREATE_PROJECT';
export const UPDATE_PROJECT = 'UPDATE_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';
export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USER_BY_ID = 'FETCH_USER_BY_ID';
export const REGISTER = 'REGISTER';
export const FETCH_TODOS = 'FETCH_TODOS';
export const FETCH_TODO_BY_ID = 'FETCH_TODO_BY_ID';
export const CREATE_TODO = 'CREATE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';

// Define the action creators using Redux Toolkit
export const login = createAction(LOGIN, ({ email, password, app }) => {
    return {
        payload: async () => {
            // Use Feathers client to authenticate the user with the email and password
            const response = await app.authenticate({
                strategy: 'local',
                email,
                password
            });

            // Return the user data from the response
            return response.user;
        }
    };
});

export const logout = createAction(LOGOUT, ({ app }) => {
    return {
        payload: async () => {
            // Use Feathers client to log out the user
            await app.logout();

            // Return null as the payload
            return null;
        }
    };
});

export const fetchProjects = createAction(FETCH_PROJECTS, ({ app }) => {
    return {
        payload: async () => {
            // Use Feathers client to get the projects service
            const service = app.service('projects');

            // Use the service to find all the projects of the authenticated user
            const response = await service.find({
                query: {
                    $eager: '[users, todos]'
                }
            });

            return response.data;
        }
    };
});

export const fetchProjectById = createAction(FETCH_PROJECT_BY_ID, ({ id, app }) => {
    return {
        payload: async () => {
            // Use Feathers client to get the projects service
            const service = app.service('projects');

            // Use the service to get the project with the given id
            const response = await service.get(id, {
                query: {
                    $eager: '[users, todos]'
                }
            });

            // Return the project data from the response
            return response;
        }
    };
});

export const createProject = createAction(CREATE_PROJECT, ({ name, app }) => {
    return {
        payload: async () => {
            // Use Feathers client to get the projects service
            const service = app.service('projects');

            // Use the service to create a new project with the given name
            const response = await service.create({ name });

            // Return the project data from the response
            return response;
        }
    };
});

export const updateProject = createAction(UPDATE_PROJECT, ({ id, name, app }) => {
    return {
        payload: async () => {
            // Use Feathers client to get the projects service
            const service = app.service('projects');

            // Use the service to update the project with the given id and name
            const response = await service.patch(id, { name });

            // Return the project data from the response
            return response;
        }
    };
});

export const deleteProject = createAction(DELETE_PROJECT, ({ id, app }) => {
    return {
        payload: async () => {
            // Use Feathers client to get the projects service
            const service = app.service('projects');

            // Use the service to delete the project with the given id
            const response = await service.remove(id);

            // Return the project data from the response
            return response;
        }
    };
});

export const fetchUsers = createAction(FETCH_USERS, ({ app }) => {
    return {
        payload: async () => {
            // Use Feathers client to get the users service
            const service = app.service('users');

            // Use the service to find all the users
            const response = await service.find();

            // Return the users data from the response
            return response.data;
        }
    };
});

export const fetchUserById = createAction(FETCH_USER_BY_ID, ({ id, app }) => {
    return {
        payload: async () => {
            // Use Feathers client to get the users service
            const service = app.service('users');

            // Use the service to get the user with the given id
            const response = await service.get(id);

            // Return the user data from the response
            return response;
        }
    };
});

export const register = createAction(REGISTER, ({ email, password, app }) => {
    return {
        payload: async () => {
            // Use Feathers client to get the users service
            const service = app.service('users');

            // Use the service to create a new user with the given email and password
            const response = await service.create({ email, password });

            // Return the user data from the response
            return response;
        }
    };
});

export const fetchTodos = createAction(FETCH_TODOS, ({ projectId, app }) => {
    return {
        payload: async () => {
            // Use Feathers client to get the todos service
            const service = app.service('todos');

            // Use the service to find all the todos of the project with the given id
            const response = await service.find({
                query: {
                    project_id: projectId,
                    $eager: '[project, assigner, assignee]'
                }
            });

            // Return the todos data from the response
            return response.data;
        }
    };
});

export const fetchTodoById = createAction(FETCH_TODO_BY_ID, ({ id, app }) => {
    return {
        payload: async () => {
            // Use Feathers client to get the todos service
            const service = app.service('todos');

            // Use the service to get the todo with the given id
            const response = await service.get(id, {
                query: {
                    $eager: '[project, assigner, assignee]'
                }
            });

            // Return the todo data from the response
            return response;
        }
    };
});

export const createTodo = createAction(CREATE_TODO, ({ projectId, description, assigneeId, app }) => {
    return {
        payload: async () => {
            // Use Feathers client to get the todos service
            const service = app.service('todos');

            // Use the service to create a new todo with the given description, assigneeId, and projectId
            const response = await service.create({ description, assignee_id: assigneeId, project_id: projectId });

            // Return the todo data from the response
            return response;
        }
    };
});

export const updateTodo = createAction(UPDATE_TODO, ({ id, description, assigneeId, app }) => {
    return {
        payload: async () => {
            // Use Feathers client to get the todos service
            const service = app.service('todos');

            // Use the service to update the todo with the given id, description, and assigneeId
            const response = await service.patch(id, { description, assignee_id: assigneeId });

            // Return the todo data from the response
            return response;
        }
    };
});

export const deleteTodo = createAction(DELETE_TODO, ({ id, app }) => {
    return {
        payload: async () => {
            // Use Feathers client to get the todos service
            const service = app.service('todos');

            // Use the service to delete the todo with the given id
            const response = await service.remove(id);

            // Return the todo data from the response
            return response;
        }
    };
});

