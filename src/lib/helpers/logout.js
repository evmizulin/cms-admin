import { auth } from 'src/lib/services/Auth'

export const logout = () => {
  auth.set(false)
  window.location.href = '/signin'
}
