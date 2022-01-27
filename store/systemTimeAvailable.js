import axios from 'axios';
import api from '../api';

export const state = () => ({
})

export const mutations = {
}

export const actions = {
  updateTimeAvailable(vuexContext, form) {
    return new Promise((resolve, reject) => {
      let config = {
        headers: { 'X-kg-Access-Token': form.acstkn }
      };
      let dataObject = {
        id: form.id,
        time: form.time,
        logBoAdminId: parseInt(form.logBoAdminId)
      }
      axios.post(process.env.API_URL + api.updateTimeAvailable, dataObject, config)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        })
    });
  },

  getTimeById(vuexContext, form) {
    return new Promise((resolve, reject) => {
      let config = {
        headers: { 'X-kg-Access-Token': form.acstkn }
      };
      let dataObject = {
        id: form.id,
      }
      axios.post(process.env.API_URL + api.getTimeById, dataObject, config)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        })
    });
  },
}
