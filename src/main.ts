import Vue from 'vue';
import '@/plugins/axios';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import vuetify from '@/plugins/vuetify';
import $api from '@/api';
import $util from '@/utils/util';
import $config from '@/config';
import $message from '@/components/message';
import $confirm from '@/components/confirm';
import $preview from '@/components/preview';
import Pagination from '@/components/pagination';
import MavonEditor from 'mavon-editor';
import MdDisplay from '@/components/mdDisplay';
import ShortDisplay from '@/components/shortDisplay';
import $metaInfo from '@/utils/metaInfo';

import 'mavon-editor/dist/css/index.css';
import '@/assets/style/global.scss';

Vue.config.productionTip = false;
Vue.prototype.$util = $util;
Vue.prototype.$api = $api;
Vue.prototype.$config = $config;
Vue.prototype.$message = $message;
Vue.prototype.$confirm = $confirm;
Vue.prototype.$preview = $preview;
Vue.prototype.$metaInfo = $metaInfo;
Vue.use(Pagination);
Vue.use(MavonEditor);
Vue.use(MdDisplay);
Vue.use(ShortDisplay);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
