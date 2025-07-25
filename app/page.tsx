"use client"

import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"

// ============================================================================
// ICONOS OPTIMIZADOS PARA MÓVIL CON TAMAÑOS RESPONSIVOS
// ============================================================================
const Icons = {
  Home: ({ size = "text-xl" }: { size?: string }) => <span className={size}>🏠</span>,
  UtensilsCrossed: ({ size = "text-xl" }: { size?: string }) => <span className={size}>🍽️</span>,
  Activity: ({ size = "text-xl" }: { size?: string }) => <span className={size}>💪</span>,
  Brain: ({ size = "text-xl" }: { size?: string }) => <span className={size}>🧠</span>,
  ChevronLeft: ({ size = "text-xl" }: { size?: string }) => <span className={size}>◀️</span>,
  ChevronRight: ({ size = "text-xl" }: { size?: string }) => <span className={size}>▶️</span>,
  Lightbulb: ({ size = "text-xl" }: { size?: string }) => <span className={size}>💡</span>,
  Droplets: ({ size = "text-xl" }: { size?: string }) => <span className={size}>💧</span>,
  Plus: ({ size = "text-xl" }: { size?: string }) => <span className={size}>+</span>,
  Minus: ({ size = "text-xl" }: { size?: string }) => <span className={size}>-</span>,
  RotateCcw: ({ size = "text-xl" }: { size?: string }) => <span className={size}>🔄</span>,
  X: ({ size = "text-xl" }: { size?: string }) => <span className={size}>✖️</span>,
  ExternalLink: ({ size = "text-xl" }: { size?: string }) => <span className={size}>🔗</span>,
  Edit: ({ size = "text-xl" }: { size?: string }) => <span className={size}>✏️</span>,
  Trash2: ({ size = "text-xl" }: { size?: string }) => <span className={size}>🗑️</span>,
  LogOut: ({ size = "text-xl" }: { size?: string }) => <span className={size}>🚪</span>,
  Users: ({ size = "text-xl" }: { size?: string }) => <span className={size}>👥</span>,
  MessageSquare: ({ size = "text-xl" }: { size?: string }) => <span className={size}>💬</span>,
  Link: ({ size = "text-xl" }: { size?: string }) => <span className={size}>🔗</span>,
  ChefHat: ({ size = "text-xl" }: { size?: string }) => <span className={size}>👨‍🍳</span>,
  Globe: ({ size = "text-xl" }: { size?: string }) => <span className={size}>🌍</span>,
  Eye: ({ size = "text-xl" }: { size?: string }) => <span className={size}>👁️</span>,
  Phone: ({ size = "text-xl" }: { size?: string }) => <span className={size}>📞</span>,
  UserPlus: ({ size = "text-xl" }: { size?: string }) => <span className={size}>👤+</span>,
  Calendar: ({ size = "text-xl" }: { size?: string }) => <span className={size}>📅</span>,
  Package: ({ size = "text-xl" }: { size?: string }) => <span className={size}>📦</span>,
  Loader2: ({ size = "text-xl" }: { size?: string }) => <span className={size}>⏳</span>,
  Calculator: ({ size = "text-xl" }: { size?: string }) => <span className={size}>🧮</span>,
  CheckCircle: ({ size = "text-xl" }: { size?: string }) => <span className={size}>✅</span>,
  AlertCircle: ({ size = "text-xl" }: { size?: string }) => <span className={size}>⚠️</span>,
  Play: ({ size = "text-xl" }: { size?: string }) => <span className={size}>▶️</span>,
  Dumbbell: ({ size = "text-xl" }: { size?: string }) => <span className={size}>🏋️</span>,
  Music: ({ size = "text-xl" }: { size?: string }) => <span className={size}>🎵</span>,
  Trophy: ({ size = "text-xl" }: { size?: string }) => <span className={size}>🏆</span>,
  Star: ({ size = "text-xl" }: { size?: string }) => <span className={size}>⭐</span>,
  Crown: ({ size = "text-xl" }: { size?: string }) => <span className={size}>👑</span>,
  Fire: ({ size = "text-xl" }: { size?: string }) => <span className={size}>🔥</span>,
  Target: ({ size = "text-xl" }: { size?: string }) => <span className={size}>🎯</span>,
  Zap: ({ size = "text-xl" }: { size?: string }) => <span className={size}>⚡</span>,
  Gift: ({ size = "text-xl" }: { size?: string }) => <span className={size}>🎁</span>,
  Medal: ({ size = "text-xl" }: { size?: string }) => <span className={size}>🏅</span>,
  Rocket: ({ size = "text-xl" }: { size?: string }) => <span className={size}>🚀</span>,
  Diamond: ({ size = "text-xl" }: { size?: string }) => <span className={size}>💎</span>,
  Magic: ({ size = "text-xl" }: { size?: string }) => <span className={size}>✨</span>,
  Robot: ({ size = "text-xl" }: { size?: string }) => <span className={size}>🤖</span>,
  Chart: ({ size = "text-xl" }: { size?: string }) => <span className={size}>📊</span>,
  TrendingUp: ({ size = "text-xl" }: { size?: string }) => <span className={size}>📈</span>,
  Database: ({ size = "text-xl" }: { size?: string }) => <span className={size}>🗄️</span>,
  Settings: ({ size = "text-xl" }: { size?: string }) => <span className={size}>⚙️</span>,
  Shield: ({ size = "text-xl" }: { size?: string }) => <span className={size}>🛡️</span>,
  Menu: ({ size = "text-xl" }: { size?: string }) => <span className={size}>☰</span>,
  Close: ({ size = "text-xl" }: { size?: string }) => <span className={size}>✕</span>,
  Coffee: ({ size = "text-xl" }: { size?: string }) => <span className={size}>☕</span>,
  Blend: ({ size = "text-xl" }: { size?: string }) => <span className={size}>🥤</span>,
  Save: ({ size = "text-xl" }: { size?: string }) => <span className={size}>💾</span>,
  Info: ({ size = "text-xl" }: { size?: string }) => <span className={size}>ℹ️</span>,
  BookOpen: ({ size = "text-xl" }: { size?: string }) => <span className={size}>📖</span>,
  Utensils: ({ size = "text-xl" }: { size?: string }) => <span className={size}>🍴</span>,
}

// ============================================================================
// CONFIGURACIÓN DE SUPABASE
// ============================================================================
const SUPABASE_URL = "https://frzyksfceugddjrerxkf.supabase.co"
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyenlrc2ZjZXVnZGRqcmVyeGtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3MzgwMTUsImV4cCI6MjA2NzMxNDAxNX0.E6ZjfC6RJoA98RkDK-I87k2l3d7naK9C-mEC0alH7L8"

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// ============================================================================
// TIPOS DE DATOS EXPANDIDOS
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
  common_portion_size: number
  common_portion_name: string
  is_active: boolean
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

// 🆕 NUEVO: Interfaz para batidos personalizados
interface CustomSmoothie {
  id: string
  user_id: string
  name: string
  ingredients: SmoothieIngredient[]
  total_calories: number
  total_protein: number
  total_carbs: number
  total_fats: number
  created_at: string
}

interface SmoothieIngredient {
  food_id: string
  food_name: string
  quantity_grams: number
  calories: number
  protein: number
  carbs: number
  fats: number
}

// 🆕 NUEVO: Interfaz para composición de comidas mejorada
interface EnhancedMealComposition {
  id: string
  user_id: string
  date: string
  meal_type: "desayuno" | "almuerzo" | "cena"
  meal_name: string
  ingredients: MealIngredient[]
  total_calories: number
  total_protein: number
  total_carbs: number
  total_fats: number
  created_at: string
}

