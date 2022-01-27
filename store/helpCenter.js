import axios from 'axios';
import api from '../api';

export const state = () => ({
})

export const mutations = {
}

export const actions = {
    helpCenterOne(vuexContext, form) {
        return new Promise((resolve, reject) => {
            let config = {
                headers: { 'X-kg-Access-Token': form.acstkn }
            };
            axios.get(process.env.API_URL + 'helpCenter/' + form.helpCenterId, config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject();
                })
        });
    },
    helpCenterList(vuexContext, form) {
        return new Promise((resolve, reject) => {
            let config = {
                headers: { 'X-kg-Access-Token': form.acstkn }
            };
            let dataObject = {
                question: form.question,
                limit: form.limit,
                offset: form.offset,
            }
            axios.post(process.env.API_URL + 'helpCenter/all/filter', dataObject, config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject();
                })
        });
    },
    helpCenterStatus(vuexContext, data) {
        return new Promise((resolve, reject) => {
            let config = {
                headers: { 'X-kg-Access-Token': data.acstkn }
            };
            let dataObject = {};
            axios.put(process.env.API_URL + 'helpCenter/status/' + parseInt(data.id), dataObject, config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                })
        });
    },
    createHelpCenter(vuexContext, form) {
        return new Promise((resolve, reject) => {
            let config = {
                headers: { 'X-kg-Access-Token': form.acstkn }
            };
            let formData = new FormData();
            formData.append("question", form.question);
            formData.append("answer", form.answer);
            axios.post(process.env.API_URL + 'helpCenter', formData, config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                })
        });
    },
    updateHelpCenter(vuexContext, form) {
        return new Promise((resolve, reject) => {
            let config = {
                headers: { 'X-kg-Access-Token': form.acstkn }
            };

            let formData = new FormData();

            formData.append("question", form.question);
            formData.append("answer", form.answer);

            axios.put(process.env.API_URL + 'helpCenter/' + form.id, formData, config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                })
        });
    },
}
