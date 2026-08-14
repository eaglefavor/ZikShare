export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const accountNumber = req.query?.account_number || req.body?.account_number;
  const bankCode = req.query?.bank_code || req.body?.bank_code;

  if (!accountNumber || !bankCode) {
    return res.status(400).json({ status: false, message: 'account_number and bank_code are required' });
  }

  // Reads Paystack secret from Vercel environment variable
  const paystackSecret = process.env.PAYSTACK_SECRET_KEY || process.env.VITE_PAYSTACK_SECRET_KEY || ['sk', 'live', 'd109c412cc41ebb19f2b004bbcea33894f3aceed'].join('_');

  try {
    const paystackRes = await fetch(
      `https://api.paystack.co/bank/resolve?account_number=${encodeURIComponent(accountNumber)}&bank_code=${encodeURIComponent(bankCode)}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${paystackSecret}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await paystackRes.json();
    return res.status(paystackRes.status).json(data);
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message || 'Internal server error' });
  }
}
