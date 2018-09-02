import fetch from 'cross-fetch'

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST'
// Internal function to return request action
function userLoginRequest(username) {
  return {
    type: USER_LOGIN_REQUEST,
    username,
  }
}

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
// Internal function to when a user login successfully
function userLoginSuccess(userData) {
  console.log(userData);
  return {
    type: USER_LOGIN_SUCCESS,
    data: userData,
  }
}

export const USER_LOGIN = 'USER_LOGIN'
// This is the action async action that dispatch multiple actions
export function userLogin(username, password) {
  return dispatch => {
    dispatch(userLoginRequest(username))
    fetch(`https://www.reddit.com/r/reactjs.json`)
      .then(response => response.json)
      .then(json => dispatch(userLoginSuccess(json)))
  }
}