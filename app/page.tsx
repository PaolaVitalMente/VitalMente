"use client"

import { createClient } from "@supabase/supabase-js"

// ✅ CORRECCIÓN: Reemplazamos los imports problemáticos con HTML + Tailwind CSS
// Iconos simples como emojis en lugar de lucide-react
const Icons = {
  Home: () => "🏠",
  UtensilsCrossed: () => "🍽️",
  Activity: () => "💪",
  Brain: () => "🧠",
  ChevronLeft: () => "◀️",
  ChevronRight: () => "▶️",
  Lightbulb: () => "💡",
  Droplets: () => "💧",
  Plus: () => "+",
  Minus: () => "-",
  RotateCcw: () => "🔄",
  X: () => "✖️",
  ExternalLink: () => "🔗",
  Edit: () => "✏️",
  Trash2: () => "🗑️",
  LogOut: () => "🚪",
  Users: () => "👥",
  MessageSquare: () => "💬",
  Link: () => "🔗",
  ChefHat: () => "👨‍🍳",
  Globe: () => "🌍",
  Eye: () => "👁️",
  Phone: () => "📞",
  UserPlus: () => "👤+",
  Calendar: () => "📅",
  Package: () => "📦",
  Loader2: () => "⏳",
  Calculator: () => "🧮",
  CheckCircle: () => "✅",
  AlertCircle: () => "⚠️",
  BarChart: () => "📊",
  TrendingUp: () => "📈",
  Target: () => "🎯",
  Play: () => "▶️",
  Save: () => "💾",
  Search: () => "🔍",
  Filter: () => "🔽",
  Star: () => "⭐",
  Heart: () => "❤️",
  Coffee: () => "☕",
  Milk: () => "🥛",
  Nut: () => "🥜",
  Cookie: () => "🍪",
  Blender: () => "🥤",
}

// ============================================================================
// CONFIGURACIÓN DE SUPABASE REAL
// ============================================================================
const SUPABASE_URL = "https://frzyksfceugddjrerxkf.supabase.co"
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyenlrc2ZjZXVnZGRqcmVyeGtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3MzgwMTUsImV4cCI6MjA2NzMxNDAxNX0.E6ZjfC6RJoA98RkDK-I87k2l3d7naK9C-mEC0alH7L8"

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// ============================================================================
// TIPOS Y DATOS INICIALES EXPANDIDOS
// ============================================================================
interface UserProfile {
  id: string
  phone: string
  access_code: string
  name: string
  age: number
  weight: number
  height: number
  activity_level: number
  goal: string
  created_at: string
  last_login: string
}

interface DailyProgress {
  id: string
  user_id: string
  date: string
  water: number
  exercise: number
  mindfulness: number
  desayuno: number
  almuerzo: number
  cena: number
}

interface UserFood {
  id: string
  user_id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fats: number
  category: "desayuno" | "almuerzo" | "cena" | "snack"
  created_at: string
}

interface GlobalFood {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fats: number
  category: string
  subcategory?: string
  common_portion_size: number
  common_portion_name: string
  is_active: boolean
  created_at: string
}

interface ExerciseRoutine {
  id: string
  name: string
  description: string
  category: "tren_superior" | "tren_inferior" | "cardio" | "abdomen" | "gluteo" | "pierna"
  duration_minutes: number
  difficulty: "principiante" | "intermedio" | "avanzado"
  youtube_url: string
  thumbnail_url: string
  instructions: string[]
  equipment_needed: string[]
  calories_burned: number
  is_active: boolean
  created_at: string
}

interface UsageMetrics {
  id: string
  user_id: string
  date: string
  session_duration: number
  features_used: string[]
  goals_completed: number
  most_used_tab: string
  created_at: string
}

interface AIRecommendation {
  id: string
  user_id: string
  recommendation_type: "supplement" | "exercise" | "nutrition"
  title: string
  description: string
  confidence_score: number
  based_on_data: string[]
  created_at: string
}

interface CustomSmoothie {
  id: string
  user_id: string
  name: string
  ingredients: {
    food_id: string
    food_name: string
    quantity_grams: number
  }[]
  total_calories: number
  total_protein: number
  total_carbs: number
  total_fats: number
  is_favorite: boolean
  created_at: string
}

interface MealComposition {
  id: string
  user_id: string
  date: string
  meal_type: "desayuno" | "almuerzo" | "cena"
  food_id: string
  food_name: string
  quantity_grams: number
  calories_consumed: number
  protein_consumed: number
  carbs_consumed: number
  fats_consumed: number
  created_at: string
}

interface GlobalTip {
  id: string
  category: string
  title: string
  content: string
  icon: string
  is_active: boolean
  created_at: string
}

interface GlobalResource {
  id: string
  type: "mindfulness" | "nutrition"
  title: string
  description: string
  url: string
  is_active: boolean
  created_at: string
}

interface Supplement {
  id: string
  name: string
  description: string
  benefits: string[]
  price: number
  image_url: string
  is_active: boolean
  whatsapp_message?: string
  category?: string
  stock_quantity?: number
  created_at: string
}

interface MacroResult {
  calories: number
  protein: number
  carbs: number
  fats: number
  goalType: string
  goalLabel: string
}

interface ConsumedMacros {
  calories: number
  protein: number
  carbs: number
  fats: number
}

const ACTIVITY_LEVELS = [
  { value: 1.2, label: "Sedentario", desc: "Poco ejercicio" },
  { value: 1.375, label: "Ligero", desc: "1-3 días/semana" },
  { value: 1.55, label: "Moderado", desc: "3-5 días/semana" },
  { value: 1.725, label: "Activo", desc: "6-7 días/semana" },
  { value: 1.9, label: "Muy Activo", desc: "Ejercicio intenso diario" },
]

const GOALS = [
  // Objetivos Físicos
  { id: "lose", label: "💪 Perder peso", protein: 30, carbs: 35, fats: 35, calAdjust: -0.2, type: "physical" },
  { id: "maintain", label: "⚖️ Mantener peso", protein: 25, carbs: 45, fats: 30, calAdjust: 0, type: "physical" },
  { id: "gain", label: "🏋️ Ganar músculo", protein: 30, carbs: 40, fats: 30, calAdjust: 0.15, type: "physical" },

  // Objetivos Emocionales
  { id: "feel_good", label: "✨ Sentirse bien", protein: 25, carbs: 45, fats: 30, calAdjust: 0, type: "emotional" },
  { id: "find_calm", label: "🧘 Buscar calma", protein: 25, carbs: 45, fats: 30, calAdjust: 0, type: "emotional" },
  { id: "balance", label: "⚡ Equilibrio", protein: 25, carbs: 45, fats: 30, calAdjust: 0, type: "emotional" },
  {
    id: "vitalmente",
    label: "🌟 Sentirme VitalMente",
    protein: 25,
    carbs: 45,
    fats: 30,
    calAdjust: 0,
    type: "emotional",
  },
]

