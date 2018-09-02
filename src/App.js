import React from 'react'
import configureStore from './configureStore'
import RootApp from './RootApp'
import { Provider } from 'react-redux'
import {appLoad} from './actions'

const store = configureStore();
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