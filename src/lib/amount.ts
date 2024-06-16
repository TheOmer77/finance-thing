export const amountToMilliunits = (amount: number) => Math.round(amount * 1000);
export const amountFromMilliunits = (amount: number) => amount / 1000;

export const calculatePercentageChange = (
  current: number,
  previous: number
) => {
  if (previous === 0) return current === 0 ? 0 : 100;
  return ((current - previous) / previous) * 100;
};
