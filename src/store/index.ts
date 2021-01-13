import Vue from 'vue';
import Vuex, {Store} from 'vuex';
import loadModules from '@/utils/loadModules';

const modulesFiles = require.context('./modules', false, /\.ts$/);
const modules: any = loadModules(modulesFiles);

Vue.use(Vuex);

const store: Store<TypeVuex.Store> = new Vuex.Store({
  state: {
    loading: false,
    headerTitle: '',
    drawer: false,
  },
  mutations: {
    SET_LOADING(state: any, flag: boolean) {
      state.loading = flag;
    },
    SET_DRAWER(state: any, drawer: boolean) {
      state.drawer = drawer;
    },
    SET_TITLE(state: any, title: string) {
      state.headerTitle = title;
    },
  },
  actions: {
    setLoading({commit}, flag: boolean) {
      commit('SET_LOADING', flag);
    },
    setTitle({commit}, title: string) {
      commit('SET_TITLE', title);
    },
    setDrawer({commit}, drawer: boolean) {
      commit('SET_DRAWER', drawer);
    },
  },
  modules: {
    ...modules,
  },
});

export default store;
