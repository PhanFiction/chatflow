const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data;
    default:
      return state;
  }
};

export const setUser = (user, id) => async (dispatch) => {
  dispatch({
    type: 'SET_USER',
    data: {
      name: user,
      id,
    },
  });
};

export default userReducer;
