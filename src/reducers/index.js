import { combineReducers } from 'redux'
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS
} from '../actions'

function userReducer(state = { username: '', isLoggingIn = false, userData: null }, action) {
  switch (action.type) {
    case USER_LOGIN_REQUEST: 
      return {
        username: '',
        isLoggingIn: true,
        userData: null
      }
    case USER_LOGIN_SUCCESS:
      return {
        username: action.data.username,
        isLoggingIn: false,
        userData: action.data
      }
    default:
      return state;
  }
}

const rootReducers = combineReducers({
  userReducer
})
export default rootReducers