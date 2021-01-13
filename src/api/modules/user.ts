import request from '@/utils/request';

const user = {
  // 登入
  async detail<T>() {
    return await request.post({
      url: '/admin/user/detail',
    }) as TypeBase.JsonResult<T>;
  },
};

export default user;