// 🆕 CATEGORÍAS DE EJERCICIOS
const EXERCISE_CATEGORIES = [
  { id: "tren_superior", name: "Tren Superior", icon: "💪", color: "bg-red-500" },
  { id: "tren_inferior", name: "Tren Inferior", icon: "🦵", color: "bg-blue-500" },
  { id: "cardio", name: "Cardio", icon: "❤️", color: "bg-green-500" },
  { id: "abdomen", name: "Abdomen", icon: "🔥", color: "bg-orange-500" },
  { id: "gluteo", name: "Glúteo", icon: "🍑", color: "bg-purple-500" },
  { id: "pierna", name: "Pierna", icon: "🏃", color: "bg-indigo-500" },
]

// 🆕 BANCO DE ALIMENTOS EXPANDIDO A 100 ALIMENTOS
const EXPANDED_GLOBAL_FOODS = [
  // PROTEÍNAS (20 alimentos)
  {
    name: "Pollo pechuga",
    calories: 165,
    protein: 31,
    carbs: 0,
    fats: 3.6,
    category: "proteinas",
    subcategory: "carnes",
  },
  {
    name: "Carne res magra",
    calories: 250,
    protein: 26,
    carbs: 0,
    fats: 15,
    category: "proteinas",
    subcategory: "carnes",
  },
  { name: "Salmón", calories: 208, protein: 20, carbs: 0, fats: 13, category: "proteinas", subcategory: "pescados" },
  {
    name: "Atún en agua",
    calories: 132,
    protein: 28,
    carbs: 0,
    fats: 1.3,
    category: "proteinas",
    subcategory: "pescados",
  },
  {
    name: "Huevos enteros",
    calories: 155,
    protein: 13,
    carbs: 1.1,
    fats: 11,
    category: "proteinas",
    subcategory: "huevos",
  },
  {
    name: "Clara de huevo",
    calories: 52,
    protein: 11,
    carbs: 0.7,
    fats: 0.2,
    category: "proteinas",
    subcategory: "huevos",
  },
  {
    name: "Yogurt griego",
    calories: 59,
    protein: 10,
    carbs: 3.6,
    fats: 0.4,
    category: "proteinas",
    subcategory: "lacteos",
  },
  {
    name: "Queso cottage",
    calories: 98,
    protein: 11,
    carbs: 3.4,
    fats: 4.3,
    category: "proteinas",
    subcategory: "lacteos",
  },
  { name: "Tofu", calories: 76, protein: 8, carbs: 1.9, fats: 4.8, category: "proteinas", subcategory: "vegetales" },
  {
    name: "Lentejas cocidas",
    calories: 116,
    protein: 9,
    carbs: 20,
    fats: 0.4,
    category: "proteinas",
    subcategory: "legumbres",
  },
  {
    name: "Garbanzos cocidos",
    calories: 164,
    protein: 8.9,
    carbs: 27,
    fats: 2.6,
    category: "proteinas",
    subcategory: "legumbres",
  },
  {
    name: "Frijoles negros",
    calories: 132,
    protein: 8.9,
    carbs: 23,
    fats: 0.5,
    category: "proteinas",
    subcategory: "legumbres",
  },
  {
    name: "Quinoa cocida",
    calories: 120,
    protein: 4.4,
    carbs: 22,
    fats: 1.9,
    category: "proteinas",
    subcategory: "granos",
  },
  { name: "Pavo pechuga", calories: 135, protein: 30, carbs: 0, fats: 1, category: "proteinas", subcategory: "carnes" },
  { name: "Cerdo lomo", calories: 143, protein: 26, carbs: 0, fats: 3.5, category: "proteinas", subcategory: "carnes" },
  {
    name: "Camarones",
    calories: 99,
    protein: 18,
    carbs: 0.9,
    fats: 1.7,
    category: "proteinas",
    subcategory: "mariscos",
  },
  {
    name: "Proteína whey",
    calories: 103,
    protein: 20,
    carbs: 3.5,
    fats: 1.9,
    category: "proteinas",
    subcategory: "suplementos",
  },
  { name: "Tempeh", calories: 193, protein: 19, carbs: 9, fats: 11, category: "proteinas", subcategory: "vegetales" },
  { name: "Seitan", calories: 370, protein: 75, carbs: 14, fats: 1.9, category: "proteinas", subcategory: "vegetales" },
  { name: "Ricotta", calories: 174, protein: 11, carbs: 3, fats: 13, category: "proteinas", subcategory: "lacteos" },

  // VEGETALES (20 alimentos)
  {
    name: "Espinacas",
    calories: 23,
    protein: 2.9,
    carbs: 3.6,
    fats: 0.4,
    category: "vegetales",
    subcategory: "hojas_verdes",
  },
  {
    name: "Brócoli",
    calories: 34,
    protein: 2.8,
    carbs: 7,
    fats: 0.4,
    category: "vegetales",
    subcategory: "cruciferas",
  },
  {
    name: "Lechuga",
    calories: 15,
    protein: 1.4,
    carbs: 2.9,
    fats: 0.2,
    category: "vegetales",
    subcategory: "hojas_verdes",
  },
  { name: "Tomate", calories: 18, protein: 0.9, carbs: 3.9, fats: 0.2, category: "vegetales", subcategory: "frutos" },
  { name: "Pepino", calories: 16, protein: 0.7, carbs: 4, fats: 0.1, category: "vegetales", subcategory: "frutos" },
  { name: "Zanahoria", calories: 41, protein: 0.9, carbs: 10, fats: 0.2, category: "vegetales", subcategory: "raices" },
  { name: "Cebolla", calories: 40, protein: 1.1, carbs: 9.3, fats: 0.1, category: "vegetales", subcategory: "bulbos" },
  {
    name: "Pimiento rojo",
    calories: 31,
    protein: 1,
    carbs: 7,
    fats: 0.3,
    category: "vegetales",
    subcategory: "frutos",
  },
  { name: "Apio", calories: 16, protein: 0.7, carbs: 3, fats: 0.2, category: "vegetales", subcategory: "tallos" },
  {
    name: "Coliflor",
    calories: 25,
    protein: 1.9,
    carbs: 5,
    fats: 0.3,
    category: "vegetales",
    subcategory: "cruciferas",
  },
  {
    name: "Calabacín",
    calories: 17,
    protein: 1.2,
    carbs: 3.1,
    fats: 0.3,
    category: "vegetales",
    subcategory: "calabazas",
  },
  { name: "Berenjena", calories: 25, protein: 1, carbs: 6, fats: 0.2, category: "vegetales", subcategory: "frutos" },
  {
    name: "Champiñones",
    calories: 22,
    protein: 3.1,
    carbs: 3.3,
    fats: 0.3,
    category: "vegetales",
    subcategory: "hongos",
  },
  {
    name: "Espárragos",
    calories: 20,
    protein: 2.2,
    carbs: 3.9,
    fats: 0.1,
    category: "vegetales",
    subcategory: "tallos",
  },
  { name: "Remolacha", calories: 43, protein: 1.6, carbs: 10, fats: 0.2, category: "vegetales", subcategory: "raices" },
  {
    name: "Col rizada",
    calories: 49,
    protein: 4.3,
    carbs: 9,
    fats: 0.9,
    category: "vegetales",
    subcategory: "hojas_verdes",
  },
  {
    name: "Acelgas",
    calories: 19,
    protein: 1.8,
    carbs: 3.7,
    fats: 0.2,
    category: "vegetales",
    subcategory: "hojas_verdes",
  },
  { name: "Rábanos", calories: 16, protein: 0.7, carbs: 3.4, fats: 0.1, category: "vegetales", subcategory: "raices" },
  { name: "Puerro", calories: 61, protein: 1.5, carbs: 14, fats: 0.3, category: "vegetales", subcategory: "bulbos" },
  { name: "Alcachofa", calories: 47, protein: 3.3, carbs: 11, fats: 0.2, category: "vegetales", subcategory: "flores" },

  // FRUTAS (20 alimentos)
  { name: "Manzana", calories: 52, protein: 0.3, carbs: 14, fats: 0.2, category: "frutas", subcategory: "pomaceas" },
  { name: "Plátano", calories: 89, protein: 1.1, carbs: 23, fats: 0.3, category: "frutas", subcategory: "tropicales" },
  { name: "Naranja", calories: 47, protein: 0.9, carbs: 12, fats: 0.1, category: "frutas", subcategory: "citricos" },
  { name: "Fresa", calories: 32, protein: 0.7, carbs: 8, fats: 0.3, category: "frutas", subcategory: "berries" },
  { name: "Uvas", calories: 62, protein: 0.6, carbs: 16, fats: 0.2, category: "frutas", subcategory: "bayas" },
  { name: "Piña", calories: 50, protein: 0.5, carbs: 13, fats: 0.1, category: "frutas", subcategory: "tropicales" },
  { name: "Mango", calories: 60, protein: 0.8, carbs: 15, fats: 0.4, category: "frutas", subcategory: "tropicales" },
  { name: "Pera", calories: 57, protein: 0.4, carbs: 15, fats: 0.1, category: "frutas", subcategory: "pomaceas" },
  { name: "Kiwi", calories: 61, protein: 1.1, carbs: 15, fats: 0.5, category: "frutas", subcategory: "exoticas" },
  { name: "Papaya", calories: 43, protein: 0.5, carbs: 11, fats: 0.3, category: "frutas", subcategory: "tropicales" },
  { name: "Sandía", calories: 30, protein: 0.6, carbs: 8, fats: 0.2, category: "frutas", subcategory: "melones" },
  { name: "Melón", calories: 34, protein: 0.8, carbs: 8, fats: 0.2, category: "frutas", subcategory: "melones" },
  { name: "Durazno", calories: 39, protein: 0.9, carbs: 10, fats: 0.3, category: "frutas", subcategory: "drupas" },
  { name: "Ciruela", calories: 46, protein: 0.7, carbs: 11, fats: 0.3, category: "frutas", subcategory: "drupas" },
  { name: "Arándanos", calories: 57, protein: 0.7, carbs: 14, fats: 0.3, category: "frutas", subcategory: "berries" },
  { name: "Frambuesas", calories: 52, protein: 1.2, carbs: 12, fats: 0.7, category: "frutas", subcategory: "berries" },
  { name: "Moras", calories: 43, protein: 1.4, carbs: 10, fats: 0.5, category: "frutas", subcategory: "berries" },
  { name: "Cereza", calories: 63, protein: 1.1, carbs: 16, fats: 0.2, category: "frutas", subcategory: "drupas" },
  { name: "Limón", calories: 29, protein: 1.1, carbs: 9, fats: 0.3, category: "frutas", subcategory: "citricos" },
  { name: "Aguacate", calories: 160, protein: 2, carbs: 9, fats: 15, category: "frutas", subcategory: "grasas" },

  // CARBOHIDRATOS (20 alimentos)
  {
    name: "Arroz blanco cocido",
    calories: 130,
    protein: 2.7,
    carbs: 28,
    fats: 0.3,
    category: "carbohidratos",
    subcategory: "cereales",
  },
  {
    name: "Arroz integral cocido",
    calories: 111,
    protein: 2.6,
    carbs: 23,
    fats: 0.9,
    category: "carbohidratos",
    subcategory: "cereales",
  },
  {
    name: "Pasta cocida",
    calories: 131,
    protein: 5,
    carbs: 25,
    fats: 1.1,
    category: "carbohidratos",
    subcategory: "cereales",
  },
  {
    name: "Pan integral",
    calories: 247,
    protein: 13,
    carbs: 41,
    fats: 4.2,
    category: "carbohidratos",
    subcategory: "panes",
  },
  {
    name: "Pan blanco",
    calories: 265,
    protein: 9,
    carbs: 49,
    fats: 3.2,
    category: "carbohidratos",
    subcategory: "panes",
  },
  { name: "Avena", calories: 389, protein: 17, carbs: 66, fats: 7, category: "carbohidratos", subcategory: "cereales" },
  {
    name: "Papa cocida",
    calories: 77,
    protein: 2,
    carbs: 17,
    fats: 0.1,
    category: "carbohidratos",
    subcategory: "tuberculos",
  },
  {
    name: "Batata cocida",
    calories: 86,
    protein: 1.6,
    carbs: 20,
    fats: 0.1,
    category: "carbohidratos",
    subcategory: "tuberculos",
  },
  {
    name: "Yuca cocida",
    calories: 160,
    protein: 1.4,
    carbs: 38,
    fats: 0.3,
    category: "carbohidratos",
    subcategory: "tuberculos",
  },
  {
    name: "Plátano verde cocido",
    calories: 122,
    protein: 1.3,
    carbs: 32,
    fats: 0.4,
    category: "carbohidratos",
    subcategory: "platanos",
  },
  {
    name: "Maíz cocido",
    calories: 96,
    protein: 3.4,
    carbs: 21,
    fats: 1.5,
    category: "carbohidratos",
    subcategory: "cereales",
  },
  {
    name: "Cebada cocida",
    calories: 123,
    protein: 2.3,
    carbs: 28,
    fats: 0.4,
    category: "carbohidratos",
    subcategory: "cereales",
  },
  {
    name: "Trigo sarraceno",
    calories: 343,
    protein: 13,
    carbs: 72,
    fats: 3.4,
    category: "carbohidratos",
    subcategory: "pseudocereales",
  },
  {
    name: "Mijo cocido",
    calories: 119,
    protein: 3.5,
    carbs: 23,
    fats: 1,
    category: "carbohidratos",
    subcategory: "cereales",
  },
  {
    name: "Amaranto cocido",
    calories: 102,
    protein: 4,
    carbs: 19,
    fats: 1.6,
    category: "carbohidratos",
    subcategory: "pseudocereales",
  },
  {
    name: "Tortilla maíz",
    calories: 218,
    protein: 5.7,
    carbs: 45,
    fats: 2.9,
    category: "carbohidratos",
    subcategory: "tortillas",
  },
  {
    name: "Tortilla trigo",
    calories: 304,
    protein: 8.2,
    carbs: 51,
    fats: 7.3,
    category: "carbohidratos",
    subcategory: "tortillas",
  },
  {
    name: "Galletas integrales",
    calories: 451,
    protein: 7.5,
    carbs: 71,
    fats: 16,
    category: "carbohidratos",
    subcategory: "galletas",
  },
  {
    name: "Granola",
    calories: 471,
    protein: 13,
    carbs: 61,
    fats: 20,
    category: "carbohidratos",
    subcategory: "cereales",
  },
  {
    name: "Cereales integrales",
    calories: 379,
    protein: 8,
    carbs: 84,
    fats: 2.7,
    category: "carbohidratos",
    subcategory: "cereales",
  },

  // 🆕 BEBIDAS (10 alimentos)
  {
    name: "Leche entera",
    calories: 61,
    protein: 3.2,
    carbs: 4.8,
    fats: 3.3,
    category: "bebidas",
    subcategory: "leches",
  },
  {
    name: "Leche descremada",
    calories: 34,
    protein: 3.4,
    carbs: 5,
    fats: 0.1,
    category: "bebidas",
    subcategory: "leches",
  },
  {
    name: "Leche almendras",
    calories: 17,
    protein: 0.6,
    carbs: 1.5,
    fats: 1.2,
    category: "bebidas",
    subcategory: "leches_vegetales",
  },
  {
    name: "Leche coco",
    calories: 230,
    protein: 2.3,
    carbs: 6,
    fats: 24,
    category: "bebidas",
    subcategory: "leches_vegetales",
  },
  { name: "Café negro", calories: 2, protein: 0.3, carbs: 0, fats: 0, category: "bebidas", subcategory: "cafes" },
  { name: "Cappuccino", calories: 74, protein: 4, carbs: 6.5, fats: 4, category: "bebidas", subcategory: "cafes" },
  { name: "Latte", calories: 103, protein: 6, carbs: 9, fats: 4, category: "bebidas", subcategory: "cafes" },
  { name: "Mocha", calories: 129, protein: 8, carbs: 12, fats: 5, category: "bebidas", subcategory: "cafes" },
  { name: "Frappé", calories: 180, protein: 4, carbs: 28, fats: 6, category: "bebidas", subcategory: "cafes_frios" },
  { name: "Té verde", calories: 2, protein: 0.2, carbs: 0, fats: 0, category: "bebidas", subcategory: "tes" },

  // 🆕 FRUTOS SECOS (5 alimentos)
  {
    name: "Almendras",
    calories: 579,
    protein: 21,
    carbs: 22,
    fats: 50,
    category: "frutos_secos",
    subcategory: "nueces",
  },
  { name: "Nueces", calories: 654, protein: 15, carbs: 14, fats: 65, category: "frutos_secos", subcategory: "nueces" },
  {
    name: "Pistachos",
    calories: 560,
    protein: 20,
    carbs: 28,
    fats: 45,
    category: "frutos_secos",
    subcategory: "nueces",
  },
  {
    name: "Cacahuates",
    calories: 567,
    protein: 26,
    carbs: 16,
    fats: 49,
    category: "frutos_secos",
    subcategory: "legumbres",
  },
  {
    name: "Avellanas",
    calories: 628,
    protein: 15,
    carbs: 17,
    fats: 61,
    category: "frutos_secos",
    subcategory: "nueces",
  },

  // 🆕 SNACKS (5 alimentos)
  {
    name: "Yogurt natural",
    calories: 61,
    protein: 3.5,
    carbs: 4.7,
    fats: 3.3,
    category: "snacks",
    subcategory: "lacteos",
  },
  {
    name: "Barrita proteína",
    calories: 140,
    protein: 10,
    carbs: 15,
    fats: 5,
    category: "snacks",
    subcategory: "barritas",
  },
  { name: "Hummus", calories: 166, protein: 8, carbs: 14, fats: 10, category: "snacks", subcategory: "dips" },
  {
    name: "Palomitas naturales",
    calories: 387,
    protein: 12,
    carbs: 78,
    fats: 5,
    category: "snacks",
    subcategory: "cereales",
  },
  { name: "Mix frutos secos", calories: 607, protein: 18, carbs: 20, fats: 54, category: "snacks", subcategory: "mix" },
]

