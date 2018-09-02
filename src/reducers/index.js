import { combineReducers } from 'redux'
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS
} from '../actions'

// This is the reducer to prepare for the app, for example, loading 
function appInit(state = {appIsLoading: true, appData: null}, action) {
  switch (action.type) {
    case 'APP_LOAD_REQUEST':
      return {
        appIsLoading: true,
        appData: {}
      }
    case 'APP_LOAD_SUCCESS':
      return {
        appIsLoading: false,
        appData: action.data
      }
    default:
      return state
  }
}

function user(state = { username: '', isLoggingIn: false, userData: null }, action) {
  switch (action.type) {
    case USER_LOGIN_REQUEST: 
      return {
        username: '',
        isLoggingIn: true,
        userData: null
      }
    case USER_LOGIN_SUCCESS:
      return {
        username: action.username,
        isLoggingIn: false,
        userData: action.data
      }
    default:
      return state;
  }
}

const rootReducers = combineReducers({
  appInit,
  user
})
export default rootReducers