import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';

export interface configState {
    config: any,
    status: string
  }

const initialState: configState = {
  config: {},
  status: 'idel'
};

export const fetchConfig = createAsyncThunk(
  'fetch/config',
  async () => {
    const responseData = await axios.get('/api/config');
    return responseData.data;
  }
);

export const configSlice = createSlice({
  name: 'config',
  initialState: initialState,
  reducers: {
    setConfigloadingState(state) {
        state.status = 'loading'
    },
    setConfigSuccessState(state: any, action) {
        state[action.payload.model] = {...state[action.payload.model], ...action.payload.value }
    },
    setConfigfailedState(state: any,action) {
        delete state[action.payload.model][action.payload.key]
        // state.status = 'idel'
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConfig.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(fetchConfig.rejected, (state, action) => {
      state.status = 'idel';
    });
    builder.addCase(fetchConfig.fulfilled, (state, action) => {
      action.payload.map((item: any)=>{
        state.config[item._id]= {
            dbp: item.dbp,
            dap: item.dap,
            tmf: item.tmf,
            wc: item.wc,
            status: item.status
          }
      })
      state.status = 'idel'
    });
}
});

export const {setConfigloadingState, setConfigSuccessState,setConfigfailedState } = configSlice.actions;
export const getConfigState = (state: RootState) => state.config;
