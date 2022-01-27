const pkg = require('./package')
import colors from 'vuetify/es5/util/colors'

export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  //middleware: ['authenticated'],

  /*
  ** Global CSS
  */
  css: [
    "~/assets/scss/index.scss"
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    { src: '~/plugins/maps.js', ssr: false },
    { src: '~/plugins/apex.js', ssr: false },
    { src: '~/plugins/qr.js', ssr: false },
    { src: '~/plugins/vue-toastification.js', ssr: false },
    { src: '~/plugins/infiniteloading', ssr: false },
    { src: '~/plugins/cvs.js', ssr: false },
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    "@nuxtjs/style-resources",
    ['nuxt-material-design-icons'],
    ['nuxt-vuex-localstorage'],
    ['@nuxtjs/dotenv', { filename: 'environments/.env.' + process.env.ENV }]
  ],

  //serverMiddleware: ["redirect-ssl"],

  styleResources: {
    scss: ["~/assets/scss/index.scss"]
  },
  axios: {},
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  },
  env: {
    API_URL: process.env.API_URL,
    //API_URL: 'http://kpmgboapi.inkubo.co:5005/api/v1/',
    //API_URL: 'https://www.kpmgexternalservices.com.co:5000/api/v1/',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlhdCI6MTYwMTY3ODUyM30sImlhdCI6MTYwMTY3ODUyMywiZXhwIjoxNjMzMjM2MTIzfQ.oCLKx_4PUpO_2lLEYigb_6EJUw-4RvEKZN6ixJ4BnNY'
  },
  router: {
    props: true
  },
}
