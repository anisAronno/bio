<template>
  <section class="p-5 dark:bg-gray-900 h-screen">
    <div class="grid place-items-center pt-10">
      <div class="card relative max-w-md">
        <div class="absolute right-1 top-0 text-dark dark:text-white">
          <span @click="$emit('back')" class="back-btn">&#8592;</span>
        </div>
        <form class="space-y-6 mt-5" @submit.prevent="updatePassword">
          <h5 class="heading">Reset your password</h5>
          <div>
            <label for="old_password" class="label">Your Old Password</label>
            <input
              type="password"
              name="old_password"
              id="old_password"
              class="form-controll"
              placeholder="••••••••"
              v-model="passwordForm.old_password"
              :class="{ 'border-red': err?.old_password }"
            />
            <div class="error" v-if="err?.old_password">
              <p v-for="(err, i) in err.old_password" :key="i">
                {{ err }}
              </p>
            </div>
          </div>
          <div>
            <label for="password" class="label">New Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              class="form-controll"
              v-model="passwordForm.password"
              :class="{ 'border-red': err?.password }"
            />
            <div class="error" v-if="err?.password">
              <p v-for="(err, i) in err.password" :key="i">
                {{ err }}
              </p>
            </div>
          </div>
          <div>
            <label for="password" class="label">Confirm password</label>
            <input
              type="password"
              name="password_confirmation"
              id="password_confirmation"
              placeholder="••••••••"
              class="form-controll"
              v-model="passwordForm.password_confirmation"
              :class="{
                'border-red': err?.password_confirmation
              }"
            />
            <div class="error" v-if="err?.password_confirmation">
              <p v-for="(err, i) in err.password_confirmation" :key="i">
                {{ err }}
              </p>
            </div>
          </div>

          <button type="submit" class="btn btn-primary">
            <span v-if="!isSaved">Reset your password</span>
            <ButtonSpiner v-else>Processing... </ButtonSpiner>
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import ButtonSpiner from '@/components/ButtonSpiner.vue'
import { passwordUpdateRules } from '@/validation/rules/passwordUpdateRules'
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

import { processError, processPasswordReset, useUser } from '@/composables/useUser'
import useVuelidate from '@vuelidate/core'
import { useStore } from 'vuex'

const emit = defineEmits(['loaded', 'toaster'])
const router = useRouter()
const store = useStore()
const { err, isSaved, passwordForm } = useUser()

passwordForm.email = store.getters.user?.email
passwordForm.username = store.getters.user?.username

let v$ = useVuelidate(passwordUpdateRules, passwordForm)

const updatePassword = async () => {
  let isValidate = await v$.value.$validate()
  if (!isValidate) {
    emit('toaster', processError(v$))
    return
  }
  try {
    isSaved.value = true
    await processPasswordReset(passwordForm)
      .then((response) => {
        emit('toaster', 'Password Reset Successfully')
        store.dispatch('login', response.data)
        router.push({ name: 'dashboard' })
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
  emit('loaded')
})

onUnmounted(() => {
  passwordForm.old_password = ''
  passwordForm.password = ''
  passwordForm.password_confirmation = ''
  err.value = {}
})
</script>
