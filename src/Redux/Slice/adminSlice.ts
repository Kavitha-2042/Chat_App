import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminType } from "../../types";

const initialState:AdminType = {
    admin:null,
    auth:false
}

const adminSlice = createSlice({
    name:"admin",
    initialState,
    reducers:{
        initializeAdmin:(state:AdminType, action:PayloadAction<AdminType>)=>{
            state.admin = action.payload.admin
            state.auth = action.payload.auth
        }
    }
})

export const {initializeAdmin } = adminSlice.actions
export default adminSlice.reducer