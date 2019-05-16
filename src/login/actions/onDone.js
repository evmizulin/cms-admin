export const onDone = creds => ({
  widget: 'login',
  type: 'onDone',
  payload: { creds },
})
