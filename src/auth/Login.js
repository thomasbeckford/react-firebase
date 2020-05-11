import React, { useState } from "react";

import "./login.css";
import * as firebase from "firebase";
import { useForm } from "react-hook-form";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

export default function Login(props) {

   const { register, handleSubmit,errors , formState } = useForm({ mode: "onChange" });
   const [error, setError] = useState("");

   const handleEmailLogin = (data) => {
      const promise = firebase.auth().signInWithEmailAndPassword(data.email, data.password);
      promise
         .catch((e) => {
            setError(e.message);
         });
   };
   
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
               
               <Box color="primary.contrastText" display="flex" >
                  <Button
                     variant="contained"
                     color="primary"
                     onClick={()=>{props.setPage("resetpassword");}}>FORGOT PASSWORD? 🤦
                  </Button>
               </Box>
               <input type="submit" disabled={!formState.isValid} onClick={handleSubmit(handleEmailLogin)} value="LOG IN" />
            </form>
         </div>


      </div>

   );
}
