// selectors.js

// Define a selector for getting the user data from the state
export const selectUser = state => state.user.data;

// Define a selector for getting the projects data from the state
export const selectProjects = state => state.projects.data;

// Define a selector for getting a project by id from the state
export const selectProjectById = (state, id) => {
  // Use Array.prototype.find to find the project with the same id in the state data array
  return state.projects.data.find(project => project.id === id);
};

// Define a selector for getting the users data from the state
export const selectUsers = state => state.users.data;

// Define a selector for getting a user by id from the state
export const selectUserById = (state, id) => {
  // Use Array.prototype.find to find the user with the same id in the state data array
  return state.users.data.find(user => user.id === id);
};

// Define a selector for getting the users by project id from the state
export const selectUsersByProjectId = (state, projectId) => {
  // Use Array.prototype.filter to filter the users that belong to the project with the given id
  return state.users.data.filter(user => user.project_id === projectId);
};

// Define a selector for getting the todos data from the state
export const selectTodos = state => state.todos.data;

// Define a selector for getting a todo by id from the state
export const selectTodoById = (state, id) => {
  // Use Array.prototype.find to find the todo with the same id in the state data array
  return state.todos.data.find(todo => todo.id === id);
};

// Define a selector for getting the todos by project id from the state
export const selectTodosByProjectId = (state, projectId) => {
  // Use Array.prototype.filter to filter the todos that belong to the project with the given id
  return state.todos.data.filter(todo => todo.project_id === projectId);
};
