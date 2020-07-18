import React from "react";
import logo from "./logo.svg";
import "./AppStyle";
import RootRoute from "./routes/RootRoute";

const App = () => {
  return (
    <div className="App">
      <RootRoute />
    </div>
  );
};

export default App;
