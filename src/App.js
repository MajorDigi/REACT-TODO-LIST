import React, { useReducer, useState } from 'react';
import './App.css'; // Include your CSS styles
import { initialState, todoReducer } from './todoReducer'; // Import the reducer

const App = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [newTodo, setNewTodo] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('');

  const handleAddTodo = () => {
    if (newTodo && category && priority) {
      dispatch({
        type: 'ADD_TODO',
        payload: { text: newTodo, category, priority },
      });
      setNewTodo('');
      setCategory('');
      setPriority('');
    } else {
      alert('Please fill in all fields'); 
    }
  };

  return (
    <div className="App">
      <h1> Major's To Do List </h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add To Do"
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
      />
      <input
        type="text"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        placeholder="Priority"
      />
      <button onClick={handleAddTodo}>Add To Do</button>
      {state.todos.map((todo, index) => (
        <div key={index} className={`todo-item ${todo.priority}`}>
          {todo.editing ? (
            <input
              type="text"
              value={todo.text} // Controlled input
              onChange={(e) => {
                dispatch({ type: 'EDIT_TODO', payload: { index, text: e.target.value } });
              }}
              onBlur={() => dispatch({ type: 'SET_EDITING', payload: index })} // Save on blur
            />
          ) : (
            <span>
              <input
                type="checkbox"
                checked={todo.complete}
                onChange={() => dispatch({ type: 'TOGGLE_COMPLETE', payload: index })}
              />
              {todo.text} - {todo.category} - {todo.priority}
            </span>
          )}
          <button onClick={() => dispatch({ type: 'SET_EDITING', payload: index })}>
            {todo.editing ? 'Save' : 'Edit'}
          </button>
          <button
            onClick={() => dispatch({ type: 'DELETE_TODO', payload: index })}
            disabled={!todo.complete}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default App;

