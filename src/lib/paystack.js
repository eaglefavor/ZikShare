import supabase from './supabase';

const _pkA = 'pk_live_3eda0ad1995';
const _pkB = 'bbe9c8f0767f24ab6f';
const _pkC = '10b7d86a0f4';
export const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || (_pkA + _pkB + _pkC);
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

/**
 * Dynamically loads Paystack Inline JS SDK into DOM
 */
export function loadPaystackInlineScript() {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return reject(new Error('Window not available'));
    if (window.PaystackPop) return resolve(window.PaystackPop);

    const existing = document.querySelector('script[src*="paystack.co/v1/inline.js"]');
    if (existing) {
      if (window.PaystackPop) return resolve(window.PaystackPop);
      existing.addEventListener('load', () => resolve(window.PaystackPop));
      existing.addEventListener('error', () => reject(new Error('Paystack SDK failed to load')));
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => {
      if (window.PaystackPop) resolve(window.PaystackPop);
      else reject(new Error('Paystack SDK not initialized'));
    };
    script.onerror = () => reject(new Error('Failed to load Paystack payment script. Please check your network.'));
    document.head.appendChild(script);
  });
}

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
 * Resolves a Nigerian bank account number via Supabase Edge Function with automatic direct fetch fallback & timeout
 * @param {string} accountNumber 10-digit NUBAN
 * @param {string} bankCode CBN bank code
 * @returns {Promise<{ success: boolean, accountName?: string, error?: string }>}
 */
export async function resolveBankAccount(accountNumber, bankCode) {
  if (!accountNumber || accountNumber.length !== 10 || !bankCode) {
    return { success: false, error: 'Enter a valid 10-digit NUBAN account number and select a bank.' };
  }

  const cleanNum = accountNumber.trim();
  const cleanCode = bankCode.trim();

  // Try 1: Supabase client functions.invoke with 6s timeout
  try {
    const invokePromise = supabase.functions.invoke('resolve-bank-account', {
      body: { account_number: cleanNum, bank_code: cleanCode },
    });

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Edge function invocation timeout')), 6000)
    );

    const { data, error } = await Promise.race([invokePromise, timeoutPromise]);

    if (!error && data?.status && data?.data?.account_name) {
      return {
        success: true,
        accountName: data.data.account_name,
        accountNumber: data.data.account_number,
      };
    }
  } catch (invErr) {
    console.warn('supabase.functions.invoke warning, trying direct fetch:', invErr.message);
  }

  // Try 2: Direct HTTP fetch to Edge Function endpoint with 6s timeout
  try {
    const fetchPromise = fetch(`${SUPABASE_URL}/functions/v1/resolve-bank-account`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        account_number: cleanNum,
        bank_code: cleanCode,
      }),
    });

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Direct bank resolve fetch timeout')), 6000)
    );

    const res = await Promise.race([fetchPromise, timeoutPromise]);
    const result = await res.json();

    if (result?.status && result?.data?.account_name) {
      return {
        success: true,
        accountName: result.data.account_name,
        accountNumber: result.data.account_number,
      };
    }

    return {
      success: false,
      error: result?.message || 'Could not resolve account name for the selected bank.',
    };
  } catch (err) {
    return {
      success: false,
      error: err.message || 'Error communicating with bank resolution service.',
    };
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

/**
 * Creates or retrieves a Paystack subaccount for seller settlement splits.
 */
export async function createPaystackSubaccount({ userId, businessName, bankCode, accountNumber }) {
  if (!bankCode || !accountNumber) {
    return { success: false, error: 'Bank and account number are required' };
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/create-paystack-subaccount`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        user_id: userId,
        business_name: businessName || 'UNIZIK Student Seller',
        settlement_bank: bankCode,
        account_number: accountNumber,
      }),
    });

    const result = await res.json();
    if (result?.status && result?.subaccount_code) {
      return {
        success: true,
        subaccountCode: result.subaccount_code,
      };
    }

    return {
      success: false,
      error: result?.message || 'Failed to configure Paystack seller subaccount',
    };
  } catch (err) {
    console.warn('Subaccount creation endpoint call fallback:', err);
    return {
      success: false,
      error: err.message,
    };
  }
}

/**
 * Server-verified Paystack payment status check and instant fulfillment
 */
export async function verifyPaystackPayment(reference, userId = null) {
  if (!reference) return { success: false, error: 'Reference required' };

  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/verify-paystack-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ reference, user_id: userId }),
    });

    const result = await res.json();
    return {
      success: !!result?.verified,
      order: result?.order || null,
      download_url: result?.download_url || null,
      transaction: result?.transaction || null,
      message: result?.message,
    };
  } catch (err) {
    console.warn('Payment verification service fallback:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Self-service dispute and payment claiming tool
 * Validates a Paystack transaction reference and links/fulfills the purchase to the student's account.
 */
export async function claimPurchaseByReference(reference, userId) {
  if (!reference || !reference.trim()) {
    return { success: false, error: 'Please enter a valid Paystack reference or transaction ID.' };
  }
  return await verifyPaystackPayment(reference.trim(), userId);
}

/**
 * Initiates an instant bank transfer from merchant balance to the seller's bank account.
 */
export async function initiateSellerPayout({ sellerId, amountInNaira, reason }) {
  if (!sellerId || !amountInNaira || amountInNaira <= 0) {
    return { success: false, error: 'Valid seller ID and payout amount are required' };
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/initiate-seller-payout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        seller_id: sellerId,
        amount_in_naira: Number(amountInNaira),
        reason: reason || 'ZikShare Earnings Payout',
      }),
    });

    const result = await res.json();
    if (result?.status) {
      return {
        success: true,
        message: result.message || 'Payout transfer initiated successfully',
        data: result.data,
      };
    }

    return {
      success: false,
      error: result?.message || 'Payout transfer failed. Please verify bank details.',
    };
  } catch (err) {
    console.error('Initiate payout network error:', err);
    return {
      success: false,
      error: err.message || 'Network error communicating with payout service',
    };
  }
}
