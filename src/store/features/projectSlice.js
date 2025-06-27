import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axiosInstance';

// Thunk: Fetch all projects
export const fetchAllProjects = createAsyncThunk(
  'projects/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/projects/getallprojects');
      if (response.data) {
        const projectData = Array.isArray(response.data)
          ? response.data
          : response.data.data || response.data.projects || [];
        return projectData;
      }
      return [];
    } catch (error) {
      console.error('Error fetching projects:', error);
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch projects');
    }
  }
);

// Thunk: Fetch projects by employee ID
export const fetchProjectsByEmployeeId = createAsyncThunk(
  'projects/fetchByEmployeeId',
  async (employeeId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/projects/getall/${employeeId}`);
      console.log('Response from fetchProjectsByEmployeeId:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching projects by employee ID:', error);
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch employee projects');
    }
  }
);


// Thunk: Fetch team leads
export const fetchTeamLeads = createAsyncThunk(
  'projects/fetchTeamLeads',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/hrms/employees');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch team leads');
    }
  }
);

// Thunk: Create a new project
export const createProject = createAsyncThunk(
  'projects/createProject',
  async (projectData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      Object.keys(projectData).forEach((key) => {
        if (key !== 'attachments') {
          formData.append(key, projectData[key]);
        }
      });
      if (projectData.attachments) {
        projectData.attachments.forEach((file) => {
          formData.append('attachments', file);
        });
      }
      const response = await axiosInstance.post('/projects/onboard', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create project');
    }
  }
);

// Thunk: Change project status
export const changeProjectStatus = createAsyncThunk(
  'projects/changeProjectStatus',
  async ({ projectId, status }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/projects/status/${projectId}`, { status });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to change project status');
    }
  }
);

// Thunk: Fetch project by ID
export const fetchProjectById = createAsyncThunk(
  'projects/fetchById',
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/projects/getProjectById/${projectId}`);
      if (!response.data) {
        throw new Error('No data found for the given project ID');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch project');
    }
  }
);

// Thunk: Update project by ID
export const updateProject = createAsyncThunk(
  'projects/updateById',
  async ({ projectId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/projects/updateProject/${projectId}`, updatedData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to edit project');
    }
  }
);

