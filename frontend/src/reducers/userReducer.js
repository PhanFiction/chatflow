const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data;
    default:
      return state;
  }
};

export const setUser = (auth) => async (dispatch) => {
  console.log(auth);
  dispatch({
    type: 'SET_USER',
    data: {
      userId: auth.userId,
    },
  });
};

export default userReducer;
