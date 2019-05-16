export const onDialogExited = dialogType => ({
  widget: 'tokens',
  type: 'onDialogExited',
  payload: { dialogType },
})
