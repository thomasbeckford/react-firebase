import React, {useContext, useCallback} from "react";
import { DispatchContext } from "../store";
import { withRouter } from "react-router";
import * as firebase from "firebase";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { severity } from "../snackbar/CustomizedSnackbar";

const useStyles = makeStyles((theme) => ({
   root: {
	  "& > *": {
         margin: theme.spacing(1),
         float: "right",
         display: "inline"
	  },
   },
}));

function Logout(props){
   const classes = useStyles();
   const dispatch = useContext(DispatchContext);
	
   //Snackbar
   const openSnackbar = useCallback((severity, text) => {
      dispatch({ type: "openSnackBar", payload: { severity, text }});
   }, [dispatch]);

   const handleLogout = () => {
      firebase.auth().signOut();
      dispatch({type:"logout"});
      openSnackbar(severity.INFO, "Not authenticated.");
      props.history.push("/");
   };
	
   return (
      <div className={classes.root}>
         <Button onClick={() => handleLogout()} variant="contained" color="primary">LOG OUT</Button>
      </div>
   );			


	
}

export default withRouter(Logout);