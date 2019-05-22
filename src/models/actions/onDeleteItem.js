export const onDeleteItem = (id, dist) => ({
  widget: 'models',
  type: 'onDeleteItem',
  payload: { id, dist },
})
