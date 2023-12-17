import { createSlice } from '@reduxjs/toolkit';
import chatService from '@/services/chatService';

const chatSlice = createSlice({
  name: 'chats',
  initialState: [],
  reducers: {
    setChats(_, action) {
      return action.payload;
    },
  },
});

const { setChats } = chatSlice.actions;

export default chatSlice.reducer;

export const initializeChats = () => {
  return async (dispatch) => {
    try {
      const chats = await chatService.getChats();
      await dispatch(setChats(chats));
    } catch (error) {
      console.error(error);
    }
  };
};
