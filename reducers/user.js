const initialState = {
  uid: '',
  email: '',
  name: '',
}

export const SET_USER = 'SET_USER'

const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        uid: action.payload.uid,
      }
    default:
      return state
  }
}
export default user
