import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import axios from "axios";
import type { IUser } from "../interfaces/IUser";

interface IUserState {
  users: IUser[];
  loading: boolean;
  saving: boolean;
  error: string | null;
}

const initialState: IUserState = {
  users: [],
  loading: false,
  saving: false,
  error: null,
};

const usersUrl = "http://localhost:3000/users";

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  const response = await axios.get<IUser[]>(usersUrl);
  return response.data;
});

export const addUser = createAsyncThunk("users/addUser", async (user: Omit<IUser, "id">) => {
  const response = await axios.post<IUser>(usersUrl, user);
  return response.data;
});

export const removeUser = createAsyncThunk("users/removeUser", async (id: string) => {
  await axios.delete(`${usersUrl}/${encodeURIComponent(id)}`);
  return id;
});

export const changeStatus = createAsyncThunk("users/changeStatus", async (user: IUser) => {
  const response = await axios.patch<IUser>(`${usersUrl}/${encodeURIComponent(user.id)}`, {
    isActive: !user.isActive,
  });
  return response.data;
});

export const userServerSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addUser.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.saving = false;
        state.users.push(action.payload);
      })
      .addCase(addUser.rejected, (state) => {
        state.saving = false;
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload);
      })
      .addCase(changeStatus.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) state.users[index] = action.payload;
      })
      .addMatcher(isAnyOf(removeUser.pending, changeStatus.pending), (state) => {
        state.error = null;
      })
      .addMatcher(isAnyOf(getUsers.rejected, addUser.rejected, removeUser.rejected, changeStatus.rejected), (state, action) => {
        state.error = action.error.message || "Не вдалося виконати запит до сервера.";
      });
  },
});

export default userServerSlice.reducer;
