const initialState = {
    todos: [],
  };
  
  const todoReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_TODO':
        return {
          todos: [
            {
              text: action.payload.text,
              complete: false,
              editing: false,
              category: action.payload.category,
              priority: action.payload.priority,
            },
            ...state.todos,
          ],
        };
      case 'TOGGLE_COMPLETE':
        return {
          ...state,
          todos: state.todos.map((todo, index) =>
            index === action.payload ? { ...todo, complete: !todo.complete } : todo
          ),
        };
      case 'EDIT_TODO':
        return {
          ...state,
          todos: state.todos.map((todo, index) =>
            index === action.payload.index ? { ...todo, text: action.payload.text, editing: false } : todo
          ),
        };
      case 'DELETE_TODO':
        return { todos: state.todos.filter((_, index) => index !== action.payload) };
      case 'SET_EDITING':
        return {
          ...state,
          todos: state.todos.map((todo, index) =>
            index === action.payload ? { ...todo, editing: !todo.editing } : todo
          ),
        };
      default:
        return state;
    }
  };
  
  export { initialState, todoReducer };