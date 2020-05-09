import React, { Component } from "react";
import { Typography } from "@material-ui/core";

export default class PageNotFound extends Component {

   render() {

      if (this.props.location.pathname !== "/") {
         return (
            <div className="padding-margin">
               <Typography variant="h1">404 Not Found</Typography> 
               <br/>
               <Typography component="p"> We cannot find the page your are looking for. <br/> Please use the navigation on this page to get back on track.</Typography>
            </div>
         );   
      } else {
         return null;
      }

   }
}
