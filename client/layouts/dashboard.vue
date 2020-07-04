<template>
    <v-app>
        <v-navigation-drawer
                v-model="drawer"
                :mini-variant="miniVariant"
                :clipped="clipped"
                fixed
                app
                dark
        >
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
                <v-list-group
                        v-for="item in groupItems"
                        v-model="item.active"
                        :key="item.title"
                        :prepend-icon="item.action"
                        no-action

                >
                    <v-list-item slot="activator">
                        <v-list-item-content>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item v-for="subItem in item.items" :key="subItem.title" :to="subItem.to ? `/admin/${subItem.to}` : '' ">
                        <v-list-item-content>
                            <v-list-item-title>{{ subItem.title }}</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-icon>{{ subItem.action }}</v-icon>
                        </v-list-item-action>
                    </v-list-item>
                </v-list-group>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar
                :clipped-left="clipped"
                fixed
                app
                style="background-color: #7F2AD3"
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" color="white"/>
            <v-btn
                    icon
                    @click.stop="miniVariant = !miniVariant"
                    color="white"
            >
                <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
            </v-btn>
            <v-btn
                    icon
                    @click.stop="clipped = !clipped"
                    color="white"
            >
                <v-icon>mdi-application</v-icon>
            </v-btn>
            <v-btn
                    icon
                    @click.stop="fixed = !fixed"
                    color="white"
            >
                <v-icon>mdi-minus</v-icon>
            </v-btn>
            <v-toolbar-title v-text="title" class="white--text"/>
            <v-spacer/>
            <v-btn
                    icon
                    @click.stop="rightDrawer = !rightDrawer"
                    color="white"
            >
                <v-icon>mdi-menu</v-icon>
            </v-btn>
        </v-app-bar>
        <v-main class="grey lighten-2">
            <v-container fluid>
                <no-ssr>
                    <nuxt/>
                </no-ssr>
            </v-container>
        </v-main>
        <v-navigation-drawer
                v-model="rightDrawer"
                :right="right"
                temporary
                fixed
                dark
        >
            <v-list>
                <v-list-item @click.native="right = !right">
                    <v-list-item-action>
                        <v-icon light>
                            mdi-repeat
                        </v-icon>
                    </v-list-item-action>
                    <v-list-item-title>Switch drawer (click me)</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </v-app>
</template>

<script>
    import {mapState} from "vuex";
    export default {
        data() {
            return {
                clipped: false,
                drawer: false,
                fixed: false,
                items: [
                    {
                        to: '/admin/dashboard',
                        title: 'Dashboard',
                        icon: 'dashboard',
                    }
                ],
                groupItems: [
                    {
                        action: 'settings',
                        title: 'Settings',
                        items: [
                            { title: 'General', to: 'settings/general' },
                            { title: 'Logo', to: 'settings/logo' },
                            { title: 'Home Page', to: 'settings/homepage' },
                        ]
                    }
                ],
                miniVariant: false,
                right: true,
                rightDrawer: false,
            }
        },
        computed:{
            ...mapState({
                title: state => state.dashboard.title,
            })
        }
    }
</script>
