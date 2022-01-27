import axios from 'axios';
import api from '../api';

export const state = () => ({
})

export const mutations = {
}

export const actions = {
  getAllPositions(vuexContext, form) {
    return new Promise((resolve, reject) => {
      let config = {
        headers: { 'X-kg-Access-Token': form.acstkn }
      };
      let dataObject = {}
      axios.post(process.env.API_URL + api.getAllPositions, dataObject, config)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        })
    });
  },

  createPosition(vuexContext, form) {
    return new Promise((resolve, reject) => {
      let config = {
        headers: { 'X-kg-Access-Token': form.acstkn }
      };
      let dataObject = {
        name: form.name,
        logBoAdminId: parseInt(form.logBoAdminId)
      }
      axios.post(process.env.API_URL + api.createPosition, dataObject, config)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        })
    });
  },

  updatePosition(vuexContext, form) {
    return new Promise((resolve, reject) => {
      let config = {
        headers: { 'X-kg-Access-Token': form.acstkn }
      };
      let dataObject = {
        id: form.positionId,
        name: form.name,
        logBoAdminId: parseInt(form.logBoAdminId)
      }
      axios.post(process.env.API_URL + api.updatePosition, dataObject, config)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        })
    });
  },

  getPositions(vuexContext, form) {
    return new Promise((resolve, reject) => {
      let config = {
        headers: { 'X-kg-Access-Token': form.acstkn }
      };
      let dataObject = {
        needle: form.needle,
        limit: form.limit,
        offset: form.offset
      }
      axios.post(process.env.API_URL + api.getPositions, dataObject, config)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        })
    });
  },

  getPositionById(vuexContext, form) {
    return new Promise((resolve, reject) => {
      let config = {
        headers: { 'X-kg-Access-Token': form.acstkn }
      };
      let dataObject = {
        id: form.positionId
      }
      axios.post(process.env.API_URL + api.getPositionById, dataObject, config)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        })
    });
  },
}
