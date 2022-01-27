import axios from 'axios';
import api from '../api';

export const state = () => ({
})

export const mutations = {
}

export const actions = {
    officeList(vuexContext, form) {
        return new Promise((resolve, reject) => {
            let config = {
                headers: { 'X-kg-Access-Token': form.acstkn }
            };
            let dataObject = {
                name: form.name,
                officeTypeId: form.officeTypeId,
                buildingId: form.buildingId,
                cityId: form.cityId,
                limit: form.limit,
                offset: form.offset,
            }
            axios.post(process.env.API_URL + api.officeList, dataObject, config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                })
        });
    },
    getListOffice(vuexContext, form) {
        return new Promise((resolve, reject) => {
            let config = {
                headers: { 'X-kg-Access-Token': form.acstkn }
            };
            let dataObject = {
                name: form.name,
                officeTypeId: form.officeTypeId,
                buildingId: form.buildingId,
                cityId: form.cityId,
                limit: form.limit,
                offset: form.offset,
            }
            axios.post(process.env.API_URL + api.getListOffice, dataObject, config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                })
        });
    },
    officeOne(vuexContext, form) {
        return new Promise((resolve, reject) => {
            let config = {
                headers: { 'X-kg-Access-Token': form.acstkn }
            };
            axios.get(process.env.API_URL + 'office/' + form.officeId, config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                })
        });
    },
    statusItem(vuexContext, form) {
        return new Promise((resolve, reject) => {
            let config = {
                headers: { 'X-kg-Access-Token': form.acstkn }
            };
            axios.put(process.env.API_URL + 'office/status/item/' + form.id, null, config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                })
        });
    },
    statusInstruction(vuexContext, form) {
        return new Promise((resolve, reject) => {
            let config = {
                headers: { 'X-kg-Access-Token': form.acstkn }
            };
            axios.put(process.env.API_URL + 'office/status/arrival/' + form.id, null, config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                })
        });
    },
    updateOffice(vuexContext, form) {
        return new Promise((resolve, reject) => {
            let config = {
                headers: { 'X-kg-Access-Token': form.acstkn }
            };

            let formData = new FormData();

            formData.append("name", form.name);
            formData.append("description", form.description);
            formData.append("cityId", form.city);
            formData.append("buildingId", form.building);
            formData.append("officeTypeId", form.officeType);
            formData.append("floorBuildingId", form.floorBuilding);
            formData.append("durationCheckIn", form.checkIn);
            formData.append("durationCheckOut", form.checkOut);
            formData.append("maxCapacity", form.capacity);
            formData.append("qrCode", form.qrCode);
            formData.append("officeItems", JSON.stringify(form.officeItems));
            formData.append("instructions", JSON.stringify(form.instructions));
            formData.append("main", form.main);
            formData.append("image[0]", form.image);
            formData.append("logBoAdminId", parseInt(form.logBoAdminId));
            axios.put(process.env.API_URL + 'office/' + form.officeId, formData, config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                })
        });
    },
    createOffice(vuexContext, form) {
        return new Promise((resolve, reject) => {
            let config = {
                headers: { 'X-kg-Access-Token': form.acstkn }
            };

            let formData = new FormData();

            formData.append("name", form.name);
            formData.append("description", form.description);
            formData.append("cityId", form.city);
            formData.append("buildingId", form.building);
            formData.append("officeTypeId", form.officeType);
            formData.append("floorBuildingId", form.floorBuilding);
            formData.append("durationCheckIn", form.checkIn);
            formData.append("durationCheckOut", form.checkOut);
            formData.append("maxCapacity", form.capacity);
            formData.append("qrCode", form.qrCode);
            formData.append("officeItems", JSON.stringify(form.officeItems));
            formData.append("instructions", JSON.stringify(form.instructions));
            formData.append("main", form.main);
            formData.append("image[0]", form.image);
            formData.append("logBoAdminId", parseInt(form.logBoAdminId));
            axios.post(process.env.API_URL + 'office', formData, config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                })
        });
    },
    officeStatus(vuexContext, data) {
        return new Promise((resolve, reject) => {
            let config = {
                headers: { 'X-kg-Access-Token': data.acstkn }
            };
            let dataObject = {
                logBoAdminId: parseInt(data.logBoAdminId)
            };
            axios.put(process.env.API_URL + api.officeStatus + parseInt(data.id), dataObject, config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                })
        });
    },
    verifyQrCode(vuexContext, form) {
        return new Promise((resolve, reject) => {
            let config = {
                headers: { 'X-kg-Access-Token': form.acstkn }
            };
            let dataObject = {
                qrCode: form.qrCode,
            }
            axios.post(process.env.API_URL + api.verifyQrCode, dataObject, config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                })
        });
    },
}
