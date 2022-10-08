import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
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
  users
});

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
export type RootState = ReturnType<typeof reducer>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
