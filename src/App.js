import React from 'react'
import configureStore from './configureStore'
import RootApp from './RootApp'
import { Provider } from 'react-redux'
import {appLoad} from './actions'

// Load from local state about user.
const persistedState = localStorage.getItem('reduxState') 
  ? JSON.parse(localStorage.getItem('reduxState')) 
  : null
const preloadedState = persistedState != null
  ? Object.assign(persistedState, {appInit: {appIsLoading: true, appData: null}})
  : null;

let store = null;
if (preloadedState != null) {
  store = configureStore(preloadedState);
} else {
  store = configureStore();
}

store.subscribe(()=>{
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

store.dispatch(appLoad())

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootApp />
      </Provider>
    )
  }
}