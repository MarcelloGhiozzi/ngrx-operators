export type ID = string;
export type Omit<T, K extends string> = Pick<T, Exclude<keyof T, K>>;
export type KeyValue<K extends string = string, V extends any = any> = {
    [P in K]: V;
};
