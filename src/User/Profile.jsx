import React, { useContext } from 'react'
import { withRouter } from 'react-router'
import { Container } from '@material-ui/core'
import { AuthStateContext } from '../store'

function Profile(props) {
  const authState = useContext(AuthStateContext)
  console.log(authState)

  return (
    <Container>
      <div>
        User Profile
      </div>

    </Container>
  )
}

export default withRouter(Profile)
