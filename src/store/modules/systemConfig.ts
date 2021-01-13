import {MutationTree, Module, ActionTree} from 'vuex';
import $localStorage from '@/utils/localStorage';
import $api from '@/api';

const systemConfig = $localStorage.get('systemConfig');
const systemConfigState: TypeStoreSystemConfig.SystemConfigState = systemConfig || {
  name: '吴宇博客',
  address: 'https://www.woozee.com.cn/',
  email: '',
  title: '',
  keyword_list: [],
  desc: '',
  icp: '',
};

const mutations: MutationTree<TypeStoreSystemConfig.SystemConfigState> = {
  SET(state: {[key: string]: any}, data: {[key: string]: any}) {
    for (const key in data) {
      if (typeof state[key] !== 'undefined') {
        state[key] = data[key];
      }
    }
  },
};

const actions: ActionTree<TypeStoreSystemConfig.SystemConfigState, any> = {
  async initSystemConfig({commit}) {
    const { data } = await $api.front.systemConfig<TypeCommon.SystemConfig>();
    $localStorage.set('systemConfig', data);
    commit('SET', data);
  },
};

const module: Module<TypeStoreSystemConfig.SystemConfigState, any> =  {
  namespaced: true,
  state: systemConfigState,
  mutations,
  actions,
};
export default module;
