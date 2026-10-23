import reactLogo from "./assets/react.svg";
import reduxLogo from "/redux.svg";
import "./App.css";
import UserForm from "./components/UserForm";
import User from "./components/User";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux-toolkit/hooks/hooks";
import { getUsers } from "./redux-toolkit/slices/userServerSlice";

function App() {
  const { users, loading, saving, error } = useAppSelector(state => state.userServer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  const handlerGetData = () => {
    dispatch(getUsers());
  };
  return (
    <>
      <div>
        <a href="https://redux.js.org/" target="_blank">
          <img src={reduxLogo} className="logo" alt="Redux logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h3>Redux + React</h3>
      <div className="card">
        <UserForm />
      </div>
      <div className="card">
        {error && <p role="alert">{error}</p>}
        {loading && <p role="status">Loading…</p>}
        {users.length ? (
          users.map(user => <User user={user} key={user.id} />)
        ) : (
          !loading && !error && <h3>No users</h3>
        )}
      </div>

      <button onClick={handlerGetData} disabled={loading || saving}>GET DATA</button>
    </>
  );
}

export default App;
