import cryptoJS from 'crypto-js';
import moment, {Moment} from 'moment';

let tableRowIndex: number = 0;

const util: TypeUtil =  {
  createUuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      // tslint默认禁止位操作，可以通过注释让tslint忽略该问题
      // tslint:disable-next-line: no-bitwise
      const  r = Math.random() * 16 | 0;
        // tslint:disable-next-line: no-bitwise
      const  v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },
  createSign<T>(data: T, secret: string): string {
    if (data instanceof FormData) {
      const newData: any = {};
      for (const key in data) {
        if (!(data.get(key) instanceof File)) {
          newData[key] = data.get(key);
        }
      }
      data = newData as T;
    }
    data = this.dataKeySort<T>(data);
    const str = secret + JSON.stringify(data) + secret;
    return cryptoJS.MD5(str).toString();
  },
  dataKeySort<T>(data: T): T {
    const keys = Object.keys(data).sort();
    let newData: any = [];
    if (data instanceof Array) {
      newData = [];
    } else if (data instanceof Object) {
      newData = {};
    }
    keys.forEach((key: string) => {
      // @ts-ignore
      newData[key] = data[key];
    });
    return newData as T;
  },
  isObject(data: any): boolean {
    return [].toString.call(data) === '[object Object]';
  },
  deepCopy<T>(data: T): T {
    try {
      return JSON.parse(JSON.stringify(data));
    } catch (e) {
      return data;
    }
  },
  dispatch(context: Vue, componentName: string, eventName: string, params: any[]): void {
    let parent: any = context.$parent || context.$root;
    let name = parent.componentName;
    while (parent && (!name || name !== componentName)) {
      parent = parent.$parent;
      if (parent) {
        name = parent.componentName;
      }
    }
    if (parent) {
      const arr: any[] = [eventName, ...params];
      parent.$emit.apply(parent, arr);
    }
  },
  createTableRowKey(data: any): any {
    if (data instanceof Array) {
      data.forEach((item: any) => {
        item._rowKey = tableRowIndex++;
      });
    } else if (this.isObject(data)) {
      data._rowKey = tableRowIndex++;
    }
    return data;
  },
};

export default util;
