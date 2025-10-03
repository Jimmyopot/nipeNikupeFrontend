import { createSlice } from "@reduxjs/toolkit";
import { loginAction, logoutAction, checkAuthAction } from "./LoginActions";

const initialState = {
  // Authentication state
  isAuthenticated: false,
  user: null,
  token: null,
  email: null,
  
  // Loading states
  loginLoading: false,
  logoutLoading: false,
  checkingAuth: false,
  
  // Response data
  loginResponse: null,
  logoutResponse: null,
  
  // Error states
  loginError: null,
  authError: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    // Synchronous reducers
    clearLoginError: (state) => {
      state.loginError = null;
    },
    clearAuthError: (state) => {
      state.authError = null;
    },
    resetLoginState: (state) => {
      state.loginLoading = false;
      state.loginResponse = null;
      state.loginError = null;
    },
    // Manual logout (for immediate UI updates)
    manualLogout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.email = null;
      state.loginResponse = null;
      state.loginError = null;
      state.authError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login Action Handlers
      .addCase(loginAction.pending, (state) => {
        state.loginLoading = true;
        state.loginError = null;
        state.loginResponse = null;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.loginResponse = action.payload;
        state.loginError = null;
        
        // Set authentication state
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.email = localStorage.getItem('userEmail') || null;
        state.user = {
          email: state.email,
          token: state.token
        };
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginResponse = null;
        state.loginError = action.payload;
        
        // Clear authentication state
        state.isAuthenticated = false;
        state.token = null;
        state.email = null;
        state.user = null;
      })
      
      // Logout Action Handlers
      .addCase(logoutAction.pending, (state) => {
        state.logoutLoading = true;
      })
      .addCase(logoutAction.fulfilled, (state, action) => {
        state.logoutLoading = false;
        state.logoutResponse = action.payload;
        
        // Clear all authentication state
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.email = null;
        state.loginResponse = null;
        state.loginError = null;
        state.authError = null;
      })
      .addCase(logoutAction.rejected, (state, action) => {
        state.logoutLoading = false;
        state.authError = action.payload;
      })
      
      // Check Auth Action Handlers
      .addCase(checkAuthAction.pending, (state) => {
        state.checkingAuth = true;
        state.authError = null;
      })
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.checkingAuth = false;
        state.authError = null;
        
        // Set authentication state from stored token
        state.isAuthenticated = action.payload.isAuthenticated;
        state.token = action.payload.token;
        state.email = action.payload.email;
        state.user = {
          email: action.payload.email,
          token: action.payload.token
        };
      })
      .addCase(checkAuthAction.rejected, (state, action) => {
        state.checkingAuth = false;
        state.authError = action.payload;
        
        // Clear authentication state
        state.isAuthenticated = false;
        state.token = null;
        state.email = null;
        state.user = null;
      });
  },
});

export const { 
  clearLoginError, 
  clearAuthError, 
  resetLoginState, 
  manualLogout 
} = loginSlice.actions;

export default loginSlice.reducer;
