export const onDone = creds => ({
  widget: 'signup',
  type: 'onDone',
  payload: { creds },
})
