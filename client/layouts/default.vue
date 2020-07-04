<template>
    <v-app>
        <!--<v-overlay :value="overlay" :z-index="overlayZindex" :opacity="overlayOpacity" :color="overlayColor">-->
        <!--<v-progress-circular indeterminate size="64" :color="progressColor"></v-progress-circular>-->
        <!--</v-overlay>-->
        <v-navigation-drawer
                :value="drawer"
                :mini-variant="miniVariant"
                :clipped="clipped"
                fixed
                app>
            <v-list>
                <v-list-item
                        v-for="(item, i) in items"
                        :key="i"
                        :to="item.to"
                        router
                        exact>
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.title"/>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <template>
            <v-app-bar id="desktop-top-nav" :clipped-left="clipped"  max-height="64" color="white"> <!-- fixed hide-on-scroll -->
                <v-container>
                    <v-app-bar color="white" elevation="0">
                        <v-app-bar-nav-icon @click="hideDrawer" :value="drawer" class="d-sm-none"></v-app-bar-nav-icon>
                        <nuxt-link to="/">
                            <img v-show="settings.logo" :src="settings.logo ? `${storage}/logo/${settings.logo}` : ''" alt="App Logo">
                        </nuxt-link>
                        <v-spacer/>
                        <div class="mr-2">
                            <nuxt-link to="/"><v-btn depressed="" color="secondary" text>Contribute</v-btn></nuxt-link>
                            <nuxt-link to="/"><v-btn depressed="" color="secondary" text>Resources</v-btn></nuxt-link>
                            <nuxt-link to="/"><v-btn depressed="" color="secondary" text>About us</v-btn></nuxt-link>
                        </div>
                        <GuestNav v-if="!loggedIn"></GuestNav>
                        <AuthNav v-if="loggedIn"></AuthNav>
                    </v-app-bar>
                </v-container>
            </v-app-bar>
        </template>
        <template>
            <v-app-bar id="secondary-menu" class="grey lighten-5" max-height="45" height="45" flat style="border-bottom: 1px solid #eee !important;">
                <v-container>
                    <v-tabs id="man-nav-tabs" class="pa-0 text-center" hide-slider light centered grow show-arrows height="43" background-color="#fafafa">
                        <v-tab to="/asd">Marketing Agency</v-tab>
                        <v-tab to="/auth">Ecommerce</v-tab>
                        <v-tab>Amazon</v-tab>
                        <v-tab>Info Products</v-tab>
                        <v-tab>Real Estate</v-tab>
                        <v-tab>Youtube</v-tab>
                        <v-tab>Investing</v-tab>
                        <v-tab>Sales</v-tab>
                    </v-tabs>
                </v-container>
            </v-app-bar>
        </template>
        <v-main>
            <nuxt/>
        </v-main>
        <!--<v-footer :absolute="!fixed" app>-->
            <!--<span>&copy; {{ new Date().getFullYear() }}</span>-->
        <!--</v-footer>-->
    </v-app>
</template>

<script>
    import GuestNav from '@/components/Headers/GuestNav';
    import AuthNav from '@/components/Headers/AuthNav';
    import {mapState} from "vuex";

    export default {
        components: {
            GuestNav,
            AuthNav
        },
        middleware:['settings'],
        data() {
            return {
                clipped: false,
                fixed: false,
                items: [
                    {
                        icon: 'mdi-apps',
                        title: 'Welcome',
                        to: '/'
                    },
                    {
                        icon: 'mdi-chart-bubble',
                        title: 'Inspire',
                        to: '/inspire'
                    }
                ],
                miniVariant: false,
                right: true,
                rightDrawer: false,
                title: 'Vuetify.js',
                storage: process.env.STORAGE,
            }
        },
        computed:{
            ...mapState({
                loggedIn: state => state.auth.loggedIn,
                user: state => state.auth.user,
                drawer: state => state.navbar.drawer,
                overlay: state => state.site.overlay,
                overlayOpacity: state => state.site.overlayOpacity,
                overlayZindex: state => state.site.overlayZindex,
                overlayColor: state => state.site.overlayColor,
                progressColor: state => state.site.progressColor,
                settings: state => state.site.settings,
            })
        },
        methods:{
            hideDrawer(){
                this.$store.dispatch('navbar/toggleDrawer')
            },
        }
    }
</script>
