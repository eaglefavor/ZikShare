import re

with open('src/pages/PostPage.jsx', 'r') as f:
    content = f.read()

# Replace condition state properly
if 'const [listingType, setListingType] = useState(' not in content:
    content = content.replace("const [condition, setCondition] = useState('Fairly Used')", "const [condition, setCondition] = useState('Fairly Used')\n    const [listingType, setListingType] = useState('Physical Item')\n    const [pdfFile, setPdfFile] = useState(null)")

# We already tried this but it failed. Let's see if we can do it via regex.
if 'const [listingType, setListingType]' not in content:
    content = re.sub(r'const \[condition, setCondition\] = useState\([^)]+\)', "const [condition, setCondition] = useState('Fairly Used')\n    const [listingType, setListingType] = useState('Physical Item')\n    const [pdfFile, setPdfFile] = useState(null)", content)

with open('src/pages/PostPage.jsx', 'w') as f:
    f.write(content)
