import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Container, Box, Button, Typography } from '@material-ui/core'
import { doCreateUserWithEmailAndPassword } from '../firebase/auth'

export default function Register(props) {
  const { register, handleSubmit, errors, formState, watch } = useForm({ mode: 'onChange' })
  const [error, setError] = useState('')

  const handleRegister = (data) => {
    const promise = doCreateUserWithEmailAndPassword(data.email, data.password)
    promise
      .then((user) => {
        if (user) props.history.push('/home')
      })
      .catch((e) => setError(e.message))
  }

  return (
    <>
      <Typography variant='h4' color='primary' align='center'>
        Register
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
            pattern: {
              value: /^[A-Za-z]+$/i,
              message: 'Invalid password',
            },
          })}
        />

        <input
          type='password'
          name='newPassword'
          ref={register({
            validate: (value) => value === watch('password') || "Passwords don't match.",
            required: 'confirm password is required',
          })}
          placeholder='Confirm Password'
          required
        />

        <input type='submit' disabled={!formState.isValid} onClick={handleSubmit(handleRegister)} value='REGISTER' />

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
        {errors.password && <Typography className='warning'>{errors.password.message}</Typography>}
        {errors.newPassword && <Typography className='warning'>{errors.newPassword.message}</Typography>}
      </Container>
    </>
  )
}
