import { configureStore } from '@reduxjs/toolkit';
import { priceSlice } from './priceSlice';
import { configSlice } from './configSlice';

// const store = configureStore({
//   reducer: {
//     [userSlice.name]: userSlice.reducer,
//   },
// });

// export default store;

export const store = () => {
    return configureStore({
      reducer: {
        [priceSlice.name]: priceSlice.reducer,
        [configSlice.name]: configSlice.reducer
      }
    })
  }

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']