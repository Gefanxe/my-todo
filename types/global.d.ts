declare type Recordable<T = any> = Record<string, T>;

declare interface todoItem {
  id: number;
  value: string;
  completed?: boolean;
}
