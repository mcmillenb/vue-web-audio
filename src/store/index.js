import Vuex from 'vuex'
import Vue from 'vue'
import audioNodes from '@/store/audio-nodes'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { audioNodes }
})