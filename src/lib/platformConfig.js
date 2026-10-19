function parseCsv(value) {
  return String(value || '')
    .split(',')
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean)
}

export const PLATFORM_ADMIN_EMAILS = parseCsv(import.meta.env.VITE_PLATFORM_ADMIN_EMAILS)
export const OFFICIAL_ACCOUNT_EMAILS = parseCsv(import.meta.env.VITE_OFFICIAL_ACCOUNT_EMAILS || import.meta.env.VITE_PLATFORM_ADMIN_EMAILS)
export const PRIMARY_PLATFORM_ADMIN_EMAIL = PLATFORM_ADMIN_EMAILS[0] || ''

export function isAdminEmail(email) {
  if (!email) return false
  return PLATFORM_ADMIN_EMAILS.includes(String(email).toLowerCase().trim())
}

export function isOfficialAccountEmail(emailOrId) {
  if (!emailOrId) return false
  const clean = String(emailOrId).toLowerCase().trim()
  return OFFICIAL_ACCOUNT_EMAILS.includes(clean)
}
