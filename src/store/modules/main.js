
export default {
  namespaced: true,
  state: {
    posts: [],
    loading: false,
    error: null,
    selectedPost: null,

    dialogs: {
      showDataList: false,
      createShowItem: false,
      updateVisible: false,
    },
  },
  mutations: {
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_POSTS(state, posts) {
      state.posts = posts;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    SET_SHOW_DATA_LIST(state, payload) {
      state.dialogs[payload.key] = payload.value
    },
    SET_UPDATE_VISIBLE(state, payload) {
      state.dialogs[payload.key] = payload.value;
    },
    SET_SELECTED_POST(state, post) {
      state.selectedPost = post;
    },
  },

  actions: {
    fetchPosts({ commit }, posts) {
      commit("SET_POSTS", posts);
    },
    isLoading({ commit }, payload) {
      commit("SET_LOADING", payload);
    },
    handleError({ commit }, payload) {
      commit("SET_ERROR", payload);
    },
    setShowDataList ({ commit }, payload) {
      commit("SET_SHOW_DATA_LIST", payload);
    },
    setUpdateVisible({ commit }, payload) {
      commit('SET_UPDATE_VISIBLE', payload);
    },
    setSelectedPost({ commit }, payload) {
      commit('SET_SELECTED_POST', payload)
    }
  },

  getters: {
    posts: (state) => state.posts,
    loading: (state) => state.loading,
    error: (state) => state.error,
    showDataList: (state) => state.dialogs.showDataList,
    createShowItem: (state) => state.dialogs.createShowItem,
    updateVisible: (state) => state.dialogs.updateVisible,
    selectedPost: (state) => state.selectedPost,
  }
};
