export type Language = {
  value: string;
  label: string;
};

export type LanguageModel = {
  id: string;
  name: string;
};

export type LanguagesState = {
  languagesList: Language[];
};
