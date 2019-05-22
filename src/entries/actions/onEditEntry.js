export const onEditEntry = (entry, model) => ({
  widget: 'entries',
  type: 'onEditEntry',
  payload: { entry, model },
})
