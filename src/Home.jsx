import React, { useContext } from 'react'
import { AuthStateContext } from './store'
import { withRouter } from 'react-router'
import { Box, Button, Typography, Container } from '@material-ui/core'

 function Home(props) {
  const authState = useContext(AuthStateContext)

  const redirectSearch = () =>{
    props.history.push('/search')
  }

  return (
    <Container maxWidth='sm'>
      <Typography color='primary' align='center' variant='h5'>
        Welcome {authState.user}
      </Typography>
      <Box>
        <Button onClick={()=> redirectSearch()}>Search Page</Button>
      </Box>
    </Container>
  )
}

export default withRouter(Home)