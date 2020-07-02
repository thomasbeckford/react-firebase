import React, { useContext } from 'react'
import { DispatchContext } from '../store'
import { withRouter } from 'react-router'
import { makeStyles, Typography, MenuItem } from '@material-ui/core'
import { doSignOut } from '../firebase/auth'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      float: 'right',
      display: 'inline',
    },
  },
}))

function Logout(props) {
  const classes = useStyles()
  const dispatch = useContext(DispatchContext)

  const handleLogout = () => {
    doSignOut()
    dispatch({ type: 'logout' })
    props.history.push('/')
  }

  return (
    <>
    <MenuItem onClick={() => handleLogout()} className={classes.root} >
      <Typography variant='body1' color='secondary'>
        LOG OUT
      </Typography>
    </MenuItem>
    <MenuItem onClick={() => handleLogout()} className={classes.root} >
      <Typography variant='body1' color='secondary'>
        LOG OUT
      </Typography>
    </MenuItem>
    <MenuItem onClick={() => handleLogout()} className={classes.root} >
      <Typography variant='body1' color='secondary'>
        LOG OUT
      </Typography>
    </MenuItem>

  </>
  )
}

export default withRouter(Logout)
