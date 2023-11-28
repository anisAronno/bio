<script setup>
import {
  HomeIcon,
  AcademicCapIcon,
  CogIcon,
  BriefcaseIcon,
  Square3Stack3DIcon,
  ArrowTrendingUpIcon
} from '@heroicons/vue/24/solid'

const navigations = [
  {
    icon: HomeIcon,
    route: 'home',
    name: 'Home'
  },
  {
    icon: BriefcaseIcon,
    route: 'experience',
    name: 'Experience'
  },
  {
    icon: CogIcon,
    route: 'skill',
    name: 'Skill'
  },
  {
    icon: Square3Stack3DIcon,
    route: 'stack',
    name: 'Stack'
  },
  {
    icon: ArrowTrendingUpIcon,
    route: 'project',
    name: 'Project'
  },
  {
    icon: AcademicCapIcon,
    route: 'education',
    name: 'Education'
  }
]
</script>

<template>
  <aside
    id="default-sidebar"
    class="fixed top-0 left-0 z-40 w-48 md:w-64 2xl:w-80 h-screen sm:translate-x-0 border-r-2 border-[#f2f9f9] dark:border-[#191616] shadow-sm"
    aria-label="Sidebar"
  >
    <div class="relative transition-transform sm:-translate-x-full translate-x-0">
      <button
        type="button"
        data-drawer-hide="drawer-navigation"
        aria-controls="drawer-navigation"
        class="text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:text-white"
        @click="$emit('closeSidebar')"
      >
        <svg
          aria-hidden="true"
          class="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span class="sr-only">Close menu</span>
      </button>
    </div>
    <div class="h-full px-3 py-4 overflow-y-auto bg-white dark:bg-gray-900">
      <div class="mt-3 xl:mt-4 2xl:mt-5 mb-5 xl:mb-7 grid place-items-center">
        <router-link :to="{ name: 'home' }">
          <img
            src="@/assets/me.png"
            alt="me"
            class="w-32 md:w-40 h-auto rounded-full shadow-md dark:shadow-gray-500 ring-2 ring-blue-300 ring-offset-1"
          />
        </router-link>
      </div>

      <nav>
        <ul class="space-y-2">
          <li v-for="navigation in navigations" :key="navigation.route">
            <router-link
              :to="{ name: navigation.route }"
              class="flex items-center p-2 text-gray-900 dark:text-white group"
              :class="{
                'text-gray-900 bg-blue-700  md:bg-transparent md:text-blue-700 md:dark:text-blue-500 underline underline-offset-4 border-blue-600 dark:border-blue-600 ':
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
