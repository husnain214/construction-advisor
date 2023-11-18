import { createSlice } from '@reduxjs/toolkit';
import auth from '@/services/auth';
import userService from '@/services/userService';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(_, action) {
      return action.payload;
    },
    removeUser() {
      return null;
    },
  },
});

const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;

export const getUser = () => {
  return async (dispatch) => {
    try {
      const loggedUser = await userService.getUserData();
      dispatch(setUser(loggedUser));
    } catch (error) {
      console.error(error);
    }
  };
};

export const addUser = (user) => {
  return async () => {
    await userService.createAccount(user);
  };
};

export const userLogin = (credentials) => {
  return async (dispatch) => {
    try {
      const loggedUser = await auth.login(credentials);
      dispatch(setUser(loggedUser));
    } catch (error) {
      console.error(error);
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      await auth.logout();
      dispatch(removeUser());
    } catch (error) {
      console.error(error);
    }
  };
};