interface MealIngredient {
  food_id: string
  food_name: string
  quantity_grams: number
  calories: number
  protein: number
  carbs: number
  fats: number
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
  type: "mindfulness" | "nutrition" | "exercise"
  title: string
  description: string
  url: string
  image_url?: string
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

interface UserGamification {
  id: string
  user_id: string
  total_points: number
  current_level: number
  streak_days: number
  longest_streak: number
  badges: string[]
  weekly_points: number
  monthly_points: number
  experience_points: number
  next_level_points: number
  created_at: string
  updated_at: string
}

interface AIRecommendation {
  id: string
  user_id: string
  supplement_names: string[]
  recommendation_type: string
  priority: string
  reason: string
  sales_angle: string
  discount_percentage: number
  optimal_timing: string
  confidence_score: number
  user_patterns: string[]
  is_active: boolean
  shown_count: number
  clicked: boolean
  purchased: boolean
  expires_at?: string
  created_at: string
}

// ============================================================================
// BANCO DE ALIMENTOS EXPANDIDO (100+ ALIMENTOS + 20+ BEBIDAS)
// ============================================================================
const EXPANDED_FOOD_DATABASE = [
  // PROTEÍNAS (25 alimentos)
  { name: "Pechuga de pollo", calories: 165, protein: 31, carbs: 0, fats: 3.6, category: "proteinas" },
  { name: "Carne de res magra", calories: 250, protein: 26, carbs: 0, fats: 15, category: "proteinas" },
  { name: "Salmón", calories: 208, protein: 20, carbs: 0, fats: 13, category: "proteinas" },
  { name: "Atún en agua", calories: 132, protein: 28, carbs: 0, fats: 1.3, category: "proteinas" },
  { name: "Huevos enteros", calories: 155, protein: 13, carbs: 1.1, fats: 11, category: "proteinas" },
  { name: "Clara de huevo", calories: 52, protein: 11, carbs: 0.7, fats: 0.2, category: "proteinas" },
  { name: "Pavo", calories: 189, protein: 29, carbs: 0, fats: 7.4, category: "proteinas" },
  { name: "Cerdo magro", calories: 242, protein: 27, carbs: 0, fats: 14, category: "proteinas" },
  { name: "Pechuga de pavo", calories: 135, protein: 30, carbs: 0, fats: 1, category: "proteinas" },
  { name: "Camarones", calories: 85, protein: 20, carbs: 0, fats: 0.5, category: "proteinas" },
  { name: "Merluza", calories: 90, protein: 17, carbs: 0, fats: 2, category: "proteinas" },
  { name: "Tilapia", calories: 96, protein: 20, carbs: 0, fats: 1.7, category: "proteinas" },
  { name: "Sardinas", calories: 208, protein: 25, carbs: 0, fats: 11, category: "proteinas" },
  { name: "Bacalao", calories: 82, protein: 18, carbs: 0, fats: 0.7, category: "proteinas" },
  { name: "Tofu", calories: 76, protein: 8, carbs: 1.9, fats: 4.8, category: "proteinas" },
  { name: "Tempeh", calories: 193, protein: 19, carbs: 9, fats: 11, category: "proteinas" },
  { name: "Seitan", calories: 370, protein: 75, carbs: 14, fats: 1.9, category: "proteinas" },
  { name: "Queso cottage", calories: 98, protein: 11, carbs: 3.4, fats: 4.3, category: "proteinas" },
  { name: "Queso ricotta", calories: 174, protein: 11, carbs: 3, fats: 13, category: "proteinas" },
  { name: "Yogurt griego", calories: 59, protein: 10, carbs: 3.6, fats: 0.4, category: "proteinas" },
  { name: "Proteína de suero", calories: 367, protein: 75, carbs: 7, fats: 4, category: "proteinas" },
  { name: "Caseína", calories: 373, protein: 81, carbs: 3.8, fats: 1.8, category: "proteinas" },
  { name: "Proteína vegetal", calories: 345, protein: 70, carbs: 8, fats: 3, category: "proteinas" },
  { name: "Lentejas rojas", calories: 116, protein: 9, carbs: 20, fats: 0.4, category: "proteinas" },
  { name: "Garbanzos cocidos", calories: 164, protein: 8.9, carbs: 27, fats: 2.6, category: "proteinas" },

  // CARBOHIDRATOS (30 alimentos)
  { name: "Arroz blanco", calories: 130, protein: 2.7, carbs: 28, fats: 0.3, category: "carbohidratos" },
  { name: "Arroz integral", calories: 123, protein: 2.6, carbs: 25, fats: 1, category: "carbohidratos" },
  { name: "Quinoa", calories: 120, protein: 4.4, carbs: 22, fats: 1.9, category: "carbohidratos" },
  { name: "Avena", calories: 389, protein: 17, carbs: 66, fats: 6.9, category: "carbohidratos" },
  { name: "Pan integral", calories: 247, protein: 13, carbs: 41, fats: 4.2, category: "carbohidratos" },
  { name: "Pasta integral", calories: 124, protein: 5, carbs: 25, fats: 1.1, category: "carbohidratos" },
  { name: "Papa blanca", calories: 77, protein: 2, carbs: 17, fats: 0.1, category: "carbohidratos" },
  { name: "Papa dulce", calories: 86, protein: 1.6, carbs: 20, fats: 0.1, category: "carbohidratos" },
  { name: "Yuca", calories: 160, protein: 1.4, carbs: 38, fats: 0.3, category: "carbohidratos" },
  { name: "Plátano verde", calories: 122, protein: 1.3, carbs: 32, fats: 0.4, category: "carbohidratos" },
  { name: "Arepa de maíz", calories: 150, protein: 4, carbs: 30, fats: 1, category: "carbohidratos" },
  { name: "Cebada", calories: 354, protein: 12, carbs: 73, fats: 2.3, category: "carbohidratos" },
  { name: "Trigo bulgur", calories: 342, protein: 12, carbs: 76, fats: 1.3, category: "carbohidratos" },
  { name: "Amaranto", calories: 371, protein: 14, carbs: 65, fats: 7, category: "carbohidratos" },
  { name: "Mijo", calories: 378, protein: 11, carbs: 73, fats: 4.2, category: "carbohidratos" },
  { name: "Tortilla de maíz", calories: 218, protein: 5.7, carbs: 45, fats: 2.9, category: "carbohidratos" },
  { name: "Tortilla de trigo", calories: 304, protein: 8.2, carbs: 51, fats: 7.9, category: "carbohidratos" },
  { name: "Galletas integrales", calories: 451, protein: 7.5, carbs: 71, fats: 15, category: "carbohidratos" },
  { name: "Cereal integral", calories: 357, protein: 12, carbs: 67, fats: 4.7, category: "carbohidratos" },
  { name: "Granola", calories: 471, protein: 10, carbs: 64, fats: 20, category: "carbohidratos" },
  { name: "Muesli", calories: 367, protein: 10, carbs: 66, fats: 9, category: "carbohidratos" },
  { name: "Pan de centeno", calories: 259, protein: 8.5, carbs: 48, fats: 3.3, category: "carbohidratos" },
  { name: "Bagel integral", calories: 250, protein: 10, carbs: 49, fats: 1.5, category: "carbohidratos" },
  { name: "Crackers integrales", calories: 408, protein: 10, carbs: 68, fats: 12, category: "carbohidratos" },
  { name: "Polenta", calories: 70, protein: 1.7, carbs: 16, fats: 0.2, category: "carbohidratos" },
  { name: "Tapioca", calories: 358, protein: 0.6, carbs: 88, fats: 0.1, category: "carbohidratos" },
  { name: "Harina de avena", calories: 379, protein: 13, carbs: 68, fats: 6.5, category: "carbohidratos" },
  { name: "Salvado de trigo", calories: 216, protein: 16, carbs: 65, fats: 4.3, category: "carbohidratos" },
  { name: "Germen de trigo", calories: 360, protein: 23, carbs: 52, fats: 9.7, category: "carbohidratos" },
  { name: "Chía", calories: 486, protein: 17, carbs: 42, fats: 31, category: "carbohidratos" },

  // VEGETALES (25 alimentos)
  { name: "Brócoli", calories: 34, protein: 2.8, carbs: 7, fats: 0.4, category: "vegetales" },
  { name: "Espinaca", calories: 23, protein: 2.9, carbs: 3.6, fats: 0.4, category: "vegetales" },
  { name: "Lechuga", calories: 15, protein: 1.4, carbs: 2.9, fats: 0.2, category: "vegetales" },
  { name: "Tomate", calories: 18, protein: 0.9, carbs: 3.9, fats: 0.2, category: "vegetales" },
  { name: "Zanahoria", calories: 41, protein: 0.9, carbs: 10, fats: 0.2, category: "vegetales" },
  { name: "Apio", calories: 16, protein: 0.7, carbs: 3, fats: 0.2, category: "vegetales" },
  { name: "Pepino", calories: 16, protein: 0.7, carbs: 4, fats: 0.1, category: "vegetales" },
  { name: "Pimentón rojo", calories: 31, protein: 1, carbs: 7, fats: 0.3, category: "vegetales" },
  { name: "Cebolla", calories: 40, protein: 1.1, carbs: 9.3, fats: 0.1, category: "vegetales" },
  { name: "Ajo", calories: 149, protein: 6.4, carbs: 33, fats: 0.5, category: "vegetales" },
  { name: "Coliflor", calories: 25, protein: 1.9, carbs: 5, fats: 0.3, category: "vegetales" },
  { name: "Repollo", calories: 25, protein: 1.3, carbs: 6, fats: 0.1, category: "vegetales" },
  { name: "Col rizada", calories: 49, protein: 4.3, carbs: 9, fats: 0.9, category: "vegetales" },
  { name: "Acelgas", calories: 19, protein: 1.8, carbs: 3.7, fats: 0.2, category: "vegetales" },
  { name: "Berros", calories: 11, protein: 2.3, carbs: 1.3, fats: 0.1, category: "vegetales" },
  { name: "Rúcula", calories: 25, protein: 2.6, carbs: 3.7, fats: 0.7, category: "vegetales" },
  { name: "Espárragos", calories: 20, protein: 2.2, carbs: 3.9, fats: 0.1, category: "vegetales" },
  { name: "Alcachofa", calories: 47, protein: 3.3, carbs: 11, fats: 0.2, category: "vegetales" },
  { name: "Berenjena", calories: 25, protein: 1, carbs: 6, fats: 0.2, category: "vegetales" },
  { name: "Calabacín", calories: 17, protein: 1.2, carbs: 3.1, fats: 0.3, category: "vegetales" },
  { name: "Calabaza", calories: 26, protein: 1, carbs: 6.5, fats: 0.1, category: "vegetales" },
  { name: "Remolacha", calories: 43, protein: 1.6, carbs: 10, fats: 0.2, category: "vegetales" },
  { name: "Nabo", calories: 28, protein: 0.9, carbs: 6.4, fats: 0.1, category: "vegetales" },
  { name: "Rabanito", calories: 16, protein: 0.7, carbs: 3.4, fats: 0.1, category: "vegetales" },
  { name: "Champiñones", calories: 22, protein: 3.1, carbs: 3.3, fats: 0.3, category: "vegetales" },

  // FRUTAS (20 alimentos)
  { name: "Banano", calories: 89, protein: 1.1, carbs: 23, fats: 0.3, category: "frutas" },
  { name: "Manzana", calories: 52, protein: 0.3, carbs: 14, fats: 0.2, category: "frutas" },
  { name: "Naranja", calories: 47, protein: 0.9, carbs: 12, fats: 0.1, category: "frutas" },
  { name: "Fresa", calories: 32, protein: 0.7, carbs: 7.7, fats: 0.3, category: "frutas" },
  { name: "Piña", calories: 50, protein: 0.5, carbs: 13, fats: 0.1, category: "frutas" },
  { name: "Mango", calories: 60, protein: 0.8, carbs: 15, fats: 0.4, category: "frutas" },
  { name: "Papaya", calories: 43, protein: 0.5, carbs: 11, fats: 0.3, category: "frutas" },
  { name: "Kiwi", calories: 61, protein: 1.1, carbs: 15, fats: 0.5, category: "frutas" },
  { name: "Pera", calories: 57, protein: 0.4, carbs: 15, fats: 0.1, category: "frutas" },
  { name: "Durazno", calories: 39, protein: 0.9, carbs: 10, fats: 0.3, category: "frutas" },
  { name: "Ciruela", calories: 46, protein: 0.7, carbs: 11, fats: 0.3, category: "frutas" },
  { name: "Uvas", calories: 62, protein: 0.6, carbs: 16, fats: 0.2, category: "frutas" },
  { name: "Sandía", calories: 30, protein: 0.6, carbs: 8, fats: 0.2, category: "frutas" },
  { name: "Melón", calories: 34, protein: 0.8, carbs: 8.6, fats: 0.2, category: "frutas" },
  { name: "Arándanos", calories: 57, protein: 0.7, carbs: 14, fats: 0.3, category: "frutas" },
  { name: "Frambuesas", calories: 52, protein: 1.2, carbs: 12, fats: 0.7, category: "frutas" },
  { name: "Moras", calories: 43, protein: 1.4, carbs: 10, fats: 0.5, category: "frutas" },
  { name: "Cereza", calories: 63, protein: 1.1, carbs: 16, fats: 0.2, category: "frutas" },
  { name: "Aguacate", calories: 160, protein: 2, carbs: 9, fats: 15, category: "frutas" },
  { name: "Coco", calories: 354, protein: 3.3, carbs: 15, fats: 33, category: "frutas" },

  // 🆕 NUEVA SECCIÓN: BEBIDAS (22 bebidas)
  { name: "Café negro", calories: 2, protein: 0.3, carbs: 0, fats: 0, category: "bebidas" },
  { name: "Cappuccino", calories: 80, protein: 4, carbs: 6, fats: 4, category: "bebidas" },
  { name: "Latte", calories: 103, protein: 6, carbs: 8, fats: 4, category: "bebidas" },
  { name: "Chocolate caliente", calories: 192, protein: 9, carbs: 27, fats: 6, category: "bebidas" },
  { name: "Frappé de café", calories: 180, protein: 3, carbs: 35, fats: 4, category: "bebidas" },
  { name: "Malteada de vainilla", calories: 250, protein: 8, carbs: 40, fats: 8, category: "bebidas" },
  { name: "Leche entera", calories: 61, protein: 3.2, carbs: 4.8, fats: 3.3, category: "bebidas" },
  { name: "Leche deslactosada", calories: 50, protein: 3.3, carbs: 4.9, fats: 2.4, category: "bebidas" },
  { name: "Leche de almendras", calories: 17, protein: 0.6, carbs: 1.5, fats: 1.2, category: "bebidas" },
  { name: "Leche de soya", calories: 33, protein: 2.9, carbs: 1.8, fats: 1.9, category: "bebidas" },
  { name: "Leche de coco", calories: 19, protein: 0.2, carbs: 1.8, fats: 1.6, category: "bebidas" },
  { name: "Leche de avena", calories: 47, protein: 1.5, carbs: 7.7, fats: 1.5, category: "bebidas" },
  { name: "Jugo de naranja", calories: 45, protein: 0.5, carbs: 11, fats: 0.1, category: "bebidas" },
  { name: "Jugo de manzana", calories: 46, protein: 0.1, carbs: 11, fats: 0.1, category: "bebidas" },
  { name: "Agua de coco", calories: 19, protein: 0.7, carbs: 3.7, fats: 0.2, category: "bebidas" },
  { name: "Té verde", calories: 1, protein: 0, carbs: 0, fats: 0, category: "bebidas" },
  { name: "Té negro", calories: 2, protein: 0, carbs: 0.7, fats: 0, category: "bebidas" },
  { name: "Kombucha", calories: 30, protein: 0, carbs: 7, fats: 0, category: "bebidas" },
  { name: "Batido de proteína", calories: 120, protein: 25, carbs: 3, fats: 1, category: "bebidas" },
  { name: "Smoothie verde", calories: 95, protein: 2, carbs: 22, fats: 0.5, category: "bebidas" },
  { name: "Gaseosa cola", calories: 42, protein: 0, carbs: 11, fats: 0, category: "bebidas" },
  { name: "Cerveza ligera", calories: 43, protein: 0.4, carbs: 3.6, fats: 0, category: "bebidas" }
]

// ============================================================================
// CONFIGURACIÓN DE DATOS (EXPANDIDA)
// ============================================================================
const ACTIVITY_LEVELS = [
  { value: 1.2, label: "Sedentario", desc: "Poco ejercicio" },
  { value: 1.375, label: "Ligero", desc: "1-3 días/semana" },
  { value: 1.55, label: "Moderado", desc: "3-5 días/semana" },
  { value: 1.725, label: "Activo", desc: "6-7 días/semana" },
  { value: 1.9, label: "Muy Activo", desc: "Ejercicio intenso diario" },
]

const GOALS = [
  {
    id: "lose_weight",
    label: "💪 Perder peso y tonificar",
    protein: 30,
    carbs: 35,
    fats: 35,
    calAdjust: -0.2,
    type: "physical",
    category: "physical",
  },
  {
    id: "gain_muscle",
    label: "🏋️ Ganar músculo y fuerza",
    protein: 30,
    carbs: 40,
    fats: 30,
    calAdjust: 0.15,
    type: "physical",
    category: "physical",
  },
  {
    id: "maintain_weight",
    label: "⚖️ Mantener mi peso actual",
    protein: 25,
    carbs: 45,
    fats: 30,
    calAdjust: 0,
    type: "physical",
    category: "physical",
  },
  {
    id: "reduce_stress",
    label: "🧘 Reducir estrés y ansiedad",
    protein: 25,
    carbs: 45,
    fats: 30,
    calAdjust: 0,
    type: "emotional",
    category: "emotional",
  },
  {
    id: "find_calm",
    label: "☮️ Encontrar calma interior",
    protein: 25,
    carbs: 45,
    fats: 30,
    calAdjust: 0,
    type: "emotional",
    category: "emotional",
  },
  {
    id: "boost_confidence",
    label: "✨ Mejorar mi autoestima",
    protein: 25,
    carbs: 45,
    fats: 30,
    calAdjust: 0,
    type: "emotional",
    category: "emotional",
  },
  {
    id: "life_balance",
    label: "⚡ Balancear cuerpo y mente",
    protein: 25,
    carbs: 45,
    fats: 30,
    calAdjust: 0,
    type: "holistic",
    category: "holistic",
  },
  {
    id: "healthy_habits",
    label: "🌱 Crear hábitos sostenibles",
    protein: 25,
    carbs: 45,
    fats: 30,
    calAdjust: 0,
    type: "holistic",
    category: "holistic",
  },
  {
    id: "vitalmente",
    label: "🌟 Sentirme VitalMente",
    protein: 25,
    carbs: 45,
    fats: 30,
    calAdjust: 0,
    type: "holistic",
    category: "holistic",
  },
]

const LEVEL_SYSTEM = {
  levels: [
    { level: 1, name: "Principiante", icon: "🌱", pointsRequired: 0, color: "bg-green-100 text-green-800", description: "¡Bienvenido! Empiezas tu viaje hacia el bienestar. Cada pequeño paso cuenta." },
    { level: 2, name: "Explorador", icon: "🔍", pointsRequired: 100, color: "bg-blue-100 text-blue-800", description: "Estás explorando nuevos hábitos. ¡Sigue descubriendo qué funciona para ti!" },
    { level: 3, name: "Comprometido", icon: "💪", pointsRequired: 300, color: "bg-purple-100 text-purple-800", description: "Muestras compromiso real. Tus hábitos empiezan a consolidarse." },
    { level: 4, name: "Disciplinado", icon: "🎯", pointsRequired: 600, color: "bg-orange-100 text-orange-800", description: "Tu disciplina es admirable. Los resultados empiezan a ser visibles." },
    { level: 5, name: "Experto", icon: "⭐", pointsRequired: 1000, color: "bg-yellow-100 text-yellow-800", description: "Dominas los fundamentos del bienestar. Eres una inspiración para otros." },
    { level: 6, name: "Maestro", icon: "👑", pointsRequired: 1500, color: "bg-red-100 text-red-800", description: "Has alcanzado la maestría. Tu estilo de vida es un ejemplo a seguir." },
    { level: 7, name: "Leyenda", icon: "💎", pointsRequired: 2500, color: "bg-indigo-100 text-indigo-800", description: "Eres una leyenda viviente del bienestar. Tu transformación es extraordinaria." },
    { level: 8, name: "VitalMente", icon: "✨", pointsRequired: 4000, color: "bg-pink-100 text-pink-800", description: "Has alcanzado el nivel máximo: equilibrio perfecto entre cuerpo y mente." },
  ],
  pointsPerAction: {
    water: 5,
    exercise: 20,
    mindfulness: 15,
    meal: 10,
    smoothie: 15,
    custom_meal: 25,
    streak_bonus: 50,
    challenge_complete: 100,
  },
  badges: [
    { id: "hydrated", name: "Hidratado", icon: "💧", description: "Bebe 8 vasos de agua en un día" },
    { id: "warrior", name: "Guerrero", icon: "⚔️", description: "Completa 5 sesiones de ejercicio" },
    { id: "zen", name: "Zen Master", icon: "🧘", description: "Practica mindfulness por 7 días seguidos" },
    { id: "chef", name: "Chef Saludable", icon: "👨‍🍳", description: "Crea 10 comidas personalizadas" },
    { id: "smoothie_king", name: "Rey de Batidos", icon: "🥤", description: "Crea 5 batidos personalizados" },
    { id: "streak", name: "Constante", icon: "🔥", description: "Mantén una racha de 30 días" },
  ]
}

// ============================================================================
// FUNCIONES DE BASE DE DATOS EXPANDIDAS
// ============================================================================
const dbFunctions = {
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
      const { data, error } = await supabase
        .from("daily_progress")
        .select("*")
        .eq("user_id", userId)
        .eq("date", today)
        .single()
      if (error) {
        if (error.code === "PGRST116") {
          return null
        }
        throw error
      }
      return data as DailyProgress
    } catch (error) {
      console.error("Error loading today progress:", error)
      return null
    }
  },

  async saveProgress(userId: string, progress: Omit<DailyProgress, "id" | "user_id" | "date">): Promise<boolean> {
    try {
      const today = new Date().toISOString().split("T")[0]
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
        throw error
      }
      return true
    } catch (error) {
      console.error("Error en saveProgress:", error)
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
      // Intentar obtener de la base de datos primero
      const { data, error } = await supabase
        .from("global_foods")
        .select("*")
        .eq("is_active", true)
        .order("category", { ascending: true })
        .order("name", { ascending: true })
      
      if (error || !data || data.length === 0) {
        // Si no hay datos en la DB, usar el banco expandido
        return EXPANDED_FOOD_DATABASE.map((food, index) => ({
          id: `expanded_${index}`,
          ...food,
          common_portion_size: 100,
          common_portion_name: "gramos",
          is_active: true,
          created_at: new Date().toISOString()
        }))
      }
      
      return data as GlobalFood[]
    } catch (error) {
      console.error("Error loading global foods:", error)
      // Fallback al banco expandido
      return EXPANDED_FOOD_DATABASE.map((food, index) => ({
        id: `expanded_${index}`,
        ...food,
        common_portion_size: 100,
        common_portion_name: "gramos",
        is_active: true,
        created_at: new Date().toISOString()
      }))
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
      const { data, error } = await supabase
        .from("meal_compositions")
        .select("*")
        .eq("user_id", userId)
        .eq("date", today)
        .order("created_at", { ascending: true })
      if (error) throw error
      return data as MealComposition[]
    } catch (error) {
      console.error("Error loading meal compositions:", error)
      return []
    }
  },

  async addMealComposition(composition: Omit<MealComposition, "id" | "created_at">): Promise<MealComposition> {
    try {
      const { data, error } = await supabase
        .from("meal_compositions")
        .insert({
          ...composition,
          created_at: new Date().toISOString(),
        })
        .select()
        .single()
      if (error) throw error
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
    } catch (error) {
      console.error("Error deleting meal composition:", error)
      throw error
    }
  },

  // 🆕 NUEVAS FUNCIONES PARA BATIDOS PERSONALIZADOS
  async getUserSmoothies(userId: string): Promise<CustomSmoothie[]> {
    try {
      const { data, error } = await supabase
        .from("user_smoothies")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
      if (error) {
        // Si la tabla no existe, retornar array vacío
        console.log("Tabla user_smoothies no existe aún:", error.message)
        return []
      }
      return (data || []).map(smoothie => ({
        ...smoothie,
        ingredients: typeof smoothie.ingredients === 'string' 
          ? JSON.parse(smoothie.ingredients) 
          : smoothie.ingredients
      })) as CustomSmoothie[]
    } catch (error) {
      console.error("Error loading user smoothies:", error)
      return []
    }
  },

  async createCustomSmoothie(smoothie: Omit<CustomSmoothie, "id" | "created_at">): Promise<CustomSmoothie> {
    try {
      const { data, error } = await supabase
        .from("user_smoothies")
        .insert({
          ...smoothie,
          ingredients: JSON.stringify(smoothie.ingredients),
          created_at: new Date().toISOString(),
        })
        .select()
        .single()
      if (error) throw error
      return {
        ...data,
        ingredients: typeof data.ingredients === 'string' ? JSON.parse(data.ingredients) : data.ingredients
      } as CustomSmoothie
    } catch (error) {
      console.error("Error creating custom smoothie:", error)
      throw error
    }
  },

  // 🆕 NUEVAS FUNCIONES PARA COMPOSICIONES DE COMIDAS MEJORADAS
  async getEnhancedMealCompositions(userId: string): Promise<EnhancedMealComposition[]> {
    try {
      const today = new Date().toISOString().split("T")[0]
      const { data, error } = await supabase
        .from("enhanced_meal_compositions")
        .select("*")
        .eq("user_id", userId)
        .eq("date", today)
        .order("created_at", { ascending: true })
      if (error) {
        console.log("Tabla enhanced_meal_compositions no existe aún:", error.message)
        return []
      }
      return (data || []).map(meal => ({
        ...meal,
        ingredients: typeof meal.ingredients === 'string' 
          ? JSON.parse(meal.ingredients) 
          : meal.ingredients
      })) as EnhancedMealComposition[]
    } catch (error) {
      console.error("Error loading enhanced meal compositions:", error)
      return []
    }
  },

  async createEnhancedMealComposition(meal: Omit<EnhancedMealComposition, "id" | "created_at">): Promise<EnhancedMealComposition> {
    try {
      const { data, error } = await supabase
        .from("enhanced_meal_compositions")
        .insert({
          ...meal,
          ingredients: JSON.stringify(meal.ingredients),
          created_at: new Date().toISOString(),
        })
        .select()
        .single()
      if (error) throw error
      return {
        ...data,
        ingredients: typeof data.ingredients === 'string' ? JSON.parse(data.ingredients) : data.ingredients
      } as EnhancedMealComposition
    } catch (error) {
      console.error("Error creating enhanced meal composition:", error)
      throw error
    }
  },

  async getActiveTips(): Promise<GlobalTip[]> {
    try {
      const { data, error } = await supabase.from("global_tips").select("*").eq("is_active", true)
      if (error) {
        console.error("Error loading tips:", error)
        return []
      }
      return data as GlobalTip[]
    } catch (error) {
      console.error("Error loading tips:", error)
      return []
    }
  },

  async getActiveResources(): Promise<GlobalResource[]> {
    try {
      const { data, error } = await supabase.from("global_resources").select("*").eq("is_active", true)
      if (error) {
        console.error("Error loading resources:", error)
        return []
      }
      return data as GlobalResource[]
    } catch (error) {
      console.error("Error loading resources:", error)
      return []
    }
  },

  async getActiveSupplements(): Promise<Supplement[]> {
    try {
      const { data, error } = await supabase.from("supplements").select("*").eq("is_active", true)
      if (error) {
        console.error("Error loading supplements:", error)
        return []
      }
      return (data || []).map((item: any) => ({
        ...item,
        benefits: item.benefits && typeof item.benefits === "string" ? item.benefits.split(",") : [],
      })) as Supplement[]
    } catch (error) {
      console.error("Error loading supplements:", error)
      return []
    }
  },

  async getUserGamification(userId: string): Promise<UserGamification | null> {
    try {
      const { data, error } = await supabase.from("user_gamification").select("*").eq("user_id", userId).single()
      if (error) {
        if (error.code === "PGRST116") {
          return await dbFunctions.initializeUserGamification(userId)
        }
        throw error
      }
      return data as UserGamification
    } catch (error) {
      console.error("Error loading user gamification:", error)
      return null
    }
  },

  async initializeUserGamification(userId: string): Promise<UserGamification> {
    try {
      const gamificationData = {
        user_id: userId,
        total_points: 0,
        current_level: 1,
        streak_days: 0,
        longest_streak: 0,
        badges: [],
        weekly_points: 0,
        monthly_points: 0,
        experience_points: 0,
        next_level_points: 100,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      const { data, error } = await supabase.from("user_gamification").insert(gamificationData).select().single()
      if (error) throw error
      return data as UserGamification
    } catch (error) {
      console.error("Error initializing gamification:", error)
      return {
        id: "",
        user_id: userId,
        total_points: 0,
        current_level: 1,
        streak_days: 0,
        longest_streak: 0,
        badges: [],
        weekly_points: 0,
        monthly_points: 0,
        experience_points: 0,
        next_level_points: 100,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    }
  },

  // 🆕 FUNCIÓN MEJORADA PARA ANÁLISIS DE PATRONES IA
  async generateAdvancedAIRecommendations(userId: string): Promise<AIRecommendation[]> {
    try {
      const progressHistory = await dbFunctions.getProgressHistory(userId, 30) // Analizamos 30 días
      const supplements = await dbFunctions.getActiveSupplements()
      const userSmoothies = await dbFunctions.getUserSmoothies(userId)
      const mealCompositions = await dbFunctions.getTodayMealCompositions(userId)
      const recommendations: AIRecommendation[] = []

      if (!progressHistory || progressHistory.length === 0 || !supplements || supplements.length === 0) {
        return []
      }

      // Análisis avanzado de patrones
      const analysisResults = {
        avgWater: progressHistory.reduce((sum, day) => sum + (day.water || 0), 0) / progressHistory.length,
        avgExercise: progressHistory.reduce((sum, day) => sum + (day.exercise || 0), 0) / progressHistory.length,
        avgMindfulness: progressHistory.reduce((sum, day) => sum + (day.mindfulness || 0), 0) / progressHistory.length,
        consistencyScore: progressHistory.filter(day => 
          (day.water >= 6) && (day.exercise >= 1) && (day.mindfulness >= 1)
        ).length / progressHistory.length,
        weekendPattern: progressHistory.filter(day => {
          const dayOfWeek = new Date(day.date).getDay()
          return dayOfWeek === 0 || dayOfWeek === 6 // Sábado y domingo
        }).reduce((acc, day) => ({
          water: acc.water + day.water,
          exercise: acc.exercise + day.exercise,
          mindfulness: acc.mindfulness + day.mindfulness
        }), { water: 0, exercise: 0, mindfulness: 0 }),
        smoothieUsage: userSmoothies.length,
        nutritionalPatterns: mealCompositions.length > 0
      }

      // Recomendación basada en ejercicio inconsistente
      if (analysisResults.avgExercise < 0.7) {
        const energySupplements = supplements.filter(s =>
          s.benefits && Array.isArray(s.benefits) &&
          s.benefits.some(b => b && typeof b === "string" && 
            (b.toLowerCase().includes("energía") || b.toLowerCase().includes("fuerza"))
          )
        )
        
        if (energySupplements.length > 0) {
          recommendations.push({
            id: `${userId}_energy_advanced`,
            user_id: userId,
            supplement_names: energySupplements.slice(0, 2).map(s => s.name || "Suplemento"),
            recommendation_type: "exercise_consistency",
            priority: analysisResults.avgExercise < 0.3 ? "high" : "medium",
            reason: `Análisis de 30 días: Tu actividad física promedio es ${(analysisResults.avgExercise * 100).toFixed(1)}%. Estos suplementos pueden incrementar tu energía y motivación.`,
            sales_angle: `¡Recupera tu energía! ${analysisResults.consistencyScore < 0.3 ? "Oferta especial por baja actividad" : "Impulsa tu rendimiento"} 💪`,
            discount_percentage: analysisResults.avgExercise < 0.3 ? 20 : 15,
            optimal_timing: "morning",
            confidence_score: 0.85,
            user_patterns: ["low_exercise_consistency", `avg_exercise_${(analysisResults.avgExercise * 100).toFixed(0)}`],
            is_active: true,
            shown_count: 0,
            clicked: false,
            purchased: false,
            expires_at: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
            created_at: new Date().toISOString(),
          })
        }
      }

      // Recomendación basada en estrés/mindfulness
      if (analysisResults.avgMindfulness < 0.6) {
        const relaxSupplements = supplements.filter(s =>
          s.benefits && Array.isArray(s.benefits) &&
          s.benefits.some(b => b && typeof b === "string" && 
            (b.toLowerCase().includes("estrés") || b.toLowerCase().includes("calma") || b.toLowerCase().includes("ansiedad"))
          )
        )
        
        if (relaxSupplements.length > 0) {
          recommendations.push({
            id: `${userId}_stress_advanced`,
            user_id: userId,
            supplement_names: relaxSupplements.slice(0, 2).map(s => s.name || "Suplemento"),
            recommendation_type: "stress_management_advanced",
            priority: analysisResults.avgMindfulness < 0.3 ? "high" : "medium",
            reason: `Patrón detectado: Tu práctica de mindfulness es del ${(analysisResults.avgMindfulness * 100).toFixed(1)}%. El estrés puede estar afectando tu bienestar general.`,
            sales_angle: "Encuentra tu equilibrio mental 🧘‍♀️ Calma garantizada",
            discount_percentage: 12,
            optimal_timing: "evening",
            confidence_score: 0.78,
            user_patterns: ["irregular_mindfulness", `stress_level_${analysisResults.avgMindfulness < 0.3 ? "high" : "medium"}`],
            is_active: true,
            shown_count: 0,
            clicked: false,
            purchased: false,
            expires_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
            created_at: new Date().toISOString(),
          })
        }
      }

      // Recomendación basada en hidratación
      if (analysisResults.avgWater < 6) {
        const hydroSupplements = supplements.filter(s =>
          s.benefits && Array.isArray(s.benefits) &&
          s.benefits.some(b => b && typeof b === "string" && 
            (b.toLowerCase().includes("hidrat") || b.toLowerCase().includes("electrolito"))
          )
        )
        
        if (hydroSupplements.length > 0) {
          recommendations.push({
            id: `${userId}_hydration_advanced`,
            user_id: userId,
            supplement_names: hydroSupplements.slice(0, 1).map(s => s.name || "Suplemento"),
            recommendation_type: "hydration_support",
            priority: "medium",
            reason: `Hidratación insuficiente: Promedias ${analysisResults.avgWater.toFixed(1)} vasos/día. Los electrolitos pueden optimizar tu hidratación.`,
            sales_angle: "💧 Hidratación inteligente - Más que agua",
            discount_percentage: 10,
            optimal_timing: "morning",
            confidence_score: 0.72,
            user_patterns: ["dehydration_pattern", `water_avg_${Math.round(analysisResults.avgWater)}`],
            is_active: true,
            shown_count: 0,
            clicked: false,
            purchased: false,
            expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            created_at: new Date().toISOString(),
          })
        }
      }

      // Recomendación por alta consistencia (usuario avanzado)
      if (analysisResults.consistencyScore > 0.8) {
        const advancedSupplements = supplements.filter(s =>
          s.benefits && Array.isArray(s.benefits) &&
          s.benefits.some(b => b && typeof b === "string" && 
            (b.toLowerCase().includes("rendimiento") || b.toLowerCase().includes("avanzado") || 
             b.toLowerCase().includes("premium") || b.toLowerCase().includes("élite"))
          )
        )
        
        if (advancedSupplements.length > 0) {
          recommendations.push({
            id: `${userId}_advanced_user`,
            user_id: userId,
            supplement_names: advancedSupplements.slice(0, 1).map(s => s.name || "Suplemento"),
            recommendation_type: "advanced_user_optimization",
            priority: "low",
            reason: `¡Excelente! Tu consistencia es del ${(analysisResults.consistencyScore * 100).toFixed(1)}%. Estos suplementos premium pueden llevar tu rendimiento al siguiente nivel.`,
            sales_angle: "🚀 Nivel Elite - Solo para usuarios avanzados como tú",
            discount_percentage: 5,
            optimal_timing: "pre_workout",
            confidence_score: 0.95,
            user_patterns: ["high_consistency", "advanced_user", `consistency_${Math.round(analysisResults.consistencyScore * 100)}`],
            is_active: true,
            shown_count: 0,
            clicked: false,
            purchased: false,
            expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            created_at: new Date().toISOString(),
          })
        }
      }

      return recommendations
    } catch (error) {
      console.error("Error generating advanced AI recommendations:", error)
      return []
    }
  },

  async getAllUsers(): Promise<UserProfile[]> {
    try {
      const { data, error } = await supabase.from("users").select("*").order("created_at", { ascending: false })
      if (error) throw error
      return data as UserProfile[]
    } catch (error) {
      console.error("Error loading all users:", error)
      return []
    }
  },

  // 🆕 FUNCIÓN MEJORADA PARA ANÁLISIS DE PATRONES DEL ADMINISTRADOR
  async getDetailedUserAnalytics(): Promise<any> {
    try {
      const users = await dbFunctions.getAllUsers()
      const analytics = {
        totalUsers: users.length,
        newUsersThisWeek: users.filter(u => 
          new Date(u.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        ).length,
        activeUsersToday: users.filter(u => 
          new Date(u.last_login) > new Date(Date.now() - 24 * 60 * 60 * 1000)
        ).length,
        goalDistribution: {} as Record<string, number>,
        activityLevelDistribution: {} as Record<string, number>,
        ageGroups: {
          '18-25': 0,
          '26-35': 0,
          '36-45': 0,
          '46-55': 0,
          '55+': 0
        },
        retentionRate: 0,
        averageSessionTime: 0,
        mostActiveHours: {} as Record<string, number>
      }

      // Análisis de distribución de objetivos
      users.forEach(user => {
        analytics.goalDistribution[user.goal] = (analytics.goalDistribution[user.goal] || 0) + 1
        
        // Análisis de grupos de edad
        if (user.age >= 18 && user.age <= 25) analytics.ageGroups['18-25']++
        else if (user.age >= 26 && user.age <= 35) analytics.ageGroups['26-35']++
        else if (user.age >= 36 && user.age <= 45) analytics.ageGroups['36-45']++
        else if (user.age >= 46 && user.age <= 55) analytics.ageGroups['46-55']++
        else analytics.ageGroups['55+']++

        // Análisis de nivel de actividad
        const activityLabel = ACTIVITY_LEVELS.find(a => a.value === user.activity_level)?.label || 'Desconocido'
        analytics.activityLevelDistribution[activityLabel] = (analytics.activityLevelDistribution[activityLabel] || 0) + 1
      })

      // Calcular tasa de retención (usuarios que han ingresado en los últimos 7 días)
      analytics.retentionRate = users.length > 0 
        ? (users.filter(u => new Date(u.last_login) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length / users.length) * 100
        : 0

      return analytics
    } catch (error) {
      console.error("Error getting detailed user analytics:", error)
      return null
    }
  },

  async initializeDefaultData() {
    try {
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
          {
            category: "Nutrición",
            title: "Batidos nutritivos",
            content: "Crea batidos personalizados combinando proteínas, frutas y vegetales para una nutrición completa.",
            icon: "🥤",
            is_active: true,
          },
          {
            category: "Gamificación",
            title: "Sube de nivel",
            content: "Completa tareas diarias para ganar puntos y subir de nivel. ¡Cada acción cuenta para tu progreso!",
            icon: "🎯",
            is_active: true,
          },
        ]
        for (const tip of defaultTips) {
          await supabase.from("global_tips").insert(tip)
        }
      }

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
          {
            type: "exercise" as const,
            title: "Rutina de ejercicios en casa - 20 minutos",
            description: "Entrenamiento completo sin equipamiento",
            url: "https://www.youtube.com/watch?v=8dQKcziOQ8I",
            is_active: true,
          },
          {
            type: "nutrition" as const,
            title: "Guía de batidos proteicos",
            description: "Recetas de batidos nutritivos para cada objetivo",
            url: "https://www.youtube.com/watch?v=smoothie_guide",
            is_active: true,
          },
        ]
        for (const resource of defaultResources) {
          await supabase.from("global_resources").insert(resource)
        }
      }

      const { data: existingSupplements } = await supabase.from("supplements").select("*")
      if (!existingSupplements || existingSupplements.length === 0) {
        const defaultSupplements = [
          {
            name: "VitalEnergy Plus",
            description: "Complejo vitamínico premium para aumentar energía natural y mejorar concentración",
            benefits: "Aumenta energía,Mejora concentración,Reduce fatiga,Apoya sistema inmune",
            price: 89000,
            image_url: "/placeholder.svg?height=200&width=200",
            is_active: true,
            whatsapp_message:
              "Hola! Me interesa VitalEnergy Plus que vi en VitalMente. ¿Podrían darme más información sobre disponibilidad y forma de pago?",
          },
          {
            name: "RelaxMind Pro",
            description: "Suplemento natural avanzado para reducir estrés, ansiedad y mejorar calidad del sueño",
            benefits: "Reduce ansiedad,Mejora sueño,Calma mental,Control del estrés",
            price: 75000,
            image_url: "/placeholder.svg?height=200&width=200",
            is_active: true,
            whatsapp_message:
              "Hola! Me interesa RelaxMind Pro para mejorar mi descanso. ¿Podrían contarme más sobre sus beneficios?",
          },
          {
            name: "MusclePro Elite",
            description: "Proteína premium de alta calidad para desarrollo muscular y recuperación rápida",
            benefits: "Desarrollo muscular,Recuperación rápida,Aumenta fuerza,Proteína completa",
            price: 120000,
            image_url: "/placeholder.svg?height=200&width=200",
            is_active: true,
            whatsapp_message:
              "Hola! Me interesa MusclePro Elite para mi entrenamiento. ¿Qué sabores tienen disponibles?",
          },
          {
            name: "HydroBalance",
            description: "Electrolitos avanzados para optimizar hidratación y rendimiento deportivo",
            benefits: "Hidratación óptima,Electrolitos balanceados,Mejora rendimiento,Recuperación rápida",
            price: 65000,
            image_url: "/placeholder.svg?height=200&width=200",
            is_active: true,
            whatsapp_message:
              "Hola! Me interesa HydroBalance para mejorar mi hidratación. ¿Cuál es la forma de uso recomendada?",
          },
        ]
        for (const supplement of defaultSupplements) {
          await supabase.from("supplements").insert(supplement)
        }
      }

      // Inicializar banco de alimentos expandido en la base de datos
      const { data: existingFoods } = await supabase.from("global_foods").select("*")
      if (!existingFoods || existingFoods.length < 50) {
        // Solo insertar si hay menos de 50 alimentos para evitar duplicados
        for (const food of EXPANDED_FOOD_DATABASE.slice(0, 20)) { // Insertar los primeros 20 como muestra
          await supabase.from("global_foods").insert({
            ...food,
            common_portion_size: 100,
            common_portion_name: "gramos",
            is_active: true
          })
        }
      }

    } catch (error) {
      console.log("Datos por defecto ya inicializados o error menor:", error)
    }
  },
}

