import Vue from 'vue';
import VueRouter, { RouteConfig, Route, RawLocation } from 'vue-router';
import localStorage from '@/utils/localStorage';
import $cookie from '@/utils/cookie';
import $metaInfo from '@/utils/metaInfo';
import $store from '@/store';
import $api from '@/api';
import $message from '@/components/message';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  { path: '/', component: () => import('@/views/front/Index.vue'), children: [
    {
      path: '/',
      name: 'Home',
      meta: {module: 'front', title: '首页'},
      component: () => import('@/views/front/home/Index.vue'),
    },
    {
      path: '/it.html',
      name: 'IT',
      meta: {module: 'front', title: 'IT技术'},
      component: () => import('@/views/front/it/Index.vue'),
    },
    {
      path: '/about.html',
      name: 'About',
      meta: {module: 'front', title: '关于'},
      component: () => import('@/views/front/about/Index.vue'),
    },
    {
      path: '/article/:id.html',
      name: 'ArticleDetail',
      meta: {module: 'front', title: '文章详情'},
      beforeEnter: (to: Route, from: Route, next) => {
        // 前置检查参数的ID值是否合法
        const articleId = Number(to.params.id);
        if (isNaN(articleId) || articleId <= 0) {
          $message.error('页面不存在');
          next({name: 'Home'});
          return;
        }
        next();
      },
      component: () => import('@/views/front/article/Detail.vue'),
    },
    {
      path: '/category/:id.html',
      name: 'Category',
      meta: {module: 'front', title: '分类'},
      beforeEnter: (to: Route, from: Route, next) => {
        // 前置检查参数的ID值是否合法
        const categoryId = Number(to.params.id);
        if (isNaN(categoryId) || categoryId <= 0) {
          $message.error('页面不存在');
          next({name: 'Home'});
          return;
        }
        next();
      },
      component: () => import('@/views/front/category/Index.vue'),
    },
    {
      path: '/label/:id.html',
      name: 'Label',
      meta: {module: 'front', title: '标签'},
      beforeEnter: (to: Route, from: Route, next) => {
        // 前置检查参数的ID值是否合法
        const labelId = Number(to.params.id);
        if (isNaN(labelId) || labelId <= 0) {
          $message.error('页面不存在');
          next({name: 'Home'});
          return;
        }
        next();
      },
      component: () => import('@/views/front/label/Index.vue'),
    },
  ] },
  { path: '/admin', component: () => import('@/views/admin/Admin.vue'), children: [
    {path: '/', name: 'AdminIndex', meta: {auth: true}, redirect: 'home', component: () => import('@/views/admin/Index.vue'), children: [
      {
        path: 'home',
        name: 'AdminHome',
        meta: {title: '首页'},
        component: () => import('@/views/admin/Home.vue'),
      },
      {
        path: 'article',
        name: 'AdminArticle',
        meta: {title: '文章列表'},
        component: () => import('@/views/admin/article/Index.vue'),
      },
      {
        path: 'article/add',
        name: 'AdminAddArticle',
        meta: {title: '发布文章'},
        component: () => import('@/views/admin/article/AddArticle.vue'),
      },
      {
        path: 'article/edit',
        name: 'AdminEditArticle',
        meta: {title: '编辑文章'},
        component: () => import('@/views/admin/article/EditArticle.vue'),
      },
      {
        path: 'category',
        name: 'AdminCategory',
        meta: {title: '分类管理'},
        component: () => import('@/views/admin/category/Index.vue'),
      },
      {
        path: 'comment',
        name: 'AdminComment',
        meta: {title: '评论管理'},
        component: () => import('@/views/admin/comment/Index.vue'),
      },
      {
        path: 'friendlink',
        name: 'AdminFriendlink',
        meta: {title: '友情链接'},
        component: () => import('@/views/admin/friendlink/Index.vue'),
      },
      {
        path: 'label',
        name: 'AdminLabel',
        meta: {title: '标签管理'},
        component: () => import('@/views/admin/label/Index.vue'),
      },
      {
        path: 'qiniu',
        name: 'AdminQiniu',
        meta: {title: '七牛云资源'},
        component: () => import('@/views/admin/qiniu/Index.vue'),
      },
      {
        path: 'system/config',
        name: 'AdminSystemConfig',
        meta: {title: '系统设置'},
        component: () => import('@/views/admin/system/Config.vue'),
      },
    ]},
    {path: 'login', name: 'AdminLogin', component: () => import('@/views/admin/Login.vue')},
  ] },
  {
    path: '*',
    redirect: '/',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// 上报访客数据
const track = (to: Route) => {
  const formData: TypeCommon.TrackFormData = {
    url: window.location.href,
    referer: window.document.referrer,
    device: window.navigator.userAgent,
    route_name: to.name || '',
  };
  if (to.name === 'ArticleDetail') {
    formData.article_id = to.params.id;
  }
  if (to.name === 'Category') {
    formData.category_id = to.params.id;
  }
  if (to.query) {
    const queryArr = [];
    for (const key of Object.keys(to.query)) {
      queryArr.push(`${key}=${to.query[key]}`);
    }
    formData.query_string = queryArr.join('&');
  }
  try {
    $api.front.track(formData);
  } catch (e) {
    console.log(e);
  }
};

router.beforeEach((to: Route, from: Route, next) => {
  $store.dispatch('setDrawer', false);
  const userData: TypeUser.Detail = localStorage.get('userData');
  // 判断该页面是否需要登录
  if (to.meta.auth) {
      // 如果token存在直接跳转
      if (userData) {
          next();
      } else {
          // 否则跳转到login登录页面
          next({
              path: '/admin/login',
              // 跳转时传递参数到登录页面，以便登录后可以跳转到对应页面
              query: {
                  redirect: to.fullPath,
              },
          });
      }
  } else {
      // 如果不需要登录，则直接跳转到对应页面
      next();
  }
  if (to.meta.module === 'front') {
    const systemConfig = localStorage.get('systemConfig') as TypeStoreSystemConfig.SystemConfigState;
    $metaInfo({
      title: `${to.meta.title} | ` + (systemConfig ? systemConfig.name : '吴宇博客'),
    });
  }
});

router.afterEach((to: Route, from: Route) => {
  // 上报访客数据
  const lastPath = $cookie.get('TRACK_VALID');
  if (to.meta.module === 'front' && lastPath !== to.path) {
    // 设置cookie，60秒后过期
    $cookie.set('TRACK_VALID', to.path, 60, '/');
    track(to);
  }
});

const routerPush: (location: RawLocation) => Promise<Route>  = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location: RawLocation): Promise<any> {
  return routerPush.call(this, location).catch((e) => {
    if (e.toString().indexOf('Avoided redundant navigation to current location') > -1) {
      console.warn(e);
    } else {
      console.error(e);
    }
  });
};

export default router;
