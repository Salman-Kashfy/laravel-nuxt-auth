<template>
    <v-container fill-height>
        <SigningHeader/>
        <div class="d-table w-100 h-100">
            <div class="d-table-cell h-100">
                <v-row class="white" style="border-radius: 20px;">
                    <div id="login-image" class="col-md-7 text-md-right d-none d-md-block"></div>
                    <div class="offset-1"></div>
                    <div class="col-md-4 pr-3 pr-md-0">
                        <div class="pt-8 pb-6 pl-8 pr-8 shadow" style="border-radius: 20px;">
                            <h1 class="googlesans-regular mb-3 text-center font-weight-light" style="font-size: 20px;">{{ title }}</h1>
                            <Socialite/>
                            <p class="text-center mb-3 blue-grey--text darken-4">or use your email account</p>
                            <v-form ref="form" id="login-form" @submit.prevent="login">
                                <v-text-field
                                        label="Email"
                                        name="email"
                                        v-model="form.email"
                                        prepend-inner-icon="email"
                                        type="email"
                                        clearable
                                        :rules="errors.email ? [errors.email[0]] : []"
                                ></v-text-field>
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
                                <!--<v-checkbox v-model="form.remember" :label="`Remember Me`" value="1"></v-checkbox>-->
                                <div class="mt-5 mb-5">
                                    <v-btn type="submit" depressed="" :loading="loading" color="blue lighten-1 googlesans-regular white--text">Sign in</v-btn>
                                    <nuxt-link class="text-decoration-none googlesans-regular" to="/signup"><v-btn depressed="" color="primary" text>Create Account</v-btn></nuxt-link>
                                </div>
                                <div class="text-center">
                                    <nuxt-link class="text-decoration-none" to="/forgot-password"><v-btn depressed="" class="text-transform-inherit googlesans-regular" text>Forgot Password?</v-btn></nuxt-link>
                                </div>
                            </v-form>
                        </div>
                    </div>
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
        name: "login",
        head () {
            return {
                title: this.title
            }
        },
        data() {
            return {
                title: 'Login to your account',
                form: this.$vform({
                    email: 'salmankashfy@gmail.com',
                    password: 'testing123',
                    remember: null,
                }),
                loading: false,
                hide_password: true,
            }
        },
        mounted(){
            let img = new Image();
            img.src = require('~/static/login-image.png');
            let target =document.getElementById('login-image');
            target.appendChild(img);
        },
        methods:{
            async login(){
                this.loading = true;
                try{
                    await this.$auth.login({data: this.form});
                    let redirect = this.$route.query.redirect ? this.$route.query.redirect : { name: 'index' };
                    this.$router.push(redirect)
                }catch (e) {
                    console.log(e)
                    this.$refs.form.validate();
                    this.loading = false;
                }
            }
        },
        components:{
            Socialite,SigningHeader
        },
        mixins: [validation]
    }
</script>

<style scoped>
</style>