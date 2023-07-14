// reducers.js

// Import Redux Toolkit
import { createReducer } from '@reduxjs/toolkit';

// Import the action types
import {
    LOGIN,
    LOGOUT,
    FETCH_PROJECTS,
    FETCH_PROJECT_BY_ID,
    CREATE_PROJECT,
    UPDATE_PROJECT,
    DELETE_PROJECT,
    FETCH_USERS,
    FETCH_USER_BY_ID,
    REGISTER,
    FETCH_TODOS,
    FETCH_TODO_BY_ID,
    CREATE_TODO,
    UPDATE_TODO,
    DELETE_TODO
} from './actions';

// Define the initial state for the user slice
const initialUserState = {
    data: null, // The user data
    loading: false, // The loading status
    error: null // The error message
};

// Define the reducer for the user slice using Redux Toolkit
const userReducer = createReducer(initialUserState, {
    // Handle the pending state of the login and register actions
    [LOGIN.pending]: (state, action) => {
        state.loading = true;
        state.error = null;
    },
    [REGISTER.pending]: (state, action) => {
        state.loading = true;
        state.error = null;
    },
    // Handle the fulfilled state of the login and register actions
    [LOGIN.fulfilled]: (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
    },
    [REGISTER.fulfilled]: (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
    },
    // Handle the rejected state of the login and register actions
    [LOGIN.rejected]: (state, action) => {
        state.data = null;
        state.loading = false;
        state.error = action.error.message;
    },
    [REGISTER.rejected]: (state, action) => {
        state.data = null;
        state.loading = false;
        state.error = action.error.message;
    },
    // Handle the fulfilled state of the logout action
    [LOGOUT.fulfilled]: (state, action) => {
        state.data = null;
        state.loading = false;
        state.error = null;
    },
});

// Define the initial state for the projects slice
const initialProjectsState = {
    data: [], // The projects data
    loading: false, // The loading status
    error: null // The error message
};

// Define the reducer for the projects slice using Redux Toolkit
const projectsReducer = createReducer(initialProjectsState, {
    // Handle the pending state of the fetchProjects, fetchProjectById, createProject, updateProject, and deleteProject actions
    [FETCH_PROJECTS.pending]: (state, action) => {
        state.loading = true;
        state.error = null;
    },
    [FETCH_PROJECT_BY_ID.pending]: (state, action) => {
        state.loading = true;
        state.error = null;
    },
    [CREATE_PROJECT.pending]: (state, action) => {
        state.loading = true;
        state.error = null;
    },
    [UPDATE_PROJECT.pending]: (state, action) => {
        state.loading = true;
        state.error = null;
    },
    [DELETE_PROJECT.pending]: (state, action) => {
        state.loading = true;
        state.error = null;
    },
    // Handle the fulfilled state of the fetchProjects, fetchProjectById, createProject, updateProject, and deleteProject actions
    [FETCH_PROJECTS.fulfilled]: (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
    },
    [FETCH_PROJECT_BY_ID.fulfilled]: (state, action) => {
        // Find the index of the project with the same id as the payload in the state data array        
        const index = state.data.findIndex(project => project.id === action.payload.id);

        // If the project exists in the state data array
        if (index !== -1) {
            // Update the project
            state.data[index] = action.payload;
        } else {
            // Otherwise, add the project to the state data array
            state.data.push(action.payload);
        }
        state.loading = false;
        state.error = null;
    },
    [CREATE_PROJECT.fulfilled]: (state, action) => {
        state.data.push(action.payload);
        state.loading = false;
        state.error = null;
    },
    [UPDATE_PROJECT.fulfilled]: (state, action) => {
        // Find the index of the project with the same id as the payload in the state data array
        const index = state.data.findIndex(project => project.id === action.payload.id);

        // Update the project
        state.data[index] = action.payload;
        state.loading = false;
        state.error = null;
    },
    [DELETE_PROJECT.fulfilled]: (state, action) => {
        const index = state.data.findIndex(project => project.id === action.payload.id);
        state.data.splice(index, 1);
        state.loading = false;
        state.error = null;
    },
    // Handle the rejected state of the fetchProjects, fetchProjectById, createProject, updateProject, and deleteProject actions
    [FETCH_PROJECTS.rejected]: (state, action) => {
        state.data = [];
        state.loading = false;
        state.error = action.error.message;
    },
    [FETCH_PROJECT_BY_ID.rejected]: (state, action) => {
        const index = state.data.findIndex(project => project.id === action.payload.id);
        if (index !== -1) {
            state.data.splice(index, 1);
        }
        state.loading = false;
        state.error = action.error.message;
    },
    [CREATE_PROJECT.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    },
    [UPDATE_PROJECT.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    },
    [DELETE_PROJECT.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    },
});

