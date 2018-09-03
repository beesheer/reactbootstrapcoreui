import fetch from 'cross-fetch'
import { appConfig } from '../app-config'

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
  // Using laravel passport to login and get access token from a local instance.
  // TODO: move a gitignore config file to store all the sensitive information
  let data = new FormData();
  data.append('grant_type', appConfig.auth.grantType);
  data.append('client_id', appConfig.auth.clientId);
  data.append('client_secret', appConfig.auth.secret);
  data.append('username', username);
  data.append('password', password);
  data.append('scope', '*');
  return dispatch => {
    dispatch(userLoginRequest(username))
    fetch(appConfig.auth.baseUrl, {
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