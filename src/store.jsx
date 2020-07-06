import React, { createContext, useReducer } from 'react'

const initialState = {
  auth: {
    authenticated: undefined,
    user: undefined,
  },
  snackbar: {
    open: false,
    severity: undefined,
    text: undefined,
  },
}

const AuthStateContext = createContext(initialState.auth)
const SnackbarStateContext = createContext(initialState.snackbar)
const DispatchContext = createContext(undefined)

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((innerState, action) => {
    switch (action.type) {
      case 'login':
        return {
          ...innerState,
          auth: {
            user: action.payload,
            authenticated: true,
          },
        }
      case 'logout':
        return {
          ...innerState,
          auth: {
            user: null,
            authenticated: false,
          },
        }
      case 'openSnackBar':
        return {
          ...innerState,
          snackbar: {
            ...action.payload,
            open: true,
          },
        }
      case 'closeSnackBar':
        return {
          ...innerState,
          snackbar: {
            ...innerState.snackbar,
            open: false,
          },
        }
      default:
        throw new Error()
    }
  }, initialState)

  return (
    <AuthStateContext.Provider value={state.auth}>
      <SnackbarStateContext.Provider value={state.snackbar}>
        <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
      </SnackbarStateContext.Provider>
    </AuthStateContext.Provider>
  )
}

export { AuthStateContext, SnackbarStateContext, DispatchContext, StateProvider }
