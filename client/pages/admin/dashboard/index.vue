<template>
    <div></div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        middleware: ['admin'],
        layout: 'dashboard',
        name: "dashboard.index",
        head () {
            return {
                title: this.title
            }
        },
        data(){
            return{
                title: 'Dashboard'
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