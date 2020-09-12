const repositoriesReducerDefaultState = {};

export default (state = repositoriesReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_REPOSITORIES':
      return action.payload;
    default: 
      return state;
  }
};