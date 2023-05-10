import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import Layout from '../layout/index.vue'
import {User} from '@element-plus/icons-vue'
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404.vue'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard', // redirect second level route
    children: [{ // second level route
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index.vue'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Link',
        component: () => import('@/views/form/index.vue'),
        meta: { title: 'shareLink', icon: 'form' }
      }
    ]
  },

  {
    path: '/baidu',
    component: Layout,
    redirect: '/baidu/download',
    name: 'Baidu',
    children: [
      {
        path: 'download',
        name: 'BaiduDownload',
        component: () => import('@/views/download/index.vue'),
        meta: { title: 'download', icon: 'tree' }
      }
    ]
  },

  {
    path: '/github',
    component: Layout,
    children: [
      {
        path: 'https://github.com/WenyaoL/pandown-java',
        meta: { title: 'github', icon: 'link' }
      }
    ]
  },

  {
    path: '/setting',
    component: Layout,
    redirect: '/setting/accountSetting',
    meta: { title: 'example', icon: 'setting' },
    children: [
      {
        path:'accountSetting',
        component: () => import('@/views/setting/AccountSetting.vue'),
        meta: { title: 'account', icon: 'user'}
      },
      {
        path:'systemSetting',
        component: () => import('@/views/setting/SystemSetting.vue'),
        meta: { title: 'account', icon: 'setting' }
      },
    ]
  },


  // 404 page must be placed at the end !!!
  { path: '/:catchAll(.*)', redirect: '/404', hidden: true }
]
///:catchAll(.*)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes as any
})





NProgress.configure({ showSpinner: false }) // NProgress Configuration
const whiteList = ['/login'] // no redirect whitelist
router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title as any)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      next()
      NProgress.done()
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})



export function resetRouter() {
  // @ts-ignore
  const newRouter = createRouter()
  // @ts-ignore
  router.matcher = newRouter.matcher // reset router
}

export default router
