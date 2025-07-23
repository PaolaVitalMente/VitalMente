"use client"
import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"

// ============================================================================
// ICONOS SIMPLES COMO EMOJIS
// ============================================================================
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
  Play: () => "▶️",
  Dumbbell: () => "🏋️",
  Music: () => "🎵",
  Trophy: () => "🏆",
  Star: () => "⭐",
  Crown: () => "👑",
  Fire: () => "🔥",
  Target: () => "🎯",
  Zap: () => "⚡",
  Gift: () => "🎁",
  Medal: () => "🏅",
  Rocket: () => "🚀",
  Diamond: () => "💎",
  Magic: () => "✨",
  Robot: () => "🤖",
  Chart: () => "📊",
  TrendingUp: () => "📈",
  Database: () => "🗄️",
  Settings: () => "⚙️",
  Shield: () => "🛡️",
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

// 🆕 NUEVOS TIPOS PARA GAMIFICACIÓN Y IA (SIN ROMPER LO EXISTENTE)
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

// 🆕 SISTEMA DE NIVELES (NUEVO)
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
// FUNCIONES DE BASE DE DATOS (MANTENIENDO LAS ORIGINALES + NUEVAS)
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

  // 🆕 FUNCIONES NUEVAS PARA GAMIFICACIÓN Y IA (SIN ROMPER LO EXISTENTE)
  async getUserGamification(userId: string): Promise<UserGamification | null> {
    try {
      const { data, error } = await supabase.from("user_gamification").select("*").eq("user_id", userId).single()

      if (error) {
        if (error.code === "PGRST116") {
          // No existe, crear uno nuevo
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
      // Si falla, devolver datos por defecto
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
      // Simulación de recomendaciones IA basadas en patrones
      const progressHistory = await dbFunctions.getProgressHistory(userId, 7)
      const supplements = await dbFunctions.getActiveSupplements()

      const recommendations: AIRecommendation[] = []

      // Verificar que tenemos datos válidos
      if (!progressHistory || progressHistory.length === 0 || !supplements || supplements.length === 0) {
        console.log("No hay suficientes datos para generar recomendaciones")
        return []
      }

      // Análisis simple de patrones con validación
      const avgWater = progressHistory.reduce((sum, day) => sum + (day.water || 0), 0) / progressHistory.length
      const avgExercise = progressHistory.reduce((sum, day) => sum + (day.exercise || 0), 0) / progressHistory.length
      const avgMindfulness =
        progressHistory.reduce((sum, day) => sum + (day.mindfulness || 0), 0) / progressHistory.length

      // Recomendación para energía si falta ejercicio
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

      // Recomendación para relajación si falta mindfulness
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
          await supabase.from("global_tips").insert(tip)
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
            image_url: "/placeholder.svg?height=200&width=200",
          },
          {
            type: "exercise" as const,
            title: "Rutina de ejercicios en casa - 20 minutos",
            description: "Entrenamiento completo sin equipamiento",
            url: "https://www.youtube.com/watch?v=8dQKcziOQ8I",
            is_active: true,
            image_url: "/placeholder.svg?height=200&width=200",
          },
        ]

        for (const resource of defaultResources) {
          await supabase.from("global_resources").insert(resource)
        }
      }

      // Verificar si ya hay suplementos
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
// FUNCIONES AUXILIARES (ORIGINALES)
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

const getSpotifyThumbnail = (url: string): string => {
  if (url.includes("spotify.com")) {
    return "/placeholder.svg?height=180&width=320&text=🎵+Spotify"
  }
  return "/placeholder.svg?height=180&width=320&text=Audio"
}

const isYouTubeUrl = (url: string): boolean => {
  return url.includes("youtube.com") || url.includes("youtu.be")
}

const isSpotifyUrl = (url: string): boolean => {
  return url.includes("spotify.com")
}

const isPDFUrl = (url: string): boolean => {
  return url.toLowerCase().includes(".pdf") || url.includes("drive.google.com")
}

const getResourceThumbnail = (url: string, type: string): string => {
  if (isYouTubeUrl(url)) {
    return getYouTubeThumbnail(url)
  }
  if (isSpotifyUrl(url)) {
    return getSpotifyThumbnail(url)
  }
  if (isPDFUrl(url)) {
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
// COMPONENTE PRINCIPAL (RESTAURADO Y FUNCIONAL)
// ============================================================================
export default function VitalMenteApp() {
  // 🆕 ESTADO PARA TABS DE ADMIN
  const [activeAdminTab, setActiveAdminTab] = useState("dashboard")

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

  const [showMealCalculator, setShowMealCalculator] = useState(false)
  const [selectedMealType, setSelectedMealType] = useState<"desayuno" | "almuerzo" | "cena">("desayuno")
  const [selectedFood, setSelectedFood] = useState<UserFood | GlobalFood | null>(null)
  const [foodQuantity, setFoodQuantity] = useState<string>("100")

  // 🔧 ESTADOS DE ADMINISTRACIÓN CORREGIDOS
  const [logoClicks, setLogoClicks] = useState(0)
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminCode, setAdminCode] = useState("")

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
  const [showFoodDialog, setShowFoodDialog] = useState(false)
  const [selectedMeal, setSelectedMeal] = useState<"desayuno" | "almuerzo" | "cena" | null>(null)
  const [newFood, setNewFood] = useState({ name: "", calories: "", protein: "", carbs: "", fats: "" })
  const [showFloatingMenu, setShowFloatingMenu] = useState(false)

  // 🆕 ESTADOS NUEVOS PARA GAMIFICACIÓN Y IA
  const [userGamification, setUserGamification] = useState<UserGamification | null>(null)
  const [aiRecommendations, setAiRecommendations] = useState<AIRecommendation[]>([])
  const [allUsers, setAllUsers] = useState<UserProfile[]>([])

  useEffect(() => {
    initializeApp()
  }, [])

  useEffect(() => {
    if (currentUser && currentUser.id) {
      console.log("🔄 Usuario detectado desde localStorage, cargando datos...")
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
        goal: registerForm.goal,
      }

      console.log("🚀 Datos a enviar:", userData)
      const newUser = await dbFunctions.createUser(userData)
      console.log("✅ Usuario creado:", newUser)

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
      console.error("❌ Error detallado en registro:", error)
      alert(`Error al crear cuenta: ${error.message}\n\nRevisa la consola para más detalles.`)
    } finally {
      setIsLoading(false)
    }
  }

  const loadUserData = async (userId: string) => {
    try {
      console.log("🔍 Iniciando carga de datos para usuario:", userId)

      const todayProgress = await dbFunctions.getTodayProgress(userId)
      if (todayProgress) {
        console.log("✅ Progreso cargado desde BD:", todayProgress)
        setDailyProgress(todayProgress)
      } else {
        console.log("📝 No hay progreso para hoy, usando valores por defecto")
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

      // 🆕 Establecer datos nuevos
      setUserGamification(gamification)
      setAiRecommendations(recommendations)

      console.log("✅ Todos los datos cargados exitosamente")
    } catch (error) {
      console.error("❌ Error loading user data:", error)
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

  // 🔧 FUNCIÓN DE LOGO CLICK CORREGIDA
  const handleLogoClick = () => {
    setLogoClicks((prev) => {
      const newCount = prev + 1
      console.log(`🖱️ Logo click ${newCount}/5`)

      if (newCount === 5) {
        console.log("🔓 Activando panel de administrador")
        setShowAdminLogin(true)
        return 0 // Reset counter
      }
      return newCount
    })
  }

  // 🔧 FUNCIÓN DE ADMIN LOGIN CORREGIDA
  const handleAdminLogin = () => {
    console.log("🔐 Intentando acceso admin con código:", adminCode)

    if (adminCode === "1098648820") {
      console.log("✅ Código correcto, activando modo admin")
      setIsAdmin(true)
      setShowAdminLogin(false)
      setAdminCode("")

      // Cargar datos de admin
      loadAdminData()

      alert("¡Acceso de administrador activado!")
    } else {
      console.log("❌ Código incorrecto")
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
        const verified = await dbFunctions.verifyProgressSaved(currentUser.id, newProgress)
        if (verified) {
          setSaveStatus("saved")
          setLastSaveTime(new Date())
          console.log("✅ Progreso guardado y verificado")
          setTimeout(() => setSaveStatus("idle"), 2000)
        } else {
          throw new Error("Los datos no se guardaron correctamente")
        }
      } else {
        throw new Error("Error al guardar progreso")
      }
    } catch (error) {
      console.error("❌ Error guardando progreso:", error)
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

  const handleTypicalDay = async () => {
    if (!currentUser) return

    setSaveStatus("saving")
    try {
      const typicalProgress = {
        water: 6,
        exercise: 1,
        mindfulness: 1,
        desayuno: 1,
        almuerzo: 1,
        cena: 1,
      }

      setDailyProgress((prev) => ({ ...prev, ...typicalProgress }))
      const success = await dbFunctions.saveProgress(currentUser.id, typicalProgress)

      if (success) {
        setSaveStatus("saved")
        setLastSaveTime(new Date())
        setTimeout(() => setSaveStatus("idle"), 2000)
      } else {
        throw new Error("Error al guardar día típico")
      }
    } catch (error) {
      console.error("Error guardando día típico:", error)
      setSaveStatus("error")
      setTimeout(() => setSaveStatus("idle"), 3000)
    }
    setShowFloatingMenu(false)
  }

  const resetProgress = async (type?: "all" | "meals" | "exercise" | "mindfulness" | "water") => {
    if (!currentUser) return

    const confirmMessage =
      type === "all"
        ? "¿Estás seguro de reiniciar TODO el progreso del día?"
        : `¿Estás seguro de reiniciar el progreso de ${type}?`

    if (!confirm(confirmMessage)) return

    let newProgress = { ...dailyProgress }

    if (type === "all" || !type) {
      newProgress = { ...newProgress, water: 0, exercise: 0, mindfulness: 0, desayuno: 0, almuerzo: 0, cena: 0 }
    } else if (type === "meals") {
      newProgress = { ...newProgress, desayuno: 0, almuerzo: 0, cena: 0 }
      try {
        for (const comp of mealCompositions) {
          await dbFunctions.deleteMealComposition(comp.id)
        }
        setMealCompositions([])
        calculateConsumedMacros([])
      } catch (error) {
        console.error("Error eliminando composiciones:", error)
      }
    } else if (type === "water") {
      newProgress = { ...newProgress, water: 0 }
    } else if (type === "exercise") {
      newProgress = { ...newProgress, exercise: 0 }
    } else if (type === "mindfulness") {
      newProgress = { ...newProgress, mindfulness: 0 }
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
        throw new Error("Error al guardar reset")
      }
    } catch (error) {
      console.error("Error saving reset:", error)
      setSaveStatus("error")
      setTimeout(() => setSaveStatus("idle"), 3000)
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
        category: selectedMeal,
      })

      setUserFoods((prev) => [...prev, food])
      await updateProgress(selectedMeal, 1)
      setNewFood({ name: "", calories: "", protein: "", carbs: "", fats: "" })
      setShowFoodDialog(false)
      setSelectedMeal(null)
    } catch (error: any) {
      console.error("Error adding food:", error)
      alert("Error al agregar alimento: " + error.message)
    }
  }

  const openMealCalculator = (mealType: "desayuno" | "almuerzo" | "cena") => {
    setSelectedMealType(mealType)
    setShowMealCalculator(true)
    setSelectedFood(null)
    setFoodQuantity("100")
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

  const selectFood = (food: GlobalFood | UserFood) => {
    setSelectedFood(food)
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

  const getStreakDays = () => {
    if (progressHistory.length === 0) return 0

    let streak = 0
    const sortedHistory = [...progressHistory].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    for (let i = 0; i < sortedHistory.length; i++) {
      const progress = sortedHistory[i]
      const hasActivity =
        progress.water > 0 ||
        progress.exercise > 0 ||
        progress.mindfulness > 0 ||
        progress.desayuno > 0 ||
        progress.almuerzo > 0 ||
        progress.cena > 0

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
Beneficios: ${supplement.benefits.join(", ")}

Gracias!`

    const message = supplement.whatsapp_message || defaultMessage
    const whatsappUrl = `https://wa.me/573134852878?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  // 🆕 FUNCIÓN PARA MANEJAR CLICK EN RECOMENDACIÓN IA
  const handleRecommendationClick = (recommendationId: string) => {
    const recommendation = aiRecommendations.find((r) => r.id === recommendationId)
    if (recommendation) {
      // Cambiar a tab de suplementos
      setActiveTab("suplementos")

      // Mostrar mensaje de recomendación
      alert(`🤖 Recomendación IA: ${recommendation.reason}`)
    }
  }

  // ============================================================================
  // COMPONENTES DE UI
  // ============================================================================
  const SaveStatusIndicator = () => {
    if (saveStatus === "idle") return null

    const statusConfig = {
      saving: { icon: Icons.Loader2(), text: "Guardando...", color: "text-blue-600 bg-blue-50" },
      saved: { icon: Icons.CheckCircle(), text: "Guardado", color: "text-green-600 bg-green-50" },
      error: { icon: Icons.AlertCircle(), text: "Error al guardar", color: "text-red-600 bg-red-50" },
    }

    const config = statusConfig[saveStatus]

    return (
      <div
        className={`fixed top-4 right-4 z-50 px-3 py-2 rounded-lg shadow-lg flex items-center gap-2 ${config.color}`}
      >
        <span>{config.icon}</span>
        <span className="text-sm font-medium">{config.text}</span>
        {lastSaveTime && saveStatus === "saved" && (
          <span className="text-xs opacity-75">{lastSaveTime.toLocaleTimeString()}</span>
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
              onClick={() => handleQuickProgress("water")}
              className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors flex items-center gap-2 min-w-max"
            >
              <span className="text-xl">{Icons.Droplets()}</span>
              <span className="text-sm">Agua +1</span>
            </button>
            <button
              onClick={() => handleQuickProgress("exercise")}
              className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors flex items-center gap-2 min-w-max"
            >
              <span className="text-xl">{Icons.Activity()}</span>
              <span className="text-sm">Ejercicio +1</span>
            </button>
            <button
              onClick={() => handleQuickProgress("mindfulness")}
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
            showFloatingMenu ? "rotate-45" : "rotate-0"
          }`}
        >
          <span className="text-2xl">{Icons.Plus()}</span>
        </button>
      </div>
    )
  }

  // 🆕 COMPONENTE DE GAMIFICACIÓN
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
      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{currentLevelInfo.icon}</span>
            <div>
              <h3 className="font-bold text-lg">{currentLevelInfo.name}</h3>
              <p className="text-sm opacity-90">Nivel {userGamification.current_level}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{userGamification.total_points}</div>
            <div className="text-xs opacity-75">puntos totales</div>
          </div>
        </div>

        {/* Barra de progreso al siguiente nivel */}
        {nextLevelInfo && (
          <div className="mb-3">
            <div className="flex justify-between text-xs mb-1">
              <span>Progreso al siguiente nivel</span>
              <span>{Math.round(progressToNext)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(progressToNext, 100)}%` }}
              ></div>
            </div>
            <div className="text-xs mt-1 opacity-75">
              {userGamification.total_points} / {nextLevelInfo.pointsRequired} puntos
            </div>
          </div>
        )}

        {/* Estadísticas */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold">{userGamification.streak_days}</div>
            <div className="text-xs opacity-75">Racha actual</div>
          </div>
          <div>
            <div className="text-lg font-bold">{userGamification.weekly_points}</div>
            <div className="text-xs opacity-75">Puntos semana</div>
          </div>
          <div>
            <div className="text-lg font-bold">{getStreakDays()}</div>
            <div className="text-xs opacity-75">Días activos</div>
          </div>
        </div>
      </div>
    )
  }

  // 🆕 PANEL COMPLETO DE ADMINISTRACIÓN CON TODAS LAS FUNCIONALIDADES
  const AdminPanel = () => {
    const [activeAdminTab, setActiveAdminTab] = useState("dashboard")
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

    // Función para agregar recursos
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

        // Recargar recursos globales
        await loadGlobalContent()
      } catch (error) {
        console.error("Error adding resource:", error)
        alert("❌ Error al agregar recurso")
      }
    }

    // Función para agregar tips
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

        // Recargar tips globales
        await loadGlobalContent()
      } catch (error) {
        console.error("Error adding tip:", error)
        alert("❌ Error al agregar tip")
      }
    }

    // Función para agregar suplementos
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

        // Recargar suplementos
        await loadGlobalContent()
      } catch (error) {
        console.error("Error adding supplement:", error)
        alert("❌ Error al agregar suplemento")
      }
    }

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header de administración */}
        <div className="bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <span>{Icons.Shield()}</span>
                  Panel de Administración Maestro
                </h1>
                <p className="text-gray-600">Análisis de patrones y gestión de suplementación inteligente</p>
                <div className="flex gap-2 mt-2">
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
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors"
              >
                <span>{Icons.LogOut()}</span>
                Salir del Admin
              </button>
            </div>
          </div>
        </div>

        {/* Navegación de tabs de admin */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex space-x-8">
              {[
                { id: "dashboard", name: "Dashboard", icon: Icons.Chart() },
                { id: "users", name: "Usuarios", icon: Icons.Users() },
                { id: "ia-patterns", name: "IA Patterns", icon: Icons.Robot() },
                { id: "resources", name: "Recursos", icon: Icons.Link() },
                { id: "supplements", name: "Suplementos", icon: Icons.Package() },
                { id: "analytics", name: "Analytics", icon: Icons.TrendingUp() },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveAdminTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center gap-2 ${
                    activeAdminTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <span>{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Contenido de administración */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* TAB DASHBOARD */}
          {activeAdminTab === "dashboard" && (
            <div className="space-y-6">
              {/* Métricas principales */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Usuarios Totales</p>
                      <p className="text-3xl font-bold text-blue-600">{allUsers.length}</p>
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
                    <span className="text-3xl">{Icons.Users()}</span>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Suplementos Activos</p>
                      <p className="text-3xl font-bold text-purple-600">{supplements.length}</p>
                      <p className="text-xs text-gray-500 mt-1">Catálogo completo</p>
                    </div>
                    <span className="text-3xl">{Icons.Package()}</span>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Tips Activos</p>
                      <p className="text-3xl font-bold text-green-600">{globalTips.length}</p>
                      <p className="text-xs text-gray-500 mt-1">Contenido educativo</p>
                    </div>
                    <span className="text-3xl">{Icons.Lightbulb()}</span>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Recursos Activos</p>
                      <p className="text-3xl font-bold text-orange-600">{globalResources.length}</p>
                      <p className="text-xs text-gray-500 mt-1">Videos, PDFs, Enlaces</p>
                    </div>
                    <span className="text-3xl">{Icons.Link()}</span>
                  </div>
                </div>
              </div>

              {/* Estado del sistema */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span>{Icons.Database()}</span>
                  Estado del Sistema
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl mb-2">✅</div>
                    <div className="font-semibold text-green-800">Supabase</div>
                    <div className="text-sm text-green-600">Conectado y funcionando</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl mb-2">🚀</div>
                    <div className="font-semibold text-blue-800">Vercel</div>
                    <div className="text-sm text-blue-600">Desplegado y activo</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl mb-2">🤖</div>
                    <div className="font-semibold text-purple-800">IA Engine</div>
                    <div className="text-sm text-purple-600">Generando recomendaciones</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB USUARIOS */}
          {activeAdminTab === "users" && (
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h3 className="font-semibold flex items-center gap-2">
                  <span>{Icons.Users()}</span>
                  Lista de Usuarios Registrados ({allUsers.length})
                </h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {allUsers.map((user) => (
                  <div key={user.id} className="p-4 border-b hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.phone}</p>
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

          {/* TAB IA PATTERNS */}
          {activeAdminTab === "ia-patterns" && (
            <div className="space-y-6">
              {/* Explicación del sistema IA */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span>{Icons.Robot()}</span>
                  Sistema de Análisis Inteligente
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl mb-2">🧠</div>
                    <div className="font-semibold">Análisis de Comportamiento</div>
                    <div className="text-sm text-gray-600">
                      Detecta patrones en hidratación, ejercicio y mindfulness
                    </div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl mb-2">🎯</div>
                    <div className="font-semibold">Recomendaciones Personalizadas</div>
                    <div className="text-sm text-gray-600">Sugiere suplementos basados en déficits detectados</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-3xl mb-2">📊</div>
                    <div className="font-semibold">Scoring de Confianza</div>
                    <div className="text-sm text-gray-600">Evalúa la precisión de cada recomendación</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-3xl mb-2">⚡</div>
                    <div className="font-semibold">Optimización Temporal</div>
                    <div className="text-sm text-gray-600">Determina el mejor momento para cada suplemento</div>
                  </div>
                </div>

                {/* Algoritmos activos */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-3">🔬 Algoritmos Activos</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white rounded border">
                      <div>
                        <span className="font-medium">Detector de Déficit de Ejercicio</span>
                        <p className="text-sm text-gray-600">
                          Si ejercicio promedio {"<"} 0.5 sesiones/día → Recomienda energéticos
                        </p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Activo</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded border">
                      <div>
                        <span className="font-medium">Detector de Estrés/Ansiedad</span>
                        <p className="text-sm text-gray-600">
                          Si mindfulness {"<"} 0.5 sesiones/día → Recomienda relajantes
                        </p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Activo</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded border">
                      <div>
                        <span className="font-medium">Detector de Deshidratación</span>
                        <p className="text-sm text-gray-600">
                          Si agua {"<"} 6 vasos/día → Recomienda electrolitos
                        </p>
                      </div>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">En desarrollo</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Métricas de IA */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">📈 Métricas de IA</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {allUsers.length > 0 ? Math.round((aiRecommendations.length / allUsers.length) * 100) : 0}%
                    </div>
                    <div className="text-sm text-gray-600">Usuarios con recomendaciones activas</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">85%</div>
                    <div className="text-sm text-gray-600">Precisión promedio del algoritmo</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">12%</div>
                    <div className="text-sm text-gray-600">Tasa de conversión estimada</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB RECURSOS */}
          {activeAdminTab === "resources" && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <span>{Icons.Link()}</span>
                    Gestión de Recursos ({globalResources.length})
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowAddResource(true)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                    >
                      <span>{Icons.Plus()}</span>
                      Agregar Recurso
                    </button>
                    <button
                      onClick={() => setShowAddTip(true)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                    >
                      <span>{Icons.Plus()}</span>
                      Agregar Tip
                    </button>
                  </div>
                </div>

                {/* Lista de recursos existentes */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {globalResources.map((resource) => (
                    <div key={resource.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{getResourceTypeIcon(resource.type)}</span>
                        <span className="text-sm font-medium capitalize">{resource.type}</span>
                      </div>
                      <h4 className="font-semibold mb-1">{resource.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
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
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span>{Icons.Lightbulb()}</span>
                  Tips Activos ({globalTips.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {globalTips.map((tip) => (
                    <div key={tip.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{tip.icon}</span>
                        <span className="text-sm font-medium">{tip.category}</span>
                      </div>
                      <h4 className="font-semibold mb-1">{tip.title}</h4>
                      <p className="text-sm text-gray-600">{tip.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB SUPLEMENTOS */}
          {activeAdminTab === "supplements" && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <span>{Icons.Package()}</span>
                  Gestión de Suplementos ({supplements.length})
                </h3>
                <button
                  onClick={() => setShowAddSupplement(true)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
                >
                  <span>{Icons.Plus()}</span>
                  Agregar Suplemento
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {supplements.map((supplement) => (
                  <div key={supplement.id} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold mb-1">{supplement.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{supplement.description}</p>
                    <p className="text-lg font-bold text-green-600 mb-2">${supplement.price.toLocaleString()}</p>
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
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span>{Icons.TrendingUp()}</span>
                  Analytics Avanzados
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">📊 Distribución de Objetivos</h4>
                    <div className="space-y-2">
                      {GOALS.map((goal) => {
                        const count = allUsers.filter((u) => u.goal === goal.id).length
                        const percentage = allUsers.length > 0 ? Math.round((count / allUsers.length) * 100) : 0
                        return (
                          <div key={goal.id} className="flex items-center justify-between">
                            <span className="text-sm">{goal.label}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                              </div>
                              <span className="text-xs text-gray-500 w-8">{count}</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">⚡ Actividad Reciente</h4>
                    <div className="space-y-2">
                      {allUsers.slice(0, 5).map((user) => (
                        <div key={user.id} className="flex items-center justify-between text-sm">
                          <span>{user.name}</span>
                          <span className="text-gray-500">{new Date(user.last_login).toLocaleDateString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* MODALES */}
        {/* Modal para agregar recurso */}
        {showAddResource && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Agregar Nuevo Recurso</h3>

                <div className="space-y-4">
                  <select
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    value={newResource.type}
                    onChange={(e) => setNewResource((prev) => ({ ...prev, type: e.target.value as any }))}
                  >
                    <option value="mindfulness">🧘‍♀️ Mindfulness</option>
                    <option value="nutrition">🥗 Nutrición</option>
                    <option value="exercise">💪 Ejercicio</option>
                  </select>

                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="Título del recurso"
                    value={newResource.title}
                    onChange={(e) => setNewResource((prev) => ({ ...prev, title: e.target.value }))}
                  />

                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="Descripción"
                    rows={3}
                    value={newResource.description}
                    onChange={(e) => setNewResource((prev) => ({ ...prev, description: e.target.value }))}
                  />

                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="URL (YouTube, PDF, Spotify, etc.)"
                    value={newResource.url}
                    onChange={(e) => setNewResource((prev) => ({ ...prev, url: e.target.value }))}
                  />

                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="URL de imagen (opcional)"
                    value={newResource.image_url}
                    onChange={(e) => setNewResource((prev) => ({ ...prev, image_url: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 mt-6">
                  <button onClick={addResource} className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600">
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
                    className="bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600"
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
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Agregar Nuevo Tip</h3>

                <div className="space-y-4">
                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="Categoría (ej: Hidratación, Ejercicio)"
                    value={newTip.category}
                    onChange={(e) => setNewTip((prev) => ({ ...prev, category: e.target.value }))}
                  />

                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="Título del tip"
                    value={newTip.title}
                    onChange={(e) => setNewTip((prev) => ({ ...prev, title: e.target.value }))}
                  />

                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="Contenido del tip"
                    rows={4}
                    value={newTip.content}
                    onChange={(e) => setNewTip((prev) => ({ ...prev, content: e.target.value }))}
                  />

                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="Emoji/Icono (ej: 💧, 🏃‍♂️, 🧘‍♀️)"
                    value={newTip.icon}
                    onChange={(e) => setNewTip((prev) => ({ ...prev, icon: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 mt-6">
                  <button onClick={addTip} className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600">
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
                    className="bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal para agregar suplemento */}
        {showAddSupplement && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Agregar Nuevo Suplemento</h3>

                <div className="space-y-4">
                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="Nombre del suplemento"
                    value={newSupplement.name}
                    onChange={(e) => setNewSupplement((prev) => ({ ...prev, name: e.target.value }))}
                  />

                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="Descripción"
                    rows={3}
                    value={newSupplement.description}
                    onChange={(e) => setNewSupplement((prev) => ({ ...prev, description: e.target.value }))}
                  />

                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="Beneficios (separados por comas)"
                    value={newSupplement.benefits}
                    onChange={(e) => setNewSupplement((prev) => ({ ...prev, benefits: e.target.value }))}
                  />

                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="Precio (solo números)"
                    type="number"
                    value={newSupplement.price}
                    onChange={(e) => setNewSupplement((prev) => ({ ...prev, price: e.target.value }))}
                  />

                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="URL de imagen"
                    value={newSupplement.image_url}
                    onChange={(e) => setNewSupplement((prev) => ({ ...prev, image_url: e.target.value }))}
                  />

                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="Mensaje personalizado de WhatsApp (opcional)"
                    rows={3}
                    value={newSupplement.whatsapp_message}
                    onChange={(e) => setNewSupplement((prev) => ({ ...prev, whatsapp_message: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 mt-6">
                  <button
                    onClick={addSupplement}
                    className="bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600"
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
                    className="bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600"
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
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md text-center">
          <div className="text-4xl mb-4">{Icons.Loader2()}</div>
          <h3 className="text-lg font-semibold mb-2">Conectando con Supabase</h3>
          <p className="text-gray-600">Inicializando base de datos...</p>
        </div>
      </div>
    )
  }

  if (connectionStatus === "error") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md text-center">
          <div className="text-4xl mb-4 text-red-500">{Icons.X()}</div>
          <h3 className="text-lg font-semibold mb-2">Error de conexión</h3>
          <p className="text-gray-600 mb-4">No se pudo conectar con la base de datos</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  // ============================================================================
  // PANTALLA DE LOGIN/REGISTRO (RESTAURADA)
  // ============================================================================
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <div onClick={handleLogoClick} className="cursor-pointer">
              <h1 className="text-2xl font-bold text-green-600">VitalMente</h1>
              <p className="text-gray-600">Tu compañero de bienestar personalizado</p>
              <div className="flex justify-center gap-2 mt-2">
                <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                  🌐 Conectado a Supabase
                </span>
                <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">🤖 IA Activa</span>
              </div>
              {/* Indicador de clics para admin */}
              {logoClicks > 0 && <div className="mt-2 text-xs text-gray-400">Clics: {logoClicks}/5 para admin</div>}
            </div>
          </div>

          <div className="space-y-6">
            {/* Botones de navegación mejorados con simetría */}
            <div className="flex rounded-lg bg-gray-100 p-1">
              <button
                onClick={() => setShowRegister(false)}
                className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                  !showRegister ? "bg-white text-green-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Ingresar
              </button>
              <button
                onClick={() => setShowRegister(true)}
                className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                  showRegister ? "bg-white text-green-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Crear Cuenta
              </button>
            </div>

            {!showRegister ? (
              <div className="space-y-4">
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="+57 300 123 4567"
                  value={loginForm.phone}
                  onChange={(e) => setLoginForm((prev) => ({ ...prev, phone: e.target.value }))}
                />
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  type="password"
                  placeholder="Código de 10 dígitos"
                  maxLength={10}
                  value={loginForm.accessCode}
                  onChange={(e) => setLoginForm((prev) => ({ ...prev, accessCode: e.target.value }))}
                />
                <button
                  onClick={handleLogin}
                  className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 disabled:bg-gray-400 flex items-center justify-center gap-2 transition-colors"
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
            ) : (
              <div className="space-y-4">
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Número de teléfono"
                  value={registerForm.phone}
                  onChange={(e) => setRegisterForm((prev) => ({ ...prev, phone: e.target.value }))}
                />
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Nombre completo"
                  value={registerForm.name}
                  onChange={(e) => setRegisterForm((prev) => ({ ...prev, name: e.target.value }))}
                />

                {/* Grid simétrico para edad y peso */}
                <div className="grid grid-cols-2 gap-4">
                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Edad"
                    type="number"
                    value={registerForm.age}
                    onChange={(e) => setRegisterForm((prev) => ({ ...prev, age: e.target.value }))}
                  />
                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Peso (kg)"
                    type="number"
                    value={registerForm.weight}
                    onChange={(e) => setRegisterForm((prev) => ({ ...prev, weight: e.target.value }))}
                  />
                </div>

                <input
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Altura (cm)"
                  type="number"
                  value={registerForm.height}
                  onChange={(e) => setRegisterForm((prev) => ({ ...prev, height: e.target.value }))}
                />

                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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

                {/* Grid simétrico para códigos de acceso */}
                <div className="grid grid-cols-1 gap-4">
                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    type="password"
                    placeholder="Código de acceso (10 dígitos)"
                    maxLength={10}
                    value={registerForm.accessCode}
                    onChange={(e) => setRegisterForm((prev) => ({ ...prev, accessCode: e.target.value }))}
                  />
                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    type="password"
                    placeholder="Confirmar código"
                    maxLength={10}
                    value={registerForm.confirmCode}
                    onChange={(e) => setRegisterForm((prev) => ({ ...prev, confirmCode: e.target.value }))}
                  />
                </div>

                <button
                  onClick={handleRegister}
                  className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 disabled:bg-gray-400 flex items-center justify-center gap-2 transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span>{Icons.Loader2()}</span>
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
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-80 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Acceso Administrador</h3>
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                  type="password"
                  placeholder="Código de acceso"
                  value={adminCode}
                  onChange={(e) => setAdminCode(e.target.value)}
                />
                {/* Botones simétricos */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleAdminLogin}
                    className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Ingresar
                  </button>
                  <button
                    onClick={() => {
                      setShowAdminLogin(false)
                      setAdminCode("")
                      setLogoClicks(0)
                    }}
                    className="bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 transition-colors"
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
  // APLICACIÓN PRINCIPAL (RESTAURADA Y FUNCIONAL)
  // ============================================================================
  const activeTips = globalTips.filter((tip) => tip.is_active)
  const mindfulnessResources = globalResources.filter((r) => r.type === "mindfulness" && r.is_active)
  const nutritionResources = globalResources.filter((r) => r.type === "nutrition" && r.is_active)
  const exerciseResources = globalResources.filter((r) => r.type === "exercise" && r.is_active)
  const caloriesProgress = getCaloriesProgress()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <SaveStatusIndicator />
      <FloatingActionButtons />

      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-green-600">VitalMente</h1>
              <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">🤖 IA Activa</span>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {Icons.LogOut()} Salir
            </button>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {activeTab === "inicio" && (
          <div className="space-y-6">
            {/* Bienvenida y mensaje motivacional */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-2">
                ¡Hola, {currentUser?.name}! {Icons.Magic()}
              </h2>
              <p className="text-gray-600">{getMotivationalMessage(currentUser?.goal || "reduce_stress")}</p>
            </div>

            {/* Panel de gamificación */}
            <GamificationPanel />

            {/* Progreso diario */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <span>{Icons.Target()}</span>
                  Progreso Diario
                </h3>
                <span className="text-sm text-gray-600">
                  {getProgressPercentage()}% completado {Icons.CheckCircle()}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Agua */}
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{Icons.Droplets()}</span>
                  <div>
                    <p className="text-sm font-medium">Agua</p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateProgress("water", -1)}
                        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        {Icons.Minus()}
                      </button>
                      <span className="text-xl font-bold">{dailyProgress.water}</span>
                      <button
                        onClick={() => updateProgress("water", 1)}
                        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        {Icons.Plus()}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Ejercicio */}
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{Icons.Activity()}</span>
                  <div>
                    <p className="text-sm font-medium">Ejercicio</p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateProgress("exercise", -1)}
                        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        {Icons.Minus()}
                      </button>
                      <span className="text-xl font-bold">{dailyProgress.exercise}</span>
                      <button
                        onClick={() => updateProgress("exercise", 1)}
                        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        {Icons.Plus()}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Mindfulness */}
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{Icons.Brain()}</span>
                  <div>
                    <p className="text-sm font-medium">Mindfulness</p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateProgress("mindfulness", -1)}
                        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        {Icons.Minus()}
                      </button>
                      <span className="text-xl font-bold">{dailyProgress.mindfulness}</span>
                      <button
                        onClick={() => updateProgress("mindfulness", 1)}
                        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        {Icons.Plus()}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => resetProgress("all")}
                  className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  {Icons.RotateCcw()} Reiniciar día
                </button>
                <button
                  onClick={() => resetProgress("meals")}
                  className="px-3 py-2 text-sm text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                >
                  {Icons.UtensilsCrossed()} Reiniciar comidas
                </button>
              </div>
            </div>

            {/* Tips aleatorios */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span>{Icons.Lightbulb()}</span>
                Tip del día
              </h3>
              {activeTips.length > 0 ? (
                <>
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{activeTips[currentTipIndex].icon}</span>
                      <span className="font-medium">{activeTips[currentTipIndex].category}</span>
                    </div>
                    <h4 className="font-semibold">{activeTips[currentTipIndex].title}</h4>
                    <p className="text-gray-600">{activeTips[currentTipIndex].content}</p>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() => setCurrentTipIndex((prev) => (prev === 0 ? activeTips.length - 1 : prev - 1))}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors border border-gray-300"
                    >
                      <span className="text-lg">{Icons.ChevronLeft()}</span>
                      <span className="text-sm font-medium">Anterior</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">
                        {currentTipIndex + 1} de {activeTips.length}
                      </span>
                    </div>

                    <button
                      onClick={() => setCurrentTipIndex((prev) => (prev === activeTips.length - 1 ? 0 : prev + 1))}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors border border-gray-300"
                    >
                      <span className="text-sm font-medium">Siguiente</span>
                      <span className="text-lg">{Icons.ChevronRight()}</span>
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-gray-500">No hay tips activos disponibles.</p>
              )}
            </div>

            {/* Recomendaciones IA */}
            {aiRecommendations.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span>{Icons.Robot()}</span>
                  Recomendaciones Personalizadas
                </h3>
                {aiRecommendations.map((rec) => (
                  <div key={rec.id} className="border border-gray-200 rounded-lg p-4 mb-3">
                    <h4 className="font-semibold mb-1">{rec.reason}</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Suplementos recomendados: {rec.supplement_names.join(", ")}
                    </p>
                    <button
                      onClick={() => handleRecommendationClick(rec.id)}
                      className="px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      Ver más {Icons.ExternalLink()}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "comida" && (
          <div className="space-y-6">
            {/* Resumen de calorías */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span>{Icons.UtensilsCrossed()}</span>
                Resumen de Comida
              </h3>
              {macroResults ? (
                <>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-medium">Calorías consumidas</p>
                    <p className="text-xl font-bold">
                      {caloriesProgress.consumed} / {caloriesProgress.target}
                    </p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div
                      className="bg-green-500 h-2.5 rounded-full"
                      style={{ width: `${caloriesProgress.percentage}%` }}
                    ></div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-sm font-medium">Proteína</p>
                      <p className="text-xl font-bold">{consumedMacros.protein}g</p>
                      <p className="text-xs text-gray-500">
                        Meta: {macroResults.protein}g (
                        {Math.round((consumedMacros.protein / macroResults.protein) * 100)}
                        %)
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Carbohidratos</p>
                      <p className="text-xl font-bold">{consumedMacros.carbs}g</p>
                      <p className="text-xs text-gray-500">
                        Meta: {macroResults.carbs}g ({Math.round((consumedMacros.carbs / macroResults.carbs) * 100)}%)
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Grasas</p>
                      <p className="text-xl font-bold">{consumedMacros.fats}g</p>
                      <p className="text-xs text-gray-500">
                        Meta: {macroResults.fats}g ({Math.round((consumedMacros.fats / macroResults.fats) * 100)}%)
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-gray-500">Calculando macros...</p>
              )}
            </div>

            {/* Comidas de hoy */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span>{Icons.ChefHat()}</span>
                Comidas de Hoy
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Desayuno */}
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    {Icons.UtensilsCrossed()} Desayuno
                    <button
                      onClick={() => openMealCalculator("desayuno")}
                      className="px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      {Icons.Plus()} Agregar
                    </button>
                  </h4>
                  {mealCompositions
                    .filter((c) => c.meal_type === "desayuno")
                    .map((composition) => (
                      <div
                        key={composition.id}
                        className="flex items-center justify-between border-b py-2 last:border-b-0"
                      >
                        <div>
                          <p className="text-sm font-medium">{composition.food_name}</p>
                          <p className="text-xs text-gray-500">
                            {composition.quantity_grams}g - {composition.calories_consumed} cal
                          </p>
                        </div>
                        <button
                          onClick={() => removeFoodFromMeal(composition.id)}
                          className="px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          {Icons.Trash2()}
                        </button>
                      </div>
                    ))}
                </div>

                {/* Almuerzo */}
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    {Icons.UtensilsCrossed()} Almuerzo
                    <button
                      onClick={() => openMealCalculator("almuerzo")}
                      className="px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      {Icons.Plus()} Agregar
                    </button>
                  </h4>
                  {mealCompositions
                    .filter((c) => c.meal_type === "almuerzo")
                    .map((composition) => (
                      <div
                        key={composition.id}
                        className="flex items-center justify-between border-b py-2 last:border-b-0"
                      >
                        <div>
                          <p className="text-sm font-medium">{composition.food_name}</p>
                          <p className="text-xs text-gray-500">
                            {composition.quantity_grams}g - {composition.calories_consumed} cal
                          </p>
                        </div>
                        <button
                          onClick={() => removeFoodFromMeal(composition.id)}
                          className="px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          {Icons.Trash2()}
                        </button>
                      </div>
                    ))}
                </div>

                {/* Cena */}
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    {Icons.UtensilsCrossed()} Cena
                    <button
                      onClick={() => openMealCalculator("cena")}
                      className="px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      {Icons.Plus()} Agregar
                    </button>
                  </h4>
                  {mealCompositions
                    .filter((c) => c.meal_type === "cena")
                    .map((composition) => (
                      <div
                        key={composition.id}
                        className="flex items-center justify-between border-b py-2 last:border-b-0"
                      >
                        <div>
                          <p className="text-sm font-medium">{composition.food_name}</p>
                          <p className="text-xs text-gray-500">
                            {composition.quantity_grams}g - {composition.calories_consumed} cal
                          </p>
                        </div>
                        <button
                          onClick={() => removeFoodFromMeal(composition.id)}
                          className="px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          {Icons.Trash2()}
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "entrenamiento" && (
          <div className="space-y-6">
            {/* Rutinas de ejercicio */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span>{Icons.Dumbbell()}</span>
                Rutinas de Entrenamiento
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    <div className="p-4">
                      <h4 className="font-semibold mb-1">{resource.title}</h4>
                      <p className="text-sm text-gray-600">{resource.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Progreso de ejercicio */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span>{Icons.Activity()}</span>
                Tu Progreso de Ejercicio
              </h3>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium">Sesiones completadas hoy</p>
                  <p className="text-3xl font-bold text-green-600">{dailyProgress.exercise}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateProgress("exercise", -1)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    {Icons.Minus()}
                  </button>
                  <button
                    onClick={() => updateProgress("exercise", 1)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    {Icons.Plus()}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{getStreakDays()}</div>
                  <div className="text-sm text-gray-600">Días activos</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {progressHistory.reduce((sum, day) => sum + day.exercise, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Total esta semana</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "mindfulness" && (
          <div className="space-y-6">
            {/* Recursos de mindfulness */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span>{Icons.Brain()}</span>
                Mindfulness y Meditación
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    <div className="p-4">
                      <h4 className="font-semibold mb-1">{resource.title}</h4>
                      <p className="text-sm text-gray-600">{resource.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Progreso de mindfulness */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span>{Icons.Brain()}</span>
                Tu Progreso de Mindfulness
              </h3>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium">Sesiones completadas hoy</p>
                  <p className="text-3xl font-bold text-purple-600">{dailyProgress.mindfulness}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateProgress("mindfulness", -1)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    {Icons.Minus()}
                  </button>
                  <button
                    onClick={() => updateProgress("mindfulness", 1)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    {Icons.Plus()}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{getStreakDays()}</div>
                  <div className="text-sm text-gray-600">Días de práctica</div>
                </div>
                <div className="p-4 bg-indigo-50 rounded-lg">
                  <div className="text-2xl font-bold text-indigo-600">
                    {progressHistory.reduce((sum, day) => sum + day.mindfulness, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Total esta semana</div>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === "suplementos" && (
          <div className="space-y-6">
            {/* Lista de suplementos */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span>{Icons.Package()}</span>
                Suplementos
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {supplements.map((supplement) => (
                  <div
                    key={supplement.id}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <img
                      src={supplement.image_url || "/placeholder.svg"}
                      alt={supplement.name}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold mb-1">{supplement.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{supplement.description}</p>
                      <p className="text-sm font-medium text-green-600 mb-2">${supplement.price.toLocaleString()}</p>
                      <ul className="text-xs text-gray-500 mb-3">
                        {supplement.benefits.map((benefit, index) => (
                          <li key={index}>- {benefit}</li>
                        ))}
                      </ul>
                      <button
                        onClick={() => handleSupplementContact(supplement)}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
                      >
                        {Icons.MessageSquare()} Contactar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Navegación inferior */}

      <nav className="bg-white border-t shadow-md fixed bottom-0 left-0 w-full z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex justify-between">
            <button
              onClick={() => setActiveTab("inicio")}
              className={`flex-1 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors ${
                activeTab === "inicio" ? "text-green-600" : "text-gray-500"
              }`}
            >
              <span className="text-2xl">{Icons.Home()}</span>
              <span className="text-xs">Inicio</span>
            </button>
            <button
              onClick={() => setActiveTab("comida")}
              className={`flex-1 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors ${
                activeTab === "comida" ? "text-green-600" : "text-gray-500"
              }`}
            >
              <span className="text-2xl">{Icons.UtensilsCrossed()}</span>
              <span className="text-xs">Alimentación</span>
            </button>
            <button
              onClick={() => setActiveTab("entrenamiento")}
              className={`flex-1 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors ${
                activeTab === "entrenamiento" ? "text-green-600" : "text-gray-500"
              }`}
            >
              <span className="text-2xl">{Icons.Dumbbell()}</span>
              <span className="text-xs">Entrenamiento</span>
            </button>
            <button
              onClick={() => setActiveTab("mindfulness")}
              className={`flex-1 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors ${
                activeTab === "mindfulness" ? "text-green-600" : "text-gray-500"
              }`}
            >
              <span className="text-2xl">{Icons.Brain()}</span>
              <span className="text-xs">Mindfulness</span>
            </button>
            <button
              onClick={() => setActiveTab("suplementos")}
              className={`flex-1 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors ${
                activeTab === "suplementos" ? "text-green-600" : "text-gray-500"
              }`}
            >
              <span className="text-2xl">{Icons.Package()}</span>
              <span className="text-xs">Suplementos</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Modal de calculadora de comida */}
      {showMealCalculator && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Agregar comida a {selectedMealType}</h3>

              {/* Selector de comida */}
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Buscar comida</h4>
                <div className="space-y-2">
                  {getFoodsByCategory().map((category) => (
                    <div key={category.id}>
                      <h5 className="font-medium flex items-center gap-2">
                        {category.icon} {category.name}
                      </h5>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {category.foods.map((food) => (
                          <button
                            key={food.id}
                            onClick={() => selectFood(food)}
                            className={`px-3 py-2 text-sm border rounded-lg hover:bg-gray-50 transition-colors ${
                              selectedFood?.id === food.id ? "border-green-500" : "border-gray-300"
                            }`}
                          >
                            {food.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Selector de cantidad */}
              {selectedFood && (
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">
                    {selectedFood.name} - {selectedFood.calories} cal / 100g
                  </h4>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      className="w-24 p-3 border border-gray-300 rounded-lg"
                      placeholder="Cantidad (g)"
                      value={foodQuantity}
                      onChange={(e) => setFoodQuantity(e.target.value)}
                    />
                    <span>gramos</span>
                  </div>
                </div>
              )}

              {/* Botones de acción */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <button
                  onClick={addFoodToMeal}
                  className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 disabled:bg-gray-400"
                  disabled={!selectedFood || !foodQuantity}
                >
                  Agregar comida
                </button>
                <button
                  onClick={() => setShowMealCalculator(false)}
                  className="bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600"
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
