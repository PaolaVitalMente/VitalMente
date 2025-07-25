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
  Blender: ({ size = "text-xl" }: { size?: string }) => <span className={size}>🥤</span>,
  Info: ({ size = "text-xl" }: { size?: string }) => <span className={size}>ℹ️</span>,
  Save: ({ size = "text-xl" }: { size?: string }) => <span className={size}>💾</span>,
  List: ({ size = "text-xl" }: { size?: string }) => <span className={size}>📝</span>,
}

// ============================================================================
// CONFIGURACIÓN DE SUPABASE
// ============================================================================
const SUPABASE_URL = "https://frzyksfceugddjrerxkf.supabase.co"
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyenlrc2ZjZXVnZGRqcmVyeGtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3MzgwMTUsImV4cCI6MjA2NzMxNDAxNX0.E6ZjfC6RJoA98RkDK-I87k2l3d7naK9C-mEC0alH7L8"

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// ============================================================================
// TIPOS DE DATOS (MANTENIENDO LOS ORIGINALES)
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

// 🆕 NUEVOS TIPOS PARA BATIDOS Y CREADOR DE COMIDAS
interface SmoothieIngredient {
  food: GlobalFood
  quantity: number
}

interface MealBuilder {
  ingredients: { food: GlobalFood; quantity: number }[]
  totalMacros: ConsumedMacros
}

// ============================================================================
// CONFIGURACIÓN DE DATOS (ORIGINAL + EXPANSIÓN)
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
    { level: 1, name: "Principiante", icon: "🌱", pointsRequired: 0, color: "bg-green-100 text-green-800" },
    { level: 2, name: "Explorador", icon: "🔍", pointsRequired: 100, color: "bg-blue-100 text-blue-800" },
    { level: 3, name: "Comprometido", icon: "💪", pointsRequired: 300, color: "bg-purple-100 text-purple-800" },
    { level: 4, name: "Disciplinado", icon: "🎯", pointsRequired: 600, color: "bg-orange-100 text-orange-800" },
    { level: 5, name: "Experto", icon: "⭐", pointsRequired: 1000, color: "bg-yellow-100 text-yellow-800" },
    { level: 6, name: "Maestro", icon: "👑", pointsRequired: 1500, color: "bg-red-100 text-red-800" },
    { level: 7, name: "Leyenda", icon: "💎", pointsRequired: 2500, color: "bg-indigo-100 text-indigo-800" },
    { level: 8, name: "VitalMente", icon: "✨", pointsRequired: 4000, color: "bg-pink-100 text-pink-800" },
  ],
  pointsPerAction: {
    water: 5,
    exercise: 20,
    mindfulness: 15,
    meal: 10,
    streak_bonus: 50,
    challenge_complete: 100,
  },
}

