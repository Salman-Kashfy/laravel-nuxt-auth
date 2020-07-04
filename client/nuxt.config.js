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
        titleTemplate: '%s',
        title: 'ReviewsApp' || '',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: 'Write and create review and courses.'}
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
                    refresh: {
                        url: 'refresh', method: 'post', propertyName: 'data'
                    },
                    logout: {
                        url: 'logout', method: 'post'
                    },
                },
            }
        },
        redirect: {
            login: '/login',
            logout: '/',
            callback: '/login',
            home: false
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
        CLIENT_URL: 'http://localhost:3000',
        STORAGE: 'http://reviews.me/storage',
        JWT_REFRESH_TIME: 3000, // In seconds,
        PER_PAGE: 5
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
        middleware: ['clearValidationErrors']
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
    loading: {color: colors.blue.darken2},
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
    }
}
