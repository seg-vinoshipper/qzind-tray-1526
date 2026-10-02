import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'index',
      component: () => import('../stage-file.vue'),
    },
  ],
})

export default router
