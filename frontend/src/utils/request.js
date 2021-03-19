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
    let msg = "Unknown Error";
    if (error.response.status === 500) {
      msg = "Internal Server Error";
    } else {
      msg = error.response.data.detail;
    }
    notification.error({
      message: "Error",
      description: msg
    });
    return Promise.reject(error);
  }
);

export default service;
