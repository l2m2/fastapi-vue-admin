import axios from "axios";
import store from "@/store";
import notification from "ant-design-vue/es/notification";

const service = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 6000
});

service.interceptors.request.use(
  config => {
    config.headers["Authorization"] = "Bearer " + store.getters.token;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    const res = response.data;
    return res;
  },
  async error => {
    const { data, statusText } = error.response;
    let m = { message: statusText };
    if (data && data.detail) {
      if (typeof data.detail === "string") {
        m.description = data.detail;
      } else {
        m.description = JSON.stringify(data.detail).replace(/"([^"]+)":/g, "$1:");
      }
    }
    notification.error(m);
    return Promise.reject(error);
  }
);

export default service;
