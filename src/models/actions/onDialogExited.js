export const onDialogExited = dialogType => ({
  widget: 'models',
  type: 'onDialogExited',
  payload: { dialogType },
})
