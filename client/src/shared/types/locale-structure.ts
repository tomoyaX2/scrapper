type CommonNamespaceStructure = { kek: 'dsad' };

type HomeNamespaceStructure = {
  title: 'Home';
  footer: { ti: { pidor: ' NO' } };
};

type LocaleStructure = CommonNamespaceStructure & HomeNamespaceStructure;

export type { LocaleStructure };
