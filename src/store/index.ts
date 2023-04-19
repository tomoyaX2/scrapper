import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import axios, { AxiosRequestConfig } from 'axios';
import authors from './authors';
import tags from './tags';
import groups from './groups';
import languages from './languages';
import series from './series';
import types from './types';
import albums from './albums';
import album from './album';
import reader from './reader';
import auth from './auth';
import user from './user';
import users from './users';
import galleries from './galleries';
import notifications from './notifications';
import navigation from './navigation';

import { Middleware } from 'redux';

const reducer = combineReducers({
  tags,
  authors,
  groups,
  languages,
  series,
  types,
  albums,
  album,
  reader,
  auth,
  user,
  users,
  galleries,
  notifications,
  navigation
});

const initToken = () => {
  axios.interceptors.request.use((config: AxiosRequestConfig) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken && config?.headers?.access_toke) {
      config.headers.access_token = accessToken;
    }

    return config;
  });
};

const customMiddleware: Middleware<{ state: RootState }, RootState> =
  store => next => action => {
    next(action);
    return { state: store.getState() };
  };

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().prepend(customMiddleware)
});

type RootState = ReturnType<typeof reducer>;
type AppDispatch = typeof store.dispatch;

const useAppDispatch: () => AppDispatch = useDispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { initToken, useAppSelector, useAppDispatch };
export type { RootState, AppDispatch };
export default store;
