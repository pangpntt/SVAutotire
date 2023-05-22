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
        meta: { LoginView: true, role: true },
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
        meta: { LoginView: true},
        component: () => import('../views/WheelView.vue')
    },
    {
        path: '/tire',
        name: 'TireView',
        meta: { LoginView: true},
        component: () => import('../views/TireView.vue')
    },
    {
        path: '/import',
        name: 'Import',
        meta: { LoginView: true, role: true },
        component: () => import('../views/ImportProduct.vue')
    },
    {
        path: '/sell',
        name: 'Sell',
        meta: { LoginView: true},
        component: () => import('../views/SellProduct.vue')
    },
    {
        path: '/customer',
        name: 'Customer',
        meta: { LoginView: true},
        component: () => import('../views/CustomerView.vue')
    },
    {
        path: '/warehouse',
        name: 'Warehouse',
        meta: { LoginView: true},
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
        
    }


    if (to.meta.guess && isLoggedIn) {
        console.log(2)
      alert("You've already logged in")
      next({ path: '/stock'})
    }
    if(to.meta.role && isLoggedIn){
        const {name, role} = getUserInfoFromToken(localStorage.getItem('token'))

        if(role === 'Employee'){
            alert(name + " คุณไม่มีสิทธิ์ที่จะเข้าหน้านี้")
            next(false)
        }

    }else{
        next()
    }



  })
  export default router