// ============================================================================
// FUNCIONES DE BASE DE DATOS EXPANDIDAS
// ============================================================================
const dbFunctions = {
  // Funciones existentes mantenidas...
  async findUserByPhone(phone: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase.from("users").select("*").eq("phone", phone).single()

      if (error) {
        console.log("Usuario no encontrado:", error.message)
        return null
      }
      return data as UserProfile
    } catch (error) {
      console.error("Error finding user:", error)
      return null
    }
  },

  async createUser(userData: Omit<UserProfile, "id" | "created_at" | "last_login">): Promise<UserProfile> {
    const { data, error } = await supabase
      .from("users")
      .insert({
        ...userData,
        last_login: new Date().toISOString(),
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw new Error(error.message)
    return data as UserProfile
  },

  async updateUserLastLogin(userId: string): Promise<void> {
    try {
      await supabase.from("users").update({ last_login: new Date().toISOString() }).eq("id", userId)
    } catch (error) {
      console.error("Error updating last login:", error)
    }
  },

  async getTodayProgress(userId: string): Promise<DailyProgress | null> {
    try {
      const today = new Date().toISOString().split("T")[0]
      console.log("🔍 Cargando progreso para:", userId, "fecha:", today)

      const { data, error } = await supabase
        .from("daily_progress")
        .select("*")
        .eq("user_id", userId)
        .eq("date", today)
        .single()

      if (error) {
        if (error.code === "PGRST116") {
          console.log("📝 No hay progreso para hoy, se creará uno nuevo")
          return null
        }
        throw error
      }

      console.log("✅ Progreso cargado:", data)
      return data as DailyProgress
    } catch (error) {
      console.error("❌ Error loading today progress:", error)
      return null
    }
  },

  async saveProgress(userId: string, progress: Omit<DailyProgress, "id" | "user_id" | "date">): Promise<boolean> {
    try {
      const today = new Date().toISOString().split("T")[0]

      console.log("💾 Guardando progreso:", {
        user_id: userId,
        date: today,
        ...progress,
      })

      const { data, error } = await supabase
        .from("daily_progress")
        .upsert(
          {
            user_id: userId,
            date: today,
            ...progress,
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: "user_id,date",
            ignoreDuplicates: false,
          },
        )
        .select()

      if (error) {
        console.error("❌ Error guardando progreso:", error)
        throw error
      }

      console.log("✅ Progreso guardado exitosamente:", data)
      return true
    } catch (error) {
      console.error("❌ Error en saveProgress:", error)
      return false
    }
  },

  async verifyProgressSaved(userId: string, expectedData: any): Promise<boolean> {
    try {
      const today = new Date().toISOString().split("T")[0]
      const { data, error } = await supabase
        .from("daily_progress")
        .select("*")
        .eq("user_id", userId)
        .eq("date", today)
        .single()

      if (error || !data) return false

      const matches =
        data.water === expectedData.water &&
        data.exercise === expectedData.exercise &&
        data.mindfulness === expectedData.mindfulness &&
        data.desayuno === expectedData.desayuno &&
        data.almuerzo === expectedData.almuerzo &&
        data.cena === expectedData.cena

      console.log("🔍 Verificación de datos:", {
        guardado: data,
        esperado: expectedData,
        coincide: matches,
      })

      return matches
    } catch (error) {
      console.error("Error verificando progreso:", error)
      return false
    }
  },

  async getProgressHistory(userId: string, days = 7): Promise<DailyProgress[]> {
    try {
      const { data, error } = await supabase
        .from("daily_progress")
        .select("*")
        .eq("user_id", userId)
        .order("date", { ascending: false })
        .limit(days)

      if (error) throw error
      return data as DailyProgress[]
    } catch (error) {
      console.error("Error loading progress history:", error)
      return []
    }
  },

  async getUserFoods(userId: string): Promise<UserFood[]> {
    try {
      const { data, error } = await supabase.from("user_foods").select("*").eq("user_id", userId)

      if (error) throw error
      return data as UserFood[]
    } catch (error) {
      console.error("Error loading user foods:", error)
      return []
    }
  },

  async getGlobalFoods(): Promise<GlobalFood[]> {
    try {
      const { data, error } = await supabase
        .from("global_foods")
        .select("*")
        .eq("is_active", true)
        .order("category", { ascending: true })
        .order("name", { ascending: true })

      if (error) throw error
      console.log("✅ Alimentos globales cargados:", data?.length || 0)
      return data as GlobalFood[]
    } catch (error) {
      console.error("Error loading global foods:", error)
      return []
    }
  },

  async addUserFood(food: Omit<UserFood, "id" | "created_at">): Promise<UserFood> {
    const { data, error } = await supabase
      .from("user_foods")
      .insert({
        ...food,
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw new Error(error.message)
    return data as UserFood
  },

  async getTodayMealCompositions(userId: string): Promise<MealComposition[]> {
    try {
      const today = new Date().toISOString().split("T")[0]
      console.log("🔍 Cargando comidas para:", userId, "fecha:", today)

      const { data, error } = await supabase
        .from("meal_compositions")
        .select("*")
        .eq("user_id", userId)
        .eq("date", today)
        .order("created_at", { ascending: true })

      if (error) throw error

      console.log("✅ Comidas cargadas:", data?.length || 0)
      return data as MealComposition[]
    } catch (error) {
      console.error("Error loading meal compositions:", error)
      return []
    }
  },

  async addMealComposition(composition: Omit<MealComposition, "id" | "created_at">): Promise<MealComposition> {
    try {
      console.log("💾 Guardando composición de comida:", composition)

      const { data, error } = await supabase
        .from("meal_compositions")
        .insert({
          ...composition,
          created_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (error) throw error

      console.log("✅ Composición guardada:", data)
      return data as MealComposition
    } catch (error) {
      console.error("Error adding meal composition:", error)
      throw error
    }
  },

  async deleteMealComposition(id: string): Promise<void> {
    try {
      const { error } = await supabase.from("meal_compositions").delete().eq("id", id)

      if (error) throw error
      console.log("✅ Composición eliminada:", id)
    } catch (error) {
      console.error("Error deleting meal composition:", error)
      throw error
    }
  },

  // 🆕 NUEVAS FUNCIONES PARA RUTINAS DE EJERCICIO
  async getExerciseRoutines(): Promise<ExerciseRoutine[]> {
    try {
      const { data, error } = await supabase
        .from("exercise_routines")
        .select("*")
        .eq("is_active", true)
        .order("category", { ascending: true })
        .order("name", { ascending: true })

      if (error) throw error
      return data as ExerciseRoutine[]
    } catch (error) {
      console.error("Error loading exercise routines:", error)
      return []
    }
  },

  async getAllExerciseRoutines(): Promise<ExerciseRoutine[]> {
    try {
      const { data, error } = await supabase
        .from("exercise_routines")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      return data as ExerciseRoutine[]
    } catch (error) {
      console.error("Error loading all exercise routines:", error)
      return []
    }
  },

  async addExerciseRoutine(routine: Omit<ExerciseRoutine, "id" | "created_at">): Promise<ExerciseRoutine> {
    try {
      const { data, error } = await supabase
        .from("exercise_routines")
        .insert({
          ...routine,
          created_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (error) throw error
      return data as ExerciseRoutine
    } catch (error) {
      console.error("Error adding exercise routine:", error)
      throw error
    }
  },

  async updateExerciseRoutine(id: string, updates: Partial<ExerciseRoutine>): Promise<void> {
    try {
      const { error } = await supabase
        .from("exercise_routines")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)

      if (error) throw error
    } catch (error) {
      console.error("Error updating exercise routine:", error)
      throw error
    }
  },

  async deleteExerciseRoutine(id: string): Promise<void> {
    try {
      const { error } = await supabase.from("exercise_routines").delete().eq("id", id)

      if (error) throw error
    } catch (error) {
      console.error("Error deleting exercise routine:", error)
      throw error
    }
  },

  // 🆕 NUEVAS FUNCIONES PARA MÉTRICAS Y IA
  async saveUsageMetrics(
    userId: string,
    metrics: Omit<UsageMetrics, "id" | "user_id" | "date" | "created_at">,
  ): Promise<void> {
    try {
      const today = new Date().toISOString().split("T")[0]

      const { error } = await supabase.from("usage_metrics").upsert(
        {
          user_id: userId,
          date: today,
          ...metrics,
          created_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id,date",
        },
      )

      if (error) throw error
    } catch (error) {
      console.error("Error saving usage metrics:", error)
    }
  },

  async getUsageAnalytics(): Promise<any> {
    try {
      const { data: users, error: usersError } = await supabase.from("users").select("*")

      const { data: progress, error: progressError } = await supabase
        .from("daily_progress")
        .select("*")
        .gte("date", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0])

      const { data: metrics, error: metricsError } = await supabase
        .from("usage_metrics")
        .select("*")
        .gte("date", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0])

      if (usersError || progressError || metricsError) {
        throw new Error("Error loading analytics data")
      }

      return {
        totalUsers: users?.length || 0,
        activeUsers: new Set(progress?.map((p) => p.user_id)).size || 0,
        avgSessionDuration: metrics?.reduce((acc, m) => acc + m.session_duration, 0) / (metrics?.length || 1) || 0,
        mostUsedFeatures: this.calculateMostUsedFeatures(metrics || []),
        userGoalsDistribution: this.calculateGoalsDistribution(users || []),
        dailyActiveUsers: this.calculateDailyActiveUsers(progress || []),
      }
    } catch (error) {
      console.error("Error getting usage analytics:", error)
      return {
        totalUsers: 0,
        activeUsers: 0,
        avgSessionDuration: 0,
        mostUsedFeatures: [],
        userGoalsDistribution: {},
        dailyActiveUsers: [],
      }
    }
  },

  calculateMostUsedFeatures(metrics: UsageMetrics[]): { feature: string; count: number }[] {
    const featureCount: { [key: string]: number } = {}

    metrics.forEach((metric) => {
      metric.features_used.forEach((feature) => {
        featureCount[feature] = (featureCount[feature] || 0) + 1
      })
    })

    return Object.entries(featureCount)
      .map(([feature, count]) => ({ feature, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
  },

  calculateGoalsDistribution(users: UserProfile[]): { [key: string]: number } {
    const goalCount: { [key: string]: number } = {}

    users.forEach((user) => {
      goalCount[user.goal] = (goalCount[user.goal] || 0) + 1
    })

    return goalCount
  },

  calculateDailyActiveUsers(progress: DailyProgress[]): { date: string; count: number }[] {
    const dailyCount: { [key: string]: Set<string> } = {}

    progress.forEach((p) => {
      if (!dailyCount[p.date]) {
        dailyCount[p.date] = new Set()
      }
      dailyCount[p.date].add(p.user_id)
    })

    return Object.entries(dailyCount)
      .map(([date, userSet]) => ({ date, count: userSet.size }))
      .sort((a, b) => a.date.localeCompare(b.date))
  },

  // 🆕 FUNCIONES PARA BATIDOS PERSONALIZADOS
  async getUserSmoothies(userId: string): Promise<CustomSmoothie[]> {
    try {
      const { data, error } = await supabase
        .from("custom_smoothies")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })

      if (error) throw error
      return data as CustomSmoothie[]
    } catch (error) {
      console.error("Error loading user smoothies:", error)
      return []
    }
  },

  async addCustomSmoothie(smoothie: Omit<CustomSmoothie, "id" | "created_at">): Promise<CustomSmoothie> {
    try {
      const { data, error } = await supabase
        .from("custom_smoothies")
        .insert({
          ...smoothie,
          created_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (error) throw error
      return data as CustomSmoothie
    } catch (error) {
      console.error("Error adding custom smoothie:", error)
      throw error
    }
  },

  async deleteCustomSmoothie(id: string): Promise<void> {
    try {
      const { error } = await supabase.from("custom_smoothies").delete().eq("id", id)

      if (error) throw error
    } catch (error) {
      console.error("Error deleting custom smoothie:", error)
      throw error
    }
  },

  // Funciones existentes mantenidas...
  async getActiveTips(): Promise<GlobalTip[]> {
    const { data, error } = await supabase.from("global_tips").select("*").eq("is_active", true)

    if (error) return []
    return data as GlobalTip[]
  },

  async getAllTips(): Promise<GlobalTip[]> {
    const { data, error } = await supabase.from("global_tips").select("*")

    if (error) return []
    return data as GlobalTip[]
  },

  async addTip(tip: Omit<GlobalTip, "id" | "created_at">): Promise<GlobalTip> {
    const { data, error } = await supabase
      .from("global_tips")
      .insert({
        ...tip,
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw new Error(error.message)
    return data as GlobalTip
  },

  async updateTip(id: string, updates: Partial<GlobalTip>): Promise<void> {
    await supabase
      .from("global_tips")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
  },

  async deleteTip(id: string): Promise<void> {
    await supabase.from("global_tips").delete().eq("id", id)
  },

  async getActiveResources(): Promise<GlobalResource[]> {
    const { data, error } = await supabase.from("global_resources").select("*").eq("is_active", true)

    if (error) return []
    return data as GlobalResource[]
  },

  async getAllResources(): Promise<GlobalResource[]> {
    const { data, error } = await supabase.from("global_resources").select("*")

    if (error) return []
    return data as GlobalResource[]
  },

  async addResource(resource: Omit<GlobalResource, "id" | "created_at">): Promise<GlobalResource> {
    const { data, error } = await supabase
      .from("global_resources")
      .insert({
        ...resource,
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw new Error(error.message)
    return data as GlobalResource
  },

  async deleteResource(id: string): Promise<void> {
    await supabase.from("global_resources").delete().eq("id", id)
  },

  async getActiveSupplements(): Promise<Supplement[]> {
    const { data, error } = await supabase.from("supplements").select("*").eq("is_active", true)

    if (error) return []
    return (data || []).map((item: any) => ({
      ...item,
      benefits: item.benefits ? item.benefits.split(",") : [],
    })) as Supplement[]
  },

  async getAllSupplements(): Promise<Supplement[]> {
    const { data, error } = await supabase.from("supplements").select("*")

    if (error) return []
    return (data || []).map((item: any) => ({
      ...item,
      benefits: item.benefits ? item.benefits.split(",") : [],
    })) as Supplement[]
  },

  async addSupplement(supplement: Omit<Supplement, "id" | "created_at">): Promise<Supplement> {
    const { data, error } = await supabase
      .from("supplements")
      .insert({
        ...supplement,
        benefits: supplement.benefits.join(","),
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw new Error(error.message)
    return { ...data, benefits: data.benefits ? data.benefits.split(",") : [] } as Supplement
  },

  async updateSupplement(id: string, updates: Partial<Supplement>): Promise<void> {
    const updateData: any = {
      ...updates,
      updated_at: new Date().toISOString(),
    }
    if (updates.benefits) {
      updateData.benefits = updates.benefits.join(",")
    }
    await supabase.from("supplements").update(updateData).eq("id", id)
  },

  async deleteSupplement(id: string): Promise<void> {
    await supabase.from("supplements").delete().eq("id", id)
  },

  async getStats() {
    const today = new Date().toISOString().split("T")[0]
    const [users, dailyProgress] = await Promise.all([
      supabase.from("users").select("*"),
      supabase.from("daily_progress").select("*").eq("date", today),
    ])

    return {
      totalUsers: users.data?.length || 0,
      activeToday: dailyProgress.data?.length || 0,
    }
  },

  async initializeDefaultData() {
    try {
      // Inicializar alimentos globales expandidos
      const { data: existingFoods } = await supabase.from("global_foods").select("*")

      if (!existingFoods || existingFoods.length < 50) {
        console.log("🍎 Inicializando banco de alimentos expandido...")

        for (const food of EXPANDED_GLOBAL_FOODS) {
          try {
            await supabase.from("global_foods").upsert(
              {
                ...food,
                common_portion_size: 100,
                common_portion_name: "gramos",
                is_active: true,
                created_at: new Date().toISOString(),
              },
              {
                onConflict: "name",
              },
            )
          } catch (error) {
            console.log("Error insertando alimento:", food.name, error)
          }
        }

        console.log("✅ Banco de alimentos expandido inicializado")
      }

      // Verificar si ya hay tips
      const { data: existingTips } = await supabase.from("global_tips").select("*")

      if (!existingTips || existingTips.length === 0) {
        const defaultTips = [
          {
            category: "Hidratación",
            title: "Agua al despertar",
            content:
              "Bebe un vaso de agua tibia con limón al levantarte para activar tu metabolismo y mejorar la digestión.",
            icon: "💧",
            is_active: true,
          },
          {
            category: "Ejercicio",
            title: "Micro movimientos",
            content: "Haz 10 sentadillas cada hora para mantener tu cuerpo activo durante el día laboral.",
            icon: "🏃‍♂️",
            is_active: true,
          },
          {
            category: "Mindfulness",
            title: "Respiración 4-7-8",
            content: "Inhala 4 seg, mantén 7 seg, exhala 8 seg. Repite 4 veces para reducir estrés instantáneamente.",
            icon: "🧘‍♀️",
            is_active: true,
          },
        ]
        for (const tip of defaultTips) {
          await dbFunctions.addTip(tip)
        }
      }

      // Verificar si ya hay recursos
      const { data: existingResources } = await supabase.from("global_resources").select("*")

      if (!existingResources || existingResources.length === 0) {
        const defaultResources = [
          {
            type: "mindfulness" as const,
            title: "Meditación guiada - Calma mental",
            description: "Sesión de 10 minutos para reducir ansiedad",
            url: "https://www.youtube.com/watch?v=ZToicYcHIOU",
            is_active: true,
          },
          {
            type: "nutrition" as const,
            title: "Recetas saludables y fáciles",
            description: "25 recetas balanceadas para toda la semana",
            url: "https://www.habitos.mx/recetas-saludables/",
            is_active: true,
          },
        ]
        for (const resource of defaultResources) {
          await dbFunctions.addResource(resource)
        }
      }

      // Verificar si ya hay suplementos
      const { data: existingSupplements } = await supabase.from("supplements").select("*")

      if (!existingSupplements || existingSupplements.length === 0) {
        const defaultSupplements = [
          {
            name: "VitalEnergy Plus",
            description: "Complejo vitamínico premium para aumentar energía natural y mejorar concentración",
            benefits: ["Aumenta energía", "Mejora concentración", "Reduce fatiga", "Apoya sistema inmune"],
            price: 89000,
            image_url: "/placeholder.svg?height=200&width=200",
            is_active: true,
            category: "energia",
            stock_quantity: 50,
            whatsapp_message:
              "Hola! Me interesa VitalEnergy Plus que vi en VitalMente. ¿Podrían darme más información sobre disponibilidad y forma de pago?",
          },
          {
            name: "RelaxMind Pro",
            description: "Suplemento natural avanzado para reducir estrés, ansiedad y mejorar calidad del sueño",
            benefits: ["Reduce ansiedad", "Mejora sueño", "Calma mental", "Control del estrés"],
            price: 75000,
            image_url: "/placeholder.svg?height=200&width=200",
            is_active: true,
            category: "relajacion",
            stock_quantity: 30,
            whatsapp_message:
              "Hola! Me interesa RelaxMind Pro para mejorar mi descanso. ¿Qué sabores tienen disponibles y cuál es la forma de pago?",
          },
          {
            name: "MusclePro Elite",
            description: "Proteína premium de alta calidad para desarrollo muscular y recuperación rápida",
            benefits: ["Desarrollo muscular", "Recuperación rápida", "Aumenta fuerza", "Proteína completa"],
            price: 120000,
            image_url: "/placeholder.svg?height=200&width=200",
            is_active: true,
            category: "proteina",
            stock_quantity: 25,
            whatsapp_message:
              "Hola! Me interesa MusclePro Elite para mi entrenamiento. ¿Qué sabores tienen disponibles y cuál es la forma de pago?",
          },
        ]
        for (const supplement of defaultSupplements) {
          await dbFunctions.addSupplement(supplement)
        }
      }

      // 🆕 Inicializar rutinas de ejercicio por defecto
      const { data: existingRoutines } = await supabase.from("exercise_routines").select("*")

      if (!existingRoutines || existingRoutines.length === 0) {
        console.log("💪 Inicializando rutinas de ejercicio por defecto...")

        const defaultRoutines = [
          // TREN SUPERIOR
          {
            name: "Push-ups Básicos",
            description: "Rutina fundamental para fortalecer pecho, hombros y tríceps",
            category: "tren_superior" as const,
            duration_minutes: 15,
            difficulty: "principiante" as const,
            youtube_url: "https://www.youtube.com/watch?v=IODxDxX7oi4",
            thumbnail_url: "/placeholder.svg?height=180&width=320",
            instructions: [
              "Posición de plancha",
              "Bajar el pecho al suelo",
              "Empujar hacia arriba",
              "Repetir 10-15 veces",
            ],
            equipment_needed: [],
            calories_burned: 80,
            is_active: true,
          },
          {
            name: "Flexiones de Brazos Avanzadas",
            description: "Variaciones de flexiones para nivel intermedio y avanzado",
            category: "tren_superior" as const,
            duration_minutes: 25,
            difficulty: "intermedio" as const,
            youtube_url: "https://www.youtube.com/watch?v=0GsVJsS6474",
            thumbnail_url: "/placeholder.svg?height=180&width=320",
            instructions: ["Flexiones diamante", "Flexiones archer", "Flexiones con palmada", "3 series de cada una"],
            equipment_needed: [],
            calories_burned: 150,
            is_active: true,
          },

          // TREN INFERIOR
          {
            name: "Sentadillas Perfectas",
            description: "Técnica correcta para sentadillas y fortalecimiento de piernas",
            category: "tren_inferior" as const,
            duration_minutes: 20,
            difficulty: "principiante" as const,
            youtube_url: "https://www.youtube.com/watch?v=YaXPRqUwItQ",
            thumbnail_url: "/placeholder.svg?height=180&width=320",
            instructions: [
              "Pies separados al ancho de hombros",
              "Bajar como si te sentaras",
              "Mantener espalda recta",
              "3 series de 15",
            ],
            equipment_needed: [],
            calories_burned: 100,
            is_active: true,
          },
          {
            name: "Rutina Completa de Piernas",
            description: "Entrenamiento completo para cuádriceps, glúteos y pantorrillas",
            category: "pierna" as const,
            duration_minutes: 30,
            difficulty: "intermedio" as const,
            youtube_url: "https://www.youtube.com/watch?v=gnAjmOHaKKs",
            thumbnail_url: "/placeholder.svg?height=180&width=320",
            instructions: ["Sentadillas", "Zancadas", "Elevaciones de pantorrilla", "Puentes de glúteo"],
            equipment_needed: [],
            calories_burned: 180,
            is_active: true,
          },

          // CARDIO
          {
            name: "HIIT para Principiantes",
            description: "Entrenamiento de intervalos de alta intensidad adaptado para comenzar",
            category: "cardio" as const,
            duration_minutes: 15,
            difficulty: "principiante" as const,
            youtube_url: "https://www.youtube.com/watch?v=ml6cT4AZdqI",
            thumbnail_url: "/placeholder.svg?height=180&width=320",
            instructions: [
              "30 seg trabajo, 30 seg descanso",
              "Jumping jacks",
              "Mountain climbers",
              "Burpees modificados",
            ],
            equipment_needed: [],
            calories_burned: 120,
            is_active: true,
          },
          {
            name: "Cardio Quema Grasa",
            description: "Rutina intensa para maximizar la quema de calorías",
            category: "cardio" as const,
            duration_minutes: 25,
            difficulty: "avanzado" as const,
            youtube_url: "https://www.youtube.com/watch?v=gC_L9qAHVJ8",
            thumbnail_url: "/placeholder.svg?height=180&width=320",
            instructions: ["Burpees", "Sprint en el lugar", "Saltos de tijera", "4 rondas de 5 minutos"],
            equipment_needed: [],
            calories_burned: 250,
            is_active: true,
          },

          // ABDOMEN
          {
            name: "Abdominales en 10 Minutos",
            description: "Rutina rápida y efectiva para fortalecer el core",
            category: "abdomen" as const,
            duration_minutes: 10,
            difficulty: "principiante" as const,
            youtube_url: "https://www.youtube.com/watch?v=DHD1-2P94DI",
            thumbnail_url: "/placeholder.svg?height=180&width=320",
            instructions: ["Abdominales", "Plancha", "Crunches"],
            equipment_needed: [],
            calories_burned: 50,
            is_active: true,
          },
          {
            name: "Rutina Completa de Abdomen",
            description: "Entrenamiento completo para fortalecer y definir el abdomen",
            category: "abdomen" as const,
            duration_minutes: 20,
            difficulty: "intermedio" as const,
            youtube_url: "https://www.youtube.com/watch?v=6UCvLg56oZQ",
            thumbnail_url: "/placeholder.svg?height=180&width=320",
            instructions: ["Leg Raises", "Russian Twists", "Bicycle Crunches"],
            equipment_needed: [],
            calories_burned: 100,
            is_active: true,
          },

          // GLÚTEO
          {
            name: "Glúteos con Pelotas",
            description: "Rutina para fortalecer y definir los glúteos",
            category: "gluteo" as const,
            duration_minutes: 15,
            difficulty: "principiante" as const,
            youtube_url: "https://www.youtube.com/watch?v=6UCvLg56oZQ",
            thumbnail_url: "/placeholder.svg?height=180&width=320",
            instructions: ["Glute Bridges", "Donkey Kicks", "Fire Hydrants"],
            equipment_needed: ["pelotas"],
            calories_burned: 80,
            is_active: true,
          },
          {
            name: "Rutina Completa de Glúteos",
            description: "Entrenamiento completo para fortalecer y definir los glúteos",
            category: "gluteo" as const,
            duration_minutes: 25,
            difficulty: "intermedio" as const,
            youtube_url: "https://www.youtube.com/watch?v=6UCvLg56oZQ",
            thumbnail_url: "/placeholder.svg?height=180&width=320",
            instructions: ["Glute Thrusters", "Romanian Deadlifts", "Lunges"],
            equipment_needed: ["pesas"],
            calories_burned: 150,
            is_active: true,
          },

          // PIERNAS
          {
            name: "Sentadillas con Peso",
            description: "Rutina para fortalecer las piernas con peso",
            category: "pierna" as const,
            duration_minutes: 20,
            difficulty: "principiante" as const,
            youtube_url: "https://www.youtube.com/watch?v=6UCvLg56oZQ",
            thumbnail_url: "/placeholder.svg?height=180&width=320",
            instructions: ["Sentadillas con peso", "Peso muerto", "Zancadas"],
            equipment_needed: ["pesas"],
            calories_burned: 120,
            is_active: true,
          },
          {
            name: "Rutina Completa de Piernas",
            description: "Entrenamiento completo para fortalecer y definir las piernas",
            category: "pierna" as const,
            duration_minutes: 30,
            difficulty: "intermedio" as const,
            youtube_url: "https://www.youtube.com/watch?v=6UCvLg56oZQ",
            thumbnail_url: "/placeholder.svg?height=180&width=320",
            instructions: ["Squats", "Leg Press", "Calf Raises"],
            equipment_needed: ["pesas", "maquinaria"],
            calories_burned: 200,
            is_active: true,
          },
        ]
        for (const routine of defaultRoutines) {
          await dbFunctions.addExerciseRoutine(routine)
        }
      }
    } catch (error) {
      console.error("Error initializing default data:", error)
    }
  },
}

// Default export to satisfy the requirement
export default function Page() {
  return <div>Page Component</div>
}
