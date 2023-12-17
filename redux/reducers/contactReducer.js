import { createSlice } from '@reduxjs/toolkit';
import chatService from '@/services/chatService';

const contactSlice = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {
    setContacts(_, action) {
      return action.payload;
    },
  },
});

const { setContacts } = contactSlice.actions;

export default contactSlice.reducer;

export const initializeContacts = () => {
  return async (dispatch) => {
    try {
      const contacts = await chatService.getContacts();
      await dispatch(setContacts(contacts));
    } catch (error) {
      console.error(error);
    }
  };
};
