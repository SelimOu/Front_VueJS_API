import { createRouter, createWebHistory } from 'vue-router'

import formProduit from '../views/formProduit.vue';
import EditformProduit from '../views/EditFormProduit.vue';
import User from '../views/User.vue'
import register from '../views/register.vue';
// import EditformUser from '../views/editFormUser.vue';
import HomeView from '../views/HomeView.vue';
import product from '../views/Product.vue';

import login from '../components/login.vue'
import store from '../stores/index.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      // meta: { requiresAuth: true }
    },
    {
      path: '/formProduit',
      name: 'formProduit',
      component: formProduit,
      meta: { requiresAuth: true }
    },
    {
      path: '/editFormProduit/:id',
      name: 'editformProduit',
      component: EditformProduit,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/product',
      name: 'Product',
      component: product,
      meta: { requiresAuth: true }
    },
    {
      path: '/user',
      name: 'User',
      component: User,
      meta: { requiresAuth: true }
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    // {
    //   path: '/editFormUser/:id',
    //   name: 'editformUser',
    //   component: EditformUser
    //   },
  ]
})
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem('token')) {
    next({ name: 'login' });
  } else {
    next();
  }
});
export default router
