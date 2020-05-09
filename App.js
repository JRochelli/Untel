import React from 'react'
import Navigation from './components/Navigation'
import { Provider } from 'react-redux'
import Store from './components/configureStore'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={Store}>
        <Navigation/>
      </Provider>
    )
  }
}