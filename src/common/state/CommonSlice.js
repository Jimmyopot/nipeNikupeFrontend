import { createSlice } from "@reduxjs/toolkit";
import { getAllCountiesAction, getAllUsersAction, updateProfileAction } from "./CommonActions";

const initialState = {
  getAllUsers: false,
  getAllUsersResp: null,

  getAllCounties: false,
  getAllCountiesResp: null,

  updateProfile: false,
  updateProfileResp: null,
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
  
  },
  extraReducers: (builder) => {
    // Handle async actions here if needed
    builder
      .addCase(getAllUsersAction.pending, (state) => {
        state.getAllUsers = true;
        state.getAllUsersResp = null;
      })
      .addCase(getAllUsersAction.fulfilled, (state, action) => {
        state.getAllUsers = false;
        state.getAllUsersResp = action.payload;
      })
      .addCase(getAllUsersAction.rejected, (state, action) => {
        state.getAllUsers = false;
        state.getAllUsersResp = action.payload;
      })

      .addCase(getAllCountiesAction.pending, (state) => {
        state.getAllCounties = true;
        state.getAllCountiesResp = null;
      })
      .addCase(getAllCountiesAction.fulfilled, (state, action) => {
        state.getAllCounties = false;
        state.getAllCountiesResp = action.payload;
      })
      .addCase(getAllCountiesAction.rejected, (state, action) => {
        state.getAllCounties = false;
        state.getAllCountiesResp = action.payload;
      })

      .addCase(updateProfileAction.pending, (state) => {
        state.updateProfile = true;
        state.updateProfileResp = null;
      })
      .addCase(updateProfileAction.fulfilled, (state, action) => {
        state.updateProfile = false;
        state.updateProfileResp = action.payload;
      })
      .addCase(updateProfileAction.rejected, (state, action) => {
        state.updateProfile = false;
        state.updateProfileResp = action.payload;
      })
  },
});


export default commonSlice.reducer;
