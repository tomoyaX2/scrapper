export const keys = <T extends {}>(obj: T): (keyof T)[] => {
  const k: (keyof T)[] = [];
  for (const key in obj) k.push(key);
  return k;
};
