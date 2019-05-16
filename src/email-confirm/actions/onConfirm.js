export const onConfirm = activationToken => ({
  widget: 'emailConfirm',
  type: 'onConfirm',
  payload: { activationToken },
})
