<template>
    <v-container fill-height>
        <SigningHeader/>
        <div class="d-table w-100 h-100">
            <div class="d-table-cell h-100">
                <v-row class="white" style="border-radius: 20px;">
                    <div class="col-md-4 pr-3 pr-md-0">
                        <v-alert v-if="msg"
                                 border="bottom"
                                 colored-border
                                 :type="response ? 'success' : 'error'"
                                 elevation="2" class="mb-3">
                            {{ msg }}
                        </v-alert>
                        <div class="pt-8 pb-6 pl-8 pr-8 shadow" style="border-radius: 20px;">
                            <h1 class="googlesans-regular mb-3 text-center font-weight-light" style="font-size: 20px;">{{ title }}</h1>
                            <p class="mb-3 blue-grey--text darken-4">Please enter your email address. You will receive a link to create a new password via email.</p>
                            <v-form ref="form" id="login-form" @submit.prevent="sendResetLink">
                                <v-text-field
                                        label="Email"
                                        name="email"
                                        v-model="form.email"
                                        prepend-inner-icon="email"
                                        type="email"
                                        clearable
                                        :rules="errors.email ? [errors.email[0]] : []"
                                ></v-text-field>
                                <div class="mt-5 mb-5">
                                    <v-btn type="submit" depressed="" :loading="loading" color="blue lighten-1 googlesans-regular white--text" block>Send Reset Link</v-btn>
                                </div>
                            </v-form>
                        </div>
                    </div>
                    <div class="offset-1"></div>
                    <div id="login-image" class="col-md-7 text-md-right d-none d-md-block"></div>
                </v-row>
            </div>
        </div>
    </v-container>
</template>

<script>
    import validation from "@/mixins/validation";
    import SigningHeader from"@/components/Headers/SigningHeader";

    export default {
        layout: 'blank',
        middleware: ['guest'],
        name: "forgot-password",
        head () {
            return {
                title: this.title,
            }
        },
        data(){
            return {
                title: 'Recover Account',
                form: this.$vform({
                    email: '',
                    email_url: `${process.env.CLIENT_URL}/reset-password`,
                }),
                loading: false,
                response: null,
                msg: null,
            }
        },
        mounted(){
            let img = new Image();
            img.src = require('~/static/forgot-password.png');
            let target =document.getElementById('login-image');
            target.appendChild(img);
        },
        methods:{
            sendResetLink(){
                this.loading = true;
                this.$axios.post(process.env.API_URL+'/reset-password-request',this.form).then((response)=>{
                    this.loading = false;
                    this.response = response.data.status;
                    this.msg = response.data.msg;
                    if(response.data.status){
                        this.form.reset()
                    }
                }).catch (()=>{
                    this.$refs.form.validate();
                    this.loading = false;
                });
            }
        },
        components:{
            SigningHeader
        },
        mixins: [validation]
    }
</script>

<style scoped>

</style>