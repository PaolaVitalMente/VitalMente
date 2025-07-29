"use client"
import { useState, useEffect } from "react"
import type React from "react"

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

// 🆕 NUEVA INTERFAZ: Alimentos globales expandidos
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

// 🆕 NUEVA INTERFAZ: Rutinas de ejercicio
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

// 🆕 NUEVA INTERFAZ: Métricas de uso
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

// 🆕 NUEVA INTERFAZ: Sugerencias de IA
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

// 🆕 NUEVA INTERFAZ: Batidos personalizados
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
              "Hola! Me interesa RelaxMind Pro para mejorar mi descanso. ¿Podrían contarme más sobre sus beneficios?",
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
            instructions: ["Crunches básicos", "Plancha", "Bicicleta", "Russian twists"],
            equipment_needed: [],
            calories_burned: 60,
            is_active: true,
          },
          {
            name: "Core Avanzado",
            description: "Entrenamiento intensivo para un abdomen fuerte y definido",
            category: "abdomen" as const,
            duration_minutes: 20,
            difficulty: "avanzado" as const,
            youtube_url: "https://www.youtube.com/watch?v=1919eTCoESo",
            thumbnail_url: "/placeholder.svg?height=180&width=320",
            instructions: ["Plancha lateral", "V-ups", "Dead bug", "Hollow body hold"],
            equipment_needed: [],
            calories_burned: 120,
            is_active: true,
          },

          // GLÚTEO
          {
            name: "Glúteos Firmes",
            description: "Ejercicios específicos para tonificar y fortalecer los glúteos",
            category: "gluteo" as const,
            duration_minutes: 18,
            difficulty: "principiante" as const,
            youtube_url: "https://www.youtube.com/watch?v=SHsUIZiNdeY",
            thumbnail_url: "/placeholder.svg?height=180&width=320",
            instructions: ["Puentes de glúteo", "Patadas hacia atrás", "Clamshells", "Fire hydrants"],
            equipment_needed: [],
            calories_burned: 90,
            is_active: true,
          },
          {
            name: "Glúteos de Acero",
            description: "Rutina avanzada para glúteos fuertes y definidos",
            category: "gluteo" as const,
            duration_minutes: 25,
            difficulty: "intermedio" as const,
            youtube_url: "https://www.youtube.com/watch?v=B296mZDhrP4",
            thumbnail_url: "/placeholder.svg?height=180&width=320",
            instructions: ["Hip thrusts", "Sentadillas sumo", "Zancadas laterales", "Single leg deadlifts"],
            equipment_needed: [],
            calories_burned: 140,
            is_active: true,
          },
        ]

        for (const routine of defaultRoutines) {
          try {
            await supabase.from("exercise_routines").insert({
              ...routine,
              created_at: new Date().toISOString(),
            })
          } catch (error) {
            console.log("Error insertando rutina:", routine.name, error)
          }
        }

        console.log("✅ Rutinas de ejercicio inicializadas")
      }
    } catch (error) {
      console.log("Datos por defecto ya inicializados o error menor:", error)
    }
  },

  async uploadSupplementImage(file: File, supplementName: string): Promise<string> {
    try {
      console.log("📤 Iniciando upload de imagen:", file.name)

      const fileExt = file.name.split(".").pop()
      const fileName = `${supplementName.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}.${fileExt}`

      console.log("📝 Nombre generado:", fileName)

      const { data, error } = await supabase.storage.from("supplement-images").upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      })

      if (error) {
        console.error("❌ Error en upload:", error)
        throw error
      }

      console.log("✅ Archivo subido:", data)

      const {
        data: { publicUrl },
      } = supabase.storage.from("supplement-images").getPublicUrl(fileName)

      console.log("🔗 URL pública generada:", publicUrl)
      return publicUrl
    } catch (error) {
      console.error("💥 Error completo en uploadSupplementImage:", error)
      throw error
    }
  },

  async deleteSupplementImage(imageUrl: string): Promise<void> {
    try {
      const fileName = imageUrl.split("/").pop()
      if (!fileName) return

      const { error } = await supabase.storage.from("supplement-images").remove([fileName])

      if (error) throw error
      console.log("🗑️ Imagen eliminada:", fileName)
    } catch (error) {
      console.error("Error eliminando imagen:", error)
    }
  },
}

