export const onDone = creds => ({
  widget: 'recoverPass',
  type: 'onDone',
  payload: { creds },
})
