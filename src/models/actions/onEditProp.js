export const onEditProp = (id, dist, property) => ({
  widget: 'models',
  type: 'onEditProp',
  payload: { id, dist, property },
})
