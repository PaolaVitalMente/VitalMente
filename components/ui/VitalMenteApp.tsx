'use client'

import { useState, useEffect } from "react"
import { createClient } from '@supabase/supabase-js'

// ✅ CORRECCIÓN 1: Importaciones de componentes UI corregidas
import {
  Button,
  Input,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Badge,
  Progress,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Label,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Textarea,
} from "./index"

import {
  Home,
  UtensilsCrossed,
  Activity,
  Brain,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  Droplets,
  Plus,
  Minus,
  RotateCcw,
  X,
  ExternalLink,
  Edit,
  Trash2,
  LogOut,
  Users,
  MessageSquare,
  Link,
  ChefHat,
  Globe,
  Eye,
  Phone,
  UserPlus,
  Calendar,
  Package,
  Loader2
} from "lucide-react"

// ============================================================================
// CONFIGURACIÓN DE SUPABASE REAL
// ============================================================================

const SUPABASE_URL = 'https://frzyksfceugddjrerxkf.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyenlrc2ZjZXVnZGRqcmVyeGtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3MzgwMTUsImV4cCI6MjA2NzMxNDAxNX0.E6ZjfC6RJoA98RkDK-I87k2l3d7naK9C-mEC0alH7L8'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// ============================================================================
// TIPOS Y DATOS INICIALES
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
  category: 'desayuno' | 'almuerzo' | 'cena' | 'snack'
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
  type: 'mindfulness' | 'nutrition'
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

const ACTIVITY_LEVELS = [
  { value: 1.2, label: "Sedentario", desc: "Poco ejercicio" },
  { value: 1.375, label: "Ligero", desc: "1-3 días/semana" },
  { value: 1.55, label: "Moderado", desc: "3-5 días/semana" },
  { value: 1.725, label: "Activo", desc: "6-7 días/semana" },
  { value: 1.9, label: "Muy Activo", desc: "Ejercicio intenso diario" }
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
  { id: "vitalmente", label: "🌟 Sentirme VitalMente", protein: 25, carbs: 45, fats: 30, calAdjust: 0, type: "emotional" }
]

// ============================================================================
// FUNCIONES DE BASE DE DATOS
// ============================================================================

