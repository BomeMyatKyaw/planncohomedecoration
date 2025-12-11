import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'

const BASEURL = `http://localhost:5000/api/contacts`;

export const submitContactForm = createAsyncThunk('contactform/formsubmit',async(formData,{rejectWithValue})=>{
    try{
        const res = await axios.post(`${BASEURL}/formsubmit`,formData);
        return res.data;
    }catch(err){
        return rejectWithValue(err.response?.data?.error || "Something went wrong");
    }
});

const contactFromSubmit = createSlice({

    name:'contactforms',

    initialState:{
        loading:false,
        error:null,
        successMessage:null
    },

    reducers:{
        resetFormState:(state)=>{
            state.loading = false;
            state.error = null;
            state.successMessage = null;
        }
    },

    extraReducers:(builder)=>{
        builder
            .addCase(submitContactForm.pending,(state)=>{
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(submitContactForm.fulfilled,(state,action)=>{
                state.loading = false;
                state.successMessage = action.payload.message;
            })
            .addCase(submitContactForm.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.payload;
            });
    }

});


export const { resetFormState } = contactFromSubmit.actions;
export default contactFromSubmit.reducer;