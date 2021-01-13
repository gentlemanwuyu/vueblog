const localStroage: TypeLocalStorage = {
  get(key: string): any {
      const data: any = window.localStorage.getItem(key);
      try {
          return JSON.parse(data);
      } catch (e) {
          return data;
      }
  },
  set(key: string, data: any): void {
      if (data instanceof Object) {
          data = JSON.stringify(data);
      }
      window.localStorage.setItem(key, data);
  },
  remove(key: string) {
      window.localStorage.removeItem(key);
  },
  clear(): void {
      window.localStorage.clear();
  },
};
export default localStroage;
