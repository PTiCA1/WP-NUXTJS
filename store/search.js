export const state = () => ({
  open: false,
  ariaControlsName: 'search-form'
})

export const mutations = {
  toggle(state) {
    state.open = !state.open
  },
  close(state) {
    state.open = false
  }
}

export const getters = {
  show(state) {
    return state.open
  },
  ariaControlsName(state) {
    return state.ariaControlsName
  }
}
