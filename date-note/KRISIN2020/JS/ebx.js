/**
 * @file
 * @name Ebx
 * @desc 简单的状态管理库
 * @returns Ebx主体
 */
/**
 * @type object
 * @desc 状态码
 */
const types = {
    ACTIONS: 'ACTIONS',
    MUTATIONS: 'MUTATIONS',
    STOP: 'STOP'
}

/**
 * @type class
 * @name Ebx
 * @desc 简单的状态管理库
 */
class Ebx {
    constructor({
        state = {},
        mutations = {},
        actions = {}
    } = {}) {
        this.mutations = mutations
        this.actions = actions
        this.stateType = types.STOP
        const __self = this
        this.state = new Proxy(state, {
            get(state, key) {
                return Reflect.get(state, key)
            },
            set(state, key, value, proxy) {
                if (__self.stateType !== types.MUTATIONS) {
                    throw new Error(`Only ${types.MUTATIONS} can change ${key}`)
                }
                state[key] = value
                __self.stateType = types.STOP
                return Reflect.set(state, key, value, proxy)
            }
        })
    }

    /**
     * @func
     * @name getState
     * @param {string} key 要查询的数据
     * @desc 查询数据
     * @returns 要查询的数据
     */
    getState(key) {
        return this.state[key]
    }

    /**
     * @func
     * @name dispatch
     * @param {string} actionKey 要执行的action
     * @param {mixed} payload 要传入的参数
     * @desc 执行action来提交mutation
     * @returns 返回提交后的promise
     */
    dispatch(actionKey, payload) {
        if (typeof this.actions[actionKey] !== 'function') {
            throw new Error(`action ${actionKey} doesn't exist`)
        }
        return new Promise(resolve => {
            const result = this.actions[actionsKey](this, payload)
            this.stateType = types.ACTIONS
        })
    }

    /**
     * @func
     * @name commit
     * @param {string} mutationsKey 要提交的mutation
     * @param {mixed} payload 要传入的参数
     * @desc 提交mutation来改变state
     */
    commit(mutationsKey, payload) {
        if (typeof this.mutations[mutationsKey] !== 'function') {
            throw new Error(`mutation ${mutationsKey} doesn't exist`)
        }
        this.stateType = types.MUTATIONS
        this.mutations[mutationsKey](this.state, payload)
    }
}