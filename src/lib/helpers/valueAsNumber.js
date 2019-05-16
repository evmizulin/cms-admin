export function valueAsNumber(value) {
  return typeof value === 'number' ? `${value}` : value ? value : ''
}
