import React from 'react'
import {
  Card,
  CardContent,
  Button,
  Container,
  Typography,
} from '@material-ui/core'
import Login from './../auth/Login'
import Register from './../auth/Register'
import ResetPassword from './../auth/ResetPassword'

export default function GuestPage(props) {
  return (
    <Container>
      <Card raised style={{ marginBottom: '2em' }}>
        <CardContent style={{ textAlign: 'center' }}>
          <Typography> Welcome to the WebApp...</Typography>
        </CardContent>

        <CardContent style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div>
              <Typography> If you have an account, please log in.</Typography>
              <Button
                color='primary'
                variant='contained'
                onClick={() => props.setPage('login')}>
                LOG IN
              </Button>
            </div>
            <div>
              <Typography> If you dont have an account, register.</Typography>
              <Button
                color='primary'
                variant='contained'
                onClick={() => props.setPage('register')}>
                REGISTER
              </Button>
            </div>
            <div>
              <Typography> If you dont have an account, register.</Typography>
              <Button
                color='primary'
                variant='contained'
                onClick={() => props.setPage('resetpassword')}>
                FORGOT PASSWORD
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      {props.page === 'login' ? (
        <Card raised>
          <CardContent style={{ textAlign: 'center' }}>
            <Login />
          </CardContent>
        </Card>
      ) : props.page === 'register' ? (
        <Card raised>
          <CardContent style={{ textAlign: 'center' }}>
            <Register />
          </CardContent>
        </Card>
      ) : props.page === 'resetpassword' ? (
        <Card raised>
          <CardContent style={{ textAlign: 'center' }}>
            <ResetPassword />
          </CardContent>
        </Card>
      ) : null}
    </Container>
  )
}
