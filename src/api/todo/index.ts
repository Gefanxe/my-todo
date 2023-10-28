import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { ListPageResult } from "./types";
// import { CaptchaResult, LoginData, LoginResult } from "./types";

export function testApi() {
    return request({
        url: '/testapi',
        method: 'get'
    });
}

export function getTodoList(): AxiosPromise<ListPageResult> {
    return request({
        url: "/api/v1/roles/page",
        method: "get",
    });
}

export function addTodo() { }

export function updateTodo() { }

export function deleteTodo() { }

/**
 * 登錄API
 *
 * @param data {LoginData}
 * @returns
 */
// export function loginApi(data: LoginData): AxiosPromise<LoginResult> {
//   const formData = new FormData();
//   formData.append("username", data.username);
//   formData.append("password", data.password);
//   formData.append("verifyCodeKey", data.verifyCodeKey || "");
//   formData.append("verifyCode", data.verifyCode || "");
//   return request({
//     url: "/api/v1/auth/login",
//     method: "post",
//     data: formData,
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
// }

/**
 * 註銷API
 */
// export function logoutApi() {
//   return request({
//     url: "/api/v1/auth/logout",
//     method: "delete",
//   });
// }

/**
 * 獲取驗證碼
 */
// export function getCaptchaApi(): AxiosPromise<CaptchaResult> {
//   return request({
//     url: "/api/v1/auth/captcha",
//     method: "get",
//   });
// }
