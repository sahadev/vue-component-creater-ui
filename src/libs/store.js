import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      count: 0,
      currentEditComp: null,
      renderCount: 0
    }
  },
  mutations: {
    increment(state) {
      state.count++
    },
    storeCurrentEditComp(state, newComp) {
      state.currentEditComp = newComp;
    },
    onDragEnd(state) {
      state.renderCount++;
    }
  }
})

globalApp.use(store);