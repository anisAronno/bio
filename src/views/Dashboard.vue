<template>
  <section class="p-5 dark:bg-gray-900 dark:text-white">
    <div class="dashboard-container grid place-items-center h-full">
      <h1 class="text-red-600 text-2xl my-3">This is dashboard</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sunt fuga reprehenderit qui
        consequuntur quidem blanditiis, hic aspernatur deleniti facere tempora est ipsam minima
        voluptatem similique officiis, tempore, alias vitae.
      </p>
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

<style lang="scss" scoped>
.down::after {
  content: '\2304';
  float: right;
  font-size: 20px;
  font-weight: 500;
}
.up::after {
  content: '\2303';
  float: right;
  font-size: 20px;
  font-weight: 500;
}
</style>
