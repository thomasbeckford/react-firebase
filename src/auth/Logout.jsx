import React, { useContext } from 'react'
import { DispatchContext } from '../store'
import { withRouter } from 'react-router'
import { Typography } from '@material-ui/core'
import { doSignOut } from '../firebase/auth'

function Logout(props) {
	const dispatch = useContext(DispatchContext)

	const handleLogout = () => {
		doSignOut()
		dispatch({ type: 'logout' })
		props.history.push('/')
	}

	return (
		<div onClick={() => handleLogout()}>
			<Typography variant='body1' color='secondary'>
        		LOG OUT
			</Typography>
		</div>
	)
}

export default withRouter(Logout)
