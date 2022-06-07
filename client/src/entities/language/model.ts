import axios from 'axios';
import { createEffect, createEvent, createStore } from 'effector';
import type { PaginatedResponse } from '@shared/types/responses';

type Language = {
  value: string;
  label: string;
};

type LanguageModel = {
  id: string;
  name: string;
};

type LanguagesState = {
  activeLanguages: string[];
  languages: Language[];
};

const getLanguagesFx = createEffect<void, Language[]>();
const changeActiveLanguageFx = createEvent<string[]>();

const $languages = createStore<LanguagesState>({
  languages: [],
  activeLanguages: []
});

getLanguagesFx.use(async () => {
  const Languages = await axios.get<PaginatedResponse<LanguageModel>>(
    'http://localhost:8000/languages'
  );

  return Languages.data.data.map(el => ({ label: el.name, value: el.id }));
});

$languages.on(getLanguagesFx.doneData, (_, languages) => ({
  activeLanguages: [],
  languages
}));

$languages.on(
  changeActiveLanguageFx,
  (state, activeLanguages) =>
    state && {
      ...state,
      activeLanguages
    }
);

export { $languages, getLanguagesFx, changeActiveLanguageFx };
