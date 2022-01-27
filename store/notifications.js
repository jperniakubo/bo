import axios from 'axios';
import api from '../api';

export const state = () => ({
})

export const mutations = {
}

export const actions = {
  listNotificationReservation(vuexContext, form) {
    return new Promise((resolve, reject) => {
      let config = {
        headers: { 'X-kg-Access-Token': form.acstkn }
      };
      let dataObject = {
        limit: form.limit,
        offset: form.offset
      }
      axios.post(process.env.API_URL + api.listNotificationReservation, dataObject, config)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        })
    });
  },
}
