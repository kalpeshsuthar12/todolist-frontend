export const todolist = (list) => {
  return {
    type: "TODOLIST",
    payload: {
        list : list
    }
  };
};

export const addtodo = (id, user, title) => {
  return {
    type: "ADD_TODO",
    payload: {
      id:id,
      user:user,
      title: title,
      completed: false,
    },
  };
};

export const updatetodo = (id, title) => {
  return {
    type: "UPDATE_TODO",
    payload: {
      id: id,
      title: title
    },
  };
};

export const deletetodo = (id) => {
  return {
    type: "DELETE_TODO",
    payload: {
      id: id,
    },
  };
};

export const completedtodo = (id, completed) => {
    return {
      type: "COMPLETED_TODO",
      payload: {
        id: id,
        completed : completed
      },
    };
};
