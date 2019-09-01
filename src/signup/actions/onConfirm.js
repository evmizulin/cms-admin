export const onConfirm = confirmationToken => ({
  widget: 'signup',
  type: 'onConfirm',
  payload: { confirmationToken },
})
