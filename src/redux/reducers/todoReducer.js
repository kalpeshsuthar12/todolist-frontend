const initialState = {
  list: [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TODOLIST":
      return {
        ...state,
        list: action.payload.list,
      };

    case "ADD_TODO":
      return {
        ...state,
        list: [
          ...state.list,
          {
            id: action.payload.id,
            user: action.payload.user,
            title: action.payload.title,
            completed: false,
          },
        ],
      };

    case "UPDATE_TODO":
      const updateIndex = state.list.findIndex(
        (item) => item._id === action.payload.id
      );
      state.list[updateIndex].title = action.payload.title;
      return {
        ...state,
        list: [...state.list],
      };

    case "DELETE_TODO":
      const newlist = state.list.filter(
        (item) => item._id !== action.payload.id
      );
      return {
        ...state,
        list: newlist,
      };

    case "COMPLETED_TODO":
      const objIndex = state.list.findIndex(
        (item) => item._id === action.payload.id
      );
      state.list[objIndex].completed = action.payload.completed
      return {
        ...state,
        list: [...state.list],
      };

    default:
      return state;
  }
};
export default todoReducer;
