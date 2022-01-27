import axios from 'axios';
import api from '../api';
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
    listUsers(vuexContext, data) {
        return new Promise((resolve, reject) => {
            let config = {
                headers: { 'X-kg-Access-Token': data.acstkn }
            };
            let dataObject = {
                needle: data.needle,
                limit: data.limit,
                offset: data.offset,
            }
            axios.post(process.env.API_URL + api.boListUsers, dataObject, config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                })
        });
    },
    getUserInfoById(vuexContext, form) {
        return new Promise((resolve, reject) => {
            let config = {
                headers: { 'X-kg-Access-Token': form.acstkn }
            };
            let dataObject = {
                id: form.uid,
            }
            axios.post(process.env.API_URL + api.getUserInfoById, dataObject, config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                })
        });
    },
    updateTypePostion(vuexContext, data) {
        return new Promise((resolve, reject) => {
            let config = {
                headers: { 'X-kg-Access-Token': data.acstkn }
            };
            let dataObject = {
                typePositionsId: data.typePositionsId,
                uid: data.uid,
            }
            axios.put(process.env.API_URL + api.updateTypePostion, dataObject, config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                })
        });
    },


    changeUserState(vuexContext, data) {
        return new Promise((resolve, reject) => {
            let config = {
                headers: { 'X-kg-Access-Token': data.acstkn }
            };
            let dataObject = {
                uid: data.uid,
                active: data.active,
                logBoAdminId: parseInt(data.logBoAdminId)
            }
            axios.post(process.env.API_URL + api.changeUserState, dataObject, config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                })
        });
    },
    listUserReservations(vuexContext, data) {
        return new Promise((resolve, reject) => {
            let config = {
                headers: { 'X-kg-Access-Token': data.acstkn }
            };
            let dataObject = {
                uid: data.uid,
                cityId: data.cityId,
                buildingId: data.buildingId,
                officeTypeId: data.officeTypeId,
                status: data.status,
                limit: data.limit,
                offset: data.offset,
                columnOrder: data.columnOrder,
                sortBy: data.sortBy
            }
            axios.post(process.env.API_URL + "office/listUserReservations", dataObject, config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject();
                })
        });
    }
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
