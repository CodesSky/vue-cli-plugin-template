import Index from '@/page/<%= pageName %>/index.vue';
import VueRouter from 'vue-router';

export default new VueRouter({
    routes: [{
        path: '/',
        component: Index
    }]
});

