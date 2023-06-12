import { createWebHashHistory, createRouter } from 'vue-router'
import Layout from '@/layout/index.vue'

// @ts-ignore
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/pages/login/index.vue'),
    hidden: true,
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'BasicLayout',
    children: [
      {
        path: '/',
        component: () => import('@/pages/home/index.vue'),
        name: 'home',
        hidden: true,
        meta: {
          title: '首页',
          permissions: ['index-message-dclb-xz'],
          icon: 'home',
          affix: true,
          local: true,
          isContent: true,
        },
      },
      {
        path: '/users',
        component: () => import('@/pages/users/index.vue'),
        name: 'users',
        hidden: true,
        meta: {
          title: '用户',
          icon: 'users',
          affix: true,
          local: true,
          isContent: true,
        },
      },
      {
        path: '/404',
        meta: { title: '404', name: '404' },
        component: () => import('@/pages/error-page/404.vue'),
        hidden: true,
      },
    ],
  },
  {
    name: 'Users',
    meta: { title: '用户', icon: 'iconziyuan111' },
    component: Layout,
    path: '/users',
    children: [
      {
        parentId: 'Users',
        name: 'User',
        meta: { title: '用户', name: 'Users', icon: 'iconziyuan111' },
        component: () => import('@/pages/users/index.vue'),
        path: '/users',
      },
      {
        parentId: 'Users',
        name: 'UserDetail',
        meta: { title: '用户详情', name: 'UserDetail', icon: 'iconshujuquanxian' },
        component: () => import('@/pages/users/userDetails/index.vue'),
        path: '/users/userDetails',
      },
    ],
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  // @ts-ignore
  routes: constantRoutes,
})

// console.log(router)
export default router
