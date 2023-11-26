<template>
  <section class="p-5 dark:bg-gray-900 h-screen bg-white">
    <div class="min-w-full pt-10 dark:text-white" v-if="user.id">
      <div class="sm:px-6">
        <div class="flex justify-center relative">
          <img
            v-if="user.image"
            :src="user.image"
            :alt="user.name"
            class="avatar w-24 h-24 xl:w-30 xl:h-30"
          />
          <span class="relative">
            <label v-if="!isSaved" class="avatar-upload absolute bottom-1 right-3" for="imageUpload"
              >+</label
            >
            <input
              id="imageUpload"
              type="file"
              class="hidden"
              accept="image/*"
              @change="submitAvatar($event)"
            />
          </span>
          <ImageLoader v-if="isSaved"></ImageLoader>
        </div>
        <h1 class="my-5 flex justify-center items-center h-full heading gap-2">
          <span>Your Account</span>
          <router-link
            class="font-normal text-blue-600"
            :to="{ name: 'profileEdit', params: { userId: user.id } }"
          >
            <EditIcon />
          </router-link>
        </h1>
      </div>
      <div class="min-w-full border-gray-200 flex justify-center !text-left pb-5">
        <dl class="card max-w-2xl">
          <div class="profile-item-light">
            <dt class="profile-label">Name</dt>
            <dd class="profile-description">
              {{ user.name }}
            </dd>
          </div>
          <div class="profile-item">
            <dt class="profile-label">Email</dt>
            <dd class="profile-description">
              {{ user.email }}
            </dd>
          </div>
          <div class="profile-item-light">
            <dt class="profile-label">Username</dt>
            <dd class="profile-description">
              {{ user.username }}
            </dd>
          </div>
          <div class="profile-item">
            <dt class="profile-label">Phone</dt>
            <dd class="profile-description">
              {{ user.phone }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>

<script setup>
import ImageLoader from '@/components/ImageLoader.vue'
import EditIcon from '@/components/EditIcon.vue'
import { loadUser, profilePictureUpload, useUser } from '@/composables/useUser'
import { onMounted } from 'vue'
import { useStore } from 'vuex'

const emit = defineEmits(['loaded', 'toaster'])

const { user, isSaved } = useUser()
const store = useStore()

const userLoaded = async () => {
  try {
    emit('loaded', false)
    await loadUser()
      .then((response) => {
        user.value = response.data.user
        emit('loaded')
      })
      .catch((error) => {
        emit('toaster', error.message || 'Something went wrong!')
      })
  } catch (error) {
    emit('toaster', error.message || 'Something went wrong!')
  }
}

const submitAvatar = async (event) => {
  try {
    isSaved.value = true
    await profilePictureUpload(event)
      .then((response) => {
        user.value = response.data.user
        store.dispatch('updateUser', response.data)
        emit('toaster', 'Updated successfully.')
        isSaved.value = false
      })
      .catch((error) => {
        isSaved.value = false
        emit('toaster', error.message || 'Something went wrong!')
      })
  } catch (error) {
    isSaved.value = false
    emit('toaster', error.message || 'Something went wrong!')
  }
}

onMounted(() => {
  userLoaded()
})
</script>
