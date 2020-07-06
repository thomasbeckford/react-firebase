import React, { useContext, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Container, Box, Button, Typography } from '@material-ui/core'
import { doSignInWithEmailAndPassword } from '../firebase/auth'
import { withRouter } from 'react-router'
import { DispatchContext } from '../store'
import { severity } from '../snackbar/CustomizedSnackbar'

function Login(props) {
  const { register, handleSubmit, errors, formState } = useForm({ mode: 'onChange' })
  const dispatch = useContext(DispatchContext)

  //Snackbar
  const openSnackbar = useCallback(
    (severity, text) => {
      dispatch({ type: 'openSnackBar', payload: { severity, text } })
    },
    [dispatch]
  )

  const handleEmailLogin = (data) => {
    doSignInWithEmailAndPassword(data.email, data.password)
      .then((user) => {
        // auth.currentUser.getIdToken(true).then((token) => {
        dispatch({ type: 'login', payload: user })
        // document.cookie = '__session=' + token + ';max-age=3600'
        // })
        props.history.push('/home')
      })
      .catch((e) => openSnackbar(severity.ERROR, e.message))
  }

  return (
    <Container maxWidth='sm'>
      <form onSubmit={handleSubmit(handleEmailLogin)}>
        <Box p={5}>
          <Typography variant='h4' color='primary' align='center'>
            Login
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

        <input
          name='password'
          placeholder='Password'
          type='password'
          ref={register({
            required: 'password is required',
          })}
        />
        <Box color='primary.contrastText' display='flex'>
          <Button
            variant='contained'
            color='primary'
            onClick={() => {
              props.setPage('resetpassword')
            }}>
            FORGOT PASSWORD?
          </Button>
        </Box>
        <input
          type='submit'
          disabled={!formState.isValid}
          //
          value='LOG IN'
        />

        <Box color='primary.contrastText' display='flex' style={{ marginBottom: '1em' }}>
          <Button
            variant='contained'
            color='primary'
            onClick={() => {
              props.setPage('register')
            }}>
            Register
          </Button>
        </Box>

        {errors.email && <Typography className='warning'>{errors.email.message}</Typography>}
        {errors.password && <Typography className='warning'>{errors.password.message}</Typography>}
      </form>
    </Container>
  )
}

export default withRouter(Login)
