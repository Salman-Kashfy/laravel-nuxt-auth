<template>
    <div id="bg" class="h-100">
        <div class="col-md-8 ml-auto mr-auto h-100">
            <v-container fill-height fluid>
                <v-row>
                    <div class="d-table w-100 h-100">
                        <div class="d-table-cell h-100">
                            <v-row class="white shadow" style="border-radius: 20px;">
                                <div class="col-md-6 pt-md-10 pb-md-10 pl-md-10 pt-7 pb-7">
                                    <h1 class="googlesans-medium mb-3 text-center">Log in to your Account</h1>
                                    <div class="text-center mb-5">
                                        <v-btn small class="ma-2 white--text text-h6 shadow" fab color="indigo" @click="loginFB"><i class="flaticon-facebook"></i></v-btn>
                                        <v-btn small class="ma-2 shadow" fab color="white"><img width="20" src="~assets/images/google-social-icon.svg"></v-btn>
                                        <v-btn small class="ma-2 white--text lighten-1 text-h6 shadow" fab color="blue" @click="loginFB"><i class="flaticon-twitter"></i></v-btn>
                                    </div>
                                    <p class="text-center mb-0 blue-grey--text darken-4">or use your email account</p>
                                    <v-form ref="form" id="login-form">
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
                                        <v-checkbox v-model="form.remember" :label="`Remember Me`"></v-checkbox>
                                        <div class="mt-5">
                                            <v-btn depressed="" color="text-transform-inherit blue lighten-1 white--text">Login Up</v-btn>
                                            <nuxt-link class="text-decoration-none" to="/to"><v-btn depressed="" color="primary" text>Create Account</v-btn></nuxt-link>
                                        </div>
                                    </v-form>
                                </div>
                                <div class="col-md-6 text-md-right">
                                    <img src="~/assets/images/login-image.png">
                                </div>
                            </v-row>
                        </div>
                    </div>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script>
    import Form from 'vform'
    import errors from "@/mixins/errors";
    export default {
        layout: 'modal',
        name: "login",
        data() {
            return {
                title: 'Login',
                form: new Form({
                    email: '',
                    password: '',
                    remember: false,
                }),
                loading: false,
                hide_password: true,

            }
        },
        mixins: [errors]
    }
</script>

<style scoped>
    #bg{
        height: 100%;
        background-color: #f8f8f8 !important;
    }
</style>