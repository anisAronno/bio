<template>
  <div class="grid place-items-center dark:bg-gray-900">
    <div class="card max-w-sm">
      <div class="w-full grid h-full place-items-center">
        <User class="avatar p-3 w-32"></User>
      </div>
      <form class="space-y-6 pt-5" @submit.prevent="submitForm">
        <h5 class="heading">Recover Your Password</h5>
        <div>
          <label for="email" class="label">Your email</label>
          <input
            type="email"
            name="email"
            id="email"
            class="form-controll"
            placeholder="name@company.com"
            v-model="passwordRecoverForm.email"
            :class="{ '!border-2 !border-rose-500': err?.email }"
          />
          <div class="text-red-500" v-if="err?.email">
            <p v-for="(err, i) in err.email" :key="i">
              {{ err }}
            </p>
          </div>
        </div>

        <button type="submit" class="btn btn-primary">
          <span v-if="!isSaved">Submit</span>
          <ButtonSpiner v-else>Processing... </ButtonSpiner>
        </button>

        <div class="flex items-start">
          <router-link :to="{ name: 'login' }" class="login-link">Login</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import useVuelidate from '@vuelidate/core'
import { onMounted, onUnmounted } from 'vue'
import ButtonSpiner from '../../components/ButtonSpiner.vue'
import User from '@/components/User.vue'
import { processError, processPasswordRecover, useAuth } from '../../composables/useAuth'
import { passwordRecoverRules } from '../../validation/rules/passwordRecoverRules'

const emit = defineEmits(['loaded', 'toaster'])
const { err, isSaved, passwordRecoverForm } = useAuth()

let v$ = useVuelidate(passwordRecoverRules, passwordRecoverForm)

const submitForm = async () => {
  let isValidate = await v$.value.$validate()
  if (!isValidate) {
    emit('toaster', processError(v$))
    return
  }
  try {
    isSaved.value = true
    await processPasswordRecover(passwordRecoverForm)
      .then((response) => {
        emit('toaster', response?.data?.message)
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
  err.value = {}
})
</script>
