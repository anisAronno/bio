<template>
  <div class="flex justify-between gap-3 h-8">
    <div class="logo flex-auto">
      <router-link :to="{ name: 'dashboard' }"
        ><img class="w-14 h-14" src="@/assets/logo.png" alt="Logo"
      /></router-link>
    </div>
    <div class="flex-none">
      <DarkMode></DarkMode>
    </div>
    <div class="flex-none">
      <div
        class="cursor-pointer relative duration-500 hover:scale-105"
        @click="toggleDropdown"
        id="toggleContainer"
        ref="toggleContainer"
      >
        <img
          :src="$store.getters.user?.image"
          alt="Logo"
          class="w-8 h-8 rounded-full ring-1 ring-[#7CA2FF] ring-offset-2"
        />
      </div>
      <div
        :class="{ hidden: !isToggleOpen }"
        class="relative"
        v-if="$store.getters.isAuthenticated"
      >
        <ul class="absolute right-0 top-30 w-32 text-right space-y-2 pt-3 dark:text-white">
          <li class="duration-500 hover:scale-105">
            <router-link :to="{ name: 'profile' }">Account</router-link>
          </li>
          <li class="duration-500 hover:scale-105">
            <router-link :to="{ name: 'passwordUpdate' }">Password Reset</router-link>
          </li>
          <li
            @click.prevent="logout"
            class="cursor-pointer text-red-500 duration-500 hover:scale-105"
          >
            Logout
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineEmits } from 'vue'
import DarkMode from './DarkMode.vue'
import { useRouter } from 'vue-router'
import { processLogout, useAuth } from '@/composables/useAuth'
import { useStore } from 'vuex'

const emit = defineEmits('loaded', 'toaster')
const router = useRouter()
const { isSaved } = useAuth()

const isToggleOpen = ref(false)
const toggleContainer = ref(null)
const store = useStore()

const logout = () => {
  isSaved.value = true
  processLogout()
    .then(() => {
      isSaved.value = false
      store.dispatch('logout')
      emit('toaster', 'Logout successfully.')
      router.push({ name: 'login' })
    })
    .catch((error) => {
      emit('toaster', error?.message ?? 'Something went wrong!!')
    })
}
const toggleDropdown = () => {
  isToggleOpen.value = !isToggleOpen.value
}

const handleClickOutside = (event) => {
  if (
    isToggleOpen.value &&
    toggleContainer.value &&
    !toggleContainer.value.contains(event.target)
  ) {
    isToggleOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
