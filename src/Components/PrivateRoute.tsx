import React, {  useContext } from "react";  
import { Redirect, Route,  useLocation } from "react-router-dom";  
import { myContext } from "./Context";

;


export const PrivateRoute: React.ComponentType<any> = ({  
  component: Component,  
  ...rest  
}) => {  
  const location = useLocation()
  
  const {user} = useContext(myContext)
  
  return (  
    <Route  
      {...rest}  
      render={(props) => {  
        // logic for authenticated user to access /app part goes here.
        // e.g. check if user is logged-in logic.
        

        return user ? (  
          <Component {...props} />  
        ) : (  
          <Redirect to={{
            pathname: '/login',
            state: { from: location.pathname }
          }}/>  
        );  
   }}  
   />  
  );  
};