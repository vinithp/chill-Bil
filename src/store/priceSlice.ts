import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';

export interface priceState {
    dbp: any,
    dap: any,
    tmf: any,
    wc: any,
    status: string
  }

const initialState: priceState = {
  dbp: {},
  dap: {},
  tmf: {},
  wc: {},
  status: 'idel'
};

export const fetchPrice = createAsyncThunk(
  'fetch/price',
  async () => {
    const responseData = await axios.get('/api/price');
    return responseData.data;
  }
);

export const priceSlice = createSlice({
  name: 'price',
  initialState: initialState,
  reducers: {
    setPriceloadingState(state) {
        state.status = 'loading'
    },
    setPriceSuccessState(state: any, action) {
        state[action.payload.model] = {...state[action.payload.model], ...action.payload.value }
    },
    setPricefailedState(state: any,action) {
        delete state[action.payload.model][action.payload.key]
        // state.status = 'idel'
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPrice.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(fetchPrice.rejected, (state, action) => {
      state.status = 'idel';
    });
    builder.addCase(fetchPrice.fulfilled, (state, action) => {
      state.dbp = action.payload.dbp;
      state.dap = action.payload.dap;
      state.tmf = action.payload.tmf;
      state.wc = action.payload.wc;
      state.status = 'idel'
    });
}
});

export const {setPriceloadingState, setPriceSuccessState,setPricefailedState } = priceSlice.actions;
export const getPriceState = (state: RootState) => state.price;
