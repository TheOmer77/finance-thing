export const amountToMiliunits = (amount: number) => Math.round(amount * 1000);

export const amountFromMiliunits = (amount: number) =>
  Math.round(amount / 1000);
