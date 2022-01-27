import axios from 'axios';
import api from '../api';
var CryptoJS = require("crypto-js");
export const state = () => ({
  acstkn: ''
})

export const mutations = {
  setAcsTkn: (state, payload) => {
    state.acstkn = payload
  }
}

const URL = {
  API: process.env.URL_API,
}

export const getters = {
  getAcsTkn: state => {
    return state.acstkn
  }
}

export const actions = {
  nuxtServerInit: async (vuexContext) => {
    vuexContext.dispatch('generateAcsTkn');
  },
  generateAcsTkn: async () => {
    let data = await axios.get(process.env.API_URL + api.generateAcsTkn)
      .then(res => {
        return res.data;
      })
      .catch(err => {
        return null
      })
    return data;
  },
  loginAdmin(vuexContext, form) {
    return new Promise((resolve, reject) => {
      let config = {
        headers: { 'X-kg-Access-Token': form.acstkn },
      }
      let object = {
        email: form.email,
        password: CryptoJS.SHA1(form.password).toString(),
      }
      axios.post(process.env.API_URL + api.loginAdmin, object, config).then(function (json) {
        resolve(json);
      })
        .catch(function (error) {
          reject(error);
        });
    });
  },
  recoveryPassword(vuexContext, form) {
    return new Promise((resolve, reject) => {
      let config = {
        headers: { 'X-kg-Access-Token': form.acstkn },
      }
      let object = {
        email: form.email,
      }
      axios.post(process.env.API_URL + api.recoveryPassword, object, config).then(function (json) {
        resolve(json);
      })
        .catch(function (error) {
          reject(error);
        });
    });
  },
  checkCode(vuexContext, form) {
    return new Promise((resolve, reject) => {
      let config = {
        headers: { 'X-kg-Access-Token': form.acstkn },
      }
      let object = {
        code: form.code,
      }
      axios.post(process.env.API_URL + api.validCode, object, config).then(function (json) {
        resolve(json);
      })
        .catch(function (error) {
          reject(error);
        });
    });
  },
  changePassword(vuexContext, form) {
    return new Promise((resolve, reject) => {
      let config = {
        headers: { 'X-kg-Access-Token': form.acstkn },
      }
      let object = {
        code: form.code,
        password: form.password
      }
      axios.post(process.env.API_URL + api.changePassword, object, config).then(function (json) {
        resolve(json);
      })
        .catch(function (error) {
          reject(error);
        });
    });
  },
}
