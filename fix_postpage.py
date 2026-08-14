with open('src/pages/PostPage.jsx', 'r') as f:
    content = f.read()

# Add missing variables in PostPage
if 'const [listingType, setListingType] = useState' not in content:
    content = content.replace("const [condition, setCondition] = useState('Fairly Used')", "const [condition, setCondition] = useState('Fairly Used')\n    const [listingType, setListingType] = useState('Physical Item')\n    const [pdfFile, setPdfFile] = useState(null)")

with open('src/pages/PostPage.jsx', 'w') as f:
    f.write(content)
