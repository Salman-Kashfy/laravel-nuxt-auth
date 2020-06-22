<template>
    <div>
        <div class="container">
            <!--<v-btn>Hello Button</v-btn>-->
            <!--<v-btn depressed="" :class="{'ma-0': $vuetify.breakpoint.smAndDown, 'ma-5': $vuetify.breakpoint.mdAndUp}">Hello Button</v-btn>-->
            <!--<v-btn color="pink white&#45;&#45;text" small=""><v-icon left>mail</v-icon> Hello Button</v-btn>-->
            <!--<v-btn color="pink white&#45;&#45;text"><v-icon left>mail</v-icon> Hello Button</v-btn>-->
            <!--<v-btn :loading="loading3" :disabled="loading3" color="blue-grey" class="white&#45;&#45;text">-->
                <!--Upload-->
                <!--<v-icon right dark>cloud_upload</v-icon>-->
            <!--</v-btn>-->

            <!--<v-btn fab="" small=""><v-icon>mail</v-icon></v-btn>-->

            <!--<v-layout row wrap>-->
                <!--<v-flex xs12 sm6 md4 class="pa-5 pink">Three column</v-flex>-->
                <!--<v-flex xs12 sm6 md4 class="pa-5 pink lighten-2">Three column</v-flex>-->
                <!--<v-flex xs12 sm6 md4 class="pa-5 pink lighten-3">Three column</v-flex>-->
            <!--</v-layout>-->
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    export default {
        name: "about",
        data(){
            return {
                loader: null,
                loading3: false,
                title: 'Salman',
                jumbotron: {
                    title: 'NuxtJS !',
                    lead: 'Nuxt is based on a powerful modular architecture. You can choose from more than 50 modules to make your development faster and easier. You don\'t have to reinvent the wheel to get PWA benefits, add Google Analytics to your page or generate a sitemap.',
                    content: 'With Nuxt.js, your application will be optimized out of the box. We do our best to build performant applications by utilizing Vue.js and Node.js best practices. To squeeze every unnecessary bit out of your app Nuxt includes a bundle analyzer and lots of opportunities to fine-tune your app.',
                }
            }
        },
        methods:{

        },
        mounted(){
            //let token = localStorage.getItem('auth._token.local');
            // console.log(this.$auth.token)
            // console.log(this.$store);
            // console.log(this.$store.state.auth.loggedIn);
            // console.log(this.$store.state.auth.user);
        },
    }
</script>
