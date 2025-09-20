import { createStore } from 'vuex'

export default createStore({
  state: {
    loadingCounter: 0,
    errorMessage: null,
    errorVisible: false,
  },
  getters: {
    isLoading: state => state.loadingCounter > 0
  },
  mutations: {
    incrementLoading(state) {
      state.loadingCounter++;
    },
    decrementLoading(state) {
      state.loadingCounter = Math.max(0, state.loadingCounter - 1);
    },
    setError(state, message) {
      state.errorMessage = message;
      state.errorVisible = true;
    },
    clearError(state) {
      state.errorMessage = null;
      state.errorVisible = false;
    }
  },
  actions: {
    startLoading({ commit }) {
      commit('incrementLoading');
    },
    stopLoading({ commit }) {
      commit('decrementLoading');
    },
    showError({ commit }, message) {
      commit('setError', message);
      setTimeout(() => {
        commit('clearError');
      }, 5000);
    }
  }
})