<template>
  <section class="p-5 dark:bg-gray-900 h-full">
    <div class="grid place-items-center pt-5 dark:text-white" v-if="user.id">
      <div class="card max-w-2xl relative">
        <div class="absolute right-1 top-0 text-dark dark:text-white">
          <span @click="$emit('back')" class="back-btn">&#8592;</span>
        </div>
        <h2 class="heading">
          <span class="mr-2">Edit Account Information </span>
        </h2>
        <div class="pt-5">
          <form @submit.prevent="profileSubmit" class="overflow-hidden">
            <table class="table-auto min-w-full">
              <tbody>
                <tr class="border-y">
                  <td class="profile-edit-label">Name</td>
                  <td class="profile-edit-label">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      v-model="user.name"
                      :class="{ 'border-red': err.name }"
                      class="form-controll"
                    />
                    <div class="error" v-if="err.name">
                      <p v-for="(err, i) in err.name" :key="i">
                        {{ err }}
                      </p>
                    </div>
                  </td>
                </tr>
                <tr class="border-b">
                  <td class="profile-edit-label">Email</td>
                  <td class="profile-edit-label">
                    <input
                      readonly
                      type="text"
                      name="email"
                      id="email"
                      :value="user.email"
                      :class="{ 'border-red': err.email }"
                      class="form-controll"
                    />
                  </td>
                </tr>

                <tr class="border-b">
                  <td class="profile-edit-label">Username</td>
                  <td class="profile-edit-label">
                    <input
                      type="text"
                      name="username"
                      id="username"
                      v-model="user.username"
                      :class="{ 'border-red': err.username }"
                      class="form-controll"
                    />
                    <div class="error" v-if="err.username">
                      <p v-for="(err, i) in err.username" :key="i">
                        {{ err }}
                      </p>
                    </div>
                  </td>
                </tr>
                <tr class="border-b">
                  <td class="profile-edit-label">Phone</td>
                  <td class="profile-edit-label">
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      v-model="user.phone"
                      :class="{ 'border-red': err.phone }"
                      class="form-controll"
                    />
                    <div class="error" v-if="err.phone">
                      <p v-for="(err, i) in err.phone" :key="i">
                        {{ err }}
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td class="profile-edit-label !pb-0 !pt-5" colspan="2">
                    <button type="submit" class="btn btn-primary">
                      <span v-if="!isSaved">Update Profile</span>
                      <ButtonSpiner v-else>Processing... </ButtonSpiner>
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import ButtonSpiner from '@/components/ButtonSpiner.vue'
import { loadUser, processError, processProfileUpdating, useUser } from '@/composables/useUser'
import { userRules } from '@/validation/rules/userRules'
import useVuelidate from '@vuelidate/core'
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const emit = defineEmits(['loaded', 'toaster'])
const router = useRouter()

const { user, err, isSaved } = useUser()

let v$ = useVuelidate(userRules, user)

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

const profileSubmit = async () => {
  let isValidate = await v$.value.$validate()
  if (!isValidate) {
    emit('toaster', processError(v$))
    return
  }
  try {
    isSaved.value = true
    await processProfileUpdating(user.value)
      .then((response) => {
        user.value = response.data.user
        router.push({ name: 'profile' })
        emit('toaster', 'Profile updated successfully')
        isSaved.value = false
      })
      .catch((error) => {
        emit('toaster', processError(error))
      })
  } catch (error) {
    emit('toaster', processError(error))
  }
}

onMounted(() => {
  userLoaded()
})

onUnmounted(() => {
  err.value = {}
})
</script>
