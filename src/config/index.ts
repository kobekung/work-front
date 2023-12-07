import axios from "axios";
import { APP_CONFIG } from "../env";
import _ from "lodash";
// มันจะทำให้เราไม่ต้องใส่ url ของ api บ่อยๆ
axios.defaults.baseURL = APP_CONFIG.WEBSERVICE;
// interceptor เอาไว้สำหรับเรา check ว่า token ของเราหมดอายุแล้วหรือยังนะครับ
// interceptor = req , res
// Token is expire that we check with req.
// Inceptor can set header authorization to ur project.
// Bearer , x-xml-token , token header

// 200 = req success
// 201 = ins success
// 400 = bad request
// 401 = unauthorization
// 403 = unforbian
// 503 = error page , {import , catch}
// 502 = page is not found
// 500 = ssl is error

axios.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("token");
    if (!_.isNull(token) || _.isString(token)) {
      request.headers.Authorization = `${token}`;
    }
    return request;
  },
  (error) => {
    // 403 = Forbidden
    // Need Token.
    if (error.response.status === 401) {
      window.location.href = "/clear_user_cache";
    }
    throw error;
  }
);

// response
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
    }

    return Promise.reject(error);
  }
);
