import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'

const API_URL = 'https://dummyjson.com/users?limit=';

export const fetchCustomers = createAsyncThunk('customers/fetchCustomer', async ({limit=24}={}) => {
    const {data} = await axios.get(`${API_URL}${limit}`);
    // console.log(data);
    // console.log(data.users);

    const customers = data.users.map(user=>({
        id:user.id,
        name:`${user.firstName} ${user.lastName}`,
        company:`${user.company.name}`,
        title:`${user.company.title}`,
        city:`${user.address.city}`,
        avatar:user.image,
        review:"It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        favourite:false,
        rating:(user.id % 5) + 1, // 1 to 5
    }));

    // console.log(customers);

    return customers;
});

const customerSlice = createSlice({
    name: 'customers',

    initialState: {
        datas: [],
        loading: false,
        error: null
    },

    reducers:{
        toggleFavourite:(state,action)=>{
            const id = action.payload;
            const founddata = state.datas.find(data => data.id === id);
            if(founddata) founddata.favourite = !founddata.favourite;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchCustomers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCustomers.fulfilled, (state, action) => {
                state.loading = false;
                state.datas = action.payload;
            })
            .addCase(fetchCustomers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to load customer";
            });
    }

});

export const { toggleFavourite } = customerSlice.actions; 
export default customerSlice.reducer;