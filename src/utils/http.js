"use strict";

import loadding from '../pluging/loadding/loadding'
import axios from "axios";
import qs from "qs";
import router from '../router'
import $ from 'jquery'

//添加请求拦截器
axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//添加响应拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.resolve(error.response);
  }
);

axios.defaults.baseURL = "";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json;charset=UTF-8";
// axios.defaults.headers.post["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.timeout = 50000;

function checkStatus(response) {
  return new Promise((resolve, reject) => {
    if (
      response &&
      (response.status === 200 ||
        response.status === 304 ||
        response.status === 400)
    ) {
      resolve(response.data);
    } else {
      resolve({
        "return_code": "0", //状态 {200：标识成功；0：标识失败}。
        "return_msg": "网络异常" //信息。
      });
    }
  });
}

export default {
  post(url, params) {
    loadding.show();
    return axios({
      method: "post",
      url,
      data: params
    }).then(response => {
      loadding.close();
      return checkStatus(response);
    });
  },
  postV(url, params) {
    var token = sessionStorage.token;
    if (token) {
      params = $.extend(true, params, {
        token: token
      });
    } else {
      window.$showToast("请登录");
      router.push({
        name: "Login"
      });
      return new Promise((resolve, reject) => {
        resolve({
          "return_code": "-1",
          "return_msg": "未登录"
        })
      })
    }

    loadding.show();
    return axios({
      method: "post",
      url,
      data: params
    }).then(response => {
      loadding.close();
      return checkStatus(response);
    });
  },
  get(url, params) {
    params = qs.stringify(params);
    return axios({
      method: "get",
      url,
      params
    }).then(response => {
      return checkStatus(response);
    });
  },
  imgpost(url, formData, params) {
    var token = sessionStorage.token;
    if (token) {
      params["token"] = token;
      var a = JSON.stringify(params);
      formData.append('data', a);
    } else {
      window.$showToast("请登录");
      // setTimeout(() => {
      router.push({
        name: "Login"
      });
      // }, 1500);
      return new Promise((resolve, reject) => {
        resolve({
          "return_code": "-1",
          "return_msg": "未登录"
        })
      })
    }

    loadding.show();
    return axios({
      method: "post",
      url,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then(response => {
      loadding.close();
      return checkStatus(response);
    });
  }
};
