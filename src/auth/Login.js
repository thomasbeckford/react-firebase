import React, { useState,useContext, useCallback } from 'react';
import { DispatchContext } from '../store'
import './login.css';
import * as firebase from 'firebase';
import { useForm } from 'react-hook-form';
import { severity } from '../snackbar/CustomizedSnackbar'

export default function Login(props) {

  const dispatch = useContext(DispatchContext);
  const { register, handleSubmit, errors } = useForm();
  const [error, setError] = useState('');

  const handleEmailLogin = (data) => {
    const promise = firebase.auth().signInWithEmailAndPassword(data.email, data.password);
    promise.catch((e) => setError(e.message));
  };

  const handleRegister = (data) => {
    const promise = firebase.auth().createUserWithEmailAndPassword(data.email, data.password);
    promise
      .then((user) => {
        if(user){
          openSnackbar(severity.INFO, "Authenticated.")
          props.history.push('/home')
        }
      })
      .catch((e) => setError(e.message));
  };

  //Snackbar
	const openSnackbar = useCallback((severity, text) => {
		dispatch({ type: 'openSnackBar', payload: { severity, text }})
	}, [dispatch])

  return (
    <div className="sign-in">
      <div>
        <h1>Welcome to my WebApp</h1>
        <form>
        {error && <p>{error}</p>}
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
          {errors.email && <p>{errors.email.message}</p>}
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
          {errors.password && <p>{errors.password.message}</p>}
          <input type="submit" onClick={handleSubmit(handleEmailLogin)} value="LOG IN" />
          <input type="submit" onClick={handleSubmit(handleRegister)} value="REGISTER" />
        </form>
      </div>
    </div>

  );
}
