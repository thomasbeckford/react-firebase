import React from "react";
import Login from "./Login";
import Register from "./Register";

export default function Auth() {

   const [page, setPage] = React.useState("login");

   if(page === "register") return <Register setPage={setPage} />;
   if(page === "login") return <Login setPage={setPage} />;
   
   return (
      <div>
         
      </div>

   );
}
