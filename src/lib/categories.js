// ============================================
// JiJi-Style Campus Marketplace Taxonomy & Subcategories
// ============================================

export const MARKETPLACE_SEGMENTS = [
  {
    id: 'tech',
    name: 'Electronics & Tech',
    emoji: '📱',
    iconName: 'Smartphone',
    color: '#2563EB',
    bg: '#EFF6FF',
    description: 'Phones, Laptops, Audio, Displays & Accessories',
    subcategories: [
      { id: 'phones', name: 'Phones & Tablets', emoji: '📱', keywords: ['iphone', 'samsung', 'redmi', 'infinix', 'tecno', 'ipad'] },
      { id: 'laptops', name: 'Laptops & Computers', emoji: '💻', keywords: ['macbook', 'hp', 'lenovo', 'dell', 'asus', 'acer', 'pc'] },
      { id: 'tvs', name: 'TVs & Monitors', emoji: '📺', keywords: ['smart tv', 'monitor', 'samsung tv', 'lg tv', 'hisense', 'led'] },
      { id: 'home-theatre', name: 'Home Theatres & Soundbars', emoji: '🎬', keywords: ['soundbar', 'home theatre', 'subwoofer', 'amplifier'] },
      { id: 'speakers', name: 'Bluetooth & Party Speakers', emoji: '🔊', keywords: ['jbl', 'oraimo', 'zealot', 'bluetooth speaker', 'sound box'] },
      { id: 'extensions', name: 'Extensions & Power Strips', emoji: '🔌', keywords: ['surge protector', 'extension box', 'cord', 'adapter'] },
      { id: 'lights', name: 'Rechargeable Lights & Study Lamps', emoji: '💡', keywords: ['solar light', 'reading lamp', 'led bulb', 'torch', 'emergency light'] },
      { id: 'tech-accessories', name: 'Chargers, Airpods & Tech Accessories', emoji: '🎧', keywords: ['powerbank', 'airpods', 'type c', 'charger', 'mouse', 'keyboard'] },
    ],
  },
  {
    id: 'hostel-appliances',
    name: 'Hostel & Home Appliances',
    emoji: '⚡',
    iconName: 'Zap',
    color: '#D97706',
    bg: '#FFFBEB',
    description: 'Generators, Fans, Irons, Cookers & Fridge',
    subcategories: [
      { id: 'generators', name: 'Generators & Small Engines', emoji: '⚡', keywords: ['tiger', 'i-pass-my-neighbor', 'sumec', 'firman', 'lube', 'generator'] },
      { id: 'fans', name: 'Standing & Rechargeable Fans', emoji: '🌀', keywords: ['standing fan', 'ox', 'lontor', 'table fan', 'rechargeable fan'] },
      { id: 'iron', name: 'Pressing Irons & Steamers', emoji: '👔', keywords: ['dry iron', 'steam iron', 'philips iron', 'pressing iron'] },
      { id: 'cookers', name: 'Hotplates, Cookers & Gas Cylinders', emoji: '🍳', keywords: ['hotplate', 'gas cylinder', 'burner', 'electric stove', 'induction'] },
      { id: 'kettles', name: 'Electric Kettles & Blenders', emoji: '🫖', keywords: ['electric jug', 'kettle', 'blender', 'toaster'] },
      { id: 'fridges', name: 'Refrigerators & Freezers', emoji: '🧊', keywords: ['bedside fridge', 'mini fridge', 'refrigerator', 'deep freezer'] },
    ],
  },
  {
    id: 'furniture-bedding',
    name: 'Furniture & Bedding',
    emoji: '🛏️',
    iconName: 'Bed',
    color: '#7C3AED',
    bg: '#F5F3FF',
    description: 'Beds, Pillows, Study Desks, Curtains & Storage',
    subcategories: [
      { id: 'beds', name: 'Beds & Mattresses', emoji: '🛏️', keywords: ['mouka', 'vitafoam', 'spring bed', 'mattress', 'student bed'] },
      { id: 'pillows', name: 'Pillows & Bedspreads', emoji: '☁️', keywords: ['foam pillow', 'duvet', 'bedsheet', 'pillow case'] },
      { id: 'chairs', name: 'Chairs & Study Desks', emoji: '🪑', keywords: ['reading chair', 'plastic chair', 'office chair', 'reading table', 'study desk'] },
      { id: 'curtains', name: 'Curtains & Window Blinds', emoji: '🪟', keywords: ['curtain', 'drapes', 'blinds', 'curtain rod'] },
      { id: 'wardrobes', name: 'Wardrobes, Racks & Storage', emoji: '🚪', keywords: ['cloth rack', 'fabric wardrobe', 'shoe rack', 'storage box'] },
    ],
  },
  {
    id: 'academic',
    name: 'Academic & Study Materials',
    emoji: '📚',
    iconName: 'BookOpen',
    color: '#059669',
    bg: '#ECFDF5',
    description: 'PDFs, Past Questions, Handouts, Textbooks & Kits',
    subcategories: [
      { id: 'past-questions', name: 'Past Questions & Solutions', emoji: '📝', keywords: ['past questions', 'pq', 'solutions', 'exam prep', 'gst'] },
      { id: 'lecture-notes', name: 'Course Lecture Notes & Summaries', emoji: '📖', keywords: ['lecture notes', 'handout', 'summary', 'slides', 'syllabus'] },
      { id: 'textbooks', name: 'Textbooks & Academic Readers', emoji: '📚', keywords: ['textbook', 'hardcover', 'author', 'reference book'] },
      { id: 'project-materials', name: 'Project & Research Materials', emoji: '📊', keywords: ['final year project', 'thesis', 'data analysis', 'case study'] },
      { id: 'calculators', name: 'Scientific Calculators & Drawing Kits', emoji: '📐', keywords: ['casio', 'scientific calculator', 'drawing board', 'tee square', 'lab coat'] },
    ],
  },
  {
    id: 'fashion',
    name: 'Fashion & Apparel',
    emoji: '👕',
    iconName: 'Shirt',
    color: '#EC4899',
    bg: '#FDF2F8',
    description: 'Clothes, Shoes, Sneakers, Bags & Accessories',
    subcategories: [
      { id: 'clothes', name: 'Clothes & Outfits', emoji: '👕', keywords: ['shirt', 't-shirt', 'jeans', 'trousers', 'hoodie', 'dress', 'gown'] },
      { id: 'shoes', name: 'Shoes & Sneakers', emoji: '👟', keywords: ['sneakers', 'nike', 'adidas', 'loafers', 'slides', 'crocs', 'boots'] },
      { id: 'bags', name: 'Bags & Backpacks', emoji: '🎒', keywords: ['school bag', 'backpack', 'handbag', 'tote bag', 'laptop bag'] },
      { id: 'accessories', name: 'Watches, Belts & Jewelry', emoji: '⌚', keywords: ['wrist watch', 'belt', 'necklace', 'sunglasses', 'cap'] },
    ],
  },
  {
    id: 'services',
    name: 'Campus Services',
    emoji: '🔧',
    iconName: 'Wrench',
    color: '#0284C7',
    bg: '#F0F9FF',
    description: 'Repairs, Errand & Delivery, Tutorials & Prints',
    subcategories: [
      { id: 'repairs', name: 'Phone & Laptop Repairs', emoji: '🛠️', keywords: ['screen repair', 'laptop fix', 'flashing', 'charging port'] },
      { id: 'delivery', name: 'Hostel Delivery & Logistics', emoji: '🛵', keywords: ['errand', 'dispatch', 'lodge delivery', 'pickup'] },
      { id: 'tutorials', name: 'Tutorials & Course Mentorship', emoji: '🎓', keywords: ['tutorial', 'math tutorial', 'coding lessons', 'assignment guide'] },
      { id: 'printing', name: 'Printing, Binding & Photocopy', emoji: '🖨️', keywords: ['print', 'hardcopy', 'project binding', 'spiral'] },
    ],
  },
]

