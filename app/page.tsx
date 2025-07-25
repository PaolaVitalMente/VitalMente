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
  ChevronDown: ({ size = "text-xl" }: { size?: string }) => <span className={size}>⬇️</span>,
  ChevronUp: ({ size = "text-xl" }: { size?: string }) => <span className={size}>⬆️</span>,
  Info: ({ size = "text-xl" }: { size?: string }) => <span className={size}>ℹ️</span>,
  HelpCircle: ({ size = "text-xl" }: { size?: string }) => <span className={size}>❓</span>,
  Blend: ({ size = "text-xl" }: { size?: string }) => <span className={size}>🥤</span>,
  Book: ({ size = "text-xl" }: { size?: string }) => <span className={size}>📚</span>,
  Heart: ({ size = "text-xl" }: { size?: string }) => <span className={size}>❤️</span>,
  Bookmark: ({ size = "text-xl" }: { size?: string }) => <span className={size}>🔖</span>,
  Profile: ({ size = "text-xl" }: { size?: string }) => <span className={size}>👤</span>,
}

// ============================================================================
// CONFIGURACIÓN DE SUPABASE
// ============================================================================
const SUPABASE_URL = "https://frzyksfceugddjrerxkf.supabase.co"
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyenlrc2ZjZXVnZGRqcmVyeGtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3MzgwMTUsImV4cCI6MjA2NzMxNDAxNX0.E6ZjfC6RJoA98RkDK-I87k2l3d7naK9C-mEC0alH7L8"

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// ============================================================================
// TIPOS DE DATOS
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

interface Recipe {
  id: string
  name: string
  description: string
  category: string
  ingredients: RecipeIngredient[]
  total_calories: number
  total_protein: number
  total_carbs: number
  total_fats: number
  serving_size: number
  instructions?: string
  user_id?: string
  is_active: boolean
  created_at: string
}

interface RecipeIngredient {
  food_id: string
  food_name: string
  quantity_grams: number
  calories: number
  protein: number
  carbs: number
  fats: number
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

interface Supplement {
  id: string
  name: string
  description: string
  price: number
  category: string
  benefits: string[]
  image_url?: string
  is_active: boolean
}

interface Exercise {
  id: string
  name: string
  category: string
  description: string
  duration_minutes: number
  calories_burned: number
  difficulty: "beginner" | "intermediate" | "advanced"
  instructions: string[]
  equipment_needed: string[]
}

interface Resource {
  id: string
  title: string
  type: "article" | "video" | "audio" | "guide"
  category: string
  content: string
  url?: string
  duration_minutes?: number
  author: string
  is_premium: boolean
}

// ============================================================================
// CONFIGURACIÓN DE DATOS
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
  },
  {
    id: "gain_muscle",
    label: "🏋️ Ganar músculo y fuerza",
    protein: 30,
    carbs: 40,
    fats: 30,
    calAdjust: 0.15,
    type: "physical",
  },
  {
    id: "maintain_weight",
    label: "⚖️ Mantener mi peso actual",
    protein: 25,
    carbs: 45,
    fats: 30,
    calAdjust: 0,
    type: "physical",
  },
  {
    id: "reduce_stress",
    label: "🧘 Reducir estrés y ansiedad",
    protein: 25,
    carbs: 45,
    fats: 30,
    calAdjust: 0,
    type: "emotional",
  },
  {
    id: "find_calm",
    label: "☮️ Encontrar calma interior",
    protein: 25,
    carbs: 45,
    fats: 30,
    calAdjust: 0,
    type: "emotional",
  },
  {
    id: "vitalmente",
    label: "🌟 Sentirme VitalMente",
    protein: 25,
    carbs: 45,
    fats: 30,
    calAdjust: 0,
    type: "holistic",
  },
]

const FOOD_CATEGORIES = [
  { id: "proteinas", name: "Proteínas", icon: "🍗", description: "Carnes, pescados, huevos, legumbres" },
  { id: "vegetales", name: "Vegetales", icon: "🥬", description: "Verduras frescas y cocidas" },
  { id: "frutas", name: "Frutas", icon: "🍎", description: "Frutas frescas y deshidratadas" },
  { id: "carbohidratos", name: "Carbohidratos", icon: "🌾", description: "Cereales, tubérculos, granos" },
  { id: "bebidas", name: "Bebidas", icon: "🥤", description: "Jugos, batidos, infusiones" },
  { id: "lacteos", name: "Lácteos", icon: "🥛", description: "Leche, yogurt, quesos" },
  { id: "grasas", name: "Grasas Saludables", icon: "🥑", description: "Aceites, frutos secos, semillas" },
]

const ADMIN_MODULES = [
  { id: "dashboard", name: "Dashboard", icon: <Icons.Chart size="text-xl" />, description: "Vista general" },
  { id: "users", name: "Usuarios", icon: <Icons.Users size="text-xl" />, description: "Gestión de usuarios" },
  { id: "foods", name: "Alimentos", icon: <Icons.UtensilsCrossed size="text-xl" />, description: "Banco de alimentos" },
  { id: "recipes", name: "Recetas", icon: <Icons.ChefHat size="text-xl" />, description: "Recetas globales" },
  {
    id: "exercises",
    name: "Ejercicios",
    icon: <Icons.Dumbbell size="text-xl" />,
    description: "Biblioteca de ejercicios",
  },
  {
    id: "supplements",
    name: "Suplementos",
    icon: <Icons.Package size="text-xl" />,
    description: "Catálogo de productos",
  },
  { id: "resources", name: "Recursos", icon: <Icons.Book size="text-xl" />, description: "Contenido educativo" },
  {
    id: "analytics",
    name: "Analíticas",
    icon: <Icons.TrendingUp size="text-xl" />,
    description: "Estadísticas y reportes",
  },
  { id: "ai", name: "IA", icon: <Icons.Robot size="text-xl" />, description: "Herramientas de IA" },
]

// NUEVOS MÓDULOS PARA USUARIOS CON NAVEGACIÓN MÓVIL
const USER_MODULES = [
  { id: "inicio", name: "Inicio", icon: <Icons.Home size="text-xl" />, description: "Panel principal" },
  {
    id: "comida",
    name: "Comida",
    icon: <Icons.UtensilsCrossed size="text-xl" />,
    description: "Registro de alimentos",
  },
  { id: "batidos", name: "Batidos", icon: <Icons.Blend size="text-xl" />, description: "Crea tus batidos" },
  { id: "ejercicio", name: "Ejercicio", icon: <Icons.Activity size="text-xl" />, description: "Rutinas y seguimiento" },
  { id: "recursos", name: "Recursos", icon: <Icons.Book size="text-xl" />, description: "Material educativo" },
  { id: "suplementos", name: "Tienda", icon: <Icons.Package size="text-xl" />, description: "Suplementos y productos" },
  { id: "perfil", name: "Perfil", icon: <Icons.Profile size="text-xl" />, description: "Tu información" },
]

// Datos de ejemplo para suplementos
const SAMPLE_SUPPLEMENTS: Supplement[] = [
  {
    id: "1",
    name: "Proteína Whey Premium",
    description: "Proteína de suero de alta calidad para desarrollo muscular",
    price: 89900,
    category: "proteinas",
    benefits: ["Desarrollo muscular", "Recuperación post-entreno", "Alto valor biológico"],
    is_active: true,
  },
  {
    id: "2",
    name: "Omega-3 Ultra",
    description: "Ácidos grasos esenciales para salud cardiovascular",
    price: 45900,
    category: "salud",
    benefits: ["Salud cardiovascular", "Función cerebral", "Antiinflamatorio"],
    is_active: true,
  },
  {
    id: "3",
    name: "Multivitamínico Completo",
    description: "Complejo vitamínico y mineral para bienestar general",
    price: 32900,
    category: "vitaminas",
    benefits: ["Energía", "Sistema inmune", "Bienestar general"],
    is_active: true,
  },
]

