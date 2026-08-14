function calculatePaystackFeeAndTotal(amountInKobo) {
  let p = amountInKobo / 100; // in NGN
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
    productPrice: p,
    totalToCharge: Math.ceil(totalNgn * 100),
    fee: Math.ceil(fee * 100)
  };
}
console.log(calculatePaystackFeeAndTotal(1000 * 100)); // 1000 NGN
console.log(calculatePaystackFeeAndTotal(3000 * 100)); // 3000 NGN
console.log(calculatePaystackFeeAndTotal(150000 * 100)); // 150,000 NGN
