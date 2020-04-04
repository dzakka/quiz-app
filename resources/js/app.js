/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import VueRouter from 'vue-router'
Vue.use(VueRouter)
export const bus = new Vue();

import App from './views/App'
import Home from './views/Home'
import categories from './views/categories'
import difficulty from './views/difficulty'
import game from './views/game'
import skippedquestions from './views/skippedquestions'

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'categories',
            component: categories
        },
        {
            path:'/difficulty/:categoryid',
            name:'difficulty',
            component: difficulty,
            props:true
        },
        {
            path:'/difficulty/:useroptions',
            name:'game',
            component: game,
            props:true
        },
        {
            path:'/skipped',
            name:'skippedquestions',
            component: skippedquestions,
            props:true
        },
    ],
});



Vue.component('example-component', require('./components/ExampleComponent.vue').default);


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    components: { App },
    router,
});
