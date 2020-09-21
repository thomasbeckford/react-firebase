import React, { useState, useEffect } from 'react'

import { auth } from '../firebase/firebase'
import GuestPage from '../Guest/GuestPage'
import CircularLoading from '../navigation/CircularLoading'

export default function AuthRouter(props) {
  const [page, setPage] = React.useState('login')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
  }, [])

  if (loading) return <CircularLoading />

  auth.onAuthStateChanged((user) => {
    if (user) {
      props.history.push('/home')
    } else {
      setLoading(false)
    }
  })

  return <GuestPage page={page} setPage={setPage} />
}
