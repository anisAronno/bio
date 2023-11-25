import api from '../api'

export default {
  signUp(data) {
    return api.post(`/api/register`, data)
  },

  login(data) {
    return api.post(`/api/login`, data)
  },

  logout() {
    return api.post(`/api/logout`)
  },

  passwordRecover(data) {
    return api.post(`/api/password-recover`, data)
  },

  passwordReset(data) {
    return api.post(`/api/password-reset`, data)
  }
}
