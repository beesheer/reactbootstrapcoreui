import React from 'react'
import configureStore from './configureStore'
import RootApp from './RootApp'
import { Provider } from 'react-redux'

const store = configureStore();

store.subscribe((store) => {
  console.log(store.getState())
})
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootApp />
      </Provider>
    )
  }
}