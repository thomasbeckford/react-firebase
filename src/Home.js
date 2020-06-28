import React, { useContext, useCallback } from "react"
import Button from "@material-ui/core/Button"
import { AuthStateContext, DispatchContext } from "./store"
import { severity } from "./snackbar/CustomizedSnackbar"
import Box from "@material-ui/core/Box"

export default function Home() {
	const dispatch = useContext(DispatchContext)
	const authState = useContext(AuthStateContext)

	// Snackbar
	const openSnackbar = useCallback(
		(severity, text) => {
			dispatch({ type: "openSnackBar", payload: { severity, text } })
		},
		[dispatch]
	)

	const handleSuccess = () => {
		openSnackbar(severity.SUCCESS, "It Works!.")
	}
	const handleError = () => {
		openSnackbar(severity.ERROR, "New test error generated!.")
	}

	return (
		<div>
			<h1>Bienvenido a mi WebApp {authState.user}</h1>
           
			<Box bgcolor="secondary.main" color="primary.contrastText" display="flex" justifyContent="space-around" p={1} >
				<Button
					onClick={() => handleSuccess()}
					variant="contained"
					color="primary"
				>
            TRY SUCCESS SNACKBAR!
				</Button>

				<Button
					onClick={() => handleError()}
					variant="contained"
					color="secondary"
				>
            TRY ERROR SNACKBAR!
				</Button>   
			</Box>
		</div>
	)
}
