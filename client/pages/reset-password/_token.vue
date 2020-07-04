<template>
    <v-container :class="!form.token ? 'd-none' : ''">
        <div class="ma-auto" style="max-width: 400px;">
                <v-alert v-if="msg"
                         border="bottom"
                         colored-border
                         :type="reset_success ? 'success' : 'error'"
                         elevation="2" class="mb-3">
                    {{ msg }}
                </v-alert>
                <v-card class="mx-auto" :loading="loading">
                    <v-card-title>{{ heading }}</v-card-title>
                    <v-card-text class="text--primary" v-if="!checking_validity && valid_link">
                        <v-form ref="form" @submit.prevent="resetPassword">
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
                        <div class="mt-3">
                            <v-btn type="submit" class="blue lighten-1 white--text" :loading="loading" :disabled="loading||reset_success" block>Reset Password</v-btn>
                        </div>
                    </v-form>
                    </v-card-text>
                    <v-card-actions v-show="!checking_validity && reset_success">
                        <nuxt-link v-show="reset_success" to="/login"><v-btn color="primary" text>Login</v-btn></nuxt-link>
                    </v-card-actions>
                </v-card>
        </div>
    </v-container>
</template>

<script>
    import validation from "@/mixins/validation";

    export default {
        name: "token",
        head () {
            return {
                title: this.title
            }
        },
        data() {
            return {
                title: 'Reset Password',
                heading: 'Checking link validity...',
                loading: true,
                hide_password: true,
                form: this.$vform({
                    password: null,
                    token: this.$route.params.token
                }),
                reset_success: null,
                valid_link: null,
                checking_validity: true,
                msg: null,

            }
        },
        mounted(){
            if(!this.$route.params.token) return this.$nuxt.error({ statusCode: 404 });
            this.form.token = this.$route.params.token;
            this.verify();
        },
        methods: {
           verify(){
               this.$axios.post(`${process.env.API_URL}/reset-password-validity`,{token: this.$route.params.token}).then((response)=>{
                   console.log(response)
                   this.loading = false;
                   this.checking_validity = false;
                   this.valid_link = response.data.status;
                   this.heading = response.data.msg;
               }).catch(()=>{
                   this.$refs.form.validate();
                   this.loading = false;
               });
           },
           resetPassword(){
               this.msg = null;
               this.loading = true;
               this.$axios.post(`${process.env.API_URL}/reset-password`,this.form).then((response)=>{
                   this.form.password = null;
                   this.loading = false;
                   this.reset_success = response.data.status;
                   this.msg = response.data.msg;
               }).catch(()=>{
                   this.$refs.form.validate();
                   this.loading = false;
               });
           }
        },
        mixins: [validation]
    }
</script>

<style scoped>

</style>