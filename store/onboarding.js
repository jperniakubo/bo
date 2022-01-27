import axios from 'axios';
export const state = () => ({
    authToken: null,
    isAuthenticated: false
})

export const mutations = {
    setToken(state, _token) {
        state.authToken = _token;
    }
}

export const actions = {
    // login(vuexContext, data){
    //     return new Promise((resolve, reject) => {
    //         let config = {
    //             headers: {'X-kg-Access-Token': process.env.token}
    //         };
    //         let dataObject = {}
    //         dataObject.email = data.email
    //         dataObject.password = data.password
    //         axios.post(process.env.API_URL + "boAdmin/loginAdmin", dataObject, config)
    //         .then( response => {
    //             resolve(response.data);
    //         })
    //         .catch(error => {
    //             reject();
    //         })
    //     });
    // }
}

export const getters = {
    getAuthToken: state => {
        return state.authToken;
    },
    isAuthenticated: state => {
        return state.isAuthenticated;
    }
}

export const strict = false