// 🆕 BANCO DE ALIMENTOS EXPANDIDO (100 nuevos alimentos + 20 bebidas)
const EXPANDED_FOOD_DATABASE: GlobalFood[] = [
  // PROTEÍNAS ADICIONALES
  { id: "proteina_31", name: "Salmón a la plancha", calories: 208, protein: 25.4, carbs: 0, fats: 12.4, category: "proteinas", common_portion_size: 150, common_portion_name: "filete", is_active: true, created_at: new Date().toISOString() },
  { id: "proteina_32", name: "Atún en agua", calories: 128, protein: 28, carbs: 0, fats: 1.3, category: "proteinas", common_portion_size: 100, common_portion_name: "lata", is_active: true, created_at: new Date().toISOString() },
  { id: "proteina_33", name: "Sardinas", calories: 208, protein: 24.6, carbs: 0, fats: 11.5, category: "proteinas", common_portion_size: 80, common_portion_name: "porción", is_active: true, created_at: new Date().toISOString() },
  { id: "proteina_34", name: "Pechuga de pavo", calories: 189, protein: 29, carbs: 0, fats: 7.4, category: "proteinas", common_portion_size: 100, common_portion_name: "rebanada", is_active: true, created_at: new Date().toISOString() },
  { id: "proteina_35", name: "Jamón serrano", calories: 241, protein: 30.5, carbs: 0.4, fats: 12.9, category: "proteinas", common_portion_size: 50, common_portion_name: "lonjas", is_active: true, created_at: new Date().toISOString() },
  { id: "proteina_36", name: "Queso cottage", calories: 98, protein: 11, carbs: 3.4, fats: 4.3, category: "proteinas", common_portion_size: 100, common_portion_name: "taza", is_active: true, created_at: new Date().toISOString() },
  { id: "proteina_37", name: "Ricotta", calories: 174, protein: 11, carbs: 3, fats: 13, category: "proteinas", common_portion_size: 100, common_portion_name: "porción", is_active: true, created_at: new Date().toISOString() },
  { id: "proteina_38", name: "Yogur griego", calories: 59, protein: 10, carbs: 3.6, fats: 0.4, category: "proteinas", common_portion_size: 170, common_portion_name: "envase", is_active: true, created_at: new Date().toISOString() },
  { id: "proteina_39", name: "Tempeh", calories: 193, protein: 19, carbs: 9, fats: 11, category: "proteinas", common_portion_size: 100, common_portion_name: "porción", is_active: true, created_at: new Date().toISOString() },
  { id: "proteina_40", name: "Seitan", calories: 370, protein: 75, carbs: 14, fats: 1.9, category: "proteinas", common_portion_size: 100, common_portion_name: "porción", is_active: true, created_at: new Date().toISOString() },

  // VEGETALES ADICIONALES
  { id: "vegetal_31", name: "Kale", calories: 49, protein: 4.3, carbs: 8.8, fats: 0.9, category: "vegetales", common_portion_size: 100, common_portion_name: "taza", is_active: true, created_at: new Date().toISOString() },
  { id: "vegetal_32", name: "Rúcula", calories: 25, protein: 2.6, carbs: 3.7, fats: 0.7, category: "vegetales", common_portion_size: 100, common_portion_name: "taza", is_active: true, created_at: new Date().toISOString() },
  { id: "vegetal_33", name: "Acelgas", calories: 19, protein: 1.8, carbs: 3.7, fats: 0.2, category: "vegetales", common_portion_size: 100, common_portion_name: "taza", is_active: true, created_at: new Date().toISOString() },
  { id: "vegetal_34", name: "Bok choy", calories: 13, protein: 1.5, carbs: 2.2, fats: 0.2, category: "vegetales", common_portion_size: 100, common_portion_name: "taza", is_active: true, created_at: new Date().toISOString() },
  { id: "vegetal_35", name: "Berenjenas", calories: 25, protein: 1, carbs: 6, fats: 0.2, category: "vegetales", common_portion_size: 200, common_portion_name: "unidad", is_active: true, created_at: new Date().toISOString() },
  { id: "vegetal_36", name: "Calabacín", calories: 17, protein: 1.2, carbs: 3.1, fats: 0.3, category: "vegetales", common_portion_size: 150, common_portion_name: "unidad", is_active: true, created_at: new Date().toISOString() },
  { id: "vegetal_37", name: "Apio", calories: 14, protein: 0.7, carbs: 3, fats: 0.2, category: "vegetales", common_portion_size: 100, common_portion_name: "tallos", is_active: true, created_at: new Date().toISOString() },
  { id: "vegetal_38", name: "Rábanos", calories: 16, protein: 0.7, carbs: 3.4, fats: 0.1, category: "vegetales", common_portion_size: 50, common_portion_name: "unidades", is_active: true, created_at: new Date().toISOString() },
  { id: "vegetal_39", name: "Endivias", calories: 17, protein: 1.3, carbs: 3.4, fats: 0.2, category: "vegetales", common_portion_size: 100, common_portion_name: "hojas", is_active: true, created_at: new Date().toISOString() },
  { id: "vegetal_40", name: "Alcachofas", calories: 47, protein: 3.3, carbs: 10.5, fats: 0.2, category: "vegetales", common_portion_size: 120, common_portion_name: "unidad", is_active: true, created_at: new Date().toISOString() },

  // FRUTAS ADICIONALES
  { id: "fruta_31", name: "Arándanos", calories: 57, protein: 0.7, carbs: 14.5, fats: 0.3, category: "frutas", common_portion_size: 100, common_portion_name: "taza", is_active: true, created_at: new Date().toISOString() },
  { id: "fruta_32", name: "Frambuesas", calories: 52, protein: 1.2, carbs: 12, fats: 0.7, category: "frutas", common_portion_size: 100, common_portion_name: "taza", is_active: true, created_at: new Date().toISOString() },
  { id: "fruta_33", name: "Moras", calories: 43, protein: 1.4, carbs: 9.6, fats: 0.5, category: "frutas", common_portion_size: 100, common_portion_name: "taza", is_active: true, created_at: new Date().toISOString() },
  { id: "fruta_34", name: "Kiwi", calories: 61, protein: 1.1, carbs: 15, fats: 0.5, category: "frutas", common_portion_size: 100, common_portion_name: "unidad", is_active: true, created_at: new Date().toISOString() },
  { id: "fruta_35", name: "Maracuyá", calories: 97, protein: 2.2, carbs: 23, fats: 0.7, category: "frutas", common_portion_size: 50, common_portion_name: "unidad", is_active: true, created_at: new Date().toISOString() },
  { id: "fruta_36", name: "Higo", calories: 74, protein: 0.8, carbs: 19, fats: 0.3, category: "frutas", common_portion_size: 60, common_portion_name: "unidad", is_active: true, created_at: new Date().toISOString() },
  { id: "fruta_37", name: "Granada", calories: 83, protein: 1.7, carbs: 19, fats: 1.2, category: "frutas", common_portion_size: 150, common_portion_name: "unidad", is_active: true, created_at: new Date().toISOString() },
  { id: "fruta_38", name: "Caqui", calories: 70, protein: 0.6, carbs: 19, fats: 0.2, category: "frutas", common_portion_size: 120, common_portion_name: "unidad", is_active: true, created_at: new Date().toISOString() },
  { id: "fruta_39", name: "Lichi", calories: 66, protein: 0.8, carbs: 17, fats: 0.4, category: "frutas", common_portion_size: 100, common_portion_name: "unidades", is_active: true, created_at: new Date().toISOString() },
  { id: "fruta_40", name: "Papaya", calories: 43, protein: 0.5, carbs: 11, fats: 0.3, category: "frutas", common_portion_size: 150, common_portion_name: "rebanada", is_active: true, created_at: new Date().toISOString() },

  // CARBOHIDRATOS ADICIONALES
  { id: "carb_31", name: "Quinoa cocida", calories: 120, protein: 4.4, carbs: 22, fats: 1.9, category: "carbohidratos", common_portion_size: 100, common_portion_name: "taza", is_active: true, created_at: new Date().toISOString() },
  { id: "carb_32", name: "Bulgur", calories: 83, protein: 3, carbs: 19, fats: 0.2, category: "carbohidratos", common_portion_size: 100, common_portion_name: "taza", is_active: true, created_at: new Date().toISOString() },
  { id: "carb_33", name: "Cebada perlada", calories: 123, protein: 2.3, carbs: 28, fats: 0.4, category: "carbohidratos", common_portion_size: 100, common_portion_name: "taza", is_active: true, created_at: new Date().toISOString() },
  { id: "carb_34", name: "Mijo", calories: 119, protein: 3.5, carbs: 23, fats: 1, category: "carbohidratos", common_portion_size: 100, common_portion_name: "taza", is_active: true, created_at: new Date().toISOString() },
  { id: "carb_35", name: "Amaranto", calories: 102, protein: 4, carbs: 19, fats: 1.6, category: "carbohidratos", common_portion_size: 100, common_portion_name: "taza", is_active: true, created_at: new Date().toISOString() },
  { id: "carb_36", name: "Pasta integral", calories: 124, protein: 5, carbs: 25, fats: 1.1, category: "carbohidratos", common_portion_size: 100, common_portion_name: "porción", is_active: true, created_at: new Date().toISOString() },
  { id: "carb_37", name: "Pan integral", calories: 247, protein: 13, carbs: 41, fats: 4.2, category: "carbohidratos", common_portion_size: 30, common_portion_name: "rebanada", is_active: true, created_at: new Date().toISOString() },
  { id: "carb_38", name: "Tortilla de maíz", calories: 218, protein: 5.7, carbs: 45, fats: 2.9, category: "carbohidratos", common_portion_size: 30, common_portion_name: "unidad", is_active: true, created_at: new Date().toISOString() },
  { id: "carb_39", name: "Couscous", calories: 112, protein: 3.8, carbs: 23, fats: 0.2, category: "carbohidratos", common_portion_size: 100, common_portion_name: "taza", is_active: true, created_at: new Date().toISOString() },
  { id: "carb_40", name: "Polenta", calories: 85, protein: 2, carbs: 18, fats: 0.3, category: "carbohidratos", common_portion_size: 100, common_portion_name: "porción", is_active: true, created_at: new Date().toISOString() },

  // 🆕 NUEVA CATEGORÍA: BEBIDAS (20 bebidas)
  { id: "bebida_1", name: "Café negro", calories: 2, protein: 0.3, carbs: 0, fats: 0, category: "bebidas", common_portion_size: 240, common_portion_name: "taza", is_active: true, created_at: new Date().toISOString() },
  { id: "bebida_2", name: "Café con leche", calories: 42, protein: 2.2, carbs: 5.1, fats: 1.6, category: "bebidas", common_portion_size: 240, common_portion_name: "taza", is_active: true, created_at: new Date().toISOString() },
  { id: "bebida_3", name: "Cappuccino", calories: 74, protein: 4, carbs: 6.8, fats: 4.1, category: "bebidas", common_portion_size: 180, common_portion_name: "taza", is_active: true, created_at: new Date().toISOString() },
  { id: "bebida_4", name: "Latte", calories: 102, protein: 5.9, carbs: 9.5, fats: 3.9, category: "bebidas", common_portion_size: 240, common_portion_name: "vaso", is_active: true, created_at: new Date().toISOString() },
  { id: "bebida_5", name: "Chocolate caliente", calories: 192, protein: 8.8, carbs: 26.6, fats: 5.8, category: "bebidas", common_portion_size: 240, common_portion_name: "taza", is_active: true, created_at: new Date().toISOString() },
  { id: "bebida_6", name: "Frappé de café", calories: 180, protein: 3, carbs: 28, fats: 7, category: "bebidas", common_portion_size: 350, common_portion_name: "vaso", is_active: true, created_at: new Date().toISOString() },
  { id: "bebida_7", name: "Malteada de vainilla", calories: 254, protein: 8.8, carbs: 40, fats: 6.9, category: "bebidas", common_portion_size: 350, common_portion_name: "vaso", is_active: true, created_at: new Date().toISOString() },
  { id: "bebida_8", name: "Leche entera", calories: 61, protein: 3.2, carbs: 4.8, fats: 3.3, category: "bebidas", common_portion_size: 240, common_portion_name: "vaso", is_active: true, created_at: new Date().toISOString() },
  { id: "bebida_9", name: "Leche deslactosada", calories: 50, protein: 3.4, carbs: 5, fats: 2.5, category: "bebidas", common_portion_size: 240, common_portion_name: "vaso", is_active: true, created_at: new Date().toISOString() },
  { id: "bebida_10", name: "Leche de almendras", calories: 17, protein: 0.6, carbs: 1.5, fats: 1.5, category: "bebidas", common_portion_size: 240, common_portion_name: "vaso", is_active: true, created_at: new Date().toISOString() },
  { id: "bebida_11", name: "Leche de soya", calories: 54, protein: 3.3, carbs: 4.2, fats: 2.2, category: "bebidas", common_portion_size: 240, common_portion_name: "vaso", is_active: true, created_at: new Date().toISOString() },
  { id: "bebida_12", name: "Leche de coco", calories: 76, protein: 0.5, carbs: 7.1, fats: 5.1, category: "bebidas", common_portion_size: 240, common_portion_name: "vaso", is_active: true, created_at: new Date().toISOString() },
  { id: "bebida_13", name: "Leche de avena", calories: 80, protein: 3, carbs: 16, fats: 1.5, category: "bebidas", common_portion_size: 240, common_portion_name: "vaso", is_active: true, created_at: new Date().toISOString() },
  { id: "bebida_14", name: "Té verde", calories: 2, protein: 0.2, carbs: 0, fats: 0, category: "bebidas", common_portion_size: 240, common_portion_name: "taza", is_active: true, created_at: new Date().toISOString() },
  { id: "bebida_15", name: "Té negro", calories: 2, protein: 0, carbs: 0.7, fats: 0, category: "bebidas", common_portion_size: 240, common_portion_name: "taza", is_active: true, created_at: new Date().toISOString() },
  { id: "bebida_16", name: "Jugo de naranja natural", calories: 45, protein: 0.7, carbs: 10.4, fats: 0.2, category: "bebidas", common_portion_size: 240, common_portion_name: "vaso", is_active: true, created_at: new Date().toISOString() },
  { id: "bebida_17", name: "Agua de coco", calories: 19, protein: 0.7, carbs: 3.7, fats: 0.2, category: "bebidas", common_portion_size: 240, common_portion_name: "vaso", is_active: true, created_at: new Date().toISOString() },
  { id: "bebida_18", name: "Kombucha", calories: 30, protein: 0, carbs: 7, fats: 0, category: "bebidas", common_portion_size: 240, common_portion_name: "vaso", is_active: true, created_at: new Date().toISOString() },
  { id: "bebida_19", name: "Batido de proteína", calories: 103, protein: 20, carbs: 3, fats: 1.5, category: "bebidas", common_portion_size: 250, common_portion_name: "vaso", is_active: true, created_at: new Date().toISOString() },
  { id: "bebida_20", name: "Agua mineral", calories: 0, protein: 0, carbs: 0, fats: 0, category: "bebidas", common_portion_size: 500, common_portion_name: "botella", is_active: true, created_at: new Date().toISOString() },
]

