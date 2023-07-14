// TodoItem.jsx

// Import React and other dependencies
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// Import the actions and selectors
import { toggleTodo, deleteTodo } from '../store/actions';
import { selectTodoById } from '../store/selectors';

// Define the TodoItem component
const TodoItem = ({ id, app }) => {
  // Get the todo from the state using the id prop
  const todo = useSelector(state => selectTodoById(state, id));

  // Get the dispatch function from the store
  const dispatch = useDispatch();

  // Define a handler for toggling the todo's completion status
  const handleToggle = async () => {
    // Dispatch the toggleTodo action with the todo id and app
    dispatch(toggleTodo({
      id,
      app
    }));
  };

  // Define a handler for deleting the todo
  const handleDelete = async () => {
    // Dispatch the deleteTodo action with the todo id and app
    dispatch(deleteTodo({
      id,
      app
    }));
  };

  // Return the JSX element for rendering the todo item
  return (
    <div className="todo-item">
      <input type="checkbox" checked={todo.completed} onChange={handleToggle} />
      <span className={`todo-title ${todo.completed ? 'completed' : ''}`}>{todo.title}</span>
      <span className="todo-deadline">{todo.deadline}</span>
      <Link to={`/users/${todo.assignee.id}`} className="todo-assignee">{todo.assignee.name}</Link>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

// Export the TodoItem component
export default TodoItem;
