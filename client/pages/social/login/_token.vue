<template>
    <div>
        <v-overlay :value="overlay" :z-index="overlayZindex" :opacity="overlayOpacity" :color="overlayColor">
            <v-progress-circular indeterminate size="64" :color="progressColor"></v-progress-circular>
        </v-overlay>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "social-login",
        head () {
            return {
                title: this.title
            }
        },
        data() {
            return {
                title: 'Redirecting...',
                form: this.$vform({
                    token: this.$route.params.token
                }),

            }
        },
        computed:{
            ...mapState({
                overlay: true,
                overlayOpacity: state => state.site.overlayOpacity,
                overlayZindex: state => state.site.overlayZindex,
                overlayColor: state => state.site.overlayColor,
                progressColor: state => state.site.progressColor,
            })
        },
        mounted(){
            if(!this.$route.params.token) return this.$nuxt.error({ statusCode: 404 });
            this.form.token = this.$route.params.token;
            this.getUser();
        },
        methods: {
            getUser(){
                this.$auth.setUserToken(this.form.token).then(() => {
                    window.location.href = process.env.CLIENT_URL;
                })
           }
        }
    }
</script>