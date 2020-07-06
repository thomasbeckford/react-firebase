import { makeStyles, withStyles } from '@material-ui/core/styles'
import { SnackbarStateContext } from '../store'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import clsx from 'clsx'
import ErrorIcon from '@material-ui/icons/Error'
import green from '@material-ui/core/colors/green'
import InfoIcon from '@material-ui/icons/Info'
import PropTypes from 'prop-types'
import React, { useContext, useEffect } from 'react'
import Slide from '@material-ui/core/Slide'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import WarningIcon from '@material-ui/icons/Warning'
import CircularProgress from '@material-ui/core/CircularProgress'

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
}

const useStyles = makeStyles((theme) => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: '#cc3333',
  },
  info: {
    backgroundColor: '#1976d2',
  },
  warning: {
    backgroundColor: 'orange',
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '1em',
  },
}))

const MySnackbarContentWrapper = React.forwardRef((props, ref) => {
  const classes = useStyles()
  const { className, message, onClose, variant, loading, ...other } = props
  const Icon = variantIcon[variant]

  return (
    <SnackbarContent
      ref={ref}
      className={clsx(classes[variant], className)}
      aria-describedby='client-snackbar'
      message={
        <div style={{ display: 'flex', width: 'auto' }}>
          <div style={props.loading ? { paddingTop: '3px' } : null}>
            {props.loading ? (
              <CircularProgress color='inherit' size={18} />
            ) : (
              <>
                {Icon ? (
                  <Icon style={{ marginBottom: '-4px' }} className={clsx(classes.icon, classes.iconVariant)} />
                ) : null}
              </>
            )}
          </div>
          <div
            style={{
              margin: 'auto',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
            {typeof message == 'object' || Array.isArray(message) ? 'An unexpected error occured.' : message}
          </div>
        </div>
      }
      {...other}
    />
  )
})

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
  loading: PropTypes.bool,
}

const StyledSnackbar = withStyles({
  root: {
    top: '0px',
    borderRadius: '0 0 5px 5px',
  },
})(Snackbar)

const SlideTransition = React.forwardRef((props, ref) => {
  return <Slide {...props} ref={ref} direction='down' />
})

/**
 * A customized snackbar functional component that can display a supplied message, in a supplied style.
 *
 */
export default function CustomizedSnackbar(props) {
  const state = useContext(SnackbarStateContext)
  const loading = state.text ? state.text.toString().toLowerCase().includes('loading') : false

  useEffect(() => {
    switch (state.severity) {
      case 'warning':
        console.warn(state.text)
        break
      case 'error':
        console.error(state.text)
        break
      case 'info':
        if (!loading) console.info(state.text)
        break
      case 'success':
        console.log(state.text)
        break
      default:
        break
    }
    // eslint-disable-next-line
  }, [state.severity]) // we only want logs once per snackbar

  return (
    <StyledSnackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      TransitionComponent={SlideTransition}
      open={state.open}
      autoHideDuration={!loading ? 3000 : 10000}
      onClose={(event, reason) => {
        if (reason === 'clickaway') {
          return
        }
        props.handleClose(event, reason)
      }}>
      <MySnackbarContentWrapper
        loading={loading}
        onClose={props.handleClose}
        variant={state.severity || 'info'}
        message={state.text}
      />
    </StyledSnackbar>
  )
}

const severity = {
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info',
  SUCCESS: 'success',
}

export { severity }
