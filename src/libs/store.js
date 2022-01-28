import { createStore } from 'vuex'

export const store = createStore({
  state() {
    return {
      currentEditComp: null,
      renderCount: 0
    }
  },
  mutations: {
    storeCurrentEditComp(state, newComp) {
      state.currentEditComp = newComp;
    },
    onDragEnd(state) {
      state.renderCount++;
    }
  }
})
