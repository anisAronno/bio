<template>
  <div class="grid h-screen place-items-center dark:bg-gray-900">
    <div class="card max-w-md">
      <div class="w-full grid h-full place-items-center">
        <User class="avatar p-3 w-32"></User>
      </div>
      <form class="space-y-6 mt-5" @submit.prevent="passwordRecover">
        <h5 class="heading">Create New Password</h5>
        <div>
          <label for="email" class="label">Your email</label>
          <input
            type="email"
            name="email"
            id="email"
            class="form-controll"
            placeholder="name@company.com"
            v-model="passwordResetForm.email"
            :class="{
              'border-red': err?.email
            }"
          />
          <div class="error" v-if="err?.email">
            <p v-for="(err, i) in err.email" :key="i">
              {{ err }}
            </p>
          </div>
        </div>
        <div>
          <label for="password" class="label">Your password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            class="form-controll"
            v-model="passwordResetForm.password"
            :class="{
              '!border-red': err?.password
            }"
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
            v-model="passwordResetForm.password_confirmation"
            :class="{
              '!border-red': err?.password_confirmation
            }"
          />
          <div class="error" v-if="err?.password_confirmation">
            <p v-for="(err, i) in err.password_confirmation" :key="i">
              {{ err }}
            </p>
          </div>
        </div>

        <button type="submit" class="btn btn-primary">
          <span v-if="!isSaved"> Recover your password</span>
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
import ButtonSpiner from '@/components/ButtonSpiner.vue'
import User from '@/components/User.vue'
import { processError, processPasswordReset, useAuth } from '@/composables/useAuth'
import { passwordRecoverRules } from '@/validation/rules/passwordRecoverRules'
import useVuelidate from '@vuelidate/core'
import { onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const { err, isSaved, passwordResetForm } = useAuth()

const emit = defineEmits(['loaded', 'toaster'])
const route = useRoute()
const router = useRouter()
const { token } = route.query
passwordResetForm.token = token
let v$ = useVuelidate(passwordRecoverRules, passwordResetForm)

const passwordRecover = async () => {
  let isValidate = await v$.value.$validate()

  if (!isValidate) {
    emit('toaster', processError(v$))
    return
  }

  try {
    isSaved.value = true
    await processPasswordReset(passwordResetForm)
      .then((response) => {
        emit('passwordResetForm', response?.data?.message || 'Password Reset Successfully')
        isSaved.value = false
        router.push({ name: 'login' })
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
