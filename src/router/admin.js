import DashboardLayout from '@/views/layout/DashboardLayout.vue'
import Blogs from '@/views/pages/dashboard/Blogs.vue'
import Contacts from '@/views/pages/dashboard/Contacts.vue'
import Dashboard from '@/views/pages/dashboard/Dashboard.vue'
import PasswordUpdate from '@/views/pages/dashboard/PasswordUpdate.vue'
import Profile from '@/views/pages/dashboard/Profile.vue'
import ProfileEdit from '@/views/pages/dashboard/ProfileEdit.vue'
import Settings from '@/views/pages/dashboard/Settings.vue'


export const dashboard = {
    path: '/dashboard',
    component: DashboardLayout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '', 
        name: 'dashboard',
        component: Dashboard,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'profile',
        name: 'profile',
        component: Profile,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'profile-edit',
        name: 'profileEdit',
        component: ProfileEdit,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'password-update',
        name: 'passwordUpdate',
        component: PasswordUpdate,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'blog',
        name: 'adminBlog',
        component: Blogs,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'contact',
        name: 'adminContact',
        component: Contacts,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'settings',
        name: 'adminSettings',
        component: Settings,
        meta: {
          requiresAuth: true
        }
      }
    ]
  }
  