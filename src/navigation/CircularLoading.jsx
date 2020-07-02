import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function CircularLoading() {
	return (
		<div style={{
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			height: "100%",
			width: "100%"
		}}>
			<CircularProgress/>
		</div>
	)
}
