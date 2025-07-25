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

// ============================================================================
// CONFIGURACIÓN DE DATOS (ORIGINAL)
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
// COMPONENTE PRINCIPAL RESPONSIVE
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
  // FUNCIONES DE AUTENTICACIÓN
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
  // FUNCIONES DE ADMINISTRACIÓN
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
  // FUNCIONES DE COMIDA
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

  const getFoodsByCategory = () => {
    const categories = [
      { id: "proteinas", name: "Proteínas", icon: "🍗" },
      { id: "vegetales", name: "Vegetales", icon: "🥬" },
      { id: "frutas", name: "Frutas", icon: "🍎" },
      { id: "carbohidratos", name: "Carbohidratos", icon: "🌾" },
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
          </div>
        </div>
        {nextLevelInfo && (
          <div className="mb-3">
            <div className="flex justify-between text-xs mb-1">
              <span>Siguiente nivel</span>
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

  // Panel de administración responsive
  // Después de la línea del AdminPanel, reemplazar toda la función AdminPanel con la versión completa:

  const AdminPanel = () => {
    const [showAddResource, setShowAddResource] = useState(false)
    const [newResource, setNewResource] = useState({
      type: "mindfulness" as "mindfulness" | "nutrition" | "exercise",
      title: "",
      description: "",
      url: "",
      image_url: "",
    })

    // 🆕 Estados para agregar tips
    const [showAddTip, setShowAddTip] = useState(false)
    const [newTip, setNewTip] = useState({
      category: "",
      title: "",
      content: "",
      icon: "💡",
    })

    // 🆕 Estados para agregar suplementos
    const [showAddSupplement, setShowAddSupplement] = useState(false)
    const [newSupplement, setNewSupplement] = useState({
      name: "",
      description: "",
      benefits: "",
      price: "",
      image_url: "",
      whatsapp_message: "",
    })

    // 🆕 Función para agregar recursos
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

    // 🆕 Función para agregar tips
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

    // 🆕 Función para agregar suplementos
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
                { id: "ia-patterns", name: "IA Patterns", icon: <Icons.Robot size="text-sm" /> },
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
              {/* Métricas principales */}
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
                      <p className="text-xs font-medium text-gray-600">Tips Activos</p>
                      <p className="text-xl sm:text-2xl font-bold text-green-600">{globalTips.length}</p>
                      <p className="text-xs text-gray-500 mt-1">Contenido educativo</p>
                    </div>
                    <Icons.Lightbulb size="text-2xl" />
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

              {/* Estado del sistema */}
              <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2">
                  <Icons.Database size="text-lg" />
                  Estado del Sistema
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl mb-2">✅</div>
                    <div className="font-semibold text-green-800 text-sm">Supabase</div>
                    <div className="text-xs text-green-600">Conectado y funcionando</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl mb-2">🚀</div>
                    <div className="font-semibold text-blue-800 text-sm">Vercel</div>
                    <div className="text-xs text-blue-600">Desplegado y activo</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl mb-2">🤖</div>
                    <div className="font-semibold text-purple-800 text-sm">IA Engine</div>
                    <div className="text-xs text-purple-600">Generando recomendaciones</div>
                  </div>
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
                {allUsers.map((user) => (
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
                        <div className="text-xs text-gray-500">
                          {user.age} años | {user.weight}kg | {user.height}cm
                        </div>
                        <div className="text-xs text-gray-500">
                          Actividad: {ACTIVITY_LEVELS.find((a) => a.value === user.activity_level)?.label}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 🆕 TAB IA PATTERNS - RESTAURADO COMPLETO */}
          {activeAdminTab === "ia-patterns" && (
            <div className="space-y-4 sm:space-y-6">
              {/* Explicación del sistema IA */}
              <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2">
                  <Icons.Robot size="text-lg" />
                  Sistema de Análisis Inteligente
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl sm:text-3xl mb-2">🧠</div>
                    <div className="font-semibold text-sm">Análisis de Comportamiento</div>
                    <div className="text-xs text-gray-600">
                      Detecta patrones en hidratación, ejercicio y mindfulness
                    </div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl sm:text-3xl mb-2">🎯</div>
                    <div className="font-semibold text-sm">Recomendaciones Personalizadas</div>
                    <div className="text-xs text-gray-600">Sugiere suplementos basados en déficits detectados</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl sm:text-3xl mb-2">📊</div>
                    <div className="font-semibold text-sm">Scoring de Confianza</div>
                    <div className="text-xs text-gray-600">Evalúa la precisión de cada recomendación</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl sm:text-3xl mb-2">⚡</div>
                    <div className="font-semibold text-sm">Optimización Temporal</div>
                    <div className="text-xs text-gray-600">Determina el mejor momento para cada suplemento</div>
                  </div>
                </div>

                {/* Algoritmos activos */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-3 text-sm sm:text-base">🔬 Algoritmos Activos</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white rounded border">
                      <div>
                        <span className="font-medium text-sm">Detector de Déficit de Ejercicio</span>
                        <p className="text-xs text-gray-600">
                          Si ejercicio promedio {"<"} 0.5 sesiones/día → Recomienda energéticos
                        </p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Activo</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded border">
                      <div>
                        <span className="font-medium text-sm">Detector de Estrés/Ansiedad</span>
                        <p className="text-xs text-gray-600">
                          Si mindfulness {"<"} 0.5 sesiones/día → Recomienda relajantes
                        </p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Activo</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded border">
                      <div>
                        <span className="font-medium text-sm">Detector de Deshidratación</span>
                        <p className="text-xs text-gray-600">Si agua {"<"} 6 vasos/día → Recomienda electrolitos</p>
                      </div>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">En desarrollo</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Métricas de IA */}
              <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-4">📈 Métricas de IA</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-xl sm:text-2xl font-bold text-blue-600">
                      {allUsers.length > 0 ? Math.round((aiRecommendations.length / allUsers.length) * 100) : 0}%
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">Usuarios con recomendaciones activas</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-xl sm:text-2xl font-bold text-green-600">85%</div>
                    <div className="text-xs sm:text-sm text-gray-600">Precisión promedio del algoritmo</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-xl sm:text-2xl font-bold text-purple-600">12%</div>
                    <div className="text-xs sm:text-sm text-gray-600">Tasa de conversión estimada</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB RECURSOS */}
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

                {/* Lista de recursos existentes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {globalResources.map((resource) => (
                    <div key={resource.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{getResourceTypeIcon(resource.type)}</span>
                        <span className="text-xs sm:text-sm font-medium capitalize">{resource.type}</span>
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

          {/* TAB SUPLEMENTOS */}
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
                    <h4 className="font-semibold text-sm mb-1">{supplement.name}</h4>
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

          {/* 🆕 TAB ANALYTICS - RESTAURADO COMPLETO */}
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

              {/* Métricas adicionales de analytics */}
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

        {/* 🆕 MODALES COMPLETOS - RESPONSIVE */}
        {/* Modal para agregar recurso */}
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

        {/* Modal para agregar tip */}
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

        {/* 🆕 Modal para agregar suplemento - COMPLETO */}
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

  // ============================================================================
  // PANTALLA DE LOGIN/REGISTRO RESPONSIVE
  // ============================================================================
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
          <div className="text-center mb-6">
            <div onClick={handleLogoClick} className="cursor-pointer">
              <h1 className="text-xl sm:text-2xl font-bold text-green-600">VitalMente</h1>
              <p className="text-gray-600 text-sm">Tu compañero de bienestar personalizado</p>
              <div className="flex justify-center gap-2 mt-2 flex-wrap">
                <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded">🌐 Conectado</span>
                <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">🤖 IA Activa</span>
              </div>
              {logoClicks > 0 && <div className="mt-2 text-xs text-gray-400">Clics: {logoClicks}/5</div>}
            </div>
          </div>

          <div className="space-y-6">
            {/* Botones de navegación */}
            <div className="flex rounded-lg bg-gray-100 p-1">
              <button
                onClick={() => setShowRegister(false)}
                className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                  !showRegister ? "bg-white text-green-600 shadow-sm" : "text-gray-600"
                }`}
              >
                Ingresar
              </button>
              <button
                onClick={() => setShowRegister(true)}
                className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                  showRegister ? "bg-white text-green-600 shadow-sm" : "text-gray-600"
                }`}
              >
                Crear Cuenta
              </button>
            </div>

            {!showRegister ? (
              <div className="space-y-4">
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  placeholder="+57 300 123 4567"
                  value={loginForm.phone}
                  onChange={(e) => setLoginForm((prev) => ({ ...prev, phone: e.target.value }))}
                />
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  type="password"
                  placeholder="Código de 10 dígitos"
                  maxLength={10}
                  value={loginForm.accessCode}
                  onChange={(e) => setLoginForm((prev) => ({ ...prev, accessCode: e.target.value }))}
                />
                <button
                  onClick={handleLogin}
                  className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 disabled:bg-gray-400 flex items-center justify-center gap-2 transition-colors text-sm"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Icons.Loader2 size="text-sm" />
                      Ingresando...
                    </>
                  ) : (
                    "Ingresar"
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  placeholder="Número de teléfono"
                  value={registerForm.phone}
                  onChange={(e) => setRegisterForm((prev) => ({ ...prev, phone: e.target.value }))}
                />
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  placeholder="Nombre completo"
                  value={registerForm.name}
                  onChange={(e) => setRegisterForm((prev) => ({ ...prev, name: e.target.value }))}
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                    placeholder="Edad"
                    type="number"
                    value={registerForm.age}
                    onChange={(e) => setRegisterForm((prev) => ({ ...prev, age: e.target.value }))}
                  />
                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                    placeholder="Peso (kg)"
                    type="number"
                    value={registerForm.weight}
                    onChange={(e) => setRegisterForm((prev) => ({ ...prev, weight: e.target.value }))}
                  />
                </div>
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  placeholder="Altura (cm)"
                  type="number"
                  value={registerForm.height}
                  onChange={(e) => setRegisterForm((prev) => ({ ...prev, height: e.target.value }))}
                />
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  value={registerForm.activityLevel}
                  onChange={(e) =>
                    setRegisterForm((prev) => ({ ...prev, activityLevel: Number.parseFloat(e.target.value) }))
                  }
                >
                  {ACTIVITY_LEVELS.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label} - {level.desc}
                    </option>
                  ))}
                </select>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  value={registerForm.goal}
                  onChange={(e) => setRegisterForm((prev) => ({ ...prev, goal: e.target.value }))}
                >
                  <optgroup label="🎯 TRANSFORMACIÓN FÍSICA">
                    {GOALS.filter((goal) => goal.category === "physical").map((goal) => (
                      <option key={goal.id} value={goal.id}>
                        {goal.label}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="💫 BIENESTAR EMOCIONAL">
                    {GOALS.filter((goal) => goal.category === "emotional").map((goal) => (
                      <option key={goal.id} value={goal.id}>
                        {goal.label}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="⚖️ EQUILIBRIO TOTAL">
                    {GOALS.filter((goal) => goal.category === "holistic").map((goal) => (
                      <option key={goal.id} value={goal.id}>
                        {goal.label}
                      </option>
                    ))}
                  </optgroup>
                </select>
                <div className="space-y-4">
                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                    type="password"
                    placeholder="Código de acceso (10 dígitos)"
                    maxLength={10}
                    value={registerForm.accessCode}
                    onChange={(e) => setRegisterForm((prev) => ({ ...prev, accessCode: e.target.value }))}
                  />
                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                    type="password"
                    placeholder="Confirmar código"
                    maxLength={10}
                    value={registerForm.confirmCode}
                    onChange={(e) => setRegisterForm((prev) => ({ ...prev, confirmCode: e.target.value }))}
                  />
                </div>
                <button
                  onClick={handleRegister}
                  className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 disabled:bg-gray-400 flex items-center justify-center gap-2 transition-colors text-sm"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Icons.Loader2 size="text-sm" />
                      Creando cuenta...
                    </>
                  ) : (
                    "Crear cuenta"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Modal de acceso administrador */}
        {showAdminLogin && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-4">
            <div className="relative top-20 mx-auto border w-full max-w-sm shadow-lg rounded-md bg-white">
              <div className="p-5">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Acceso Administrador</h3>
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-sm"
                  type="password"
                  placeholder="Código de acceso"
                  value={adminCode}
                  onChange={(e) => setAdminCode(e.target.value)}
                />
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleAdminLogin}
                    className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 text-sm"
                  >
                    Ingresar
                  </button>
                  <button
                    onClick={() => {
                      setShowAdminLogin(false)
                      setAdminCode("")
                      setLogoClicks(0)
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
      </div>
    )
  }

  // ============================================================================
  // APLICACIÓN PRINCIPAL RESPONSIVE
  // ============================================================================
  const activeTips = globalTips.filter((tip) => tip.is_active)
  const mindfulnessResources = globalResources.filter((r) => r.type === "mindfulness" && r.is_active)
  const nutritionResources = globalResources.filter((r) => r.type === "nutrition" && r.is_active)
  const exerciseResources = globalResources.filter((r) => r.type === "exercise" && r.is_active)
  const caloriesProgress = getCaloriesProgress()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pb-20">
      <SaveStatusIndicator />
      <FloatingActionButtons />

      {/* Header responsive */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-30">
        <div className="px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-2xl font-bold text-green-600">VitalMente</h1>
              <span className="hidden sm:inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">🤖 IA</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="sm:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <Icons.Menu size="text-xl" />
              </button>
              <button
                onClick={handleLogout}
                className="hidden sm:flex px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 items-center gap-2 text-sm"
              >
                <Icons.LogOut size="text-sm" />
                Salir
              </button>
            </div>
          </div>
        </div>

        {/* Menú móvil desplegable */}
        {showMobileMenu && (
          <div className="sm:hidden bg-white border-t p-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-50 rounded-lg text-sm"
            >
              <Icons.LogOut size="text-sm" />
              Cerrar Sesión
            </button>
          </div>
        )}
      </header>

      {/* Contenido principal */}
      <main className="px-4 py-6">
        {activeTab === "inicio" && (
          <div className="space-y-4">
            {/* Bienvenida */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-base sm:text-lg font-semibold mb-2 flex items-center gap-2">
                ¡Hola, {currentUser?.name}! <Icons.Magic size="text-lg" />
              </h2>
              <p className="text-gray-600 text-sm">{getMotivationalMessage(currentUser?.goal || "reduce_stress")}</p>
            </div>

            {/* Panel de gamificación */}
            <GamificationPanel />

            {/* Progreso diario */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold flex items-center gap-2">
                  <Icons.Target size="text-lg" />
                  Progreso Diario
                </h3>
                <span className="text-xs text-gray-600">
                  {getProgressPercentage()}% <Icons.CheckCircle size="text-sm" />
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Agua */}
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Icons.Droplets size="text-2xl" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Agua</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => updateProgress("water", -1)}
                        className="p-1 rounded-full hover:bg-blue-100 transition-colors"
                      >
                        <Icons.Minus size="text-sm" />
                      </button>
                      <span className="text-lg font-bold min-w-[2rem] text-center">{dailyProgress.water}</span>
                      <button
                        onClick={() => updateProgress("water", 1)}
                        className="p-1 rounded-full hover:bg-blue-100 transition-colors"
                      >
                        <Icons.Plus size="text-sm" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Ejercicio */}
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <Icons.Activity size="text-2xl" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Ejercicio</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => updateProgress("exercise", -1)}
                        className="p-1 rounded-full hover:bg-green-100 transition-colors"
                      >
                        <Icons.Minus size="text-sm" />
                      </button>
                      <span className="text-lg font-bold min-w-[2rem] text-center">{dailyProgress.exercise}</span>
                      <button
                        onClick={() => updateProgress("exercise", 1)}
                        className="p-1 rounded-full hover:bg-green-100 transition-colors"
                      >
                        <Icons.Plus size="text-sm" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Mindfulness */}
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                  <Icons.Brain size="text-2xl" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Mindfulness</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => updateProgress("mindfulness", -1)}
                        className="p-1 rounded-full hover:bg-purple-100 transition-colors"
                      >
                        <Icons.Minus size="text-sm" />
                      </button>
                      <span className="text-lg font-bold min-w-[2rem] text-center">{dailyProgress.mindfulness}</span>
                      <button
                        onClick={() => updateProgress("mindfulness", 1)}
                        className="p-1 rounded-full hover:bg-purple-100 transition-colors"
                      >
                        <Icons.Plus size="text-sm" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips del día */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <Icons.Lightbulb size="text-lg" />
                Tip del día
              </h3>
              {activeTips.length > 0 ? (
                <>
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{activeTips[currentTipIndex].icon}</span>
                      <span className="font-medium text-sm">{activeTips[currentTipIndex].category}</span>
                    </div>
                    <h4 className="font-semibold text-sm mb-1">{activeTips[currentTipIndex].title}</h4>
                    <p className="text-gray-600 text-sm">{activeTips[currentTipIndex].content}</p>
                  </div>
                  <div className="flex justify-between">
                    <button
                      onClick={() => setCurrentTipIndex((prev) => (prev === 0 ? activeTips.length - 1 : prev - 1))}
                      className="px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 rounded-lg flex items-center gap-1"
                    >
                      <Icons.ChevronLeft size="text-sm" /> Anterior
                    </button>
                    <button
                      onClick={() => setCurrentTipIndex((prev) => (prev === activeTips.length - 1 ? 0 : prev + 1))}
                      className="px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 rounded-lg flex items-center gap-1"
                    >
                      Siguiente <Icons.ChevronRight size="text-sm" />
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-gray-500 text-sm">No hay tips disponibles.</p>
              )}
            </div>

            {/* Recomendaciones IA */}
            {aiRecommendations.length > 0 && (
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                  <Icons.Robot size="text-lg" />
                  Recomendaciones IA
                </h3>
                {aiRecommendations.map((rec) => (
                  <div key={rec.id} className="border border-gray-200 rounded-lg p-3 mb-3">
                    <h4 className="font-semibold text-sm mb-1">{rec.reason}</h4>
                    <p className="text-xs text-gray-600 mb-2">Suplementos: {rec.supplement_names.join(", ")}</p>
                    <button
                      onClick={() => setActiveTab("suplementos")}
                      className="px-3 py-2 text-xs text-blue-600 hover:bg-blue-50 rounded-lg flex items-center gap-1"
                    >
                      Ver más <Icons.ExternalLink size="text-xs" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "comida" && (
          <div className="space-y-4">
            {/* Resumen de calorías */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <Icons.UtensilsCrossed size="text-lg" />
                Resumen Nutricional
              </h3>
              {macroResults ? (
                <>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-medium">Calorías</p>
                    <p className="text-lg font-bold">
                      {caloriesProgress.consumed} / {caloriesProgress.target}
                    </p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div
                      className="bg-green-500 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${caloriesProgress.percentage}%` }}
                    ></div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-2 bg-red-50 rounded-lg">
                      <p className="text-xs font-medium">Proteína</p>
                      <p className="text-sm font-bold">{consumedMacros.protein}g</p>
                      <p className="text-xs text-gray-500">
                        {Math.round((consumedMacros.protein / macroResults.protein) * 100)}%
                      </p>
                    </div>
                    <div className="p-2 bg-yellow-50 rounded-lg">
                      <p className="text-xs font-medium">Carbos</p>
                      <p className="text-sm font-bold">{consumedMacros.carbs}g</p>
                      <p className="text-xs text-gray-500">
                        {Math.round((consumedMacros.carbs / macroResults.carbs) * 100)}%
                      </p>
                    </div>
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <p className="text-xs font-medium">Grasas</p>
                      <p className="text-sm font-bold">{consumedMacros.fats}g</p>
                      <p className="text-xs text-gray-500">
                        {Math.round((consumedMacros.fats / macroResults.fats) * 100)}%
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-gray-500 text-sm">Calculando macros...</p>
              )}
            </div>

            {/* Comidas del día */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <Icons.ChefHat size="text-lg" />
                Comidas de Hoy
              </h3>
              <div className="space-y-4">
                {/* Desayuno */}
                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-sm flex items-center gap-2">
                      <Icons.UtensilsCrossed size="text-sm" /> Desayuno
                    </h4>
                    <button
                      onClick={() => openMealCalculator("desayuno")}
                      className="px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded-lg flex items-center gap-1"
                    >
                      <Icons.Plus size="text-xs" /> Agregar
                    </button>
                  </div>
                  <div className="space-y-2">
                    {mealCompositions
                      .filter((c) => c.meal_type === "desayuno")
                      .map((composition) => (
                        <div key={composition.id} className="flex items-center justify-between text-xs">
                          <div>
                            <p className="font-medium">{composition.food_name}</p>
                            <p className="text-gray-500">
                              {composition.quantity_grams}g - {composition.calories_consumed} cal
                            </p>
                          </div>
                          <button
                            onClick={() => removeFoodFromMeal(composition.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Icons.Trash2 size="text-xs" />
                          </button>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Almuerzo */}
                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-sm flex items-center gap-2">
                      <Icons.UtensilsCrossed size="text-sm" /> Almuerzo
                    </h4>
                    <button
                      onClick={() => openMealCalculator("almuerzo")}
                      className="px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded-lg flex items-center gap-1"
                    >
                      <Icons.Plus size="text-xs" /> Agregar
                    </button>
                  </div>
                  <div className="space-y-2">
                    {mealCompositions
                      .filter((c) => c.meal_type === "almuerzo")
                      .map((composition) => (
                        <div key={composition.id} className="flex items-center justify-between text-xs">
                          <div>
                            <p className="font-medium">{composition.food_name}</p>
                            <p className="text-gray-500">
                              {composition.quantity_grams}g - {composition.calories_consumed} cal
                            </p>
                          </div>
                          <button
                            onClick={() => removeFoodFromMeal(composition.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Icons.Trash2 size="text-xs" />
                          </button>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Cena */}
                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-sm flex items-center gap-2">
                      <Icons.UtensilsCrossed size="text-sm" /> Cena
                    </h4>
                    <button
                      onClick={() => openMealCalculator("cena")}
                      className="px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded-lg flex items-center gap-1"
                    >
                      <Icons.Plus size="text-xs" /> Agregar
                    </button>
                  </div>
                  <div className="space-y-2">
                    {mealCompositions
                      .filter((c) => c.meal_type === "cena")
                      .map((composition) => (
                        <div key={composition.id} className="flex items-center justify-between text-xs">
                          <div>
                            <p className="font-medium">{composition.food_name}</p>
                            <p className="text-gray-500">
                              {composition.quantity_grams}g - {composition.calories_consumed} cal
                            </p>
                          </div>
                          <button
                            onClick={() => removeFoodFromMeal(composition.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Icons.Trash2 size="text-xs" />
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "recursos" && (
          <div className="space-y-4">
            {/* Recursos de mindfulness */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <Icons.Brain size="text-lg" />
                Mindfulness
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mindfulnessResources.map((resource) => (
                  <a
                    key={resource.id}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <img
                      src={resource.image_url || getResourceThumbnail(resource.url, resource.type)}
                      alt={resource.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-3">
                      <h4 className="font-semibold text-sm mb-1">{resource.title}</h4>
                      <p className="text-xs text-gray-600">{resource.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Recursos de nutrición */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <Icons.UtensilsCrossed size="text-lg" />
                Nutrición
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {nutritionResources.map((resource) => (
                  <a
                    key={resource.id}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <img
                      src={resource.image_url || getResourceThumbnail(resource.url, resource.type)}
                      alt={resource.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-3">
                      <h4 className="font-semibold text-sm mb-1">{resource.title}</h4>
                      <p className="text-xs text-gray-600">{resource.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Recursos de ejercicio */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <Icons.Dumbbell size="text-lg" />
                Ejercicio
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {exerciseResources.map((resource) => (
                  <a
                    key={resource.id}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <img
                      src={resource.image_url || getResourceThumbnail(resource.url, resource.type)}
                      alt={resource.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-3">
                      <h4 className="font-semibold text-sm mb-1">{resource.title}</h4>
                      <p className="text-xs text-gray-600">{resource.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "suplementos" && (
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <Icons.Package size="text-lg" />
                Suplementos
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {supplements.map((supplement) => (
                  <div key={supplement.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={supplement.image_url || "/placeholder.svg?height=200&width=200"}
                      alt={supplement.name}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-3">
                      <h4 className="font-semibold text-sm mb-1">{supplement.name}</h4>
                      <p className="text-xs text-gray-600 mb-2">{supplement.description}</p>
                      <p className="text-sm font-medium text-green-600 mb-2">${supplement.price.toLocaleString()}</p>
                      <ul className="text-xs text-gray-500 mb-3 space-y-1">
                        {supplement.benefits.slice(0, 3).map((benefit, index) => (
                          <li key={index}>• {benefit}</li>
                        ))}
                      </ul>
                      <button
                        onClick={() => handleSupplementContact(supplement)}
                        className="w-full px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2 text-sm"
                      >
                        <Icons.MessageSquare size="text-sm" />
                        Contactar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Navegación inferior fija */}
      <nav className="bg-white border-t shadow-lg fixed bottom-0 left-0 w-full z-30">
        <div className="px-4">
          <div className="h-16 flex justify-between">
            <button
              onClick={() => setActiveTab("inicio")}
              className={`flex-1 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors ${
                activeTab === "inicio" ? "text-green-600" : "text-gray-500"
              }`}
            >
              <Icons.Home size="text-xl" />
              <span className="text-xs mt-1">Inicio</span>
            </button>
            <button
              onClick={() => setActiveTab("comida")}
              className={`flex-1 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors ${
                activeTab === "comida" ? "text-green-600" : "text-gray-500"
              }`}
            >
              <Icons.UtensilsCrossed size="text-xl" />
              <span className="text-xs mt-1">Comida</span>
            </button>
            <button
              onClick={() => setActiveTab("recursos")}
              className={`flex-1 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors ${
                activeTab === "recursos" ? "text-green-600" : "text-gray-500"
              }`}
            >
              <Icons.Link size="text-xl" />
              <span className="text-xs mt-1">Recursos</span>
            </button>
            <button
              onClick={() => setActiveTab("suplementos")}
              className={`flex-1 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors ${
                activeTab === "suplementos" ? "text-green-600" : "text-gray-500"
              }`}
            >
              <Icons.Package size="text-xl" />
              <span className="text-xs mt-1">Tienda</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Modal de calculadora de comida - Responsive */}
      {showMealCalculator && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-4">
          <div className="relative top-4 mx-auto border w-full max-w-md shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Agregar a {selectedMealType}</h3>
                <button onClick={() => setShowMealCalculator(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  <Icons.X size="text-lg" />
                </button>
              </div>

              {/* Selector de comida */}
              <div className="mb-4">
                <h4 className="font-semibold mb-3 text-sm">Seleccionar alimento</h4>
                <div className="space-y-3">
                  {getFoodsByCategory().map((category) => (
                    <div key={category.id}>
                      <h5 className="font-medium flex items-center gap-2 text-sm mb-2">
                        {category.icon} {category.name}
                      </h5>
                      <div className="grid grid-cols-2 gap-2">
                        {category.foods.map((food) => (
                          <button
                            key={food.id}
                            onClick={() => selectFood(food)}
                            className={`px-3 py-2 text-xs border rounded-lg hover:bg-gray-50 transition-colors text-left ${
                              selectedFood?.id === food.id ? "border-green-500 bg-green-50" : "border-gray-300"
                            }`}
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

              {/* Selector de cantidad */}
              {selectedFood && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2 text-sm">
                    {selectedFood.name} - {selectedFood.calories} cal/100g
                  </h4>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      className="flex-1 p-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="Cantidad"
                      value={foodQuantity}
                      onChange={(e) => setFoodQuantity(e.target.value)}
                    />
                    <span className="text-sm text-gray-600">gramos</span>
                  </div>
                  {foodQuantity && (
                    <div className="mt-2 text-xs text-gray-600">
                      Calorías: {Math.round((Number(selectedFood.calories) * Number(foodQuantity)) / 100)} cal
                    </div>
                  )}
                </div>
              )}

              {/* Botones de acción */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={addFoodToMeal}
                  className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 disabled:bg-gray-400 text-sm"
                  disabled={!selectedFood || !foodQuantity}
                >
                  Agregar
                </button>
                <button
                  onClick={() => setShowMealCalculator(false)}
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
