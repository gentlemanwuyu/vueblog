import { ActionTree, MutationTree, Module } from 'vuex';
import localStroage from '../../utils/localStorage';

const tabpageState: TypeStoreTabPage.TabpageState = {
    list: localStroage.get('tabData') as TypeStoreTabPage.TabItem[] || [],
};

const getDataIndexByKey = (data: TypeStoreTabPage.TabItem[], key: string): number => {
    for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
            return i;
        }
    }
    return -1;
};

const mutations: MutationTree<TypeStoreTabPage.TabpageState> = {
    PUSH(state: TypeStoreTabPage.TabpageState, data: TypeStoreTabPage.TabItem) {
        const res = state.list.filter((item: TypeStoreTabPage.TabItem) => {
            return item.key === data.key;
        });
        if (res && res.length) {
            const item = res[0];
            if (item.cache !== data.cache || data.path !== item.path) {
                const index = getDataIndexByKey(state.list, item.key);
                state.list.splice(index, 1, data);
            }
        } else {
            state.list.push(data);
        }
    },
    REMOVE(state: TypeStoreTabPage.TabpageState, key: string) {
        const index = getDataIndexByKey(state.list, key);
        state.list.splice(index, 1);
    },
    INIT(state: TypeStoreTabPage.TabpageState) {
        state.list = [];
    },
    UPDATE_CACHE(state: TypeStoreTabPage.TabpageState) {
        localStroage.set('tabData', state.list);
    },
    LOAD_CACHE(state: TypeStoreTabPage.TabpageState) {
        state.list = localStroage.get('tabData') as TypeStoreTabPage.TabItem[] || [];
    },
    SPLICE(state: TypeStoreTabPage.TabpageState, params: TypeStoreTabPage.SpliceParam) {
        state.list.splice(params.index, params.num);
    },
};

const actions: ActionTree<TypeStoreTabPage.TabpageState, any> = {
    init({commit, state}) {
        commit('INIT');
        commit('UPDATE_CACHE');
    },
    push({commit}, data: TypeStoreTabPage.TabItem) {
        commit('PUSH', data);
        commit('UPDATE_CACHE');
    },
    remove({commit, state}, key: string) {
        const index = getDataIndexByKey(state.list, key);
        commit('REMOVE', key);
        commit('UPDATE_CACHE');
        return index;
    },
    updateCache({commit}) {
        commit('UPDATE_CACHE');
    },
    loadCache({commit}) {
        commit('LOAD_CACHE');
    },
    getItemByKey({state}, key: string): TypeStoreTabPage.TabItem|null {
        const res =  state.list.filter((item: TypeStoreTabPage.TabItem) => {
            return item.key !== key;
        });
        if (res && res.length) {
            return res[0];
        } else {
            return null;
        }
    },
    getPrevItemByKey({state}, key: string): TypeStoreTabPage.TabItem|null {
        const index = getDataIndexByKey(state.list, key);
        return state.list[index - 1];
    },
    getIndexByKey({state}, key: string): number {
        return getDataIndexByKey(state.list, key);
    },
    splice({commit}, params: TypeStoreTabPage.SpliceParam) {
        commit('SPLICE', params);
    },
};

const module: Module<TypeStoreTabPage.TabpageState, any> =  {
    namespaced: true,
    state: tabpageState,
    mutations,
    actions,
};
export default module;
