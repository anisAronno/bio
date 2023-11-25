import api from '../api'

export default {
  profile() {
    return api.get(`/api/profile`)
  },
  profileEdit(data) {
    return api.post(`/api/profile-update/${data.username}`, data)
  },
  profilePictureUpload(data, config) {
    return api.post(`/api/profile-picture-upload`, data, config)
  },
  passwordReset(data) {
    return api.post(`/api/password-update/${data.username}`, data)
  }
}
