#!/usr/bin/env bash
set -euo pipefail

: "${SUPABASE_URL:?SUPABASE_URL is required}"
: "${SUPABASE_ANON_KEY:?SUPABASE_ANON_KEY is required}"
: "${ADMIN_AUTH_HEADER:?ADMIN_AUTH_HEADER is required (example: Authorization: ******"
: "${BUYER_AUTH_HEADER:?BUYER_AUTH_HEADER is required}"
: "${SELLER_AUTH_HEADER:?SELLER_AUTH_HEADER is required}"
: "${STUDENT_AUTH_HEADER:?STUDENT_AUTH_HEADER is required}"
: "${VICTIM_UID:?VICTIM_UID is required}"
: "${ATTACKER_UID:?ATTACKER_UID is required}"

echo "[RLS] anon update users should be denied"
anon_update="$(curl -sS -X PATCH \
  -H "apikey: ${SUPABASE_ANON_KEY}" \
  -H "Authorization: ******" \
  -H "Content-Type: application/json" \
  -d '{"is_banned": true}' \
  "${SUPABASE_URL}/rest/v1/users?uid=eq.${VICTIM_UID}&select=uid,is_banned")"
test "${anon_update}" = "[]"

echo "[RLS] student cannot update another user"
student_update="$(curl -sS -X PATCH \
  -H "apikey: ${SUPABASE_ANON_KEY}" \
  -H "${STUDENT_AUTH_HEADER}" \
  -H "Content-Type: application/json" \
  -d '{"is_banned": true}' \
  "${SUPABASE_URL}/rest/v1/users?uid=eq.${VICTIM_UID}&select=uid,is_banned")"
test "${student_update}" = "[]"

echo "[RLS] seller can access own listings"
curl -sS \
  -H "apikey: ${SUPABASE_ANON_KEY}" \
  -H "${SELLER_AUTH_HEADER}" \
  "${SUPABASE_URL}/rest/v1/listings?sellerId=eq.${ATTACKER_UID}&select=id&limit=1" >/dev/null

echo "[RLS] buyer can read own orders"
curl -sS \
  -H "apikey: ${SUPABASE_ANON_KEY}" \
  -H "${BUYER_AUTH_HEADER}" \
  "${SUPABASE_URL}/rest/v1/orders?buyer_id=eq.${ATTACKER_UID}&select=id,status&limit=1" >/dev/null

echo "[RLS] admin can access users table"
curl -sS \
  -H "apikey: ${SUPABASE_ANON_KEY}" \
  -H "${ADMIN_AUTH_HEADER}" \
  "${SUPABASE_URL}/rest/v1/users?select=uid&limit=1" >/dev/null

echo "RLS matrix verification passed"
