import React, {  useContext } from "react";  
import { Redirect, Route, } from "react-router-dom";  
import { myContext } from "./Context";

const OnlyPublicRoute: React.ComponentType<any> = ({  
  component: Component,  
  ...rest  
}) => {  
  
  const {user} = useContext(myContext)
  
  return (  
    <Route  
      {...rest}  
      render={(props) => {  
        // logic for authenticated user to access /app part goes here.
        // e.g. check if user is logged-in logic.
        

        return (!user) ? (  
          <Component {...props} />  
        ) : (  
          <Redirect to={{pathname: '/'}}/>  
        );  
   }}  
   />  
  );  
};

export default OnlyPublicRoute;