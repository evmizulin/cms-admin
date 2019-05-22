export const onDone = creds => ({
  widget: 'changePass',
  type: 'onDone',
  payload: { creds },
})
