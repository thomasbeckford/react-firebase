import React,{useContext} from 'react';
import { AuthStateContext } from './store'

export default function Home() {
	console.log("Inside HOME")
	const authState = useContext(AuthStateContext)
	
	return (
		<div>	  
		  <h1>Bienvenido a mi WebApp {authState.user}</h1>
			<h1>Que te gustaria hacer ?</h1>
		</div>
	)			
	
}