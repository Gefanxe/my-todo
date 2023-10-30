import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios";
// import { useUserStoreHook } from "@/store/modules/user";

// 創建 axios 實例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: { "Content-Type": "application/json;charset=utf-8" },
});

// 請求攔截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // const userStore = useUserStoreHook();
    // if (userStore.token) {
    //   config.headers.Authorization = userStore.token;
    // }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// 響應攔截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // const { code, msg } = response.data;
    // if (code === "00000") {
    //   return response.data;
    // }
    // 響應數據為二進制流處理(Excel導出)
    // if (response.data instanceof ArrayBuffer) {
    //   return response;
    // }

    // ElMessage.error(msg || "系統出錯");
    if (response.data) {
      return response;
    } else {
      return Promise.reject(new Error("Error"));
    }

    // console.log(msg || "系統出錯");
    // return Promise.reject(new Error(msg || "Error"));
  },
  (error: any) => {
    // TODO: 404, 500... and more

    // TODO: 自訂錯誤, 如 token 過期或其他系統錯誤
    // if (error.response.data) {}

    console.log('error: ', error);
    return Promise.reject(error.message);
  }
);

// 導出 axios 實例
export default service;
