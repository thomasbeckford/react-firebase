import React, { useState, useContext, useCallback } from 'react'
import { DispatchContext } from '../store'
import { useForm } from 'react-hook-form'
import { severity } from '../snackbar/CustomizedSnackbar'
import { Box, Button, Typography } from '@material-ui/core'
import { doCreateUserWithEmailAndPassword } from '../firebase/auth'

export default function Register(props) {
  const dispatch = useContext(DispatchContext)
  const { register, handleSubmit, errors, formState, watch } = useForm({
    mode: 'onChange',
  })
  const [error, setError] = useState('')

  const handleRegister = (data) => {
    const promise = doCreateUserWithEmailAndPassword(data.email, data.password)
    promise
      .then((user) => {
        if (user) {
          openSnackbar(severity.INFO, 'Authenticated.')
          props.history.push('/home')
        }
      })
      .catch((e) => setError(e.message))
  }

  //Snackbar
  const openSnackbar = useCallback(
    (severity, text) => {
      dispatch({ type: 'openSnackBar', payload: { severity, text } })
    },
    [dispatch]
  )

  return (
    <div className="sign-in">
      <div>
        <Typography variant="h4" color="primary" align="center">
          Register
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
            name="email"
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
            name="password"
            placeholder="Password"
            type="password"
            ref={register({
              required: 'password is required',
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: 'Invalid password',
              },
            })}
          />
          {errors.password && (
            <p className="warning">{errors.password.message}</p>
          )}

          <input
            type="password"
            name="newPassword"
            ref={register({
              validate: (value) => value === watch('password'),
              required: 'confirm password is required',
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: 'Invalid password',
              },
            })}
            placeholder="Confirm Password"
            required
          />
          {errors.password && (
            <p className="warning">{errors.newPassword.message}</p>
          )}
          <input
            type="submit"
            disabled={!formState.isValid}
            onClick={handleSubmit(handleRegister)}
            value="REGISTER"
          />
        </form>
      </div>
    </div>
  )
}
