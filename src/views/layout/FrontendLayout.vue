<template>
  <section class="dark:bg-gray-900 dark:text-white bg-white text-gray-900 min-h-screen">
    <div class="flex flex-wrap min-h-screen gap-0.2">
      <div
        class="flex-none w-64 2xl:w-80 hidden md:block sm:translate-x-0"
        :class="{ 'transition-transform -translate-x-full ': !sidebarOpen }"
      >
        <Sidebar @closeSidebar="sidebarOpen = false" />
      </div>
      <div class="flex-auto grow">
        <div class="h-16 py-1">
          <Menu />
        </div>
        <div class="p-4 rounded-lg dark:border-gray-700 m-5 mt-10" aria-label="content-area">
          <router-view @loaded="loaded"></router-view>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Menu from '@/views/pages/frontend/components/Menu.vue'
import Sidebar from '@/views/pages/frontend/components/Sidebar.vue'
const emit = defineEmits(['loaded', 'toaster'])
const sidebarOpen = ref(false)

onMounted(() => {
  emit('loaded')
})
</script>
