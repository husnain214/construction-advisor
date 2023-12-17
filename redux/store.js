import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import jobReducer from './reducers/jobReducer';
import bidReducer from './reducers/bidReducer';
import chatReducer from './reducers/chatReducer';
import contactReducer from './reducers/contactReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    jobPosts: jobReducer,
    bids: bidReducer,
    chats: chatReducer,
    contacts: contactReducer,
  },
});

export default store;
