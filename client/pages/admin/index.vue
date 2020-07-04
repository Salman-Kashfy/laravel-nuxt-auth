<template>
    
</template>

<script>
    export default {
        middleware: ['admin'],
        layout: 'dashboard',
        name: "index",
        beforeMount(){
            this.$router.push({path:'admin/dashboard'})
        }
    }
</script>

<style scoped>

</style>