// Datos de ejemplo para ejercicios
const SAMPLE_EXERCISES: Exercise[] = [
  {
    id: "1",
    name: "Rutina HIIT Principiante",
    category: "cardio",
    description: "Entrenamiento de alta intensidad para quemar grasa",
    duration_minutes: 20,
    calories_burned: 200,
    difficulty: "beginner",
    instructions: ["Calentamiento 3 min", "4 rondas de 30s trabajo / 30s descanso", "Enfriamiento 3 min"],
    equipment_needed: ["Ninguno"],
  },
  {
    id: "2",
    name: "Yoga Matutino",
    category: "flexibilidad",
    description: "Secuencia suave para empezar el día",
    duration_minutes: 15,
    calories_burned: 60,
    difficulty: "beginner",
    instructions: ["Respiración consciente", "Saludos al sol", "Posturas de estiramiento"],
    equipment_needed: ["Mat de yoga"],
  },
]

// Datos de ejemplo para recursos
const SAMPLE_RESOURCES: Resource[] = [
  {
    id: "1",
    title: "Guía de Alimentación Consciente",
    type: "guide",
    category: "nutricion",
    content: "Aprende a desarrollar una relación saludable con la comida...",
    duration_minutes: 30,
    author: "Dr. VitalMente",
    is_premium: false,
  },
  {
    id: "2",
    title: "Meditación para Reducir Estrés",
    type: "audio",
    category: "mindfulness",
    content: "Sesión guiada de 10 minutos para calmar la mente...",
    duration_minutes: 10,
    author: "Maestra Zen",
    is_premium: true,
  },
]

