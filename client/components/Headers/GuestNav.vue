<template>
    <div class="d-inline">
        <nuxt-link to="/login" class="text-decoration-none"><v-btn depressed="" class="text-transform-inherit mr-1">Log In</v-btn></nuxt-link>
        <nuxt-link to="/signup" class="text-decoration-none"><v-btn color="text-transform-inherit blue lighten-1 white--text">Sign Up</v-btn></nuxt-link>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import Form from 'vform'

    export default {
        name: "GuestNav",
        data(){
            return {
                creatingAccount:false,
            }
        },
        mounted(){
            $(document).on('click','.v-overlay--active',()=>{
                this.$store.dispatch('navbar/closeDrawer');
            })
        },
        methods:{
            hideDrawer(){
                this.$store.dispatch('navbar/toggleDrawer')
            }
        }
    }
</script>

<style scoped>

</style>