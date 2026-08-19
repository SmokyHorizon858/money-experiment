import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import ThankYouView from './views/ThankYouView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/thank-you',
      name: 'thank-you',
      component: ThankYouView,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
