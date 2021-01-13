import Pagination from './Pagination.vue';

export default {
    install(Vue: any) {
        Vue.component('pagination', Pagination);
    },
};
