import { AxiosPromise } from "axios";

export interface todoItem {
    identifyId: string;
    id: number;
    value: string;
    isEdit?: boolean
    completed?: boolean;
}

// export type ListPageResult = ApiResponseDataPromise<PageResult<todoItem[]>>;
export type ListPageResult = AxiosPromise<PageResult<todoItem[]>>;

export interface addTodoData {
  identifyId: string;
  id: number;
  value: string;
}

export interface updateTodoData {
  identifyId: string;
  id: number;
  value?: string;
  completed?: boolean;
}

export interface deleteTodoData {
  identifyId: string;
  id: number;
}