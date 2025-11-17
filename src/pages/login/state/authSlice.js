// import { config } from "../../../utils/config";
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//   authLoading: false,
//   user: null,
// };

// export const login = createAsyncThunk("authSlice/login", async (data) => {
//   await new Promise((resolve) => setTimeout(resolve, 0));
//   const res = await axios
//     .post(`${config.apiUrl}account/Login`, data)
//     .then((res) => res.data);
//   return res;
// });

// export const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.user = {};
//       state.isActive = false;
//       state.authLoading = false;
//       state.isAuthenticated = false;
//     },

//     clearAuthObj: () => {
//       return { ...initialState };
//     },
//   },
//   extraReducers: (builder) => {
//     builder

//       .addCase(login.pending, (state) => {
//         state.authLoading = true;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.authLoading = false;
//         state.user = action.payload.user;
//       })
//       .addCase(login.rejected, (state) => {
//         state.authLoading = false;
//       });
//   },
// });

// export const { logout, clearAuthObj } = authSlice.actions;
// export default authSlice.reducer;

import { config } from "../../../utils/config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Helper function to get user from localStorage
const getUserFromLocalStorage = () => {
  try {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return null;
  }
};

// Initialize state with persisted user data
const initialState = {
  authLoading: false,
  user: getUserFromLocalStorage(), // Load user from localStorage on initialization
};

export const login = createAsyncThunk(
  "authSlice/login",
  async (data, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 0));
      const res = await axios.post(`${config.apiUrl}account/Login`, data);

      // Check if the response indicates failure
      if (res.data?.success === false) {
        return rejectWithValue(res.data);
      }

      return res.data;
    } catch (error) {
      // Handle network errors or HTTP error status codes
      const errorMessage =
        error.response?.data?.message || error.message || "Login failed";
      return rejectWithValue({ success: false, message: errorMessage });
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.authLoading = false;
      // Clear localStorage on logout
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
    },

    // Add this new reducer to manually set user from localStorage
    setUserFromStorage: (state, action) => {
      state.user = action.payload;
    },

    clearAuthObj: () => {
      // Clear localStorage when clearing auth object
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      return { ...initialState, user: null };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.authLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.authLoading = false;
        state.user = action.payload.user;
        // Persist to localStorage
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("authToken", action.payload.token);
      })
      .addCase(login.rejected, (state) => {
        state.authLoading = false;
      });
  },
});

export const { logout, clearAuthObj, setUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
