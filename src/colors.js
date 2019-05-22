const get = chanels => {
  const res = {}
  const darker = [-6, -12, -18, -24, -30]
  const lighter = [6, 12, 18, 24, 30]
  const transparent = [0.85, 0.7, 0.42, 0.3, 0.15]
  res.main = `rgb(${chanels.join(', ')})`
  transparent.forEach((t, i) => {
    const preSplit = chanels.join(', ')
    res[`t${i + 1}`] = `rgba(${preSplit}, ${t})`
  })
  darker.forEach((step, iteration) => {
    const preSplit = chanels.map(chanel => (chanel + step < 0 ? 0 : chanel + step)).join(', ')
    res[`d${iteration + 1}`] = `rgb(${preSplit})`
    transparent.forEach((t, i) => {
      res[`d${iteration + 1}t${i + 1}`] = `rgba(${preSplit}, ${t})`
    })
  })
  lighter.forEach((step, iteration) => {
    const preSplit = chanels.map(chanel => (chanel + step > 255 ? 255 : chanel + step)).join(', ')
    res[`l${iteration + 1}`] = `rgb(${preSplit})`
    transparent.forEach((t, i) => {
      res[`l${iteration + 1}t${i + 1}`] = `rgba(${preSplit}, ${t})`
    })
  })

  return res
}

export const colors = {
  primary: get([15, 45, 64]),
  // secondary: get([14, 156, 141]),
  secondary: get([9, 178, 161]),
  tertiary: get([240, 247, 247]),
  white: get([255, 255, 255]),
  grey: get([127, 127, 127]),
  black: get([0, 0, 0]),
  error: get([255, 56, 50]),
}

// export const colors = {
//   primary: get([41, 45, 71]),
//   secondary: get([10, 165, 196]),
//   tertiary: get([227, 232, 247]),
//   white: get([255, 255, 255]),
//   grey: get([127, 127, 127]),
//   black: get([0, 0, 0]),
//   error: get([255, 56, 50]),
// }

window.colors = colors

// my stable
// export const colors = {
//   primary: get([48, 53, 79]),
//   secondary: get([0, 187, 211]),
//   tertiary: get([217, 226, 236]),
//   white: get([255, 255, 255]),
//   grey: get([127, 127, 127]),
//   black: get([0, 0, 0]),
//   error: get([255, 56, 50]),
// }

// graph
// export const colors = {
//   primary: get([49, 37, 79]),
//   secondary: get([0, 188, 225]),
//   tertiary: get([246, 249, 255]),
//   white: get([255, 255, 255]),
//   grey: get([127, 127, 127]),
//   black: get([0, 0, 0]),
//   error: get([232, 0, 0]),
// }
