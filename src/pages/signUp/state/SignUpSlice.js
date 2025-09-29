import { createSlice } from "@reduxjs/toolkit";
import { signupAction } from "./SignUpActions";

const initialState = {
  signup: false,
  signupResp: null,
  availableDate: "",
  availableTime: "",
};

const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    // Define your synchronous reducers here if needed
    setAvailableDate: (state, action) => {
      state.availableDate = action.payload;
    },
    setAvailableTime: (state, action) => {
      state.availableTime = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle async actions here if needed
    builder
      .addCase(signupAction.pending, (state) => {
        state.signup = true;
        state.signupResp = null;
      })
      .addCase(signupAction.fulfilled, (state, action) => {
        state.signup = false;
        state.signupResp = action.payload;
      })
      .addCase(signupAction.rejected, (state, action) => {
        state.signup = false;
        state.signupResp = action.payload;
      });
  },
});

export const { setAvailableDate, setAvailableTime } = signUpSlice.actions;

export default signUpSlice.reducer;
