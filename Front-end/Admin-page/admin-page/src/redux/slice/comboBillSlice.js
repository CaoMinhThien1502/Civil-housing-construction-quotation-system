import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
    comboBill:''
}
export const getSelectedComboId = createAsyncThunk("Bill/getComboId", async () =>{
    try{

    }
    catch(err){
        console.log(err)
    }
}) 
const comboBillSlice = createSlice({
    name:"comboBill",
    initialState,
    reducer:{
        
    }
})