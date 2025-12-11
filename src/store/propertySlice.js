import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'

const API_URL = 'https://dummyjson.com/products?limit=';

export const fetchProperties = createAsyncThunk('property/fetchProperty', async ({limit=24}={}) => {
    const {data} = await axios.get(`${API_URL}${limit}`);
    console.log(data);
    // console.log(data.products);

    const cities = ["Yangon","Mandalay","PwinOoLwin","Taunggyi","Bago","Myawlamyine"];
    const statuses = ["For Sale","For Rent", "Sold Out"];

    const bedsList = [1,2,3,4,5];
    const bathList = [1,2,3];

    const props = data.products.map((product,idx)=>({
        id:product.id,
        title:product.title,
        description:product.description,
        price:product.price,
        thumbnail:product.thumbnail || product.images?.[0],
        rating:product.rating,

        city:cities[idx % cities.length], // reminder 0%6 = 0 , 1 % 6 = 1,2,3,4,5,0,1,2,...
        status:statuses[idx % statuses.length], // 0%3=0,1,2,0,1,2,...
        beds:bedsList[idx % bedsList.length], // 0%5 = 1,2,3,4,0,...
        baths:bathList[idx % bathList.length], // 0%3 = 0,1,2,0,1,...
        area:600 + (idx % 10) * 1000 // sqft 600 + 0 , 600 + 100 = 700
    }));

    console.log(props);

    return props;
});

const propertySlice = createSlice({
    name: 'properties',

    initialState: {
        datas: [],
        loading: false,
        error: null,
        filters:{
            query:"",
            city:"all",
            status:"all",
            minprice:"",
            maxprice:""
        }
    },

    reducers:{
        setFilter(state,action){
            state.filters = {...state.filters,...action.payload};
        },
        clearFilter(state){
            state.filters = {
                query:"",
                city:"all",
                status:"all",
                minprice:"",
                maxprice:""
            }
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchProperties.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProperties.fulfilled, (state, action) => {
                state.loading = false;
                state.datas = action.payload;
            })
            .addCase(fetchProperties.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to load properties";
            });
    }

});

// export const { toggleFavourite } = propertySlice.actions; 
export default propertySlice.reducer;