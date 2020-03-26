import login from './serverMiddleware/login.js';
import bodyParser from 'body-parser';

export default {
  mode: 'universal',

  env: {
    BASE_urL: process.env.BASE_URL || 'http://localhost:3000',
    API_URL: process.env.API_URL,
  },

  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/components.js',
    '~/plugins/bus.js',
    '~/plugins/form.js',
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    ['nuxt-i18n', require('./i18n')],
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },

  auth: {
    strategies: {
      'oauth2.password': {
        _scheme: '~/auth/oauth2PasswordGrant.js',
        endpoints: {
          login: `${process.env.BASE_URL}/api/login`,
          me: `${process.env.API_URL}/me`,
        },
        redirects: false,
      },
    },
  },

  serverMiddleware: [
    bodyParser.json(),
    login,
  ],
};