const initialState = {
  projects: [],
  employeeProjects: [],
  teamLeads: [],
  currentProject: null,
  loading: {
    projects: false,
    employeeProjects: false,
    clients: false,
    teamLeads: false,
    projectCreation: false,
    statusChange: false,
    currentProject: false,
    projectUpdate: false,
  },
  error: {
    projects: null,
    employeeProjects: null,
    teamLeads: null,
    projectCreation: null,
    statusChange: null,
    currentProject: null,
    projectUpdate: null,
  },
  successMessage: null,
  status: 'idle', // General status for backward compatibility
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    clearProjects: (state) => {
      state.projects = [];
      state.loading.projects = false;
      state.error.projects = null;
      state.status = 'idle';
    },
    clearEmployeeProjects: (state) => {
      state.employeeProjects = [];
      state.loading.employeeProjects = false;
      state.error.employeeProjects = null;
      state.status = 'idle';
    },
    clearCurrentProject: (state) => {
      state.currentProject = null;
      state.loading.currentProject = false;
      state.error.currentProject = null;
      state.status = 'idle';
    },
    resetProjectCreation: (state) => {
      state.loading.projectCreation = false;
      state.error.projectCreation = null;
      state.successMessage = null;
    },
    clearErrors: (state) => {
      state.error = {
        projects: null,
        employeeProjects: null,
        teamLeads: null,
        projectCreation: null,
        statusChange: null,
        currentProject: null,
        projectUpdate: null,
      };
    },
    resetSuccessMessage: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch All Projects
    builder
      .addCase(fetchAllProjects.pending, (state) => {
        state.loading.projects = true;
        state.error.projects = null;
        state.status = 'loading';
      })
      .addCase(fetchAllProjects.fulfilled, (state, action) => {
        state.loading.projects = false;
        state.projects = action.payload;
        state.error.projects = null;
        state.status = 'succeeded';
      })
      .addCase(fetchAllProjects.rejected, (state, action) => {
        state.loading.projects = false;
        state.error.projects = action.payload;
        state.status = 'failed';
      });

    // Fetch Projects by Employee ID
    builder
      .addCase(fetchProjectsByEmployeeId.pending, (state) => {
        state.loading.employeeProjects = true;
        state.error.employeeProjects = null;
        state.status = 'loading';
      })
      .addCase(fetchProjectsByEmployeeId.fulfilled, (state, action) => {
        state.loading.employeeProjects = false;
        state.employeeProjects = action.payload;
        state.error.employeeProjects = null;
        state.status = 'succeeded';
      })
      .addCase(fetchProjectsByEmployeeId.rejected, (state, action) => {
        state.loading.employeeProjects = false;
        state.error.employeeProjects = action.payload;
        state.status = 'failed';
      });

 

    // Fetch Team Leads
    builder
      .addCase(fetchTeamLeads.pending, (state) => {
        state.loading.teamLeads = true;
        state.error.teamLeads = null;
      })
      .addCase(fetchTeamLeads.fulfilled, (state, action) => {
        state.loading.teamLeads = false;
        state.teamLeads = action.payload;
        state.error.teamLeads = null;
      })
      .addCase(fetchTeamLeads.rejected, (state, action) => {
        state.loading.teamLeads = false;
        state.error.teamLeads = action.payload;
      });

    // Create Project
    builder
      .addCase(createProject.pending, (state) => {
        state.loading.projectCreation = true;
        state.error.projectCreation = null;
        state.successMessage = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading.projectCreation = false;
        state.successMessage = 'Project created successfully';
        state.projects = [...state.projects, action.payload];
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading.projectCreation = false;
        state.error.projectCreation = action.payload;
      });

    // Change Project Status
    builder
      .addCase(changeProjectStatus.pending, (state) => {
        state.loading.statusChange = true;
        state.error.statusChange = null;
        state.successMessage = null;
      })
      .addCase(changeProjectStatus.fulfilled, (state, action) => {
        state.loading.statusChange = false;
        state.successMessage = 'Project status updated successfully';
        // Update project status in projects array if it exists
        state.projects = state.projects.map((project) =>
          project._id === action.payload._id ? action.payload : project
        );
      })
      .addCase(changeProjectStatus.rejected, (state, action) => {
        state.loading.statusChange = false;
        state.error.statusChange = action.payload;
      });

    // Fetch Project by ID
    builder
      .addCase(fetchProjectById.pending, (state) => {
        state.loading.currentProject = true;
        state.error.currentProject = null;
        state.status = 'loading';
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.loading.currentProject = false;
        state.currentProject = action.payload;
        state.error.currentProject = null;
        state.status = 'succeeded';
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.loading.currentProject = false;
        state.error.currentProject = action.payload;
        state.status = 'failed';
      });

    // Update Project
    builder
      .addCase(updateProject.pending, (state) => {
        state.loading.projectUpdate = true;
        state.error.projectUpdate = null;
        state.status = 'updating';
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading.projectUpdate = false;
        state.currentProject = action.payload;
        state.successMessage = 'Project updated successfully';
        // Update project in projects array if it exists
        state.projects = state.projects.map((project) =>
          project._id === action.payload._id ? action.payload : project
        );
        state.status = 'updated';
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading.projectUpdate = false;
        state.error.projectUpdate = action.payload;
        state.status = 'update_failed';
      });
  },
});

export const {
  clearProjects,
  clearEmployeeProjects,
  clearCurrentProject,
  resetProjectCreation,
  clearErrors,
  resetSuccessMessage,
} = projectSlice.actions;

export default projectSlice.reducer;