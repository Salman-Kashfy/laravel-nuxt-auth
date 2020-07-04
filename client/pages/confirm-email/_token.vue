<template>
    <v-container :class="!form.token ? 'd-none' : ''">
        <div class="col-md-6 ma-auto">
            <v-card class="mx-auto" max-width="400" :loading="loading">
                <v-card-title v-html="loading ? 'Please wait...' : heading">{{ heading }}</v-card-title>
                <v-card-text class="text--primary">
                    <div>{{ message }}</div>
                </v-card-text>
                <v-card-actions>
                    <nuxt-link v-show="verified" to="/"><v-btn color="primary" text>Explore</v-btn></nuxt-link>
                    <v-btn v-show="!verified && retry" color="primary" :disabled="loading" @click="verify" text>Retry</v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </v-container>
</template>

<script>
    export default {
        name: "token",
        head () {
            return {
                title: this.title
            }
        },
        data() {
            return {
                title: 'Email Confirmation',
                heading: 'Please wait...',
                message: 'Email confirmation enable users to gain full access on our app without any restrictions.',
                loading: true,
                form: this.$vform({
                    token:null
                }),
                verified: false,
                retry: false,
            }
        },
        mounted(){
            if(!this.$route.params.token) return this.$nuxt.error({ statusCode: 404 });
            this.form.token = this.$route.params.token;
            this.verify();
        },
        methods: {
           async verify(){
                try{
                    this.loading = true;
                    await this.$axios.post(`${process.env.API_URL}/verify-email`,this.form).then((response)=>{
                        this.loading = false;
                        this.retry = response.data.retry;
                        this.heading = response.data.msg;
                        if(response.data.status){
                            if(response.data.token && !this.$auth.state.loggedIn){
                                this.$auth.setUser(response.data.user);
                                this.$auth.setUserToken(response.data.token).then(() => console.log('Token Set!'))
                            }
                            this.verified = true;
                        }
                    });
                }catch (e) {
                    console.log(e)
                }
            }
        }
    }
</script>

<style scoped>

</style>