// index.js

// Import React and other dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import feathers from '@feathersjs/client';

// Import the store, routes, and styles
import store from './store';
import Routes from './routes';
import './styles/index.css';

// Create a Feathers client and connect to the backend API
const app = feathers();
const restClient = feathers.rest('http://localhost:3000');
app.configure(restClient.fetch(window.fetch));

// Render the app to the root element
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Routes app={app} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
