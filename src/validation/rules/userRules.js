import { email, required } from '@vuelidate/validators'
export const userRules = {
  name: { required },
  email: { required, email },
  username: { required },
  phone: { required }
}
