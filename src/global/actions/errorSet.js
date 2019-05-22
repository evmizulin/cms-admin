export const setErrorAction = (show, error) => ({
  widget: 'global',
  type: 'errorSet',
  payload: {
    show,
    error,
  },
})
