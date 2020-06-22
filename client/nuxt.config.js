import colors from 'vuetify/es5/util/colors'

export default {
    /*
    ** Nuxt rendering mode
    ** See https://nuxtjs.org/api/configuration-mode
    */
    mode: 'universal',
    /*
    ** Headers of the page
    ** See https://nuxtjs.org/api/configuration-head
    */
    head: {
        titleTemplate: '%s - ' + process.env.npm_package_name,
        title: process.env.npm_package_name || '',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
            {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Material+Icons'}
        ]
    },
    auth: {
        strategies: {
            local: {
                endpoints: {
                    login: {
                        url: 'login', method: 'post', propertyName: 'token'
                    },
                    user: {
                        url: 'user', method: 'get', propertyName: 'data'
                    },
                    logout: {
                        url: 'logout', method: 'get'
                    },
                    refresh: {
                        url: 'refresh', method: 'post'
                    },
                },
            }
        },
        plugins: [
            '~/plugins/redirect.js',
        ]
    },
    /*
    ** Global CSS
    */
    css: [
        '~/assets/css/app.scss'
    ],
    env: {
        API_URL: 'http://reviews.me/api',
    },
    axios: {
        baseURL: 'http://reviews.me/api',
    },
    /*
    ** Plugins to load before mounting the App
    ** https://nuxtjs.org/guide/plugins
    */
    plugins: [
        '~plugins/jquery.js',
        '~plugins/axios.js',
        '~mixins/validation.js',
        '~/plugins/vform.js',
        { src: '~/plugins/validations.js', mode: 'client' },
        { src: '~plugins/sweetalert2.js', mode: 'client' }
    ],
    router: {
        middleware: ['clearValidationErrors','refreshJWT']
    },
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
        '@nuxtjs/vuetify',
        '@nuxtjs/axios',
        '@nuxtjs/auth'
    ],
    /*
    ** Nuxt.js modules
    */
    modules: [],
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
        },
        treeShake: true
    },
    /*
    ** Build configuration
    ** See https://nuxtjs.org/api/configuration-build/
    */
    build: {
        splitChunks: {
            layouts: true
        },
        extractCSS: {
            allChunks: true,
            ignoreOrder: true
        },
    },
    watchLoggedIn: true
}
