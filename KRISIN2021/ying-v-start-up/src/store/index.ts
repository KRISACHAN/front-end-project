import { InjectionKey } from 'vue';
import { createStore, Store, useStore as vuexUseStore } from 'vuex';
import user, { IUserState, IUserStore }  from './modules/user';

export interface IRootState {
    user: IUserState;
}

export type IRootStore = IUserStore<Pick<IRootState, 'user'>>;

const store = createStore({
    strict: true,
    modules: {
        user
    },
});
export const key: InjectionKey<Store<IRootState>> = Symbol();

export const useStore = () => vuexUseStore<IRootState>();

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $store: IRootStore;
    }
}

export default store;