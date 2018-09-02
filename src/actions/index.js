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
function userLoginSuccess(userData, username) {
  console.log(userData);
  return {
    username,
    type: USER_LOGIN_SUCCESS,
    data: userData,
  }
}

export const USER_LOGIN = 'USER_LOGIN'
// This is the action async action that dispatch multiple actions
export function userLogin(username, password) {
  let data = new FormData();
  data.append('grant_type', 'password');
  data.append('client_id', '2');
  data.append('client_secret', '8vSMMQIWdgm6RqxR4r3a9yaMSk37dlP5alzL6ViL');
  data.append('username', username);
  data.append('password', password);
  data.append('scope', '*');
  return dispatch => {
    dispatch(userLoginRequest(username))
    fetch(`http://learn/oauth/token`, {
      method: 'POST',
      body: data,
      headers: {
        
      },
    })
      .then(response => response.json())
      .then(json => dispatch(userLoginSuccess(json, username)))
  }
}

function appLoadRequest() {
  return {
    type: 'APP_LOAD_REQUEST',
  }
}

function appLoadSuccess(data) {
  return {
    type: 'APP_LOAD_SUCCESS',
    data: data
  }
}

export function appLoad() {
  return dispatch => {
    dispatch(appLoadRequest())
    fetch(`https://www.reddit.com/r/dota2.json`)
      .then(response => response.json)
      .then(json => dispatch(appLoadSuccess(json)))
  }
}