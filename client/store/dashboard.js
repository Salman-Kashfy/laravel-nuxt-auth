export const state = () => ({
    title: null
})

export const getters = {
    title(state) {
        return state.errors
    }
}

export const mutations = {
    setTitle (state, title) {
        state.title = title;
    },
}

export const actions = {
    setTitle ({commit}, title) {
        commit('setTitle', title)
    },
}