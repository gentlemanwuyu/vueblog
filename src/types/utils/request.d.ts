import { AxiosRequestConfig } from 'axios';
declare global {
  namespace TypeRequest {
    export interface CacheData {
      [key: string]: any;
    }
    export interface RequestConfig extends AxiosRequestConfig {
      cache?: boolean;
      method?: 'get' | 'post' | 'GET' | 'POST';
      showError?: boolean;
    }
    export interface ExtendConf {
      prefix?: string;
      loading?: boolean;
      showError?: boolean; 
    }
    export interface ExtendSignData {
      sign: string;
    }
    
    export interface ExtendHeaderData {
      "X-Request-Id": string;
      "X-Request-Time": string;
    }
  }
} 
