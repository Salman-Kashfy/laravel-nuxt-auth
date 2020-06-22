<template>
    <div id="bg" class="h-100">
        <div class="col-md-8 ml-auto mr-auto h-100">
            <v-container fill-height fluid>
                <v-row>
                    <div class="d-table w-100 h-100">
                        <div class="d-table-cell h-100">
                            <v-row class="white pt-14 pb-14 pl-15 pr-15 shadow" style="border-radius: 20px;">
                                <div class="col-md-6 text-md-right">
                                    <img src="~/assets/images/login-image.jpg">
                                </div>
                                <div class="offset-md-1"></div>
                                <div class="col-md-5">
                                    <h1 class="googlesans-medium mb-8">Log in</h1>
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
                                            <nuxt-link class="text-decoration-none" to="/signup"><v-btn depressed="" color="text-transform-inherit blue lighten-1" text>Create Account</v-btn></nuxt-link>
                                        </div>
                                    </v-form>
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