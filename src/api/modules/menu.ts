import request from '@/utils/request';

const menu = {
  // 菜单列表
  async list<T>() {
    return await request.post({
      url: '/admin/menu/list',
    }) as TypeBase.JsonResult<T>;
  },
};

export default menu;
