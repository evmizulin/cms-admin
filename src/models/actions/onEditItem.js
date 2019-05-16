export const onEditItem = (id, dist, item) => ({
  widget: 'models',
  type: 'onEditItem',
  payload: { id, dist, item },
})
