import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: null | { username: string; role: "admin" | "member" };
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ username: string; role: "admin" | "member" }>
    ) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
