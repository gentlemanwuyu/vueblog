declare namespace TypeCommon {
  /**
   * 菜单
   * 
   * @exports
   * @interface MenuItem
   */
  export interface MenuItem {
    id: number;
    title: string;
    icon?: string;
    route?: string;
    children?: MenuItem[];
  }
  /**
   * 前端用户信息
   * 
   * @exports
   * @interface FrontUserInfo
   */
  export interface FrontUserInfo {
    username: string;
    email: string;
    link: string;
  }
  /**
   * 系统配置
   * 
   * @exports
   * @interface SystemConfig
   */
  export interface SystemConfig {
    name: string;
    address: string;
    email: string;
    title: string;
    keyword_list: string[];
    desc: string;
    icp: string;
  }
  export interface TrackFormData {
    ip?: string;
    url: string;
    referer: string;
    device: string;
    route_name: string;
    category_id?: string;
    article_id?: string;
    query_string?: string;
  }
}