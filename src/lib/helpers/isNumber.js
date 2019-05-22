export const isNumber = value => {
  const regs = [
    /^-[1-9]{1}[0-9]*$/,
    /^0{1}$/,
    /^[1-9]{1}[0-9]*$/,
    /^-[1-9]{1}[0-9]*\.[0-9]*[1-9]{1}$/,
    /^-0\.[0-9]*[1-9]{1}$/,
    /^0\.[0-9]*[1-9]{1}$/,
    /^[1-9]{1}[0-9]*\.[0-9]*[1-9]{1}$/,
  ]
  const isNumber = regs.some(item => item.test(value) && !isNaN(Number(value)))
  return isNumber
}
