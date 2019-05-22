import store from 'store'

class Auth {
  set(isSet) {
    store.set('isAuthSet', isSet)
  }

  isSet() {
    return store.get('isAuthSet') || false
  }
}

export const auth = new Auth()
