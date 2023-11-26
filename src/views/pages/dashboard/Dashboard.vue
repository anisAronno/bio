<template>
  <section class="p-5 dark:bg-gray-900 dark:text-white">
    <div>
      <h2>This is Dashboard page</h2>
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
