<template>
    <v-container>
        <p>Auth Container</p>
        <v-btn @click="sendRequest">Send Request</v-btn>
    </v-container>
</template>

<script>
    export default {
        middleware: ['auth'],
        name: "auth",
        methods: {
            sendRequest(){
                this.$axios.post(process.env.API_URL+'/test-post')
            }
        }
    }
</script>

<style scoped>

</style>