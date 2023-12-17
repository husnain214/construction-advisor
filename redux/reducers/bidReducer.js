import { createSlice } from '@reduxjs/toolkit';
import bidService from '@/services/bidService';

const bidSlice = createSlice({
  name: 'bids',
  initialState: [],
  reducers: {
    setBids(_, action) {
      return action.payload;
    },
    createBid(state, action) {
      const bids = [...state, action.payload];
      return bids;
    },
    editBid(state, action) {
      return state.map((bid) => {
        const changedBid = {
          ...bid,
          successful: action.payload.successful,
        };

        return bid.id === action.payload.id ? changedBid : bid;
      });
    },
    removeBid(state, action) {
      return state.filter((bid) => bid.id !== action.payload);
    },
  },
});

const { createBid, setBids, editBid, removeBid } = bidSlice.actions;

export default bidSlice.reducer;

export const addBid = (bidDetails) => {
  return async (dispatch) => {
    try {
      await bidService.create(bidDetails);
      await dispatch(createBid(createBid));
    } catch (error) {
      console.error(error);
    }
  };
};

export const initializeBids = () => {
  return async (dispatch) => {
    const bids = await bidService.getAll();
    dispatch(setBids(bids));
  };
};

export const acceptBid = (updatedBid) => {
  return async (dispatch) => {
    dispatch(editBid(updatedBid));
  };
};

export const cancelBid = (id) => {
  return async (dispatch) => {
    await bidService.deleteBid(id);
    dispatch(removeBid(id));
  };
};