// All subcategories flat list for fast lookup and search filtering
export const ALL_SUBCATEGORIES = MARKETPLACE_SEGMENTS.flatMap(seg => 
  seg.subcategories.map(sub => ({
    ...sub,
    segmentId: seg.id,
    segmentName: seg.name,
    segmentColor: seg.color,
  }))
)

// Verified UNIZIK Campus Locations for Meetups & Delivery
export const UNIZIK_LOCATIONS = [
  { id: 'garba-square', name: 'Garba Square (Perm Site)', zone: 'Perm Site', badge: '🛡️ Safe Exchange Hub' },
  { id: 'chisco-park', name: 'Chisco Park / Bus Stop', zone: 'Perm Site', badge: '🛡️ Safe Exchange Hub' },
  { id: 'admin-block', name: 'Administrative Building / Senate', zone: 'Perm Site', badge: '🛡️ Safe Exchange Hub' },
  { id: 'science-village', name: 'Science Village & Labs', zone: 'Perm Site', badge: '🏫 Academic Zone' },
  { id: 'faculty-eng', name: 'Faculty of Engineering Blocks', zone: 'Perm Site', badge: '🏫 Academic Zone' },
  { id: 'faculty-law', name: 'Faculty of Law Complex', zone: 'Perm Site', badge: '🏫 Academic Zone' },
  { id: 'unizik-bookshop', name: 'University Bookshop / Bank Hub', zone: 'Perm Site', badge: '🛡️ Safe Exchange Hub' },
  { id: 'ifite-gate', name: 'Ifite First / Second Gate', zone: 'Ifite Off-Campus', badge: '🏘️ Lodge Area' },
  { id: 'ifite-aroma', name: 'Aroma Junction Hub', zone: 'Town / Aroma', badge: '🚌 Transit Hub' },
  { id: 'temp-site', name: 'Temp Site (College of Health Sciences)', zone: 'Nnewi / Temp Site', badge: '🏥 Medical Zone' },
  { id: 'amansea', name: 'Amansea Express Junction', zone: 'Amansea Off-Campus', badge: '🏘️ Lodge Area' },
]

