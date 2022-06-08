import axios from 'axios';
import { createEffect, createStore } from 'effector';
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
  languagesList: Language[];
};

const getLanguagesFx = createEffect<void, Language[]>();

const $languages = createStore<LanguagesState>({
  languagesList: []
});

getLanguagesFx.use(async () => {
  const Languages = await axios.get<PaginatedResponse<LanguageModel>>(
    'http://localhost:8000/languages'
  );

  return Languages.data.data.map(el => ({ label: el.name, value: el.id }));
});

$languages.on(getLanguagesFx.doneData, (_, languagesList) => ({
  languagesList
}));

export { $languages, getLanguagesFx };
