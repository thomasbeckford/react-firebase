import React from 'react'
import { Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  padding: {
    padding: '0 2em 0 2em',
    height: '100%',
  },
  paper: {
    padding: '1em 0',
    overflow: 'hidden',
    height: '20em',
    width: '40em',
    background: '#424242',
  },
  item: {
    width: '100%',
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    paddingTop: '1em',
    paddingLeft: '1em',
  },
  cardContent: {
    overflow: 'auto',
    height: '100%',
  },
}))

export default function ScrollablePaper(props) {
  const classes = useStyles()

  return (
    <Grid item sm={12} md={6} className={classes.item}>
      <Paper className={classes.paper} elevation={3}>
        {props.title ? (
          <h1 className="card-title" style={{ paddingLeft: '16px', marginBottom: '0px' }}>
            {props.title}
          </h1>
        ) : null}

        <div className={classes.cardContent}>
          <div className={classes.padding}>{props.children}</div>
        </div>
      </Paper>
    </Grid>
  )
}
