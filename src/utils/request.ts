import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import store from '@/store';
import qs from 'qs';
import cryptoJS from 'crypto-js';
import util from '@/utils/util';
import router from '@/router';
import message from '@/components/message';

let requestCount = 0;
const cacheData: TypeRequest.CacheData = {};

axios.defaults.withCredentials = true;

axios.interceptors.request.use((conf: AxiosRequestConfig) => {
  requestCount++;
  return conf;
});

const setLoading = () => {
  requestCount--;
  if (requestCount <= 0) {
    store.dispatch('setLoading', false);
    requestCount = 0;
  }
};

axios.interceptors.response.use((response: AxiosResponse) => {
  setLoading();
  return response.data;
}, (error: AxiosError) => {
  if (error.response) {
    const data: TypeBase.JsonResult<null | string[]> = error.response.data as TypeBase.JsonResult<null> || {};
    switch (error.response.status) {
      case 400:
        message.error(data.message || '客户端错误');
        break;
      case 401:
        store.dispatch('user/clearUserData');
        router.push('/admin/login');
        break;
      case 403:
        message.error(data.message || '没有权限');
        break;
      case 404:
        message.error(data.message || '找不到资源');
        break;
      case 422:
        if (data.data && data.data.length) {
          for (const errorMessage of data.data) {
            message.error(errorMessage);
          }
        } else {
          message.error(data.message);
        }
        break;
      case 500:
        message.error(data.message || '服务器错误');
        break;
    }
  }
  setLoading();
  return Promise.reject(error);
});

const extendSignData = <T extends TypeRequest.ExtendSignData>(data: T) => {
  if (data === null || typeof data === 'undefined') {
    data = {} as T & TypeRequest.ExtendSignData & string;
  }
  const sign = util.createSign(data, store.state.user ? store.state.user.secret : '');
  // 对于FormData类型的数据做特殊处理
  if (data instanceof FormData) {
    data.append('sign', sign);
  } else if (util.isObject(data) || data instanceof Array) {
    data = {...data};
    data.sign = sign;
  }
  return data;
};

const extendHeader = <T extends TypeRequest.ExtendHeaderData>(data: T): T => {
  const uuid = util.createUuid();
  const timestamp = new Date().getTime().toString();
  data['X-Request-Id'] = uuid;
  data['X-Request-Time'] = timestamp;
  return data;
};

const request = async (...args: any): Promise<TypeBase.Result<any>> => {
  let count = 1;
  const requestFn = async (...arr: any): Promise<TypeBase.Result<any>> => {
    let conf: TypeRequest.RequestConfig = {};
    let extendConf: TypeRequest.ExtendConf = {
      prefix: '/api',
      loading: true,
    };
    // 基础配置
    if (arr[0]) {
      conf = arr[0];
    }
    // 判断是否传入扩展配置
    if (arr[1] && util.isObject(arr[1])) {
      extendConf = Object.assign(extendConf, arr[1]);
    }
    let method: string = 'POST';
    if (conf.method) {
      method = conf.method.toUpperCase();
    }
    const contentType = 'application/x-www-form-urlencoded;charset=utf-8';
    conf.headers = {'Content-Type': contentType, ...conf.headers};
    // 设置基础url
    conf.baseURL = extendConf.prefix;
    // 添加uuid与timestamp
    conf.headers = extendHeader(conf.headers);
    // 添加签名数据
    if (method === 'GET') {
      conf.params = extendSignData(conf.params);
    } else {
      conf.data = extendSignData(conf.data);
    }
    // 序列化参数
    if (method !== 'GET' && conf.headers['Content-Type'] === contentType) {
      conf.data = qs.stringify(conf.data);
    }
    if (extendConf.loading) {
      // 开启加载动画
      store.dispatch('setLoading', true);
    }

    let key: string = '';
    // 判断缓存是否存在
    if (conf.cache) {
      key = cryptoJS.MD5(JSON.stringify(conf)).toString();
      if (cacheData[key]) {
        return cacheData[key] || {};
      }
    }
    try {
      const res: any = await axios(conf);
      // 缓存存在则读取缓存
      if (conf.cache) {
        cacheData[key] = res;
      }
      // 通用状态码判断
      if (res instanceof Blob) {
        return res;
      } else if (res.code !== 0) {
        return await Promise.reject(res);
      } else {
        return res;
      }
    } catch (e) {
      if (e instanceof Object && e.response) {
        const data = e.response.data;
        if (conf.showError !== false && e.response.status === 400) {
          console.log(data.message);
        }
        return await Promise.reject(e.response);
      }
      // 请求超时
      if (e.toString().indexOf('timeout') !== -1) {
        // 重试三次
        if (count < 3 && method.toUpperCase() === 'GET') {
          count++;
          return await requestFn(...arr);
        } else {
          throw e;
        }
      } else {
        throw e;
      }
    }
  };
  return await requestFn(...args);
};

export default {
  async get<T>(conf: TypeBase.RequestParams<T>, config?: TypeRequest.ExtendConf): Promise<TypeBase.Result<any>> {
    return await request({
      method: 'get',
      ...conf,
    });
  },
  post<T>(conf: TypeBase.RequestParams<T>, config?: TypeRequest.ExtendConf): Promise<TypeBase.Result<any>> {
    return request({
      method: 'post',
      ...conf,
    }, config);
  },
};
