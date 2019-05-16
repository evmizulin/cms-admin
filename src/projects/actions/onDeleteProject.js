export const onDeleteProject = id => ({
  widget: 'projects',
  type: 'onDeleteProject',
  payload: { id },
})
