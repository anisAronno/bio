import { email, required } from '@vuelidate/validators'
export const passwordRecoverRules = {
  email: { required, email }
}
