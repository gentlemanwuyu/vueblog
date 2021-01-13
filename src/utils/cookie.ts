const cookie: TypeCookie = {
  get(key: string): any {
    if (0 < document.cookie.length) {
      let start = document.cookie.indexOf(key + '=');
      if (-1 < start) {
        start = start + key.length + 1;
        let end = document.cookie.indexOf(';', start);
        if (-1 === end) {
          end = document.cookie.length;
        }
        return unescape(document.cookie.substring(start, end));
      }
    }
    return '';
  },
  set(key: string, value: any, ttl: number, path?: string): void {
    if (!path) {
      path = '/';
    }
    const expireTime = new Date();
    expireTime.setTime(expireTime.getTime() + ttl * 1000);
    document.cookie = key + '=' + escape(value) + ';path=' + path +
      ((ttl === undefined) ? '' : ';expires=' + expireTime.toUTCString());
  },
  remove(key: string) {
    this.set(key, '随便什么值，反正都要被删除了', -1);
  },
};
export default cookie;
