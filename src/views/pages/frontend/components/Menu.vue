<script setup>
import DarkMode from '@/components/DarkMode.vue'
import { ref } from 'vue'
import { HomeIcon, BookOpenIcon, EnvelopeIcon } from '@heroicons/vue/24/solid'
const navigations = [
  {
    icon: HomeIcon,
    name: 'Home',
    route: 'home'
  },
  {
    icon: BookOpenIcon,
    name: 'Blog',
    route: 'blog'
  },
  {
    icon: EnvelopeIcon,
    name: 'Contact',
    route: 'contact'
  }
]
const navOpen = ref(false)
</script>
<template>
  <nav
    class="bg-white dark:bg-gray-900 fixed z-20 top-0 left-0 right-0 md:left-64 2xl:left-80 border-b border-gray-100 dark:border-gray-800"
  >
    <div class="flex flex-wrap items-center justify-between mx-auto p-4 md:justify-end md:gap-10">
      <router-link
        :to="{ name: 'home' }"
        class="items-center space-x-3 rtl:space-x-reverse md:hidden"
      >
        <img src="@/assets/me.png" class="h-12 w-12 rounded-full" alt="Logo" />
      </router-link>
      <div class="flex items-center md:order-2 space-x-5 md:space-x-5 rtl:space-x-reverse">
        <DarkMode class="inline-block" />
        <span
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:text-lg"
        >
          <router-link
            v-if="$store.getters.isAuthenticated"
            :to="{ name: 'dashboard' }"
            type="button"
          >
            Dashboard
          </router-link>
          <router-link :to="{ name: 'login' }" v-else type="button">Login </router-link>
        </span>
        <button
          data-collapse-toggle="navbar-sticky"
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-sticky"
          aria-expanded="false"
          @click="navOpen = !navOpen"
        >
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
      <div
        class="items-center justify-between w-full md:flex md:w-auto md:order-1"
        id="navbar-sticky"
        :class="{ hidden: !navOpen }"
      >
        <ul
          class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
        >
          <li v-for="navigation in navigations" :key="navigation.route">
            <router-link
              :to="{ name: navigation.route }"
              class="py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent text-md 2xl:text-lg flex gap-1 items-center"
              :class="{
                ' py-2 px-3 text-gray-900 bg-blue-700  md:bg-transparent md:text-blue-700 md:p-0 md:pb-1 md:dark:text-blue-500  border-b-2   border-blue-600 dark:border-blue-600 ':
                  $route.name == navigation.route
              }"
              aria-current="page"
            >
              <component :is="navigation.icon" class="w-5 h-5"></component>
              {{ navigation.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
