import { required } from '@vuelidate/validators'
export const passwordUpdateRules = {
  email: { required },
  old_password: { required },
  password: { required },
  password_confirmation: { required }
}
