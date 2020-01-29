import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Reg from '../components/Reg.vue'
import Index from '../views/Index.vue'
import Myheader from '../components/Myheader.vue'
import Carouselone from '../components/Carouselone.vue'
import Hotrec from '../components/Hotrec.vue'
import Ranklist from '../components/Ranklist.vue'
import Myfooter from '../components/Myfooter.vue'
import Musicplayer from '../components/Musicplayer.vue'

Vue.use(VueRouter)

const routes = [
  {path: '/',component: Index},
  {path: '/Login',component: Login},
  {path: '/Reg',component: Reg},
  {path: '/Myheader',component: Myheader},
  {path: '/Carouselone',component: Carouselone},
  {path: '/Hotrec',component: Hotrec},
  {path: '/Ranklist',component: Ranklist},
  {path: '/Myfooter',component: Myfooter},
  {path: '/Musicplayer',component: Musicplayer},
]

const router = new VueRouter({
  routes
})

export default router
