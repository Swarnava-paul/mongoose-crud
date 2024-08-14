import { configureStore } from "@reduxjs/toolkit";

// slices
import { usersApi } from "../features/usersApiSlics";
import { bookApi } from "../features/BookapiSlice";

const Store = configureStore({
  reducer : {
    [usersApi.reducerPath] : usersApi.reducer,
    [bookApi.reducerPath] : bookApi.reducer
  },

  middleware : (getDefaultMiddleware) => 
    getDefaultMiddleware()
                 .concat(bookApi.middleware)
                 .concat(usersApi.middleware)    
})

export default Store;