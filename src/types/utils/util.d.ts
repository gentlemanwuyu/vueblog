import {Moment} from 'moment';
declare global {
  interface TypeUtil {
    /**
     * 创建uuid
     *
     * @returns {string}
     *
     * @memberOf TypeUtil
     */
    createUuid(): string;
    /**
     * 创建签名
     *
     * @template T
     * @param {T} data
     * @param {string} secret
     * @returns {string}
     *
     * @memberOf TypeUtil
     */
    createSign<T>(data: T, secret: string): string;
    /**
     * 数据键排序
     *
     * @template T
     * @param {T} data
     * @returns {T}
     *
     * @memberOf TypeUtil
     */
    dataKeySort<T>(data: T): T;
    /**
     * 判断是不是字面量对象
     *
     * @param {*} data
     * @returns {boolean}
     *
     * @memberOf TypeUtil
     */
    isObject(data: any): boolean;
    /**
     * 深度拷贝数据
     *
     * @template T
     * @param {T} data
     * @returns {T}
     *
     * @memberOf TypeUtil
     */
    deepCopy<T>(data: T): T;
    // 添加调度任务事件
    dispatch(
      context: Vue,
      componentName: string,
      eventName: string,
      params: any[]
    ): void;
    /**
     * 给传入的参数数据创建唯一的_rowIndex
     * @param data
     */
    createTableRowKey(data: any): any;
  }
} 
