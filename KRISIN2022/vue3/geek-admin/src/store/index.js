
import { createStore } from 'vuex'
const store = createStore({
  state () {
    return {
      count: 111
    }
  },
  getters:{
    double(state){
          return state.count*2
      }
  },
  mutations: {
    add (state) {
      state.count++
    }
  },
  actions:{
    asyncAdd({commit}){
        setTimeout(()=>{
          commit('add')
        },1000)
    }
  }
})

export default store