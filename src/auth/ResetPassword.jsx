import React, { useState, useContext, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Container, Box, Button, Typography } from '@material-ui/core'
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
    doPasswordReset(e.email)
      .then(() => {
        openSnackbar(severity.INFO, 'Email Sent.')
      })
      .catch((e) => openSnackbar(severity.ERROR, e.message))
  }

  return (
    <Container maxWidth='sm'>
      <form onSubmit={handleSubmit(handlePasswordReset)}>
        <Box p={5}>
          <Typography variant='h4' color='primary' align='center'>
            Reset Password
          </Typography>
        </Box>
        <input
          name='email'
          placeholder='Email'
          ref={register({
            required: 'email is required',
            pattern: {
              value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: 'Invalid email address',
            },
          })}
        />

        <input type='submit' disabled={!formState.isValid} value='RESET PASSWORD' />
        <Box color='primary.contrastText' display='flex' style={{ marginBottom: '1em' }}>
          <Button
            variant='contained'
            color='primary'
            onClick={() => {
              props.setPage('login')
            }}>
            Login
          </Button>
        </Box>
        {error && <Typography className='warning'>{error}</Typography>}
        {errors.email && <Typography className='warning'>{errors.email.message}</Typography>}
      </form>
    </Container>
  )
}
