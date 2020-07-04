<template>
    <v-app>
        <section id="banner">
            <div id="banner-image"></div>
            <v-overlay style="position: absolute;" opacity="0.55">
                <div class="col-md-7 ma-auto text-center">
                    <div class="mb-8">
                        <h1>{{ banner_title }}</h1>
                    </div>
                    <nuxt-link to="/signup"><v-btn color="primary lighten-1" large class="mr-md-4">Create Account</v-btn></nuxt-link>
                    <v-btn color="grey darken-3" large>See Categories</v-btn>
                </div>
            </v-overlay>
        </section>
        <v-container>
            <section>
                <v-row class="mt-8 mb-8">
                    <div class="col-md-6">
                        <div class="pt-10">
                            <h1 style="line-height: 1.2;" class="mb-6 text-h4 font-weight-bold">Building Transparency for The Make Money Online Course Industry</h1>
                            <p class="mb-6">The state of the online course market has declined immensley. Course sellers know how to market and charge high prices, but often times do not know how to teach their subject well. This site is about creating a place where all the information--good and bad--on these courses is in one spot.</p>
                            <h3 style="line-height: 1.4;">Course Sellers should be able to charge what they want, Students should be able to compare.</h3>
                        </div>
                    </div>
                    <div id="building-transparancy" class="col-md-6 text-center"></div>
                </v-row>
            </section>
            <section>
                <v-row>
                    <div v-for="course in courses" class="col-lg-3 col-md-6 course-item">
                        <v-card class="mx-auto my-6" max-width="374">
                            <v-img height="180" :loading="true" :src="course.img"></v-img>
                            <v-card-title style="min-height: 76px;"><h2 class="text-subtitle-1 font-weight-bold">{{ course.title }}</h2></v-card-title>
                            <v-card-text>
                                <small class="grey--text lighten-1 mb-3 d-block">{{ course.author }}</small>
                                <v-row align="center" class="mx-0">
                                    <v-rating :value="course.avg_ratings" color="amber" dense half-increments readonly size="14"></v-rating>
                                    <div class="grey--text ml-4"><strong class="black--text">{{ course.avg_ratings }}</strong> ({{ course.total_ratings }})</div>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </div>
                </v-row>
            </section>
        </v-container>
    </v-app>
</template>

<script>
    import Vue from 'vue';
    import helperMixin from '@/mixins/helperMixin';

    export default {
        name: "index",
        data(){
            return {
                loader: null,
                storage: process.env.STORAGE,
            }
        },
        async asyncData () {
            //const { data } = await axios.get(`https://my-api/posts/${params.id}`);
            return {
                banner: '13061-4.jpg',
                banner_title: 'Never waste a penny on the wrong course again.',
                section_2_title: 'Building Transparency for The Make Money Online Course Industry.',
                section_2_content: 'Building Transparency for The Make Money Online Course Industry.',
                section_2_image: 'building-transparancy.png',
                courses: [
                    {
                        title: 'Materialize CSS From Scratch With 5 Projects',
                        img: 'https://img-a.udemycdn.com/course/480x270/1554318_2ec4_2.jpg',
                        author: 'John Doe',
                        avg_ratings: 4.7,
                        total_ratings: 1415
                    },
                    {
                        title: 'Express.js Nodejs & MongoDB',
                        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png',
                        author: 'Brad Traversery',
                        avg_ratings: 4.1,
                        total_ratings: 206
                    },{
                        title: 'Full Stack Development with React and ASP.NET Core 2',
                        img: 'https://miro.medium.com/max/1200/1*92vVNeUNp2U-kcqlKYfABw.png',
                        author: 'Packt Publishing',
                        avg_ratings: 4.4,
                        total_ratings: 81
                    },{
                        title: 'NuxtJS, VueJS on Steroids',
                        img: 'https://img-a.udemycdn.com/course/750x422/1523224_60cb.jpg',
                        author: 'Max Payne',
                        avg_ratings: 4.9,
                        total_ratings: 1654
                    },
                ]
            }
        },
        methods:{

        },
        mounted(){
            this.appendImage(this.storage+'/site/'+this.banner,'banner-image');
            this.appendImage(this.storage+'/site/'+this.section_2_image,'building-transparancy');
        },
        mixins: [helperMixin]
    }
</script>
