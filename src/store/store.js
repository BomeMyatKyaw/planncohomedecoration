import {configureStore} from '@reduxjs/toolkit'
import clientsaySlice from './clientsaySlice';
import contactformSlice from './contactFormSlice';
import furnitureReducer from './furnitureSlice';
import customerReducer from './customerSlice';
import propertyReducer from './propertySlice';

export default configureStore({
    reducer:{
        clientsays:clientsaySlice,
        contactforms:contactformSlice,
        furnitures:furnitureReducer,
        customers:customerReducer,
        properties:propertyReducer
    }
});