<template>
  <section>
    <router-view @loaded="loaded"></router-view>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
const emit = defineEmits(['loaded', 'toaster'])

onMounted(() => {
  emit('loaded')
})
</script>
