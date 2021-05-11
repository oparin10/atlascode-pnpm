import { navigate, RouteComponentProps, useNavigate } from "@reach/router";
import React from "react";
import { loginRedirect, startingPath } from "../../../config/routes.config";

interface Props extends RouteComponentProps {}

const NotFoundRoute = ({}: Props) => {
  React.useEffect(() => {
    navigate(`/${loginRedirect}`, { state: {}, replace: false });
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        backgroundColor: "#5d6d7c",
      }}
    ></div>
  );
};

export default NotFoundRoute;
