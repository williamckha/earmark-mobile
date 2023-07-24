const dollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

export const formatCurrency = (amount: number) => {
  let value = amount / 100;
  return {
    formattedValue: dollar.format(value),
    value: value.toFixed(2),
    floatValue: value,
  }
} 