import { useState, type FormEvent } from "react";
import { addUser } from "../redux-toolkit/slices/userServerSlice";
import { useAppDispatch, useAppSelector } from "../redux-toolkit/hooks/hooks";

function UserForm() {
  const dispatch = useAppDispatch();
  const { saving, loading } = useAppSelector(state => state.userServer);
  const [name, setName] = useState("");

  const handlerAddUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || saving || loading) return;
    const result = await dispatch(addUser({ name: name.trim(), isActive: true }));
    if (addUser.fulfilled.match(result)) setName("");
  };

  return (
    <form onSubmit={handlerAddUser}>
      <label>
        Name: <input type="text" value={name} onChange={event => setName(event.target.value)} required disabled={saving} />{" "}
      </label>
      <button type="submit" disabled={saving || loading || !name.trim()}>
        {saving ? "Saving…" : "Save"}
      </button>
    </form>
  );
}

export default UserForm;
