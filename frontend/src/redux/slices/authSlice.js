import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            // Persist both token and user for subsequent API calls
            state.user = action.payload.user;
            state.isAuthenticated = true;
            if (action.payload.token) {
                localStorage.setItem("access_token", action.payload.token);
                localStorage.setItem("token", action.payload.token);
            }
            if (action.payload.user) {
                localStorage.setItem("user", JSON.stringify(action.payload.user));
            }
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem("access_token");
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;