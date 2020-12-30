import React, { useContext, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Container, Box, Typography } from '@material-ui/core'
import { doCreateUserWithEmailAndPassword } from '../firebase/auth'
import { firestore } from '../firebase/firebase'
import { withRouter } from 'react-router-dom'
import { DispatchContext } from '../store'
import { severity } from '../snackbar/CustomizedSnackbar'

function Register(props) {
  const { register, handleSubmit, errors, formState, watch } = useForm({
    mode: 'onChange',
  })
  const dispatch = useContext(DispatchContext)

  //Snackbar
  const openSnackbar = useCallback(
    (severity, text) => {
      dispatch({ type: 'openSnackBar', payload: { severity, text } })
    },
    [dispatch]
  )

  const handleRegister = (data) => {
    doCreateUserWithEmailAndPassword(data.email, data.password)
      .then((response) => {
        if (response) {
          const user = {
            id: response.user.uid,
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
            preferred_name: `${data.first_name} ${data.last_name}`,
          }
          firestore
            .collection('users')
            .doc(response.user.uid)
            .set(user)
            .then(() => {
              openSnackbar(severity.INFO, 'User created.')
              props.history.push('/home')
            })
            .catch((e) => openSnackbar(severity.ERROR, e.message))
        }
      })
      .catch((e) => openSnackbar(severity.ERROR, e.message))
  }

  return (
    <Container maxWidth='sm'>
      <form onSubmit={handleSubmit(handleRegister)}>
        <Box p={5}>
          <Typography variant='h4' color='white' align='center'>
            Register
          </Typography>
        </Box>
        <input
          name='first_name'
          placeholder='First Name'
          type='text'
          ref={register({
            required: 'First name is required',
            pattern: {
              value: /^[A-Za-z]+$/i,
              message: 'First name is invalid',
            },
          })}
        />
        <input
          name='last_name'
          placeholder='Last Name'
          type='text'
          ref={register({
            required: 'Last name is required',
            pattern: {
              value: /^[A-Za-z]+$/i,
              message: 'Last name is invalid',
            },
          })}
        />
        <input
          name='email'
          placeholder='Email'
          ref={register({
            required: 'Email is required',
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
            required: 'Password is required',
            pattern: {
              value: /^[A-Za-z]+$/i,
              message: 'Invalid password',
            },
          })}
        />
        <input
          type='password'
          name='new_password'
          ref={register({
            validate: (value) =>
              value === watch('password') || "Passwords don't match.",
            required: 'Confirm password is required',
          })}
          placeholder='Confirm Password'
          required
        />
        <input type='submit' disabled={!formState.isValid} value='REGISTER' />

        {errors.first_name && (
          <Typography className='warning'>
            {errors.first_name.message}
          </Typography>
        )}
        {errors.last_name && (
          <Typography className='warning'>
            {errors.last_name.message}
          </Typography>
        )}
        {errors.email && (
          <Typography className='warning'>{errors.email.message}</Typography>
        )}
        {errors.password && (
          <Typography className='warning'>{errors.password.message}</Typography>
        )}
        {errors.new_password && (
          <Typography className='warning'>
            {errors.new_password.message}
          </Typography>
        )}
      </form>
    </Container>
  )
}

export default withRouter(Register)
