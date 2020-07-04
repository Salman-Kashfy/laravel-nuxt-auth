export default function ({$axios, app , store, redirect}) {
    $axios.onError(async (error) => {
        if(error.response.status === 422){
            store.dispatch('validation/setErrors',error.response.data.errors)
        }
        if(error.response.status === 401){
            let promise = new Promise((res,rej)=>{
                try{
                    $axios.post(process.env.API_URL+'/refresh').then((response)=>{
                        app.$auth.setUserToken(response.data.access_token).then(() => {
                            return res(true)
                        })
                    }).catch(()=>{
                        return rej(false)
                    })
                }catch (e) {}
            });
            await promise;
        }
        if(error.response.status === 500){
            app.$auth.reset();
            return redirect('/login');
        }
        if(error.response.status === 403){
            app.$auth.reset();
            return redirect('/login');
        }
        return Promise.reject(error)
    });

    $axios.onRequest(() => {
        store.dispatch('validation/clearErrors');
    });
}