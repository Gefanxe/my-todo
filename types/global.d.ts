declare type Recordable<T = any> = Record<string, T>;

declare interface todoItem {
  identifyId: string;
  id: number;
  value: string;
  completed?: boolean;
}
