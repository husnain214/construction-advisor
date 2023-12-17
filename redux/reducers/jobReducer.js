import { createSlice } from '@reduxjs/toolkit';
import jobService from '@/services/jobService';

const jobSlice = createSlice({
  name: 'jobPosts',
  initialState: [],
  reducers: {
    setJobPosts(_, action) {
      return action.payload;
    },
    createJob(state, action) {
      const jobs = [...state, action.payload];
      return jobs;
    },
    editJob(state, action) {
      return state.map((job) => {
        const changedJob = {
          ...job,
          ...action.payload,
        };

        return job.id === action.payload.id ? changedJob : job;
      });
    },
  },
});

const { createJob, setJobPosts, editJob } = jobSlice.actions;

export default jobSlice.reducer;

export const addJob = (jobDetails) => {
  return async (dispatch) => {
    try {
      const createdJob = await jobService.create(jobDetails);
      await dispatch(createJob(createdJob));
    } catch (error) {
      console.error(error);
    }
  };
};

export const initializeJobs = (isCustomer) => {
  return async (dispatch) => {
    const jobPosts = await jobService.get(isCustomer);
    dispatch(setJobPosts(jobPosts));
  };
};

export const activateJob = (updatedJob) => {
  return async (dispatch) => {
    dispatch(editJob(updatedJob));
  };
};

export const updateJob = (id, job) => {
  return async (dispatch) => {
    const updatedJob = await jobService.update(id, job);
    dispatch(editJob(updatedJob));
  };
};
