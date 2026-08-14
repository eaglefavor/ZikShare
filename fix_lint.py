import re

# 1. Fix PostPage.jsx double import
with open('src/pages/PostPage.jsx', 'r') as f:
    content = f.read()
content = content.replace("import supabase from '../lib/database'\n", "")
with open('src/pages/PostPage.jsx', 'w') as f:
    f.write(content)

# 2. Fix PaystackCheckout Date.now() and unused var
with open('src/components/PaystackCheckout.jsx', 'r') as f:
    content = f.read()

# Replace Date.now() with useMemo or just ref/state. Since it's reference, let's just use useRef or generate it on handlePayment.
# Better to put `reference` in `config` but config doesn't need to be state if we initialize inside handlePayment.
# But `usePaystackPayment` takes config.
# We can use useMemo
if 'usePaystackPayment' in content:
    content = content.replace("import { usePaystackPayment } from 'react-paystack';", "import { usePaystackPayment } from 'react-paystack';\nimport { useMemo } from 'react';")
    content = content.replace("const config = {", "const config = useMemo(() => ({")
    # Replace ending
    content = content.replace("    }\n  };\n\n  const initializePayment = usePaystackPayment(config);", "    }\n  }), [user, product, totalToCharge]);\n\n  const initializePayment = usePaystackPayment(config);")

content = content.replace("const { data: order, error } = await supabase", "const { error } = await supabase")
with open('src/components/PaystackCheckout.jsx', 'w') as f:
    f.write(content)

# 3. Fix ItemDetailPage.jsx
with open('src/pages/ItemDetailPage.jsx', 'r') as f:
    content = f.read()

# 'user' is not defined inside the ternary operator (around line 268).
# Wait, let's look at `const { user, isAuthenticated } = useAuth()` or similar?
# The component has `const { user } = useAuth()` probably. Let's see if it has `user`.
# Let's see the imports: `import { useAuth } from '../contexts/AuthContext'`
if 'const { user } = useAuth()' not in content:
    if 'const { session } = useAuth()' in content:
         # maybe it has session.user
         content = content.replace('user ? (', '(session && session.user) ? (')
         content = content.replace('user={user}', 'user={session.user}')
    else:
         pass # needs more inspection

# Remove unused imports
content = content.replace("import { getListing, getDigitalProduct } from '../lib/database'", "import { getListing } from '../lib/database'")
content = content.replace("import { calculatePaystackFeeAndTotal } from '../lib/paystack'", "")
content = content.replace("import { getUser } from '../lib/database'", "")

with open('src/pages/ItemDetailPage.jsx', 'w') as f:
    f.write(content)
