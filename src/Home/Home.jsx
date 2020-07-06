import React, { useContext } from 'react'
import { withRouter } from 'react-router'
import { Box, Button, Container } from '@material-ui/core'
import { AuthStateContext } from '../store'
import StatsCard from './StatCard'

function Home(props) {
  const authState = useContext(AuthStateContext)
  console.log(authState)

  const redirectSearch = () => {
    props.history.push('/search')
  }

  return (
    <Container style={{ margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          <StatsCard title='Sales Goals' />
          <StatsCard title='Anual Goals' />
        </div>
        <div>
          <StatsCard title='Anual Goals' />
          <StatsCard title='Anual Goals' />
        </div>
      </div>

      <Box>
        <Button onClick={() => redirectSearch()}>Search Page</Button>
      </Box>
    </Container>
  )
}

export default withRouter(Home)
