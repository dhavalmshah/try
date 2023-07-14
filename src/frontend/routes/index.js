// index.js

// Import React and other dependencies
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Import the components
import ProjectList from '../components/ProjectList';
import ProjectDetails from '../components/ProjectDetails';
import TodoForm from '../components/TodoForm';
import UserList from '../components/UserList';
import UserItem from '../components/UserItem';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

// Define the Routes component
const Routes = ({ app }) => {
  // Return the JSX element for rendering the routes
  return (
    <Switch>
      <Route exact path="/">
        <ProjectList app={app} />
      </Route>
      <Route exact path="/projects/:projectId">
        <ProjectDetails app={app} />
      </Route>
      <Route exact path="/projects/:projectId/todos/create">
        <TodoForm app={app} />
      </Route>
      <Route exact path="/projects/:projectId/todos/:todoId/edit">
        <TodoForm app={app} />
      </Route>
      <Route exact path="/projects/:projectId/users">
        <UserList app={app} />
      </Route>
      <Route exact path="/users/:userId">
        <UserItem app={app} />
      </Route>
      <Route exact path="/login">
        <LoginForm app={app} />
      </Route>
      <Route exact path="/register">
        <RegisterForm app={app} />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};

// Export the Routes component
export default Routes;
