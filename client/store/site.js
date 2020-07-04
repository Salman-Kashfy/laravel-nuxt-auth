export const state = () => ({
    settings:null,
    overlay: false,
    overlayOpacity: 1,
    overlayZindex: 6,
    overlayColor: '#fff',
    progressColor: '#42A5F5',
})

export const actions = {
    setSettings({commit}, settings){
        commit('setSettings',settings)
    },
    setOverlay({commit}, overlay) {
        commit('setOverlay',overlay)
    },
    setOverlayOpacity({commit}, overlayOpacity) {
        commit('setOverlayOpacity',overlayOpacity)
    },
    setOverlayZindex({commit}, overlayOpacity) {
        commit('overlayOpacity',overlayOpacity)
    },
    setOverlayColor({commit}, overlayColor) {
        commit('setOverlayColor',overlayColor)
    },
    setProgressColor({commit}, progressColor) {
        commit('setProgressColor',progressColor)
    },
}

export const mutations = {
    setSettings(state,settings){
        state.settings = settings;
    },
    setOverlay: (state, overlay) =>{
        state.overlay = overlay;
    },
    setOverlayOpacity: (state, overlayOpacity) =>{
        state.overlayOpacity = overlayOpacity;
    },
    setOverlayZindex: (state, overlayZindex) =>{
        state.overlayZindex = overlayZindex;
    },
    setOverlayColor: (state, overlayColor) =>{
        state.overlayColor = overlayColor;
    },
    setProgressColor: (state, progressColor) =>{
        state.progressColor = progressColor;
    }
}