// Style categories
export const styleCategories = [
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Clean lines, neutral colors, and simple silhouettes.",
    image: "/lovable-uploads/732b5b2d-90da-4f76-9f17-1e55dbf963fd.png",
  },
  {
    id: "classic",
    name: "Classic",
    description: "Timeless pieces with structured shapes and refined details.",
    image: "/lovable-uploads/15dc960f-b0fd-4d1d-83b3-7e2c02fd537b.png",
  },
  {
    id: "bohemian",
    name: "Bohemian",
    description: "Free-spirited looks with flowing fabrics and artisanal details.",
    image: "/lovable-uploads/54da5cbb-9008-4253-bafb-319eda9120c9.png",
  },
  {
    id: "streetwear",
    name: "Streetwear",
    description: "Urban-inspired casual wear with bold graphics and oversized fits.",
    image: "/lovable-uploads/a1330e69-08b5-40d2-951e-17898468bbb8.png",
  },
  {
    id: "preppy",
    name: "Preppy",
    description: "Polished, collegiate-inspired pieces with crisp details.",
    image: "/lovable-uploads/a9a1d126-6857-4e4a-9c44-d4a58416d095.png",
  },
  {
    id: "avant-garde",
    name: "Avant-Garde",
    description: "Experimental silhouettes and unconventional combinations.",
    image: "/lovable-uploads/3b910393-d7ff-4406-8c6b-c3aac5be01df.png",
  },
];

// Body types
export const bodyTypes = [
  {
    id: "rectangle",
    name: "Rectangle",
    description: "Shoulders and hips are similar width with little waist definition.",
    image: "/placeholder.svg",
  },
  {
    id: "hourglass",
    name: "Hourglass",
    description: "Shoulders and hips are similar with a defined waist.",
    image: "/placeholder.svg",
  },
  {
    id: "pear",
    name: "Pear",
    description: "Hips wider than shoulders with a defined waist.",
    image: "/placeholder.svg",
  },
  {
    id: "inverted-triangle",
    name: "Inverted Triangle",
    description: "Shoulders wider than hips with less waist definition.",
    image: "/placeholder.svg",
  },
  {
    id: "apple",
    name: "Apple",
    description: "Fuller midsection with slimmer legs and arms.",
    image: "/placeholder.svg",
  },
];

// Quiz questions
export const quizQuestions = [
  {
    id: "style-preference",
    question: "Which style resonates with you the most?",
    options: styleCategories,
    type: "single-select",
  },
  {
    id: "body-type",
    question: "Which body type best describes your silhouette?",
    options: bodyTypes,
    type: "single-select",
  },
  {
    id: "color-preference",
    question: "What colors do you typically gravitate towards?",
    options: [
      { id: "neutrals", name: "Neutrals", description: "Black, white, beige, gray" },
      { id: "pastels", name: "Pastels", description: "Soft, muted colors" },
      { id: "bold", name: "Bold", description: "Vibrant, saturated colors" },
      { id: "earthy", name: "Earthy", description: "Warm, natural tones" },
      { id: "monochrome", name: "Monochrome", description: "Single color variations" },
    ],
    type: "multi-select",
  },
  {
    id: "occasion",
    question: "What occasions are you primarily dressing for?",
    options: [
      { id: "casual", name: "Casual", description: "Everyday comfort" },
      { id: "work", name: "Work", description: "Professional settings" },
      { id: "formal", name: "Formal", description: "Upscale events" },
      { id: "active", name: "Active", description: "Fitness and outdoors" },
      { id: "nightout", name: "Night Out", description: "Bars, restaurants, clubs" },
    ],
    type: "multi-select",
  },
  {
    id: "budget",
    question: "What's your typical budget per item?",
    options: [
      { id: "budget", name: "Budget-friendly", description: "$25-75 per item" },
      { id: "mid-range", name: "Mid-range", description: "$75-150 per item" },
      { id: "premium", name: "Premium", description: "$150-300 per item" },
      { id: "luxury", name: "Luxury", description: "$300+ per item" },
    ],
    type: "single-select",
  },
];

// Mock recommendations data
export const mockRecommendations = [
  {
    id: 1,
    name: "Tailored Wool Blazer",
    brand: "Arket",
    price: 198,
    image: "/placeholder.svg",
    description: "A timeless silhouette in Italian wool with structured shoulders and a single-button closure.",
    category: "outerwear",
    style: "minimalist",
  },
  {
    id: 2,
    name: "High-Rise Straight Jeans",
    brand: "Everlane",
    price: 98,
    image: "/placeholder.svg",
    description: "Classic straight-leg jeans with a flattering high rise in organic cotton denim.",
    category: "bottoms",
    style: "minimalist",
  },
  {
    id: 3,
    name: "Silk Button-Up Shirt",
    brand: "Cuyana",
    price: 150,
    image: "/placeholder.svg",
    description: "Luxurious silk blouse with a relaxed fit and classic collar in an ivory shade.",
    category: "tops",
    style: "classic",
  },
  {
    id: 4,
    name: "Cashmere V-Neck Sweater",
    brand: "Naadam",
    price: 165,
    image: "/placeholder.svg",
    description: "Soft, lightweight Mongolian cashmere in a versatile v-neck silhouette.",
    category: "knitwear",
    style: "classic",
  },
  {
    id: 5,
    name: "Leather Ankle Boots",
    brand: "Dear Frances",
    price: 450,
    image: "/placeholder.svg",
    description: "Handcrafted Italian leather boots with a subtle stacked heel and almond toe.",
    category: "shoes",
    style: "minimalist",
  },
  {
    id: 6,
    name: "Oversized Cotton Shirt",
    brand: "COS",
    price: 89,
    image: "/placeholder.svg",
    description: "A relaxed, boxy silhouette in crisp organic cotton with a concealed placket.",
    category: "tops",
    style: "minimalist",
  },
];
