import React, { Component } from 'react'
import { Typography, Box } from '@material-ui/core'

export default class PageNotFound extends Component {
  render() {
    if (this.props.location.pathname !== '/') {
      return (
        <div className="padding-margin">
          <Typography variant="h1">404 Not Found</Typography>
          <Box style={{ marginTop: '2em' }}>
            <Typography className="warning" align="center">
              <span>We cannot find the page your are looking for.</span>
              <span style={{ display: 'block' }}>
                Please use the navigation on this page to get back on track.
              </span>
            </Typography>
          </Box>
        </div>
      )
    } else {
      return null
    }
  }
}
