<template>
  <section class="dark:bg-gray-900 dark:text-white bg-white text-gray-900 min-h-screen">
    <div class="min-h-screen gap-0.2">
      <div class="h-16 py-1 !min-w-full">
        <Menu @closeSidebar="sidebarOpen = !sidebarOpen" :sidebarOpen="sidebarOpen" />
      </div>
      <div class="flex">
        <div
          class="flex-none md:w-64 2xl:w-80 md:block sm:translate-x-0 mt-5"
          :class="{ 'transition-transform -translate-x-full hidden': !sidebarOpen }"
        >
          <Sidebar />
        </div>
        <div
          class="p-4 flex-1 grow rounded-lg dark:border-gray-700 m-5 mt-10"
          aria-label="content-area"
        >
          <router-view @loaded="loaded"></router-view>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Menu from '@/views/pages/dashboard/components/Menu.vue'
import Sidebar from '@/views/pages/dashboard/components/Sidebar.vue'
const emit = defineEmits(['loaded', 'toaster'])
const sidebarOpen = ref(false)

onMounted(() => {
  emit('loaded')
})
</script>
