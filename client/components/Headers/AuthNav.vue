<template>
    <div class="d-inline">
        <nuxt-link to="/auth" class="text-decoration-none"><v-btn color="primary" text>Auth</v-btn></nuxt-link>
        <v-menu offset-y left min-width="200">
            <template v-slot:activator="{ on, attrs }">
                <v-avatar :tile="false" :size="'40'" v-bind="attrs" v-on="on">
                    <Avatar :src="avatar" :alt="getUserFullName()"/>
                </v-avatar>
            </template>
            <div class="d-flex pl-4 pr-4 pt-4" style="background-color: #fff !important;">
                <v-avatar :tile="false" :size="'25'" v-bind="attrs" v-on="on" class="text-capitalize">
                    <Avatar :src="avatar" :alt="getUserFullName()"/>
                </v-avatar>
                <div class="pl-3">
                    <p class="d-block primary--text mb-0 text-capitalize" style="line-height: 0.8">{{ getUserFullName() }}</p>
                    <p class="mb-0"><small class="blue-grey--text lighten-4">{{ user.role_name }}</small></p>
                </div>
            </div>
            <v-list class="pt-0">
                <v-list-item
                        v-for="(item, index) in items"
                        :key="index" @click="">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
                <v-list-item @click="logout">
                    <v-list-item-action class="mr-4">
                        <v-icon class="error--text">power_settings_new</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Logout</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import userMixin from '@/mixins/userMixin';
    import Avatar from '@/components/Avatar';

    export default {
        name: "AuthNav",
        data(){
            return {
                user: {},
                attrs: null,
                avatar: '',
                on: {data:'user-on-dropdown'},
                storage: process.env.STORAGE,
                items: [
                    { title: 'Click Me' },
                    { title: 'Click Me' },
                    { title: 'Click Me 2' }
                ]
            }
        },
        computed:{
            ...mapState({
                loggedIn: state => state.auth.loggedIn,
            })
        },
        methods: {
            async logout(){
                try{
                    await this.$auth.logout();
                    this.$router.push({ name: 'index' })
                }catch (e) {}
            }
        },
        beforeMount(){
            this.user = this.$store.state.auth.user;
            this.avatar = this.user.avatar ? `${this.storage}/users/thumbnail/${this.user.avatar}` : null;
        },
        components: {
            Avatar
        },
        mixins: [userMixin]
    }
</script>

<style scoped>

</style>