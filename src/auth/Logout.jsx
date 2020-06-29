import React, { useContext } from 'react'
import { DispatchContext } from '../store'
import { withRouter } from 'react-router'
import { makeStyles, Typography } from '@material-ui/core'
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
    <div className={classes.root}>
      <Typography onClick={() => handleLogout()} variant='contained' color='secondary'>
        LOG OUT
      </Typography>
    </div>
  )
}

export default withRouter(Logout)
