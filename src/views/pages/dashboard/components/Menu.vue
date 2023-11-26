<script setup>
import DarkMode from '@/components/DarkMode.vue'
import Hide from '@/components/icons/Hide.vue'
import Collapse from '@/components/icons/Collapse.vue'
import { ref, onMounted, onUnmounted, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
import { processLogout, useAuth } from '@/composables/useAuth'
import { useStore } from 'vuex'

const emit = defineEmits('loaded', 'toaster')
const router = useRouter()
const { isSaved } = useAuth()

const isToggleOpen = ref(false)
const toggleContainer = ref(null)
const store = useStore()
const props = defineProps({
  sidebarOpen: {
    type: Boolean,
    required: false,
    default: false
  }
})
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
      store.dispatch('logout')
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
<template>
  <nav
    class="flex items-center justify-between bg-white dark:bg-gray-900 fixed z-40 top-0 left-0 border-b border-gray-100 dark:border-gray-800 w-full p-4"
  >
    <div class="items-center space-x-3 flex gap-3">
      <router-link :to="{ name: 'dashboard' }">
        <img src="@/assets/logo.png" class="h-12 w-12 rounded-full" alt="Logo" />
      </router-link>
      <div class="md:hidden">
        <Collapse
          v-if="props.sidebarOpen !== true"
          class="w-6 h-6 cursor-pointer text-gray-900 dark:text-white"
          @click="$emit('closeSidebar')"
        />
        <Hide
          v-else
          class="w-6 h-6 cursor-pointer text-gray-900 dark:text-white"
          @click="$emit('closeSidebar')"
        />
      </div>
    </div>

    <div class="flex items-center space-x-5 md:space-x-5">
      <DarkMode class="inline-block" />
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
          class="relative z-50"
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
  </nav>
</template>
