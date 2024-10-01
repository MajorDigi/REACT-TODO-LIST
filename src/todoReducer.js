const initialState = {
  todo: [],
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        todo: [
          {
            text: action.payload.text,
            complete: false,
            editing: false,
            category: action.payload.category,
            priority: action.payload.priority,
          },
          ...state.todo,
        ],
      };
    case 'TOGGLE_COMPLETE':
      return {
        ...state,
        todo: state.todo.map((todo, index) =>
          index === action.payload ? { ...todo, complete: !todo.complete } : todo
        ),
      };
    case 'EDIT_TODO':
      return {
        ...state,
        todo: state.todo.map((todo, index) =>
          index === action.payload.index ? { ...todo, text: action.payload.text, editing: true} : todo
        ),
      };
    case 'EDIT_CATEGORY':
          return {
            ...state,
            category: state.category.map((category, index) =>
              index === action.payload.index ? { ...category, text: action.payload.text, editing: false } : category
            ),
      };
    case 'DELETE_TODO':
      return { todo: state.todo.filter((_, index) => index !== action.payload) };
    case 'SET_EDITING':
      return {
        ...state,
        todo: state.todo.map((todo, index) =>
          index === action.payload ? { ...todo, editing: !todo.editing } : todo
        ),
      };
    default:
      return state;
  }
};

export { initialState, todoReducer };