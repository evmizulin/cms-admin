export const onConfirm = confirmationToken => ({
  widget: 'emailConfirm',
  type: 'onConfirm',
  payload: { confirmationToken },
})
