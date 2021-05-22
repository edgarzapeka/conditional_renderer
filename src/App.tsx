import React, { useCallback, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { DisplayUsers } from "./DisplayUsers";
import { NetworkResolver } from "./NetworkResolver";
import { ErrorComponent } from "./ErrorComponent";
import { fetchUsers } from "./api";
import { useErrorResolver } from "./useErrorResolver";

function App() {
  const { status, Renderer } = useErrorResolver({
    onStart: fetchUsers,
    Loading: () => <div>loading...</div>,
    Error: () => <div>Error...</div>,
  });

  console.log(status);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Renderer>
          <DisplayUsers />
        </Renderer>
      </header>
    </div>
  );
}

export default App;
