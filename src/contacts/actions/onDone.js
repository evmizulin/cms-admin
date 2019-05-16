export const onDone = contact => ({
  widget: 'contacts',
  type: 'onDone',
  payload: { contact },
})
