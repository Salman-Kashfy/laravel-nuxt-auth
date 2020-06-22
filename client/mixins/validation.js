import {mapState} from "vuex";

export default {

    computed:{
        ...mapState({
            errors: state => state.validation.errors,
        })
    },

}