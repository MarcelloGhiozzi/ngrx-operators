export const mapObject = <T extends object>(object: T, f: (value: T[keyof T], key?: string) => any) => {
  const r = {};
  Object.keys(object).forEach(key => {
    r[key] = f(object[key], key);
  });
  return r;
};