// ============================================================================
// FUNCIONES AUXILIARES EXPANDIDAS
// ============================================================================
const getYouTubeThumbnail = (url: string): string => {
  const patterns = [/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/, /^([a-zA-Z0-9_-]{11})$/]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) {
      const videoId = match[1]
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    }
  }
  return "/placeholder.svg?height=180&width=320&text=Video"
}

const getResourceThumbnail = (url: string, type: string): string => {
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    return getYouTubeThumbnail(url)
  }
  if (url.includes("spotify.com")) {
    return "/placeholder.svg?height=180&width=320&text=🎵+Spotify"
  }
  if (url.toLowerCase().includes(".pdf") || url.includes("drive.google.com")) {
    return "/placeholder.svg?height=180&width=320&text=📄+PDF"
  }
  const typeDefaults = {
    mindfulness: "/placeholder.svg?height=180&width=320&text=🧘+Mindfulness",
    nutrition: "/placeholder.svg?height=180&width=320&text=🥗+Nutrición",
    exercise: "/placeholder.svg?height=180&width=320&text=💪+Ejercicio",
  }
  return typeDefaults[type as keyof typeof typeDefaults] || "/placeholder.svg?height=180&width=320&text=Recurso"
}

const getResourceTypeIcon = (type: string) => {
  switch (type) {
    case "mindfulness":
      return "🧘‍♀️"
    case "nutrition":
      return "🥗"
    case "exercise":
      return "💪"
    default:
      return "📝"
  }
}

