<template>
    <div class="text-center mb-5">
        <a :href="API_URL+'/login/facebook'" class="text-decoration-none"><v-btn small class="ma-2 white--text text-h6 shadow" fab color="indigo"><i class="flaticon-facebook"></i></v-btn></a>
        <a :href="API_URL+'/login/google'" class="text-decoration-none"><v-btn small class="ma-2 shadow" fab color="white"><img width="20" src="~static/google-social-icon.svg"></v-btn></a>
        <a :href="API_URL+'/login/github'" class="text-decoration-none"><v-btn small class="ma-2 white--text text-h6 shadow" fab color="black"><i id="github-social" class="flaticon-github"></i></v-btn></a>
    </div>
</template>

<script>
    export default {
        name: "Socialite",
        data(){
            return {
                API_URL: process.env.API_URL
            }
        }

    }
</script>

<style scoped>

</style>