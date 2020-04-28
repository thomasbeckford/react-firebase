import React, { useContext, useEffect, useState, useCallback } from 'react'
import { Switch } from "react-router-dom"
import { withRouter, Route } from 'react-router'
import { AuthStateContext, DispatchContext } from './store'
import Login from './auth/Login'
import routes from './navigation/routes'
import * as firebase from 'firebase';
import Navbar from './navbar/navbar'
import CustomizedSnackbar, { severity } from './snackbar/CustomizedSnackbar'

function App (props) {
  console.log("Entra a APP")
  
  const authState = useContext(AuthStateContext)
  const dispatch = useContext(DispatchContext);
  const [isLoading, setLoading] = useState(true);

  //Snackbar
	const openSnackbar = useCallback((severity, text) => {
		dispatch({ type: 'openSnackBar', payload: { severity, text }})
	}, [dispatch])

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch({ type: 'login', payload: user.email });
        props.history.push('/home')
        console.log(user)
        openSnackbar(severity.INFO, "Your IN motherfucker.")
      } 
      setLoading(false)
    });
    return () => {
      unsubscribe();
    };
  }, [props.history, dispatch, openSnackbar]);


  const closeSnackbar = (event, reason) => {
		dispatch({ type: 'closeSnackBar' })
	}

  const innerContent = (
    <div>
      {!authState?.authenticated ?
      <Route exact path={"/"} component={Login} />
      :
        <Switch>
        {console.log(authState)}
        {routes.mainPages.map((page) => {
            const CurrentComponent = page.component
            return (
              <Route key={page.route[0]} path={page.route}>
                <Navbar />
                  <CurrentComponent />
              </Route>
            )
        })}
        </Switch>
      }
    </div>
  )
  
  if(isLoading) return <p>Loading..</p>
  return (
		<React.Fragment>
			{ innerContent }
      <CustomizedSnackbar
				handleClose={() => closeSnackbar()}
			></CustomizedSnackbar>
		</React.Fragment>
  )

}


export default withRouter(App)