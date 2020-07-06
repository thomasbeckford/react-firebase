import React, { useContext, useEffect } from 'react'
import { Switch } from 'react-router-dom'
import { withRouter, Route } from 'react-router'
import { AuthStateContext, DispatchContext } from './store'
import AuthRouter from './auth/AuthRouter'
import routes from './navigation/routes'
import Navbar from './navbar/navbar'
import CustomizedSnackbar from './snackbar/CustomizedSnackbar'
import PageNotFound from './pageNotFound'
import './App.css'
import { auth } from './firebase/firebase'

function App(props) {
  const authState = useContext(AuthStateContext)
  const dispatch = useContext(DispatchContext)

  const closeSnackbar = () => {
    dispatch({ type: 'closeSnackBar' })
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({ type: 'login', payload: user.email })
      } else {
        dispatch({ type: 'logout', payload: null })
      }
    })
  }, [dispatch])

  const innerContent = (
    <>
      <Route exact path={'/'} component={AuthRouter} />
      <Switch>
        {routes.mainPages.map((page) => {
          const CurrentComponent = page.component
          return (
            <Route key={page.route[0]} path={page.route}>
              <Navbar />
              <CurrentComponent user={authState?.user} />
            </Route>
          )
        })}
        <Route component={PageNotFound} />
      </Switch>
    </>
  )

  return (
    <React.Fragment>
      {innerContent}
      <CustomizedSnackbar handleClose={() => closeSnackbar()} />
    </React.Fragment>
  )
}

export default withRouter(App)
