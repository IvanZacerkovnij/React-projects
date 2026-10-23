import { useState } from "react";
import "./User.css";
import { removeUser, changeStatus } from "../redux-toolkit/slices/userServerSlice";
import { useAppDispatch, useAppSelector } from "../redux-toolkit/hooks/hooks";
import type { IUser } from "../redux-toolkit/interfaces/IUser";

function User({ user }: { user: IUser }) {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.userServer.loading);
  const [pending, setPending] = useState(false);

  const handlerRemove = async () => {
    setPending(true);
    await dispatch(removeUser(user.id));
    setPending(false);
  };

  const handlerStatus = async () => {
    setPending(true);
    await dispatch(changeStatus(user));
    setPending(false);
  };

  return (
    <div>
      <p className={`user-row ${user.isActive ? "success" : "error"}`}>
        <button onClick={handlerStatus} disabled={pending || loading}>
          {user.isActive ? "block" : "unblock"}
        </button>
        <span className="user-name">{user.name}</span>
        <button onClick={handlerRemove} disabled={pending || loading}>Del</button>
      </p>
    </div>
  );
}

export default User;
