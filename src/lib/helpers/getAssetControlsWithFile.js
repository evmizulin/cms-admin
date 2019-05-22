export const getAssetControlsWithFile = entry => {
  const res = []
  inAny(res, entry.value)
  return res
}

const inSimple = () => []

const inAny = (res, value) => {
  const MAP = {
    'string-line': inSimple,
    'string-multiline': inSimple,
    'string-html': inSimple,
    'string-markdown': inSimple,
    boolean: inSimple,
    number: inSimple,
    object: isObject,
    array: inArray,
    enum: inSimple,
    reference: inSimple,
    asset: inAsset,
  }
  MAP[value.type](res, value)
}

const isObject = (res, value) => {
  Object.keys(value.value).forEach(propName => {
    inAny(res, value.value[propName])
  })
}

const inArray = (res, value) => {
  value.value.forEach(item => inAny(res, item))
}

const inAsset = (res, value) => {
  if (value.value instanceof File) {
    res.push(value)
  }
}
