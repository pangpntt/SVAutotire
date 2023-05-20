import Vue from 'vue';
import VueRouter from 'vue-router';


Vue.use(VueRouter)


const routes = [
    {
        path: '/',
        name: 'LoginView',
        component: () => import('../views/LoginView.vue')
    },
    {
        path: '/register',
        name: 'Signup',
        component: () => import('../views/Register.vue')
    },
    {
        path: '/stock',
        name: 'Register',
        component: () => import('../views/HomeView.vue')
    },
    {
        path: '/wheel',
        name: 'Register',
        component: () => import('../views/WheelView.vue')
    },
    {
        path: '/tire',
        name: 'Register',
        component: () => import('../views/TireView.vue')
    },
    {
        path: '/import',
        name: 'Register',
        component: () => import('../views/ImportProduct.vue')
    },
    {
        path: '/sell',
        name: 'Register',
        component: () => import('../views/SellProduct.vue')
    },
    {
        path: '/customer',
        name: 'Register',
        component: () => import('../views/CustomerView.vue')
    },
    {
        path: '/warehouse',
        name: 'Register',
        component: () => import('../views/WareHouse.vue')
    },
    

]

const router = new VueRouter({
    routes
  })
  
  export default router