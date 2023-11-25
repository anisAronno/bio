<template>
  <section class="p-5 dark:bg-gray-900 dark:text-white bg-white text-gray-900 min-h-screen">
    <Header class="h-16 mb-2"></Header>

    <div class="grid grid-cols-6 md:grid-cols-7">
      <div class="sidebar-area md:col-span-2">
        <!-- left sidebar  -->
      </div>
      <div class="content-area col-span-6 md:col-span-3">
        <router-view @back="back" @loaded="loaded"></router-view>
      </div>
      <div class="sidebar-area md:col-span-2">
        <!-- right sidebar  -->
      </div>
    </div>
  </section>
</template>

<script setup>
import Header from '@/components/Header.vue'

import { onMounted } from 'vue'

const emit = defineEmits(['loaded'])

onMounted(() => {
  emit('loaded')
})
</script>
