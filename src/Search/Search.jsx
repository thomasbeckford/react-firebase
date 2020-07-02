import React from 'react'
import { Box, Button, Typography, Container } from '@material-ui/core'
import { withRouter } from 'react-router'

function Search(props) {

  const redirectHome = () =>{
    props.history.push('/home')
  }

    return (
    <Container maxWidth='sm'>
      <Typography color='primary' align='center' variant='h5'>
        This is the search page
      </Typography>
      <Box>
        <Button onClick={()=> redirectHome()}>Back home</Button>
      </Box>
    </Container>
  )
}

export default withRouter(Search)