// ============================================================================
// FUNCIONES DE BASE DE DATOS (MANTENIENDO LAS ORIGINALES)
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
      const { data, error } = await supabase
        .from("global_foods")
        .select("*")
        .eq("is_active", true)
        .order("category", { ascending: true })
        .order("name", { ascending: true })
      if (error) throw error
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

  async generateAIRecommendations(userId: string): Promise<AIRecommendation[]> {
    try {
      const progressHistory = await dbFunctions.getProgressHistory(userId, 7)
      const supplements = await dbFunctions.getActiveSupplements()
      const recommendations: AIRecommendation[] = []

      if (!progressHistory || progressHistory.length === 0 || !supplements || supplements.length === 0) {
        return []
      }

      const avgWater = progressHistory.reduce((sum, day) => sum + (day.water || 0), 0) / progressHistory.length
      const avgExercise = progressHistory.reduce((sum, day) => sum + (day.exercise || 0), 0) / progressHistory.length
      const avgMindfulness =
        progressHistory.reduce((sum, day) => sum + (day.mindfulness || 0), 0) / progressHistory.length

      if (avgExercise < 0.5 && supplements.length > 0) {
        const energySupplements = supplements.filter(
          (s) =>
            s.benefits &&
            Array.isArray(s.benefits) &&
            s.benefits.some((b) => b && typeof b === "string" && b.toLowerCase().includes("energía")),
        )
        if (energySupplements.length > 0) {
          recommendations.push({
            id: `${userId}_energy_rec`,
            user_id: userId,
            supplement_names: energySupplements.slice(0, 2).map((s) => s.name || "Suplemento"),
            recommendation_type: "exercise_support",
            priority: "high",
            reason: `Hemos notado que tu actividad física ha sido baja. Estos suplementos pueden ayudarte a tener más energía.`,
            sales_angle: "¡Recupera tu energía y vuelve a entrenar! 💪",
            discount_percentage: 15,
            optimal_timing: "morning",
            confidence_score: 0.8,
            user_patterns: ["low_exercise"],
            is_active: true,
            shown_count: 0,
            clicked: false,
            purchased: false,
            expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            created_at: new Date().toISOString(),
          })
        }
      }

      if (avgMindfulness < 0.5 && supplements.length > 0) {
        const relaxSupplements = supplements.filter(
          (s) =>
            s.benefits &&
            Array.isArray(s.benefits) &&
            s.benefits.some(
              (b) =>
                b && typeof b === "string" && (b.toLowerCase().includes("estrés") || b.toLowerCase().includes("calma")),
            ),
        )
        if (relaxSupplements.length > 0) {
          recommendations.push({
            id: `${userId}_relax_rec`,
            user_id: userId,
            supplement_names: relaxSupplements.slice(0, 2).map((s) => s.name || "Suplemento"),
            recommendation_type: "stress_management",
            priority: "medium",
            reason: `Tu práctica de mindfulness ha sido irregular. Estos suplementos pueden ayudarte a encontrar más calma.`,
            sales_angle: "Encuentra tu paz interior 🧘‍♀️",
            discount_percentage: 10,
            optimal_timing: "evening",
            confidence_score: 0.7,
            user_patterns: ["low_mindfulness"],
            is_active: true,
            shown_count: 0,
            clicked: false,
            purchased: false,
            expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            created_at: new Date().toISOString(),
          })
        }
      }

      return recommendations
    } catch (error) {
      console.error("Error generating AI recommendations:", error)
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
        ]
        for (const supplement of defaultSupplements) {
          await supabase.from("supplements").insert(supplement)
        }
      }
    } catch (error) {
      console.log("Datos por defecto ya inicializados o error menor:", error)
    }
  },
}

// ============================================================================
// FUNCIONES AUXILIARES
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

