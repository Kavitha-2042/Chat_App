import { configureStore } from "@reduxjs/toolkit";
import userSlice from './Slice/userSlice';
import adminSlice from './Slice/adminSlice';


const Store = configureStore({
    reducer:{
        user:userSlice,
        admin:adminSlice
    }
})

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch
export default Store