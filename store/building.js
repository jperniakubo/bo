import axios from 'axios';
import api from '../api';

export const state = () => ({
})

export const mutations = {
}

export const actions = {
    listBuildings(vuexContext, form) {
        return new Promise((resolve, reject) => {
            let config = {
                headers: { 'X-kg-Access-Token': form.acstkn }
            };
            let dataObject = {}
            dataObject.cityId = form.cityId
            dataObject.needle = form.needle
            dataObject.limit = form.limit
            dataObject.offset = form.offset
            axios.post(process.env.API_URL + api.listBuildings, dataObject, config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                })
        });
    },
    setBuildingStatus(vuexContext, data) {
        return new Promise((resolve, reject) => {
            let config = {
                headers: { 'X-kg-Access-Token': data.acstkn }
            };
            let dataObject = {};
            dataObject.id = parseInt(data.id);
            dataObject.active = data.active;
            dataObject.logBoAdminId = parseInt(data.logBoAdminId);
            axios.post(process.env.API_URL + api.setBuildingStatus, dataObject, config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                })
        });
    },
    createBuilding(vuexContext, form) {
        return new Promise((resolve, reject) => {
            let config = {
                headers: { 'X-kg-Access-Token': form.acstkn }
            };
            let dataObject = {
                name: form.name,
                cityId: form.cityId,
                address: form.address,
                minReservationCreationTime: form.minReservationCreationTime,
                minReservationCancellationTime: form.minReservationCancellationTime,
                latitude: form.latitude,
                longitude: form.longitude,
                systemPercentageId: form.systemPercentageId,
                floors: form.floors,
                logBoAdminId: parseInt(form.logBoAdminId),
            };
            axios.post(process.env.API_URL + api.createBuilding, dataObject, config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                })
        });
    },
    buildingById(vuexContext, form) {
        return new Promise((resolve, reject) => {
            let config = {
                headers: { 'X-kg-Access-Token': form.acstkn }
            };
            let dataObject = {
                id: form.buildingId,
            };
            axios.post(process.env.API_URL + api.buildingById, dataObject, config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                })
        });
    },
    updateBuilding(vuexContext, form) {
        return new Promise((resolve, reject) => {
            let config = {
                headers: { 'X-kg-Access-Token': form.acstkn }
            };
            let dataObject = {
                id: form.buildingId,
                name: form.name,
                cityId: form.cityId,
                address: form.address,
                minReservationCreationTime: form.minReservationCreationTime,
                minReservationCancellationTime: form.minReservationCancellationTime,
                latitude: form.latitude,
                longitude: form.longitude,
                systemPercentageId: form.systemPercentageId,
                floorsSave: form.floors,
                floorsDelete: form.toDeleteFloors,
                logBoAdminId: parseInt(form.logBoAdminId),
            };
            axios.post(process.env.API_URL + api.updateBuilding, dataObject, config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                })
        });
    },
}
