import axios from 'axios'
var CryptoJS = require("crypto-js");
export const state = () => ({
    origin: null,
    isAuthenticated: false,
})

export const mutations = {
    setOrigin(state, origin){
        state.origin = origin;
    }
}

export const actions = {
}

export const getters = {
    getOrigin: state => {
        return state.origin;
    }
}

export const strict = false