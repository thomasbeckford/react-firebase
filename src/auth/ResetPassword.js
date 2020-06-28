import React, { useState, useContext, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Box, Button, Typography } from '@material-ui/core'
import { doPasswordReset } from '../firebase/auth'
import { DispatchContext } from '../store'
import { severity } from '../snackbar/CustomizedSnackbar'

export default function ResetPassword(props) {
  const dispatch = useContext(DispatchContext)

  const { register, handleSubmit, errors, formState } = useForm({
    mode: 'onChange',
  })
  const [error, setError] = useState('')

  //Snackbar
  const openSnackbar = useCallback(
    (severity, text) => {
      dispatch({ type: 'openSnackBar', payload: { severity, text } })
    },
    [dispatch]
  )

  const handlePasswordReset = (e) => {
    setError(null)
    doPasswordReset(e.emailReset)
      .then(() => {
        openSnackbar(severity.INFO, 'Email Sent.')
      })
      .catch((e) => {
        setError(e.message)
      })
  }

  return (
    <div className="sign-in">
      <Typography variant="h4" color="primary" align="center">
        Reset Password
      </Typography>
      <Box color="primary.contrastText" display="flex">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            props.setPage('login')
          }}
        >
          Login
        </Button>
      </Box>
      <form>
        {error && <p className="warning">{error}</p>}
        <input
          name="emailReset"
          placeholder="Email"
          ref={register({
            required: 'email is required',
            pattern: {
              value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: 'Invalid email address',
            },
          })}
        />
        {errors.email && <p className="warning">{errors.email.message}</p>}
        <input
          type="submit"
          disabled={!formState.isValid}
          onClick={handleSubmit(handlePasswordReset)}
          value="RESET PASSWORD"
        />
      </form>
    </div>
  )
}
