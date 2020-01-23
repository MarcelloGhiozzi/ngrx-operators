export const mapObject = <T extends object>(object: T, f: (value: T[keyof T]) => any) => {
  const r = {};
  Object.keys(object).forEach(key => {
    r[key] = f(object[key]);
  });
  return r;
};
