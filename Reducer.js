const initialState = { userEmail: "null", userId : "null"}

function manageUser(state = initialState, action) {
  let nextState;
  const email = state.userEmail
  const id = state.userId
  switch (action.type) {
    case 'CONNECT': 
        if (email == "null"){
            nextState = {
            ...state,
            userEmail: action.value,
            }
        }
        return nextState || state
    case 'SETID':
      if (id == "null")
      { 
        nextState = {
          ...state,
          userId: action.value
        }
      }
      return nextState || state


    default:
        return state
  }
}

export default manageUser;