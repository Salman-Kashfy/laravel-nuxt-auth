import {mapState} from "vuex";

export default {

    methods: {
        getUserFullName(){
            let user = this.$store.state.auth.user
            return `${user.f_name} ${user.l_name}`
        }
    }

}