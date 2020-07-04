
export default async function ({$auth,$axios,store}) {
    let response = await $axios.get(process.env.API_URL+'/client-settings');
    store.dispatch('site/setSettings',response.data.settings);
}