// Define the initial state for the users slice
const usersReducer = createReducer(initialProjectsState, {
    // Handle the pending state of the fetchProjects, fetchProjectById, createProject, updateProject, and deleteProject actions
    [FETCH_USERS.pending]: (state, action) => {
        state.loading = true;
        state.error = null;
    },
    [FETCH_USER_BY_ID.pending]: (state, action) => {
        state.loading = true;
        state.error = null;
    },
    [CREATE_USER.pending]: (state, action) => {
        state.loading = true;
        state.error = null;
    },
    [UPDATE_USER.pending]: (state, action) => {
        state.loading = true;
        state.error = null;
    },
    [DELETE_USER.pending]: (state, action) => {
        state.loading = true;
        state.error = null;
    },
    // Handle the fulfilled state of the fetchProjects, fetchProjectById, createProject, updateProject, and deleteProject actions
    [FETCH_USERS.fulfilled]: (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
    },
    [FETCH_USER_BY_ID.fulfilled]: (state, action) => {
        // Find the index of the project with the same id as the payload in the state data array        
        const index = state.data.findIndex(project => project.id === action.payload.id);

        // If the project exists in the state data array
        if (index !== -1) {
            // Update the project
            state.data[index] = action.payload;
        } else {
            // Otherwise, add the project to the state data array
            state.data.push(action.payload);
        }
        state.loading = false;
        state.error = null;
    },
    [CREATE_USER.fulfilled]: (state, action) => {
        state.data.push(action.payload);
        state.loading = false;
        state.error = null;
    },
    [UPDATE_USER.fulfilled]: (state, action) => {
        // Find the index of the project with the same id as the payload in the state data array
        const index = state.data.findIndex(project => project.id === action.payload.id);

        // Update the project
        state.data[index] = action.payload;
        state.loading = false;
        state.error = null;
    },
    [DELETE_USER.fulfilled]: (state, action) => {
        const index = state.data.findIndex(project => project.id === action.payload.id);
        state.data.splice(index, 1);
        state.loading = false;
        state.error = null;
    },
    // Handle the rejected state of the fetchProjects, fetchProjectById, createProject, updateProject, and deleteProject actions
    [FETCH_USERS.rejected]: (state, action) => {
        state.data = [];
        state.loading = false;
        state.error = action.error.message;
    },
    [FETCH_USER_BY_ID.rejected]: (state, action) => {
        const index = state.data.findIndex(project => project.id === action.payload.id);
        if (index !== -1) {
            state.data.splice(index, 1);
        }
        state.loading = false;
        state.error = action.error.message;
    },
    [CREATE_USER.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    },
    [UPDATE_USER.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    },
    [DELETE_USER.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    },
});

// Define the initial state for the todos slice
const initialTodosState = {
    data: [], // The todos data
    loading: false, // The loading status
    error: null // The error message
};

// Define the reducer for the todos slice using Redux Toolkit
const todosReducer = createReducer(initialTodosState, {
    // Handle the pending state of the fetchTodos, fetchTodoById, createTodo, updateTodo, and deleteTodo actions
    [FETCH_TODOS.pending]: (state, action) => {
        state.loading = true;
        state.error = null;
    },
    [FETCH_TODO_BY_ID.pending]: (state, action) => {
        state.loading = true;
        state.error = null;
    },
    [CREATE_TODO.pending]: (state, action) => {
        state.loading = true;
        state.error = null;
    },
    [UPDATE_TODO.pending]: (state, action) => {
        state.loading = true;
        state.error = null;
    },
    [DELETE_TODO.pending]: (state, action) => {
        state.loading = true;
        state.error = null;
    },
    [FETCH_TODOS.fulfilled]: (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
    },
    [FETCH_TODO_BY_ID.fulfilled]: (state, action) => {
        // Find the index of the todo with the same id as the payload in the state data array        
        const index = state.data.findIndex(todo => todo.id === action.payload.id);

        // If the todo exists in the state data array
        if (index !== -1) {
            // Update the todo
            state.data[index] = action.payload;
        } else {
            // Otherwise, add the todo to the state data array
            state.data.push(action.payload);
        }
        state.loading = false;
        state.error = null;
    },
    [CREATE_TODO.fulfilled]: (state, action) => {
        state.data.push(action.payload);
        state.loading = false;
        state.error = null;
    },
    [UPDATE_TODO.fulfilled]: (state, action) => {
        // Find the index of the todo with the same id as the payload in the state data array
        const index = state.data.findIndex(todo => todo.id === action.payload.id);

        // Update the todo
        state.data[index] = action.payload;
        state.loading = false;
        state.error = null;
    },
    [DELETE_TODO.fulfilled]: (state, action) => {
        const index = state.data.findIndex(todo => todo.id === action.payload.id);
        state.data.splice(index, 1);
        state.loading = false;
        state.error = null;
    },
    [FETCH_TODOS.rejected]: (state, action) => {
        state.data = [];
        state.loading = false;
        state.error = action.error.message;
    },
    [FETCH_TODO_BY_ID.rejected]: (state, action) => {
        const index = state.data.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) {
            state.data.splice(index, 1);
        } 
        state.loading = false;
        state.error = action.error.message;
    },
    [CREATE_TODO.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    },
    [UPDATE_TODO.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    },
    [DELETE_TODO.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    }
});

// Export the reducers
export { userReducer, projectsReducer, usersReducer, todosReducer };




