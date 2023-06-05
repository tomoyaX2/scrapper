import { combineReducers } from '@reduxjs/toolkit';
import list from './list';
import tags from './tags';
import languages from './languages';
import types from './tags';
import item from './item';

export default combineReducers({
  list,
  tags,
  languages,
  types,
  item
});
