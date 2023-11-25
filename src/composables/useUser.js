import { reactive, ref } from 'vue'
import parseError from '../helper/parseError'
import userService from '../services/userService'

/** -------------------
 * Variable
 * ------------------*/
const userObj = {
  id: '',
  name: '',
  email: '',
  phone: '',
  image: '',
  token: ''
}
const passwordForm = reactive({
  email: '',
  old_password: '',
  password: '',
  password_confirmation: ''
})
const user = ref(userObj)
const err = ref('')
const isSaved = ref(false)

/**--------------------------------------
 * process frontend, Node Server And Appsero Server error
 *
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

/**--------------------
 * Upload profile picture
 * --------------------*/
export async function profilePictureUpload(event) {
  const file = event.target.files[0]

  if (file.name.length == 0) {
    return
  }
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }

  const formData = new FormData()
  formData.append('image', file, 'image')

  return new Promise(async (resolve, reject) => {
    try {
      const response = await userService.profilePictureUpload(formData, config)
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
 * Load User
 * --------------------*/
export async function loadUser() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await userService.profile()
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
 * Edit User
 * --------------------*/
export async function processProfileUpdating(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await userService.profileEdit(data)
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
 * Edit User
 * --------------------*/
export async function processPasswordReset(form) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await userService.passwordReset(form)
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
 * @Export user, Order and
 * Variable Data
 * --------------------------------------*/

export function useUser() {
  return {
    user,
    err,
    isSaved,
    passwordForm
  }
}
