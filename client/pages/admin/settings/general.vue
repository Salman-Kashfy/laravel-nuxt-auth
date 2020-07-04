<template>
    <div class="shadow white pa-4">
        <h1>SAASAS</h1>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        middleware: ['admin'],
        layout: 'dashboard',
        name: "general",
        head () {
            return {
                title: this.title
            }
        },
        data(){
            return{
                title: 'General'
            }
        },
        computed:{
            ...mapState({
                title: state => state.dashboard.title,
            })
        },
        mounted(){
            this.$store.dispatch('dashboard/setTitle',this.title)
        }
    }
</script>

<style scoped>

</style>