import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter as Router } from 'react-router-dom'
import { StateProvider } from './store'
import { CssBaseline } from '@material-ui/core'

// Material UI Theme
import theme from './Theme'
import { ThemeProvider } from '@material-ui/core'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <StateProvider>
      <Router>
        <CssBaseline />
        <App />
      </Router>
    </StateProvider>
  </ThemeProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
