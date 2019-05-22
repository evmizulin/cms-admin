export const onDeleteEntry = id => ({
  widget: 'entries',
  type: 'onDeleteEntry',
  payload: { id },
})
