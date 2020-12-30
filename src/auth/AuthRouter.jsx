import React from 'react'

import { auth } from '../firebase/firebase'
import GuestPage from '../Guest/GuestPage'

export default function AuthRouter(props) {
  const [page, setPage] = React.useState('login')

  auth.onAuthStateChanged((user) => {
    if (user) {
      props.history.push('/home')
    }
  })

  return <GuestPage page={page} setPage={setPage} />
}