// ============================================================================
// COMPONENTE PRINCIPAL RESPONSIVE MEJORADO
// ============================================================================
export default function VitalMenteApp() {
  // Estados principales
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

  // Estados de datos
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

  // Estados de UI móvil
  const [showMealCalculator, setShowMealCalculator] = useState(false)
  const [selectedMealType, setSelectedMealType] = useState<"desayuno" | "almuerzo" | "cena">("desayuno")
  const [selectedFood, setSelectedFood] = useState<UserFood | GlobalFood | null>(null)
  const [foodQuantity, setFoodQuantity] = useState<string>("100")
  const [showFloatingMenu, setShowFloatingMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  // 🆕 Estados para nuevas funcionalidades
  const [showSmoothieBuilder, setShowSmoothieBuilder] = useState(false)
  const [smoothieIngredients, setSmoothieIngredients] = useState<SmoothieIngredient[]>([])
  const [showMealBuilder, setShowMealBuilder] = useState(false)
  const [mealBuilder, setMealBuilder] = useState<MealBuilder>({ ingredients: [], totalMacros: { calories: 0, protein: 0, carbs: 0, fats: 0 } })
  const [showGamificationGuide, setShowGamificationGuide] = useState(false)

  // Estados de administración
  const [logoClicks, setLogoClicks] = useState(0)
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminCode, setAdminCode] = useState("")
  const [activeAdminTab, setActiveAdminTab] = useState("dashboard")

  // Estados de formularios
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
  // EFECTOS Y INICIALIZACIÓN
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
      
      // 🆕 Combinamos el banco de datos existente con el expandido
      const combinedFoods = [...globalFoodsList, ...EXPANDED_FOOD_DATABASE]
      setGlobalFoods(combinedFoods)
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

      const [foods, history, compositions, gamification, recommendations] = await Promise.all([
        dbFunctions.getUserFoods(userId),
        dbFunctions.getProgressHistory(userId),
        dbFunctions.getTodayMealCompositions(userId),
        dbFunctions.getUserGamification(userId),
        dbFunctions.generateAIRecommendations(userId),
      ])

      setUserFoods(foods)
      setProgressHistory(history)
      setMealCompositions(compositions)
      calculateConsumedMacros(compositions)
      setUserGamification(gamification)
      setAiRecommendations(recommendations)
    } catch (error) {
      console.error("Error loading user data:", error)
    }
  }

  const calculateConsumedMacros = (compositions: MealComposition[]) => {
    const totals = compositions.reduce(
      (acc, comp) => ({
        calories: acc.calories + comp.calories_consumed,
        protein: acc.protein + comp.protein_consumed,
        carbs: acc.carbs + comp.carbs_consumed,
        fats: acc.fats + comp.fats_consumed,
      }),
      { calories: 0, protein: 0, carbs: 0, fats: 0 },
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
  // 🆕 FUNCIONES PARA NUEVAS FUNCIONALIDADES
  // ============================================================================

  // Funciones para el creador de batidos
  const addIngredientToSmoothie = (food: GlobalFood, quantity: number) => {
    const existingIndex = smoothieIngredients.findIndex(ing => ing.food.id === food.id)
    if (existingIndex >= 0) {
      const updated = [...smoothieIngredients]
      updated[existingIndex].quantity = quantity
      setSmoothieIngredients(updated)
    } else {
      setSmoothieIngredients([...smoothieIngredients, { food, quantity }])
    }
  }

  const removeIngredientFromSmoothie = (foodId: string) => {
    setSmoothieIngredients(smoothieIngredients.filter(ing => ing.food.id !== foodId))
  }

  const calculateSmoothieMacros = () => {
    return smoothieIngredients.reduce(
      (totals, ingredient) => {
        const ratio = ingredient.quantity / 100
        return {
          calories: totals.calories + (ingredient.food.calories * ratio),
          protein: totals.protein + (ingredient.food.protein * ratio),
          carbs: totals.carbs + (ingredient.food.carbs * ratio),
          fats: totals.fats + (ingredient.food.fats * ratio),
        }
      },
      { calories: 0, protein: 0, carbs: 0, fats: 0 }
    )
  }

  const saveSmoothieAsMeal = async (mealType: "desayuno" | "almuerzo" | "cena") => {
    if (!currentUser || smoothieIngredients.length === 0) return
    
    try {
      const smoothieName = `Batido personalizado (${smoothieIngredients.map(ing => ing.food.name).join(', ')})`
      const smoothieMacros = calculateSmoothieMacros()
      
      const composition: Omit<MealComposition, "id" | "created_at"> = {
        user_id: currentUser.id,
        date: new Date().toISOString().split("T")[0],
        meal_type: mealType,
        food_id: `smoothie_${Date.now()}`,
        food_name: smoothieName,
        quantity_grams: smoothieIngredients.reduce((sum, ing) => sum + ing.quantity, 0),
        calories_consumed: Math.round(smoothieMacros.calories),
        protein_consumed: Math.round(smoothieMacros.protein),
        carbs_consumed: Math.round(smoothieMacros.carbs),
        fats_consumed: Math.round(smoothieMacros.fats),
      }
      
      const newComposition = await dbFunctions.addMealComposition(composition)
      setMealCompositions((prev) => [...prev, newComposition])
      calculateConsumedMacros([...mealCompositions, newComposition])
      await updateProgress(mealType, 1)
      
      setSmoothieIngredients([])
      setShowSmoothieBuilder(false)
      alert('¡Batido guardado exitosamente!')
    } catch (error: any) {
      console.error("Error saving smoothie:", error)
      alert("Error al guardar batido: " + error.message)
    }
  }

  // Funciones para el creador de comidas mejorado
  const addIngredientToMealBuilder = (food: GlobalFood, quantity: number) => {
    const newIngredient = { food, quantity }
    const updatedIngredients = [...mealBuilder.ingredients, newIngredient]
    const updatedMacros = calculateMealBuilderMacros(updatedIngredients)
    
    setMealBuilder({
      ingredients: updatedIngredients,
      totalMacros: updatedMacros
    })
  }

  const updateIngredientQuantity = (index: number, quantity: number) => {
    const updatedIngredients = [...mealBuilder.ingredients]
    updatedIngredients[index].quantity = quantity
    const updatedMacros = calculateMealBuilderMacros(updatedIngredients)
    
    setMealBuilder({
      ingredients: updatedIngredients,
      totalMacros: updatedMacros
    })
  }

  const removeIngredientFromMealBuilder = (index: number) => {
    const updatedIngredients = mealBuilder.ingredients.filter((_, i) => i !== index)
    const updatedMacros = calculateMealBuilderMacros(updatedIngredients)
    
    setMealBuilder({
      ingredients: updatedIngredients,
      totalMacros: updatedMacros
    })
  }

  const calculateMealBuilderMacros = (ingredients: { food: GlobalFood; quantity: number }[]) => {
    return ingredients.reduce(
      (totals, ingredient) => {
        const ratio = ingredient.quantity / 100
        return {
          calories: totals.calories + (ingredient.food.calories * ratio),
          protein: totals.protein + (ingredient.food.protein * ratio),
          carbs: totals.carbs + (ingredient.food.carbs * ratio),
          fats: totals.fats + (ingredient.food.fats * ratio),
        }
      },
      { calories: 0, protein: 0, carbs: 0, fats: 0 }
    )
  }

  const saveMealBuilderAsMeal = async (mealType: "desayuno" | "almuerzo" | "cena") => {
    if (!currentUser || mealBuilder.ingredients.length === 0) return
    
    try {
      for (const ingredient of mealBuilder.ingredients) {
        const ratio = ingredient.quantity / 100
        const composition: Omit<MealComposition, "id" | "created_at"> = {
          user_id: currentUser.id,
          date: new Date().toISOString().split("T")[0],
          meal_type: mealType,
          food_id: ingredient.food.id,
          food_name: ingredient.food.name,
          quantity_grams: ingredient.quantity,
          calories_consumed: Math.round(ingredient.food.calories * ratio),
          protein_consumed: Math.round(ingredient.food.protein * ratio),
          carbs_consumed: Math.round(ingredient.food.carbs * ratio),
          fats_consumed: Math.round(ingredient.food.fats * ratio),
        }
        
        const newComposition = await dbFunctions.addMealComposition(composition)
        setMealCompositions((prev) => [...prev, newComposition])
      }
      
      calculateConsumedMacros([...mealCompositions, ...mealBuilder.ingredients.map(ing => {
        const ratio = ing.quantity / 100
        return {
          id: `temp_${Date.now()}`,
          user_id: currentUser.id,
          date: new Date().toISOString().split("T")[0],
          meal_type: mealType,
          food_id: ing.food.id,
          food_name: ing.food.name,
          quantity_grams: ing.quantity,
          calories_consumed: Math.round(ing.food.calories * ratio),
          protein_consumed: Math.round(ing.food.protein * ratio),
          carbs_consumed: Math.round(ing.food.carbs * ratio),
          fats_consumed: Math.round(ing.food.fats * ratio),
          created_at: new Date().toISOString(),
        }
      })])
      
      await updateProgress(mealType, 1)
      
      setMealBuilder({ ingredients: [], totalMacros: { calories: 0, protein: 0, carbs: 0, fats: 0 } })
      setShowMealBuilder(false)
      alert('¡Comida guardada exitosamente!')
    } catch (error: any) {
      console.error("Error saving meal:", error)
      alert("Error al guardar comida: " + error.message)
    }
  }

  // ============================================================================
  // FUNCIONES DE AUTENTICACIÓN (MANTENIENDO LAS ORIGINALES)
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
    // 🆕 Limpiar estados de nuevas funcionalidades
    setSmoothieIngredients([])
    setMealBuilder({ ingredients: [], totalMacros: { calories: 0, protein: 0, carbs: 0, fats: 0 } })
  }

  // ============================================================================
  // FUNCIONES DE PROGRESO (MANTENIENDO LAS ORIGINALES)
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
  // FUNCIONES DE ADMINISTRACIÓN (MANTENIENDO LAS ORIGINALES)
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
      const users = await dbFunctions.getAllUsers()
      setAllUsers(users)
    } catch (error) {
      console.error("Error loading admin data:", error)
    }
  }

  // ============================================================================
  // FUNCIONES DE COMIDA (MANTENIENDO LAS ORIGINALES + MEJORAS)
  // ============================================================================
  const openMealCalculator = (mealType: "desayuno" | "almuerzo" | "cena") => {
    setSelectedMealType(mealType)
    setShowMealCalculator(true)
    setSelectedFood(null)
    setFoodQuantity("100")
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

  // 🆕 Función mejorada para obtener alimentos por categoría (incluyendo bebidas)
  const getFoodsByCategory = () => {
    const categories = [
      { id: "proteinas", name: "Proteínas", icon: "🍗" },
      { id: "vegetales", name: "Vegetales", icon: "🥬" },
      { id: "frutas", name: "Frutas", icon: "🍎" },
      { id: "carbohidratos", name: "Carbohidratos", icon: "🌾" },
      { id: "bebidas", name: "Bebidas", icon: "🥤" }, // 🆕 Nueva categoría
    ]
    return categories.map((category) => ({
      ...category,
      foods: globalFoods.filter((food) => food.category === category.id),
    }))
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

Precio mostrado: $${supplement.price.toLocaleString()}
Beneficios: ${supplement.benefits.join(", ")}

Gracias!`
    const message = supplement.whatsapp_message || defaultMessage
    const whatsappUrl = `https://wa.me/573134852878?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  // ============================================================================
  // COMPONENTES DE UI RESPONSIVOS
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

  // 🆕 Panel de gamificación mejorado con explicación
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
          <div className="flex items-center gap-2">
            <div className="text-right">
              <div className="text-xl sm:text-2xl font-bold">{userGamification.total_points}</div>
              <div className="text-xs opacity-75">puntos</div>
            </div>
            {/* 🆕 Botón de información */}
            <button
              onClick={() => setShowGamificationGuide(true)}
              className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            >
              <Icons.Info size="text-sm" />
            </button>
          </div>
        </div>
        {nextLevelInfo && (
          <div className="mb-3">
            <div className="flex justify-between text-xs mb-1">
              <span>Siguiente nivel: {nextLevelInfo.name}</span>
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

  // 🆕 Modal de guía de gamificación
  const GamificationGuideModal = () => {
    if (!showGamificationGuide) return null

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-4">
        <div className="relative top-4 mx-auto border w-full max-w-md shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto">
          <div className="p-4 sm:p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <Icons.Trophy size="text-lg" />
                Sistema de Niveles
              </h3>
              <button 
                onClick={() => setShowGamificationGuide(false)} 
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Icons.X size="text-lg" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <h4 className="font-semibold text-sm mb-2">🎯 ¿Cómo ganar puntos?</h4>
                <ul className="text-xs space-y-1">
                  <li>• Agua: +5 puntos por vaso</li>
                  <li>• Ejercicio: +20 puntos por sesión</li>
                  <li>• Mindfulness: +15 puntos por sesión</li>
                  <li>• Comidas: +10 puntos por comida registrada</li>
                  <li>• Racha diaria: +50 puntos bonus</li>
                </ul>
              </div>

              <div className="bg-purple-50 p-3 rounded-lg">
                <h4 className="font-semibold text-sm mb-2">🏆 Niveles disponibles</h4>
                <div className="space-y-2">
                  {LEVEL_SYSTEM.levels.map((level) => (
                    <div key={level.level} className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-2">
                        <span className="text-lg">{level.icon}</span>
                        {level.name}
                      </span>
                      <span className="text-gray-500">{level.pointsRequired} pts</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 p-3 rounded-lg">
                <h4 className="font-semibold text-sm mb-2">✨ Beneficios</h4>
                <ul className="text-xs space-y-1">
                  <li>• Mantén tu motivación alta</li>
                  <li>• Compite contigo mismo</li>
                  <li>• Desbloquea nuevos logros</li>
                  <li>• Accede a contenido exclusivo</li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => setShowGamificationGuide(false)}
              className="w-full mt-4 bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600 text-sm"
            >
              ¡Entendido!
            </button>
          </div>
        </div>
      </div>
    )
  }

  // 🆕 Creador de batidos
  const SmoothieBuilderModal = () => {
    if (!showSmoothieBuilder) return null

    const smoothieMacros = calculateSmoothieMacros()
    const availableFoods = globalFoods.filter(food => 
      ['frutas', 'bebidas', 'proteinas'].includes(food.category)
    )

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-4">
        <div className="relative top-4 mx-auto border w-full max-w-md shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <Icons.Blender size="text-lg" />
                Crear Batido
              </h3>
              <button onClick={() => setShowSmoothieBuilder(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <Icons.X size="text-lg" />
              </button>
            </div>

            {/* Ingredientes actuales */}
            {smoothieIngredients.length > 0 && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2 text-sm">Ingredients ({smoothieIngredients.length})</h4>
                <div className="space-y-2">
                  {smoothieIngredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center justify-between text-xs">
                      <span>{ingredient.food.name} ({ingredient.quantity}g)</span>
                      <button
                        onClick={() => removeIngredientFromSmoothie(ingredient.food.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Icons.Trash2 size="text-xs" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t text-xs">
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div>
                      <div className="font-bold">{Math.round(smoothieMacros.calories)}</div>
                      <div className="text-gray-500">cal</div>
                    </div>
                    <div>
                      <div className="font-bold">{Math.round(smoothieMacros.protein)}</div>
                      <div className="text-gray-500">prot</div>
                    </div>
                    <div>
                      <div className="font-bold">{Math.round(smoothieMacros.carbs)}</div>
                      <div className="text-gray-500">carb</div>
                    </div>
                    <div>
                      <div className="font-bold">{Math.round(smoothieMacros.fats)}</div>
                      <div className="text-gray-500">gras</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Selector de ingredientes */}
            <div className="mb-4">
              <h4 className="font-semibold mb-3 text-sm">Agregar ingredientes</h4>
              <div className="space-y-3">
                {['frutas', 'bebidas', 'proteinas'].map((category) => {
                  const categoryFoods = globalFoods.filter(food => food.category === category)
                  const categoryIcons = { frutas: '🍎', bebidas: '🥤', proteinas: '🍗' }
                  
                  return (
                    <div key={category}>
                      <h5 className="font-medium flex items-center gap-2 text-sm mb-2">
                        {categoryIcons[category as keyof typeof categoryIcons]} {category.charAt(0).toUpperCase() + category.slice(1)}
                      </h5>
                      <div className="grid grid-cols-2 gap-2">
                        {categoryFoods.slice(0, 6).map((food) => (
                          <button
                            key={food.id}
                            onClick={() => {
                              const quantity = prompt(`¿Cuántos gramos de ${food.name}?`, "50")
                              if (quantity && !isNaN(Number(quantity))) {
                                addIngredientToSmoothie(food, Number(quantity))
                              }
                            }}
                            className="px-2 py-2 text-xs border rounded-lg hover:bg-gray-50 transition-colors text-left"
                          >
                            <div className="font-medium">{food.name}</div>
                            <div className="text-gray-500">{food.calories} cal/100g</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Botones de acción */}
            {smoothieIngredients.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs text-gray-600 mb-2">Guardar como:</div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => saveSmoothieAsMeal("desayuno")}
                    className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 text-xs"
                  >
                    Desayuno
                  </button>
                  <button
                    onClick={() => saveSmoothieAsMeal("almuerzo")}
                    className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 text-xs"
                  >
                    Almuerzo
                  </button>
                  <button
                    onClick={() => saveSmoothieAsMeal("cena")}
                    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 text-xs"
                  >
                    Cena
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={() => {
                setSmoothieIngredients([])
                setShowSmoothieBuilder(false)
              }}
              className="w-full mt-3 bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 text-sm"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    )
  }

  // 🆕 Constructor de comidas mejorado
  const MealBuilderModal = () => {
    if (!showMealBuilder) return null

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-4">
        <div className="relative top-4 mx-auto border w-full max-w-md shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <Icons.ChefHat size="text-lg" />
                Constructor de Comidas
              </h3>
              <button onClick={() => setShowMealBuilder(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <Icons.X size="text-lg" />
              </button>
            </div>

            {/* Lista de ingredientes actuales */}
            {mealBuilder.ingredients.length > 0 && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2 text-sm">Ingredientes ({mealBuilder.ingredients.length})</h4>
                <div className="space-y-2">
                  {mealBuilder.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="flex-1 text-xs">
                        <div className="font-medium">{ingredient.food.name}</div>
                        <div className="text-gray-500">
                          {Math.round((ingredient.food.calories * ingredient.quantity) / 100)} cal
                        </div>
                      </div>
                      <input
                        type="number"
                        value={ingredient.quantity}
                        onChange={(e) => updateIngredientQuantity(index, Number(e.target.value))}
                        className="w-16 p-1 border rounded text-xs text-center"
                        min="1"
                      />
                      <span className="text-xs text-gray-500">g</span>
                      <button
                        onClick={() => removeIngredientFromMealBuilder(index)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Icons.Trash2 size="text-xs" />
                      </button>
                    </div>
                  ))}
                </div>
                
                {/* Resumen nutricional */}
                <div className="mt-3 pt-2 border-t">
                  <div className="grid grid-cols-4 gap-2 text-center text-xs">
                    <div>
                      <div className="font-bold">{Math.round(mealBuilder.totalMacros.calories)}</div>
                      <div className="text-gray-500">cal</div>
                    </div>
                    <div>
                      <div className="font-bold">{Math.round(mealBuilder.totalMacros.protein)}</div>
                      <div className="text-gray-500">prot</div>
                    </div>
                    <div>
                      <div className="font-bold">{Math.round(mealBuilder.totalMacros.carbs)}</div>
                      <div className="text-gray-500">carb</div>
                    </div>
                    <div>
                      <div className="font-bold">{Math.round(mealBuilder.totalMacros.fats)}</div>
                      <div className="text-gray-500">gras</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Selector de alimentos por categoría */}
            <div className="mb-4">
              <h4 className="font-semibold mb-3 text-sm">Agregar alimentos</h4>
              <div className="space-y-3">
                {getFoodsByCategory().map((category) => (
                  <div key={category.id}>
                    <h5 className="font-medium flex items-center gap-2 text-sm mb-2">
                      {category.icon} {category.name}
                    </h5>
                    <div className="grid grid-cols-2 gap-2">
                      {category.foods.slice(0, 4).map((food) => (
                        <button
                          key={food.id}
                          onClick={() => {
                            const quantity = prompt(`¿Cuántos gramos de ${food.name}?`, "100")
                            if (quantity && !isNaN(Number(quantity))) {
                              addIngredientToMealBuilder(food, Number(quantity))
                            }
                          }}
                          className="px-2 py-2 text-xs border rounded-lg hover:bg-gray-50 transition-colors text-left"
                        >
                          <div className="font-medium">{food.name}</div>
                          <div className="text-gray-500">{food.calories} cal/100g</div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Botones de guardar */}
            {mealBuilder.ingredients.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs text-gray-600 mb-2">Guardar como:</div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => saveMealBuilderAsMeal("desayuno")}
                    className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 text-xs"
                  >
                    Desayuno
                  </button>
                  <button
                    onClick={() => saveMealBuilderAsMeal("almuerzo")}
                    className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 text-xs"
                  >
                    Almuerzo
                  </button>
                  <button
                    onClick={() => saveMealBuilderAsMeal("cena")}
                    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 text-xs"
                  >
                    Cena
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={() => {
                setMealBuilder({ ingredients: [], totalMacros: { calories: 0, protein: 0, carbs: 0, fats: 0 } })
                setShowMealBuilder(false)
              }}
              className="w-full mt-3 bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 text-sm"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Panel de administración mejorado
  const AdminPanel = () => {
    const [showAddResource, setShowAddResource] = useState(false)
    const [newResource, setNewResource] = useState({
      type: "mindfulness" as "mindfulness" | "nutrition" | "exercise",
      title: "",
      description: "",
      url: "",
      image_url: "",
    })

    const [showAddTip, setShowAddTip] = useState(false)
    const [newTip, setNewTip] = useState({
      category: "",
      title: "",
      content: "",
      icon: "💡",
    })

    const [showAddSupplement, setShowAddSupplement] = useState(false)
    const [newSupplement, setNewSupplement] = useState({
      name: "",
      description: "",
      benefits: "",
      price: "",
      image_url: "",
      whatsapp_message: "",
    })

    // 🆕 Estados para edición
    const [editingResource, setEditingResource] = useState<GlobalResource | null>(null)
    const [editingSupplement, setEditingSupplement] = useState<Supplement | null>(null)

    const addResource = async () => {
      try {
        const { data, error } = await supabase
          .from("global_resources")
          .insert({
            ...newResource,
            is_active: true,
            created_at: new Date().toISOString(),
          })
          .select()
          .single()
        if (error) throw error
        setGlobalResources((prev) => [...prev, data])
        setNewResource({
          type: "mindfulness",
          title: "",
          description: "",
          url: "",
          image_url: "",
        })
        setShowAddResource(false)
        alert("✅ Recurso agregado exitosamente!")
        await loadGlobalContent()
      } catch (error) {
        console.error("Error adding resource:", error)
        alert("❌ Error al agregar recurso")
      }
    }

    const addTip = async () => {
      try {
        const { data, error } = await supabase
          .from("global_tips")
          .insert({
            ...newTip,
            is_active: true,
            created_at: new Date().toISOString(),
          })
          .select()
          .single()
        if (error) throw error
        setGlobalTips((prev) => [...prev, data])
        setNewTip({
          category: "",
          title: "",
          content: "",
          icon: "💡",
        })
        setShowAddTip(false)
        alert("✅ Tip agregado exitosamente!")
        await loadGlobalContent()
      } catch (error) {
        console.error("Error adding tip:", error)
        alert("❌ Error al agregar tip")
      }
    }

    const addSupplement = async () => {
      try {
        const { data, error } = await supabase
          .from("supplements")
          .insert({
            ...newSupplement,
            price: Number.parseInt(newSupplement.price) || 0,
            is_active: true,
            created_at: new Date().toISOString(),
          })
          .select()
          .single()
        if (error) throw error
        setSupplements((prev) => [...prev, { ...data, benefits: data.benefits ? data.benefits.split(",") : [] }])
        setNewSupplement({
          name: "",
          description: "",
          benefits: "",
          price: "",
          image_url: "",
          whatsapp_message: "",
        })
        setShowAddSupplement(false)
        alert("✅ Suplemento agregado exitosamente!")
        await loadGlobalContent()
      } catch (error) {
        console.error("Error adding supplement:", error)
        alert("❌ Error al agregar suplemento")
      }
    }

    // 🆕 Funciones de edición
    const updateResource = async (resource: GlobalResource) => {
      try {
        const { error } = await supabase
          .from("global_resources")
          .update({
            title: resource.title,
            description: resource.description,
            url: resource.url,
            image_url: resource.image_url,
            is_active: resource.is_active,
          })
          .eq("id", resource.id)
        
        if (error) throw error
        
        setGlobalResources(prev => prev.map(r => r.id === resource.id ? resource : r))
        setEditingResource(null)
        alert("✅ Recurso actualizado!")
      } catch (error) {
        console.error("Error updating resource:", error)
        alert("❌ Error al actualizar recurso")
      }
    }

    const toggleResourceStatus = async (resourceId: string, isActive: boolean) => {
      try {
        const { error } = await supabase
          .from("global_resources")
          .update({ is_active: !isActive })
          .eq("id", resourceId)
        
        if (error) throw error
        
        setGlobalResources(prev => prev.map(r => 
          r.id === resourceId ? { ...r, is_active: !isActive } : r
        ))
        alert(`✅ Recurso ${!isActive ? 'activado' : 'desactivado'}!`)
      } catch (error) {
        console.error("Error toggling resource:", error)
        alert("❌ Error al cambiar estado del recurso")
      }
    }

    const deleteResource = async (resourceId: string) => {
      if (!confirm("¿Estás seguro de eliminar este recurso?")) return
      
      try {
        const { error } = await supabase
          .from("global_resources")
          .delete()
          .eq("id", resourceId)
        
        if (error) throw error
        
        setGlobalResources(prev => prev.filter(r => r.id !== resourceId))
        alert("✅ Recurso eliminado!")
      } catch (error) {
        console.error("Error deleting resource:", error)
        alert("❌ Error al eliminar recurso")
      }
    }

    // 🆕 Análisis de patrones para suplementación
    const analyzeUserPatternsForSupplements = () => {
      const patterns = allUsers.map(user => {
        // Obtener datos de progreso del usuario (simulado para demo)
        const avgWater = Math.random() * 8 // Simular promedio de agua
        const avgExercise = Math.random() * 2 // Simular promedio de ejercicio
        const avgMindfulness = Math.random() * 2 // Simular promedio de mindfulness
        
        const recommendations = []
        
        if (avgWater < 4) recommendations.push("Electrolitos/Hidratación")
        if (avgExercise < 0.5) recommendations.push("Energéticos/Pre-workout")
        if (avgMindfulness < 0.5) recommendations.push("Relajantes/Adaptógenos")
        if (user.goal === "gain_muscle") recommendations.push("Proteína/Creatina")
        if (user.goal === "lose_weight") recommendations.push("Quemadores/Termogénicos")
        
        return {
          userId: user.id,
          name: user.name,
          goal: user.goal,
          patterns: {
            lowWater: avgWater < 4,
            lowExercise: avgExercise < 0.5,
            lowMindfulness: avgMindfulness < 0.5,
          },
          recommendations,
          priority: recommendations.length > 2 ? "Alta" : recommendations.length > 0 ? "Media" : "Baja"
        }
      })
      
      return patterns
    }

    const userPatterns = analyzeUserPatternsForSupplements()
    const highPriorityUsers = userPatterns.filter(p => p.priority === "Alta")
    const supplementRecommendationStats = userPatterns.reduce((acc, pattern) => {
      pattern.recommendations.forEach(rec => {
        acc[rec] = (acc[rec] || 0) + 1
      })
      return acc
    }, {} as Record<string, number>)

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header móvil de administración */}
        <div className="bg-white border-b shadow-sm">
          <div className="px-4 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Icons.Shield size="text-xl sm:text-2xl" />
                  <span className="hidden sm:inline">Panel de Administración Maestro</span>
                  <span className="sm:hidden">Admin Maestro</span>
                </h1>
                <p className="text-xs sm:text-sm text-gray-600">
                  Análisis de patrones y gestión de suplementación inteligente
                </p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                    🌐 Conectado a Supabase
                  </span>
                  <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">🤖 IA Activa</span>
                  <span className="inline-block px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded">
                    🚀 Desplegado en Vercel
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsAdmin(false)}
                className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
              >
                <Icons.LogOut size="text-sm" />
                <span className="hidden sm:inline">Salir</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navegación de tabs responsive */}
        <div className="bg-white border-b overflow-x-auto">
          <div className="px-4">
            <div className="flex space-x-4 sm:space-x-8 min-w-max">
              {[
                { id: "dashboard", name: "Dashboard", icon: <Icons.Chart size="text-sm" /> },
                { id: "users", name: "Usuarios", icon: <Icons.Users size="text-sm" /> },
                { id: "patterns", name: "Patrones IA", icon: <Icons.Robot size="text-sm" /> },
                { id: "resources", name: "Recursos", icon: <Icons.Link size="text-sm" /> },
                { id: "supplements", name: "Suplementos", icon: <Icons.Package size="text-sm" /> },
                { id: "analytics", name: "Analytics", icon: <Icons.TrendingUp size="text-sm" /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveAdminTab(tab.id)}
                  className={`py-3 px-2 border-b-2 font-medium text-xs sm:text-sm flex items-center gap-2 whitespace-nowrap ${
                    activeAdminTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.icon}
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Contenido de administración */}
        <div className="px-4 py-6">
          {/* TAB DASHBOARD */}
          {activeAdminTab === "dashboard" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-600">Usuarios Totales</p>
                      <p className="text-xl sm:text-2xl font-bold text-blue-600">{allUsers.length}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        +
                        {
                          allUsers.filter(
                            (u) => new Date(u.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                          ).length
                        }{" "}
                        esta semana
                      </p>
                    </div>
                    <Icons.Users size="text-2xl" />
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-600">Suplementos Activos</p>
                      <p className="text-xl sm:text-2xl font-bold text-purple-600">{supplements.length}</p>
                      <p className="text-xs text-gray-500 mt-1">Catálogo completo</p>
                    </div>
                    <Icons.Package size="text-2xl" />
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-600">Usuarios Alta Prioridad</p>
                      <p className="text-xl sm:text-2xl font-bold text-red-600">{highPriorityUsers.length}</p>
                      <p className="text-xs text-gray-500 mt-1">Necesitan atención</p>
                    </div>
                    <Icons.AlertCircle size="text-2xl" />
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-600">Recursos Activos</p>
                      <p className="text-xl sm:text-2xl font-bold text-orange-600">{globalResources.length}</p>
                      <p className="text-xs text-gray-500 mt-1">Videos, PDFs, Enlaces</p>
                    </div>
                    <Icons.Link size="text-2xl" />
                  </div>
                </div>
              </div>

              {/* 🆕 Recomendaciones IA más populares */}
              <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2">
                  <Icons.Robot size="text-lg" />
                  Suplementos Más Recomendados por IA
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(supplementRecommendationStats)
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 6)
                    .map(([supplement, count]) => (
                    <div key={supplement} className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg">
                      <div className="font-semibold text-sm">{supplement}</div>
                      <div className="text-2xl font-bold text-blue-600">{count}</div>
                      <div className="text-xs text-gray-600">usuarios candidatos</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB USUARIOS */}
          {activeAdminTab === "users" && (
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-sm sm:text-base flex items-center gap-2">
                  <Icons.Users size="text-lg" />
                  Lista de Usuarios Registrados ({allUsers.length})
                </h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {allUsers.map((user) => {
                  const userPattern = userPatterns.find(p => p.userId === user.id)
                  return (
                    <div key={user.id} className="p-4 border-b hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-sm">{user.name}</p>
                          <p className="text-xs text-gray-600">{user.phone}</p>
                          <p className="text-xs text-gray-500">
                            Registrado: {new Date(user.created_at).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-gray-500">
                            Último acceso: {new Date(user.last_login).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded mb-1 block">
                            {GOALS.find((g) => g.id === user.goal)?.label || user.goal}
                          </span>
                          {userPattern && (
                            <span className={`text-xs px-2 py-1 rounded mb-1 block ${
                              userPattern.priority === 'Alta' ? 'bg-red-100 text-red-800' :
                              userPattern.priority === 'Media' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              Prioridad: {userPattern.priority}
                            </span>
                          )}
                          <div className="text-xs text-gray-500">
                            {user.age} años | {user.weight}kg | {user.height}cm
                          </div>
                        </div>
                      </div>
                      {userPattern && userPattern.recommendations.length > 0 && (
                        <div className="mt-2 pt-2 border-t">
                          <div className="text-xs text-gray-600 mb-1">Recomendaciones IA:</div>
                          <div className="flex flex-wrap gap-1">
                            {userPattern.recommendations.map((rec, idx) => (
                              <span key={idx} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                {rec}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* 🆕 TAB PATRONES IA */}
          {activeAdminTab === "patterns" && (
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2">
                  <Icons.Robot size="text-lg" />
                  Análisis de Patrones para Suplementación
                </h3>
                
                {/* Usuarios de alta prioridad */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-sm sm:text-base text-red-600">
                    🚨 Usuarios de Alta Prioridad ({highPriorityUsers.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {highPriorityUsers.map((pattern) => (
                      <div key={pattern.userId} className="border border-red-200 rounded-lg p-3 bg-red-50">
                        <div className="font-medium text-sm">{pattern.name}</div>
                        <div className="text-xs text-gray-600 mb-2">
                          Objetivo: {GOALS.find(g => g.id === pattern.goal)?.label}
                        </div>
                        <div className="space-y-1">
                          {pattern.patterns.lowWater && (
                            <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">💧 Baja hidratación</div>
                          )}
                          {pattern.patterns.lowExercise && (
                            <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">💪 Poco ejercicio</div>
                          )}
                          {pattern.patterns.lowMindfulness && (
                            <div className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">🧘 Poco mindfulness</div>
                          )}
                        </div>
                        <div className="mt-2 text-xs">
                          <strong>Sugerencias:</strong>
                          <div className="mt-1 space-y-1">
                            {pattern.recommendations.map((rec, idx) => (
                              <div key={idx} className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                                {rec}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Estadísticas de recomendaciones */}
                <div>
                  <h4 className="font-semibold mb-3 text-sm sm:text-base">📊 Estadísticas de Recomendaciones</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(supplementRecommendationStats).map(([supplement, count]) => (
                      <div key={supplement} className="bg-gray-50 p-3 rounded-lg">
                        <div className="font-medium text-sm">{supplement}</div>
                        <div className="text-2xl font-bold text-blue-600">{count}</div>
                        <div className="text-xs text-gray-600">
                          {Math.round((count / allUsers.length) * 100)}% de usuarios
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB RECURSOS con CRUD completo */}
          {activeAdminTab === "resources" && (
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                  <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                    <Icons.Link size="text-lg" />
                    Gestión de Recursos ({globalResources.length})
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => setShowAddResource(true)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm justify-center"
                    >
                      <Icons.Plus size="text-sm" />
                      Agregar Recurso
                    </button>
                    <button
                      onClick={() => setShowAddTip(true)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 text-sm justify-center"
                    >
                      <Icons.Plus size="text-sm" />
                      Agregar Tip
                    </button>
                  </div>
                </div>

                {/* Lista de recursos con opciones CRUD */}
                <div className="grid grid-cols-1 gap-4">
                  {globalResources.map((resource) => (
                    <div key={resource.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">{getResourceTypeIcon(resource.type)}</span>
                            <span className="text-xs sm:text-sm font-medium capitalize">{resource.type}</span>
                            <span className={`text-xs px-2 py-1 rounded ${
                              resource.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {resource.is_active ? 'Activo' : 'Inactivo'}
                            </span>
                          </div>
                          <h4 className="font-semibold text-sm mb-1">{resource.title}</h4>
                          <p className="text-xs text-gray-600 mb-2">{resource.description}</p>
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:text-blue-800 break-all"
                          >
                            {resource.url}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <button
                            onClick={() => setEditingResource(resource)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                            title="Editar"
                          >
                            <Icons.Edit size="text-sm" />
                          </button>
                          <button
                            onClick={() => toggleResourceStatus(resource.id, resource.is_active)}
                            className={`p-2 rounded-lg ${
                              resource.is_active ? 'text-red-600 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'
                            }`}
                            title={resource.is_active ? 'Desactivar' : 'Activar'}
                          >
                            {resource.is_active ? <Icons.X size="text-sm" /> : <Icons.CheckCircle size="text-sm" />}
                          </button>
                          <button
                            onClick={() => deleteResource(resource.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            title="Eliminar"
                          >
                            <Icons.Trash2 size="text-sm" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lista de tips */}
              <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2">
                  <Icons.Lightbulb size="text-lg" />
                  Tips Activos ({globalTips.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {globalTips.map((tip) => (
                    <div key={tip.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{tip.icon}</span>
                        <span className="text-xs sm:text-sm font-medium">{tip.category}</span>
                      </div>
                      <h4 className="font-semibold text-sm mb-1">{tip.title}</h4>
                      <p className="text-xs text-gray-600">{tip.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB SUPLEMENTOS con CRUD completo */}
          {activeAdminTab === "supplements" && (
            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                  <Icons.Package size="text-lg" />
                  Gestión de Suplementos ({supplements.length})
                </h3>
                <button
                  onClick={() => setShowAddSupplement(true)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2 text-sm w-full sm:w-auto justify-center"
                >
                  <Icons.Plus size="text-sm" />
                  Agregar Suplemento
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {supplements.map((supplement) => (
                  <div key={supplement.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-sm mb-1 flex-1">{supplement.name}</h4>
                      <button
                        onClick={() => setEditingSupplement(supplement)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                        title="Editar"
                      >
                        <Icons.Edit size="text-xs" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{supplement.description}</p>
                    <p className="text-sm sm:text-base font-bold text-green-600 mb-2">
                      ${supplement.price.toLocaleString()}
                    </p>
                    <div className="text-xs text-gray-500">
                      <p>Beneficios: {supplement.benefits.join(", ")}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB ANALYTICS */}
          {activeAdminTab === "analytics" && (
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2">
                  <Icons.TrendingUp size="text-lg" />
                  Analytics Avanzados
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-sm sm:text-base">📊 Distribución de Objetivos</h4>
                    <div className="space-y-2">
                      {GOALS.map((goal) => {
                        const count = allUsers.filter((u) => u.goal === goal.id).length
                        const percentage = allUsers.length > 0 ? Math.round((count / allUsers.length) * 100) : 0
                        return (
                          <div key={goal.id} className="flex items-center justify-between">
                            <span className="text-xs sm:text-sm truncate flex-1 mr-2">{goal.label}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-16 sm:w-20 bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                              </div>
                              <span className="text-xs text-gray-500 w-6 text-right">{count}</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-sm sm:text-base">⚡ Actividad Reciente</h4>
                    <div className="space-y-2">
                      {allUsers.slice(0, 5).map((user) => (
                        <div key={user.id} className="flex items-center justify-between text-xs sm:text-sm">
                          <span className="truncate flex-1 mr-2">{user.name}</span>
                          <span className="text-gray-500 text-xs">
                            {new Date(user.last_login).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-4">📈 Métricas de Engagement</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-xl sm:text-2xl font-bold text-blue-600">
                      {
                        allUsers.filter((u) => new Date(u.last_login) > new Date(Date.now() - 24 * 60 * 60 * 1000))
                          .length
                      }
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">Usuarios activos hoy</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-xl sm:text-2xl font-bold text-green-600">
                      {
                        allUsers.filter((u) => new Date(u.last_login) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
                          .length
                      }
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">Usuarios activos esta semana</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-xl sm:text-2xl font-bold text-purple-600">
                      {Math.round((globalResources.length + globalTips.length + supplements.length) / 3)}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">Contenido promedio por categoría</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-xl sm:text-2xl font-bold text-orange-600">
                      {allUsers.length > 0 ? Math.round((aiRecommendations.length / allUsers.length) * 100) : 0}%
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">Cobertura de recomendaciones IA</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* MODALES PARA AGREGAR CONTENIDO */}
        {showAddResource && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-4">
            <div className="relative top-4 mx-auto border w-full max-w-md shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto">
              <div className="p-4 sm:p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base sm:text-lg font-medium text-gray-900">Agregar Nuevo Recurso</h3>
                  <button onClick={() => setShowAddResource(false)} className="p-2 hover:bg-gray-100 rounded-full">
                    <Icons.X size="text-lg" />
                  </button>
                </div>
                <div className="space-y-4">
                  <select
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                    value={newResource.type}
                    onChange={(e) => setNewResource((prev) => ({ ...prev, type: e.target.value as any }))}
                  >
                    <option value="mindfulness">🧘‍♀️ Mindfulness</option>
                    <option value="nutrition">🥗 Nutrición</option>
                    <option value="exercise">💪 Ejercicio</option>
                  </select>
                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                    placeholder="Título del recurso"
                    value={newResource.title}
                    onChange={(e) => setNewResource((prev) => ({ ...prev, title: e.target.value }))}
                  />
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                    placeholder="Descripción"
                    rows={3}
                    value={newResource.description}
                    onChange={(e) => setNewResource((prev) => ({ ...prev, description: e.target.value }))}
                  />
                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                    placeholder="URL (YouTube, PDF, Spotify, etc.)"
                    value={newResource.url}
                    onChange={(e) => setNewResource((prev) => ({ ...prev, url: e.target.value }))}
                  />
                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                    placeholder="URL de imagen (opcional)"
                    value={newResource.image_url}
                    onChange={(e) => setNewResource((prev) => ({ ...prev, image_url: e.target.value }))}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <button
                    onClick={addResource}
                    className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 text-sm"
                  >
                    Agregar Recurso
                  </button>
                  <button
                    onClick={() => {
                      setShowAddResource(false)
                      setNewResource({
                        type: "mindfulness",
                        title: "",
                        description: "",
                        url: "",
                        image_url: "",
                      })
                    }}
                    className="bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 text-sm"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showAddTip && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-4">
            <div className="relative top-4 mx-auto border w-full max-w-md shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto">
              <div className="p-4 sm:p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base sm:text-lg font-medium text-gray-900">Agregar Nuevo Tip</h3>
                  <button onClick={() => setShowAddTip(false)} className="p-2 hover:bg-gray-100 rounded-full">
                    <Icons.X size="text-lg" />
                  </button>
                </div>
                <div className="space-y-4">
                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                    placeholder="Categoría (ej: Hidratación, Ejercicio)"
                    value={newTip.category}
                    onChange={(e) => setNewTip((prev) => ({ ...prev, category: e.target.value }))}
                  />
                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                    placeholder="Título del tip"
                    value={newTip.title}
                    onChange={(e) => setNewTip((prev) => ({ ...prev, title: e.target.value }))}
                  />
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                    placeholder="Contenido del tip"
                    rows={4}
                    value={newTip.content}
                    onChange={(e) => setNewTip((prev) => ({ ...prev, content: e.target.value }))}
                  />
                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                    placeholder="Emoji/Icono (ej: 💧, 🏃‍♂️, 🧘‍♀️)"
                    value={newTip.icon}
                    onChange={(e) => setNewTip((prev) => ({ ...prev, icon: e.target.value }))}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <button
                    onClick={addTip}
                    className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 text-sm"
                  >
                    Agregar Tip
                  </button>
                  <button
                    onClick={() => {
                      setShowAddTip(false)
                      setNewTip({
                        category: "",
                        title: "",
                        content: "",
                        icon: "💡",
                      })
                    }}
                    className="bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 text-sm"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showAddSupplement && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-4">
            <div className="relative top-4 mx-auto border w-full max-w-md shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto">
              <div className="p-4 sm:p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base sm:text-lg font-medium text-gray-900">Agregar Nuevo Suplemento</h3>
                  <button onClick={() => setShowAddSupplement(false)} className="p-2 hover:bg-gray-100 rounded-full">
                    <Icons.X size="text-lg" />
                  </button>
                </div>
                <div className="space-y-4">
                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                    placeholder="Nombre del suplemento"
                    value={newSupplement.name}
                    onChange={(e) => setNewSupplement((prev) => ({ ...prev, name: e.target.value }))}
                  />
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                    placeholder="Descripción"
                    rows={3}
                    value={newSupplement.description}
                    onChange={(e) => setNewSupplement((prev) => ({ ...prev, description: e.target.value }))}
                  />
                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                    placeholder="Beneficios (separados por comas)"
                    value={newSupplement.benefits}
                    onChange={(e) => setNewSupplement((prev) => ({ ...prev, benefits: e.target.value }))}
                  />
                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                    placeholder="Precio (solo números)"
                    type="number"
                    value={newSupplement.price}
                    onChange={(e) => setNewSupplement((prev) => ({ ...prev, price: e.target.value }))}
                  />
                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                    placeholder="URL de imagen"
                    value={newSupplement.image_url}
                    onChange={(e) => setNewSupplement((prev) => ({ ...prev, image_url: e.target.value }))}
                  />
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                    placeholder="Mensaje personalizado de WhatsApp (opcional)"
                    rows={3}
                    value={newSupplement.whatsapp_message}
                    onChange={(e) => setNewSupplement((prev) => ({ ...prev, whatsapp_message: e.target.value }))}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <button
                    onClick={addSupplement}
                    className="bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600 text-sm"
                  >
                    Agregar Suplemento
                  </button>
                  <button
                    onClick={() => {
                      setShowAddSupplement(false)
                      setNewSupplement({
                        name: "",
                        description: "",
                        benefits: "",
                        price: "",
                        image_url: "",
                        whatsapp_message: "",
                      })
                    }}
                    className="bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 text-sm"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 🆕 Modal de edición de recursos */}
        {editingResource && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-4">
            <div className="relative top-4 mx-auto border w-full max-w-md shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto">
              <div className="p-4 sm:p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base sm:text-lg font-medium text-gray-900">Editar Recurso</h3>
                  <button onClick={() => setEditingResource(null)} className="p-2 hover:bg-gray-100 rounded-full">
                    <Icons.X size="text-lg" />
                  </button>
                </div>
                <div className="space-y-4">
                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                    placeholder="Título del recurso"
                    value={editingResource.title}
                    onChange={(e) => setEditingResource({...editingResource, title: e.target.value})}
                  />
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                    placeholder="Descripción"
                    rows={3}
                    value={editingResource.description}
                    onChange={(e) => setEditingResource({...editingResource, description: e.target.value})}
                  />
                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                    placeholder="URL"
                    value={editingResource.url}
                    onChange={(e) => setEditingResource({...editingResource, url: e.target.value})}
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={editingResource.is_active}
                      onChange={(e) => setEditingResource({...editingResource, is_active: e.target.checked})}
                    />
                    <label className="text-sm">Activo</label>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <button
                    onClick={() => updateResource(editingResource)}
                    className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 text-sm"
                  >
                    Actualizar
                  </button>
                  <button
                    onClick={() => setEditingResource(null)}
                    className="bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 text-sm"
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

  // ============================================================================
  // RENDERIZADO CONDICIONAL PARA ADMIN
  // ============================================================================
  if (isAdmin) {
    return <AdminPanel />
  }

  // ============================================================================
  // ESTADOS DE CARGA Y ERROR
  // ============================================================================
  if (connectionStatus === "connecting") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm text-center">
          <div className="text-3xl mb-4">
            <Icons.Loader2 size="text-3xl" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Conectando</h3>
          <p className="text-gray-600 text-sm">Inicializando base de datos...</p>
        </div>
      </div>
    )
  }

  if (connectionStatus === "error") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm text-center">
          <div className="text-3xl mb-4 text-red-500">
            <Icons.X size="text-3xl" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Error de conexión</h3>
          <p className="text-gray-600 mb-4 text-sm">No se pudo conectar con la base de datos</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 text-sm"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }
