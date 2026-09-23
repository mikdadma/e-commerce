import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginAdmin } from "../../services/adminService";

export const adminLogin = createAsyncThunk(
  "admin/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await loginAdmin(email, password);

      if (data.length === 0) {
        return rejectWithValue("Invalid email or password");
      }

      return data[0];
    } catch (error) {
      return rejectWithValue("Login failed");
    }
  }
);

const adminSlice = createSlice({
  name: "admin",

  initialState: {
    admin: null,
    loading: false,
    error: null
  },

  reducers: {
    logoutAdmin: (state) => {
      state.admin = null;
      localStorage.removeItem("admin");
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;

        localStorage.setItem(
          "admin",
          JSON.stringify(action.payload)
        );
      })

      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logoutAdmin } = adminSlice.actions;

export default adminSlice.reducer;