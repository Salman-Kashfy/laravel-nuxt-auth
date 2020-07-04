<template>
    <v-container>
        <p>Auth Container</p>
        <div>{{ user }}</div>
        <v-btn @click="sendRequest">Send Request</v-btn>
    </v-container>
</template>

<script>

    export default {
        middleware: ['auth'],
        name: "auth",
        data(){
            return {
                user: {},
                form: this.$vform({
                    f_name: 'salman',
                    l_name: 'kashfy',
                }),
            }
        },
        mounted(){
            this.sendRequest();
        },
        methods: {
            sendRequest(){
                this.user = {};
                this.$axios.post(process.env.API_URL+'/test-post',this.form).then((response)=>{
                    this.user = response.data.user;
                }).catch((error)=>{
                    if(error.response && error.response.status === 401){
                        this.sendRequest();
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>