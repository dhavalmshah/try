// RegisterForm.jsx

// Import React and other dependencies
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Import the actions
import { register } from '../store/actions';

// Define the RegisterForm component
const RegisterForm = ({ app }) => {
  // Get the history object from React Router
  const history = useHistory();

  // Define the initial state for the form fields
  const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  // Define a state variable for the form fields and a setter function
  const [fields, setFields] = useState(initialState);

  // Define a state variable for the form errors and a setter function
  const [errors, setErrors] = useState({});

  // Get the dispatch function from the store
  const dispatch = useDispatch();

  // Define a handler for submitting the form
  const handleSubmit = async event => {
    // Prevent the default browser behavior of reloading the page
    event.preventDefault();

    // Validate the form fields and set errors if any
    const errors = validateFields(fields);
    setErrors(errors);

    // If there are no errors, proceed with registering the user
    if (Object.keys(errors).length === 0) {
      // Dispatch the register action with the fields and app
      dispatch(register({
        ...fields,
        app
      }));

      // Redirect to the home page
      history.push('/');
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

    // Check if the name field is empty
    if (!fields.name) {
      errors.name = 'Name is required';
    }

    // Check if the email field is empty or invalid
    if (!fields.email || !isValidEmail(fields.email)) {
        errors.email = 'Email is required and must be valid';
      }
  
      // Check if the password field is empty or too short
      if (!fields.password || fields.password.length < 8) {
        errors.password = 'Password is required and must be at least 8 characters long';
      }
  
      // Check if the confirm password field matches the password field
      if (fields.confirmPassword !== fields.password) {
        errors.confirmPassword = 'Passwords do not match';
      }
  
      // Return the errors object
      return errors;
    };
  
    // Define a helper function for checking if an email string is valid
    const isValidEmail = email => {
      // Use a regular expression to test if the email is in a valid format
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return regex.test(email);
    };
  
    // Return the JSX element for rendering the form
    return (
      <div className="register-form">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={fields.name} onChange={handleChange} />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={fields.email} onChange={handleChange} />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={fields.password} onChange={handleChange} />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" value={fields.confirmPassword} onChange={handleChange} />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    );
  };
  
  // Export the RegisterForm component
  export default RegisterForm;
  