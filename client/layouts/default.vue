<template>
    <v-app>
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
                        exact
                >
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.title"/>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar :clipped-left="clipped" fixed app elevate-on-scroll color="white">
            <v-container class="pa-0">
                <v-app-bar color="white" elevation="0">
                    <v-app-bar-nav-icon @click="hideDrawer" :value="drawer" class="d-sm-none"/>
                    <nuxt-link to="/"><v-toolbar-title v-text="title"/></nuxt-link>
                    <v-spacer/>
                    <GuestNav v-if="!loggedIn"></GuestNav>
                    <AuthNav v-if="loggedIn"></AuthNav>
                </v-app-bar>
            </v-container>
        </v-app-bar>
        <v-main>
            <nuxt/>
        </v-main>
        <v-footer :absolute="!fixed" app>
            <span>&copy; {{ new Date().getFullYear() }}</span>
        </v-footer>
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
                title: 'Vuetify.js'
            }
        },
        computed:{
            ...mapState({
                loggedIn: state => state.auth.loggedIn,
                user: state => state.auth.user,
                drawer: state => state.navbar.drawer,
            })
        },
        methods:{
            hideDrawer(){
                this.$store.dispatch('navbar/toggleDrawer')
            },
        }
    }
</script>
