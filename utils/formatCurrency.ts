export function formatCurrency(currency: string = "", amount: number = 0) {
  const format = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    style: "currency",
    // '€' will be placed in correct position
    currency: "EUR",
  });
  const formattedAmount = format.format(amount / 100);
  return formattedAmount.replace("€", currency);
}
