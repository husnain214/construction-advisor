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
    addContact(state, action) {
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    },
    putMessage(state, action) {
      const myMessage = action.payload.senderId === state.id;
      if (myMessage) {
        return {
          ...state,
          sentMessages: [...state.sentMessages, action.payload],
        };
      } else {
        return {
          ...state,
          receivedMessages: [...state.receivedMessages, action.payload],
        };
      }
    },
  },
});

const { setUser, removeUser, addContact, putMessage } = userSlice.actions;

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

export const modifyUser = (password) => {
  return async (dispatch) => {
    try {
      const updatedUser = await userService.updateUser(password);
      dispatch(setUser(updatedUser));
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

export const newContact = (contact) => {
  return async (dispatch) => {
    await userService.createContact(contact);
    dispatch(addContact(contact.id));
  };
};

export const addMessage = (message) => {
  return async (dispatch) => {
    dispatch(putMessage(message));
  };
};
