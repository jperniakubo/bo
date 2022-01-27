import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCvF9J2uGBwKep3rgHi7JyrzoxmZ1RzQHo',
    libraries: 'places'
  }
})
