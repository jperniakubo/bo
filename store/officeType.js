import axios from 'axios';
import api from '../api';

export const state = () => ({
})

export const mutations = {
}

export const actions = {
    officeTypeOne(vuexContext, form) {
        return new Promise((resolve, reject) => {
            let config = {
                headers: { 'X-kg-Access-Token': form.acstkn }
            };
            axios.get(process.env.API_URL + 'officeType/' + form.officeTypeId, config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject();
                })
        });
    },
    officeTypeList(vuexContext, form) {
        return new Promise((resolve, reject) => {
            let config = {
                headers: { 'X-kg-Access-Token': form.acstkn }
            };
            let dataObject = {
                name: form.name,
                limit: form.limit,
                offset: form.offset,
            }
            axios.post(process.env.API_URL + api.officeTypeList, dataObject, config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject();
                })
        });
    },
    officeTypeStatus(vuexContext, data) {
        return new Promise((resolve, reject) => {
            let config = {
                headers: { 'X-kg-Access-Token': data.acstkn }
            };
            let dataObject = {
                logBoAdminId: parseInt(data.logBoAdminId)
            };
            axios.put(process.env.API_URL + api.officeTypeStatus + parseInt(data.id), dataObject, config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                })
        });
    },
    createOfficeType(vuexContext, form) {
        return new Promise((resolve, reject) => {
            let config = {
                headers: { 'X-kg-Access-Token': form.acstkn }
            };
            let formData = new FormData();
            formData.append("name", form.name);
            formData.append("description", form.description);
            formData.append("positions", JSON.stringify(form.positions));
            formData.append("main", form.main);
            formData.append("logBoAdminId", parseInt(form.logBoAdminId));
            axios.post(process.env.API_URL + 'officeType', formData, config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                })
        });
    },
    updateOfficeType(vuexContext, form) {
        return new Promise((resolve, reject) => {
            let config = {
                headers: { 'X-kg-Access-Token': form.acstkn }
            };

            let formData = new FormData();

            formData.append("name", form.name);
            formData.append("description", form.description);
            formData.append("positions", JSON.stringify(form.positions));
            formData.append("main", form.main);
            formData.append("logBoAdminId", parseInt(form.logBoAdminId));

            axios.put(process.env.API_URL + 'officeType/' + form.id, formData, config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                })
        });
    },
}
