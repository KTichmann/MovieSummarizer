import React from "react";
import { HashRouter, Route, Switch, Link, NavLink } from "react-router-dom";
import App from "./App";
import Header from "./Header";
import Home from "./Home";
import About from "./About";

const AppRouter= () => (
  <HashRouter>
      <App />
  </HashRouter>
)

export default AppRouter;
