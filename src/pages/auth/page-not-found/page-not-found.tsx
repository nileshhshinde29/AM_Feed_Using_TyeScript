import React from "react";
import "./page-not-found.scss";
import { Router, Switch, Route } from "react-router-dom";
import { routes } from "../../../routes/routes.config";
import history from "../../../routes/history";



export default function PageNotFound() {
  /*
   * Render
   */
  return (
    <h1>
      Page not found
    </h1>
  );
}