// UNIZIK Faculties & Academic Hierarchy
export const UNIZIK_FACULTIES = [
  {
    name: 'Faculty of Engineering',
    departments: ['Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering', 'Chemical Engineering', 'Computer Engineering', 'Electronic & Telecom', 'Agricultural & Bioresources', 'Industrial & Production', 'Metallurgical & Materials Engineering'],
  },
  {
    name: 'Faculty of Physical Sciences',
    departments: ['Computer Science', 'Mathematics', 'Physics & Industrial Physics', 'Chemistry', 'Statistics', 'Geological Sciences', 'Geophysics'],
  },
  {
    name: 'Faculty of Biosciences',
    departments: ['Applied Biochemistry', 'Microbiology', 'Parasitology & Entomology', 'Botany', 'Zoology'],
  },
  {
    name: 'Faculty of Management Sciences',
    departments: ['Accountancy', 'Banking & Finance', 'Business Administration', 'Marketing', 'Public Administration', 'Cooperative Economics'],
  },
  {
    name: 'Faculty of Social Sciences',
    departments: ['Economics', 'Mass Communication', 'Political Science', 'Psychology', 'Sociology/Anthropology'],
  },
  {
    name: 'Faculty of Law',
    departments: ['Commercial & Property Law', 'International Law', 'Public & Private Law'],
  },
  {
    name: 'Faculty of Arts & Humanities',
    departments: ['English Language & Literature', 'History & International Studies', 'Philosophy', 'Music', 'Theatre Arts', 'Linguistics'],
  },
  {
    name: 'General Studies (GST / CED)',
    departments: ['GST Directorate', 'Centre for Entrepreneurship Development (CED)'],
  },
]

export const ACADEMIC_LEVELS = ['100L', '200L', '300L', '400L', '500L', 'Postgraduate']

/**
 * Finds a subcategory by ID or search text
 */
export function findSubcategory(idOrQuery) {
  if (!idOrQuery) return null
  const clean = String(idOrQuery).toLowerCase().trim()
  return ALL_SUBCATEGORIES.find(s => 
    s.id === clean || 
    s.name.toLowerCase() === clean || 
    s.keywords.some(k => clean.includes(k))
  ) || null
}

/**
 * Finds the parent segment for a given subcategory or category name
 */
export function findParentSegment(categoryOrSubId) {
  if (!categoryOrSubId) return null
  const clean = String(categoryOrSubId).toLowerCase().trim()
  return MARKETPLACE_SEGMENTS.find(seg => 
    seg.id === clean || 
    seg.name.toLowerCase() === clean ||
    seg.subcategories.some(sub => sub.id === clean || sub.name.toLowerCase() === clean)
  ) || null
}
