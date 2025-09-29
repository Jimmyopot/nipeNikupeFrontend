import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "../../../utils/config";

export const signupAction = createAsyncThunk(
  "account/signup",
  async ({ formData, onSuccess, onFailure }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${config.apiUrl}account/signup`,
        formData
        // {
        //   headers: {
        //     ...authHeader(),
        //     "Content-Type": "application/json",
        //   },
        // }
      );
      onSuccess(response.data);
      return response.data;
    } catch (error) {
      onFailure();
      return rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);
