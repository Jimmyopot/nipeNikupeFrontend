// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { config } from "../../../utils/config";

// export const signupAction = createAsyncThunk(
//   "account/signup",
//   async ({ formData, onSuccess, onFailure }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         `${config.apiUrl}account/signup`,
//         formData
//       );
//       onSuccess(response.data);
//       return response.data;
//     } catch (error) {
//       const status = error.response?.status; 
//       let message = "Registration failed. Please try again.";

//       if (status === 409) {
//         message = "This email or phone number is already registered.";
//       }

//       onFailure(message);
//       return rejectWithValue(message);
//     }
//   }
// );


// SignUpActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "../../../utils/config";

export const signupAction = createAsyncThunk(
  "account/signup",
  async ({ formData, onSuccess, onFailure }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${config.apiUrl}account/signup`, formData);
      onSuccess(response.data);
      return response.data;
    } catch (error) {
      console.error("❌ API Error object:", error);

      const status = error.response?.status;
      const backendMessage = error.response?.data?.detail || error.response?.data?.message;
      let message = "Registration failed";

      if (status === 409) {
        message = backendMessage || "This email or phone number is already registered";
      } else if (status === 400) {
        message = backendMessage || "Bad request. Please check your input.";
      }

      // Pass to component
      if (onFailure) onFailure(message);
      return rejectWithValue(message);
    }
  }
);
