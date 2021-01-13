declare interface TypeCookie {
  set(key: string, value: any, ttl: number, path?: string): void;
  get(key: string): any;
  remove(key: string): void;
}