import { createRouter, createWebHistory } from 'vue-router'

import store from '@/store'
import Dashboard from '@/views/Dashboard.vue'
import Forbidden from '@/views/Forbidden.vue'
import Index from '@/views/Index.vue'
import Login from '@/views/Login.vue'
import PageNotFound from '@/views/PageNotFound.vue'
import PasswordRecover from '@/views/PasswordRecover.vue'
import PasswordReset from '@/views/PasswordReset.vue'
import PasswordUpdate from '@/views/PasswordUpdate.vue'
import Profile from '@/views/Profile.vue'
import ProfileEdit from '@/views/ProfileEdit.vue'
import Signup from '@/views/Signup.vue'
import Unauthorized from '@/views/Unauthorized.vue'
import DashboardLayout from '@/views/layout/DashboardLayout.vue'
import HomeLayout from '@/views/layout/HomeLayout.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      guestOnly: true
    }
  },
  {
    path: '/password-recover',
    name: 'passwordRecover',
    component: PasswordRecover,
    meta: {
      guestOnly: true
    }
  },
  {
    path: '/password-reset',
    name: 'passwordReset',
    component: PasswordReset,
    meta: {
      guestOnly: true
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
    meta: {
      guestOnly: true
    }
  },
  {
    path: '/',
    component: HomeLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: Index
      }
    ]
  },
  {
    path: '/',
    component: DashboardLayout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/profile',
        name: 'profile',
        component: Profile,
        meta: {
          requiresAuth: true
        }
      },

      {
        path: '/profile-edit',
        name: 'profileEdit',
        component: ProfileEdit,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/password-update',
        name: 'passwordUpdate',
        component: PasswordUpdate,
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/unauthorized',
    name: 'unauthorized',
    component: Unauthorized
  },
  {
    path: '/forbidden',
    name: 'forbidden',
    component: Forbidden
  },
  { path: '/:pathMatch(.*)*', component: PageNotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else if (to.matched.some((record) => record.meta.guestOnly)) {
    if (localStorage.getItem('token')) {
      next({ name: 'dashboard' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
