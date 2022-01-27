import axios from 'axios';
import api from '../api';

export const actions = {
    reservationOffice(vuexContext, form) {
        return new Promise((resolve, reject) => {
            let config = {
                headers: { 'X-kg-Access-Token': form.acstkn }
            };
            axios.post(process.env.API_URL + 'reservationOffice/all/filter', form, config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                })
        });
    },
    getOneReservationOffice(vuexContext, form) {
        return new Promise((resolve, reject) => {
            let config = {
                headers: { 'X-kg-Access-Token': form.acstkn }
            };
            axios.get(process.env.API_URL + 'reservationOffice/' + form.reservationId, config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                })
        });
    },

    getAllByDateAndOffice(vuexContext, form) {
        return new Promise((resolve, reject) => {
            let config = {
                headers: { 'X-kg-Access-Token': form.acstkn }
            };
            axios.post(process.env.API_URL + api.getAllByDateAndOffice, form, config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                })
        });
    },

}

