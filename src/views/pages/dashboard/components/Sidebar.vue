<script setup>
import { HomeIcon, BookOpenIcon, EnvelopeIcon } from '@heroicons/vue/24/solid'
const navigations = [
  {
    icon: HomeIcon,
    name: 'Dashboard',
    route: 'dashboard'
  },
  {
    icon: BookOpenIcon,
    name: 'Blog',
    route: 'adminBlog'
  },
  {
    icon: EnvelopeIcon,
    name: 'Contact',
    route: 'adminContact'
  },
  {
    icon: EnvelopeIcon,
    name: 'Settings',
    route: 'adminSettings'
  }
]
</script>

<template>
  <aside
    id="default-sidebar"
    class="fixed md:top-0 left-0 z-30 w-60 md:w-64 2xl:w-80 h-screen sm:translate-x-0 border-r-2 border-gray-50 dark:border-gray-800"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 py-4 overflow-y-auto bg-white dark:bg-gray-900">
      <nav>
        <ul class="space-y-2">
          <li v-for="navigation in navigations" :key="navigation.route">
            <router-link
              :to="{ name: navigation.route }"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group"
              :class="{
                ' text-gray-900 rounded bg-gray-100 dark:bg-gray-800 md:text-gray-900  md:dark:text-800-500':
                  $route.name == navigation.route
              }"
            >
              <component :is="navigation.icon" class="w-6 h-6"></component>
              <span class="ms-3 !text-sm">{{ navigation.name }}</span>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>
