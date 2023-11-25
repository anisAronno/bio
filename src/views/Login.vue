<template>
  <div class="grid min-h-screen max-h-full place-items-center dark:bg-gray-900">
    <div class="card max-w-md">
      <div class="w-full grid h-full place-items-center">
        <User class="avatar p-3 w-32"></User>
      </div>
      <form class="space-y-6 mt-5" @submit.prevent="login">
        <h5 class="heading">Login to Your Account</h5>
        <div>
          <label for="email" class="label">Your email:</label>
          <input
            type="text"
            name="email"
            id="email"
            class="form-controll"
            :class="{ 'border-red': err?.email }"
            placeholder="name@company.com"
            v-model="loginForm.email"
          />
          <div class="error" v-if="err?.email">
            <p v-for="(err, i) in err.email" :key="i">
              {{ err }}
            </p>
          </div>
        </div>
        <div>
          <label for="password" class="label">Your password: </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            class="form-controll"
            v-model="loginForm.password"
            :class="{ 'border-red': err?.password }"
          />
          <div class="error" v-if="err?.password">
            <p v-for="(err, i) in err.password" :key="i">
              {{ err }}
            </p>
          </div>
        </div>
        <div class="flex items-start">
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                v-model="loginForm.remember_me"
                class="form-controll"
              />
            </div>
            <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Remember me</label
            >
          </div>
          <router-link :to="{ name: 'passwordRecover' }" class="login-link"
            >Lost Password?</router-link
          >
        </div>
        <button type="submit" class="btn btn-primary">
          <span v-if="!isSaved">Login to your account</span>
          <ButtonSpiner v-else>Processing... </ButtonSpiner>
        </button>
        <div>
          <span class="inline-block mr-2 dark:text-white text-gray-900">Need an account?</span>
          <router-link :to="{ name: 'signup' }" class="login-link !text-lg">Signup</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import ButtonSpiner from '@/components/ButtonSpiner.vue'
import User from '@/components/User.vue'
import { processError, processLogin, useAuth } from '@/composables/useAuth'
import { loginRules } from '@/validation/rules/loginRules'
import useVuelidate from '@vuelidate/core'
import { onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

const { loginForm, err, isSaved } = useAuth()
const router = useRouter()
const route = useRoute()
const emit = defineEmits(['loaded', 'toaster'])
const store = useStore()

let v$ = useVuelidate(loginRules, loginForm)

const login = async () => {
  let isValidate = await v$.value.$validate()
  if (!isValidate) {
    emit('toaster', processError(v$))
    return
  }
  try {
    isSaved.value = true
    await processLogin(loginForm)
      .then((response) => {
        if (response.status == 200) {
          isSaved.value = false
          store.dispatch('login', response.data)
          if (route.query.redirect && route.query.redirect != '/logout') {
            emit('toaster', 'Logged in Successfully!')
            router.push({ path: route.query.redirect })
          } else {
            emit('toaster', 'Logged in Successfully!')
            router.push({ name: 'dashboard' })
          }
        } else {
          emit('toaster', 'Wrong Credential!')
        }
      })
      .catch((error) => {
        emit('toaster', processError(error))
      })
      .finally(() => {
        isSaved.value = false
        router.push({ name: 'dashboard' })
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
