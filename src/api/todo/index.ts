import request from "@/utils/request";
import { ListPageResult, addTodoData, deleteTodoData, updateTodoData } from "./types";

export function getTodoList(_identifyId: string): ListPageResult {
    return request({
        url: "/todo/list",
        method: "get",
        params: {
          identifyId: _identifyId
        }
    });
}

export function addTodoList(_data: addTodoData) {
  return request<ResponseResult>({
    url: '/todo/add',
    method: 'post',
    data: _data
  });
}

export function updateTodoList(_data: updateTodoData) {
  return request<ResponseResult>({
    url: '/todo/update',
    method: 'post',
    data: _data
  });
}

export function deleteTodoList(_data: deleteTodoData) {
  return request<ResponseResult>({
    url: '/todo/delete',
    method: 'post',
    data: _data
  });
}
