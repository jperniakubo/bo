import axios from 'axios';
import api from '../api';

export const state = () => ({
})

export const mutations = {
}

export const actions = {
    listCities(vuexContext, form) {
        return new Promise((resolve, reject) => {
            let config = {
                headers: { 'X-kg-Access-Token': form.acstkn }
            };
            let dataObject = {}
            dataObject.needle = form.needle
            dataObject.limit = form.limit
            dataObject.offset = form.offset
            axios.post(process.env.API_URL + api.listCities, dataObject, config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject();
                })
        });
    },
    setCityStatus(vuexContext, data) {
        return new Promise((resolve, reject) => {
            let config = {
                headers: { 'X-kg-Access-Token': data.acstkn }
            };
            let dataObject = {};
            dataObject.id = parseInt(data.id);
            dataObject.active = data.active;
            dataObject.logBoAdminId = parseInt(data.logBoAdminId);
            axios.post(process.env.API_URL + api.setCityStatus, dataObject, config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject();
                })
        });
    },
    createCity(vuexContext, data) {
        return new Promise((resolve, reject) => {
            let config = {
                headers: { 'X-kg-Access-Token': data.acstkn }
            };
            let dataObject = {
                name: data.name,
                logBoAdminId: parseInt(data.logBoAdminId)
            };
            axios.post(process.env.API_URL + api.createCity, dataObject, config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject();
                })
        });
    },
    cityById(vuexContext, data) {
        return new Promise((resolve, reject) => {
            let config = {
                headers: { 'X-kg-Access-Token': data.acstkn }
            };
            let dataObject = {
                id: data.cityId
            };
            axios.post(process.env.API_URL + api.cityById, dataObject, config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject();
                })
        });
    },
    updateCity(vuexContext, data) {
        return new Promise((resolve, reject) => {
            let config = {
                headers: { 'X-kg-Access-Token': data.acstkn }
            };
            let dataObject = {
                id: data.cityId,
                name: data.name,
                logBoAdminId: parseInt(data.logBoAdminId)
            };
            axios.post(process.env.API_URL + api.updateCity, dataObject, config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                })
        });
    },
}
