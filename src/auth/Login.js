import React, { useState,useContext, useCallback } from "react";
import { DispatchContext } from "../store";
import "./login.css";
import * as firebase from "firebase";
import { useForm } from "react-hook-form";
import { severity } from "../snackbar/CustomizedSnackbar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

export default function Login(props) {

   const dispatch = useContext(DispatchContext);
   const { register, handleSubmit,errors , formState } = useForm({ mode: "onChange" });
   const [error, setError] = useState("");

   const handleEmailLogin = (data) => {
      const promise = firebase.auth().signInWithEmailAndPassword(data.email, data.password);
      promise
         .catch((e) => {
            setError(e.message);
         });
   };

   const handlePasswordReset = (emailReset) =>{
      return firebase.auth().sendPasswordResetEmail(emailReset);
   };


   //Snackbar
   const openSnackbar = useCallback((severity, text) => {
      dispatch({ type: "openSnackBar", payload: { severity, text }});
   }, [dispatch]);
   
   return (
      <div className="sign-in">
         <div>
            <h1>Login</h1>
            <Box color="primary.contrastText" display="flex" >
               <Button
                  variant="contained"
                  color="primary"
                  onClick={()=>{props.setPage("register");}}>Register
               </Button>
            </Box>
            <form>
               {error && <p>{error}</p>}
               <input
                  name="email"
                  placeholder="Email"
                  ref={register({
                     required: "email is required",
                     pattern: {
                        value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: "Invalid email address",
                     },
                  })}
               />
               {errors.email && <p className="warning">{errors.email.message}</p>}
               <input
                  name="password"
                  placeholder="Password"
                  type="password"
                  ref={register({
                     required: "password is required",
                     pattern: {
                        value: /^[A-Za-z]+$/i,
                        message: "Invalid password",
                     },
                  })}
               />
               {errors.password && <p className="warning">{errors.password.message}</p>}

               <span className="link">Forgot password?</span><span> 🤦</span>
               <input type="submit" disabled={!formState.isValid} onClick={handleSubmit(handleEmailLogin)} value="LOG IN" />
            </form>
         </div>


      </div>

   );
}
