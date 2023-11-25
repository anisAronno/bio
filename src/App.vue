<template>
  <div>
    <div
      class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-900 opacity-75 flex flex-col items-center justify-center"
      v-if="!isLoaded"
    >
      <span class="w-10 h-10">
        <Loader></Loader>
      </span>
    </div>
    <router-view @loaded="loaded" @back="back" @toaster="toaster" class="font-sans"></router-view>
  </div>
</template>

<script setup>
import Loader from '@/components/Loader.vue'
import { inject, ref } from 'vue'
import { useRouter } from 'vue-router'

const swal = inject('$swal')

const isLoaded = ref(false)
const router = useRouter()
function loaded(data = true) {
  isLoaded.value = data
}

function back() {
  router.back()
}

function toaster(title = '', message = '', footer = '') {
  loaded()
  swal.fire({
    title: title,
    text: message,
    footer: footer
  })
}
</script>
