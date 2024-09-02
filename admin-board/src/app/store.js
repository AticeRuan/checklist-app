import { configureStore } from '@reduxjs/toolkit'
//import Api slices
import { userApi } from './api/userApi'
import { templateApi } from './api/templateApi'
import { categoryApi } from './api/categoryApi'
import { siteApi } from './api/siteApi'
import { ipAddressApi } from './api/ipAddress'
import { listitemApi } from './api/listitemApi'
//import reducers
import authReducer from './features/auth/authSlice'
import userReducer from './features/user/userSlice'
import templateReducer from './features/template/templateSlice'
import categoryReducer from './features/category/categorySlice'
import siteReducer from './features/site/siteSlice'
import ipAddressReducer from './features/ipAddress/ipAddressSlice'
import listitemReducer from './features/listitem/listitemSlice'
export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [templateApi.reducerPath]: templateApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [siteApi.reducerPath]: siteApi.reducer,
    [ipAddressApi.reducerPath]: ipAddressApi.reducer,
    [listitemApi.reducerPath]: listitemApi.reducer,
    auth: authReducer,
    user: userReducer,
    template: templateReducer,
    category: categoryReducer,
    site: siteReducer,
    ipAddress: ipAddressReducer,
    listitem: listitemReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(templateApi.middleware)
      .concat(categoryApi.middleware)
      .concat(siteApi.middleware)
      .concat(ipAddressApi.middleware)
      .concat(listitemApi.middleware),
})
