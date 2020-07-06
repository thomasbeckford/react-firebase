import React from 'react'
import ScrollablePaper from './ScrollablePapper'
import { Typography } from '@material-ui/core'

export default function StatsCard(props) {
	return (
		<ScrollablePaper>
			<Typography>{props.title}</Typography>
			<Typography variant='caption' component='div' color='textSecondary'>
				{props.description}
			</Typography>
		</ScrollablePaper>
	)
}
