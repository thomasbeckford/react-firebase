import React, { useState,useContext, useCallback } from "react";
import { DispatchContext } from "../store";
import "./login.css";
import * as firebase from "firebase";
import { useForm } from "react-hook-form";
import { severity } from "../snackbar/CustomizedSnackbar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

export default function Register(props) {

   const dispatch = useContext(DispatchContext);
   const { register, handleSubmit,errors , formState, watch } = useForm({ mode: "onChange" });
   const [error, setError] = useState("");
   console.log(props);

   const handleRegister = (data) => {
      const promise = firebase.auth().createUserWithEmailAndPassword(data.email, data.password);
      promise
         .then((user) => {
            if(user){
               openSnackbar(severity.INFO, "Authenticated.");
               props.history.push("/home");
            }
         })
         .catch((e) => setError(e.message));
   };

   //Snackbar
   const openSnackbar = useCallback((severity, text) => {
      dispatch({ type: "openSnackBar", payload: { severity, text }});
   }, [dispatch]);

   return (
      <div className="sign-in">
         <div>
            <h1>Create user</h1>
            <Box color="primary.contrastText" display="flex" >
               <Button
                  variant="contained"
                  color="primary"
                  onClick={()=>{props.setPage("login");}}>Login
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
               {errors.email && <p>{errors.email.message}</p>}
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
               {errors.password && <p>{errors.password.message}</p>}
               
               <input 
                  type="password" 
                  name="newPassword"
                  ref={register({
                     validate: (value) => value === watch("password"),
                     required: "confirm password is required",
                     pattern: {
                        value: /^[A-Za-z]+$/i,
                        message: "Invalid password",
                     },
                  })}
                  placeholder="Confirm Password"
                  required
               />
               {errors.password && <p>{errors.newPassword.message}</p>}
               <input type="submit" disabled={!formState.isValid} onClick={handleSubmit(handleRegister)} value="REGISTER" />
            </form>
         </div>


      </div>

   );
}
