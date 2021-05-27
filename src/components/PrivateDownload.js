import React, { useContext } from "react";
import { AuthContext } from "./AuthRoute";
import { Redirect, Route } from "react-router-dom";

const PrivateDownload = ({ component: ComponentRoute, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(PropRoute) => {
        return currentUser ? (
          <ComponentRoute {...PropRoute} />
        ) : (
          <Redirect to="/register" />
        );
      }}
    />
  );
};

export default PrivateDownload;
