export default function ({$axios, app , store, redirect}) {
    $axios.onError(error => {
        if(error.response.status === 422){
            store.dispatch('validation/setErrors',error.response.data.errors)
        }
        if(error.response.status === 401){
            app.$auth.reset();
            return redirect('/login');
        }
        return Promise.reject(error)
    })
    $axios.onRequest(() => {
        store.dispatch('validation/clearErrors');
    })
}