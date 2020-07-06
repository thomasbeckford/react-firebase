import React, { useContext } from 'react'
import { Box, Button, Typography, Container } from '@material-ui/core'
import { withRouter } from 'react-router'
import { AuthStateContext } from '../store'

function Search(props) {
  const authState = useContext(AuthStateContext)
  console.log(authState)

  const redirectHome = () => {
    props.history.push('/home')
  }

  return (
    <Container maxWidth='sm'>
      <Typography color='primary' align='center' variant='h5'>
        This is the search page
      </Typography>
      <Box>
        <Button onClick={() => redirectHome()}>Back home</Button>
      </Box>
    </Container>
  )
}

export default withRouter(Search)
