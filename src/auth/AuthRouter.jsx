import React from 'react'
import Login from './Login'
import Register from './Register'
import ResetPassword from './ResetPassword'
import { auth } from '../firebase/firebase'

export default function AuthRouter(props) {
  const [page, setPage] = React.useState()

  if (page === 'register') return <Register setPage={setPage} />
  if (page === 'login') return <Login setPage={setPage} />
  if (page === 'resetpassword') return <ResetPassword setPage={setPage} />

  auth.onAuthStateChanged((user) => {
    if (user) props.history.push('/home')
    else setPage('login')
  })

  return null
}
