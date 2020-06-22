<template>
    <img :src="image" :alt="alt">
</template>

<script>
    export default {
        props: {
            src: {
                default: null,
                required: true,
            },
            alt: {
                type: String,
                default: 'Avatar',
                required: false,
            },
        },
        data(){
            return {
                image: require('~/static/default-avatar.png')
            }
        },
        name: "Avatar",
        mounted() {
            if(this.src) this.image = this.src;
        }
    }
</script>

<style scoped>

</style>