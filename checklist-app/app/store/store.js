import { configureStore } from '@reduxjs/toolkit'
//import Api slices
import { actionApi } from '../api/actionApi'
import { checklistApi } from '../api/checklistApi'
import { commentApi } from '../api/commentApi'
import { siteApi } from '../api/siteApi'
import { userCheckApi } from '../api/userCheckApi'
//import reducers
import siteReducer from './features/siteSlice'
import userReducer from './features/userSlice'
import actionReduer from './features/actionSlice'
import checklistReducer from './features/checklistSlice'
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
  [actionApi.reducerPath]: actionApi.reducer,
  [checklistApi.reducerPath]: checklistApi.reducer,
  [commentApi.reducerPath]: commentApi.reducer,
  [siteApi.reducerPath]: siteApi.reducer,
  [userCheckApi.reducerPath]: userCheckApi.reducer,
  site: siteReducer,
  user: userReducer,
  flag: actionReduer,
  checklist: checklistReducer,
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user', 'flag', 'checklist', 'site'],
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
      .concat(actionApi.middleware)
      .concat(userCheckApi.middleware)
      .concat(commentApi.middleware)
      .concat(siteApi.middleware)
      .concat(checklistApi.middleware),
})
export const persistor = persistStore(store)
