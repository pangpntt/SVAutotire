import Vue from 'vue';
import VueRouter from 'vue-router';
import jwt_decode from 'jwt-decode';

Vue.use(VueRouter)


const routes = [
    {
        path: '/',
        name: 'LoginView',
        meta: { guess: true },
        component: () => import('../views/LoginView.vue')
    },
    {
        path: '/register',
        name: 'Register',
        meta: { LoginView: true },
        component: () => import('../views/Register.vue')
    },
    {
        path: '/stock',
        name: 'Home',
        meta: { LoginView: true },
        component: () => import('../views/HomeView.vue')
    },
    {
        path: '/wheel',
        name: 'Register',
        component: () => import('../views/WheelView.vue')
    },
    {
        path: '/tire',
        name: 'TireView',
        component: () => import('../views/TireView.vue')
    },
    {
        path: '/import',
        name: 'Import',
        component: () => import('../views/ImportProduct.vue')
    },
    {
        path: '/sell',
        name: 'Sell',
        component: () => import('../views/SellProduct.vue')
    },
    {
        path: '/customer',
        name: 'Customer',
        component: () => import('../views/CustomerView.vue')
    },
    {
        path: '/warehouse',
        name: 'Warehouse',
        meta: { LoginView: true, role: true },
        component: () => import('../views/WareHouse.vue')
    },
    

]
function getUserInfoFromToken(token) {
    const decodedToken = jwt_decode(token);
    const name = decodedToken.name;
    const role = decodedToken.role;
    return { name, role };
  }


const router = new VueRouter({routes})
router.beforeEach((to, from, next) => {
    const isLoggedIn = !!localStorage.getItem('token')
    if (to.meta.LoginView && !isLoggedIn) {
      alert('Please login first!')
      next({ path: '/' })
      console.log(getUserInfoFromToken)
    }
  
    if (to.meta.guess && isLoggedIn) {
      alert("You've already logged in")
      next({ path: '/stock'})
    }

  
    next()
  })
  export default router