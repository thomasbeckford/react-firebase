import React from 'react'
import Login from './Login'
import Register from './Register'
import ResetPassword from './ResetPassword'

export default function AuthRouter() {
  const [page, setPage] = React.useState('login')

  if (page === 'register') return <Register setPage={setPage} />
  if (page === 'login') return <Login setPage={setPage} />
  if (page === 'resetpassword') return <ResetPassword setPage={setPage} />
}
