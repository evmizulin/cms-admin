export const onDone = creds => ({
  widget: 'signin',
  type: 'onDone',
  payload: { creds },
})
