import { defineComponent } from 'vue';
import { computed, inject } from 'vue'
import { useStore } from 'vuex';
import { IUserState } from '../store/modules/user';
import { globalStoreTypes } from '../utils/globalStore';
import {
    STORE_NAME
} from '../constants';

type StoreTypes = globalStoreTypes | undefined;

export default defineComponent({
    setup() {
        const store = useStore();
        const username = computed(() => store.getters['user/userInfo'].name);
        const refrestUser = (userinfo: IUserState) => store.dispatch('user/refrestUser', userinfo);
        const globalStore: StoreTypes = inject<StoreTypes>(STORE_NAME);

        const handleClick = () => {
            const {
                round,
                random
            } = Math;
            refrestUser({
                name: 'kris' + round(random() * 100)
            });
        };

        return () => (
            <>
                <h1>{ username.value }</h1>
                <p>{ globalStore!.version }</p>
                <button onClick={() => handleClick()}>点我</button>
            </>
        );
    }
});