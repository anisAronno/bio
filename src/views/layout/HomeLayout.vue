<template>
  <section class="p-5 dark:bg-gray-900 dark:text-white bg-white text-gray-900 min-h-screen">
    <div class="grid grid-cols-6">
      <div class="content-area col-span-6">
        <router-view @back="back" @loaded="loaded"></router-view>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'

const emit = defineEmits(['loaded', 'toaster'])

onMounted(() => {
  emit('loaded')
})
</script>
