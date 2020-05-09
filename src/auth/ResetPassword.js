import React, { useState,useContext, useCallback } from "react";
import { DispatchContext } from "../store";
import "./login.css";
import * as firebase from "firebase";
import { useForm } from "react-hook-form";
import { severity } from "../snackbar/CustomizedSnackbar";

export default function ResetPassword(props) {

   const dispatch = useContext(DispatchContext);
   const { register, handleSubmit,errors , formState } = useForm({ mode: "onChange" });
   const [error, setError] = useState("");
  


   const handlePasswordReset = (emailReset) =>{
      return firebase.auth().sendPasswordResetEmail(emailReset);
   };


   //Snackbar
   const openSnackbar = useCallback((severity, text) => {
      dispatch({ type: "openSnackBar", payload: { severity, text }});
   }, [dispatch]);

   return (
      <div className="sign-in">
         <h1>Reset password</h1>
         <form>
            {error && <p>{error}</p>}
            <input
               name="emailReset"
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
            <input type="submit" onClick={handleSubmit(handlePasswordReset)} value="RESET PASSWORD" />
         </form>
      </div>

   );
}

