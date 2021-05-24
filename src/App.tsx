import logo from "./logo.svg";
import "./App.css";
import { DisplayUsers } from "./DisplayUsers";
import { fetchUsers } from "./api";
import { useReactCharge } from "./components";

function App() {
  const { status, Renderer: DisplayUsersComponent } = useReactCharge({
    onStart: fetchUsers,
    Loading: () => <div>loading...</div>,
    Error: () => <div>Error...</div>,
    Success: DisplayUsers,
  });

  console.log(status);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <DisplayUsersComponent />
      </header>
    </div>
  );
}

export default App;
