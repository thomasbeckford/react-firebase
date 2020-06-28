import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { withRouter } from 'react-router'
import Logout from '../auth/Logout'
import './navbar.css'

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">FiReact</Typography>
        <Logout />
      </Toolbar>
    </AppBar>
  )
}

export default withRouter(Navbar)
