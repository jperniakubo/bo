import axios from 'axios';
import api from '../api';

export const state = () => ({
})

export const mutations = {
}

export const actions = {
    officeArrivalsDirectionList(vuexContext, form) {
        return new Promise((resolve, reject) => {
            let config = {
                headers: { 'X-kg-Access-Token': form.acstkn }
            };

            axios.get(process.env.API_URL + `office/officeArrivalsDirection/${form.officeId}/${form.limit}/${form.offset}`, config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject();
                })
        });
    },

}
