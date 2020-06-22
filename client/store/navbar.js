export const state = () => ({
    drawer: false,
    signup: false,
    login: false,
})

export const actions = {
    toggleDrawer({commit}){
        commit('toggleDrawer')
    },
    closeDrawer({commit}){
        commit('closeDrawer')
    },
    toggleSignUp({commit}){
        commit('toggleSignUp')
    },
    closeSignUp({commit}){
        commit('closeSignUp')
    },
    toggleLogIn({commit}){
        commit('toggleLogIn')
    },
    closeLogIn({commit}){
        commit('closeLogIn')
    },
}

export const getters = {
    showDrawer: state => state.drawer,
    loggedIn: state => state.loggedIn,
}

export const mutations = {
    toggleDrawer: (state) => {
        state.drawer = !state.drawer;
    },
    closeDrawer: (state) => {
        state.drawer = false;
    },
    toggleSignUp: (state) => {
        state.signup = !state.signup;
    },
    closeSignUp: (state) => {
        state.signup = false;
    },
    toggleLogIn: (state) => {
        state.login = !state.login;
    },
    closeLogIn: (state) => {
        state.login = false;
    },
}