// ============================================================================
// COMPONENTE PRINCIPAL EXPANDIDO
// ============================================================================
export default function VitalMenteApp() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('vitalmente_user')
      return savedUser ? JSON.parse(savedUser) : null
    }
    return null
  })

  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("inicio")
  const [macroResults, setMacroResults] = useState<MacroResult | null>(null)
  const [connectionStatus, setConnectionStatus] = useState('connecting')
  
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [lastSaveTime, setLastSaveTime] = useState<Date | null>(null)
  
  const [dailyProgress, setDailyProgress] = useState<DailyProgress>({
    id: "",
    user_id: "",
    date: new Date().toISOString().split('T')[0],
    water: 0,
    exercise: 0,
    mindfulness: 0,
    desayuno: 0,
    almuerzo: 0,
    cena: 0
  })

  const [userFoods, setUserFoods] = useState<UserFood[]>([])
  const [globalFoods, setGlobalFoods] = useState<GlobalFood[]>([])
  const [progressHistory, setProgressHistory] = useState<DailyProgress[]>([])
  const [globalTips, setGlobalTips] = useState<GlobalTip[]>([])
  const [globalResources, setGlobalResources] = useState<GlobalResource[]>([])
  const [supplements, setSupplements] = useState<Supplement[]>([])
  const [currentTipIndex, setCurrentTipIndex] = useState(0)

  // 🆕 NUEVOS ESTADOS PARA EJERCICIOS
  const [exerciseRoutines, setExerciseRoutines] = useState<ExerciseRoutine[]>([])
  const [selectedExerciseCategory, setSelectedExerciseCategory] = useState<string>('all')

  // 🆕 NUEVOS ESTADOS PARA BATIDOS
  const [customSmoothies, setCustomSmoothies] = useState<CustomSmoothie[]>([])
  const [showSmoothieBuilder, setShowSmoothieBuilder] = useState(false)
  const [smoothieIngredients, setSmoothieIngredients] = useState<{
    food_id: string
    food_name: string
    quantity_grams: number
  }[]>([])
  const [smoothieName, setSmoothieName] = useState('')

  const [mealCompositions, setMealCompositions] = useState<MealComposition[]>([])
  const [consumedMacros, setConsumedMacros] = useState<ConsumedMacros>({
    calories: 0, protein: 0, carbs: 0, fats: 0
  })
  const [showMealCalculator, setShowMealCalculator] = useState(false)
  const [selectedMealType, setSelectedMealType] = useState<'desayuno' | 'almuerzo' | 'cena'>('desayuno')
  const [selectedFood, setSelectedFood] = useState<UserFood | GlobalFood | null>(null)
  const [foodQuantity, setFoodQuantity] = useState<string>('100')

  const [logoClicks, setLogoClicks] = useState(0)
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminCode, setAdminCode] = useState("")
  const [loginForm, setLoginForm] = useState({ phone: "", accessCode: "" })
  const [registerForm, setRegisterForm] = useState({
    phone: "", accessCode: "", confirmCode: "", name: "", age: "", weight: "", height: "",
    activityLevel: 1.375, goal: "feel_good"
  })
  const [showFoodDialog, setShowFoodDialog] = useState(false)
  const [selectedMeal, setSelectedMeal] = useState<'desayuno' | 'almuerzo' | 'cena' | null>(null)
  const [newFood, setNewFood] = useState({ name: "", calories: "", protein: "", carbs: "", fats: "" })

  const [showFloatingMenu, setShowFloatingMenu] = useState(false)

  useEffect(() => {
    initializeApp()
  }, [])

  useEffect(() => {
    if (currentUser && currentUser.id) {
      console.log('🔄 Usuario detectado desde localStorage, cargando datos...')
      loadUserData(currentUser.id)
      calculateMacros(currentUser)
    }
  }, [currentUser])

  const initializeApp = async () => {
    try {
      setConnectionStatus('connecting')
      await dbFunctions.initializeDefaultData()
      await loadGlobalContent()
      setConnectionStatus('connected')
    } catch (error) {
      console.error('Error initializing app:', error)
      setConnectionStatus('error')
    }
  }

  const loadGlobalContent = async () => {
    try {
      const [tips, resources, activeSupplements, globalFoodsList, routines] = await Promise.all([
        dbFunctions.getActiveTips(),
        dbFunctions.getActiveResources(),
        dbFunctions.getActiveSupplements(),
        dbFunctions.getGlobalFoods(),
        dbFunctions.getExerciseRoutines() // 🆕 NUEVA LÍNEA
      ])
      setGlobalTips(tips)
      setGlobalResources(resources)
      setSupplements(activeSupplements)
      setGlobalFoods(globalFoodsList)
      setExerciseRoutines(routines) // 🆕 NUEVA LÍNEA
    } catch (error) {
      console.error('Error loading global content:', error)
    }
  }

  const handleLogin = async () => {
    if (!loginForm.phone || !loginForm.accessCode) {
      alert("Por favor completa todos los campos")
      return
    }

    setIsLoading(true)
    try {
      const user = await dbFunctions.findUserByPhone(loginForm.phone)
      if (!user || user.access_code !== loginForm.accessCode) {
        alert("Número o código incorrecto")
        return
      }

      await dbFunctions.updateUserLastLogin(user.id)
      setCurrentUser(user)
      localStorage.setItem('vitalmente_user', JSON.stringify(user))
      await loadUserData(user.id)
      calculateMacros(user)
      setLoginForm({ phone: "", accessCode: "" })
    } catch (error: any) {
      console.error('Error en login:', error)
      alert("Error al iniciar sesión: " + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async () => {
    if (!registerForm.phone || !registerForm.accessCode || !registerForm.name ||
        !registerForm.age || !registerForm.weight || !registerForm.height) {
      alert("Por favor completa todos los campos")
      return
    }

    if (registerForm.accessCode !== registerForm.confirmCode) {
      alert("Los códigos no coinciden")
      return
    }

    if (registerForm.accessCode.length !== 10) {
      alert("El código debe tener exactamente 10 dígitos")
      return
    }

    setIsLoading(true)
    try {
      console.log("🔍 Iniciando registro...")
        
      const existingUser = await dbFunctions.findUserByPhone(registerForm.phone)
      if (existingUser) {
        alert("Este número ya está registrado. Usa la opción de Ingresar.")
        setIsLoading(false)
        return
      }

      console.log("📝 Creando nuevo usuario...")
      const userData = {
        phone: registerForm.phone,
        access_code: registerForm.accessCode,
        name: registerForm.name,
        age: Number.parseInt(registerForm.age),
        weight: Number.parseInt(registerForm.weight),
        height: Number.parseInt(registerForm.height),
        activity_level: registerForm.activityLevel,
        goal: registerForm.goal
      }
        
      console.log("🚀 Datos a enviar:", userData)
      const newUser = await dbFunctions.createUser(userData)
        
      console.log("✅ Usuario creado:", newUser)
      setCurrentUser(newUser)
      localStorage.setItem('vitalmente_user', JSON.stringify(newUser))
      setDailyProgress(prev => ({ ...prev, user_id: newUser.id }))
      calculateMacros(newUser)
      setRegisterForm({
        phone: "", accessCode: "", confirmCode: "", name: "", age: "", weight: "", height: "",
        activityLevel: 1.375, goal: "feel_good"
      })
    } catch (error: any) {
      console.error('❌ Error detallado en registro:', error)
      alert(`Error al crear cuenta: ${error.message}\n\nRevisa la consola para más detalles.`)
    } finally {
      setIsLoading(false)
    }
  }

  const loadUserData = async (userId: string) => {
    try {
      console.log('🔍 Iniciando carga de datos para usuario:', userId)
        
      const todayProgress = await dbFunctions.getTodayProgress(userId)
      if (todayProgress) {
        console.log('✅ Progreso cargado desde BD:', todayProgress)
        setDailyProgress(todayProgress)
      } else {
        console.log('📝 No hay progreso para hoy, usando valores por defecto')
        setDailyProgress(prev => ({ ...prev, user_id: userId }))
      }

      const [foods, history, compositions, smoothies] = await Promise.all([
        dbFunctions.getUserFoods(userId),
        dbFunctions.getProgressHistory(userId),
        dbFunctions.getTodayMealCompositions(userId),
        dbFunctions.getUserSmoothies(userId) // 🆕 NUEVA LÍNEA
      ])
        
      setUserFoods(foods)
      setProgressHistory(history)
      setMealCompositions(compositions)
      setCustomSmoothies(smoothies) // 🆕 NUEVA LÍNEA
        
      calculateConsumedMacros(compositions)
        
      console.log('✅ Todos los datos cargados exitosamente')
    } catch (error) {
      console.error('❌ Error loading user data:', error)
    }
  }

  const calculateConsumedMacros = (compositions: MealComposition[]) => {
    const totals = compositions.reduce(
      (acc, comp) => ({
        calories: acc.calories + comp.calories_consumed,
        protein: acc.protein + comp.protein_consumed,
        carbs: acc.carbs + comp.carbs_consumed,
        fats: acc.fats + comp.fats_consumed
      }),
      { calories: 0, protein: 0, carbs: 0, fats: 0 }
    )
    setConsumedMacros(totals)
  }

  const handleLogout = () => {
    setCurrentUser(null)
    localStorage.removeItem('vitalmente_user')
    setDailyProgress({
      id: "", user_id: "", date: new Date().toISOString().split('T')[0],
      water: 0, exercise: 0, mindfulness: 0, desayuno: 0, almuerzo: 0, cena: 0
    })
    setUserFoods([])
    setProgressHistory([])
    setMacroResults(null)
    setActiveTab("inicio")
    setMealCompositions([])
    setConsumedMacros({ calories: 0, protein: 0, carbs: 0, fats: 0 })
    setCustomSmoothies([]) // 🆕 NUEVA LÍNEA
    setSaveStatus('idle')
    setLastSaveTime(null)
  }

  const handleLogoClick = () => {
    setLogoClicks(prev => {
      const newCount = prev + 1
      if (newCount === 5) {
        setShowAdminLogin(true)
        return 0
      }
      return newCount
    })
  }

  const handleAdminLogin = () => {
    if (adminCode === "1098648820") {
      setIsAdmin(true)
      setShowAdminLogin(false)
      setAdminCode("")
    } else {
      alert("Código incorrecto")
    }
  }

  const calculateMacros = (userData: UserProfile) => {
    const bmr = 10 * userData.weight + 6.25 * userData.height - 5 * userData.age + 5
    const tdee = bmr * userData.activity_level
    const goalData = GOALS.find(g => g.id === userData.goal) || GOALS[3]
    const calories = Math.round(tdee * (1 + goalData.calAdjust))
      
    setMacroResults({
      calories,
      protein: Math.round((calories * goalData.protein / 100) / 4),
      carbs: Math.round((calories * goalData.carbs / 100) / 4),
      fats: Math.round((calories * goalData.fats / 100) / 9),
      goalType: goalData.type,
      goalLabel: goalData.label
    })
  }

  const getMotivationalMessage = (goal: string) => {
    const messages: Record<string, string> = {
      lose: "¡Cada paso te acerca a tu mejor versión! 💪",
      maintain: "Mantener el equilibrio es la clave del éxito ⚖️",
      gain: "Construyendo fuerza, construyendo futuro 🏋️",
      feel_good: "Hoy es un gran día para sentirte increíble ✨",
      find_calm: "Respira profundo, la calma está en ti 🧘",
      balance: "El equilibrio perfecto entre cuerpo y mente ⚡",
      vitalmente: "¡Eres la mejor versión de ti mismo! 🌟 #VitalMente"
    }
    return messages[goal] || messages.feel_good
  }

  const updateProgress = async (field: keyof DailyProgress, increment: number) => {
    if (!currentUser) return

    const newProgress = {
      ...dailyProgress,
      [field]: Math.max(0, (dailyProgress as any)[field] + increment)
    }
    setDailyProgress(newProgress)
      
    setSaveStatus('saving')
    try {
      const success = await dbFunctions.saveProgress(currentUser.id, {
        water: newProgress.water,
        exercise: newProgress.exercise,
        mindfulness: newProgress.mindfulness,
        desayuno: newProgress.desayuno,
        almuerzo: newProgress.almuerzo,
        cena: newProgress.cena
      })

      if (success) {
        const verified = await dbFunctions.verifyProgressSaved(currentUser.id, newProgress)
              
        if (verified) {
          setSaveStatus('saved')
          setLastSaveTime(new Date())
          console.log('✅ Progreso guardado y verificado')
                
          setTimeout(() => setSaveStatus('idle'), 2000)
        } else {
          throw new Error('Los datos no se guardaron correctamente')
        }
      } else {
        throw new Error('Error al guardar progreso')
      }
    } catch (error) {
      console.error('❌ Error guardando progreso:', error)
      setSaveStatus('error')
        
      setDailyProgress(dailyProgress)
        
      alert('Error al guardar progreso. Por favor intenta de nuevo.')
        
      setTimeout(() => setSaveStatus('idle'), 3000)
    }
  }

  const handleQuickProgress = async (type: 'water' | 'exercise' | 'mindfulness') => {
    await updateProgress(type, 1)
    setShowFloatingMenu(false)
  }

  const handleTypicalDay = async () => {
    if (!currentUser) return
      
    setSaveStatus('saving')
    try {
      const typicalProgress = {
        water: 6,
        exercise: 1,
        mindfulness: 1,
        desayuno: 1,
        almuerzo: 1,
        cena: 1
      }
        
      setDailyProgress(prev => ({ ...prev, ...typicalProgress }))
        
      const success = await dbFunctions.saveProgress(currentUser.id, typicalProgress)
        
      if (success) {
        setSaveStatus('saved')
        setLastSaveTime(new Date())
        setTimeout(() => setSaveStatus('idle'), 2000)
      } else {
        throw new Error('Error al guardar día típico')
      }
    } catch (error) {
      console.error('Error guardando día típico:', error)
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 3000)
    }
      
    setShowFloatingMenu(false)
  }

  const resetProgress = async (type?: 'all' | 'meals' | 'exercise' | 'mindfulness' | 'water') => {
    if (!currentUser) return
    const confirmMessage = type === 'all' 
      ? '¿Estás seguro de reiniciar TODO el progreso del día?'
      : `¿Estás seguro de reiniciar el progreso de ${type}?`
      
    if (!confirm(confirmMessage)) return

    let newProgress = { ...dailyProgress }
      
    if (type === 'all' || !type) {
      newProgress = { ...newProgress, water: 0, exercise: 0, mindfulness: 0, desayuno: 0, almuerzo: 0, cena: 0 }
    } else if (type === 'meals') {
      newProgress = { ...newProgress, desayuno: 0, almuerzo: 0, cena: 0 }
      try {
        for (const comp of mealCompositions) {
          await dbFunctions.deleteMealComposition(comp.id)
        }
        setMealCompositions([])
        calculateConsumedMacros([])
      } catch (error) {
        console.error('Error eliminando composiciones:', error)
      }
    } else if (type === 'water') {
      newProgress = { ...newProgress, water: 0 }
    } else if (type === 'exercise') {
      newProgress = { ...newProgress, exercise: 0 }
    } else if (type === 'mindfulness') {
      newProgress = { ...newProgress, mindfulness: 0 }
    }
      
    setDailyProgress(newProgress)
    setSaveStatus('saving')
    try {
      const success = await dbFunctions.saveProgress(currentUser.id, {
        water: newProgress.water,
        exercise: newProgress.exercise,
        mindfulness: newProgress.mindfulness,
        desayuno: newProgress.desayuno,
        almuerzo: newProgress.almuerzo,
        cena: newProgress.cena
      })
      if (success) {
        setSaveStatus('saved')
        setLastSaveTime(new Date())
        setTimeout(() => setSaveStatus('idle'), 2000)
      } else {
        throw new Error('Error al guardar reset')
      }
    } catch (error) {
      console.error('Error saving reset:', error)
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 3000)
    }
  }

  const getProgressPercentage = () => {
    const targets = { water: 8, exercise: 1, mindfulness: 1, desayuno: 1, almuerzo: 1, cena: 1 }
    let completed = 0
    Object.entries(targets).forEach(([key, target]) => {
      if (Number(dailyProgress[key as keyof DailyProgress]) >= target) completed++
    })
    return Math.round((completed / 6) * 100)
  }

  const addUserFood = async () => {
    if (!newFood.name || !selectedMeal || !currentUser) return
    try {
      const food = await dbFunctions.addUserFood({
        user_id: currentUser.id, 
        name: newFood.name, 
        calories: Number.parseInt(newFood.calories) || 0,
        protein: Number.parseInt(newFood.protein) || 0, 
        carbs: Number.parseInt(newFood.carbs) || 0,
        fats: Number.parseInt(newFood.fats) || 0, 
        category: selectedMeal
      })
      setUserFoods(prev => [...prev, food])
      await updateProgress(selectedMeal, 1)
      setNewFood({ name: "", calories: "", protein: "", carbs: "", fats: "" })
      setShowFoodDialog(false)
      setSelectedMeal(null)
    } catch (error: any) {
      console.error('Error adding food:', error)
      alert('Error al agregar alimento: ' + error.message)
    }
  }

  const openMealCalculator = (mealType: 'desayuno' | 'almuerzo' | 'cena') => {
    setSelectedMealType(mealType)
    setShowMealCalculator(true)
    setSelectedFood(null)
    setFoodQuantity('100')
  }

  const addFoodToMeal = async () => {
    if (!selectedFood || !currentUser || !foodQuantity) return
    try {
      const quantity = Number.parseInt(foodQuantity)
      const ratio = quantity / 100

      const composition: Omit<MealComposition, 'id' | 'created_at'> = {
        user_id: currentUser.id,
        date: new Date().toISOString().split('T')[0],
        meal_type: selectedMealType,
        food_id: selectedFood.id,
        food_name: selectedFood.name,
        quantity_grams: quantity,
        calories_consumed: Math.round(Number(selectedFood.calories) * ratio),
        protein_consumed: Math.round(Number(selectedFood.protein) * ratio),
        carbs_consumed: Math.round(Number(selectedFood.carbs) * ratio),
        fats_consumed: Math.round(Number(selectedFood.fats) * ratio)
      }

      const newComposition = await dbFunctions.addMealComposition(composition)
      setMealCompositions(prev => [...prev, newComposition])
        
      calculateConsumedMacros([...mealCompositions, newComposition])
        
      await updateProgress(selectedMealType, 1)
        
      setShowMealCalculator(false)
      setSelectedFood(null)
      setFoodQuantity('100')
    } catch (error: any) {
      console.error('Error adding food to meal:', error)
      alert('Error al agregar alimento: ' + error.message)
    }
  }

  const selectFood = (food: GlobalFood | UserFood) => {
    setSelectedFood(food)
  }

  // 🆕 NUEVA FUNCIÓN: Organizar alimentos globales por categoría expandida
  const getFoodsByCategory = () => {
    const categories = [
      { id: 'proteinas', name: 'Proteínas', icon: '🍗' },
      { id: 'vegetales', name: 'Vegetales', icon: '🥬' },
      { id: 'frutas', name: 'Frutas', icon: '🍎' },
      { id: 'carbohidratos', name: 'Carbohidratos', icon: '🌾' },
      { id: 'bebidas', name: 'Bebidas', icon: '🥤' }, // 🆕 NUEVA CATEGORÍA
      { id: 'frutos_secos', name: 'Frutos Secos', icon: '🥜' }, // 🆕 NUEVA CATEGORÍA
      { id: 'snacks', name: 'Snacks', icon: '🍪' } // 🆕 NUEVA CATEGORÍA
    ]
    return categories.map(category => ({
      ...category,
      foods: globalFoods.filter(food => food.category === category.id)
    }))
  }

  // 🆕 NUEVA FUNCIÓN: Obtener subcategorías de bebidas
  const getBeverageSubcategories = () => {
    const beverageFoods = globalFoods.filter(food => food.category === 'bebidas')
    const subcategories = [...new Set(beverageFoods.map(food => food.subcategory))]
    
    return subcategories.map(subcategory => ({
      id: subcategory,
      name: subcategory === 'leches' ? 'Leches' : 
            subcategory === 'leches_vegetales' ? 'Leches Vegetales' :
            subcategory === 'cafes' ? 'Cafés' :
            subcategory === 'cafes_frios' ? 'Cafés Fríos' :
            subcategory === 'tes' ? 'Tés' : subcategory,
      icon: subcategory === 'leches' ? '🥛' :
            subcategory === 'leches_vegetales' ? '🌱' :
            subcategory === 'cafes' ? '☕' :
            subcategory === 'cafes_frios' ? '🧊' :
            subcategory === 'tes' ? '🍵' : '🥤',
      foods: beverageFoods.filter(food => food.subcategory === subcategory)
    }))
  }

  const removeFoodFromMeal = async (compositionId: string) => {
    try {
      await dbFunctions.deleteMealComposition(compositionId)
      const updatedCompositions = mealCompositions.filter(c => c.id !== compositionId)
      setMealCompositions(updatedCompositions)
      calculateConsumedMacros(updatedCompositions)
    } catch (error: any) {
      console.error('Error removing food:', error)
      alert('Error al remover alimento: ' + error.message)
    }
  }

  const getCaloriesProgress = () => {
    if (!macroResults) return { consumed: 0, target: 0, percentage: 0 }
      
    const percentage = macroResults.calories > 0 ? Math.round((consumedMacros.calories / macroResults.calories) * 100) : 0
      
    return {
      consumed: consumedMacros.calories,
      target: macroResults.calories,
      percentage: Math.min(percentage, 100)
    }
  }

  const getStreakDays = () => {
    if (progressHistory.length === 0) return 0
    let streak = 0
    const sortedHistory = [...progressHistory].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      
    for (let i = 0; i < sortedHistory.length; i++) {
      const progress = sortedHistory[i]
      const hasActivity = progress.water > 0 || progress.exercise > 0 || progress.mindfulness > 0 ||
                          progress.desayuno > 0 || progress.almuerzo > 0 || progress.cena > 0
      if (hasActivity) {
        streak++
      } else {
        break
      }
    }
    return streak
  }

  const handleSupplementContact = (supplement: Supplement) => {
    const defaultMessage = `Hola! Me interesa el suplemento ${supplement.name} que vi en VitalMente. ¿Podrían darme más información sobre disponibilidad y forma de pago?

Precio mostrado: $${supplement.price.toLocaleString()}
Beneficios: ${supplement.benefits.join(', ')}

Gracias!`
      
    const message = supplement.whatsapp_message || defaultMessage
    const whatsappUrl = `https://wa.me/573134852878?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  // 🆕 NUEVAS FUNCIONES PARA BATIDOS PERSONALIZADOS
  const addIngredientToSmoothie = (food: GlobalFood | UserFood, quantity: number) => {
    const existingIndex = smoothieIngredients.findIndex(ing => ing.food_id === food.id)
    
    if (existingIndex >= 0) {
      // Actualizar cantidad si ya existe
      const updated = [...smoothieIngredients]
      updated[existingIndex].quantity_grams = quantity
      setSmoothieIngredients(updated)
    } else {
      // Agregar nuevo ingrediente
      setSmoothieIngredients(prev => [...prev, {
        food_id: food.id,
        food_name: food.name,
        quantity_grams: quantity
      }])
    }
  }

  const removeIngredientFromSmoothie = (foodId: string) => {
    setSmoothieIngredients(prev => prev.filter(ing => ing.food_id !== foodId))
  }

  const calculateSmoothieMacros = () => {
    let totalCalories = 0
    let totalProtein = 0
    let totalCarbs = 0
    let totalFats = 0

    smoothieIngredients.forEach(ingredient => {
      const food = [...globalFoods, ...userFoods].find(f => f.id === ingredient.food_id)
      if (food) {
        const ratio = ingredient.quantity_grams / 100
        totalCalories += Number(food.calories) * ratio
        totalProtein += Number(food.protein) * ratio
        totalCarbs += Number(food.carbs) * ratio
        totalFats += Number(food.fats) * ratio
      }
    })

    return {
      calories: Math.round(totalCalories),
      protein: Math.round(totalProtein),
      carbs: Math.round(totalCarbs),
      fats: Math.round(totalFats)
    }
  }

  const saveSmoothie = async () => {
    if (!currentUser || !smoothieName || smoothieIngredients.length === 0) {
      alert("Por favor completa el nombre y agrega al menos un ingrediente")
      return
    }

    try {
      const macros = calculateSmoothieMacros()
      
      const smoothie: Omit<CustomSmoothie, 'id' | 'created_at'> = {
        user_id: currentUser.id,
        name: smoothieName,
        ingredients: smoothieIngredients,
        total_calories: macros.calories,
        total_protein: macros.protein,
        total_carbs: macros.carbs,
        total_fats: macros.fats,
        is_favorite: false
      }

      const newSmoothie = await dbFunctions.addCustomSmoothie(smoothie)
      setCustomSmoothies(prev => [newSmoothie, ...prev])
      
      // Limpiar formulario
      setSmoothieName('')
      setSmoothieIngredients([])
      setShowSmoothieBuilder(false)
      
      alert('¡Batido guardado exitosamente!')
    } catch (error: any) {
      console.error('Error saving smoothie:', error)
      alert('Error al guardar batido: ' + error.message)
    }
  }

  const deleteSmoothie = async (smoothieId: string) => {
    if (!confirm('¿Estás seguro de eliminar este batido?')) return
    
    try {
      await dbFunctions.deleteCustomSmoothie(smoothieId)
      setCustomSmoothies(prev => prev.filter(s => s.id !== smoothieId))
    } catch (error: any) {
      console.error('Error deleting smoothie:', error)
      alert('Error al eliminar batido: ' + error.message)
    }
  }

  const useSmoothieAsMeal = (smoothie: CustomSmoothie, mealType: 'desayuno' | 'almuerzo' | 'cena') => {
    if (!currentUser) return;

    const addSmoothieAsMeal = async () => {
      try {
        const composition: Omit<MealComposition, 'id' | 'created_at'> = {
          user_id: currentUser.id,
          date: new Date().toISOString().split('T')[0],
          meal_type: mealType,
          food_id: smoothie.id,
          food_name: `Batido: ${smoothie.name}`,
          quantity_grams: 1, // Representa 1 porción del batido
          calories_consumed: smoothie.total_calories,
          protein_consumed: smoothie.total_protein,
          carbs_consumed: smoothie.total_protein,
          fats_consumed: smoothie.total_fats
        };

        const newComposition = await dbFunctions.addMealComposition(composition);
        setMealCompositions(prev => [...prev, newComposition]);
        calculateConsumedMacros([...mealCompositions, newComposition]);
        await updateProgress(mealType, 1);

        alert(`Batido agregado a ${mealType}!`);
      } catch (error: any) {
        console.error('Error using smoothie as meal:', error);
        alert('Error al agregar batido a la comida: ' + error.message);
      }
    };

    addSmoothieAsMeal();
  };

  // 🆕 FUNCIONES PARA FILTRAR EJERCICIOS
  const getFilteredExercises = () => {
    if (selectedExerciseCategory === 'all') {
      return exerciseRoutines
    }
    return exerciseRoutines.filter(routine => routine.category === selectedExerciseCategory)
  }

  const SaveStatusIndicator = () => {
    if (saveStatus === 'idle') return null
    const statusConfig = {
      saving: { icon: Icons.Loader2(), text: 'Guardando...', color: 'text-blue-600 bg-blue-50' },
      saved: { icon: Icons.CheckCircle(), text: 'Guardado', color: 'text-green-600 bg-green-50' },
      error: { icon: Icons.AlertCircle(), text: 'Error al guardar', color: 'text-red-600 bg-red-50' }
    }
    const config = statusConfig[saveStatus]
    return (
      <div className={`fixed top-4 right-4 z-50 px-3 py-2 rounded-lg shadow-lg flex items-center gap-2 ${config.color}`}>
        <span>{config.icon}</span>
        <span className="text-sm font-medium">{config.text}</span>
        {lastSaveTime && saveStatus === 'saved' && (
          <span className="text-xs opacity-75">
            {lastSaveTime.toLocaleTimeString()}
          </span>
        )}
      </div>
    )
  }

  const FloatingActionButtons = () => {
    return (
      <div className="fixed bottom-24 right-4 z-40">
        {showFloatingMenu && (
          <div className="flex flex-col gap-3 mb-4 animate-in slide-in-from-bottom">
            <button
              onClick={() => handleQuickProgress('water')}
              className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors flex items-center gap-2 min-w-max"
            >
              <span className="text-xl">{Icons.Droplets()}</span>
              <span className="text-sm">Agua +1</span>
            </button>
            <button
              onClick={() => handleQuickProgress('exercise')}
              className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors flex items-center gap-2 min-w-max"
            >
              <span className="text-xl">{Icons.Activity()}</span>
              <span className="text-sm">Ejercicio +1</span>
            </button>
            <button
              onClick={() => handleQuickProgress('mindfulness')}
              className="bg-purple-500 text-white p-3 rounded-full shadow-lg hover:bg-purple-600 transition-colors flex items-center gap-2 min-w-max"
            >
              <span className="text-xl">{Icons.Brain()}</span>
              <span className="text-sm">Mindfulness +1</span>
            </button>
            <button
              onClick={handleTypicalDay}
              className="bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition-colors flex items-center gap-2 min-w-max"
            >
              <span className="text-xl">⚡</span>
              <span className="text-sm">Día típico</span>
            </button>
          </div>
        )}
              
        <button
          onClick={() => setShowFloatingMenu(!showFloatingMenu)}
          className={`bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-all duration-200 ${
            showFloatingMenu ? 'rotate-45' : 'rotate-0'
          }`}
        >
          <span className="text-2xl">{Icons.Plus()}</span>
        </button>
      </div>
    )
  }

  // 🆕 PANEL DE ADMINISTRACIÓN COMPLETO CON TODAS LAS FUNCIONALIDADES
  const AdminPanel = () => {
    const [activeAdminTab, setActiveAdminTab] = useState("overview")
    const [showTipDialog, setShowTipDialog] = useState(false)
    const [showResourceDialog, setShowResourceDialog] = useState(false)
    const [showSupplementDialog, setShowSupplementDialog] = useState(false)
    const [showExerciseDialog, setShowExerciseDialog] = useState(false)
    const [resourceType, setResourceType] = useState<'mindfulness' | 'nutrition'>('mindfulness')
    const [adminStats, setAdminStats] = useState({ totalUsers: 0, activeToday: 0 })
    const [usageAnalytics, setUsageAnalytics] = useState<any>(null)
    const [newTip, setNewTip] = useState({ category: "", title: "", content: "", icon: "💡" })
    const [newResource, setNewResource] = useState({ title: "", description: "", url: "" })
    const [newSupplement, setNewSupplement] = useState({
      name: "", description: "", benefits: "", price: "", image_url: "", whatsapp_message: "", category: "", stock_quantity: ""
    })
    
    const [newExercise, setNewExercise] = useState({
      name: "", description: "", category: "tren_superior" as const, duration_minutes: "", 
      difficulty: "principiante" as const, youtube_url: "", thumbnail_url: "", 
      instructions: "", equipment_needed: "", calories_burned: ""
    })

    const [imageFile, setImageFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)
    const [imagePreview, setImagePreview] = useState<string>("")
    const [allTips, setAllTips] = useState<GlobalTip[]>([])
    const [allResources, setAllResources] = useState<GlobalResource[]>([])
    const [allSupplements, setAllSupplements] = useState<Supplement[]>([])
    const [allExercises, setAllExercises] = useState<ExerciseRoutine[]>([])

    useEffect(() => {
      if (isAdmin) loadAdminData()
    }, [isAdmin])

    const loadAdminData = async () => {
      try {
        const [tips, resources, supplements, stats, exercises, analytics] = await Promise.all([
          dbFunctions.getAllTips(),
          dbFunctions.getAllResources(),
          dbFunctions.getAllSupplements(),
          dbFunctions.getStats(),
          dbFunctions.getAllExerciseRoutines(),
          dbFunctions.getUsageAnalytics()
        ])
        setAllTips(tips)
        setAllResources(resources)
        setAllSupplements(supplements)
        setAllExercises(exercises)
        setAdminStats(stats)
        setUsageAnalytics(analytics)
      } catch (error) {
        console.error('Error loading admin data:', error)
      }
    }

    const addGlobalTip = async () => {
      if (!newTip.title || !newTip.content) {
        alert("Por favor completa título y contenido")
        return
      }
      try {
        await dbFunctions.addTip({
          category: newTip.category || "General",
          title: newTip.title,
          content: newTip.content,
          icon: newTip.icon || "💡",
          is_active: true
        })
        setNewTip({ category: "", title: "", content: "", icon: "💡" })
        setShowTipDialog(false)
        loadAdminData()
        loadGlobalContent()
      } catch (error: any) {
        console.error('Error adding tip:', error)
        alert('Error al agregar tip: ' + error.message)
      }
    }

    const addGlobalResource = async () => {
      if (!newResource.title || !newResource.url) {
        alert("Por favor completa título y URL")
        return
      }
      try {
        await dbFunctions.addResource({
          type: resourceType,
          title: newResource.title,
          description: newResource.description,
          url: newResource.url,
          is_active: true
        })
        setNewResource({ title: "", description: "", url: "" })
        setShowResourceDialog(false)
        loadAdminData()
        loadGlobalContent()
      } catch (error: any) {
        console.error('Error adding resource:', error)
        alert('Error al agregar recurso: ' + error.message)
      }
    }

    const addSupplementAdmin = async () => {
      if (!newSupplement.name || !newSupplement.description || !newSupplement.price) {
        alert("Por favor completa nombre, descripción y precio")
        return
      }
      setUploading(true)
      try {
        let imageUrl = newSupplement.image_url || "/placeholder.svg?height=200&width=200"
              
        if (imageFile) {
          console.log('📤 Subiendo imagen del suplemento...')
          imageUrl = await dbFunctions.uploadSupplementImage(imageFile, newSupplement.name)
          console.log('✅ Imagen subida exitosamente:', imageUrl)
        }
              
        const benefits = newSupplement.benefits.split(',').map(b => b.trim()).filter(b => b)
              
        await dbFunctions.addSupplement({
          name: newSupplement.name,
          description: newSupplement.description,
          benefits,
          price: Number.parseInt(newSupplement.price),
          image_url: imageUrl,
          is_active: true,
          category: newSupplement.category,
          stock_quantity: Number.parseInt(newSupplement.stock_quantity) || 0,
          whatsapp_message: newSupplement.whatsapp_message
        })

        resetSupplementForm()
        setShowSupplementDialog(false)
        loadAdminData()
        loadGlobalContent()
            
      } catch (error: any) {
        console.error('Error adding supplement:', error)
        alert('Error al agregar suplemento: ' + error.message)
      } finally {
        setUploading(false)
      }
    }

    const addExerciseRoutine = async () => {
      if (!newExercise.name || !newExercise.description || !newExercise.youtube_url) {
        alert("Por favor completa nombre, descripción y URL de YouTube")
        return
      }

      try {
        const instructions = newExercise.instructions.split(',').map(i => i.trim()).filter(i => i)
        const equipment = newExercise.equipment_needed.split(',').map(e => e.trim()).filter(e => e)

        await dbFunctions.addExerciseRoutine({
          name: newExercise.name,
          description: newExercise.description,
          category: newExercise.category,
          duration_minutes: Number.parseInt(newExercise.duration_minutes) || 15,
          difficulty: newExercise.difficulty,
          youtube_url: newExercise.youtube_url,
          thumbnail_url: newExercise.thumbnail_url || `/placeholder.svg?height=180&width=320&query=${newExercise.name} exercise`,
          instructions,
          equipment_needed: equipment,
          calories_burned: Number.parseInt(newExercise.calories_burned) || 100,
          is_active: true
        })

        setNewExercise({
          name: "", description: "", category: "tren_superior", duration_minutes: "", 
          difficulty: "principiante", youtube_url: "", thumbnail_url: "", 
          instructions: "", equipment_needed: "", calories_burned: ""
        })
        setShowExerciseDialog(false)
        loadAdminData()
        loadGlobalContent()
      } catch (error: any) {
        console.error('Error adding exercise routine:', error)
        alert('Error al agregar rutina: ' + error.message)
      }
    }

    const handleImageFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        setImageFile(file)
              
        const reader = new FileReader()
        reader.onload = (e) => {
          setImagePreview(e.target?.result as string)
        }
        reader.readAsDataURL(file)
      }
    }

    const resetSupplementForm = () => {
      setNewSupplement({
        name: "", description: "", benefits: "", price: "", image_url: "", whatsapp_message: "", category: "", stock_quantity: ""
      })
      setImageFile(null)
      setImagePreview("")
    }

    const toggleTipStatus = async (id: string) => {
      try {
        const tip = allTips.find(t => t.id === id)
        if (tip) {
          await dbFunctions.updateTip(id, { is_active: !tip.is_active })
          loadAdminData()
          loadGlobalContent()
        }
      } catch (error) {
        console.error('Error updating tip:', error)
      }
    }

    const deleteTip = async (id: string) => {
      if (confirm("¿Estás seguro de eliminar este tip? Esta acción no se puede deshacer.")) {
        try {
          await dbFunctions.deleteTip(id)
          loadAdminData()
          loadGlobalContent()
        } catch (error) {
          console.error('Error deleting tip:', error)
          alert('Error al eliminar tip')
        }
      }
    }

    const deleteResource = async (id: string) => {
      if (confirm("¿Estás seguro de eliminar este recurso? Esta acción no se puede deshacer.")) {
        try {
          await dbFunctions.deleteResource(id)
          loadAdminData()
          loadGlobalContent()
        } catch (error) {
          console.error('Error deleting resource:', error)
          alert('Error al eliminar recurso')
        }
      }
    }

    const toggleSupplementStatus = async (id: string) => {
      try {
        const supplement = allSupplements.find(s => s.id === id)
        if (supplement) {
          await dbFunctions.updateSupplement(id, { is_active: !supplement.is_active })
          loadAdminData()
          loadGlobalContent()
        }
      } catch (error) {
        console.error('Error updating supplement:', error)
      }
    }

    const deleteSupplement = async (id: string) => {
      if (confirm("¿Estás seguro de eliminar este suplemento? Esta acción no se puede deshacer.")) {
        try {
          const supplement = allSupplements.find(s => s.id === id)
                
          if (supplement?.image_url && !supplement.image_url.includes('placeholder')) {
            await dbFunctions.deleteSupplementImage(supplement.image_url)
          }
                
          await dbFunctions.deleteSupplement(id)
          loadAdminData()
          loadGlobalContent()
        } catch (error) {
          console.error('Error deleting supplement:', error)
          alert('Error al eliminar suplemento')
        }
      }
    }

    const toggleExerciseStatus = async (id: string) => {
      try {
        const exercise = allExercises.find(e => e.id === id)
        if (exercise) {
          await dbFunctions.updateExerciseRoutine(id, { is_active: !exercise.is_active })
          loadAdminData()
          loadGlobalContent()
        }
      } catch (error) {
        console.error('Error updating exercise:', error)
      }
    }

    const deleteExercise = async (id: string) => {
      if (confirm("¿Estás seguro de eliminar esta rutina? Esta acción no se puede deshacer.")) {
        try {
          await dbFunctions.deleteExerciseRoutine(id)
          loadAdminData()
          loadGlobalContent()
        } catch (error) {
          console.error('Error deleting exercise:', error)
          alert('Error al eliminar rutina')
        }
      }
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="border-b bg-white">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Panel de Administración VitalMente</h1>
                <p className="text-gray-600">Gestiona contenido, ejercicios, suplementos y analíticas</p>
                <span className="inline-block mt-1 px-2 py-1 text-xs bg-green-100 text-green-800 rounded">🌐 Conectado a Supabase</span>
              </div>
              <button
                onClick={() => setIsAdmin(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
              >
                <span>{Icons.LogOut()}</span>
                Salir
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-6">
          {/* TABS EXPANDIDOS PARA ADMIN */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              {['overview', 'analytics', 'exercises', 'tips', 'resources', 'supplements'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveAdminTab(tab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeAdminTab === tab
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab === 'overview' ? 'Resumen' : 
                   tab === 'analytics' ? 'Analíticas' :
                   tab === 'exercises' ? 'Ejercicios' :
                   tab === 'tips' ? 'Tips' : 
                   tab === 'resources' ? 'Recursos' : 'Suplementos'}
                </button>
              ))}
            </nav>
          </div>

          {/* TAB OVERVIEW */}
          {activeAdminTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Tips Activos</p>
                      <p className="text-2xl font-bold text-green-600">{allTips.filter(t => t.is_active).length}</p>
                    </div>
                    <span className="text-2xl">{Icons.MessageSquare()}</span>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Rutinas Activas</p>
                      <p className="text-2xl font-bold text-blue-600">{allExercises.filter(e => e.is_active).length}</p>
                    </div>
                    <span className="text-2xl">{Icons.Activity()}</span>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Suplementos Activos</p>
                      <p className="text-2xl font-bold text-amber-600">{allSupplements.filter(s => s.is_active).length}</p>
                    </div>
                    <span className="text-2xl">{Icons.Package()}</span>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Usuarios Registrados</p>
                      <p className="text-2xl font-bold text-purple-600">{adminStats.totalUsers}</p>
                    </div>
                    <span className="text-2xl">{Icons.Users()}</span>
                  </div>
                </div>
              </div>

              {/* RESUMEN DE CATEGORÍAS DE EJERCICIOS */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Rutinas por Categoría</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {EXERCISE_CATEGORIES.map(category => {
                    const count = allExercises.filter(e => e.category === category.id && e.is_active).length
                    return (
                      <div key={category.id} className={`${category.color} text-white rounded-lg p-4 text-center`}>
                        <div className="text-2xl mb-2">{category.icon}</div>
                        <div className="text-xl font-bold">{count}</div>
                        <div className="text-sm">{category.name}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB ANALYTICS */}
          {activeAdminTab === 'analytics' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Analíticas y Métricas de Uso</h2>
                <span className="text-2xl">{Icons.BarChart()}</span>
              </div>

              {usageAnalytics && (
                <>
                  {/* Métricas generales */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100">Usuarios Activos</p>
                          <p className="text-3xl font-bold">{usageAnalytics.activeUsers}</p>
                        </div>
                        <span className="text-3xl">{Icons.Users()}</span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-100">Sesión Promedio</p>
                          <p className="text-3xl font-bold">{Math.round(usageAnalytics.avgSessionDuration)}min</p>
                        </div>
                        <span className="text-3xl">{Icons.Calendar()}</span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-100">Total Usuarios</p>
                          <p className="text-3xl font-bold">{usageAnalytics.totalUsers}</p>
                        </div>
                        <span className="text-3xl">{Icons.TrendingUp()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Funciones más usadas */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">Funciones Más Utilizadas</h3>
                    <div className="space-y-3">
                      {usageAnalytics.mostUsedFeatures.map((feature: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium">{feature.feature}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full" 
                                style={{width: `${(feature.count / usageAnalytics.mostUsedFeatures[0]?.count) * 100}%`}}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">{feature.count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Distribución de objetivos */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">Distribución de Objetivos de Usuarios</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(usageAnalytics.userGoalsDistribution).map(([goal, count]: [string, any]) => {
                        const goalData = GOALS.find(g => g.id === goal)
                        return (
                          <div key={goal} className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">{count}</div>
                            <div className="text-sm text-gray-600">{goalData?.label || goal}</div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* SUGERENCIAS DE IA BASADAS EN PATRONES */}
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <span>🤖</span>
                      Sugerencias de IA para Suplementación
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-white/10 rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Patrón Detectado: Alta actividad física</h4>
                        <p className="text-sm mb-2">El 65% de usuarios activos buscan objetivos de ganancia muscular</p>
                        <div className="bg-white/20 rounded p-2">
                          <strong>Recomendación:</strong> Promocionar MusclePro Elite y suplementos de recuperación
                        </div>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Patrón Detectado: Objetivos emocionales</h4>
                        <p className="text-sm mb-2">El 40% busca calma y equilibrio mental</p>
                        <div className="bg-white/20 rounded p-2">
                          <strong>Recomendación:</strong> Destacar RelaxMind Pro y suplementos para el estrés
                        </div>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Patrón Detectado: Baja energía matutina</h4>
                        <p className="text-sm mb-2">Usuarios reportan fatiga en las primeras horas</p>
                        <div className="bg-white/20 rounded p-2">
                          <strong>Recomendación:</strong> Impulsar VitalEnergy Plus para energía natural
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* TAB EXERCISES */}
          {activeAdminTab === 'exercises' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Gestión de Rutinas de Ejercicio</h2>
                <button
                  onClick={() => setShowExerciseDialog(true)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                >
                  <span>{Icons.Plus()}</span>
                  Nueva Rutina
                </button>
              </div>

              {/* Filtros por categoría */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedExerciseCategory('all')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedExerciseCategory === 'all' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Todas
                </button>
                {EXERCISE_CATEGORIES.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedExerciseCategory(category.id)}
                    className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${
                      selectedExerciseCategory === category.id 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    <span>{category.icon}</span>
                    {category.name}
                  </button>
                ))}
              </div>

              {/* Lista de rutinas */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {allExercises
                  .filter(exercise => selectedExerciseCategory === 'all' || exercise.category === selectedExerciseCategory)
                  .map(exercise => {
                    const category = EXERCISE_CATEGORIES.find(c => c.id === exercise.category)
                    return (
                      <div key={exercise.id} className="bg-white rounded-lg shadow p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xl">{category?.icon}</span>
                              <h3 className="font-bold text-lg">{exercise.name}</h3>
                            </div>
                            <p className="text-gray-600 text-sm mb-2">{exercise.description}</p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              <span className={`px-2 py-1 text-xs rounded ${category?.color} text-white`}>
                                {category?.name}
                              </span>
                              <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
                                {exercise.difficulty}
                              </span>
                              <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                                {exercise.duration_minutes} min
                              </span>
                              <span className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded">
                                {exercise.calories_burned} cal
                              </span>
                              <span className={`px-2 py-1 text-xs rounded ${exercise.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                {exercise.is_active ? "Activo" : "Inactivo"}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-1 ml-4">
                            <button
                              onClick={() => window.open(exercise.youtube_url, '_blank')}
                              className="p-2 text-gray-400 hover:text-red-600"
                              title="Ver en YouTube"
                            >
                              {Icons.Play()}
                            </button>
                            <button
                              onClick={() => toggleExerciseStatus(exercise.id)}
                              className="p-2 text-gray-400 hover:text-gray-600"
                              title={exercise.is_active ? "Desactivar" : "Activar"}
                            >
                              {Icons.Eye()}
                            </button>
                            <button
                              onClick={() => deleteExercise(exercise.id)}
                              className="p-2 text-gray-400 hover:text-red-600"
                              title="Eliminar rutina"
                            >
                              {Icons.Trash2()}
                            </button>
                          </div>
                        </div>
                        
                        {/* Miniatura e instrucciones */}
                        <div className="flex gap-4">
                          <img
                            src={exercise.thumbnail_url || "/placeholder.svg"}
                            alt={exercise.name}
                            className="w-24 h-16 object-cover rounded bg-gray-100 flex-shrink-0"
                          />
                          <div className="flex-1">
                            <h5 className="font-semibold text-sm mb-1">Instrucciones:</h5>
                            <ul className="text-xs text-gray-600 space-y-1">
                              {exercise.instructions.slice(0, 3).map((instruction, index) => (
                                <li key={index}>• {instruction}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
          )}

          {/* TAB TIPS */}
          {activeAdminTab === 'tips' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Tips de Bienestar</h2>
                <button
                  onClick={() => setShowTipDialog(true)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                >
                  <span>{Icons.Plus()}</span>
                  Nuevo Tip
                </button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {allTips.map(tip => (
                  <div key={tip.id} className="bg-white rounded-lg shadow p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{tip.icon}</span>
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">{tip.category}</span>
                        <span className={`px-2 py-1 text-xs rounded ${tip.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {tip.is_active ? "Activo" : "Inactivo"}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => toggleTipStatus(tip.id)}
                          className="p-1 text-gray-400 hover:text-gray-600"
                          title={tip.is_active ? "Desactivar" : "Activar"}
                        >
                          {Icons.Eye()}
                        </button>
                        <button
                          onClick={() => deleteTip(tip.id)}
                          className="p-1 text-gray-400 hover:text-red-600"
                          title="Eliminar permanentemente"
                        >
                          {Icons.Trash2()}
                        </button>
                      </div>
                    </div>
                    <h3 className="font-semibold mb-2">{tip.title}</h3>
                    <p className="text-sm text-gray-600">{tip.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB RESOURCES */}
          {activeAdminTab === 'resources' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Recursos y Enlaces</h2>
                <button
                  onClick={() => setShowResourceDialog(true)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                >
                  <span>{Icons.Plus()}</span>
                  Nuevo Recurso
                </button>
              </div>
              <div className="space-y-4">
                {allResources.map(resource => (
                  <div key={resource.id} className="bg-white rounded-lg shadow p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold">{resource.title}</h4>
                        <p className="text-sm text-gray-600">{resource.description}</p>
                        <div className="flex gap-2 mt-2">
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">{resource.type}</span>
                          <span className={`px-2 py-1 text-xs rounded ${resource.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {resource.is_active ? "Activo" : "Inactivo"}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => window.open(resource.url, '_blank')}
                          className="p-2 text-gray-400 hover:text-gray-600"
                          title="Abrir enlace"
                        >
                          {Icons.ExternalLink()}
                        </button>
                        <button
                          onClick={() => deleteResource(resource.id)}
                          className="p-2 text-gray-400 hover:text-red-600"
                          title="Eliminar recurso"
                        >
                          {Icons.Trash2()}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB SUPPLEMENTS */}
          {activeAdminTab === 'supplements' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Gestión de Suplementos</h2>
                <button
                  onClick={() => setShowSupplementDialog(true)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                >
                  <span>{Icons.Plus()}</span>
                  Nuevo Suplemento
                </button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {allSupplements.map(supplement => (
                  <div key={supplement.id} className="bg-white rounded-lg shadow p-4">
                    <img
                      src={supplement.image_url || "/placeholder.svg"}
                      alt={supplement.name}
                      className="w-full h-32 object-cover rounded-lg mb-3 bg-gray-100"
                    />
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold">{supplement.name}</h4>
                        <p className="text-lg font-bold text-green-600">${supplement.price.toLocaleString()}</p>
                        {supplement.category && (
                          <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded mt-1">
                            {supplement.category}
                          </span>
                        )}
                        {supplement.stock_quantity !== undefined && (
                          <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded mt-1 ml-1">
                            Stock: {supplement.stock_quantity}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => toggleSupplementStatus(supplement.id)}
                          className="p-1 text-gray-400 hover:text-gray-600"
                          title={supplement.is_active ? "Desactivar" : "Activar"}
                        >
                          {Icons.Eye()}
                        </button>
                        <button
                          onClick={() => deleteSupplement(supplement.id)}
                          className="p-1 text-gray-400 hover:text-red-600"
                          title="Eliminar suplemento"
                        >
                          {Icons.Trash2()}
                        </button>
                      </div>
                    </div>
                    <span className={`inline-block px-2 py-1 text-xs rounded mb-2 ${supplement.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {supplement.is_active ? "Activo" : "Inactivo"}
                    </span>
                    <p className="text-sm text-gray-600 mb-2">{supplement.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* DIALOGS PARA ADMIN */}
        {/* Dialog para rutinas de ejercicio */}
        {showExerciseDialog && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-10 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Agregar Nueva Rutina de Ejercicio</h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="Nombre de la rutina"
                    value={newExercise.name}
                    onChange={(e) => setNewExercise(prev => ({ ...prev, name: e.target.value }))}
                  />
                  <select
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    value={newExercise.category}
                    onChange={(e) => setNewExercise(prev => ({ ...prev, category: e.target.value as any }))}
                  >
                    {EXERCISE_CATEGORIES.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.icon} {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg h-20"
                  placeholder="Descripción de la rutina"
                  value={newExercise.description}
                  onChange={(e) => setNewExercise(prev => ({ ...prev, description: e.target.value }))}
                <div className="grid grid-cols-3 gap-4">
                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="Duración (min)"
                    type="number"
                    value={newExercise.duration_minutes}
                    onChange={(e) => setNewExercise(prev => ({ ...prev, duration_minutes: e.target.value }))}
                  />
                  <select
                    className="w-full p-3 border border-gray-300 rounded-lg"\
                    value={newExercise.difficulty}
                    onChange={(e) => setNewExercise(prev => ({ ...prev, difficulty: e.target.value as any }))}
                  >
                    <option value="principiante">Principiante</option>
                    <option value="intermedio">Intermedio</option>
                    <option value="avanzado">Avanzado</option>
                  </select>
                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="Calorías quemadas"
                    type="number"
                    value={newExercise.calories_burned}
                    onChange={(e) => setNewExercise(prev => ({ ...prev, calories_burned: e.target.value }))}
                  />
                </div>
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="URL de YouTube (requerido)"
                  value={newExercise.youtube_url}
                  onChange={(e) => setNewExercise(prev => ({ ...prev, youtube_url: e.target.value }))}
                />
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="URL de miniatura (opcional)"
                  value={newExercise.thumbnail_url}
                  onChange={(e) => setNewExercise(prev => ({ ...prev, thumbnail_url: e.target.value }))}
                />
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg h-20"
                  placeholder="Instrucciones (separadas por comas)"
                  value={newExercise.instructions}
                  onChange={(e) => setNewExercise(prev => ({ ...prev, instructions: e.target.value }))}
                />
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Equipamiento necesario (separado por comas, opcional)"
                  value={newExercise.equipment_needed}
                  onChange={(e) => setNewExercise(prev => ({ ...prev, equipment_needed: e.target.value }))}
                />
                <div className="flex gap-2 pt-4">
                  <button
                    onClick={addExerciseRoutine}
                    className="flex-1 bg-green-500 text-white p-3 rounded-lg hover:bg-green-600"
                  >
                    Agregar Rutina
                  </button>
                  <button
                    onClick={() => setShowExerciseDialog(false)}
                    className="flex-1 bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dialog para tips */}
        {showTipDialog && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Agregar Nuevo Tip</h3>
              <div className="space-y-4">
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Categoría"
                  value={newTip.category}
                  onChange={(e) => setNewTip(prev => ({ ...prev, category: e.target.value }))}
                />
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Título"
                  value={newTip.title}
                  onChange={(e) => setNewTip(prev => ({ ...prev, title: e.target.value }))}
                />
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg h-24"
                  placeholder="Contenido"
                  value={newTip.content}
                  onChange={(e) => setNewTip(prev => ({ ...prev, content: e.target.value }))}
                />
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Emoji"
                  value={newTip.icon}
                  onChange={(e) => setNewTip(prev => ({ ...prev, icon: e.target.value }))}
                />
                <div className="flex gap-2">
                  <button
                    onClick={addGlobalTip}
                    className="flex-1 bg-green-500 text-white p-3 rounded-lg hover:bg-green-600"
                  >
                    Agregar Tip
                  </button>
                  <button
                    onClick={() => setShowTipDialog(false)}
                    className="flex-1 bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dialog para recursos */}
        {showResourceDialog && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Agregar Recurso</h3>
              <div className="space-y-4">
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  value={resourceType}
                  onChange={(e) => setResourceType(e.target.value as 'mindfulness' | 'nutrition')}
                >
                  <option value="mindfulness">Mindfulness</option>
                  <option value="nutrition">Nutrición</option>
                </select>
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Título"
                  value={newResource.title}
                  onChange={(e) => setNewResource(prev => ({ ...prev, title: e.target.value }))}
                />
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Descripción"
                  value={newResource.description}
                  onChange={(e) => setNewResource(prev => ({ ...prev, description: e.target.value }))}
                />
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="URL"
                  value={newResource.url}
                  onChange={(e) => setNewResource(prev => ({ ...prev, url: e.target.value }))}
                />
                <div className="flex gap-2">
                  <button
                    onClick={addGlobalResource}
                    className="flex-1 bg-green-500 text-white p-3 rounded-lg hover:bg-green-600"
                  >
                    Agregar
                  </button>
                  <button
                    onClick={() => setShowResourceDialog(false)}
                    className="flex-1 bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dialog para suplementos */}
        {showSupplementDialog && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-10 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Agregar Suplemento</h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Nombre"
                  value={newSupplement.name}
                  onChange={(e) => setNewSupplement(prev => ({ ...prev, name: e.target.value }))}
                />
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg h-20"
                  placeholder="Descripción"
                  value={newSupplement.description}
                  onChange={(e) => setNewSupplement(prev => ({ ...prev, description: e.target.value }))}
                />
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Beneficios (separados por comas)"
                  value={newSupplement.benefits}
                  onChange={(e) => setNewSupplement(prev => ({ ...prev, benefits: e.target.value }))}
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="Precio"
                    type="number"
                    value={newSupplement.price}
                    onChange={(e) => setNewSupplement(prev => ({ ...prev, price: e.target.value }))}
                  />
                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="Stock"
                    type="number"
                    value={newSupplement.stock_quantity}
                    onChange={(e) => setNewSupplement(prev => ({ ...prev, stock_quantity: e.target.value }))}
                  />
                </div>
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Categoría"
                  value={newSupplement.category}
                  onChange={(e) => setNewSupplement(prev => ({ ...prev, category: e.target.value }))}
                />
                              
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">Imagen del producto:</label>
                                
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileSelect}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer flex flex-col items-center space-y-2"
                    >
                      {imagePreview ? (
                        <img
                          src={imagePreview || "/placeholder.svg"}
                          alt="Preview"
                          className="w-32 h-32 object-cover rounded-lg border"
                        />
                      ) : (
                        <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center border">
                          <span className="text-gray-400 text-3xl">📷</span>
                        </div>
                      )}
                      <span className="text-sm text-blue-600 font-medium">
                        {imageFile ? 'Cambiar imagen' : 'Seleccionar imagen'}
                      </span>
                      <span className="text-xs text-gray-500">
                        JPG, PNG, WebP o GIF (máx. 50MB)
                      </span>
                    </label>
                  </div>
                                
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">o</span>
                    </div>
                  </div>
                                
                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="URL de imagen externa (opcional)"
                    value={newSupplement.image_url}
                    onChange={(e) => setNewSupplement(prev => ({ ...prev, image_url: e.target.value }))}
                  />
                </div>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg h-20"
                  placeholder="Mensaje WhatsApp personalizado"
                  value={newSupplement.whatsapp_message}
                  onChange={(e) => setNewSupplement(prev => ({ ...prev, whatsapp_message: e.target.value }))}
                />
                <div className="flex gap-2">
                  <button
                    onClick={addSupplementAdmin}
                    className="flex-1 bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 disabled:bg-gray-400 flex items-center justify-center gap-2 transition-colors"
                    disabled={uploading}
                  >
                    {uploading ? (
                      <>
                        <span className="animate-spin">⏳</span>
                        Subiendo imagen...
                      </>
                    ) : (
                      <>
                        <span>📦</span>
                        Agregar Suplemento
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setShowSupplementDialog(false)
                      resetSupplementForm()
                    }}
                    className="flex-1 bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  if (isAdmin) {
    return <AdminPanel />
  }

  if (connectionStatus === 'connecting') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md text-center">
          <div className="text-4xl mb-4">{Icons.Loader2()}</div>
          <h3 className="text-lg font-semibold mb-2">Conectando con Supabase</h3>
          <p className="text-gray-600">Inicializando base de datos...</p>
        </div>
      </div>
    )
  }
\
  if (connectionStatus === 'error') {
    return (
      <div className=\"min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md text-center">
          <div className="text-4xl mb-4 text-red-500">{Icons.X()}</div>
          <h3 className="text-lg font-semibold mb-2">Error de conexión</h3>
          <p className="text-gray-600 mb-4">No se pudo conectar con la base de datos</p>
          <button
            onClick={() => window.location.reload()}
            className=\"bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <div onClick={handleLogoClick} className="cursor-pointer">
              <h1 className="text-2xl font-bold text-green-600">VitalMente</h1>
              <p className="text-gray-600">Tu compañero de bienestar personalizado</p>
              <span className=\"inline-block mt-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded">🌐 Conectado a Supabase</span>
            </div>
          </div>
                
          <div className="space-y-6">
            <div className="flex rounded-lg bg-gray-100 p-1">
              <button
                onClick={() => {/* No necesitamos authState, solo mostrar login */}}
                className="flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors bg-white text-green-600 shadow-sm"
              >
                Ingresar
              </button>
              <button
                onClick={() => {/* Toggle entre login y register */}}
                className="flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors text-gray-600 hover:text-gray-900"
              >
                Crear Cuenta
              </button>
            </div>
            <div className="space-y-4">
              <input
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="+57 300 123 4567"
                value={loginForm.phone}
                onChange={(e) => setLoginForm(prev => ({ ...prev, phone: e.target.value }))}
              />
              <input
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                type="password"
                placeholder="Código de 10 dígitos"
                maxLength={10}
                value={loginForm.accessCode}
                onChange={(e) => setLoginForm(prev => ({ ...prev, accessCode: e.target.value }))}
              />
              <button
                onClick={handleLogin}
                className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 disabled:bg-gray-400 flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span>{Icons.Loader2()}</span>
                    Ingresando...
                  </>
                ) : (
                  "Ingresar"
                )}
              </button>
            </div>
          </div>
        </div>

        {showAdminLogin && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-80 shadow-lg rounded-md bg-white">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Acceso Administrador</h3>
              <input
                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                type="password"
                placeholder="Código de acceso"
                value={adminCode}
                onChange={(e) => setAdminCode(e.target.value)}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAdminLogin}
                  className="flex-1 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
                >
                  Ingresar
                </button>
                <button
                  onClick={() => setShowAdminLogin(false)}
                  className="flex-1 bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  const activeTips = globalTips.filter(tip => tip.is_active)
  const mindfulnessResources = globalResources.filter(r => r.type === 'mindfulness' && r.is_active)
  const nutritionResources = globalResources.filter(r => r.type === 'nutrition' && r.is_active)
  const caloriesProgress = getCaloriesProgress()

  return (
    <div className="min-h-screen bg-gray-50">
      <SaveStatusIndicator />
      {currentUser && <FloatingActionButtons />}
        
      <div className="pb-20">
        {/* Navegación de tabs expandida */}
        <div className="bg-white border-b">
          <div className="flex">
            {['inicio', 'nutricion', 'ejercicio', 'mindfulness', 'suplementos'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 px-2 text-sm font-medium capitalize ${
                  activeTab === tab
                    ? 'text-green-600 border-b-2 border-green-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex flex-col items-center space-y-1">
                  <span className="text-lg">
                    {tab === 'inicio' && Icons.Home()}
                    {tab === 'nutricion' && Icons.UtensilsCrossed()}
                    {tab === 'ejercicio' && Icons.Activity()}
                    {tab === 'mindfulness' && Icons.Brain()}
                    {tab === 'suplementos' && Icons.Package()}
                  </span>
                  <span className="text-xs">{tab === 'nutricion' ? 'Nutrición' : tab}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4">
          {/* TAB INICIO */}
          {activeTab === 'inicio' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="text-center flex-1">
                  <h2 className="text-2xl font-bold text-gray-800">¡Hola {currentUser?.name}! 👋</h2>
                  <p className="text-gray-600">Tu progreso de hoy</p>
                  <p className="text-sm text-green-600 font-medium mt-1">
                    {getMotivational
