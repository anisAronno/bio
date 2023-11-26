<template>
  <div class="grid place-items-center dark:bg-gray-900 mt-2">
    <div class="card !px-10">
      <div class="w-full grid h-full place-items-center mb-5">
        <User class="avatar p-3 w-32"></User>
      </div>
      <form class="space-y-6 mt-5" @submit.prevent="register">
        <h5 class="heading md:text-2xl">Create a new Account</h5>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label for="email" class="label">Your Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              class="form-controll"
              :class="{ 'border-red': err?.name }"
              placeholder="name@company.com"
              v-model="signupForm.name"
            />
            <div class="error" v-if="err?.name">
              <p v-for="(err, i) in err.name" :key="i">
                {{ err }}
              </p>
            </div>
          </div>
          <div>
            <label for="email" class="label">Your email:</label>
            <input
              type="email"
              name="email"
              id="email"
              class="form-controll"
              :class="{ 'border-red': err?.email }"
              placeholder="name@company.com"
              v-model="signupForm.email"
            />
            <div class="error" v-if="err?.email">
              <p v-for="(err, i) in err.email" :key="i">
                {{ err }}
              </p>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label for="username" class="label">Your username:</label>
            <input
              type="text"
              name="username"
              id="username"
              class="form-controll"
              :class="{ 'border-red': err?.username }"
              placeholder="name@company.com"
              v-model="signupForm.username"
            />
            <div class="error" v-if="err?.username">
              <p v-for="(err, i) in err.username" :key="i">
                {{ err }}
              </p>
            </div>
          </div>
          <div>
            <label for="phone" class="label">Your Phone:</label>
            <input
              type="text"
              name="phone"
              id="phone"
              class="form-controll"
              :class="{ 'border-red': err?.phone }"
              placeholder="name@company.com"
              v-model="signupForm.phone"
            />
            <div class="error" v-if="err?.phone">
              <p v-for="(err, i) in err.phone" :key="i">
                {{ err }}
              </p>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label for="password" class="label">Your password: </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              class="form-controll"
              v-model="signupForm.password"
              :class="{ 'border-red': err?.password }"
            />
            <div class="error" v-if="err?.password">
              <p v-for="(err, i) in err.password" :key="i">
                {{ err }}
              </p>
            </div>
          </div>

          <div>
            <label for="confirm_password" class="dark:text-white text-gray-900"
              >Confirm Password</label
            >
            <input
              type="password"
              name="password_confirmation"
              id="password_confirmation"
              v-model="signupForm.password_confirmation"
              placeholder="••••••••"
              class="form-controll"
              :class="{ 'border-red': err?.password_confirmation }"
            />
            <div class="error" v-if="err?.password_confirmation">
              <p v-for="(err, i) in err.password_confirmation" :key="i" class="break-all">
                {{ err }}
              </p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <span class="inline-block mr-2 dark:text-white text-gray-900">Have a account?</span>
            <router-link :to="{ name: 'login' }" class="login-link !text-lg">Login</router-link>
          </div>
          <div>
            <button type="submit" class="btn btn-primary">
              <span v-if="!isSaved">Create account</span>
              <ButtonSpiner v-else>Processing... </ButtonSpiner>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import useVuelidate from '@vuelidate/core'
import { inject, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import ButtonSpiner from '../../components/ButtonSpiner.vue'
import { processError, processSignup, useAuth } from '../../composables/useAuth'
import { signupRules } from '../../validation/rules/signupRules'
import { useStore } from 'vuex'
import User from '@/components/User.vue'

const { err, isSaved, signupForm } = useAuth()
const swal = inject('$swal')
const router = useRouter()
const store = useStore()

const emit = defineEmits(['loaded', 'toaster'])

let v$ = useVuelidate(signupRules, signupForm)

const register = async () => {
  let isValidate = await v$.value.$validate()

  if (!isValidate) {
    swal.fire({
      title: processError(v$)
    })
    return
  }

  try {
    isSaved.value = true

    processSignup(signupForm)
      .then((response) => {
        if (response.status == 200) {
          store.dispatch('login', response.data)
          emit('toaster', 'Account created succefully.')
          router.push({ name: 'dashboard' })
        } else {
          emit('toaster', 'Something went Wrong!')
        }
      })
      .catch((error) => {
        swal.fire({
          title: processError(error)
        })
      })
  } catch (error) {
    swal.fire({
      title: processError(error)
    })
  }
}
onMounted(() => {
  emit('loaded')
})

onUnmounted(() => {
  err.value = {}
})
</script>
