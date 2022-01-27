import axios from 'axios';
import api from '../api';
export const state = () => ({
  authToken: null,
  isAuthenticated: false
})

export const mutations = {
  setToken(state, _token) {
    state.authToken = _token;
  }
}

export const actions = {
  async listCitiesMoreReserved(vuexContext, data) {
    try {
      let config = {
        headers: { 'X-kg-Access-Token': data.acstkn }
      };
      let dataObject = {
        dateInit: data.dateInit,
        dateEnd: data.dateEnd,
        cityId: data.cityId,
      }
      let pepe = await axios.post(process.env.API_URL + 'dashboard/all/more', dataObject, config)
      return pepe.data;
    } catch (e) {
      console.error('Error: ', e)
      return {
        code: 102,
        message: e.response.data.message,
        error: e
      }
    }
  },
  async listCitiesLessReserved(vuexContext, data) {
    try {
      let config = {
        headers: {
          'X-kg-Access-Token': data.acstkn
        }
      };
      let dataObject = {
        dateInit: data.dateInit,
        dateEnd: data.dateEnd,
        cityId: data.cityId,
      }
      let pepe = await axios.post(process.env.API_URL + 'dashboard/all/less', dataObject, config)
      return pepe.data;
    } catch (e) {
      console.error('Error: ', e)
      return {
        code: 102,
        message: e.response.data.message,
        error: e
      }
    }
  },
  async listOfficesReserved(vuexContext, data) {
    try {
      let config = {
        headers: {
          'X-kg-Access-Token': data.acstkn
        }
      };
      let dataObject = {
        dateInit: data.dateInit,
        dateEnd: data.dateEnd,
      }
      let pepe = await axios.post(process.env.API_URL + 'dashboard/all/more/offices', dataObject, config)
      return pepe.data;
    } catch (e) {
      console.error('Error: ', e)
      return {
        code: 102,
        message: e.response.data.message,
        error: e
      }
    }
  },
  async listAllReservedChart(vuexContext, data) {
    try {
      let config = {
        headers: {
          'X-kg-Access-Token': data.acstkn
        }
      };
      let dataObject = {
        dateInit: data.dateInit,
        dateEnd: data.dateEnd,
      }
      let pepe = await axios.post(process.env.API_URL + 'dashboard/all/filter', dataObject, config)
      return pepe.data;
    } catch (e) {
      console.error('Error: ', e)
      return {
        code: 102,
        message: e.response.data.message,
        error: e
      }
    }
  },
  async listUsersReserved(vuexContext, data) {
    try {
      let config = {
        headers: { 'X-kg-Access-Token': data.acstkn }
      };
      let dataObject = {
        dateInit: data.dateInit,
        dateEnd: data.dateEnd,
      }
      let pepe = await axios.post(process.env.API_URL + 'dashboard/all/users', dataObject, config)
      return pepe.data;
    } catch (e) {
      console.error('Error: ', e)
      return {
        code: 102,
        message: e.response.data.message,
        error: e
      }
    }
  },
  async getUsersCancelReservations(vuexContext, data) {
    try {
      let config = {
        headers: { 'X-kg-Access-Token': data.acstkn }
      };
      let dataObject = {
        dateInit: data.dateInit,
        dateEnd: data.dateEnd,
      }
      let pepe = await axios.post(process.env.API_URL + api.getUsersCancelReservations, dataObject, config)
      return pepe.data;
    } catch (e) {
      console.error('Error: ', e)
      return {
        code: 102,
        message: e.response.data.message,
        error: e
      }
    }
  },
  totalReservations(vuexContext, form) {
    return new Promise((resolve, reject) => {
      let config = {
        headers: { 'X-kg-Access-Token': form.acstkn }
      };
      let dataObject = {
        timeFrame: form.timeFrame
      }
      axios.post(process.env.API_URL + api.totalReservations, dataObject, config)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        })
    });
  },

  reservationsByCity(vuexContext, form) {
    return new Promise((resolve, reject) => {
      let config = {
        headers: { 'X-kg-Access-Token': form.acstkn }
      };
      let dataObject = {
        timeFrame: form.timeFrame
      }
      axios.post(process.env.API_URL + api.reservationsByCity, dataObject, config)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        })
    });
  },

  reservationsByOfficeType(vuexContext, form) {
    return new Promise((resolve, reject) => {
      let config = {
        headers: { 'X-kg-Access-Token': form.acstkn }
      };
      let dataObject = {
        timeFrame: form.timeFrame
      }
      axios.post(process.env.API_URL + api.reservationsByOfficeType, dataObject, config)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        })
    });
  },

  getTopOfficesMoreReserved(vuexContext, form) {
    return new Promise((resolve, reject) => {
      let config = {
        headers: { 'X-kg-Access-Token': form.acstkn }
      };
      let dataObject = {
        dateInit: form.dateInit,
        dateEnd: form.dateEnd,
      }
      axios.post(process.env.API_URL + api.getTopOfficesMoreReserved, dataObject, config)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        })
    });
  },
  async getOfficesPercent(vuexContext, data) {
    try {
      let config = {
        headers: { 'X-kg-Access-Token': data.acstkn }
      };
      let dataObject = {
        dateInit: data.dateInit,
        dateEnd: data.dateEnd,
        cityId: data.cityId,
      }
      let pepe = await axios.post(process.env.API_URL + api.getOfficesPercent, dataObject, config)
      return pepe.data;
    } catch (e) {
      console.error('Error: ', e)
      return {
        code: 102,
        message: e.response.data.message,
        error: e
      }
    }
  },
}

export const getters = {
  getAuthToken: state => {
    return state.authToken;
  },
  isAuthenticated: state => {
    return state.isAuthenticated;
  }
}

export const strict = false