// 🆕 FUNCIONES AUXILIARES PARA ALIMENTOS EXPANDIDOS
const getFoodsByExpandedCategory = (globalFoods: GlobalFood[]) => {
  const categories = [
    { id: "proteinas", name: "Proteínas", icon: "🍗" },
    { id: "carbohidratos", name: "Carbohidratos", icon: "🌾" },
    { id: "vegetales", name: "Vegetales", icon: "🥬" },
    { id: "frutas", name: "Frutas", icon: "🍎" },
    { id: "bebidas", name: "Bebidas", icon: "🥤" }, // Nueva categoría
  ]
  
  return categories.map((category) => ({
    ...category,
    foods: globalFoods.filter((food) => food.category === category.id),
  }))
}

const calculateTotalMacros = (ingredients: (SmoothieIngredient | MealIngredient)[]): {
  calories: number
  protein: number
  carbs: number
  fats: number
} => {
  return ingredients.reduce(
    (totals, ingredient) => ({
      calories: totals.calories + ingredient.calories,
      protein: totals.protein + ingredient.protein,
      carbs: totals.carbs + ingredient.carbs,
      fats: totals.fats + ingredient.fats,
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  )
}

// ============================================================================
// COMPONENTE PRINCIPAL EXPANDIDO
// ============================================================================
export default function VitalMenteEnhancedApp() {
  // Estados principales (mantenidos del original)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("vitalmente_user")
      return savedUser ? JSON.parse(savedUser) : null
    }
    return null
  })

  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("inicio")
  const [macroResults, setMacroResults] = useState<MacroResult | null>(null)
  const [connectionStatus, setConnectionStatus] = useState("connecting")
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")
  const [lastSaveTime, setLastSaveTime] = useState<Date | null>(null)

  // Estados de progreso
  const [dailyProgress, setDailyProgress] = useState<DailyProgress>({
    id: "",
    user_id: "",
    date: new Date().toISOString().split("T")[0],
    water: 0,
    exercise: 0,
    mindfulness: 0,
    desayuno: 0,
    almuerzo: 0,
    cena: 0,
  })

  // Estados de datos expandidos
  const [userFoods, setUserFoods] = useState<UserFood[]>([])
  const [globalFoods, setGlobalFoods] = useState<GlobalFood[]>([])
  const [progressHistory, setProgressHistory] = useState<DailyProgress[]>([])
  const [globalTips, setGlobalTips] = useState<GlobalTip[]>([])
  const [globalResources, setGlobalResources] = useState<GlobalResource[]>([])
  const [supplements, setSupplements] = useState<Supplement[]>([])
  const [currentTipIndex, setCurrentTipIndex] = useState(0)
  const [mealCompositions, setMealCompositions] = useState<MealComposition[]>([])
  const [consumedMacros, setConsumedMacros] = useState<ConsumedMacros>({
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
  })

  // 🆕 NUEVOS ESTADOS PARA FUNCIONALIDADES EXPANDIDAS
  const [userSmoothies, setUserSmoothies] = useState<CustomSmoothie[]>([])
  const [enhancedMealCompositions, setEnhancedMealCompositions] = useState<EnhancedMealComposition[]>([])
  const [showSmoothieCreator, setShowSmoothieCreator] = useState(false)
  const [showEnhancedMealCreator, setShowEnhancedMealCreator] = useState(false)
  const [showGamificationInfo, setShowGamificationInfo] = useState(false)
  const [selectedMealTypeEnhanced, setSelectedMealTypeEnhanced] = useState<"desayuno" | "almuerzo" | "cena">("desayuno")

  // Estados de UI móvil (mantenidos)
  const [showMealCalculator, setShowMealCalculator] = useState(false)
  const [selectedMealType, setSelectedMealType] = useState<"desayuno" | "almuerzo" | "cena">("desayuno")
  const [selectedFood, setSelectedFood] = useState<UserFood | GlobalFood | null>(null)
  const [foodQuantity, setFoodQuantity] = useState<string>("100")
  const [showFloatingMenu, setShowFloatingMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  // Estados de administración expandidos
  const [logoClicks, setLogoClicks] = useState(0)
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminCode, setAdminCode] = useState("")
  const [activeAdminTab, setActiveAdminTab] = useState("dashboard")
  const [detailedAnalytics, setDetailedAnalytics] = useState<any>(null)

  // Estados de formularios (mantenidos)
  const [loginForm, setLoginForm] = useState({ phone: "", accessCode: "" })
  const [registerForm, setRegisterForm] = useState({
    phone: "",
    accessCode: "",
    confirmCode: "",
    name: "",
    age: "",
    weight: "",
    height: "",
    activityLevel: 1.375,
    goal: "reduce_stress",
  })
  const [showRegister, setShowRegister] = useState(false)

  // Estados de gamificación y IA
  const [userGamification, setUserGamification] = useState<UserGamification | null>(null)
  const [aiRecommendations, setAiRecommendations] = useState<AIRecommendation[]>([])
  const [allUsers, setAllUsers] = useState<UserProfile[]>([])

  // ============================================================================
  // EFECTOS Y INICIALIZACIÓN EXPANDIDOS
  // ============================================================================
  useEffect(() => {
    initializeApp()
  }, [])

  useEffect(() => {
    if (currentUser && currentUser.id) {
      loadUserData(currentUser.id)
      calculateMacros(currentUser)
    }
  }, [currentUser])

  const initializeApp = async () => {
    try {
      setConnectionStatus("connecting")
      await dbFunctions.initializeDefaultData()
      await loadGlobalContent()
      setConnectionStatus("connected")
    } catch (error) {
      console.error("Error initializing app:", error)
      setConnectionStatus("error")
    }
  }

  const loadGlobalContent = async () => {
    try {
      const [tips, resources, activeSupplements, globalFoodsList] = await Promise.all([
        dbFunctions.getActiveTips(),
        dbFunctions.getActiveResources(),
        dbFunctions.getActiveSupplements(),
        dbFunctions.getGlobalFoods(),
      ])
      setGlobalTips(tips)
      setGlobalResources(resources)
      setSupplements(activeSupplements)
      setGlobalFoods(globalFoodsList)
    } catch (error) {
      console.error("Error loading global content:", error)
    }
  }

  const loadUserData = async (userId: string) => {
    try {
      const todayProgress = await dbFunctions.getTodayProgress(userId)
      if (todayProgress) {
        setDailyProgress(todayProgress)
      } else {
        setDailyProgress((prev) => ({ ...prev, user_id: userId }))
      }

      const [foods, history, compositions, gamification, recommendations, smoothies, enhancedMeals] = await Promise.all([
        dbFunctions.getUserFoods(userId),
        dbFunctions.getProgressHistory(userId),
        dbFunctions.getTodayMealCompositions(userId),
        dbFunctions.getUserGamification(userId),
        dbFunctions.generateAdvancedAIRecommendations(userId), // 🆕 Función mejorada
        dbFunctions.getUserSmoothies(userId), // 🆕 Nuevos batidos
        dbFunctions.getEnhancedMealCompositions(userId), // 🆕 Nuevas composiciones
      ])

      setUserFoods(foods)
      setProgressHistory(history)
      setMealCompositions(compositions)
      calculateConsumedMacros(compositions)
      setUserGamification(gamification)
      setAiRecommendations(recommendations)
      setUserSmoothies(smoothies) // 🆕
      setEnhancedMealCompositions(enhancedMeals) // 🆕
      
      // 🆕 Calcular macros incluyendo comidas mejoradas
      calculateEnhancedConsumedMacros([...compositions, ...enhancedMeals])
    } catch (error) {
      console.error("Error loading user data:", error)
    }
  }

  // 🆕 NUEVA FUNCIÓN PARA CALCULAR MACROS MEJORADOS
  const calculateEnhancedConsumedMacros = (compositions: (MealComposition | EnhancedMealComposition)[]) => {
    const totals = compositions.reduce(
      (acc, comp) => {
        if ('calories_consumed' in comp) {
          // MealComposition original
          return {
            calories: acc.calories + comp.calories_consumed,
            protein: acc.protein + comp.protein_consumed,
            carbs: acc.carbs + comp.carbs_consumed,
            fats: acc.fats + comp.fats_consumed,
          }
        } else {
          // EnhancedMealComposition
          return {
            calories: acc.calories + comp.total_calories,
            protein: acc.protein + comp.total_protein,
            carbs: acc.carbs + comp.total_carbs,
            fats: acc.fats + comp.total_fats,
          }
        }
      },
      { calories: 0, protein: 0, carbs: 0, fats: 0 }
    )
    setConsumedMacros(totals)
  }

  const calculateConsumedMacros = (compositions: MealComposition[]) => {
    const totals = compositions.reduce(
      (acc, comp) => ({
        calories: acc.calories + comp.calories_consumed,
        protein: acc.protein + comp.protein_consumed,
        carbs: acc.carbs + comp.carbs_consumed,
        fats: acc.fats + comp.fats_consumed,
      }),
      { calories: 0, protein: 0, carbs: 0, fats: 0 }
    )
    setConsumedMacros(totals)
  }

  const calculateMacros = (userData: UserProfile) => {
    const bmr = 10 * userData.weight + 6.25 * userData.height - 5 * userData.age + 5
    const tdee = bmr * userData.activity_level
    const goalData = GOALS.find((g) => g.id === userData.goal) || GOALS[3]
    const calories = Math.round(tdee * (1 + goalData.calAdjust))
    setMacroResults({
      calories,
      protein: Math.round((calories * goalData.protein) / 100 / 4),
      carbs: Math.round((calories * goalData.carbs) / 100 / 4),
      fats: Math.round((calories * goalData.fats) / 100 / 9),
      goalType: goalData.type,
      goalLabel: goalData.label,
    })
  }

  // ============================================================================
  // FUNCIONES DE AUTENTICACIÓN (MANTENIDAS DEL ORIGINAL)
  // ============================================================================
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
      localStorage.setItem("vitalmente_user", JSON.stringify(user))
      await loadUserData(user.id)
      calculateMacros(user)
      setLoginForm({ phone: "", accessCode: "" })
    } catch (error: any) {
      console.error("Error en login:", error)
      alert("Error al iniciar sesión: " + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async () => {
    if (
      !registerForm.phone ||
      !registerForm.accessCode ||
      !registerForm.name ||
      !registerForm.age ||
      !registerForm.weight ||
      !registerForm.height
    ) {
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
      const existingUser = await dbFunctions.findUserByPhone(registerForm.phone)
      if (existingUser) {
        alert("Este número ya está registrado. Usa la opción de Ingresar.")
        setIsLoading(false)
        return
      }
      const userData = {
        phone: registerForm.phone,
        access_code: registerForm.accessCode,
        name: registerForm.name,
        age: Number.parseInt(registerForm.age),
        weight: Number.parseInt(registerForm.weight),
        height: Number.parseInt(registerForm.height),
        activity_level: registerForm.activityLevel,
        goal: registerForm.goal,
      }
      const newUser = await dbFunctions.createUser(userData)
      setCurrentUser(newUser)
      localStorage.setItem("vitalmente_user", JSON.stringify(newUser))
      setDailyProgress((prev) => ({ ...prev, user_id: newUser.id }))
      calculateMacros(newUser)
      setRegisterForm({
        phone: "",
        accessCode: "",
        confirmCode: "",
        name: "",
        age: "",
        weight: "",
        height: "",
        activityLevel: 1.375,
        goal: "reduce_stress",
      })
    } catch (error: any) {
      console.error("Error en registro:", error)
      alert(`Error al crear cuenta: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    setCurrentUser(null)
    localStorage.removeItem("vitalmente_user")
    setDailyProgress({
      id: "",
      user_id: "",
      date: new Date().toISOString().split("T")[0],
      water: 0,
      exercise: 0,
      mindfulness: 0,
      desayuno: 0,
      almuerzo: 0,
      cena: 0,
    })
    setUserFoods([])
    setProgressHistory([])
    setMacroResults(null)
    setActiveTab("inicio")
    setMealCompositions([])
    setConsumedMacros({ calories: 0, protein: 0, carbs: 0, fats: 0 })
    setSaveStatus("idle")
    setLastSaveTime(null)
    setUserGamification(null)
    setAiRecommendations([])
    setUserSmoothies([]) // 🆕
    setEnhancedMealCompositions([]) // 🆕
  }

  // ============================================================================
  // FUNCIONES DE PROGRESO EXPANDIDAS
  // ============================================================================
  const updateProgress = async (field: keyof DailyProgress, increment: number) => {
    if (!currentUser) return
    const newProgress = {
      ...dailyProgress,
      [field]: Math.max(0, (dailyProgress as any)[field] + increment),
    }
    setDailyProgress(newProgress)
    setSaveStatus("saving")
    try {
      const success = await dbFunctions.saveProgress(currentUser.id, {
        water: newProgress.water,
        exercise: newProgress.exercise,
        mindfulness: newProgress.mindfulness,
        desayuno: newProgress.desayuno,
        almuerzo: newProgress.almuerzo,
        cena: newProgress.cena,
      })
      if (success) {
        setSaveStatus("saved")
        setLastSaveTime(new Date())
        
        // 🆕 ACTUALIZAR GAMIFICACIÓN CON NUEVAS ACCIONES
        if (userGamification) {
          const pointsEarned = LEVEL_SYSTEM.pointsPerAction[field] || 0
          await updateUserGamification(pointsEarned, field)
        }
        
        setTimeout(() => setSaveStatus("idle"), 2000)
      } else {
        throw new Error("Error al guardar progreso")
      }
    } catch (error) {
      console.error("Error guardando progreso:", error)
      setSaveStatus("error")
      setDailyProgress(dailyProgress)
      alert("Error al guardar progreso. Por favor intenta de nuevo.")
      setTimeout(() => setSaveStatus("idle"), 3000)
    }
  }

  // 🆕 NUEVA FUNCIÓN PARA ACTUALIZAR GAMIFICACIÓN
  const updateUserGamification = async (points: number, action: string) => {
    if (!currentUser || !userGamification) return
    
    try {
      const newTotalPoints = userGamification.total_points + points
      const currentLevel = LEVEL_SYSTEM.levels.find(level => 
        newTotalPoints >= level.pointsRequired && 
        (LEVEL_SYSTEM.levels[level.level] ? newTotalPoints < LEVEL_SYSTEM.levels[level.level].pointsRequired : true)
      )?.level || 1
      
      const updatedGamification = {
        ...userGamification,
        total_points: newTotalPoints,
        current_level: currentLevel,
        weekly_points: userGamification.weekly_points + points,
        monthly_points: userGamification.monthly_points + points,
        experience_points: newTotalPoints,
      }
      
      setUserGamification(updatedGamification)
      
      // Actualizar en base de datos
      await supabase
        .from("user_gamification")
        .update({
          total_points: newTotalPoints,
          current_level: currentLevel,
          weekly_points: updatedGamification.weekly_points,
          monthly_points: updatedGamification.monthly_points,
          experience_points: newTotalPoints,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", currentUser.id)
        
    } catch (error) {
      console.error("Error updating gamification:", error)
    }
  }

  const handleQuickProgress = async (type: "water" | "exercise" | "mindfulness") => {
    await updateProgress(type, 1)
    setShowFloatingMenu(false)
  }

  const getProgressPercentage = () => {
    const targets = { water: 8, exercise: 1, mindfulness: 1, desayuno: 1, almuerzo: 1, cena: 1 }
    let completed = 0
    Object.entries(targets).forEach(([key, target]) => {
      if (Number(dailyProgress[key as keyof DailyProgress]) >= target) completed++
    })
    return Math.round((completed / 6) * 100)
  }

  const getMotivationalMessage = (goal: string) => {
    const messages: Record<string, string> = {
      lose_weight: "¡Cada paso te acerca a tu mejor versión! 💪",
      maintain_weight: "Mantener el equilibrio es la clave del éxito ⚖️",
      gain_muscle: "Construyendo fuerza, construyendo futuro 🏋️",
      reduce_stress: "Hoy es un gran día para sentirte increíble ✨",
      find_calm: "Respira profundo, la calma está en ti 🧘",
      life_balance: "El equilibrio perfecto entre cuerpo y mente ⚡",
      vitalmente: "¡Eres la mejor versión de ti mismo! 🌟 #VitalMente",
    }
    return messages[goal] || messages.reduce_stress
  }

  // ============================================================================
  // 🆕 FUNCIONES PARA BATIDOS PERSONALIZADOS
  // ============================================================================
  const [smoothieIngredients, setSmoothieIngredients] = useState<SmoothieIngredient[]>([])
  const [smoothieName, setSmoothieName] = useState("")

  const addIngredientToSmoothie = (food: GlobalFood, quantity: number) => {
    const ratio = quantity / 100
    const ingredient: SmoothieIngredient = {
      food_id: food.id,
      food_name: food.name,
      quantity_grams: quantity,
      calories: Math.round(food.calories * ratio),
      protein: Math.round(food.protein * ratio),
      carbs: Math.round(food.carbs * ratio),
      fats: Math.round(food.fats * ratio),
    }
    
    setSmoothieIngredients(prev => [...prev, ingredient])
  }

  const removeIngredientFromSmoothie = (index: number) => {
    setSmoothieIngredients(prev => prev.filter((_, i) => i !== index))
  }

  const saveSmoothie = async () => {
    if (!currentUser || !smoothieName || smoothieIngredients.length === 0) {
      alert("Por favor completa el nombre y agrega al menos un ingrediente")
      return
    }

    try {
      const totals = calculateTotalMacros(smoothieIngredients)
      const smoothie: Omit<CustomSmoothie, "id" | "created_at"> = {
        user_id: currentUser.id,
        name: smoothieName,
        ingredients: smoothieIngredients,
        total_calories: totals.calories,
        total_protein: totals.protein,
        total_carbs: totals.carbs,
        total_fats: totals.fats,
      }

      const newSmoothie = await dbFunctions.createCustomSmoothie(smoothie)
      setUserSmoothies(prev => [newSmoothie, ...prev])
      
      // Actualizar gamificación
      await updateUserGamification(LEVEL_SYSTEM.pointsPerAction.smoothie, 'smoothie')
      
      // Limpiar formulario
      setSmoothieIngredients([])
      setSmoothieName("")
      setShowSmoothieCreator(false)
      
      alert("¡Batido guardado exitosamente! +15 puntos")
    } catch (error: any) {
      console.error("Error saving smoothie:", error)
      alert("Error al guardar batido: " + error.message)
    }
  }

  // ============================================================================
  // 🆕 FUNCIONES PARA COMIDAS MEJORADAS
  // ============================================================================
  const [mealIngredients, setMealIngredients] = useState<MealIngredient[]>([])
  const [mealName, setMealName] = useState("")

  const addIngredientToMeal = (food: GlobalFood, quantity: number) => {
    const ratio = quantity / 100
    const ingredient: MealIngredient = {
      food_id: food.id,
      food_name: food.name,
      quantity_grams: quantity,
      calories: Math.round(food.calories * ratio),
      protein: Math.round(food.protein * ratio),
      carbs: Math.round(food.carbs * ratio),
      fats: Math.round(food.fats * ratio),
    }
    
    setMealIngredients(prev => [...prev, ingredient])
  }

  const removeIngredientFromMeal = (index: number) => {
    setMealIngredients(prev => prev.filter((_, i) => i !== index))
  }

  const updateIngredientQuantity = (index: number, newQuantity: number) => {
    setMealIngredients(prev => prev.map((ingredient, i) => {
      if (i === index) {
        const food = globalFoods.find(f => f.id === ingredient.food_id)
        if (food) {
          const ratio = newQuantity / 100
          return {
            ...ingredient,
            quantity_grams: newQuantity,
            calories: Math.round(food.calories * ratio),
            protein: Math.round(food.protein * ratio),
            carbs: Math.round(food.carbs * ratio),
            fats: Math.round(food.fats * ratio),
          }
        }
      }
      return ingredient
    }))
  }

  const saveEnhancedMeal = async () => {
    if (!currentUser || !mealName || mealIngredients.length === 0) {
      alert("Por favor completa el nombre y agrega al menos un ingrediente")
      return
    }

    try {
      const totals = calculateTotalMacros(mealIngredients)
      const meal: Omit<EnhancedMealComposition, "id" | "created_at"> = {
        user_id: currentUser.id,
        date: new Date().toISOString().split("T")[0],
        meal_type: selectedMealTypeEnhanced,
        meal_name: mealName,
        ingredients: mealIngredients,
        total_calories: totals.calories,
        total_protein: totals.protein,
        total_carbs: totals.carbs,
        total_fats: totals.fats,
      }

      const newMeal = await dbFunctions.createEnhancedMealComposition(meal)
      setEnhancedMealCompositions(prev => [...prev, newMeal])
      
      // Actualizar progreso de comida
      await updateProgress(selectedMealTypeEnhanced, 1)
      
      // Actualizar gamificación
      await updateUserGamification(LEVEL_SYSTEM.pointsPerAction.custom_meal, 'custom_meal')
      
      // Recalcular macros consumidos
      calculateEnhancedConsumedMacros([...mealCompositions, ...enhancedMealCompositions, newMeal])
      
      // Limpiar formulario
      setMealIngredients([])
      setMealName("")
      setShowEnhancedMealCreator(false)
      
      alert("¡Comida guardada exitosamente! +25 puntos")
    } catch (error: any) {
      console.error("Error saving enhanced meal:", error)
      alert("Error al guardar comida: " + error.message)
    }
  }

  // ============================================================================
  // FUNCIONES DE ADMINISTRACIÓN EXPANDIDAS
  // ============================================================================
  const handleLogoClick = () => {
    setLogoClicks((prev) => {
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
      loadAdminData()
      alert("¡Acceso de administrador activado!")
    } else {
      alert("Código incorrecto")
      setAdminCode("")
    }
  }

  const loadAdminData = async () => {
    try {
      const [users, analytics] = await Promise.all([
        dbFunctions.getAllUsers(),
        dbFunctions.getDetailedUserAnalytics()
      ])
      setAllUsers(users)
      setDetailedAnalytics(analytics)
    } catch (error) {
      console.error("Error loading admin data:", error)
    }
  }

  // ============================================================================
  // FUNCIONES DE COMIDA EXPANDIDAS
  // ============================================================================
  const openMealCalculator = (mealType: "desayuno" | "almuerzo" | "cena") => {
    setSelectedMealType(mealType)
    setShowMealCalculator(true)
    setSelectedFood(null)
    setFoodQuantity("100")
  }

  const openEnhancedMealCreator = (mealType: "desayuno" | "almuerzo" | "cena") => {
    setSelectedMealTypeEnhanced(mealType)
    setShowEnhancedMealCreator(true)
    setMealIngredients([])
    setMealName("")
  }

  const selectFood = (food: GlobalFood | UserFood) => {
    setSelectedFood(food)
  }

  const addFoodToMeal = async () => {
    if (!selectedFood || !currentUser || !foodQuantity) return
    try {
      const quantity = Number.parseInt(foodQuantity)
      const ratio = quantity / 100
      const composition: Omit<MealComposition, "id" | "created_at"> = {
        user_id: currentUser.id,
        date: new Date().toISOString().split("T")[0],
        meal_type: selectedMealType,
        food_id: selectedFood.id,
        food_name: selectedFood.name,
        quantity_grams: quantity,
        calories_consumed: Math.round(Number(selectedFood.calories) * ratio),
        protein_consumed: Math.round(Number(selectedFood.protein) * ratio),
        carbs_consumed: Math.round(Number(selectedFood.carbs) * ratio),
        fats_consumed: Math.round(Number(selectedFood.fats) * ratio),
      }
      const newComposition = await dbFunctions.addMealComposition(composition)
      setMealCompositions((prev) => [...prev, newComposition])
      calculateConsumedMacros([...mealCompositions, newComposition])
      await updateProgress(selectedMealType, 1)
      setShowMealCalculator(false)
      setSelectedFood(null)
      setFoodQuantity("100")
    } catch (error: any) {
      console.error("Error adding food to meal:", error)
      alert("Error al agregar alimento: " + error.message)
    }
  }

  const getFoodsByCategory = () => {
    return getFoodsByExpandedCategory(globalFoods)
  }

  const removeFoodFromMeal = async (compositionId: string) => {
    try {
      await dbFunctions.deleteMealComposition(compositionId)
      const updatedCompositions = mealCompositions.filter((c) => c.id !== compositionId)
      setMealCompositions(updatedCompositions)
      calculateConsumedMacros(updatedCompositions)
    } catch (error: any) {
      console.error("Error removing food:", error)
      alert("Error al remover alimento: " + error.message)
    }
  }

  const getCaloriesProgress = () => {
    if (!macroResults) return { consumed: 0, target: 0, percentage: 0 }
    const percentage =
      macroResults.calories > 0 ? Math.round((consumedMacros.calories / macroResults.calories) * 100) : 0
    return {
      consumed: consumedMacros.calories,
      target: macroResults.calories,
      percentage: Math.min(percentage, 100),
    }
  }

  const handleSupplementContact = (supplement: Supplement) => {
    const defaultMessage = `Hola! Me interesa el suplemento ${supplement.name} que vi en VitalMente. ¿Podrían darme más información sobre disponibilidad y forma de pago?

Precio mostrado: ${supplement.price.toLocaleString()}
Beneficios: ${supplement.benefits.join(", ")}

Gracias!`
    const message = supplement.whatsapp_message || defaultMessage
    const whatsappUrl = `https://wa.me/573134852878?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  // ============================================================================
  // 🆕 COMPONENTES DE UI MEJORADOS Y RESPONSIVOS
  // ============================================================================
  const SaveStatusIndicator = () => {
    if (saveStatus === "idle") return null
    const statusConfig = {
      saving: { icon: <Icons.Loader2 size="text-sm" />, text: "Guardando...", color: "text-blue-600 bg-blue-50" },
      saved: { icon: <Icons.CheckCircle size="text-sm" />, text: "Guardado", color: "text-green-600 bg-green-50" },
      error: { icon: <Icons.AlertCircle size="text-sm" />, text: "Error", color: "text-red-600 bg-red-50" },
    }
    const config = statusConfig[saveStatus]
    return (
      <div
        className={`fixed top-4 right-4 z-50 px-3 py-2 rounded-lg shadow-lg flex items-center gap-2 ${config.color} text-xs sm:text-sm`}
      >
        {config.icon}
        <span className="font-medium">{config.text}</span>
        {lastSaveTime && saveStatus === "saved" && (
          <span className="opacity-75 hidden sm:inline">{lastSaveTime.toLocaleTimeString()}</span>
        )}
      </div>
    )
  }

  const FloatingActionButtons = () => {
    return (
      <div className="fixed bottom-20 right-4 z-40">
        {showFloatingMenu && (
          <div className="flex flex-col gap-2 mb-3 animate-in slide-in-from-bottom">
            <button
              onClick={() => handleQuickProgress("water")}
              className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors flex items-center gap-2 min-w-max text-sm"
            >
              <Icons.Droplets size="text-lg" />
              <span className="hidden sm:inline">Agua +1</span>
            </button>
            <button
              onClick={() => handleQuickProgress("exercise")}
              className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors flex items-center gap-2 min-w-max text-sm"
            >
              <Icons.Activity size="text-lg" />
              <span className="hidden sm:inline">Ejercicio +1</span>
            </button>
            <button
              onClick={() => handleQuickProgress("mindfulness")}
              className="bg-purple-500 text-white p-3 rounded-full shadow-lg hover:bg-purple-600 transition-colors flex items-center gap-2 min-w-max text-sm"
            >
              <Icons.Brain size="text-lg" />
              <span className="hidden sm:inline">Mindfulness +1</span>
            </button>
            {/* 🆕 Botón para crear batido rápido */}
            <button
              onClick={() => setShowSmoothieCreator(true)}
              className="bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition-colors flex items-center gap-2 min-w-max text-sm"
            >
              <Icons.Blend size="text-lg" />
              <span className="hidden sm:inline">Batido</span>
            </button>
          </div>
        )}
        <button
          onClick={() => setShowFloatingMenu(!showFloatingMenu)}
          className={`bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-all duration-200 ${
            showFloatingMenu ? "rotate-45" : "rotate-0"
          }`}
        >
          <Icons.Plus size="text-xl" />
        </button>
      </div>
    )
  }

  // 🆕 PANEL DE GAMIFICACIÓN EXPANDIDO CON EXPLICACIONES
  const GamificationPanel = () => {
    if (!userGamification) return null
    const currentLevelInfo =
      LEVEL_SYSTEM.levels.find((l) => l.level === userGamification.current_level) || LEVEL_SYSTEM.levels[0]
    const nextLevelInfo = LEVEL_SYSTEM.levels.find((l) => l.level === userGamification.current_level + 1)
    const progressToNext = nextLevelInfo
      ? ((userGamification.total_points - currentLevelInfo.pointsRequired) /
          (nextLevelInfo.pointsRequired - currentLevelInfo.pointsRequired)) *
        100
      : 100

    return (
      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl sm:text-3xl">{currentLevelInfo.icon}</span>
            <div>
              <h3 className="font-bold text-base sm:text-lg">{currentLevelInfo.name}</h3>
              <p className="text-xs sm:text-sm opacity-90">Nivel {userGamification.current_level}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl sm:text-2xl font-bold">{userGamification.total_points}</div>
            <div className="text-xs opacity-75">puntos</div>
            <button
              onClick={() => setShowGamificationInfo(true)}
              className="text-xs opacity-75 underline hover:opacity-100 mt-1"
            >
              <Icons.Info size="text-xs" /> Info
            </button>
          </div>
        </div>
        
        {/* Descripción del nivel actual */}
        <div className="bg-white/10 rounded-lg p-2 mb-3">
          <p className="text-xs text-center">{currentLevelInfo.description}</p>
        </div>
        
        {nextLevelInfo && (
          <div className="mb-3">
            <div className="flex justify-between text-xs mb-1">
              <span>Siguiente: {nextLevelInfo.name}</span>
              <span>{Math.round(progressToNext)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(progressToNext, 100)}%` }}
              ></div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-3 gap-2 text-center text-xs sm:text-sm">
          <div>
            <div className="font-bold">{userGamification.streak_days}</div>
            <div className="opacity-75">Racha</div>
          </div>
          <div>
            <div className="font-bold">{userGamification.weekly_points}</div>
            <div className="opacity-75">Semana</div>
          </div>
          <div>
            <div className="font-bold">{userGamification.monthly_points}</div>
            <div className="opacity-75">Mes</div>
          </div>
        </div>
      </div>
    )
  }

  // 🆕 MODAL DE INFORMACIÓN DE GAMIFICACIÓN
  const GamificationInfoModal = () => {
    if (!showGamificationInfo) return null

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-4">
        <div className="relative top-4 mx-auto border w-full max-w-lg shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto">
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <Icons.Trophy size="text-xl" />
                Sistema de Gamificación
              </h3>
              <button 
                onClick={() => setShowGamificationInfo(false)} 
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Icons.X size="text-lg" />
              </button>
            </div>
            
            {/* Cómo funciona */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3 text-sm flex items-center gap-2">
                <Icons.BookOpen size="text-sm" />
                ¿Cómo Funciona?
              </h4>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Gana puntos completando actividades diarias</p>
                <p>• Sube de nivel automáticamente con los puntos</p>
                <p>• Mantén rachas para bonificaciones extra</p>
                <p>• Desbloquea insignias por logros especiales</p>
              </div>
            </div>

            {/* Puntos por actividad */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3 text-sm">💎 Puntos por Actividad</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between p-2 bg-blue-50 rounded">
                  <span>💧 Agua</span>
                  <span className="font-bold">5 pts</span>
                </div>
                <div className="flex justify-between p-2 bg-green-50 rounded">
                  <span>💪 Ejercicio</span>
                  <span className="font-bold">20 pts</span>
                </div>
                <div className="flex justify-between p-2 bg-purple-50 rounded">
                  <span>🧘 Mindfulness</span>
                  <span className="font-bold">15 pts</span>
                </div>
                <div className="flex justify-between p-2 bg-orange-50 rounded">
                  <span>🍽️ Comida</span>
                  <span className="font-bold">10 pts</span>
                </div>
                <div className="flex justify-between p-2 bg-pink-50 rounded">
                  <span>🥤 Batido</span>
                  <span className="font-bold">15 pts</span>
                </div>
                <div className="flex justify-between p-2 bg-yellow-50 rounded">
                  <span>🍴 Comida Custom</span>
                  <span className="font-bold">25 pts</span>
                </div>
              </div>
            </div>

            {/* Niveles disponibles */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3 text-sm">🎯 Niveles Disponibles</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {LEVEL_SYSTEM.levels.map((level) => (
                  <div 
                    key={level.level} 
                    className={`p-2 rounded-lg border ${
                      userGamification?.current_level === level.level 
                        ? 'bg-purple-50 border-purple-300' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{level.icon}</span>
                        <div>
                          <p className="text-sm font-medium">{level.name}</p>
                          <p className="text-xs text-gray-500">{level.pointsRequired} puntos</p>
                        </div>
                      </div>
                      {userGamification?.current_level === level.level && (
                        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                          Actual
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Insignias disponibles */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3 text-sm">🏅 Insignias</h4>
              <div className="grid grid-cols-2 gap-2">
                {LEVEL_SYSTEM.badges.map((badge) => (
                  <div key={badge.id} className="p-2 bg-gray-50 rounded-lg text-center">
                    <div className="text-lg mb-1">{badge.icon}</div>
                    <div className="text-xs font-medium">{badge.name}</div>
                    <div className="text-xs text-gray-500">{badge.description}</div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowGamificationInfo(false)}
              className="w-full bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600 text-sm"
            >
              ¡Entendido!
            </button>
          </div>
        </div>
      </div>
    )
  }

  // 🆕 CREADOR DE BATIDOS PERSONALIZADO
  const SmoothieCreator = () => {
    if (!showSmoothieCreator) return null

    const smoothieTotals = calculateTotalMacros(smoothieIngredients)
    const smoothieCategories = getFoodsByCategory().filter(cat => 
      ['frutas', 'bebidas', 'proteinas'].includes(cat.id)
    )

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-4">
        <div className="relative top-4 mx-auto border w-full max-w-2xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto">
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <Icons.Blend size="text-xl" />
                Crear Batido Personalizado
              </h3>
              <button 
                onClick={() => {
                  setShowSmoothieCreator(false)
                  setSmoothieIngredients([])
                  setSmoothieName("")
                }} 
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Icons.X size="text-lg" />
              </button>
            </div>

            {/* Nombre del batido */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del batido
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                placeholder="Mi batido energético..."
                value={smoothieName}
                onChange={(e) => setSmoothieName(e.target.value)}
              />
            </div>

            {/* Ingredientes agregados */}
            {smoothieIngredients.length > 0 && (
              <div className="mb-4 p-3 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-sm mb-2">Ingredientes ({smoothieIngredients.length})</h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {smoothieIngredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center justify-between text-xs bg-white p-2 rounded">
                      <div className="flex-1">
                        <span className="font-medium">{ingredient.food_name}</span>
                        <span className="text-gray-500 ml-2">{ingredient.quantity_grams}g</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">{ingredient.calories} cal</span>
                        <button
                          onClick={() => removeIngredientFromSmoothie(index)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Icons.Trash2 size="text-xs" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Totales del batido */}
                <div className="mt-3 p-2 bg-white rounded border">
                  <div className="grid grid-cols-4 gap-2 text-xs text-center">
                    <div>
                      <div className="font-bold">{smoothieTotals.calories}</div>
                      <div className="text-gray-500">Cal</div>
                    </div>
                    <div>
                      <div className="font-bold">{smoothieTotals.protein}g</div>
                      <div className="text-gray-500">Prot</div>
                    </div>
                    <div>
                      <div className="font-bold">{smoothieTotals.carbs}g</div>
                      <div className="text-gray-500">Carbs</div>
                    </div>
                    <div>
                      <div className="font-bold">{smoothieTotals.fats}g</div>
                      <div className="text-gray-500">Grasas</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Selector de ingredientes */}
            <div className="mb-4">
              <h4 className="font-semibold text-sm mb-3">Agregar Ingredientes</h4>
              <div className="space-y-4">
                {smoothieCategories.map((category) => (
                  <div key={category.id}>
                    <h5 className="font-medium flex items-center gap-2 text-sm mb-2">
                      {category.icon} {category.name}
                    </h5>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {category.foods.slice(0, 6).map((food) => {
                        const [selectedQuantity, setSelectedQuantity] = useState("50")
                        return (
                          <div key={food.id} className="border border-gray-200 rounded-lg p-2">
                            <div className="text-xs font-medium mb-1">{food.name}</div>
                            <div className="text-xs text-gray-500 mb-2">{food.calories} cal/100g</div>
                            <div className="flex items-center gap-1 mb-2">
                              <input
                                type="number"
                                className="w-12 text-xs p-1 border rounded"
                                value={selectedQuantity}
                                onChange={(e) => setSelectedQuantity(e.target.value)}
                                min="10"
                                max="200"
                              />
                              <span className="text-xs">g</span>
                            </div>
                            <button
                              onClick={() => {
                                addIngredientToSmoothie(food, parseInt(selectedQuantity))
                                setSelectedQuantity("50")
                              }}
                              className="w-full text-xs bg-purple-500 text-white p-1 rounded hover:bg-purple-600"
                            >
                              <Icons.Plus size="text-xs" />
                            </button>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Botones de acción */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={saveSmoothie}
                className="bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600 disabled:bg-gray-400 text-sm flex items-center justify-center gap-2"
                disabled={!smoothieName || smoothieIngredients.length === 0}
              >
                <Icons.Save size="text-sm" />
                Guardar Batido
              </button>
              <button
                onClick={() => {
                  setShowSmoothieCreator(false)
                  setSmoothieIngredients([])
                  setSmoothieName("")
                }}
                className="bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 text-sm"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 🆕 CREADOR DE COMIDAS MEJORADO
  const EnhancedMealCreator = () => {
    if (!showEnhancedMealCreator) return null

    const mealTotals = calculateTotalMacros(mealIngredients)
    const allCategories = getFoodsByCategory()

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-4">
        <div className="relative top-4 mx-auto border w-full max-w-3xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto">
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <Icons.Utensils size="text-xl" />
                Crear {selectedMealTypeEnhanced.charAt(0).toUpperCase() + selectedMealTypeEnhanced.slice(1)} Personalizado
              </h3>
              <button 
                onClick={() => {
                  setShowEnhancedMealCreator(false)
                  setMealIngredients([])
                  setMealName("")
                }} 
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Icons.X size="text-lg" />
              </button>
            </div>

            {/* Nombre de la comida */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de la comida
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                placeholder="Mi desayuno proteico..."
                value={mealName}
                onChange={(e) => setMealName(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Panel izquierdo: Ingredientes agregados */}
              <div>
                <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                  <Icons.CheckCircle size="text-sm" />
                  Ingredientes Agregados ({mealIngredients.length})
                </h4>
                
                {mealIngredients.length > 0 ? (
                  <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
                    {mealIngredients.map((ingredient, index) => (
                      <div key={index} className="bg-green-50 p-3 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm">{ingredient.food_name}</span>
                          <button
                            onClick={() => removeIngredientFromMeal(index)}
                            className="p-1 text-red-600 hover:bg-red-100 rounded"
                          >
                            <Icons.Trash2 size="text-xs" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <input
                            type="number"
                            className="w-20 text-sm p-1 border rounded"
                            value={ingredient.quantity_grams}
                            onChange={(e) => updateIngredientQuantity(index, parseInt(e.target.value) || 0)}
                            min="1"
                            max="1000"
                          />
                          <span className="text-sm text-gray-600">gramos</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2 text-xs text-gray-600">
                          <div>{ingredient.calories} cal</div>
                          <div>{ingredient.protein}g prot</div>
                          <div>{ingredient.carbs}g carbs</div>
                          <div>{ingredient.fats}g grasas</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500 text-sm mb-4">
                    No hay ingredientes agregados
                  </div>
                )}

                {/* Totales de la comida */}
                {mealIngredients.length > 0 && (
                  <div className="bg-green-100 p-4 rounded-lg">
                    <h5 className="font-semibold text-sm mb-2">Totales Nutricionales</h5>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-xl font-bold text-green-600">{mealTotals.calories}</div>
                        <div className="text-xs text-gray-600">Calorías</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-red-600">{mealTotals.protein}g</div>
                        <div className="text-xs text-gray-600">Proteína</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-yellow-600">{mealTotals.carbs}g</div>
                        <div className="text-xs text-gray-600">Carbohidratos</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-blue-600">{mealTotals.fats}g</div>
                        <div className="text-xs text-gray-600">Grasas</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Panel derecho: Selector de alimentos */}
              <div>
                <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                  <Icons.Plus size="text-sm" />
                  Agregar Alimentos
                </h4>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {allCategories.map((category) => (
                    <div key={category.id}>
                      <h5 className="font-medium flex items-center gap-2 text-sm mb-2 sticky top-0 bg-white">
                        {category.icon} {category.name}
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {category.foods.slice(0, 8).map((food) => {
                          const [selectedQuantity, setSelectedQuantity] = useState("100")
                          return (
                            <div key={food.id} className="border border-gray-200 rounded-lg p-2 hover:bg-gray-50">
                              <div className="text-sm font-medium mb-1">{food.name}</div>
                              <div className="text-xs text-gray-500 mb-2">
                                {food.calories} cal | {food.protein}g prot | {food.carbs}g carbs | {food.fats}g grasas
                              </div>
                              <div className="flex items-center gap-2 mb-2">
                                <input
                                  type="number"
                                  className="w-16 text-xs p-1 border rounded"
                                  value={selectedQuantity}
                                  onChange={(e) => setSelectedQuantity(e.target.value)}
                                  min="1"
                                  max="1000"
                                />
                                <span className="text-xs">g</span>
                                <button
                                  onClick={() => {
                                    addIngredientToMeal(food, parseInt(selectedQuantity))
                                    setSelectedQuantity("100")
                                  }}
                                  className="flex-1 text-xs bg-green-500 text-white p-1 rounded hover:bg-green-600 flex items-center justify-center gap-1"
                                >
                                  <Icons.Plus size="text-xs" />
                                  Agregar
                                </button>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <button
                onClick={saveEnhancedMeal}
                className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 disabled:bg-gray-400 text-sm flex items-center justify-center gap-2"
                disabled={!mealName || mealIngredients.length === 0}
              >
                <Icons.Save size="text-sm" />
                Guardar Comida (+25 pts)
              </button>
              <button
                onClick={() => {
                  setShowEnhancedMealCreator(false)
                  setMealIngredients([])
                  setMealName("")
                }}
                className="bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 text-sm"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
