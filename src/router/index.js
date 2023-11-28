import store from '@/store';
import Login from '@/views/auth/Login.vue';
import PasswordRecover from '@/views/auth/PasswordRecover.vue';
import PasswordReset from '@/views/auth/PasswordReset.vue';
import Signup from '@/views/auth/Signup.vue';
import FrontendLayout from '@/views/layout/FrontendLayout.vue';
import HomePageLayout from '@/views/layout/HomePageLayout.vue';
import Forbidden from '@/views/pages/Forbidden.vue';
import PageNotFound from '@/views/pages/PageNotFound.vue';
import Unauthorized from '@/views/pages/Unauthorized.vue';
import About from '@/views/pages/frontend/About.vue';
import Blog from '@/views/pages/frontend/Blog.vue';
import Contact from '@/views/pages/frontend/Contact.vue';
import Education from '@/views/pages/frontend/homepage/Education.vue';
import Experience from '@/views/pages/frontend/homepage/Experience.vue';
import Home from '@/views/pages/frontend/homepage/Home.vue';
import Project from '@/views/pages/frontend/homepage/Project.vue';
import Skill from '@/views/pages/frontend/homepage/Skill.vue';
import Stack from '@/views/pages/frontend/homepage/Stack.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { dashboard } from "./admin";

const routes = [
 
  {
    path: '/',
    component: FrontendLayout,
    children: [
        {
            path: '/home',
            component: HomePageLayout,
            children: [
              {
                path: '/',
                name: 'home',
                component: Home
              }, 
              {
                path: 'experience',
                name: 'experience',
                component: Experience
              },
              {
                path: 'skill',
                name: 'skill',
                component: Skill
              },
              {
                path: 'stack',
                name: 'stack',
                component: Stack
              },
              {
                path: 'project',
                name: 'project',
                component: Project
              },
              {
                path: 'education',
                name: 'education',
                component: Education
              },
            ]
        },
        {
            path: '/about',
            name: 'about',
            component: About, 
        },
        {
            path: '/blog',
            name: 'blog',
            component: Blog, 
        },
        {
            path: '/contact',
            name: 'contact',
            component: Contact, 
        },
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
    ]
  },
  dashboard,
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
