import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'
import store from '../vuex/store.js'

let useInfo = store.state.userInfo;
Vue.use(Router)

const router= new Router({
  mode:"hash",
  linkActiveClass: 'is-active',
  routes
})
// router.beforeEach((to, from, next) => {
//   if (to.meta.requireAuth) {
//     if (store.state.common){
//       next();
//     }
//     else {
//       next('/login')
//     }
//   }
//   else {
//     next();
//   }
// })
export default router