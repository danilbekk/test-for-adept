import { configureStore } from '@reduxjs/toolkit';
import companyReducer from '@/storage/redux/slices/companySlice';
import employeeReducer from '@/storage/redux/slices/employeeSlice';

const store = configureStore({
  reducer: {
    companies: companyReducer,
    employees: employeeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