// ============================================================================
// FUNCIONES DE BASE DE DATOS
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
          },
          {
            onConflict: "user_id,date",
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

  async getRecipes(): Promise<Recipe[]> {
    try {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .eq("is_active", true)
        .order("name", { ascending: true })
      if (error) {
        console.log("Recipes table doesn't exist yet")
        return []
      }
      return data as Recipe[]
    } catch (error) {
      console.log("Recipes not available:", error)
      return []
    }
  },

  async getUserRecipes(userId: string): Promise<Recipe[]> {
    try {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .eq("user_id", userId)
        .eq("is_active", true)
        .order("created_at", { ascending: false })

      if (error) {
        console.log("User recipes not available")
        return []
      }
      return data as Recipe[]
    } catch (error) {
      console.log("User recipes not available:", error)
      return []
    }
  },

  async addRecipe(recipe: Omit<Recipe, "id" | "created_at">): Promise<Recipe> {
    try {
      const { data, error } = await supabase
        .from("recipes")
        .insert({
          ...recipe,
          created_at: new Date().toISOString(),
        })
        .select()
        .single()
      if (error) throw new Error(error.message)
      return data as Recipe
    } catch (error) {
      console.error("Error adding recipe:", error)
      throw new Error("Error al guardar receta")
    }
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

  // FUNCIONES DE ADMINISTRADOR
  async getAllUsers(): Promise<UserProfile[]> {
    try {
      const { data, error } = await supabase.from("users").select("*").order("created_at", { ascending: false })
      if (error) throw error
      return data as UserProfile[]
    } catch (error) {
      console.error("Error loading users:", error)
      return []
    }
  },

  async addGlobalFood(food: Omit<GlobalFood, "id" | "created_at">): Promise<GlobalFood> {
    try {
      const { data, error } = await supabase
        .from("global_foods")
        .insert({
          ...food,
          created_at: new Date().toISOString(),
        })
        .select()
        .single()
      if (error) throw error
      return data as GlobalFood
    } catch (error) {
      console.error("Error adding global food:", error)
      throw error
    }
  },

  async updateGlobalFood(id: string, updates: Partial<GlobalFood>): Promise<void> {
    try {
      const { error } = await supabase.from("global_foods").update(updates).eq("id", id)
      if (error) throw error
    } catch (error) {
      console.error("Error updating global food:", error)
      throw error
    }
  },

  async deleteGlobalFood(id: string): Promise<void> {
    try {
      const { error } = await supabase.from("global_foods").update({ is_active: false }).eq("id", id)
      if (error) throw error
    } catch (error) {
      console.error("Error deleting global food:", error)
      throw error
    }
  },

  async getUserStats(): Promise<any> {
    try {
      const { data: users } = await supabase.from("users").select("*")
      const { data: progress } = await supabase.from("daily_progress").select("*")
      const { data: meals } = await supabase.from("meal_compositions").select("*")

      return {
        totalUsers: users?.length || 0,
        activeToday: progress?.filter((p) => p.date === new Date().toISOString().split("T")[0]).length || 0,
        totalMeals: meals?.length || 0,
        avgCalories: meals?.reduce((acc, m) => acc + m.calories_consumed, 0) / (meals?.length || 1) || 0,
      }
    } catch (error) {
      console.error("Error getting user stats:", error)
      return { totalUsers: 0, activeToday: 0, totalMeals: 0, avgCalories: 0 }
    }
  },
}

// ============================================================================
// FUNCIONES AUXILIARES
// ============================================================================
const calculateMacros = (userData: UserProfile): MacroResult => {
  const bmr = 10 * userData.weight + 6.25 * userData.height - 5 * userData.age + 5
  const tdee = bmr * userData.activity_level
  const goalData = GOALS.find((g) => g.id === userData.goal) || GOALS[3]
  const calories = Math.round(tdee * (1 + goalData.calAdjust))

  return {
    calories,
    protein: Math.round((calories * goalData.protein) / 100 / 4),
    carbs: Math.round((calories * goalData.carbs) / 100 / 4),
    fats: Math.round((calories * goalData.fats) / 100 / 9),
    goalType: goalData.type,
    goalLabel: goalData.label,
  }
}

const getProgressPercentage = (progress: DailyProgress) => {
  const targets = { water: 8, exercise: 1, mindfulness: 1, desayuno: 1, almuerzo: 1, cena: 1 }
  let completed = 0
  Object.entries(targets).forEach(([key, target]) => {
    if (Number(progress[key as keyof DailyProgress]) >= target) completed++
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
    vitalmente: "¡Eres la mejor versión de ti mismo! 🌟 #VitalMente",
  }
  return messages[goal] || messages.reduce_stress
}

// Función para detectar acceso de administrador (ACCESO OCULTO RESTAURADO)
const isAdminAccess = (phone: string, code: string): boolean => {
  return phone === "3001234567" && code === "1234567890"
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================
export default function VitalMenteApp() {
  // Estados principales
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("inicio")
  const [macroResults, setMacroResults] = useState<MacroResult | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)

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
  const [globalFoods, setGlobalFoods] = useState<GlobalFood[]>([])
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [userRecipes, setUserRecipes] = useState<Recipe[]>([])
  const [mealCompositions, setMealCompositions] = useState<MealComposition[]>([])
  const [consumedMacros, setConsumedMacros] = useState<ConsumedMacros>({
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
  })

  // Estados de UI móvil (NUEVOS)
  const [showMealCalculator, setShowMealCalculator] = useState(false)
  const [selectedMealType, setSelectedMealType] = useState<"desayuno" | "almuerzo" | "cena">("desayuno")
  const [selectedFood, setSelectedFood] = useState<GlobalFood | Recipe | null>(null)
  const [foodQuantity, setFoodQuantity] = useState<string>("100")
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  // Estados para creador de batidos (NUEVO)
  const [showRecipeCreator, setShowRecipeCreator] = useState(false)
  const [recipeIngredients, setRecipeIngredients] = useState<RecipeIngredient[]>([])
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    description: "",
    category: "batidos",
    instructions: "",
    serving_size: 1,
  })

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

  // Estados para acceso oculto de administrador (NUEVO)
  const [logoClicks, setLogoClicks] = useState(0)
  const [showAdminAccess, setShowAdminAccess] = useState(false)
  const [adminCode, setAdminCode] = useState("")

  // Estados de administrador (RESTAURADOS)
  const [allUsers, setAllUsers] = useState<UserProfile[]>([])
  const [userStats, setUserStats] = useState<any>({})
  const [showAddFoodModal, setShowAddFoodModal] = useState(false)
  const [showAddRecipeModal, setShowAddRecipeModal] = useState(false)
  const [showAddSupplementModal, setShowAddSupplementModal] = useState(false)
  const [showAddExerciseModal, setShowAddExerciseModal] = useState(false)
  const [showAddResourceModal, setShowAddResourceModal] = useState(false)
  const [newFood, setNewFood] = useState({
    name: "",
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
    category: "proteinas",
    common_portion_size: "",
    common_portion_name: "",
  })

  // Estados para datos de ejemplo (RESTAURADOS)
  const [supplements] = useState<Supplement[]>(SAMPLE_SUPPLEMENTS)
  const [exercises] = useState<Exercise[]>(SAMPLE_EXERCISES)
  const [resources] = useState<Resource[]>(SAMPLE_RESOURCES)

  // Estados para IA y analíticas (RESTAURADOS)
  const [aiQuery, setAiQuery] = useState("")
  const [aiResponse, setAiResponse] = useState("")
  const [isAiLoading, setIsAiLoading] = useState(false)

  // ============================================================================
  // EFECTOS Y INICIALIZACIÓN
  // ============================================================================
  useEffect(() => {
    loadGlobalContent()
  }, [])

  useEffect(() => {
    if (currentUser && currentUser.id) {
      loadUserData(currentUser.id)
      setMacroResults(calculateMacros(currentUser))

      // Si es admin, cargar datos de admin
      if (isAdmin) {
        loadAdminData()
      }
    }
  }, [currentUser, isAdmin])

  const loadGlobalContent = async () => {
    try {
      const [globalFoodsList, recipesList] = await Promise.all([dbFunctions.getGlobalFoods(), dbFunctions.getRecipes()])

      setGlobalFoods(globalFoodsList)
      setRecipes(recipesList)
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

      const [compositions, userRecipesList] = await Promise.all([
        dbFunctions.getTodayMealCompositions(userId),
        dbFunctions.getUserRecipes(userId),
      ])

      setMealCompositions(compositions)
      calculateConsumedMacros(compositions)
      setUserRecipes(userRecipesList)
    } catch (error) {
      console.error("Error loading user data:", error)
    }
  }

  const loadAdminData = async () => {
    try {
      const [users, stats] = await Promise.all([dbFunctions.getAllUsers(), dbFunctions.getUserStats()])
      setAllUsers(users)
      setUserStats(stats)
    } catch (error) {
      console.error("Error loading admin data:", error)
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

  // ============================================================================
  // FUNCIONES PARA ACCESO OCULTO DE ADMINISTRADOR (NUEVO)
  // ============================================================================
  const handleLogoClick = () => {
    const newClicks = logoClicks + 1
    setLogoClicks(newClicks)
    
    if (newClicks === 5) {
      setShowAdminAccess(true)
      setTimeout(() => {
        setLogoClicks(0)
        if (!showAdminAccess) {
          setShowAdminAccess(false)
          setAdminCode("")
        }
      }, 30000) // 30 segundos para ingresar el código
    } else if (newClicks > 5) {
      setLogoClicks(0)
    }
  }

  const handleAdminAccess = () => {
    if (adminCode === "1098648820") {
      setIsAdmin(true)
      setCurrentUser({
        id: "admin",
        phone: "admin-secret",
        access_code: adminCode,
        name: "Administrador VitalMente",
        age: 30,
        weight: 70,
        height: 170,
        activity_level: 1.55,
        goal: "vitalmente",
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString(),
      })
      setActiveTab("dashboard")
      setShowAdminAccess(false)
      setAdminCode("")
      setLogoClicks(0)
    } else {
      alert("Código incorrecto")
      setAdminCode("")
    }
  }

  // ============================================================================
  // FUNCIONES DE AUTENTICACIÓN (RESTAURADAS CON ACCESO ADMIN)
  // ============================================================================
  const handleLogin = async () => {
    if (!loginForm.phone || !loginForm.accessCode) {
      alert("Por favor completa todos los campos")
      return
    }
    setIsLoading(true)
    try {
      // Verificar acceso de administrador (ACCESO OCULTO RESTAURADO)
      if (isAdminAccess(loginForm.phone, loginForm.accessCode)) {
        setIsAdmin(true)
        setCurrentUser({
          id: "admin",
          phone: loginForm.phone,
          access_code: loginForm.accessCode,
          name: "Administrador VitalMente",
          age: 30,
          weight: 70,
          height: 170,
          activity_level: 1.55,
          goal: "vitalmente",
          created_at: new Date().toISOString(),
          last_login: new Date().toISOString(),
        })
        setActiveTab("dashboard")
        setLoginForm({ phone: "", accessCode: "" })
        return
      }

      const user = await dbFunctions.findUserByPhone(loginForm.phone)
      if (!user || user.access_code !== loginForm.accessCode) {
        alert("Número o código incorrecto")
        return
      }
      await dbFunctions.updateUserLastLogin(user.id)
      setCurrentUser(user)
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
    setIsAdmin(false)
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
    setMacroResults(null)
    setActiveTab("inicio")
    setMealCompositions([])
    setConsumedMacros({ calories: 0, protein: 0, carbs: 0, fats: 0 })
    setUserRecipes([])
    setAllUsers([])
    setUserStats({})
  }

  // ============================================================================
  // FUNCIONES DE PROGRESO
  // ============================================================================
  const updateProgress = async (field: keyof DailyProgress, increment: number) => {
    if (!currentUser) return
    const newProgress = {
      ...dailyProgress,
      [field]: Math.max(0, (dailyProgress as any)[field] + increment),
    }
    setDailyProgress(newProgress)
    try {
      await dbFunctions.saveProgress(currentUser.id, {
        water: newProgress.water,
        exercise: newProgress.exercise,
        mindfulness: newProgress.mindfulness,
        desayuno: newProgress.desayuno,
        almuerzo: newProgress.almuerzo,
        cena: newProgress.cena,
      })
    } catch (error) {
      console.error("Error guardando progreso:", error)
      setDailyProgress(dailyProgress)
      alert("Error al guardar progreso. Por favor intenta de nuevo.")
    }
  }

  // ============================================================================
  // FUNCIONES PARA BATIDOS Y RECETAS (NUEVAS)
  // ============================================================================
  const addIngredientToRecipe = (food: GlobalFood) => {
    const quantity = 50
    const ratio = quantity / 100
    const ingredient: RecipeIngredient = {
      food_id: food.id,
      food_name: food.name,
      quantity_grams: quantity,
      calories: Math.round(food.calories * ratio),
      protein: Math.round(food.protein * ratio),
      carbs: Math.round(food.carbs * ratio),
      fats: Math.round(food.fats * ratio),
    }
    setRecipeIngredients([...recipeIngredients, ingredient])
  }

  const removeIngredientFromRecipe = (index: number) => {
    setRecipeIngredients(recipeIngredients.filter((_, i) => i !== index))
  }

  const updateIngredientQuantity = (index: number, newQuantity: number) => {
    const updatedIngredients = [...recipeIngredients]
    const ingredient = updatedIngredients[index]
    const food = globalFoods.find((f) => f.id === ingredient.food_id)
    if (food) {
      const ratio = newQuantity / 100
      updatedIngredients[index] = {
        ...ingredient,
        quantity_grams: newQuantity,
        calories: Math.round(food.calories * ratio),
        protein: Math.round(food.protein * ratio),
        carbs: Math.round(food.carbs * ratio),
        fats: Math.round(food.fats * ratio),
      }
      setRecipeIngredients(updatedIngredients)
    }
  }

  const calculateRecipeTotals = () => {
    return recipeIngredients.reduce(
      (totals, ingredient) => ({
        calories: totals.calories + ingredient.calories,
        protein: totals.protein + ingredient.protein,
        carbs: totals.carbs + ingredient.carbs,
        fats: totals.fats + ingredient.fats,
      }),
      { calories: 0, protein: 0, carbs: 0, fats: 0 },
    )
  }

  const saveRecipe = async () => {
    if (!currentUser) return
    if (!newRecipe.name || recipeIngredients.length === 0) {
      alert("Por favor completa el nombre y agrega al menos un ingrediente")
      return
    }

    try {
      const totals = calculateRecipeTotals()
      const recipe: Omit<Recipe, "id" | "created_at"> = {
        name: newRecipe.name,
        description: newRecipe.description,
        category: newRecipe.category,
        ingredients: recipeIngredients,
        total_calories: totals.calories,
        total_protein: totals.protein,
        total_carbs: totals.carbs,
        total_fats: totals.fats,
        serving_size: newRecipe.serving_size,
        instructions: newRecipe.instructions,
        user_id: currentUser.id,
        is_active: true,
      }

      const savedRecipe = await dbFunctions.addRecipe(recipe)
      setUserRecipes([savedRecipe, ...userRecipes])

      setNewRecipe({
        name: "",
        description: "",
        category: "batidos",
        instructions: "",
        serving_size: 1,
      })
      setRecipeIngredients([])
      setShowRecipeCreator(false)
      alert("¡Batido creado exitosamente!")
    } catch (error: any) {
      console.error("Error saving recipe:", error)
      alert("Error al guardar el batido: " + error.message)
    }
  }

  // ============================================================================
  // FUNCIONES DE COMIDA
  // ============================================================================
  const openMealCalculator = (mealType: "desayuno" | "almuerzo" | "cena") => {
    setSelectedMealType(mealType)
    setShowMealCalculator(true)
    setSelectedFood(null)
    setFoodQuantity("100")
  }

  const selectFood = (food: GlobalFood | Recipe) => {
    setSelectedFood(food)
  }

  const addFoodToMeal = async () => {
    if (!selectedFood || !currentUser || !foodQuantity) return
    try {
      const quantity = Number.parseInt(foodQuantity)
      let composition: Omit<MealComposition, "id" | "created_at">

      if ("ingredients" in selectedFood) {
        // Es una receta
        const ratio = quantity / selectedFood.serving_size
        composition = {
          user_id: currentUser.id,
          date: new Date().toISOString().split("T")[0],
          meal_type: selectedMealType,
          food_id: selectedFood.id,
          food_name: `${selectedFood.name} (Batido)`,
          quantity_grams: quantity,
          calories_consumed: Math.round(selectedFood.total_calories * ratio),
          protein_consumed: Math.round(selectedFood.total_protein * ratio),
          carbs_consumed: Math.round(selectedFood.total_carbs * ratio),
          fats_consumed: Math.round(selectedFood.total_fats * ratio),
        }
      } else {
        // Es un alimento normal
        const ratio = quantity / 100
        composition = {
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
    return FOOD_CATEGORIES.map((category) => ({
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

  // ============================================================================
  // FUNCIONES DE ADMINISTRADOR (RESTAURADAS)
  // ============================================================================
  const handleAddFood = async () => {
    if (!newFood.name || !newFood.calories || !newFood.protein || !newFood.carbs || !newFood.fats) {
      alert("Por favor completa todos los campos obligatorios")
      return
    }

    try {
      const foodData = {
        name: newFood.name,
        calories: Number(newFood.calories),
        protein: Number(newFood.protein),
        carbs: Number(newFood.carbs),
        fats: Number(newFood.fats),
        category: newFood.category,
        common_portion_size: Number(newFood.common_portion_size) || 100,
        common_portion_name: newFood.common_portion_name || "gramos",
        is_active: true,
      }

      const savedFood = await dbFunctions.addGlobalFood(foodData)
      setGlobalFoods([...globalFoods, savedFood])
      setNewFood({
        name: "",
        calories: "",
        protein: "",
        carbs: "",
        fats: "",
        category: "proteinas",
        common_portion_size: "",
        common_portion_name: "",
      })
      setShowAddFoodModal(false)
      alert("Alimento agregado exitosamente")
    } catch (error: any) {
      console.error("Error adding food:", error)
      alert("Error al agregar alimento: " + error.message)
    }
  }

  // Función de IA simulada (RESTAURADA)
  const handleAiQuery = async () => {
    if (!aiQuery.trim()) return
    setIsAiLoading(true)
    try {
      // Simulación de respuesta de IA
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const responses = [
        "Basándome en los datos de tus usuarios, recomiendo enfocar las estrategias nutricionales en proteínas magras y carbohidratos complejos.",
        "Los patrones de actividad muestran que los usuarios son más consistentes con ejercicios de 15-20 minutos.",
        "Para mejorar la retención, sugiero implementar recordatorios personalizados basados en los horarios de cada usuario.",
        "Los datos indican que los usuarios con objetivos de bienestar emocional responden mejor a contenido de mindfulness.",
      ]
      setAiResponse(responses[Math.floor(Math.random() * responses.length)])
    } catch (error) {
      setAiResponse("Error al procesar la consulta. Intenta de nuevo.")
    } finally {
      setIsAiLoading(false)
    }
  }

  // ============================================================================
  // COMPONENTES DE NAVEGACIÓN MÓVIL (NUEVOS)
  // ============================================================================
  const MobileNavigation = () => {
    if (isAdmin) return null // No mostrar navegación móvil para admin

    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-40 px-2 py-1">
        <div className="flex justify-around">
          {USER_MODULES.map((module) => (
            <button
              key={module.id}
              onClick={() => setActiveTab(module.id)}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg ${
                activeTab === module.id ? "text-green-600" : "text-gray-500"
              }`}
            >
              <div className={activeTab === module.id ? "text-xl" : "text-lg"}>{module.icon}</div>
              <span className="text-[10px] mt-1">{module.name}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  const MobileHeader = () => {
    if (isAdmin) return null // No mostrar header móvil para admin

    return (
      <div className="bg-white border-b shadow-sm">
        <div className="px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✨</span>
            <h1 className="text-lg font-bold">VitalMente</h1>
          </div>
          {currentUser && (
            <div className="flex items-center gap-3">
              <div className="text-xs text-right">
                <div className="font-medium">{currentUser.name.split(" ")[0]}</div>
                <div className="text-gray-500">{getProgressPercentage(dailyProgress)}% completado</div>
              </div>
              <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="p-2 rounded-full hover:bg-gray-100">
                <Icons.Menu size="text-xl" />
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  const MobileMenu = () => {
    if (!showMobileMenu || isAdmin) return null

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50" onClick={() => setShowMobileMenu(false)}>
        <div className="absolute right-0 top-0 bottom-0 w-64 bg-white shadow-lg" onClick={(e) => e.stopPropagation()}>
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h2 className="font-bold">Menú</h2>
              <button onClick={() => setShowMobileMenu(false)} className="p-2">
                <Icons.X size="text-lg" />
              </button>
            </div>
          </div>
          <div className="p-4">
            <div className="mb-4">
              <div className="font-medium mb-1">{currentUser?.name}</div>
              <div className="text-sm text-gray-600">{currentUser?.phone}</div>
            </div>
            <div className="space-y-2">
              {USER_MODULES.map((module) => (
                <button
                  key={module.id}
                  onClick={() => {
                    setActiveTab(module.id)
                    setShowMobileMenu(false)
                  }}
                  className={`flex items-center gap-3 w-full p-2 rounded-lg ${
                    activeTab === module.id ? "bg-green-50 text-green-600" : "hover:bg-gray-50"
                  }`}
                >
                  {module.icon}
                  <span>{module.name}</span>
                </button>
              ))}
              <div className="border-t my-2 pt-2">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full p-2 rounded-lg text-red-600 hover:bg-red-50"
                >
                  <Icons.LogOut size="text-lg" />
                  <span>Cerrar sesión</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ============================================================================
  // COMPONENTES DE MÓDULOS PRINCIPALES (USUARIOS)
  // ============================================================================
  const HomeModule = () => {
    return (
      <div className="space-y-4 sm:space-y-6">
        {/* Bienvenida personalizada */}
        <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold mb-2">¡Hola, {currentUser?.name.split(" ")[0]}!</h2>
          <p className="text-sm sm:text-base opacity-90 mb-3">{getMotivationalMessage(currentUser?.goal || "")}</p>
          <div className="flex items-center gap-2 text-xs sm:text-sm bg-white/20 p-2 rounded-lg">
            <Icons.Calendar size="text-lg" />
            <span>{new Date().toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })}</span>
          </div>
        </div>

        {/* Progreso diario */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold mb-4">Tu progreso de hoy</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="relative inline-block">
                <svg className="w-16 h-16 sm:w-20 sm:h-20" viewBox="0 0 36 36">
                  <path
                    className="stroke-current text-gray-200"
                    fill="none"
                    strokeWidth="3"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="stroke-current text-blue-500"
                    fill="none"
                    strokeWidth="3"
                    strokeDasharray={`${dailyProgress.water * 12.5}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <text
                    x="18"
                    y="20.5"
                    className="fill-current text-blue-500 font-semibold text-xs"
                    textAnchor="middle"
                  >
                    {dailyProgress.water}/8
                  </text>
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl">
                  <Icons.Droplets size="text-xl" />
                </div>
              </div>
              <h4 className="text-sm font-medium mt-2">Agua</h4>
              <div className="flex justify-center gap-2 mt-1">
                <button
                  onClick={() => updateProgress("water", -1)}
                  className="p-1 bg-gray-100 rounded hover:bg-gray-200"
                  disabled={dailyProgress.water <= 0}
                >
                  <Icons.Minus size="text-xs" />
                </button>
                <button
                  onClick={() => updateProgress("water", 1)}
                  className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                >
                  <Icons.Plus size="text-xs" />
                </button>
              </div>
            </div>
            <div className="text-center">
              <div className="relative inline-block">
                <svg className="w-16 h-16 sm:w-20 sm:h-20" viewBox="0 0 36 36">
                  <path
                    className="stroke-current text-gray-200"
                    fill="none"
                    strokeWidth="3"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="stroke-current text-green-500"
                    fill="none"
                    strokeWidth="3"
                    strokeDasharray={`${dailyProgress.exercise * 100}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <text
                    x="18"
                    y="20.5"
                    className="fill-current text-green-500 font-semibold text-xs"
                    textAnchor="middle"
                  >
                    {dailyProgress.exercise}/1
                  </text>
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl">
                  <Icons.Activity size="text-xl" />
                </div>
              </div>
              <h4 className="text-sm font-medium mt-2">Ejercicio</h4>
              <div className="flex justify-center gap-2 mt-1">
                <button
                  onClick={() => updateProgress("exercise", -1)}
                  className="p-1 bg-gray-100 rounded hover:bg-gray-200"
                  disabled={dailyProgress.exercise <= 0}
                >
                  <Icons.Minus size="text-xs" />
                </button>
                <button
                  onClick={() => updateProgress("exercise", 1)}
                  className="p-1 bg-green-100 text-green-600 rounded hover:bg-green-200"
                >
                  <Icons.Plus size="text-xs" />
                </button>
              </div>
            </div>
            <div className="text-center">
              <div className="relative inline-block">
                <svg className="w-16 h-16 sm:w-20 sm:h-20" viewBox="0 0 36 36">
                  <path
                    className="stroke-current text-gray-200"
                    fill="none"
                    strokeWidth="3"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="stroke-current text-purple-500"
                    fill="none"
                    strokeWidth="3"
                    strokeDasharray={`${dailyProgress.mindfulness * 100}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <text
                    x="18"
                    y="20.5"
                    className="fill-current text-purple-500 font-semibold text-xs"
                    textAnchor="middle"
                  >
                    {dailyProgress.mindfulness}/1
                  </text>
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl">
                  <Icons.Brain size="text-xl" />
                </div>
              </div>
              <h4 className="text-sm font-medium mt-2">Mindfulness</h4>
              <div className="flex justify-center gap-2 mt-1">
                <button
                  onClick={() => updateProgress("mindfulness", -1)}
                  className="p-1 bg-gray-100 rounded hover:bg-gray-200"
                  disabled={dailyProgress.mindfulness <= 0}
                >
                  <Icons.Minus size="text-xs" />
                </button>
                <button
                  onClick={() => updateProgress("mindfulness", 1)}
                  className="p-1 bg-purple-100 text-purple-600 rounded hover:bg-purple-200"
                >
                  <Icons.Plus size="text-xs" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Comidas del día */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold mb-4">Comidas de hoy</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="relative inline-block">
                <svg className="w-16 h-16 sm:w-20 sm:h-20" viewBox="0 0 36 36">
                  <path
                    className="stroke-current text-gray-200"
                    fill="none"
                    strokeWidth="3"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="stroke-current text-amber-500"
                    fill="none"
                    strokeWidth="3"
                    strokeDasharray={`${dailyProgress.desayuno * 100}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl">🍳</div>
              </div>
              <h4 className="text-sm font-medium mt-2">Desayuno</h4>
              <button
                onClick={() => openMealCalculator("desayuno")}
                className="mt-1 text-xs bg-amber-100 text-amber-600 px-2 py-1 rounded hover:bg-amber-200"
              >
                {dailyProgress.desayuno > 0 ? "Editar" : "Agregar"}
              </button>
            </div>
            <div className="text-center">
              <div className="relative inline-block">
                <svg className="w-16 h-16 sm:w-20 sm:h-20" viewBox="0 0 36 36">
                  <path
                    className="stroke-current text-gray-200"
                    fill="none"
                    strokeWidth="3"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="stroke-current text-orange-500"
                    fill="none"
                    strokeWidth="3"
                    strokeDasharray={`${dailyProgress.almuerzo * 100}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl">🍲</div>
              </div>
              <h4 className="text-sm font-medium mt-2">Almuerzo</h4>
              <button
                onClick={() => openMealCalculator("almuerzo")}
                className="mt-1 text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded hover:bg-orange-200"
              >
                {dailyProgress.almuerzo > 0 ? "Editar" : "Agregar"}
              </button>
            </div>
            <div className="text-center">
              <div className="relative inline-block">
                <svg className="w-16 h-16 sm:w-20 sm:h-20" viewBox="0 0 36 36">
                  <path
                    className="stroke-current text-gray-200"
                    fill="none"
                    strokeWidth="3"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="stroke-current text-indigo-500"
                    fill="none"
                    strokeWidth="3"
                    strokeDasharray={`${dailyProgress.cena * 100}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl">🌙</div>
              </div>
              <h4 className="text-sm font-medium mt-2">Cena</h4>
              <button
                onClick={() => openMealCalculator("cena")}
                className="mt-1 text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded hover:bg-indigo-200"
              >
                {dailyProgress.cena > 0 ? "Editar" : "Agregar"}
              </button>
            </div>
          </div>
        </div>

        {/* Progreso de calorías */}
        {macroResults && (
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold mb-4">Progreso Nutricional</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Calorías</span>
                  <span>
                    {consumedMacros.calories}/{macroResults.calories}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(getCaloriesProgress().percentage, 100)}%` }}
                  ></div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <div className="font-medium">Proteínas</div>
                  <div className="text-xs text-gray-600">
                    {consumedMacros.protein}g / {macroResults.protein}g
                  </div>
                </div>
                <div>
                  <div className="font-medium">Carbohidratos</div>
                  <div className="text-xs text-gray-600">
                    {consumedMacros.carbs}g / {macroResults.carbs}g
                  </div>
                </div>
                <div>
                  <div className="font-medium">Grasas</div>
                  <div className="text-xs text-gray-600">
                    {consumedMacros.fats}g / {macroResults.fats}g
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  const ComidaModule = () => {
    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold mb-4">Registro de Comidas</h3>

          {/* Comidas consumidas hoy */}
          {mealCompositions.length > 0 && (
            <div className="mb-6">
              <h4 className="font-medium mb-3">Comidas de hoy:</h4>
              <div className="space-y-2">
                {mealCompositions.map((meal) => (
                  <div key={meal.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                    <div>
                      <div className="font-medium text-sm">{meal.food_name}</div>
                      <div className="text-xs text-gray-600">
                        {meal.meal_type} - {meal.quantity_grams}g - {meal.calories_consumed} cal
                      </div>
                    </div>
                    <button
                      onClick={() => removeFoodFromMeal(meal.id)}
                      className="text-red-600 hover:bg-red-50 p-1 rounded"
                    >
                      <Icons.Trash2 size="text-sm" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Botones para agregar comidas */}
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => openMealCalculator("desayuno")}
              className="bg-amber-100 text-amber-700 p-4 rounded-lg hover:bg-amber-200 transition-colors"
            >
              <div className="text-2xl mb-2">🍳</div>
              <div className="font-medium">Desayuno</div>
            </button>
            <button
              onClick={() => openMealCalculator("almuerzo")}
              className="bg-orange-100 text-orange-700 p-4 rounded-lg hover:bg-orange-200 transition-colors"
            >
              <div className="text-2xl mb-2">🍲</div>
              <div className="font-medium">Almuerzo</div>
            </button>
            <button
              onClick={() => openMealCalculator("cena")}
              className="bg-indigo-100 text-indigo-700 p-4 rounded-lg hover:bg-indigo-200 transition-colors"
            >
              <div className="text-2xl mb-2">🌙</div>
              <div className="font-medium">Cena</div>
            </button>
          </div>
        </div>
      </div>
    )
  }

  const BatidosModule = () => {
    return (
      <div className="space-y-4 sm:space-y-6">
        {/* Header con botón crear */}
        <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold mb-2">🥤 Creador de Batidos</h2>
          <p className="text-sm sm:text-base opacity-90 mb-4">
            Crea batidos personalizados con ingredientes del banco de alimentos
          </p>
          <button
            onClick={() => setShowRecipeCreator(true)}
            className="bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            <Icons.Plus size="text-sm" /> Crear Nuevo Batido
          </button>
        </div>

        {/* Mis batidos */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold mb-4">Mis Batidos ({userRecipes.length})</h3>
          {userRecipes.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Icons.Blend size="text-3xl" />
              <p className="mt-2">No has creado batidos aún</p>
              <p className="text-sm mt-1">¡Crea tu primer batido personalizado!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {userRecipes.map((recipe) => (
                <div key={recipe.id} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium mb-2">{recipe.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{recipe.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                    <div className="bg-gray-50 p-2 rounded">
                      <span className="font-medium">Calorías:</span> {recipe.total_calories}
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <span className="font-medium">Proteínas:</span> {recipe.total_protein}g
                    </div>
                  </div>
                  <button
                    onClick={() => selectFood(recipe)}
                    className="w-full bg-green-100 text-green-700 py-2 rounded hover:bg-green-200 transition-colors text-sm"
                  >
                    Agregar a Comida
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Batidos populares */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold mb-4">Batidos Populares ({recipes.length})</h3>
          {recipes.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No hay batidos populares disponibles</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recipes.map((recipe) => (
                <div key={recipe.id} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium mb-2">{recipe.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{recipe.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                    <div className="bg-gray-50 p-2 rounded">
                      <span className="font-medium">Calorías:</span> {recipe.total_calories}
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <span className="font-medium">Proteínas:</span> {recipe.total_protein}g
                    </div>
                  </div>
                  <button
                    onClick={() => selectFood(recipe)}
                    className="w-full bg-blue-100 text-blue-700 py-2 rounded hover:bg-blue-200 transition-colors text-sm"
                  >
                    Agregar a Comida
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  const EjercicioModule = () => {
    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold mb-4">Biblioteca de Ejercicios</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {exercises.map((exercise) => (
              <div key={exercise.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{exercise.name}</h4>
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      exercise.difficulty === "beginner"
                        ? "bg-green-100 text-green-700"
                        : exercise.difficulty === "intermediate"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {exercise.difficulty}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{exercise.description}</p>
                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div className="bg-gray-50 p-2 rounded">
                    <span className="font-medium">Duración:</span> {exercise.duration_minutes} min
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <span className="font-medium">Calorías:</span> {exercise.calories_burned}
                  </div>
                </div>
                <button
                  onClick={() => updateProgress("exercise", 1)}
                  className="w-full bg-green-100 text-green-700 py-2 rounded hover:bg-green-200 transition-colors text-sm"
                >
                  <Icons.Play size="text-sm" /> Iniciar Ejercicio
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const RecursosModule = () => {
    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold mb-4">Recursos Educativos</h3>
          <div className="grid grid-cols-1 gap-4">
            {resources.map((resource) => (
              <div key={resource.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{resource.title}</h4>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        resource.type === "article"
                          ? "bg-blue-100 text-blue-700"
                          : resource.type === "video"
                            ? "bg-purple-100 text-purple-700"
                            : resource.type === "audio"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {resource.type}
                    </span>
                    {resource.is_premium && (
                      <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded">
                        <Icons.Crown size="text-xs" /> Premium
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{resource.content}</p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    Por {resource.author} • {resource.duration_minutes} min
                  </div>
                  <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm hover:bg-blue-200 transition-colors">
                    <Icons.Play size="text-xs" /> Ver
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const SuplementosModule = () => {
    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold mb-2">🛒 Tienda VitalMente</h2>
          <p className="text-sm sm:text-base opacity-90">
            Suplementos premium seleccionados para potenciar tu bienestar
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold mb-4">Productos Destacados</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {supplements.map((supplement) => (
              <div key={supplement.id} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium mb-2">{supplement.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{supplement.description}</p>
                <div className="mb-3">
                  <div className="text-xs text-gray-500 mb-1">Beneficios:</div>
                  <div className="flex flex-wrap gap-1">
                    {supplement.benefits.map((benefit, index) => (
                      <span key={index} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-green-600">${supplement.price.toLocaleString()}</div>
                  <button className="bg-purple-100 text-purple-700 px-4 py-2 rounded hover:bg-purple-200 transition-colors text-sm">
                    <Icons.Package size="text-sm" /> Comprar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const PerfilModule = () => {
    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold mb-4">Mi Perfil</h3>
          {currentUser && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <div className="mt-1 text-sm text-gray-900">{currentUser.name}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                <div className="mt-1 text-sm text-gray-900">{currentUser.phone}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Edad</label>
                  <div className="mt-1 text-sm text-gray-900">{currentUser.age} años</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Peso</label>
                  <div className="mt-1 text-sm text-gray-900">{currentUser.weight} kg</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Altura</label>
                  <div className="mt-1 text-sm text-gray-900">{currentUser.height} cm</div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Objetivo</label>
                <div className="mt-1 text-sm text-gray-900">
                  {GOALS.find((g) => g.id === currentUser.goal)?.label || currentUser.goal}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Nivel de Actividad</label>
                <div className="mt-1 text-sm text-gray-900">
                  {ACTIVITY_LEVELS.find((a) => a.value === currentUser.activity_level)?.label}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // ============================================================================
  // COMPONENTE CREADOR DE BATIDOS (NUEVO)
  // ============================================================================
  const RecipeCreatorModal = () => {
    if (!showRecipeCreator) return null

    const totals = calculateRecipeTotals()

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-4">
        <div className="relative top-4 mx-auto border w-full max-w-3xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto">
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                <Icons.Blend size="text-xl" />
                Creador de Batidos
              </h3>
              <button onClick={() => setShowRecipeCreator(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <Icons.X size="text-lg" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Columna izquierda: Información del batido */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del batido</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="Ej: Batido Energético de Banano"
                    value={newRecipe.name}
                    onChange={(e) => setNewRecipe((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descripción (opcional)</label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="Describe brevemente tu batido..."
                    rows={2}
                    value={newRecipe.description}
                    onChange={(e) => setNewRecipe((prev) => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instrucciones (opcional)</label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="Ej: Mezclar todos los ingredientes en la licuadora por 1 minuto..."
                    rows={3}
                    value={newRecipe.instructions}
                    onChange={(e) => setNewRecipe((prev) => ({ ...prev, instructions: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Porciones</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                    min="1"
                    value={newRecipe.serving_size}
                    onChange={(e) => setNewRecipe((prev) => ({ ...prev, serving_size: Number(e.target.value) || 1 }))}
                  />
                </div>

                {/* Resumen nutricional */}
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-medium text-sm mb-2">Información Nutricional</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-white p-2 rounded border">
                      <span className="font-medium">Calorías:</span> {totals.calories}
                    </div>
                    <div className="bg-white p-2 rounded border">
                      <span className="font-medium">Proteínas:</span> {totals.protein}g
                    </div>
                    <div className="bg-white p-2 rounded border">
                      <span className="font-medium">Carbohidratos:</span> {totals.carbs}g
                    </div>
                    <div className="bg-white p-2 rounded border">
                      <span className="font-medium">Grasas:</span> {totals.fats}g
                    </div>
                  </div>
                </div>

                {/* Ingredientes seleccionados */}
                <div>
                  <h4 className="font-medium text-sm mb-2">Ingredientes seleccionados ({recipeIngredients.length})</h4>
                  {recipeIngredients.length === 0 ? (
                    <div className="text-center py-4 bg-gray-50 rounded-lg text-sm text-gray-500">
                      Selecciona ingredientes de la lista
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {recipeIngredients.map((ingredient, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                          <div className="flex-1">
                            <p className="text-sm font-medium">{ingredient.food_name}</p>
                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                className="w-16 p-1 text-xs border rounded"
                                value={ingredient.quantity_grams}
                                onChange={(e) => updateIngredientQuantity(index, Number(e.target.value) || 0)}
                                min="1"
                              />
                              <span className="text-xs text-gray-500">gramos</span>
                            </div>
                          </div>
                          <button
                            onClick={() => removeIngredientFromRecipe(index)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Icons.Trash2 size="text-xs" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Columna derecha: Selección de ingredientes */}
              <div>
                <h4 className="font-medium text-sm mb-2">Selecciona ingredientes</h4>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  {getFoodsByCategory().map((category) => (
                    <div key={category.id} className="border border-gray-200 rounded-lg p-3">
                      <h5 className="font-medium text-sm mb-2 flex items-center gap-1">
                        <span>{category.icon}</span> {category.name}
                      </h5>
                      <div className="grid grid-cols-2 gap-2">
                        {category.foods.map((food) => (
                          <button
                            key={food.id}
                            onClick={() => addIngredientToRecipe(food)}
                            className="text-left p-2 border border-gray-200 rounded hover:bg-gray-50 text-xs"
                          >
                            <p className="font-medium">{food.name}</p>
                            <p className="text-gray-500">{food.calories} cal/100g</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={saveRecipe}
                disabled={!newRecipe.name || recipeIngredients.length === 0}
                className="flex-1 bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Guardar Batido
              </button>
              <button
                onClick={() => setShowRecipeCreator(false)}
                className="flex-1 bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ============================================================================
  // COMPONENTE CALCULADORA DE COMIDAS
  // ============================================================================
  const MealCalculatorModal = () => {
    if (!showMealCalculator) return null

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-4">
        <div className="relative top-4 mx-auto border w-full max-w-2xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto">
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">Agregar {selectedMealType}</h3>
              <button onClick={() => setShowMealCalculator(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <Icons.X size="text-lg" />
              </button>
            </div>

            {selectedFood ? (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">{selectedFood.name}</h4>
                  {"ingredients" in selectedFood ? (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Batido personalizado</p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>Calorías: {selectedFood.total_calories}</div>
                        <div>Proteínas: {selectedFood.total_protein}g</div>
                        <div>Carbohidratos: {selectedFood.total_carbs}g</div>
                        <div>Grasas: {selectedFood.total_fats}g</div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>Calorías: {selectedFood.calories}/100g</div>
                      <div>Proteínas: {selectedFood.protein}g/100g</div>
                      <div>Carbohidratos: {selectedFood.carbs}g/100g</div>
                      <div>Grasas: {selectedFood.fats}g/100g</div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cantidad {"ingredients" in selectedFood ? "(porciones)" : "(gramos)"}
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={foodQuantity}
                    onChange={(e) => setFoodQuantity(e.target.value)}
                    min="1"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={addFoodToMeal}
                    className="flex-1 bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Agregar a {selectedMealType}
                  </button>
                  <button
                    onClick={() => setSelectedFood(null)}
                    className="flex-1 bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Volver
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Mis batidos */}
                {userRecipes.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Mis Batidos</h4>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {userRecipes.map((recipe) => (
                        <button
                          key={recipe.id}
                          onClick={() => selectFood(recipe)}
                          className="text-left p-2 border border-gray-200 rounded hover:bg-gray-50"
                        >
                          <p className="font-medium text-sm">{recipe.name}</p>
                          <p className="text-xs text-gray-500">{recipe.total_calories} cal</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Alimentos por categoría */}
                <div className="space-y-4 max-h-[400px] overflow-y-auto">
                  {getFoodsByCategory().map((category) => (
                    <div key={category.id} className="border border-gray-200 rounded-lg p-3">
                      <h5 className="font-medium text-sm mb-2 flex items-center gap-1">
                        <span>{category.icon}</span> {category.name}
                      </h5>
                      <div className="grid grid-cols-2 gap-2">
                        {category.foods.map((food) => (
                          <button
                            key={food.id}
                            onClick={() => selectFood(food)}
                            className="text-left p-2 border border-gray-200 rounded hover:bg-gray-50 text-xs"
                          >
                            <p className="font-medium">{food.name}</p>
                            <p className="text-gray-500">{food.calories} cal/100g</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ============================================================================
  // COMPONENTES DE ADMINISTRADOR (RESTAURADOS COMPLETOS)
  // ============================================================================
  const AdminDashboard = () => {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <h1 className="text-3xl font-bold text-gray-900">Panel de Administración VitalMente</h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">Bienvenido, {currentUser?.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Navegación de administrador */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {ADMIN_MODULES.map((module) => (
                  <button
                    key={module.id}
                    onClick={() => setActiveTab(module.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === module.id
                        ? "border-green-500 text-green-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {module.icon}
                      {module.name}
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Contenido del módulo activo */}
          <div className="px-4 py-6 sm:px-0">
            {activeTab === "dashboard" && <AdminDashboardContent />}
            {activeTab === "users" && <AdminUsersContent />}
            {activeTab === "foods" && <AdminFoodsContent />}
            {activeTab === "recipes" && <AdminRecipesContent />}
            {activeTab === "exercises" && <AdminExercisesContent />}
            {activeTab === "supplements" && <AdminSupplementsContent />}
            {activeTab === "resources" && <AdminResourcesContent />}
            {activeTab === "analytics" && <AdminAnalyticsContent />}
            {activeTab === "ai" && <AdminAIContent />}
          </div>
        </div>
      </div>
    )
  }

  const AdminDashboardContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Icons.Users size="text-2xl" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Usuarios</dt>
                <dd className="text-lg font-medium text-gray-900">{userStats.totalUsers || allUsers.length}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Icons.Activity size="text-2xl" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Activos Hoy</dt>
                <dd className="text-lg font-medium text-gray-900">{userStats.activeToday || 0}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Icons.UtensilsCrossed size="text-2xl" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Alimentos</dt>
                <dd className="text-lg font-medium text-gray-900">{globalFoods.length}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Icons.Blend size="text-2xl" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Recetas</dt>
                <dd className="text-lg font-medium text-gray-900">{recipes.length}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const AdminUsersContent = () => (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Usuarios Registrados</h3>
        <div className="max-h-96 overflow-y-auto">
          <div className="space-y-3">
            {allUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.phone}</p>
                  <p className="text-xs text-gray-400">Registrado: {new Date(user.created_at).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{user.age} años</p>
                  <p className="text-xs text-gray-500">
                    {user.weight}kg - {user.height}cm
                  </p>
                  <p className="text-xs text-gray-400">{GOALS.find((g) => g.id === user.goal)?.label || user.goal}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const AdminFoodsContent = () => (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Banco de Alimentos</h3>
          <button
            onClick={() => setShowAddFoodModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            <Icons.Plus size="text-sm" /> Agregar Alimento
          </button>
        </div>
        <div className="max-h-96 overflow-y-auto">
          <div className="space-y-2">
            {globalFoods.map((food) => (
              <div key={food.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div>
                  <p className="text-sm font-medium text-gray-900">{food.name}</p>
                  <p className="text-xs text-gray-500">
                    {food.calories} cal - {food.protein}g prot - {food.category}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => dbFunctions.deleteGlobalFood(food.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Icons.Trash2 size="text-sm" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const AdminRecipesContent = () => (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Recetas Globales</h3>
          <button
            onClick={() => setShowAddRecipeModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            <Icons.Plus size="text-sm" /> Agregar Receta
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium mb-2">{recipe.name}</h4>
              <p className="text-sm text-gray-600 mb-2">{recipe.description}</p>
              <div className="text-xs text-gray-500">
                {recipe.total_calories} cal - {recipe.total_protein}g prot
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const AdminExercisesContent = () => (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Biblioteca de Ejercicios</h3>
          <button
            onClick={() => setShowAddExerciseModal(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            <Icons.Plus size="text-sm" /> Agregar Ejercicio
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exercises.map((exercise) => (
            <div key={exercise.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{exercise.name}</h4>
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    exercise.difficulty === "beginner"
                      ? "bg-green-100 text-green-700"
                      : exercise.difficulty === "intermediate"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {exercise.difficulty}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{exercise.description}</p>
              <div className="text-xs text-gray-500">
                {exercise.duration_minutes} min - {exercise.calories_burned} cal
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const AdminSupplementsContent = () => (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Catálogo de Suplementos</h3>
          <button
            onClick={() => setShowAddSupplementModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            <Icons.Plus size="text-sm" /> Agregar Suplemento
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {supplements.map((supplement) => (
            <div key={supplement.id} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium mb-2">{supplement.name}</h4>
              <p className="text-sm text-gray-600 mb-2">{supplement.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-green-600">${supplement.price.toLocaleString()}</span>
                <span className="text-xs text-gray-500">{supplement.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const AdminResourcesContent = () => (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Recursos Educativos</h3>
          <button
            onClick={() => setShowAddResourceModal(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            <Icons.Plus size="text-sm" /> Agregar Recurso
          </button>
        </div>
        <div className="space-y-4">
          {resources.map((resource) => (
            <div key={resource.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{resource.title}</h4>
                <div className="flex gap-2">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      resource.type === "article"
                        ? "bg-blue-100 text-blue-700"
                        : resource.type === "video"
                          ? "bg-purple-100 text-purple-700"
                          : resource.type === "audio"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {resource.type}
                  </span>
                  {resource.is_premium && (
                    <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded">Premium</span>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">{resource.content}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  Por {resource.author} • {resource.duration_minutes} min
                </span>
                <span className="text-xs text-gray-500">{resource.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const AdminAnalyticsContent = () => (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Estadísticas Generales</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{userStats.totalUsers || allUsers.length}</div>
              <div className="text-sm text-gray-500">Usuarios Totales</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{userStats.activeToday || 0}</div>
              <div className="text-sm text-gray-500">Activos Hoy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{Math.round(userStats.avgCalories || 0)}</div>
              <div className="text-sm text-gray-500">Calorías Promedio</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Distribución de Objetivos</h3>
          <div className="space-y-3">
            {GOALS.map((goal) => {
              const count = allUsers.filter((user) => user.goal === goal.id).length
              const percentage = allUsers.length > 0 ? Math.round((count / allUsers.length) * 100) : 0
              return (
                <div key={goal.id} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{goal.label}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                    </div>
                    <span className="text-sm text-gray-500 w-12">
                      {count} ({percentage}%)
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )

  const AdminAIContent = () => (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
          <Icons.Robot size="text-xl" /> Asistente de IA para Administradores
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Consulta a la IA sobre datos de usuarios y tendencias
            </label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows={3}
              placeholder="Ej: ¿Cuáles son las tendencias nutricionales de mis usuarios? ¿Qué recomendaciones puedes darme para mejorar la retención?"
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
            />
          </div>
          <button
            onClick={handleAiQuery}
            disabled={isAiLoading || !aiQuery.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            {isAiLoading ? (
              <>
                <Icons.Loader2 size="text-sm" /> Analizando...
              </>
            ) : (
              <>
                <Icons.Zap size="text-sm" /> Consultar IA
              </>
            )}
          </button>

          {aiResponse && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Respuesta de la IA:</h4>
              <p className="text-blue-800">{aiResponse}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  // Modal para agregar alimento (RESTAURADO)
  const AddFoodModal = () => {
    if (!showAddFoodModal) return null

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <div className="mt-3">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Agregar Nuevo Alimento</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  value={newFood.name}
                  onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Calorías (por 100g)</label>
                  <input
                    type="number"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    value={newFood.calories}
                    onChange={(e) => setNewFood({ ...newFood, calories: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Proteínas (g)</label>
                  <input
                    type="number"
                    step="0.1"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    value={newFood.protein}
                    onChange={(e) => setNewFood({ ...newFood, protein: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Carbohidratos (g)</label>
                  <input
                    type="number"
                    step="0.1"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    value={newFood.carbs}
                    onChange={(e) => setNewFood({ ...newFood, carbs: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Grasas (g)</label>
                  <input
                    type="number"
                    step="0.1"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    value={newFood.fats}
                    onChange={(e) => setNewFood({ ...newFood, fats: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Categoría</label>
                <select
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  value={newFood.category}
                  onChange={(e) => setNewFood({ ...newFood, category: e.target.value })}
                >
                  {FOOD_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddFoodModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddFood}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ============================================================================
  // RENDERIZADO PRINCIPAL
  // ============================================================================
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <div className="text-center mb-6">
            <h1 
              className="text-2xl font-bold text-gray-900 mb-2 cursor-pointer select-none"
              onClick={handleLogoClick}
            >
              ✨ VitalMente
            </h1>
            <p className="text-gray-600">Tu compañero de bienestar integral</p>
            {logoClicks > 0 && logoClicks < 5 && (
              <div className="text-xs text-gray-400 mt-1">
                {logoClicks}/5
              </div>
            )}
          </div>

          {/* Input especial para código de administrador */}
          {showAdminAccess && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="text-sm font-medium text-red-900 mb-2">Acceso de Administrador</h3>
              <div className="flex gap-2">
                <input
                  type="password"
                  className="flex-1 p-2 border border-red-300 rounded text-sm"
                  placeholder="Código de administrador"
                  value={adminCode}
                  onChange={(e) => setAdminCode(e.target.value)}
                  maxLength={10}
                />
                <button
                  onClick={handleAdminAccess}
                  className="px-3 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                >
                  Acceder
                </button>
              </div>
              <p className="text-xs text-red-600 mt-1">Tienes 30 segundos para ingresar el código</p>
            </div>
          )}

          {!showRegister ? (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-center">Iniciar Sesión</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Número de teléfono</label>
                <input
                  type="tel"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Ej: 3001234567"
                  value={loginForm.phone}
                  onChange={(e) => setLoginForm((prev) => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Código de acceso</label>
                <input
                  type="password"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Tu código de 10 dígitos"
                  value={loginForm.accessCode}
                  onChange={(e) => setLoginForm((prev) => ({ ...prev, accessCode: e.target.value }))}
                />
              </div>
              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
              >
                {isLoading ? "Ingresando..." : "Ingresar"}
              </button>
              <div className="text-center">
                <button onClick={() => setShowRegister(true)} className="text-green-600 hover:text-green-700 text-sm">
                  ¿No tienes cuenta? Regístrate aquí
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-center">Crear Cuenta</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <input
                    type="tel"
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                    value={registerForm.phone}
                    onChange={(e) => setRegisterForm((prev) => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                    value={registerForm.name}
                    onChange={(e) => setRegisterForm((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Edad</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                    value={registerForm.age}
                    onChange={(e) => setRegisterForm((prev) => ({ ...prev, age: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Peso (kg)</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                    value={registerForm.weight}
                    onChange={(e) => setRegisterForm((prev) => ({ ...prev, weight: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Altura (cm)</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                    value={registerForm.height}
                    onChange={(e) => setRegisterForm((prev) => ({ ...prev, height: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nivel de actividad</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                  value={registerForm.activityLevel}
                  onChange={(e) => setRegisterForm((prev) => ({ ...prev, activityLevel: Number(e.target.value) }))}
                >
                  {ACTIVITY_LEVELS.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label} - {level.desc}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Objetivo principal</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                  value={registerForm.goal}
                  onChange={(e) => setRegisterForm((prev) => ({ ...prev, goal: e.target.value }))}
                >
                  {GOALS.map((goal) => (
                    <option key={goal.id} value={goal.id}>
                      {goal.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Código de acceso</label>
                  <input
                    type="password"
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="10 dígitos"
                    value={registerForm.accessCode}
                    onChange={(e) => setRegisterForm((prev) => ({ ...prev, accessCode: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar código</label>
                  <input
                    type="password"
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="Repetir código"
                    value={registerForm.confirmCode}
                    onChange={(e) => setRegisterForm((prev) => ({ ...prev, confirmCode: e.target.value }))}
                  />
                </div>
              </div>
              <button
                onClick={handleRegister}
                disabled={isLoading}
                className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
              >
                {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
              </button>
              <div className="text-center">
                <button onClick={() => setShowRegister(false)} className="text-green-600 hover:text-green-700 text-sm">
                  ¿Ya tienes cuenta? Inicia sesión
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Si es administrador, mostrar panel de admin (RESTAURADO)
  if (isAdmin) {
    return (
      <>
        <AdminDashboard />
        <AddFoodModal />
      </>
    )
  }

  // Si es usuario normal, mostrar interfaz móvil (CON NAVEGACIÓN NUEVA)
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <MobileHeader />

      <div className="px-4 py-6">
        {activeTab === "inicio" && <HomeModule />}
        {activeTab === "comida" && <ComidaModule />}
        {activeTab === "batidos" && <BatidosModule />}
        {activeTab === "ejercicio" && <EjercicioModule />}
        {activeTab === "recursos" && <RecursosModule />}
        {activeTab === "suplementos" && <SuplementosModule />}
        {activeTab === "perfil" && <PerfilModule />}
      </div>

      <MobileNavigation />
      <MobileMenu />
      <RecipeCreatorModal />
      <MealCalculatorModal />
    </div>
  )
}
