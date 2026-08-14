import supabase from './supabase';

export const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_live_3eda0ad1995bbe9c8f0767f24ab6f10b7d86a0f4';

export const NIGERIAN_BANKS = [
  { name: 'Access Bank', code: '044' },
  { name: 'Access Bank (Diamond)', code: '063' },
  { name: 'Citibank Nigeria', code: '023' },
  { name: 'Ecobank Nigeria', code: '050' },
  { name: 'Fidelity Bank', code: '070' },
  { name: 'First Bank of Nigeria', code: '011' },
  { name: 'First City Monument Bank (FCMB)', code: '214' },
  { name: 'Guaranty Trust Bank (GTBank)', code: '058' },
  { name: 'Heritage Bank', code: '030' },
  { name: 'Keystone Bank', code: '082' },
  { name: 'Kuda Microfinance Bank', code: '50211' },
  { name: 'Moniepoint MFB', code: '50515' },
  { name: 'OPay Digital Services', code: '999992' },
  { name: 'PalmPay', code: '999991' },
  { name: 'Polaris Bank', code: '076' },
  { name: 'Providus Bank', code: '101' },
  { name: 'Stanbic IBTC Bank', code: '221' },
  { name: 'Standard Chartered Bank', code: '068' },
  { name: 'Sterling Bank', code: '232' },
  { name: 'Union Bank of Nigeria', code: '032' },
  { name: 'United Bank for Africa (UBA)', code: '033' },
  { name: 'Unity Bank', code: '215' },
  { name: 'VFD Microfinance Bank', code: '566' },
  { name: 'Wema Bank', code: '035' },
  { name: 'Zenith Bank', code: '057' },
];

/**
 * Resolves a Nigerian bank account number via Supabase Edge Function
 * @param {string} accountNumber 10-digit NUBAN
 * @param {string} bankCode CBN bank code
 * @returns {Promise<{ success: boolean, accountName?: string, error?: string }>}
 */
export async function resolveBankAccount(accountNumber, bankCode) {
  if (!accountNumber || accountNumber.length !== 10 || !bankCode) {
    return { success: false, error: 'Enter a valid 10-digit NUBAN account number and select a bank.' };
  }

  try {
    const { data, error } = await supabase.functions.invoke('resolve-bank-account', {
      body: {
        account_number: accountNumber.trim(),
        bank_code: bankCode.trim(),
      },
    });

    if (error) {
      return { success: false, error: error.message || 'Failed to invoke resolve-bank-account edge function' };
    }

    if (data?.status && data?.data?.account_name) {
      return {
        success: true,
        accountName: data.data.account_name,
        accountNumber: data.data.account_number,
      };
    }

    return {
      success: false,
      error: data?.message || 'Could not resolve account name for the selected bank.',
    };
  } catch (err) {
    return { success: false, error: err.message || 'Error communicating with bank resolution function.' };
  }
}

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
  let totalIfUnder2500 = p / 0.985;

  if (totalIfUnder2500 < 2500) {
    totalNgn = totalIfUnder2500;
  } else {
    // Total = (p + 100) / 0.985
    totalNgn = (p + 100) / 0.985;
  }

  // Cap check: Paystack fee is capped at 2000 NGN.
  if ((totalNgn - p) > 2000) {
    totalNgn = p + 2000;
  }

  let fee = totalNgn - p;
  return {
    productPrice: amountInKobo,
    totalToCharge: Math.ceil(totalNgn * 100),
    fee: Math.ceil(fee * 100),
  };
}
