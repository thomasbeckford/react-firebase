import React, { useContext, useEffect } from 'react'
import { Switch, Redirect } from 'react-router-dom'
import { withRouter, Route } from 'react-router'
import { AuthStateContext, DispatchContext } from './store'
import AuthRouter from './auth/AuthRouter'
import routes from './navigation/routes'
import firebase from 'firebase/app'
import Navbar from './navbar/navbar'
import CustomizedSnackbar from './snackbar/CustomizedSnackbar'
import PageNotFound from './pageNotFound'
import './App.css'

function App(props) {
  const authState = useContext(AuthStateContext)
  const dispatch = useContext(DispatchContext)

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch({ type: 'login', payload: user.email })
        props.history.push('/home')
      }
    })

    return () => {
      unsubscribe()
    }
  }, [props.history, dispatch])

  const closeSnackbar = () => {
    dispatch({ type: 'closeSnackBar' })
  }

  const innerContent = (
    <div>
      <Route exact path={'/'} component={AuthRouter} />
      {authState?.authenticated !== false ? (
        <Switch>
          {routes.mainPages.map((page) => {
            const CurrentComponent = page.component
            return (
              <Route key={page.route[0]} path={page.route}>
                <Navbar />
                <CurrentComponent />
              </Route>
            )
          })}
          <Route component={PageNotFound} />
        </Switch>
      ) : (
        <Redirect to='/' />
      )}
    </div>
  )

  return (
    <React.Fragment>
      {innerContent}
      <CustomizedSnackbar handleClose={() => closeSnackbar()} />
    </React.Fragment>
  )
}

export default withRouter(App)
