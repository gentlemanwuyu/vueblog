import VueRouter, { Route } from 'vue-router';
import Confirm from '@/components/confirm/Confirm.vue';

declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter; // 这表示this下有这个东西
    $route: Route;
    $api: TypeApi;
    $config: TypeConfig;
    $util: TypeUtil;
    $message: TypeComponentMessage.Message;
    $confirm: (config: TypeComponentConfirm.Config) => void;
    $preview: (url: string) => void;
    $metaInfo: (metaOpts: {[key: string]: string}) => void;
  }
}

