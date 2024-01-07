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
    removeJob(state, action) {
      return state.filter((job) => job.id !== action.payload.id);
    },
  },
});

const { createJob, setJobPosts, editJob, removeJob } = jobSlice.actions;

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

export const initializeJobs = () => {
  return async (dispatch) => {
    const jobPosts = await jobService.get();
    dispatch(setJobPosts(jobPosts));
  };
};

export const initializeAllJobs = () => {
  return async (dispatch) => {
    const jobPosts = await jobService.getAll();
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

export const deleteJob = (id) => {
  return async (dispatch) => {
    const deletedJob = await jobService.remove(id);
    dispatch(removeJob(deletedJob.id));
  };
};
