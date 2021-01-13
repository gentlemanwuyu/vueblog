import {MutationTree, Module, ActionTree} from 'vuex';
import localStroage from '@/utils/localStorage';
import $api from '@/api';

const userData = localStroage.get('userData');
const userState: TypeStoreUser.UserState = userData || {
  secret: 'QnSKTmZjbjWjIwgM',
  userName: '',
  auth: false,
};

const mutations: MutationTree<TypeStoreUser.UserState> = {
  SET(state: {[key: string]: any}, data: {[key: string]: any}) {
    for (const key in data) {
      if (typeof state[key] !== 'undefined') {
        state[key] = data[key];
      }
    }
    localStroage.set('userData', state);
  },
  CLEAR_USER_DATA(state: TypeStoreUser.UserState) {
    state.auth = false;
    localStroage.remove('userData');
  },
};

const actions: ActionTree<TypeStoreUser.UserState, any> = {
  setData({commit}, data: TypeStoreUser.UserState) {
    commit('SET', data);
  },
  clearUserData({commit}) {
    commit('CLEAR_USER_DATA');
  },
  async initUserMsg({commit, dispatch}, callback: () => void) {
    const { data } = await $api.user.detail<TypeUser.Detail>();
    commit('SET', {
      auth: true,
      userName: data.name,
    });
    if (typeof callback === 'function') {
      callback();
    }
  },
};

const module: Module<TypeStoreUser.UserState, any> =  {
  namespaced: true,
  state: userState,
  mutations,
  actions,
};
export default module;
