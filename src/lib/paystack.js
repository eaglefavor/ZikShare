export const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_live_3eda0ad1995bbe9c8f0767f24ab6f10b7d86a0f4';

/**
 * Calculates Paystack fees and total charge amount to ensure the seller gets exactly their price.
 * Paystack fee is 1.5% + 100 NGN (100 NGN is waived if total is under 2500 NGN).
 * Maximum fee is 2000 NGN.
 *
 * @param {number} amountInKobo - The desired amount the seller wants to receive, in kobo.
 * @returns {Object} An object containing the product price, total amount to charge, and the fee, all in kobo.
 */
export function calculatePaystackFeeAndTotal(amountInKobo) {
  let p = amountInKobo / 100; // Product price in NGN
  let totalNgn;

  // Try < 2500 NGN logic (waived 100 NGN fee)
  // Total = p / (1 - 0.015) = p / 0.985
  let totalIfUnder2500 = p / 0.985;

  if (totalIfUnder2500 < 2500) {
    totalNgn = totalIfUnder2500;
  } else {
    // Total = (p + 100) / 0.985
    totalNgn = (p + 100) / 0.985;
  }

  // Cap check: Paystack fee is capped at 2000 NGN.
  // If (totalNgn - p) > 2000, then fee is just 2000.
  if ((totalNgn - p) > 2000) {
    totalNgn = p + 2000;
  }

  let fee = totalNgn - p;
  return {
    productPrice: amountInKobo,
    totalToCharge: Math.ceil(totalNgn * 100),
    fee: Math.ceil(fee * 100)
  };
}
