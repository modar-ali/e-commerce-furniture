import { helpers } from "@vuelidate/validators"

export const password = helpers.regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)

export const passwordErr =
  "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
