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
import { combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { encryptTransform } from 'redux-persist-transform-encrypt'

import tokenMiddleware from './middleware/tokenMiddleware'

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const rootReducer = combineReducers({
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
})

const persistConfig = {
  key: 'root',
  storage,
  transforms: [
    encryptTransform({
      secretKey: import.meta.env.VITE_SECRET,
      onError: function (error) {
        console.log('error', error)
      },
    }),
  ],
  whitelist: [
    'auth',
    'user',
    'template',
    'category',
    'site',
    'ipAddress',
    'listitem',
  ],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(userApi.middleware)
      .concat(templateApi.middleware)
      .concat(categoryApi.middleware)
      .concat(siteApi.middleware)
      .concat(ipAddressApi.middleware)
      .concat(listitemApi.middleware)
      .concat(tokenMiddleware),
})
export const persistor = persistStore(store)
