import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Container, Box, Button, Typography } from '@material-ui/core'
import { doSignInWithEmailAndPassword } from '../firebase/auth'

export default function Login(props) {
  const { register, handleSubmit, errors, formState } = useForm({ mode: 'onChange' })
  const [error, setError] = useState('')

  const handleEmailLogin = (data) => {
    const promise = doSignInWithEmailAndPassword(data.email, data.password)
    promise.catch((e) => {
      setError(e.message)
    })
  }

  return (
    <>
      <Typography variant='h4' color='primary' align='center'>
        Login
      </Typography>
      <Container maxWidth='sm'>
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
        <input type='submit' disabled={!formState.isValid} onClick={handleSubmit(handleEmailLogin)} value='LOG IN' />

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

        {error && <Typography className='warning'>{error}</Typography>}
        {errors.email && <Typography className='warning'>{errors.email.message}</Typography>}
        {errors.password && <Typography className='warning'>{errors.password.message}</Typography>}
      </Container>
    </>
  )
}
