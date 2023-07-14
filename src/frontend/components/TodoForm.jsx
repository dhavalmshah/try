// TodoForm.jsx

// Import React and other dependencies
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

// Import the actions and selectors
import { createTodo, updateTodo, fetchTodoById } from '../store/actions';
import { selectTodoById, selectUsersByProjectId } from '../store/selectors';

// Define the TodoForm component
const TodoForm = ({ app }) => {
  // Get the history object from React Router
  const history = useHistory();

  // Get the todo id and project id from the URL parameters
  const { todoId, projectId } = useParams();

  // Get the todo from the state using the todo id
  const todo = useSelector(state => selectTodoById(state, todoId));

  // Get the users from the state using the project id
  const users = useSelector(state => selectUsersByProjectId(state, projectId));

  // Define the initial state for the form fields
  const initialState = {
    title: '',
    description: '',
    deadline: '',
    assignee_id: ''
  };

  // Define a state variable for the form fields and a setter function
  const [fields, setFields] = useState(initialState);

  // Define a state variable for the form errors and a setter function
  const [errors, setErrors] = useState({});

  // Define a useEffect hook to populate the form fields with the todo data if it exists
  useEffect(() => {
    if (todo) {
      setFields({
        title: todo.title,
        description: todo.description,
        deadline: todo.deadline,
        assignee_id: todo.assignee.id
      });
    }
  }, [todo]);

  // Get the dispatch function from the store
  const dispatch = useDispatch();

  // Define a handler for submitting the form
  const handleSubmit = async event => {
    // Prevent the default browser behavior of reloading the page
    event.preventDefault();

    // Validate the form fields and set errors if any
    const errors = validateFields(fields);
    setErrors(errors);

    // If there are no errors, proceed with creating or updating the todo
    if (Object.keys(errors).length === 0) {
      // If there is a todo id, dispatch the updateTodo action with the todo id, fields, and app
      if (todoId) {
        dispatch(updateTodo({
          id: todoId,
          ...fields,
          app
        }));
      } else {
        // Otherwise, dispatch the createTodo action with the project id, fields, and app
        dispatch(createTodo({
          projectId,
          ...fields,
          app
        }));
      }

      // Redirect to the project details page
      history.push(`/projects/${projectId}`);
    }
  };

  // Define a handler for changing the form fields
  const handleChange = event => {
    // Get the name and value of the changed field from the event target
    const { name, value } = event.target;

    // Set the field value in the state
    setFields({
      ...fields,
      [name]: value
    });
  };

  // Define a function for validating the form fields and returning errors if any
  const validateFields = fields => {
    // Initialize an empty object for storing errors
    const errors = {};

    // Check if the title field is empty
    if (!fields.title) {
      errors.title = 'Title is required';
    }

    // Check if the deadline field is empty or invalid
    if (!fields.deadline || !isValidDate(fields.deadline)) {
      errors.deadline = 'Deadline is required and must be in YYYY-MM-DD format';
    }

    // Check if the assignee_id field is empty or invalid
    if (!fields.assignee_id || !isValidUser(fields.assignee_id)) {
      errors.assignee_id = 'Assignee is required and must be a valid user';
    }

    // Return the errors object
    return errors;
  };

  // Define a helper function for checking if a date string is valid
  const isValidDate = date => {
    // Use a regular expression to test if the date is in YYYY-MM-DD format
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(date);
  };

  // Define a helper function for checking if a user id is valid
  const isValidUser = userId => {
    // Use Array.prototype.some to check if there is a user with that id in the users array
    return users.some(user => user.id === userId);
  };

  // Return the JSX element for rendering the form
  return (
    <div className="todo-form">
      <h1>{todoId ? 'Edit Todo' : 'Create Todo'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" value={fields.title} onChange={handleChange} />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" value={fields.description} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="deadline">Deadline</label>
          <input type="text" id="deadline" name="deadline" value={fields.deadline} onChange={handleChange} />
          {errors.deadline && <span className="error">{errors.deadline}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="assignee_id">Assignee</label>
          <select id="assignee_id" name="assignee_id" value={fields.assignee_id} onChange={handleChange}>
            <option value="">Select a user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
          {errors.assignee_id && <span className="error">{errors.assignee_id}</span>}
        </div>
        <button type="submit">{todoId ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

// Export the TodoForm component
export default TodoForm;
