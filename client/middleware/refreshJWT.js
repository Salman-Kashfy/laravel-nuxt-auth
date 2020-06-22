import jwt_decode from 'jwt-decode';
export default async function ({$auth,$axios}) {
    let token = $auth.getToken('local','token');
    if(!token) return;

    if($auth.$state.loggedIn){
        if($auth.$storage.state.strategy === 'local'){
            token = token.replace('Bearer ','');
            let decoded = jwt_decode(token);
            let expiryDate = new Date(decoded.exp*1000);
            let currentDate = new Date();
            let diffMs = expiryDate - currentDate;
            let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
            if(diffMins<2){
                try{
                    let response = await $axios.post(process.env.API_URL+'/refresh');
                    await $auth.setUserToken(response.data.access_token).then(() => console.log('Token Set!'))
                }catch (e) {}
            }
            console.log(token);
            console.log(diffMins);
        }
    }
}