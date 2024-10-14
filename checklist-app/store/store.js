import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
//import Api slices
import { indexApi } from '../api/indexApi'
//import reducers
import userReducer from './features/userSlice'
import actionReduer from './features/actionSlice'
import checklistReducer from './features/checklistSlice'
import userCheckReducer from './features/userCheckSlice'
import commentReducer from './features/commentSlice'
import siteReducer from './features/siteSlice'
import { combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

// import { APPWRITE_SECRET } from '@env'

const rootReducer = combineReducers({
  [indexApi.reducerPath]: indexApi.reducer,
  site: siteReducer,
  user: userReducer,
  flag: actionReduer,
  checklist: checklistReducer,
  userCheck: userCheckReducer,
  comment: commentReducer,
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user', 'flag', 'checklist', 'site', 'userCheck', 'comment'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(indexApi.middleware),
})
setupListeners(store.dispatch)
export const persistor = persistStore(store)
