import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "../../../utils/config";

export const loginAction = createAsyncThunk(
  "account/login",
  async ({ email, password, onSuccess, onFailure }, { rejectWithValue }) => {
    try {
      const requestData = {
        email: email,
        password: password
      };

      const response = await axios.post(
        `${config.apiUrl}account/login`,
        requestData
      );
      
      // Success case - login successful, token received
      const { token } = response.data;
      
      // Store token in localStorage for persistence
      if (token) {
        localStorage.setItem('authToken', token);
        localStorage.setItem('userEmail', email);
      }
      
      if (onSuccess) onSuccess(response.data);
      return response.data;
    } catch (error) {
      const status = error.response?.status;
      let message = "Login failed. Please try again.";
      let errorData = null;

      if (status === 401) {
        // Unauthorized - invalid credentials
        message = "Invalid email or password. Please check your credentials.";
      } else if (status === 400) {
        // Bad Request - missing email or password
        message = error.response?.data?.message || "Email and password are required.";
      } else if (status === 500) {
        // Server Error
        message = "Server error. Please try again later.";
      } else {
        // Other errors
        message = error.response?.data?.message || "Login failed. Please try again.";
      }
      
      errorData = {
        message,
        status,
        originalError: error.response?.data
      };
      
      if (onFailure) onFailure(errorData);
      return rejectWithValue(errorData);
    }
  }
);

// Action to logout user
export const logoutAction = createAsyncThunk(
  "account/logout",
  async (_, { rejectWithValue }) => {
    try {
      // Clear token and user data from localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('userEmail');
      
      return { message: "Logged out successfully" };
    } catch (error) {
      return rejectWithValue({ message: "Logout failed" });
    }
  }
);

// Action to check if user is already logged in (token validation)
export const checkAuthAction = createAsyncThunk(
  "account/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken');
      const email = localStorage.getItem('userEmail');
      
      if (!token) {
        throw new Error('No token found');
      }
      
      // Optional: Verify token with backend
      // You can add an API call here to validate the token
      
      return {
        token,
        email,
        isAuthenticated: true
      };
    } catch (error) {
      // Clear invalid token
      localStorage.removeItem('authToken');
      localStorage.removeItem('userEmail');
      
      return rejectWithValue({
        message: 'Authentication failed',
        isAuthenticated: false
      });
    }
  }
);
