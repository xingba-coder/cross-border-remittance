import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path:'/singleRemit',
      name:'singleRemit',
      children:[
        {
          path:'/singleRemit/savedList',
          name:'singleRemit-savedList',
          component: () => import('@/views/businessDeal/singleRemit/savedList.vue')
        },
        {
          path:'/singleRemit/launch',
          name:'singleRemit-launch',
          component: () => import('@/views/businessDeal/singleRemit/launchBusiness.vue')
        },
        {
          path:'/singleRemit/tobeModified',
          name:'singleRemit-tobeModified',
          component: () => import('@/views/businessDeal/singleRemit/tobeModified.vue')
        },
        {
          path:'/singleRemit/tobeReviewed',
          name:'singleRemit-tobeReviewed',
          component: () => import('@/views/businessDeal/singleRemit/tobeReviewed.vue')
        },
      ]
    },
    {
      name:'allSearch',
      path:'/allSearch',
      children:[
        {
          path:'/allSearch/index',
          name:'allSearch-index',
          component: () => import('@/views/businessSearch/search/index.vue')
        },
        {
          path:'/allSearch/detail',
          name:'allSearch-detail',
          component: () => import('@/views/businessSearch/search/detail.vue')
        },
      ]
    }
  ]
})

export default router
