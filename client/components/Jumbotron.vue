<template>
    <div class="jumbotron shadow">
        <h1 class="display-4" v-html="title"></h1>
        <p class="lead pink darken-4 white--text" v-html="lead"></p>
        <hr class="my-4">
        <p v-if="content" v-html="content"></p>
    </div>
</template>

<script>
    export default {
        name: "Jumbotron",
        props: {
            title:{
                required:true,
            },
            lead:{
                required:true,
            },
            content:{
                required:false,
            }
        }
    }
</script>

<style scoped>

</style>