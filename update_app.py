import re

with open('src/App.jsx', 'r') as f:
    content = f.read()

# Add import
if 'import PaymentSuccess from' not in content:
    content = content.replace("import ChatPage from './pages/ChatPage'", "import ChatPage from './pages/ChatPage'\nimport PaymentSuccess from './pages/PaymentSuccess'")

# Add Route
route_str = '<Route path="/payment/success" element={<PaymentSuccess />} />'
if route_str not in content:
    # Add it right before <Route path="/item/:id"
    content = content.replace('<Route path="/item/:id"', f'{route_str}\n          <Route path="/item/:id"')

with open('src/App.jsx', 'w') as f:
    f.write(content)
