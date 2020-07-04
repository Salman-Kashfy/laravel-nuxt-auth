<template>
    <v-container fill-height>
        <SigningHeader/>
        <div class="d-table w-100 h-100">
            <div class="d-table-cell h-100">
                <v-row class="white pt-8 pb-8 pl-10 pr-10 shadow" style="border-radius: 20px;">
                    <div class="col-md-5">
                        <h1 class="googlesans-regular mb-3 text-center font-weight-light" style="font-size: 20px;">{{ title }}</h1>
                        <Socialite/>
                        <p class="text-center mb-0 blue-grey--text darken-4">or create your email account</p>
                        <v-form ref="form" id="login-form" @submit.prevent="signup_local">
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                            label="First name"
                                            v-model="form.f_name"
                                            clearable
                                            class="alpha-only"
                                            prepend-inner-icon="person"
                                            :rules="errors.f_name ? [errors.f_name[0]] : []"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                            label="Last name"
                                            v-model="form.l_name"
                                            clearable
                                            class="alpha-only"
                                            :rules="errors.l_name ? [errors.l_name[0]] : []"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                            label="Email"
                                            name="email"
                                            v-model="form.email"
                                            prepend-inner-icon="email"
                                            type="email"
                                            clearable
                                            :rules="errors.email ? [errors.email[0]] : []"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                            :append-icon="hide_password ? 'visibility' : 'visibility_off'"
                                            @click:append="hide_password = !hide_password"
                                            id="password"
                                            label="Password"
                                            name="password"
                                            v-model="form.password"
                                            prepend-inner-icon="lock"
                                            :type="hide_password ? 'password' : 'text'"
                                            counter="191"
                                            maxlength="191"
                                            hint="At least 6 characters"
                                            :rules="errors.password ? [errors.password[0]] : []"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <div class="mt-5 mb-5">
                                <v-btn type="submit" color="googlesans-regular blue lighten-1 white--text" :loading="loading" :disabled="loading||disabled" block>Create Account</v-btn>
                            </div>
                            <div class="text-center">
                                Already have an account? <nuxt-link class="text-decoration-none" color="primary" to="/login">Log in</nuxt-link>
                            </div>
                        </v-form>
                    </div>
                    <div class="offset-1"></div>
                    <div id="login-image" class="col-md-6 d-none d-md-block text-md-right"></div>
                </v-row>
            </div>
        </div>
    </v-container>
</template>

<script>
    import validation from "@/mixins/validation";
    import Socialite from"@/components/Social/Socialite";
    import SigningHeader from"@/components/Headers/SigningHeader";

    export default {
        layout: 'blank',
        middleware: ['guest'],
        name: "signup",
        head () {
            return {
                title: this.title
            }
        },
        data() {
            return {
                title: 'Create your account',
                form: this.$vform({
                    f_name: '',
                    l_name: '',
                    email: '',
                    password: '',
                    email_url: `${process.env.CLIENT_URL}/confirm-email`,
                }),
                loading: false,
                disabled: false,
                hide_password: true,
            }
        },
        methods:{
            async signup_local(){
                this.loading = true;
                this.disabled = true;
                try{
                    await this.$axios.post(`${process.env.API_URL}/register`,this.form).then((response)=>{
                        this.loading = false;
                        if(response.data.status){
                            this.$auth.login({data: this.form});
                            this.loading = false;
                            Toast.fire({
                                icon: 'success',
                                title: 'Created Succesfully !',
                                timer: 1000,
                            });
                        }else{
                            this.disabled = false;
                        }
                    });
                }catch (e) {
                    this.$refs.form.validate();
                    this.loading = false;
                    this.disabled = false;
                }
            }
        },
        mounted(){
            let img = new Image();
            img.src = require('~/static/signup-image.png');
            let target =document.getElementById('login-image');
            target.appendChild(img)
        },
        components:{
            Socialite,SigningHeader
        },
        mixins: [validation]
    }
</script>

<style scoped>

</style>