const dbFunctions = {
  async findUserByPhone(phone: string): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('phone', phone)
      .single()
    
    if (error || !data) return null
    return data as UserProfile
  },

  async createUser(userData: Omit<UserProfile, 'id' | 'created_at' | 'last_login'>): Promise<UserProfile> {
    const { data, error } = await supabase
      .from('users')
      .insert({
        ...userData,
        last_login: new Date().toISOString(),
        created_at: new Date().toISOString()
      })
      .select()
      .single()
    
    if (error) throw new Error(error.message)
    return data as UserProfile
  },

  async updateUserLastLogin(userId: string): Promise<void> {
    await supabase
      .from('users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', userId)
  },

  async getTodayProgress(userId: string): Promise<DailyProgress | null> {
    const today = new Date().toISOString().split('T')[0]
    const { data, error } = await supabase
      .from('daily_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('date', today)
      .single()
    
    if (error || !data) return null
    return data as DailyProgress
  },

  async saveProgress(userId: string, progress: Omit<DailyProgress, 'id' | 'user_id' | 'date'>): Promise<void> {
    const today = new Date().toISOString().split('T')[0]
    await supabase
      .from('daily_progress')
      .upsert({
        user_id: userId,
        date: today,
        ...progress,
        updated_at: new Date().toISOString()
      })
  },

  async getProgressHistory(userId: string, days: number = 7): Promise<DailyProgress[]> {
    const { data, error } = await supabase
      .from('daily_progress')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })
      .limit(days)
    
    if (error) return []
    return data as DailyProgress[]
  },

  async getUserFoods(userId: string): Promise<UserFood[]> {
    const { data, error } = await supabase
      .from('user_foods')
      .select('*')
      .eq('user_id', userId)
    
    if (error) return []
    return data as UserFood[]
  },

  async addUserFood(food: Omit<UserFood, 'id' | 'created_at'>): Promise<UserFood> {
    const { data, error } = await supabase
      .from('user_foods')
      .insert({
        ...food,
        created_at: new Date().toISOString()
      })
      .select()
      .single()
    
    if (error) throw new Error(error.message)
    return data as UserFood
  },

  async getActiveTips(): Promise<GlobalTip[]> {
    const { data, error } = await supabase
      .from('global_tips')
      .select('*')
      .eq('is_active', true)
    
    if (error) return []
    return data as GlobalTip[]
  },

  async getAllTips(): Promise<GlobalTip[]> {
    const { data, error } = await supabase
      .from('global_tips')
      .select('*')
    
    if (error) return []
    return data as GlobalTip[]
  },

  async addTip(tip: Omit<GlobalTip, 'id' | 'created_at'>): Promise<GlobalTip> {
    const { data, error } = await supabase
      .from('global_tips')
      .insert({
        ...tip,
        created_at: new Date().toISOString()
      })
      .select()
      .single()
    
    if (error) throw new Error(error.message)
    return data as GlobalTip
  },

  async updateTip(id: string, updates: Partial<GlobalTip>): Promise<void> {
    await supabase
      .from('global_tips')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
  },

  async deleteTip(id: string): Promise<void> {
    await supabase
      .from('global_tips')
      .delete()
      .eq('id', id)
  },

  async getActiveResources(): Promise<GlobalResource[]> {
    const { data, error } = await supabase
      .from('global_resources')
      .select('*')
      .eq('is_active', true)
    
    if (error) return []
    return data as GlobalResource[]
  },

  async getAllResources(): Promise<GlobalResource[]> {
    const { data, error } = await supabase
      .from('global_resources')
      .select('*')
    
    if (error) return []
    return data as GlobalResource[]
  },

  async addResource(resource: Omit<GlobalResource, 'id' | 'created_at'>): Promise<GlobalResource> {
    const { data, error } = await supabase
      .from('global_resources')
      .insert({
        ...resource,
        created_at: new Date().toISOString()
      })
      .select()
      .single()
    
    if (error) throw new Error(error.message)
    return data as GlobalResource
  },

  async getActiveSupplements(): Promise<Supplement[]> {
    const { data, error } = await supabase
      .from('supplements')
      .select('*')
      .eq('is_active', true)
    
    if (error) return []
    return (data || []).map((item: any) => ({
      ...item,
      benefits: item.benefits ? item.benefits.split(',') : []
    })) as Supplement[]
  },

  async getAllSupplements(): Promise<Supplement[]> {
    const { data, error } = await supabase
      .from('supplements')
      .select('*')
    
    if (error) return []
    return (data || []).map((item: any) => ({
      ...item,
      benefits: item.benefits ? item.benefits.split(',') : []
    })) as Supplement[]
  },

  async addSupplement(supplement: Omit<Supplement, 'id' | 'created_at'>): Promise<Supplement> {
    const { data, error } = await supabase
      .from('supplements')
      .insert({
        ...supplement,
        benefits: supplement.benefits.join(','),
        created_at: new Date().toISOString()
      })
      .select()
      .single()
    
    if (error) throw new Error(error.message)
    return { ...data, benefits: data.benefits ? data.benefits.split(',') : [] } as Supplement
  },

  async updateSupplement(id: string, updates: Partial<Supplement>): Promise<void> {
    const updateData: any = { 
      ...updates,
      updated_at: new Date().toISOString()
    }
    if (updates.benefits) {
      updateData.benefits = updates.benefits.join(',')
    }
    await supabase
      .from('supplements')
      .update(updateData)
      .eq('id', id)
  },

  async getStats() {
    const today = new Date().toISOString().split('T')[0]
    const [users, dailyProgress] = await Promise.all([
      supabase.from('users').select('*'),
      supabase.from('daily_progress').select('*').eq('date', today)
    ])
    return {
      totalUsers: users.data?.length || 0,
      activeToday: dailyProgress.data?.length || 0
    }
  },

  async initializeDefaultData() {
    try {
      // Verificar si ya hay tips
      const { data: existingTips } = await supabase.from('global_tips').select('*')
      
      if (!existingTips || existingTips.length === 0) {
        const defaultTips = [
          {
            category: "Hidratación",
            title: "Agua al despertar",
            content: "Bebe un vaso de agua tibia con limón al levantarte para activar tu metabolismo y mejorar la digestión.",
            icon: "💧",
            is_active: true
          },
          {
            category: "Ejercicio",
            title: "Micro movimientos",
            content: "Haz 10 sentadillas cada hora para mantener tu cuerpo activo durante el día laboral.",
            icon: "🏃‍♂️",
            is_active: true
          },
          {
            category: "Mindfulness",
            title: "Respiración 4-7-8",
            content: "Inhala 4 seg, mantén 7 seg, exhala 8 seg. Repite 4 veces para reducir estrés instantáneamente.",
            icon: "🧘‍♀️",
            is_active: true
          }
        ]

        for (const tip of defaultTips) {
          await dbFunctions.addTip(tip)
        }
      }

      // Verificar si ya hay recursos
      const { data: existingResources } = await supabase.from('global_resources').select('*')
      
      if (!existingResources || existingResources.length === 0) {
        const defaultResources = [
          {
            type: "mindfulness" as const,
            title: "Meditación guiada - Calma mental",
            description: "Sesión de 10 minutos para reducir ansiedad",
            url: "https://www.youtube.com/watch?v=ZToicYcHIOU",
            is_active: true
          },
          {
            type: "nutrition" as const,
            title: "Recetas saludables y fáciles",
            description: "25 recetas balanceadas para toda la semana",
            url: "https://www.habitos.mx/recetas-saludables/",
            is_active: true
          }
        ]

        for (const resource of defaultResources) {
          await dbFunctions.addResource(resource)
        }
      }

      // Verificar si ya hay suplementos
      const { data: existingSupplements } = await supabase.from('supplements').select('*')
      
      if (!existingSupplements || existingSupplements.length === 0) {
        const defaultSupplements = [
          {
            name: "VitalEnergy Plus",
            description: "Complejo vitamínico premium para aumentar energía natural y mejorar concentración",
            benefits: ["Aumenta energía", "Mejora concentración", "Reduce fatiga", "Apoya sistema inmune"],
            price: 89000,
            image_url: "/placeholder.svg?height=200&width=200",
            is_active: true,
            whatsapp_message: "Hola! Me interesa VitalEnergy Plus que vi en VitalMente. ¿Podrían darme más información sobre disponibilidad y forma de pago?"
          },
          {
            name: "RelaxMind Pro",
            description: "Suplemento natural avanzado para reducir estrés, ansiedad y mejorar calidad del sueño",
            benefits: ["Reduce ansiedad", "Mejora sueño", "Calma mental", "Control del estrés"],
            price: 75000,
            image_url: "/placeholder.svg?height=200&width=200",
            is_active: true,
            whatsapp_message: "Hola! Me interesa RelaxMind Pro para mejorar mi descanso. ¿Podrían contarme más sobre sus beneficios?"
          },
          {
            name: "MusclePro Elite",
            description: "Proteína premium de alta calidad para desarrollo muscular y recuperación rápida",
            benefits: ["Desarrollo muscular", "Recuperación rápida", "Aumenta fuerza", "Proteína completa"],
            price: 120000,
            image_url: "/placeholder.svg?height=200&width=200",
            is_active: true,
            whatsapp_message: "Hola! Me interesa MusclePro Elite para mi entrenamiento. ¿Qué sabores tienen disponibles y cuál es la forma de pago?"
          }
        ]

        for (const supplement of defaultSupplements) {
          await dbFunctions.addSupplement(supplement)
        }
      }
    } catch (error) {
      console.log('Datos por defecto ya inicializados o error menor:', error)
    }
  }
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function VitalMenteApp() {
  const [authState, setAuthState] = useState<'login' | 'register' | 'authenticated'>('login')
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("inicio")
  const [macroResults, setMacroResults] = useState<MacroResult | null>(null)
  const [connectionStatus, setConnectionStatus] = useState('connecting')
  
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
  const [progressHistory, setProgressHistory] = useState<DailyProgress[]>([])
  const [globalTips, setGlobalTips] = useState<GlobalTip[]>([])
  const [globalResources, setGlobalResources] = useState<GlobalResource[]>([])
  const [supplements, setSupplements] = useState<Supplement[]>([])
  const [currentTipIndex, setCurrentTipIndex] = useState(0)

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

  const [showMealModal, setShowMealModal] = useState(false)
  const [selectedMealType, setSelectedMealType] = useState('')
  const [mealCompositions, setMealCompositions] = useState([])
  const openMealModal = (mealType) => {
    setSelectedMealType(mealType)
    setShowMealModal(true)
}
  useEffect(() => {
    initializeApp()
  }, [])

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
      const [tips, resources, activeSupplements] = await Promise.all([
        dbFunctions.getActiveTips(),
        dbFunctions.getActiveResources(),
        dbFunctions.getActiveSupplements()
      ])
      setGlobalTips(tips)
      setGlobalResources(resources)
      setSupplements(activeSupplements)
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
      await loadUserData(user.id)
      calculateMacros(user)
      setAuthState('authenticated')
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
        age: parseInt(registerForm.age),
        weight: parseInt(registerForm.weight),
        height: parseInt(registerForm.height),
        activity_level: registerForm.activityLevel,
        goal: registerForm.goal
      }
      
      console.log("🚀 Datos a enviar:", userData)

      const newUser = await dbFunctions.createUser(userData)
      
      console.log("✅ Usuario creado:", newUser)

      setCurrentUser(newUser)
      setDailyProgress(prev => ({ ...prev, user_id: newUser.id }))
      calculateMacros(newUser)
      setAuthState('authenticated')
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
      const todayProgress = await dbFunctions.getTodayProgress(userId)
      if (todayProgress) {
        setDailyProgress(todayProgress)
      } else {
        setDailyProgress(prev => ({ ...prev, user_id: userId }))
      }

      const [foods, history] = await Promise.all([
        dbFunctions.getUserFoods(userId),
        dbFunctions.getProgressHistory(userId)
      ])
      setUserFoods(foods)
      setProgressHistory(history)
    } catch (error) {
      console.error('Error loading user data:', error)
    }
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setAuthState('login')
    setDailyProgress({
      id: "", user_id: "", date: new Date().toISOString().split('T')[0],
      water: 0, exercise: 0, mindfulness: 0, desayuno: 0, almuerzo: 0, cena: 0
    })
    setUserFoods([])
    setProgressHistory([])
    setMacroResults(null)
    setActiveTab("inicio")
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
    const goalData = GOALS.find(g => g.id === userData.goal) || GOALS[3] // Default a "Sentirse bien"
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
    const newProgress = { ...dailyProgress, [field]: Math.max(0, (dailyProgress as any)[field] + increment) }
    setDailyProgress(newProgress)
    
    if (currentUser) {
      try {
        await dbFunctions.saveProgress(currentUser.id, {
          water: newProgress.water, exercise: newProgress.exercise, mindfulness: newProgress.mindfulness,
          desayuno: newProgress.desayuno, almuerzo: newProgress.almuerzo, cena: newProgress.cena
        })
      } catch (error) {
        console.error('Error saving progress:', error)
      }
    }
  }

  const resetProgress = async (type?: 'all' | 'meals' | 'exercise' | 'mindfulness' | 'water') => {
    let newProgress = { ...dailyProgress }
    
    if (type === 'all' || !type) {
      newProgress = { ...newProgress, water: 0, exercise: 0, mindfulness: 0, desayuno: 0, almuerzo: 0, cena: 0 }
    } else if (type === 'meals') {
      newProgress = { ...newProgress, desayuno: 0, almuerzo: 0, cena: 0 }
    } else if (type === 'water') {
      newProgress = { ...newProgress, water: 0 }
    } else if (type === 'exercise') {
      newProgress = { ...newProgress, exercise: 0 }
    } else if (type === 'mindfulness') {
      newProgress = { ...newProgress, mindfulness: 0 }
    }
    
    setDailyProgress(newProgress)
    
    if (currentUser) {
      try {
        await dbFunctions.saveProgress(currentUser.id, {
          water: newProgress.water, exercise: newProgress.exercise, mindfulness: newProgress.mindfulness,
          desayuno: newProgress.desayuno, almuerzo: newProgress.almuerzo, cena: newProgress.cena
        })
      } catch (error) {
        console.error('Error saving progress:', error)
      }
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
        calories: parseInt(newFood.calories) || 0,
        protein: parseInt(newFood.protein) || 0, 
        carbs: parseInt(newFood.carbs) || 0,
        fats: parseInt(newFood.fats) || 0, 
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

  // Panel de administración
  const AdminPanel = () => {
    const [activeAdminTab, setActiveAdminTab] = useState("overview")
    const [showTipDialog, setShowTipDialog] = useState(false)
    const [showResourceDialog, setShowResourceDialog] = useState(false)
    const [showSupplementDialog, setShowSupplementDialog] = useState(false)
    const [resourceType, setResourceType] = useState<'mindfulness' | 'nutrition'>('mindfulness')
    const [adminStats, setAdminStats] = useState({ totalUsers: 0, activeToday: 0 })

    const [newTip, setNewTip] = useState({ category: "", title: "", content: "", icon: "💡" })
    const [newResource, setNewResource] = useState({ title: "", description: "", url: "" })
    const [newSupplement, setNewSupplement] = useState({
      name: "", description: "", benefits: "", price: "", image_url: "", whatsapp_message: ""
    })

    const [allTips, setAllTips] = useState<GlobalTip[]>([])
    const [allResources, setAllResources] = useState<GlobalResource[]>([])
    const [allSupplements, setAllSupplements] = useState<Supplement[]>([])

    useEffect(() => {
      if (isAdmin) loadAdminData()
    }, [isAdmin])

    const loadAdminData = async () => {
      try {
        const [tips, resources, supplements, stats] = await Promise.all([
          dbFunctions.getAllTips(),
          dbFunctions.getAllResources(),
          dbFunctions.getAllSupplements(),
          dbFunctions.getStats()
        ])
        setAllTips(tips)
        setAllResources(resources)
        setAllSupplements(supplements)
        setAdminStats(stats)
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

      try {
        const benefits = newSupplement.benefits.split(',').map(b => b.trim()).filter(b => b)
        
        await dbFunctions.addSupplement({
          name: newSupplement.name,
          description: newSupplement.description,
          benefits,
          price: parseInt(newSupplement.price),
          image_url: newSupplement.image_url || "/placeholder.svg?height=200&width=200",
          is_active: true,
          whatsapp_message: newSupplement.whatsapp_message
        })

        setNewSupplement({
          name: "", description: "", benefits: "", price: "", image_url: "", whatsapp_message: ""
        })
        setShowSupplementDialog(false)
        loadAdminData()
        loadGlobalContent()
      } catch (error: any) {
        console.error('Error adding supplement:', error)
        alert('Error al agregar suplemento: ' + error.message)
      }
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
      if (confirm("¿Estás seguro de eliminar este tip?")) {
        try {
          await dbFunctions.deleteTip(id)
          loadAdminData()
          loadGlobalContent()
        } catch (error) {
          console.error('Error deleting tip:', error)
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

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="border-b bg-white">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
                <p className="text-gray-600">Gestiona el contenido global de VitalMente</p>
                <Badge variant="outline" className="mt-1">🌐 Conectado a Supabase</Badge>
              </div>
              <Button onClick={() => setIsAdmin(false)} variant="outline">
                <LogOut className="w-4 h-4 mr-2" />
                Salir
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-6">
          <Tabs value={activeAdminTab} onValueChange={setActiveAdminTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Resumen</TabsTrigger>
              <TabsTrigger value="tips">Tips</TabsTrigger>
              <TabsTrigger value="resources">Recursos</TabsTrigger>
              <TabsTrigger value="supplements">Suplementos</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Tips Activos</p>
                        <p className="text-2xl font-bold text-green-600">{allTips.filter(t => t.is_active).length}</p>
                      </div>
                      <MessageSquare className="w-8 h-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Recursos Activos</p>
                        <p className="text-2xl font-bold text-blue-600">{allResources.filter(r => r.is_active).length}</p>
                      </div>
                      <Link className="w-8 h-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Suplementos Activos</p>
                        <p className="text-2xl font-bold text-amber-600">{allSupplements.filter(s => s.is_active).length}</p>
                      </div>
                      <Package className="w-8 h-8 text-amber-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Usuarios Registrados</p>
                        <p className="text-2xl font-bold text-purple-600">{adminStats.totalUsers}</p>
                      </div>
                      <Users className="w-8 h-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="tips" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Tips de Bienestar</h2>
                <Button onClick={() => setShowTipDialog(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Nuevo Tip
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {allTips.map(tip => (
                  <Card key={tip.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{tip.icon}</span>
                          <Badge variant="outline">{tip.category}</Badge>
                          <Badge variant={tip.is_active ? "default" : "secondary"}>
                            {tip.is_active ? "Activo" : "Inactivo"}
                          </Badge>
                        </div>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline" onClick={() => toggleTipStatus(tip.id)}>
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => deleteTip(tip.id)}>
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <h3 className="font-semibold mb-2">{tip.title}</h3>
                      <p className="text-sm text-gray-600">{tip.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="resources" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Recursos y Enlaces</h2>
                <Button onClick={() => setShowResourceDialog(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Nuevo Recurso
                </Button>
              </div>

              <div className="space-y-4">
                {allResources.map(resource => (
                  <Card key={resource.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{resource.title}</h4>
                          <p className="text-sm text-gray-600">{resource.description}</p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="outline">{resource.type}</Badge>
                            <Badge variant={resource.is_active ? "default" : "secondary"}>
                              {resource.is_active ? "Activo" : "Inactivo"}
                            </Badge>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => window.open(resource.url, '_blank')}>
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="supplements" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Gestión de Suplementos</h2>
                <Button onClick={() => setShowSupplementDialog(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Nuevo Suplemento
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {allSupplements.map(supplement => (
                  <Card key={supplement.id}>
                    <CardContent className="p-4">
                      <img
                        src={supplement.image_url}
                        alt={supplement.name}
                        className="w-full h-32 object-cover rounded-lg mb-3 bg-gray-100"
                      />
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold">{supplement.name}</h4>
                          <p className="text-lg font-bold text-green-600">${supplement.price.toLocaleString()}</p>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => toggleSupplementStatus(supplement.id)}>
                          <Eye className="w-3 h-3" />
                        </Button>
                      </div>
                      <Badge variant={supplement.is_active ? "default" : "secondary"} className="mb-2">
                        {supplement.is_active ? "Activo" : "Inactivo"}
                      </Badge>
                      <p className="text-sm text-gray-600 mb-2">{supplement.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Dialogs */}
        <Dialog open={showTipDialog} onOpenChange={setShowTipDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Tip</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Categoría"
                value={newTip.category}
                onChange={(e) => setNewTip(prev => ({ ...prev, category: e.target.value }))}
              />
              <Input
                placeholder="Título"
                value={newTip.title}
                onChange={(e) => setNewTip(prev => ({ ...prev, title: e.target.value }))}
              />
              <Textarea
                placeholder="Contenido"
                value={newTip.content}
                onChange={(e) => setNewTip(prev => ({ ...prev, content: e.target.value }))}
              />
              <Input
                placeholder="Emoji"
                value={newTip.icon}
                onChange={(e) => setNewTip(prev => ({ ...prev, icon: e.target.value }))}
              />
              <Button onClick={addGlobalTip} className="w-full">Agregar Tip</Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showResourceDialog} onOpenChange={setShowResourceDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar Recurso</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <select 
                className="w-full p-2 border rounded-lg"
                value={resourceType}
                onChange={(e) => setResourceType(e.target.value as 'mindfulness' | 'nutrition')}
              >
                <option value="mindfulness">Mindfulness</option>
                <option value="nutrition">Nutrición</option>
              </select>
              <Input
                placeholder="Título"
                value={newResource.title}
                onChange={(e) => setNewResource(prev => ({ ...prev, title: e.target.value }))}
              />
              <Input
                placeholder="Descripción"
                value={newResource.description}
                onChange={(e) => setNewResource(prev => ({ ...prev, description: e.target.value }))}
              />
              <Input
                placeholder="URL"
                value={newResource.url}
                onChange={(e) => setNewResource(prev => ({ ...prev, url: e.target.value }))}
              />
              <Button onClick={addGlobalResource} className="w-full">Agregar</Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showSupplementDialog} onOpenChange={setShowSupplementDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar Suplemento</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Nombre"
                value={newSupplement.name}
                onChange={(e) => setNewSupplement(prev => ({ ...prev, name: e.target.value }))}
              />
              <Textarea
                placeholder="Descripción"
                value={newSupplement.description}
                onChange={(e) => setNewSupplement(prev => ({ ...prev, description: e.target.value }))}
              />
              <Input
                placeholder="Beneficios (separados por comas)"
                value={newSupplement.benefits}
                onChange={(e) => setNewSupplement(prev => ({ ...prev, benefits: e.target.value }))}
              />
              <Input
                placeholder="Precio"
                type="number"
                value={newSupplement.price}
                onChange={(e) => setNewSupplement(prev => ({ ...prev, price: e.target.value }))}
              />
              <Input
                placeholder="URL imagen"
                value={newSupplement.image_url}
                onChange={(e) => setNewSupplement(prev => ({ ...prev, image_url: e.target.value }))}
              />
              <Textarea
                placeholder="Mensaje WhatsApp personalizado"
                value={newSupplement.whatsapp_message}
                onChange={(e) => setNewSupplement(prev => ({ ...prev, whatsapp_message: e.target.value }))}
              />
              <Button onClick={addSupplementAdmin} className="w-full">Agregar</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  if (isAdmin) {
    return <AdminPanel />
  }

  if (connectionStatus === 'connecting') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Conectando con Supabase</h3>
            <p className="text-gray-600">Inicializando base de datos...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (connectionStatus === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <X className="w-8 h-8 mx-auto mb-4 text-red-500" />
            <h3 className="text-lg font-semibold mb-2">Error de conexión</h3>
            <p className="text-gray-600 mb-4">No se pudo conectar con la base de datos</p>
            <Button onClick={() => window.location.reload()}>Reintentar</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (authState !== 'authenticated') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div onClick={handleLogoClick} className="cursor-pointer">
              <CardTitle className="text-2xl font-bold text-green-600">VitalMente</CardTitle>
              <CardDescription>Tu compañero de bienestar personalizado</CardDescription>
              <Badge variant="outline" className="mt-2">🌐 Conectado a Supabase</Badge>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="flex rounded-lg bg-gray-100 p-1">
              <button
                onClick={() => setAuthState('login')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  authState === 'login' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Ingresar
              </button>
              <button
                onClick={() => setAuthState('register')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  authState === 'register' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Crear Cuenta
              </button>
            </div>

            {authState === 'login' && (
              <div className="space-y-4">
                <Input
                  placeholder="+57 300 123 4567"
                  value={loginForm.phone}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, phone: e.target.value }))}
                />
                <Input
                  type="password"
                  placeholder="Código de 10 dígitos"
                  maxLength={10}
                  value={loginForm.accessCode}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, accessCode: e.target.value }))}
                />
                <Button onClick={handleLogin} className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Ingresando...
                    </>
                  ) : (
                    "Ingresar"
                  )}
                </Button>
              </div>
            )}

            {authState === 'register' && (
              <div className="space-y-4">
                <Input
                  placeholder="+57 300 123 4567"
                  value={registerForm.phone}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, phone: e.target.value }))}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="password"
                    placeholder="Código 10 dígitos"
                    maxLength={10}
                    value={registerForm.accessCode}
                    onChange={(e) => setRegisterForm(prev => ({ ...prev, accessCode: e.target.value }))}
                  />
                  <Input
                    type="password"
                    placeholder="Confirmar"
                    maxLength={10}
                    value={registerForm.confirmCode}
                    onChange={(e) => setRegisterForm(prev => ({ ...prev, confirmCode: e.target.value }))}
                  />
                </div>

                <Input
                  placeholder="Nombre completo"
                  value={registerForm.name}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, name: e.target.value }))}
                />
                
                <div className="grid grid-cols-3 gap-4">
                  <Input
                    placeholder="Edad"
                    type="number"
                    value={registerForm.age}
                    onChange={(e) => setRegisterForm(prev => ({ ...prev, age: e.target.value }))}
                  />
                  <Input
                    placeholder="Peso kg"
                    type="number"
                    value={registerForm.weight}
                    onChange={(e) => setRegisterForm(prev => ({ ...prev, weight: e.target.value }))}
                  />
                  <Input
                    placeholder="Altura cm"
                    type="number"
                    value={registerForm.height}
                    onChange={(e) => setRegisterForm(prev => ({ ...prev, height: e.target.value }))}
                  />
                </div>
                
                <select 
                  className="w-full p-2 border rounded-lg"
                  value={registerForm.activityLevel}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, activityLevel: parseFloat(e.target.value) }))}
                >
                  {ACTIVITY_LEVELS.map(level => (
                    <option key={level.value} value={level.value}>
                      {level.label} - {level.desc}
                    </option>
                  ))}
                </select>

                <select 
                  className="w-full p-2 border rounded-lg"
                  value={registerForm.goal}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, goal: e.target.value }))}
                >
                  <optgroup label="🎯 Objetivos Físicos">
                    {GOALS.filter(goal => goal.type === 'physical').map(goal => (
                      <option key={goal.id} value={goal.id}>{goal.label}</option>
                    ))}
                  </optgroup>
                  <optgroup label="💙 Objetivos Emocionales">
                    {GOALS.filter(goal => goal.type === 'emotional').map(goal => (
                      <option key={goal.id} value={goal.id}>{goal.label}</option>
                    ))}
                  </optgroup>
                </select>

                <Button onClick={handleRegister} className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creando...
                    </>
                  ) : (
                    "Crear cuenta"
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Dialog open={showAdminLogin} onOpenChange={setShowAdminLogin}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Acceso Administrador</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Código de acceso"
                value={adminCode}
                onChange={(e) => setAdminCode(e.target.value)}
              />
              <Button onClick={handleAdminLogin} className="w-full">Ingresar</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  const activeTips = globalTips.filter(tip => tip.is_active)
  const mindfulnessResources = globalResources.filter(r => r.type === 'mindfulness' && r.is_active)
  const nutritionResources = globalResources.filter(r => r.type === 'nutrition' && r.is_active);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pb-20">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          
          <TabsContent value="inicio" className="p-4 space-y-6">
            <div className="flex justify-between items-center">
              <div className="text-center flex-1">
                <h2 className="text-2xl font-bold text-gray-800">¡Hola {currentUser?.name}! 👋</h2>
                <p className="text-gray-600">Tu progreso de hoy</p>
                <p className="text-sm text-green-600 font-medium mt-1">
                  {getMotivationalMessage(currentUser?.goal || "")}
                </p>
                {getStreakDays() > 0 && (
                  <Badge variant="outline" className="mt-1">🔥 {getStreakDays()} días consecutivos</Badge>
                )}
              </div>
              <div className="flex gap-2">
                <Button onClick={() => resetProgress('all')} variant="outline" size="sm">
                  <RotateCcw className="w-4 h-4" />
                </Button>
                <Button onClick={handleLogout} variant="outline" size="sm">
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-green-600">{getProgressPercentage()}%</div>
                  <p className="text-sm text-gray-600">Progreso diario</p>
                </div>
                <Progress value={getProgressPercentage()} className="mb-4" />
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className={`p-3 rounded-lg ${dailyProgress.water >= 8 ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <Droplets className="w-5 h-5 mb-1 mx-auto" />
                    <div className="text-center">
                      <div className="font-bold">{dailyProgress.water}/8</div>
                      <div>Vasos de agua</div>
                    </div>
                  </div>
                  
                  <div className={`p-3 rounded-lg ${dailyProgress.exercise >= 1 ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <Activity className="w-5 h-5 mb-1 mx-auto" />
                    <div className="text-center">
                      <div className="font-bold">{dailyProgress.exercise}</div>
                      <div>Ejercicios</div>
                    </div>
                  </div>
                  
                  <div className={`p-3 rounded-lg ${dailyProgress.mindfulness >= 1 ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <Brain className="w-5 h-5 mb-1 mx-auto" />
                    <div className="text-center">
                      <div className="font-bold">{dailyProgress.mindfulness}</div>
                      <div>Mindfulness</div>
                    </div>
                  </div>
                  
                  <div className={`p-3 rounded-lg ${(dailyProgress.desayuno + dailyProgress.almuerzo + dailyProgress.cena) >= 3 ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <UtensilsCrossed className="w-5 h-5 mb-1 mx-auto" />
                    <div className="text-center">
                      <div className="font-bold">{dailyProgress.desayuno + dailyProgress.almuerzo + dailyProgress.cena}/3</div>
                      <div>Comidas</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Droplets className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                  <div className="flex justify-center items-center gap-2">
                    <Button size="sm" variant="outline" onClick={() => updateProgress('water', -1)}>
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="font-bold text-lg">{dailyProgress.water}</span>
                    <Button size="sm" variant="outline" onClick={() => updateProgress('water', 1)}>
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Vasos de agua</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <Activity className="w-8 h-8 mx-auto mb-2 text-green-500" />
                  <div className="flex justify-center items-center gap-2">
                    <Button size="sm" variant="outline" onClick={() => updateProgress('exercise', -1)}>
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="font-bold text-lg">{dailyProgress.exercise}</span>
                    <Button size="sm" variant="outline" onClick={() => updateProgress('exercise', 1)}>
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Ejercicios</p>
                </CardContent>
              </Card>
            </div>

            {progressHistory.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Progreso reciente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {progressHistory.slice(0, 5).map(progress => {
                      const date = new Date(progress.date).toLocaleDateString()
                      const total = progress.water + progress.exercise + progress.mindfulness + 
                                   progress.desayuno + progress.almuerzo + progress.cena
                      return (
                        <div key={progress.id} className="flex justify-between items-center p-2 border rounded">
                          <span className="text-sm">{date}</span>
                          <span className="text-sm font-medium">{total} actividades</span>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="nutricion" className="p-4 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">🍽 Nutrición</h2>
              <Button onClick={() => resetProgress('meals')} variant="outline" size="sm">
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>

            {nutritionResources.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Recursos recomendados</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {nutritionResources.map(resource => (
                    <div key={resource.id} className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold">{resource.title}</h4>
                        <p className="text-sm text-gray-600">{resource.description}</p>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => window.open(resource.url, '_blank')}>
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {macroResults && currentUser && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {macroResults.goalType === 'emotional' ? 'Tu alimentación balanceada' : 'Tus macros diarios'}
                    <Badge variant="secondary">{macroResults.goalLabel}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-2xl font-bold text-green-600">{macroResults.calories}</div>
                    <div className="text-sm text-gray-600">
                      {macroResults.goalType === 'emotional' 
                        ? 'calorías para sentirte bien' 
                        : 'calorías por día'
                      }
                    </div>
                  </div>
                  
                  {macroResults.goalType === 'emotional' && (
                    <div className="text-center mb-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                      <p className="text-sm text-purple-700">
                        🌟 Alimentación balanceada para tu bienestar emocional
                      </p>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">{macroResults.protein}g</div>
                      <div className="text-sm text-gray-600">Proteínas</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{macroResults.carbs}g</div>
                      <div className="text-sm text-gray-600">Carbohidratos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-yellow-600">{macroResults.fats}g</div>
                      <div className="text-sm text-gray-600">Grasas</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Registro del día</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['desayuno', 'almuerzo', 'cena'].map(meal => (
                    <div key={meal} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <h4 className="font-semibold capitalize">{meal}</h4>
                        <p className="text-sm text-gray-600">
                          {dailyProgress[meal as keyof DailyProgress]} alimento(s)
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {/* ✅ CORRECCIÓN 2: Button correctamente formateado */}
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => openMealModal(meal)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <Button size="sm" onClick={() => {
                          setSelectedMeal(meal as 'desayuno' | 'almuerzo' | 'cena')
                          setShowFoodDialog(true)
                        }}>
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {userFoods.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Mis alimentos personalizados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {userFoods.map(food => (
                      <div key={food.id} className="p-3 border rounded-lg">
                        <h4 className="font-semibold">{food.name}</h4>
                        <p className="text-sm text-gray-600">
                          {food.calories} cal | P: {food.protein}g | C: {food.carbs}g | G: {food.fats}g
                        </p>
                        <Badge variant="outline" className="mt-1 text-xs">{food.category}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="ejercicio" className="p-4 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">💪 Ejercicio</h2>
              <Button onClick={() => resetProgress('exercise')} variant="outline" size="sm">
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>

            <Card>
              <CardContent className="p-6 text-center">
                <Activity className="w-16 h-16 mx-auto mb-4 text-green-600" />
                <h3 className="text-xl font-bold mb-2">Ejercicios completados</h3>
                <div className="text-3xl font-bold text-green-600 mb-4">{dailyProgress.exercise}</div>
                
                <div className="flex justify-center items-center gap-4">
                  <Button variant="outline" onClick={() => updateProgress('exercise', -1)}>
                    <Minus className="w-4 h-4" />
                  </Button>
                  <Button onClick={() => updateProgress('exercise', 1)}>
                    Agregar ejercicio
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ejercicios sugeridos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold">Caminar 15 min</h4>
                  <p className="text-sm text-gray-600">Ideal para comenzar el día</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-semibold">Estiramientos</h4>
                  <p className="text-sm text-gray-600">Perfecto para cualquier momento</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold">Ejercicios de fuerza</h4>
                  <p className="text-sm text-gray-600">20 min, sin equipamiento</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mindfulness" className="p-4 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">🧘‍♀️ Mindfulness</h2>
              <Button onClick={() => resetProgress('mindfulness')} variant="outline" size="sm">
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>

            {currentUser && GOALS.find(g => g.id === currentUser.goal)?.type === 'emotional' && (
              <Card className="bg-gradient-to-r from-purple-100 to-pink-100">
                <CardContent className="p-4 text-center">
                  <h3 className="font-bold text-purple-800 mb-1">
                    ¡Perfecto para tu objetivo!
                  </h3>
                  <p className="text-sm text-purple-700">
                    {currentUser.goal === 'find_calm' && "El mindfulness es ideal para encontrar la calma que buscas 🧘"}
                    {currentUser.goal === 'balance' && "Las prácticas de mindfulness te ayudarán a encontrar el equilibrio perfecto ⚡"}
                    {currentUser.goal === 'feel_good' && "Estas sesiones te harán sentir increíble ✨"}
                    {currentUser.goal === 'vitalmente' && "¡El mindfulness es esencial para sentirte VitalMente! 🌟"}
                  </p>
                </CardContent>
              </Card>
            )}

            {mindfulnessResources.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Recursos de mindfulness</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mindfulnessResources.map(resource => (
                    <div key={resource.id} className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold">{resource.title}</h4>
                        <p className="text-sm text-gray-600">{resource.description}</p>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => window.open(resource.url, '_blank')}>
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            <Card>
              <CardContent className="p-6 text-center">
                <Brain className="w-16 h-16 mx-auto mb-4 text-purple-600" />
                <h3 className="text-xl font-bold mb-2">Sesiones completadas</h3>
                <div className="text-3xl font-bold text-purple-600 mb-4">{dailyProgress.mindfulness}</div>
                
                <div className="flex justify-center items-center gap-4">
                  <Button variant="outline" onClick={() => updateProgress('mindfulness', -1)}>
                    <Minus className="w-4 h-4" />
                  </Button>
                  <Button onClick={() => updateProgress('mindfulness', 1)}>
                    Completar sesión
                  </Button>
                </div>
              </CardContent>
            </Card>

            {activeTips.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Tips de bienestar</span>
                    <Lightbulb className="w-5 h-5" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-lg">
                    <div className="text-2xl mb-2">{activeTips[currentTipIndex]?.icon}</div>
                    <h3 className="font-bold mb-2">{activeTips[currentTipIndex]?.title}</h3>
                    <p className="text-sm mb-4">{activeTips[currentTipIndex]?.content}</p>
                    <Badge variant="secondary" className="text-purple-800">
                      {activeTips[currentTipIndex]?.category}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentTipIndex(prev => prev > 0 ? prev - 1 : activeTips.length - 1)}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <span className="text-sm text-gray-500">
                      {currentTipIndex + 1} / {activeTips.length}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentTipIndex(prev => prev < activeTips.length - 1 ? prev + 1 : 0)}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="suplementos" className="p-4 space-y-6">
            <h2 className="text-2xl font-bold text-center">💊 Suplementos Recomendados</h2>

            <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
              <CardContent className="p-4 text-center">
                <Package className="w-8 h-8 mx-auto mb-2" />
                <h3 className="font-bold mb-1">Productos Premium</h3>
                <p className="text-sm">Suplementos seleccionados para potenciar tu bienestar</p>
              </CardContent>
            </Card>

            {supplements.length > 0 ? (
              <div className="space-y-4">
                {supplements.map(supplement => (
                  <Card key={supplement.id}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <img
                          src={supplement.image_url}
                          alt={supplement.name}
                          className="w-20 h-20 object-cover rounded-lg bg-gray-100 flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-bold text-lg">{supplement.name}</h3>
                              <p className="text-2xl font-bold text-green-600">${supplement.price.toLocaleString()}</p>
                            </div>
                            <Button size="sm" onClick={() => handleSupplementContact(supplement)} className="bg-green-600 hover:bg-green-700">
                              <Phone className="w-3 h-3 mr-1" />
                              Contactar
                            </Button>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{supplement.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {supplement.benefits.map((benefit, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {benefit}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <Package className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold mb-2">Próximamente</h3>
                  <p className="text-gray-600">Estamos preparando una selección especial de suplementos para ti.</p>
                </CardContent>
              </Card>
            )}

            <Card className="bg-gray-50">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">💬 ¿Tienes dudas?</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Nuestro equipo está listo para asesorarte sobre el suplemento ideal para tus objetivos.
                </p>
                <Button variant="outline" className="w-full" onClick={() => {
                  const whatsappUrl = `https://wa.me/573134852878?text=${encodeURIComponent("Hola! Me gustaría recibir asesoría sobre suplementos desde VitalMente. ¿Podrían ayudarme?")}`
                  window.open(whatsappUrl, '_blank')
                }}>
                  <Phone className="w-4 h-4 mr-2" />
                  Asesoría personalizada
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="grid grid-cols-5 h-16">
          <button
            onClick={() => setActiveTab("inicio")}
            className={`flex flex-col items-center justify-center space-y-1 ${
              activeTab === "inicio" ? "text-green-600" : "text-gray-400"
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">Inicio</span>
          </button>

          <button
            onClick={() => setActiveTab("nutricion")}
            className={`flex flex-col items-center justify-center space-y-1 ${
              activeTab === "nutricion" ? "text-green-600" : "text-gray-400"
            }`}
          >
            <UtensilsCrossed className="w-5 h-5" />
            <span className="text-xs">Nutrición</span>
          </button>

          <button
            onClick={() => setActiveTab("ejercicio")}
            className={`flex flex-col items-center justify-center space-y-1 ${
              activeTab === "ejercicio" ? "text-green-600" : "text-gray-400"
            }`}
          >
            <Activity className="w-5 h-5" />
            <span className="text-xs">Ejercicio</span>
          </button>

          <button
            onClick={() => setActiveTab("mindfulness")}
            className={`flex flex-col items-center justify-center space-y-1 ${
              activeTab === "mindfulness" ? "text-green-600" : "text-gray-400"
            }`}
          >
            <Brain className="w-5 h-5" />
            <span className="text-xs">Mindfulness</span>
          </button>

          <button
            onClick={() => setActiveTab("suplementos")}
            className={`flex flex-col items-center justify-center space-y-1 ${
              activeTab === "suplementos" ? "text-green-600" : "text-gray-400"
            }`}
          >
            <Package className="w-4 h-4" />
            <span className="text-xs">Suplementos</span>
          </button>
        </div>
      </div>

      <Dialog open={showFoodDialog} onOpenChange={setShowFoodDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar alimento - {selectedMeal}</DialogTitle>
            <DialogDescription>
              Registra un alimento personalizado con sus valores nutricionales
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Nombre del alimento"
              value={newFood.name}
              onChange={(e) => setNewFood(prev => ({ ...prev, name: e.target.value }))}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Calorías"
                type="number"
                value={newFood.calories}
                onChange={(e) => setNewFood(prev => ({ ...prev, calories: e.target.value }))}
              />
              <Input
                placeholder="Proteínas (g)"
                type="number"
                value={newFood.protein}
                onChange={(e) => setNewFood(prev => ({ ...prev, protein: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Carbohidratos (g)"
                type="number"
                value={newFood.carbs}
                onChange={(e) => setNewFood(prev => ({ ...prev, carbs: e.target.value }))}
              />
              <Input
                placeholder="Grasas (g)"
                type="number"
                value={newFood.fats}
                onChange={(e) => setNewFood(prev => ({ ...prev, fats: e.target.value }))}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={addUserFood} className="flex-1">
                Agregar alimento
              </Button>
              <Button variant="outline" onClick={() => {
                updateProgress(selectedMeal!, 1)
                setShowFoodDialog(false)
                setSelectedMeal(null)
              }}>
                Solo contar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
