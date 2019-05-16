export const onDialogExited = dialogType => ({
  widget: 'entries',
  type: 'onDialogExited',
  payload: { dialogType },
})
