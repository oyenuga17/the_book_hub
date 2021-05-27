import { Button } from "antd";
import { Header } from "antd/lib/layout/layout";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { app } from "../base";
import { AuthContext } from "./AuthRoute";

const HeaderNav = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Header
      style={{
        color: "white",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <Link to="/">
        <div
          style={{
            color: "white",
          }}
        >
          Home
        </div>
      </Link>
      <Link to="/profile">
        <div
          style={{
            color: "white",
          }}
        >
          Profile
        </div>
      </Link>

      {currentUser ? (
        <Button
          type="primary"
          danger
          onClick={() => {
            app.auth().signOut();
          }}
        >
          Log Out
        </Button>
      ) : (
        <Link to="/register">
          <Button type="primary">Sign In</Button>
        </Link>
      )}
    </Header>
  );
};

export default HeaderNav;
