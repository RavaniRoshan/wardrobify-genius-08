
// Style categories
export const styleCategories = [
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Clean lines, neutral colors, and simple silhouettes.",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
  },
  {
    id: "classic",
    name: "Classic",
    description: "Timeless pieces with structured shapes and refined details.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  },
  {
    id: "bohemian",
    name: "Bohemian",
    description: "Free-spirited looks with flowing fabrics and artisanal details.",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
  },
  {
    id: "streetwear",
    name: "Streetwear",
    description: "Urban-inspired casual wear with bold graphics and oversized fits.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
  },
  {
    id: "preppy",
    name: "Preppy",
    description: "Polished, collegiate-inspired pieces with crisp details.",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
  },
  {
    id: "avant-garde",
    name: "Avant-Garde",
    description: "Experimental silhouettes and unconventional combinations.",
    image: "https://images.unsplash.com/photo-1458668383970-8ddd3927deed",
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
