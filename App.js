import React from 'react'
import Navigation from './Components/Navigation/Navigation'
import { Provider } from 'react-redux'
import store from './Components/Store/store'

export default function App() {
  return (
    <Provider store={store}>
       <Navigation/>
    </Provider>
  )
}
