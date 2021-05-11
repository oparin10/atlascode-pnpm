import { Router, useNavigate } from "@reach/router";
import React from "react";
import {
  basePath,
  dashboardPath,
  startingPath,
} from "../../../config/routes.config";
import NotFoundRoute from "../../Util/NotFoundRoute";
import Login from "../Login";
import Dashboard from "./DashboardRoutes";

interface Props {}

const RouterMain = ({}: Props) => {
  return (
    <Router basepath={`${basePath}`} style={{ width: "100%" }}>
      <Login path={"login"} />
      <Dashboard path={`${dashboardPath}/*`} />
      <NotFoundRoute default />
    </Router>
  );
};

export default RouterMain;
