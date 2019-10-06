export const state = () => ({
  messages: []
})

export const getters = {
  messages: (state) => state.messages
}

export const mutations = {
  add(state, message) {
    state.messages.unshift(message)
  }
}

export const actions = {
  async add({ commit }, message) {
    commit('add', message)
  }
}
