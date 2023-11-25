import { reactive, ref } from 'vue'
import api from '../api'
import parseError from '../helper/parseError'
import authService from '../services/authService'
/** -------------------
 * Variable
 * ------------------*/

const loginForm = reactive({
  email: '',
  password: ''
})

const signupForm = reactive({
  name: '',
  email: '',
  username: '',
  password: '',
  password_confirmation: ''
})

const passwordRecoverForm = reactive({
  email: ''
})

const passwordResetForm = reactive({
  token: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const err = ref('')
const isSaved = ref(false)

/**--------------------
 * Sign up form
 * --------------------*/
export async function processSignup(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await authService.signUp(data)
      if (response.status == 200) {
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
        resolve(response)
      } else {
        reject(response.message)
      }
    } catch (e) {
      reject(e)
    }
  })
}

/**--------------------
 * Login form
 * --------------------*/
export async function processLogin(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await authService.login(data)
      if (response.status == 200) {
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
        resolve(response)
      } else {
        reject(response)
      }
    } catch (e) {
      reject(e)
    }
  })
}
/**--------------------
 * Login form
 * --------------------*/
export async function processLogout() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await authService.logout()
      if (response.status == 200) {
        resolve(response)
      } else {
        reject(response)
      }
    } catch (e) {
      reject(e)
    }
  })
}

/**--------------------
 * Process Password Recover
 * --------------------*/
export async function processPasswordRecover(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await authService.passwordRecover(data)
      if (response.status == 200) {
        resolve(response)
      } else {
        reject(response)
      }
    } catch (e) {
      reject(e)
    }
  })
}

/**--------------------
 * Password Reset
 * --------------------*/
export async function processPasswordReset(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await authService.passwordReset(data)
      if (response.status == 200) {
        resolve(response)
      } else {
        reject(response)
      }
    } catch (e) {
      reject(e)
    }
  })
}

/**--------------------------------------
 * process frontend, Node Server And Appsero Server error
 * --------------------------------------*/

export function processError(error) {
  try {
    err.value = parseError(error)
    isSaved.value = false
    return error?.response?.data
      ? error?.response?.data?.message
      : error?.message ?? 'The given data was invalid!'
  } catch (error) {
    isSaved.value = false
    return error.message
  }
}

/**--------------------------------------
 * @Export User
 * Variable Data
 * --------------------------------------*/

export function useAuth() {
  return {
    err,
    isSaved,
    loginForm,
    passwordRecoverForm,
    passwordResetForm,
    signupForm
  }
}
