import { reactive, readonly } from 'vue'

export interface globalStoreTypes {
    version: string;
    APP_ENV: string;
}

const globalStore = reactive<globalStoreTypes>({
    version: '0.0.1',
    APP_ENV: 'dev'
});
 
export default readonly(globalStore);