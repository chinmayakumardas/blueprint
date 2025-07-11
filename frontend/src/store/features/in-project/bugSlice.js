import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/lib/axios";

//
// ✅ 1. Create Bug
//
export const createBug = createAsyncThunk(
  "bugs/createBug",
  async (bugData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/bugs/create", bugData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating bug:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to create bug"
      );
    }
  }
);

//
// ✅ 2. Fetch All Bugs by Project ID (for project detail view or full bug list)
//
export const fetchAllBugsByProjectId = createAsyncThunk(
  "bugs/fetchAllBugsByProjectId",
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/bugs/getallbugByProjectId/${projectId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching bugs:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch bugs"
      );
    }
  }
);

//
// ✅ 3. Fetch Bugs by Project ID (used separately with isolated state)
//
export const fetchBugByProjectId = createAsyncThunk(
  "bugs/fetchBugByProjectId",
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/bugs/getallbugByProjectId/${projectId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching bugs for project:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch bugs by project"
      );
    }
  }
);

//
// ✅ 4. Resolve Bug
//
export const resolveBug = createAsyncThunk(
  "bugs/resolveBug",
  async (bugId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/bugs/resolve/${bugId}`);
      return response.data;
    } catch (error) {
      console.error("Error resolving bug:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to resolve bug"
      );
    }
  }
);
//
// ✅ 5. Fetch Bugs by Employee ID
//
export const fetchBugByEmployeeId = createAsyncThunk(
  "bugs/fetchBugByEmployeeId",
  async (employeeId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/bugs/assigned/${employeeId}`
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching bugs for employee:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch employee bugs"
      );
    }
  }
);

//
// ✅ Initial State
//
const initialState = {
  bug: null,
  bugs: [],
  bugsByProjectId: [], // specific project bug list
  bugsByEmployeeId: [],

  loading: {
    bugCreation: false,
    bugsFetch: false,
    bugsByProjectId: false,
    bugResolve: false,
    bugsByEmployeeId: false,
  },
  error: {
    bugCreation: null,
    bugsFetch: null,
    bugsByProjectId: null,
    bugResolve: null,
    bugsByEmployeeId: null,
  },
  successMessage: null,
};

//
// ✅ Slice
//
const bugSlice = createSlice({
  name: "bugs",
  initialState,
  reducers: {
    resetBugCreation: (state) => {
      state.loading.bugCreation = false;
      state.error.bugCreation = null;
      state.successMessage = null;
      state.bug = null;
    },
    clearErrors: (state) => {
      state.error.bugCreation = null;
      state.error.bugsFetch = null;
      state.error.bugResolve = null;
      state.error.bugsByProjectId = null;
    },
    clearProjectBugs: (state) => {
      state.bugsByProjectId = [];
    },
  },
  extraReducers: (builder) => {
    //
    // ➕ Create Bug
    //
    builder
      .addCase(createBug.pending, (state) => {
        state.loading.bugCreation = true;
        state.error.bugCreation = null;
        state.successMessage = null;
      })
      .addCase(createBug.fulfilled, (state, action) => {
        state.loading.bugCreation = false;
        state.bug = action.payload;
        state.bugs.push(action.payload);
        state.successMessage = "Bug created successfully";
      })
      .addCase(createBug.rejected, (state, action) => {
        state.loading.bugCreation = false;
        state.error.bugCreation = action.payload;
      });

    //
    // 📥 Fetch All Bugs (global/project dashboard)
    //
    builder
      .addCase(fetchAllBugsByProjectId.pending, (state) => {
        state.loading.bugsFetch = true;
        state.error.bugsFetch = null;
      })
      .addCase(fetchAllBugsByProjectId.fulfilled, (state, action) => {
        state.loading.bugsFetch = false;
        state.bugs = action.payload;
      })
      .addCase(fetchAllBugsByProjectId.rejected, (state, action) => {
        state.loading.bugsFetch = false;
        state.error.bugsFetch = action.payload;
      });

    //
    // 📥 Fetch Bugs for One Project (in its own array)
    //
    builder
      .addCase(fetchBugByProjectId.pending, (state) => {
        state.loading.bugsByProjectId = true;
        state.error.bugsByProjectId = null;
      })
      .addCase(fetchBugByProjectId.fulfilled, (state, action) => {
        state.loading.bugsByProjectId = false;
        state.bugsByProjectId = action.payload;
      })
      .addCase(fetchBugByProjectId.rejected, (state, action) => {
        state.loading.bugsByProjectId = false;
        state.error.bugsByProjectId = action.payload;
      });

    //
    // ✅ Resolve Bug
    //
    builder
      .addCase(resolveBug.pending, (state) => {
        state.loading.bugResolve = true;
        state.error.bugResolve = null;
        state.successMessage = null;
      })
      .addCase(resolveBug.fulfilled, (state, action) => {
        state.loading.bugResolve = false;
        state.successMessage = action.payload.message;

        const updatedBug = action.payload.bug;

        // Update in main list
        state.bugs = state.bugs.map((bug) =>
          bug.bug_id === updatedBug.bug_id ? updatedBug : bug
        );

        // Update in project-specific list
        state.bugsByProjectId = state.bugsByProjectId.map((bug) =>
          bug.bug_id === updatedBug.bug_id ? updatedBug : bug
        );
      })
      .addCase(resolveBug.rejected, (state, action) => {
        state.loading.bugResolve = false;
        state.error.bugResolve = action.payload;
      });

    // 📥 Fetch Bugs for Employee
    builder
      .addCase(fetchBugByEmployeeId.pending, (state) => {
        state.loading.bugsByEmployeeId = true;
        state.error.bugsByEmployeeId = null;
      })
      .addCase(fetchBugByEmployeeId.fulfilled, (state, action) => {
        state.loading.bugsByEmployeeId = false;
        state.bugsByEmployeeId = action.payload;
      })
      .addCase(fetchBugByEmployeeId.rejected, (state, action) => {
        state.loading.bugsByEmployeeId = false;
        state.error.bugsByEmployeeId = action.payload;
      });
  },
});

//
// ✅ Exports
//
export const { resetBugCreation, clearErrors, clearProjectBugs } =
  bugSlice.actions;
export default bugSlice.reducer;
