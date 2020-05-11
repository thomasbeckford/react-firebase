import React, {useState} from "react";
import "./login.css";
import * as firebase from "firebase";
import { useForm } from "react-hook-form";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

export default function ResetPassword(props) {


   const { register, handleSubmit,errors, formState } = useForm({ mode: "onChange" });
   const [error, setError] = useState("");


   const handlePasswordReset = (emailReset) =>{
      const promise = firebase.auth().sendPasswordResetEmail(emailReset);
      console.log(promise);
   };

   return (
      <div className="sign-in">
         <h1>Reset password</h1>
         <Box color="primary.contrastText" display="flex" >
            <Button
               variant="contained"
               color="primary"
               onClick={()=>{props.setPage("login");}}>Login
            </Button>
         </Box>
         <form>
            {error && <p className="warning">{error}</p>}
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
            {errors.email && <p className="warning">{errors.email.message}</p>}
            <input type="submit" disabled={!formState.isValid} onClick={handleSubmit(handlePasswordReset)} value="RESET PASSWORD" />
         </form>
      </div>

   );
}

