import { createMuiTheme } from '@material-ui/core/styles'
const theme = createMuiTheme({
  palette: {
    primary: { main: '#FFFFFF' },
    secondary: { main: '#333333' },
    error: { main: '#bf1650' },
    // warning: { main: '#bf1650' },
    // info: { main: Colors.info },
    // success: { main: Colors.success }
  },
  typography: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    button: {
      textTransform: 'none',
    },
  },
  props: {
    // Name of the component ⚛️
    MuiButtonBase: {
      // The default props to change
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
  },
})

export default theme
