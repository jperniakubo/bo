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
    listAndSearchAdmins(vuexContext, form) {
        return new Promise((resolve, reject) => {
            let config = {
                headers: { 'X-kg-Access-Token': form.acstkn }
            };
            let dataObject = {}
            dataObject.needle = form.needle
            dataObject.limit = form.limit
            dataObject.offset = form.offset
            axios.post(process.env.API_URL + api.searchAdmins, dataObject, config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject();
                })
        });
    },
    createAdmin(vuexContext, data) {
        return new Promise((resolve, reject) => {
            let config = {
                headers: { 'X-kg-Access-Token': data.acstkn }
            };
            let formData = new FormData();
            formData.append('fullName', data.fullName);
            formData.append('password', data.password);
            formData.append('email', data.email);
            formData.append('position', data.position);
            formData.append('roleAdminId', data.roleAdminId);
            formData.append('phoneNumber', data.phoneNumber);
            formData.append('avatar', data.avatar);
            formData.append('logBoAdminId', parseInt(data.logBoAdminId));
            axios.post(process.env.API_URL + api.createAdmin, formData, config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                })
        });
    },
    getAllRolesAdmin(vuexContext, acstkn) {
        return new Promise((resolve, reject) => {
            let config = {
                headers: { 'X-kg-Access-Token': acstkn }
            };
            axios.post(process.env.API_URL + api.getAllRolesAdmin, {}, config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                })
        });
    },
    changeAdminState(vuexContext, data) {
        return new Promise((resolve, reject) => {
            let config = {
                headers: { 'X-kg-Access-Token': data.acstkn }
            };
            let dataObject = {};
            dataObject.id = parseInt(data.id);
            dataObject.active = data.active;
            dataObject.logBoAdminId = parseInt(data.logBoAdminId);
            axios.post(process.env.API_URL + "boAdmin/changeAdminState", dataObject, config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                })
        });
    },
    getAdminInfoById(vuexContext, data) {
        return new Promise((resolve, reject) => {
            let config = {
                headers: { 'X-kg-Access-Token': data.acstkn }
            };
            let dataObject = {};
            dataObject.id = parseInt(data.id);
            axios.post(process.env.API_URL + "boAdmin/getAdminInfoById", dataObject, config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                })
        });
    },
    updateAdmin(vuexContext, data) {
        return new Promise((resolve, reject) => {
            let config = {
                headers: { 'X-kg-Access-Token': data.acstkn }
            };
            let formData = new FormData();
            formData.append('id', parseInt(data.id));
            formData.append('fullName', data.fullName);
            formData.append('email', data.email);
            formData.append('phoneNumber', data.phoneNumber);
            formData.append('position', data.position);
            formData.append('oldPassword', data.oldPassword);
            formData.append('newPassword', data.newPassword);
            formData.append('avatar', data.avatar);
            formData.append('roleAdminId', data.roleAdminId);
            //formData.append('logBoAdminId', parseInt(data.logBoAdminId));
            formData.append('logBoAdminId', parseInt(data.id));
            axios.post(process.env.API_URL + "boAdmin/updateAdmin", formData, config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
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
