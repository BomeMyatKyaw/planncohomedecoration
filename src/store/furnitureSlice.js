import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'

const API_URL = 'https://dummyjson.com/products?limit=20&skip=0';

export const fetchFurnitures = createAsyncThunk('furnitures/fetchFurniture',async()=>{
    const res = await axios.get(`${API_URL}`);
    return res.data.products;
});

const furnitureSlice = createSlice({
    name:'furnitures',

    initialState:{
        datas:[],
        loading:false,
        error:null,
        selectedProduct:null
    },
    extraReducers:(builder)=>{
        builder
            .addCase(fetchFurnitures.pending,(state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFurnitures.fulfilled,(state,action)=>{
                state.loading = false;
                state.datas = action.payload;
            })
            .addCase(fetchFurnitures.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.error.message;
            });
    }

});

export default furnitureSlice.reducer;