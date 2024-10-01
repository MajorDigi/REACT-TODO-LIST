import React, { useReducer, useState } from "react";
import TodoList from "./ToDoList"; 

const initialState = [
    { id: 1, text: "Find that missing sock", complete: false },
    { id: 2, text: "Learn React", complete: false },
];

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [{ id: Date.now(), text: action.text, complete: false }, ...state];
        case 'TOGGLE_TODO':
            return state.map(todo => 
                todo.id === action.id ? { ...todo, complete: !todo.complete } : todo
            );
        case 'EDIT_TODO':
            return state.map(todo => 
                todo.id === action.id ? { ...todo, text: action.text } : todo
            );
        case 'DELETE_TODO':
            return state.filter(todo => todo.id !== action.id);
        default:
            return state;
    }
};

const App = () => {
    const [todos, dispatch] = useReducer(reducer, initialState);
    const [newTodo, setNewTodo] = useState("");
    const [editTodoId, setEditTodoId] = useState(null);
    const [editTodoText, setEditTodoText] = useState("");

    const handleAddTodo = () => {
        if (newTodo) {
            dispatch({ type: 'ADD_TODO', text: newTodo });
            setNewTodo("");
        }
    };

    const handleEditChange = (id, text) => {
        setEditTodoId(id);
        setEditTodoText(text);
    };

    const handleSaveEdit = (id) => {
        dispatch({ type: 'EDIT_TODO', id, text: editTodoText });
        setEditTodoId(null);
        setEditTodoText("");
    };
return (
        <div>
            <h1>Todo List</h1>
            <input 
                type="text" 
                value={newTodo} 
                onChange={e => setNewTodo(e.target.value)} 
                placeholder="Add a new todo" 
            />
            <button onClick={handleAddTodo}>Add</button>
            <TodoList 
                todos={todos} 
                dispatch={dispatch} 
                editTodoId={editTodoId} 
                editTodoText={editTodoText}
                handleEditChange={handleEditChange}
                handleSaveEdit={handleSaveEdit}
            />
        </div>
    );
};

export default App;

