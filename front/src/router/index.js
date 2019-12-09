import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue' 
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Publicacion from '../components/Publicacion.vue'
import Profile from '../components/Profile.vue'
import Tag from '../components/Tag.vue'
Vue.use(Router)

var router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        usuario: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        libre: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        libre: true
      }
    },
    {
      path: '/publicacion/:id',
      name: 'publicacion',
      component: Publicacion,
      meta: {
        usuario: true
      }
    },
    {
      path: '/profile/:id',
      name: 'profile',
      component: Profile,
      meta: {
        usuario: true
      }
    },
    {
      path: '/tag/:tag',
      name: 'tag',
      component: Tag,
      meta: {
        usuario: true
      }
    }
  ]
})
router.beforeEach((to, from, next) => {  
  if (to.matched.some(record => record.meta.libre)){
    next();
  } else if ( store.state.usuario && store.state.usuario.rol.id== 'usuario'){
    if (to.matched.some(record => record.meta.usuario)){
      next();
    }
  } else{
    next({name: 'login'});
  }
})
export default router
