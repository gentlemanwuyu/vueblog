declare interface TypeLocalStorage {
  get(key: string): any;
  set(key: string, data: any): void;
  remove(key: string): void;
  clear(key: string): void;
}