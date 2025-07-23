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

// ============================================================================
// FUNCIONES DE BASE DE DATOS MEJORADAS
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
    const { data, error } = await supabase.from("global_tips").select("*").eq("is_active", true)

    if (error) return []
    return data as GlobalTip[]
  },

  async getActiveResources(): Promise<GlobalResource[]> {
    const { data, error } = await supabase.from("global_resources").select("*").eq("is_active", true)

    if (error) return []
    return data as GlobalResource[]
  },

  async getActiveSupplements(): Promise<Supplement[]> {
    const { data, error } = await supabase.from("supplements").select("*").eq("is_active", true)

    if (error) return []
    return (data || []).map((item: any) => ({
      ...item,
      benefits: item.benefits ? item.benefits.split(",") : [],
    })) as Supplement[]
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
// COMPONENTE PRINCIPAL
// ============================================================================
export default function VitalMenteApp() {
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

      const [foods, history, compositions] = await Promise.all([
        dbFunctions.getUserFoods(userId),
        dbFunctions.getProgressHistory(userId),
        dbFunctions.getTodayMealCompositions(userId),
      ])

      setUserFoods(foods)
      setProgressHistory(history)
      setMealCompositions(compositions)
      calculateConsumedMacros(compositions)

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
  }

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
    } else {
      alert("Código incorrecto")
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
  // PANTALLA DE LOGIN/REGISTRO
  // ============================================================================
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <div onClick={handleLogoClick} className="cursor-pointer">
              <h1 className="text-2xl font-bold text-green-600">VitalMente</h1>
              <p className="text-gray-600">Tu compañero de bienestar personalizado</p>
              <span className="inline-block mt-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                🌐 Conectado a Supabase
              </span>
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
                    onClick={() => setShowAdminLogin(false)}
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
  // APLICACIÓN PRINCIPAL
  // ============================================================================
  const activeTips = globalTips.filter((tip) => tip.is_active)
  const mindfulnessResources = globalResources.filter((r) => r.type === "mindfulness" && r.is_active)
  const nutritionResources = globalResources.filter((r) => r.type === "nutrition" && r.is_active)
  const exerciseResources = globalResources.filter((r) => r.type === "exercise" && r.is_active)
  const caloriesProgress = getCaloriesProgress()

  return (
    <div className="min-h-screen bg-gray-50">
      <SaveStatusIndicator />
      {currentUser && <FloatingActionButtons />}

      <div className="pb-20">
        {/* Navegación de tabs mejorada */}
        <div className="bg-white border-b sticky top-0 z-30">
          <div className="flex">
            {["inicio", "nutricion", "ejercicio", "mindfulness", "suplementos"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 px-2 text-sm font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? "text-green-600 border-b-2 border-green-500 bg-green-50"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                <div className="flex flex-col items-center space-y-1">
                  <span className="text-lg">
                    {tab === "inicio" && Icons.Home()}
                    {tab === "nutricion" && Icons.UtensilsCrossed()}
                    {tab === "ejercicio" && Icons.Activity()}
                    {tab === "mindfulness" && Icons.Brain()}
                    {tab === "suplementos" && Icons.Package()}
                  </span>
                  <span className="text-xs">{tab === "nutricion" ? "Nutrición" : tab}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4">
          {/* TAB INICIO */}
          {activeTab === "inicio" && (
            <div className="space-y-6">
              {/* Header mejorado */}
              <div className="flex justify-between items-center">
                <div className="text-center flex-1">
                  <h2 className="text-2xl font-bold text-gray-800">¡Hola {currentUser?.name}! 👋</h2>
                  <p className="text-gray-600">Tu progreso de hoy</p>
                  <p className="text-sm text-green-600 font-medium mt-1">
                    {getMotivationalMessage(currentUser?.goal || "")}
                  </p>
                  {getStreakDays() > 0 && (
                    <span className="inline-block mt-1 px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded">
                      🔥 {getStreakDays()} días consecutivos
                    </span>
                  )}
                </div>
                {/* Botones de acción simétricos */}
                <div className="flex gap-2">
                  <button
                    onClick={() => resetProgress("all")}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    title="Reiniciar todo el progreso"
                  >
                    {Icons.RotateCcw()}
                  </button>
                  <button
                    onClick={handleLogout}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    title="Cerrar sesión"
                  >
                    {Icons.LogOut()}
                  </button>
                </div>
              </div>

              {/* Progreso de calorías destacado */}
              {macroResults && (
                <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{Icons.Calculator()}</span>
                      <span className="font-semibold">Calorías consumidas</span>
                    </div>
                    <span className="text-lg font-bold">
                      {caloriesProgress.consumed}/{caloriesProgress.target}
                    </span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                    <div
                      className="bg-white h-2 rounded-full transition-all duration-300"
                      style={{ width: `${caloriesProgress.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-center">{caloriesProgress.percentage}% de tu objetivo diario</p>
                </div>
              )}

              {/* Panel de progreso diario MEJORADO CON SIMETRÍA */}
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Progreso Diario</h3>
                  <div className="text-sm text-gray-500">{getProgressPercentage()}% completado</div>
                </div>

                {/* Grid simétrico 3x2 para mejor organización */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {/* Fila superior: Actividades principales */}
                  <div className="text-center">
                    <button
                      onClick={() => updateProgress("water", 1)}
                      className="w-full p-4 border-2 border-blue-300 rounded-lg hover:bg-blue-50 transition-colors group"
                    >
                      <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">
                        {Icons.Droplets()}
                      </span>
                      <p className="text-sm font-medium">Agua</p>
                      <p className="text-xs text-gray-600">{dailyProgress.water}/8 vasos</p>
                      <div className="w-full bg-blue-100 rounded-full h-1 mt-2">
                        <div
                          className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min((dailyProgress.water / 8) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </button>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={() => updateProgress("exercise", 1)}
                      className="w-full p-4 border-2 border-green-300 rounded-lg hover:bg-green-50 transition-colors group"
                    >
                      <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">
                        {Icons.Activity()}
                      </span>
                      <p className="text-sm font-medium">Ejercicio</p>
                      <p className="text-xs text-gray-600">{dailyProgress.exercise}/1 sesión</p>
                      <div className="w-full bg-green-100 rounded-full h-1 mt-2">
                        <div
                          className="bg-green-500 h-1 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min((dailyProgress.exercise / 1) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </button>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={() => updateProgress("mindfulness", 1)}
                      className="w-full p-4 border-2 border-purple-300 rounded-lg hover:bg-purple-50 transition-colors group"
                    >
                      <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">
                        {Icons.Brain()}
                      </span>
                      <p className="text-sm font-medium">Mindfulness</p>
                      <p className="text-xs text-gray-600">{dailyProgress.mindfulness}/1 sesión</p>
                      <div className="w-full bg-purple-100 rounded-full h-1 mt-2">
                        <div
                          className="bg-purple-500 h-1 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min((dailyProgress.mindfulness / 1) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Fila inferior: Comidas */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center">
                    <button
                      onClick={() => updateProgress("desayuno", 1)}
                      className="w-full p-4 border-2 border-orange-300 rounded-lg hover:bg-orange-50 transition-colors group"
                    >
                      <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">🌅</span>
                      <p className="text-sm font-medium">Desayuno</p>
                      <p className="text-xs text-gray-600">{dailyProgress.desayuno}/1</p>
                      <div className="w-full bg-orange-100 rounded-full h-1 mt-2">
                        <div
                          className="bg-orange-500 h-1 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min((dailyProgress.desayuno / 1) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </button>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={() => updateProgress("almuerzo", 1)}
                      className="w-full p-4 border-2 border-yellow-300 rounded-lg hover:bg-yellow-50 transition-colors group"
                    >
                      <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">☀️</span>
                      <p className="text-sm font-medium">Almuerzo</p>
                      <p className="text-xs text-gray-600">{dailyProgress.almuerzo}/1</p>
                      <div className="w-full bg-yellow-100 rounded-full h-1 mt-2">
                        <div
                          className="bg-yellow-500 h-1 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min((dailyProgress.almuerzo / 1) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </button>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={() => updateProgress("cena", 1)}
                      className="w-full p-4 border-2 border-indigo-300 rounded-lg hover:bg-indigo-50 transition-colors group"
                    >
                      <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">🌙</span>
                      <p className="text-sm font-medium">Cena</p>
                      <p className="text-xs text-gray-600">{dailyProgress.cena}/1</p>
                      <div className="w-full bg-indigo-100 rounded-full h-1 mt-2">
                        <div
                          className="bg-indigo-500 h-1 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min((dailyProgress.cena / 1) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Botones de acción simétricos */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => resetProgress("meals")}
                    className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <span>{Icons.RotateCcw()}</span>
                    <span className="text-sm">Reiniciar Comidas</span>
                  </button>
                  <button
                    onClick={() => resetProgress("all")}
                    className="p-3 border border-red-300 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center gap-2 text-red-600"
                  >
                    <span>{Icons.X()}</span>
                    <span className="text-sm">Reiniciar Todo</span>
                  </button>
                </div>
              </div>

              {/* Tip del día */}
              {activeTips.length > 0 && (
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold">Tip del Día</h3>
                    <button
                      onClick={() => setCurrentTipIndex((prev) => (prev + 1) % activeTips.length)}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {Icons.ChevronRight()}
                    </button>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{activeTips[currentTipIndex]?.icon}</span>
                    <div>
                      <h4 className="font-medium">{activeTips[currentTipIndex]?.title}</h4>
                      <p className="text-sm text-gray-600">{activeTips[currentTipIndex]?.content}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB NUTRICION */}
          {activeTab === "nutricion" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Nutrición</h2>
                <button
                  onClick={() => setShowFoodDialog(true)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 transition-colors"
                >
                  <span>{Icons.Plus()}</span>
                  Agregar Alimento
                </button>
              </div>

              {/* Calculadora de comidas con botones simétricos */}
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="font-semibold mb-3">Calculadora de Comidas</h3>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => openMealCalculator("desayuno")}
                    className="p-4 border-2 border-orange-300 rounded-lg hover:bg-orange-50 transition-colors group"
                  >
                    <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">🌅</span>
                    <p className="text-sm font-medium">Desayuno</p>
                  </button>
                  <button
                    onClick={() => openMealCalculator("almuerzo")}
                    className="p-4 border-2 border-yellow-300 rounded-lg hover:bg-yellow-50 transition-colors group"
                  >
                    <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">☀️</span>
                    <p className="text-sm font-medium">Almuerzo</p>
                  </button>
                  <button
                    onClick={() => openMealCalculator("cena")}
                    className="p-4 border-2 border-indigo-300 rounded-lg hover:bg-indigo-50 transition-colors group"
                  >
                    <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">🌙</span>
                    <p className="text-sm font-medium">Cena</p>
                  </button>
                </div>
              </div>

              {/* Comidas de hoy */}
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="font-semibold mb-3">Comidas de Hoy</h3>
                {mealCompositions.length === 0 ? (
                  <p className="text-gray-600 text-center py-4">No has agregado comidas hoy</p>
                ) : (
                  <div className="space-y-3">
                    {mealCompositions.map((comp) => (
                      <div
                        key={comp.id}
                        className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div>
                          <p className="font-medium">{comp.food_name}</p>
                          <p className="text-sm text-gray-600">
                            {comp.quantity_grams}g - {comp.meal_type} - {comp.calories_consumed} cal
                          </p>
                        </div>
                        <button
                          onClick={() => removeFoodFromMeal(comp.id)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          {Icons.Trash2()}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Resumen de macros mejorado */}
              {macroResults && (
                <div className="bg-white rounded-lg shadow p-4">
                  <h3 className="font-semibold mb-3">Resumen de Macros</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-600">Calorías</p>
                      <p className="text-lg font-bold text-green-600">{consumedMacros.calories}</p>
                      <p className="text-xs text-gray-500">de {macroResults.calories}</p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-600">Proteínas</p>
                      <p className="text-lg font-bold text-blue-600">{consumedMacros.protein}g</p>
                      <p className="text-xs text-gray-500">de {macroResults.protein}g</p>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-600">Carbohidratos</p>
                      <p className="text-lg font-bold text-yellow-600">{consumedMacros.carbs}g</p>
                      <p className="text-xs text-gray-500">de {macroResults.carbs}g</p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-600">Grasas</p>
                      <p className="text-lg font-bold text-purple-600">{consumedMacros.fats}g</p>
                      <p className="text-xs text-gray-500">de {macroResults.fats}g</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Recursos de nutrición */}
              {nutritionResources.length > 0 && (
                <div className="bg-white rounded-lg shadow p-4">
                  <h3 className="font-semibold mb-3">Recursos de Nutrición</h3>
                  <div className="space-y-3">
                    {nutritionResources.map((resource) => (
                      <div
                        key={resource.id}
                        className="flex gap-4 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="relative w-20 h-16 flex-shrink-0">
                          <img
                            src={getResourceThumbnail(resource.url, resource.type) || "/placeholder.svg"}
                            alt={resource.title}
                            className="w-full h-full object-cover rounded-lg"
                            onError={(e) => {
                              ;(e.target as HTMLImageElement).src = getResourceThumbnail("", resource.type)
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{resource.title}</h4>
                          <p className="text-sm text-gray-600">{resource.description}</p>
                          <button
                            onClick={() => window.open(resource.url, "_blank")}
                            className="mt-2 text-sm text-green-600 hover:text-green-700 flex items-center gap-1"
                          >
                            <span>{Icons.ExternalLink()}</span>
                            Ver recurso
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB EJERCICIO */}
          {activeTab === "ejercicio" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Ejercicio</h2>

              {exerciseResources.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                  <span className="text-4xl block mb-4">💪</span>
                  <p className="text-gray-600">No hay recursos de ejercicio disponibles</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {exerciseResources.map((resource) => (
                    <div key={resource.id} className="bg-white rounded-lg shadow p-4">
                      <div className="flex gap-4">
                        <div className="relative w-32 h-20 flex-shrink-0">
                          <img
                            src={getResourceThumbnail(resource.url, resource.type) || "/placeholder.svg"}
                            alt={resource.title}
                            className="w-full h-full object-cover rounded-lg"
                            onError={(e) => {
                              ;(e.target as HTMLImageElement).src = getResourceThumbnail("", resource.type)
                            }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-black/60 text-white rounded-full p-2">
                              {isYouTubeUrl(resource.url) && <span className="text-xs">{Icons.Play()}</span>}
                              {isSpotifyUrl(resource.url) && <span className="text-xs">{Icons.Music()}</span>}
                              {isPDFUrl(resource.url) && <span className="text-xs">📄</span>}
                              {!isYouTubeUrl(resource.url) &&
                                !isSpotifyUrl(resource.url) &&
                                !isPDFUrl(resource.url) && (
                                  <span className="text-xs">{getResourceTypeIcon(resource.type)}</span>
                                )}
                            </div>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-semibold">{resource.title}</h4>
                              <p className="text-sm text-gray-600">{resource.description}</p>
                            </div>
                            <button
                              onClick={() => window.open(resource.url, "_blank")}
                              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                              title="Abrir enlace"
                            >
                              {Icons.ExternalLink()}
                            </button>
                          </div>
                          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">💪 Ejercicio</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB MINDFULNESS */}
          {activeTab === "mindfulness" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Mindfulness</h2>

              {mindfulnessResources.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                  <span className="text-4xl block mb-4">🧘‍♀️</span>
                  <p className="text-gray-600">No hay recursos de mindfulness disponibles</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {mindfulnessResources.map((resource) => (
                    <div key={resource.id} className="bg-white rounded-lg shadow p-4">
                      <div className="flex gap-4">
                        <div className="relative w-32 h-20 flex-shrink-0">
                          <img
                            src={getResourceThumbnail(resource.url, resource.type) || "/placeholder.svg"}
                            alt={resource.title}
                            className="w-full h-full object-cover rounded-lg"
                            onError={(e) => {
                              ;(e.target as HTMLImageElement).src = getResourceThumbnail("", resource.type)
                            }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-black/60 text-white rounded-full p-2">
                              {isYouTubeUrl(resource.url) && <span className="text-xs">{Icons.Play()}</span>}
                              {isSpotifyUrl(resource.url) && <span className="text-xs">{Icons.Music()}</span>}
                              {isPDFUrl(resource.url) && <span className="text-xs">📄</span>}
                              {!isYouTubeUrl(resource.url) &&
                                !isSpotifyUrl(resource.url) &&
                                !isPDFUrl(resource.url) && (
                                  <span className="text-xs">{getResourceTypeIcon(resource.type)}</span>
                                )}
                            </div>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-semibold">{resource.title}</h4>
                              <p className="text-sm text-gray-600">{resource.description}</p>
                            </div>
                            <button
                              onClick={() => window.open(resource.url, "_blank")}
                              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                              title="Abrir enlace"
                            >
                              {Icons.ExternalLink()}
                            </button>
                          </div>
                          <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded">
                            🧘‍♀️ Mindfulness
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB SUPLEMENTOS */}
          {activeTab === "suplementos" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Suplementos</h2>

              {supplements.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                  <span className="text-4xl block mb-4">📦</span>
                  <p className="text-gray-600">No hay suplementos disponibles</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {supplements.map((supplement) => (
                    <div
                      key={supplement.id}
                      className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
                    >
                      <img
                        src={supplement.image_url || "/placeholder.svg?height=200&width=200"}
                        alt={supplement.name}
                        className="w-full h-32 object-cover rounded-lg mb-3 bg-gray-100"
                      />
                      <h4 className="font-semibold mb-1">{supplement.name}</h4>
                      <p className="text-lg font-bold text-green-600 mb-2">${supplement.price.toLocaleString()}</p>
                      <p className="text-sm text-gray-600 mb-3">{supplement.description}</p>

                      {supplement.benefits.length > 0 && (
                        <div className="mb-3">
                          <p className="text-xs font-medium text-gray-700 mb-1">Beneficios:</p>
                          <div className="flex flex-wrap gap-1">
                            {supplement.benefits.slice(0, 3).map((benefit, index) => (
                              <span key={index} className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                                {benefit}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <button
                        onClick={() => handleSupplementContact(supplement)}
                        className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                      >
                        <span>{Icons.Phone()}</span>
                        Contactar por WhatsApp
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* DIALOGS MEJORADOS CON BOTONES SIMÉTRICOS */}
      {showFoodDialog && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Agregar Alimento</h3>
            <div className="space-y-4">
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={selectedMeal || ""}
                onChange={(e) => setSelectedMeal(e.target.value as "desayuno" | "almuerzo" | "cena")}
              >
                <option value="" disabled>
                  Selecciona la comida
                </option>
                <option value="desayuno">🌅 Desayuno</option>
                <option value="almuerzo">☀️ Almuerzo</option>
                <option value="cena">🌙 Cena</option>
              </select>

              <input
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Nombre del alimento"
                value={newFood.name}
                onChange={(e) => setNewFood((prev) => ({ ...prev, name: e.target.value }))}
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Calorías"
                  type="number"
                  value={newFood.calories}
                  onChange={(e) => setNewFood((prev) => ({ ...prev, calories: e.target.value }))}
                />
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Proteínas (g)"
                  type="number"
                  value={newFood.protein}
                  onChange={(e) => setNewFood((prev) => ({ ...prev, protein: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Carbohidratos (g)"
                  type="number"
                  value={newFood.carbs}
                  onChange={(e) => setNewFood((prev) => ({ ...prev, carbs: e.target.value }))}
                />
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Grasas (g)"
                  type="number"
                  value={newFood.fats}
                  onChange={(e) => setNewFood((prev) => ({ ...prev, fats: e.target.value }))}
                />
              </div>

              {/* Botones simétricos */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={addUserFood}
                  className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Agregar Alimento
                </button>
                <button
                  onClick={() => {
                    setShowFoodDialog(false)
                    setSelectedMeal(null)
                    setNewFood({ name: "", calories: "", protein: "", carbs: "", fats: "" })
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

      {showMealCalculator && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Calculadora de Comidas - {selectedMealType}</h3>
            <div className="space-y-4">
              <div className="flex rounded-lg bg-gray-100 p-1">
                {["global", "user"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedFood(null)}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      (!selectedFood && type === "global") ||
                      (selectedFood && type === "user" && userFoods.includes(selectedFood as UserFood))
                        ? "bg-white text-green-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {type === "global" ? "Alimentos Globales" : "Mis Alimentos"}
                  </button>
                ))}
              </div>

              {selectedFood ? (
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold">{selectedFood.name}</h4>
                    <span className="text-sm text-gray-600">{selectedFood.calories} cal / 100g</span>
                  </div>

                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Cantidad (gramos)"
                    type="number"
                    value={foodQuantity}
                    onChange={(e) => setFoodQuantity(e.target.value)}
                  />

                  {/* Información nutricional calculada */}
                  {foodQuantity && Number(foodQuantity) > 0 && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium mb-2">Información nutricional para {foodQuantity}g:</p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <span>
                          Calorías: {Math.round((Number(selectedFood.calories) * Number(foodQuantity)) / 100)}
                        </span>
                        <span>
                          Proteínas: {Math.round((Number(selectedFood.protein) * Number(foodQuantity)) / 100)}g
                        </span>
                        <span>
                          Carbohidratos: {Math.round((Number(selectedFood.carbs) * Number(foodQuantity)) / 100)}g
                        </span>
                        <span>Grasas: {Math.round((Number(selectedFood.fats) * Number(foodQuantity)) / 100)}g</span>
                      </div>
                    </div>
                  )}

                  {/* Botones simétricos */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={addFoodToMeal}
                      className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Agregar a la comida
                    </button>
                    <button
                      onClick={() => setSelectedFood(null)}
                      className="bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Volver
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {getFoodsByCategory().map((category) => (
                    <div key={category.id} className="space-y-2">
                      <h4 className="font-semibold flex items-center gap-2 sticky top-0 bg-white py-2">
                        {category.icon} {category.name}
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        {category.foods.map((food) => (
                          <button
                            key={food.id}
                            onClick={() => selectFood(food)}
                            className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{food.name}</span>
                              <span className="text-sm text-gray-600">{food.calories} cal</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!selectedFood && (
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowMealCalculator(false)}
                    className="bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cerrar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
