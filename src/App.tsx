import React from "react";
import { Route, Switch } from "react-router-dom";
import { About } from "./routes/About";
import { Home } from "./routes/Home";
import Landing from "./routes/Landing";

import { Tab } from "semantic-ui-react";

import "./App.css";

const panes = [
  {
    menuItem: "Make Note",
    render: () => (
      <Tab.Pane attached={false}>
        <Home />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Directory",
    render: () => (
      <Tab.Pane attached={false}>
        <Landing />
      </Tab.Pane>
    ),
  },
];

export const App = () => {
  return (
    <div style={{ width: "500px", minHeight: "300px" }}>
      <Tab defaultActiveIndex={1} menu={{ pointing: true }} panes={panes} />
    </div>
  );
};
