import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'

export const fetchClientsays = createAsyncThunk('contacts/clientsays',async()=>{
    const res = await axios.get(`http://localhost:5000/api/contacts/clientsays`);
    return res.data;
});

const contactClientsay = createSlice({
    name:'clientsays',
    initialState:{
        datas:[],
        loading:false,
        error:null
    },
    extraReducers:(builder)=>{
        builder
            .addCase(fetchClientsays.pending,(state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchClientsays.fulfilled,(state,action)=>{
                state.loading = false;
                state.datas = action.payload;
            })
            .addCase(fetchClientsays.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.error.message;
            });
    }

});

export default contactClientsay.reducer;