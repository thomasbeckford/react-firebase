import React, { useContext, useCallback } from 'react'
import { AuthStateContext, DispatchContext } from './store'
import { severity } from './snackbar/CustomizedSnackbar'

import { Box, Button, Typography, Container } from '@material-ui/core'

export default function Home() {
  const dispatch = useContext(DispatchContext)

  const authState = useContext(AuthStateContext)

  // Snackbar
  const openSnackbar = useCallback(
    (severity, text) => {
      dispatch({ type: 'openSnackBar', payload: { severity, text } })
    },
    [dispatch]
  )

  const handleSuccess = () => {
    openSnackbar(severity.SUCCESS, 'It Works!.')
  }

  const handleError = () => {
    openSnackbar(severity.ERROR, 'New test error generated!.')
  }

  return (
    <Container maxWidth='sm'>
      <Typography color='primary' align='center' variant='h5'>
        Welcome {authState.user}
      </Typography>
      <Box display='flex' justifyContent='space-between' p={1}>
        <Button onClick={() => handleSuccess()} variant='contained' color='primary'>
          TRY SUCCESS SNACKBAR!
        </Button>

        <Button onClick={() => handleError()} variant='contained' color='secondary'>
          TRY ERROR SNACKBAR!
        </Button>
      </Box>
    </Container>
  )
}
