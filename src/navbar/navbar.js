import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withRouter } from 'react-router'
import Logout from '../auth/Logout'
import './navbar.css'

const Navbar = () => {

    return(
        <AppBar position="static">
            <Toolbar>
                <Typography display="inline" variant="subtitle1" color="inherit">
                  Welcome to home page
                </Typography>
              <Logout />
            </Toolbar>
        </AppBar>
    )
}

export default withRouter(Navbar)