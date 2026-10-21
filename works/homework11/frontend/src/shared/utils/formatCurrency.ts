const formatter = new Intl.NumberFormat('uk-UA', { style: 'currency', currency: 'UAH' })

export function formatCurrency(value: number) {
  return formatter.format(value)
}
