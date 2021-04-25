import { Module, Store } from 'vuex';
import { IRootState } from '..';
import { eq, isNil, merge } from 'lodash';

export const USER_TYPES = {
    REFREST_USER: 'REFREST_USER',
};

export enum RoleTypes {
    user = 0,
    vip,
    svip
};

export interface IUserState {
    id?: string;
    name?: string;
    sex?: number;
    mobileNumber?: string;
    token?: string;
    role?: RoleTypes;
};

export type IUserStore<S = IUserState> = Store<S>;

const user: Module<IUserState, IRootState> = {
    namespaced: true,
    state: {
        id: '15019483017',
        name: '鱼头',
        sex: 26,
        mobileNumber: '15019483017',
        token: 'abcdefghijklmnopqrstuvwxyz',
        role: RoleTypes.svip
    },
    getters: {
        isLogin({ role }) {
            return !isNil(role) && !eq(role, RoleTypes.user);
        },
        userInfo(state) {
            return state;
        }
    },
    mutations: {
        [USER_TYPES.REFREST_USER](state, userInfo) {
            state = merge(state, userInfo)
        }
    },
    actions: {
        refrestUser({ commit }, userInfo: IUserState) {
            commit(USER_TYPES.REFREST_USER, userInfo);
        }
    }
};

export default user;