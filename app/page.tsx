'use client'

import { useState, useEffect } from "react"
import { createClient } from '@supabase/supabase-js'

// ✅ CORRECCIÓN: Reemplazamos los imports problemáticos con HTML + Tailwind CSS
// Iconos simples como emojis en lugar de lucide-react
const Icons = {
  Home: () => '🏠',
  UtensilsCrossed: () => '🍽️',
  Activity: () => '💪',
  Brain: () => '🧠',
  ChevronLeft: () => '◀️',
  ChevronRight: () => '▶️',
  Lightbulb: () => '💡',
  Droplets: () => '💧',
  Plus: () => '+',
  Minus: () => '-',
  RotateCcw: () => '🔄',
  X: () => '✖️',
  ExternalLink: () => '🔗',
  Edit: () => '✏️',
  Trash2: () => '🗑️',
  LogOut: () => '🚪',
  Users: () => '👥',
  MessageSquare: () => '💬',
  Link: () => '🔗',
  ChefHat: () => '👨‍🍳',
  Globe: () => '🌍',
  Eye: () => '👁️',
  Phone: () => '📞',
  UserPlus: () => '👤+',
  Calendar: () => '📅',
  Package: () => '📦',
  Loader2: () => '⏳',
  Calculator: () => '🧮',
  CheckCircle: () => '✅',
  AlertCircle: () => '⚠️',
  Play: () => '▶️',
  Dumbbell: () => '🏋️',
  Music: () => '🎵'
}

// ============================================================================
// CONFIGURACIÓN DE SUPABASE REAL
// ============================================================================

const SUPABASE_URL = 'https://frzyksfceugddjrerxkf.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyenlrc2ZjZXVnZGRqcmVyeGtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3MzgwMTUsImV4cCI6MjA2NzMxNDAxNX0.E6ZjfC6RJoA98RkDK-I87k2l3d7naK9C-mEC0alH7L8'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// ============================================================================
// 🆕 FUNCIONES PARA MINIATURAS MULTIMEDIA
// ============================================================================

const getYouTubeThumbnail = (url: string): string => {
  // Extraer video ID de diferentes formatos de YouTube
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/ // ID directo
  ]
  
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) {
      const videoId = match[1]
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    }
  }
  
  // Si no es YouTube, return placeholder
  return "/placeholder.svg?height=180&width=320&text=Video"
}

const getSpotifyThumbnail = (url: string): string => {
  // Para Spotify usaremos un placeholder con icono de música
  if (url.includes('spotify.com')) {
    return "/placeholder.svg?height=180&width=320&text=🎵+Spotify"
  }
  return "/placeholder.svg?height=180&width=320&text=Audio"
}

const isYouTubeUrl = (url: string): boolean => {
  return url.includes('youtube.com') || url.includes('youtu.be')
}

const isSpotifyUrl = (url: string): boolean => {
  return url.includes('spotify.com')
}

const isPDFUrl = (url: string): boolean => {
  return url.toLowerCase().includes('.pdf') || url.includes('drive.google.com')
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
  
  // Default por tipo
  const typeDefaults = {
    'mindfulness': "/placeholder.svg?height=180&width=320&text=🧘+Mindfulness",
    'nutrition': "/placeholder.svg?height=180&width=320&text=🥗+Nutrición",
    'exercise': "/placeholder.svg?height=180&width=320&text=💪+Ejercicio"
  }
  
  return typeDefaults[type as keyof typeof typeDefaults] || "/placeholder.svg?height=180&width=320&text=Recurso"
}

// ============================================================================
// TIPOS Y DATOS INICIALES (ACTUALIZADOS CON EXERCISE)
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
  meal_type: 'desayuno' | 'almuerzo' | 'cena'
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

// 🆕 ACTUALIZADO: Incluye "exercise"
interface GlobalResource {
  id: string
  type: 'mindfulness' | 'nutrition' | 'exercise'
  title: string
  description: string
  url: string
  image_url?: string // 🆕 Para PDFs con imagen personalizada
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

// 🆕 NUEVAS INTERFACES PARA GAMIFICACIÓN
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
  created_at: string
  updated_at: string
}

interface UserChallenge {
  id: string
  user_id: string
  challenge_type: string
  title: string
  description: string
  target_value: number
  current_progress: number
  reward_points: number
  difficulty: string
  week_start: string
  is_completed: boolean
  completed_at?: string
  created_at: string
}

interface UserAchievement {
  id: string
  user_id: string
  achievement_type: string
  title: string
  description: string
  icon: string
  points_earned: number
  rarity: string
  unlocked_at: string
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
  is_active: boolean
  shown_count: number
  clicked: boolean
  purchased: boolean
  expires_at?: string
  created_at: string
}

const ACTIVITY_LEVELS = [
  { value: 1.2, label: "Sedentario", desc: "Poco ejercicio" },
  { value: 1.375, label: "Ligero", desc: "1-3 días/semana" },
  { value: 1.55, label: "Moderado", desc: "3-5 días/semana" },
  { value: 1.725, label: "Activo", desc: "6-7 días/semana" },
  { value: 1.9, label: "Muy Activo", desc: "Ejercicio intenso diario" }
]

const GOALS = [
  // 🎯 TRANSFORMACIÓN FÍSICA
  { id: "lose_weight", label: "💪 Perder peso y tonificar", protein: 30, carbs: 35, fats: 35, calAdjust: -0.2, type: "physical", category: "physical" },
  { id: "gain_muscle", label: "🏋️ Ganar músculo y fuerza", protein: 30, carbs: 40, fats: 30, calAdjust: 0.15, type: "physical", category: "physical" },
  { id: "maintain_weight", label: "⚖️ Mantener mi peso actual", protein: 25, carbs: 45, fats: 30, calAdjust: 0, type: "physical", category: "physical" },
  
  // 💫 BIENESTAR EMOCIONAL  
  { id: "reduce_stress", label: "🧘 Reducir estrés y ansiedad", protein: 25, carbs: 45, fats: 30, calAdjust: 0, type: "emotional", category: "emotional" },
  { id: "find_calm", label: "☮️ Encontrar calma interior", protein: 25, carbs: 45, fats: 30, calAdjust: 0, type: "emotional", category: "emotional" },
  { id: "boost_confidence", label: "✨ Mejorar mi autoestima", protein: 25, carbs: 45, fats: 30, calAdjust: 0, type: "emotional", category: "emotional" },
  
  // ⚖️ EQUILIBRIO TOTAL
  { id: "life_balance", label: "⚡ Balancear cuerpo y mente", protein: 25, carbs: 45, fats: 30, calAdjust: 0, type: "holistic", category: "holistic" },
  { id: "healthy_habits", label: "🌱 Crear hábitos sostenibles", protein: 25, carbs: 45, fats: 30, calAdjust: 0, type: "holistic", category: "holistic" },
  { id: "vitalmente", label: "🌟 Sentirme VitalMente", protein: 25, carbs: 45, fats: 30, calAdjust: 0, type: "holistic", category: "holistic" }
]

// ============================================================================
// 🚀 FUNCIONES DE BASE DE DATOS MEJORADAS
// ============================================================================

const dbFunctions = {
  async findUserByPhone(phone: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('phone', phone)
        .single()
      
      if (error) {
        console.log('Usuario no encontrado:', error.message)
        return null
      }
      return data as UserProfile
    } catch (error) {
      console.error('Error finding user:', error)
      return null
    }
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
    try {
      await supabase
        .from('users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', userId)
    } catch (error) {
      console.error('Error updating last login:', error)
    }
  },

  async getTodayProgress(userId: string): Promise<DailyProgress | null> {
    try {
      const today = new Date().toISOString().split('T')[0]
      console.log('🔍 Cargando progreso para:', userId, 'fecha:', today)
      
      const { data, error } = await supabase
        .from('daily_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('date', today)
        .single()
      
      if (error) {
        if (error.code === 'PGRST116') {
          console.log('📝 No hay progreso para hoy, se creará uno nuevo')
          return null
        }
        throw error
      }
      
      console.log('✅ Progreso cargado:', data)
      return data as DailyProgress
    } catch (error) {
      console.error('❌ Error loading today progress:', error)
      return null
    }
  },

  async saveProgress(userId: string, progress: Omit<DailyProgress, 'id' | 'user_id' | 'date'>): Promise<boolean> {
    try {
      const today = new Date().toISOString().split('T')[0]
      
      console.log('💾 Guardando progreso:', {
        user_id: userId,
        date: today,
        ...progress
      })

      const { data, error } = await supabase
        .from('daily_progress')
        .upsert(
          {
            user_id: userId,
            date: today,
            ...progress,
            updated_at: new Date().toISOString()
          },
          { 
            onConflict: 'user_id,date',
            ignoreDuplicates: false 
          }
        )
        .select()

      if (error) {
        console.error('❌ Error guardando progreso:', error)
        throw error
      }

      console.log('✅ Progreso guardado exitosamente:', data)
      return true

    } catch (error) {
      console.error('❌ Error en saveProgress:', error)
      return false
    }
  },

  async verifyProgressSaved(userId: string, expectedData: any): Promise<boolean> {
    try {
      const today = new Date().toISOString().split('T')[0]
      const { data, error } = await supabase
        .from('daily_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('date', today)
        .single()

      if (error || !data) return false

      const matches = data.water === expectedData.water && 
                     data.exercise === expectedData.exercise &&
                     data.mindfulness === expectedData.mindfulness &&
                     data.desayuno === expectedData.desayuno &&
                     data.almuerzo === expectedData.almuerzo &&
                     data.cena === expectedData.cena

      console.log('🔍 Verificación de datos:', {
        guardado: data,
        esperado: expectedData,
        coincide: matches
      })

      return matches
    } catch (error) {
      console.error('Error verificando progreso:', error)
      return false
    }
  },

  async getProgressHistory(userId: string, days: number = 7): Promise<DailyProgress[]> {
    try {
      const { data, error } = await supabase
        .from('daily_progress')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: false })
        .limit(days)
      
      if (error) throw error
      return data as DailyProgress[]
    } catch (error) {
      console.error('Error loading progress history:', error)
      return []
    }
  },

  async getUserFoods(userId: string): Promise<UserFood[]> {
    try {
      const { data, error } = await supabase
        .from('user_foods')
        .select('*')
        .eq('user_id', userId)
      
      if (error) throw error
      return data as UserFood[]
    } catch (error) {
      console.error('Error loading user foods:', error)
      return []
    }
  },

  async getGlobalFoods(): Promise<GlobalFood[]> {
    try {
      const { data, error } = await supabase
        .from('global_foods')
        .select('*')
        .eq('is_active', true)
        .order('category', { ascending: true })
        .order('name', { ascending: true })
      
      if (error) throw error
      console.log('✅ Alimentos globales cargados:', data?.length || 0)
      return data as GlobalFood[]
    } catch (error) {
      console.error('Error loading global foods:', error)
      return []
    }
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

  async getTodayMealCompositions(userId: string): Promise<MealComposition[]> {
    try {
      const today = new Date().toISOString().split('T')[0]
      console.log('🔍 Cargando comidas para:', userId, 'fecha:', today)
      
      const { data, error } = await supabase
        .from('meal_compositions')
        .select('*')
        .eq('user_id', userId)
        .eq('date', today)
        .order('created_at', { ascending: true })
      
      if (error) throw error
      
      console.log('✅ Comidas cargadas:', data?.length || 0)
      return data as MealComposition[]
    } catch (error) {
      console.error('Error loading meal compositions:', error)
      return []
    }
  },

  async addMealComposition(composition: Omit<MealComposition, 'id' | 'created_at'>): Promise<MealComposition> {
    try {
      console.log('💾 Guardando composición de comida:', composition)
      
      const { data, error } = await supabase
        .from('meal_compositions')
        .insert({
          ...composition,
          created_at: new Date().toISOString()
        })
        .select()
        .single()
      
      if (error) throw error
      
      console.log('✅ Composición guardada:', data)
      return data as MealComposition
    } catch (error) {
      console.error('Error adding meal composition:', error)
      throw error
    }
  },

  async deleteMealComposition(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('meal_compositions')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      console.log('✅ Composición eliminada:', id)
    } catch (error) {
      console.error('Error deleting meal composition:', error)
      throw error
    }
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

  async deleteResource(id: string): Promise<void> {
    await supabase
      .from('global_resources')
      .delete()
      .eq('id', id)
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

  async deleteSupplement(id: string): Promise<void> {
    await supabase
      .from('supplements')
      .delete()
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

      // 🆕 ACTUALIZADO: Verificar si ya hay recursos (incluyendo exercise)
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
          },
          // 🆕 RECURSOS DE EJERCICIO POR DEFECTO
          {
            type: "exercise" as const,
            title: "Rutina de ejercicios en casa - 20 minutos",
            description: "Entrenamiento completo sin equipamiento",
            url: "https://www.youtube.com/watch?v=8dQKcziOQ8I",
            is_active: true
          },
          {
            type: "exercise" as const,
            title: "Yoga para principiantes",
            description: "15 minutos de yoga matutino para activar el cuerpo",
            url: "https://www.youtube.com/watch?v=VaoV1PrYft4",
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
  },

  async uploadSupplementImage(file: File, supplementName: string): Promise<string> {
    try {
      console.log('📤 Iniciando upload de imagen:', file.name)
      
      const fileExt = file.name.split('.').pop()
      const fileName = `${supplementName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.${fileExt}`
      
      console.log('📝 Nombre generado:', fileName)
      
      const { data, error } = await supabase.storage
        .from('supplement-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        })
      
      if (error) {
        console.error('❌ Error en upload:', error)
        throw error
      }
      
      console.log('✅ Archivo subido:', data)
      
      const { data: { publicUrl } } = supabase.storage
        .from('supplement-images')
        .getPublicUrl(fileName)
      
      console.log('🔗 URL pública generada:', publicUrl)
      return publicUrl
      
    } catch (error) {
      console.error('💥 Error completo en uploadSupplementImage:', error)
      throw error
    }
  },

  async deleteSupplementImage(imageUrl: string): Promise<void> {
    try {
      const fileName = imageUrl.split('/').pop()
      if (!fileName) return
      
      const { error } = await supabase.storage
        .from('supplement-images')
        .remove([fileName])
      
      if (error) throw error
      console.log('🗑️ Imagen eliminada:', fileName)
    } catch (error) {
      console.error('Error eliminando imagen:', error)
    }
  },
// 🆕 FUNCIONES DE GAMIFICACIÓN
  async getUserGamification(userId: string): Promise<UserGamification | null> {
    try {
      const { data, error } = await supabase
        .from('user_gamification')
        .select('*')
        .eq('user_id', userId)
        .single()
      
      if (error) {
        console.log('No gamification data found for user:', userId)
        return null
      }
      return data as UserGamification
    } catch (error) {
      console.error('Error loading user gamification:', error)
      return null
    }
  },

  async getUserChallenges(userId: string): Promise<UserChallenge[]> {
    try {
      const { data, error } = await supabase
        .from('user_challenges')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data as UserChallenge[]
    } catch (error) {
      console.error('Error loading user challenges:', error)
      return []
    }
  },

  async getAIRecommendations(userId: string): Promise<AIRecommendation[]> {
    try {
      const { data, error } = await supabase
        .from('ai_supplement_recommendations')
        .select('*')
        .eq('user_id', userId)
        .eq('is_active', true)
        .order('priority', { ascending: false })
      
      if (error) throw error
      return data as AIRecommendation[]
    } catch (error) {
      console.error('Error loading AI recommendations:', error)
      return []
    }
  }
  }

// ============================================================================
// COMPONENTE PRINCIPAL CON RECURSOS MULTIMEDIA MEJORADOS
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
    activityLevel: 1.375, goal: "reduce_stress"
  })
  const [showRegister, setShowRegister] = useState(false)

  const [showFoodDialog, setShowFoodDialog] = useState(false)
  const [selectedMeal, setSelectedMeal] = useState<'desayuno' | 'almuerzo' | 'cena' | null>(null)
  const [newFood, setNewFood] = useState({ name: "", calories: "", protein: "", carbs: "", fats: "" })

  const [showFloatingMenu, setShowFloatingMenu] = useState(false)

  // 🆕 ESTADOS PARA GAMIFICACIÓN
  const [userGamification, setUserGamification] = useState<UserGamification | null>(null)
  const [userChallenges, setUserChallenges] = useState<UserChallenge[]>([])
  const [aiRecommendations, setAiRecommendations] = useState<AIRecommendation[]>([])
  const [showGamificationPanel, setShowGamificationPanel] = useState(false)
  const [showAchievementNotification, setShowAchievementNotification] = useState<UserAchievement | null>(null)

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
      const [tips, resources, activeSupplements, globalFoodsList] = await Promise.all([
        dbFunctions.getActiveTips(),
        dbFunctions.getActiveResources(),
        dbFunctions.getActiveSupplements(),
        dbFunctions.getGlobalFoods()
      ])
      setGlobalTips(tips)
      setGlobalResources(resources)
      setSupplements(activeSupplements)
      setGlobalFoods(globalFoodsList)
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

      // Cargar otros datos en paralelo
const [foods, history, compositions, gamification, challenges, recommendations] = await Promise.all([
  dbFunctions.getUserFoods(userId),
  dbFunctions.getProgressHistory(userId),
  dbFunctions.getTodayMealCompositions(userId),
  dbFunctions.getUserGamification(userId),
  dbFunctions.getUserChallenges(userId),
  dbFunctions.getAIRecommendations(userId)
])
      
      setUserFoods(foods)
      setProgressHistory(history)
      setMealCompositions(compositions)
      
      calculateConsumedMacros(compositions)
      
      // 🆕 Establecer datos de gamificación
      setUserGamification(gamification)
      setUserChallenges(challenges)
      setAiRecommendations(recommendations)
      
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
    setSaveStatus('idle')
    setLastSaveTime(null)
    // 🆕 Limpiar estados de gamificación
    setUserGamification(null)
    setUserChallenges([])
    setAiRecommendations([])
    setShowGamificationPanel(false)
    setShowAchievementNotification(null)
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

  const openMealCalculator = (mealType: 'desayuno' | 'almuerzo' | 'cena') => {
    setSelectedMealType(mealType)
    setShowMealCalculator(true)
    setSelectedFood(null)
    setFoodQuantity('100')
  }

  const addFoodToMeal = async () => {
    if (!selectedFood || !currentUser || !foodQuantity) return

    try {
      const quantity = parseInt(foodQuantity)
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

  const getFoodsByCategory = () => {
    const categories = [
      { id: 'proteinas', name: 'Proteínas', icon: '🍗' },
      { id: 'vegetales', name: 'Vegetales', icon: '🥬' },
      { id: 'frutas', name: 'Frutas', icon: '🍎' },
      { id: 'carbohidratos', name: 'Carbohidratos', icon: '🌾' }
    ]

    return categories.map(category => ({
      ...category,
      foods: globalFoods.filter(food => food.category === category.id)
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

  // 🆕 FUNCIÓN PARA OBTENER ICONO SEGÚN TIPO DE RECURSO
  const getResourceTypeIcon = (type: string) => {
    switch(type) {
      case 'mindfulness': return '🧘‍♀️'
      case 'nutrition': return '🥗'
      case 'exercise': return '💪'
      default: return '📝'
    }
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

  // PANEL DE ADMINISTRACIÓN COMPLETO CON CATEGORÍA EXERCISE
  const AdminPanel = () => {
    const [activeAdminTab, setActiveAdminTab] = useState("overview")
    const [showTipDialog, setShowTipDialog] = useState(false)
    const [showResourceDialog, setShowResourceDialog] = useState(false)
    const [showSupplementDialog, setShowSupplementDialog] = useState(false)
    // 🔧 ACTUALIZADO: Incluye "exercise"
    const [resourceType, setResourceType] = useState<'mindfulness' | 'nutrition' | 'exercise'>('mindfulness')
    const [adminStats, setAdminStats] = useState({ totalUsers: 0, activeToday: 0 })

    const [newTip, setNewTip] = useState({ category: "", title: "", content: "", icon: "💡" })
    const [newResource, setNewResource] = useState({ title: "", description: "", url: "", image_url: "" })
    const [newSupplement, setNewSupplement] = useState({
      name: "", description: "", benefits: "", price: "", image_url: "", whatsapp_message: ""
    })

    const [imageFile, setImageFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)
    const [imagePreview, setImagePreview] = useState<string>("")

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
          image_url: newResource.image_url || undefined,
          is_active: true
        })

        setNewResource({ title: "", description: "", url: "", image_url: "" })
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
          price: parseInt(newSupplement.price),
          image_url: imageUrl,
          is_active: true,
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
        name: "", description: "", benefits: "", price: "", image_url: "", whatsapp_message: ""
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

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="border-b bg-white">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
                <p className="text-gray-600">Gestiona el contenido global de VitalMente</p>
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
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              {['overview', 'tips', 'resources', 'supplements'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveAdminTab(tab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeAdminTab === tab
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab === 'overview' ? 'Resumen' : tab === 'tips' ? 'Tips' : tab === 'resources' ? 'Recursos' : 'Suplementos'}
                </button>
              ))}
            </nav>
          </div>

          {activeAdminTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                      <p className="text-sm font-medium text-gray-600">Recursos Activos</p>
                      <p className="text-2xl font-bold text-blue-600">{allResources.filter(r => r.is_active).length}</p>
                    </div>
                    <span className="text-2xl">{Icons.Link()}</span>
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

              {/* 🆕 ESTADÍSTICAS POR CATEGORÍA DE RECURSOS INCLUYENDO EXERCISE */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Recursos por Categoría</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl mb-2">🧘‍♀️</div>
                    <div className="text-lg font-bold text-purple-600">
                      {allResources.filter(r => r.type === 'mindfulness' && r.is_active).length}
                    </div>
                    <div className="text-sm text-gray-600">Mindfulness</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl mb-2">🥗</div>
                    <div className="text-lg font-bold text-green-600">
                      {allResources.filter(r => r.type === 'nutrition' && r.is_active).length}
                    </div>
                    <div className="text-sm text-gray-600">Nutrición</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl mb-2">💪</div>
                    <div className="text-lg font-bold text-blue-600">
                      {allResources.filter(r => r.type === 'exercise' && r.is_active).length}
                    </div>
                    <div className="text-sm text-gray-600">Ejercicio</div>
                  </div>
                </div>
              </div>
            </div>
          )}

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

              {/* 🆕 RECURSOS CON MINIATURAS Y CATEGORÍAS INCLUYENDO EXERCISE */}
              <div className="space-y-4">
                {allResources.map(resource => (
                  <div key={resource.id} className="bg-white rounded-lg shadow p-4">
                    <div className="flex gap-4">
                      {/* 🆕 MINIATURA CON SOPORTE PARA TODOS LOS TIPOS */}
                      <div className="relative w-32 h-20 flex-shrink-0">
                        <img
                          src={getResourceThumbnail(resource.url, resource.type)}
                          alt={resource.title}
                          className="w-full h-full object-cover rounded-lg"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = getResourceThumbnail("", resource.type)
                          }}
                        />
                        {/* Overlay de tipo de contenido */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-black/60 text-white rounded-full p-2">
                            {isYouTubeUrl(resource.url) && <span className="text-xs">{Icons.Play()}</span>}
                            {isSpotifyUrl(resource.url) && <span className="text-xs">{Icons.Music()}</span>}
                            {isPDFUrl(resource.url) && <span className="text-xs">📄</span>}
                            {!isYouTubeUrl(resource.url) && !isSpotifyUrl(resource.url) && !isPDFUrl(resource.url) && (
                              <span className="text-xs">{getResourceTypeIcon(resource.type)}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* CONTENIDO */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold">{resource.title}</h4>
                            <p className="text-sm text-gray-600">{resource.description}</p>
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
                        <div className="flex gap-2">
                          <span className={`px-2 py-1 text-xs rounded ${
                            resource.type === 'mindfulness' ? 'bg-purple-100 text-purple-800' :
                            resource.type === 'nutrition' ? 'bg-green-100 text-green-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {resource.type === 'mindfulness' ? '🧘‍♀️ Mindfulness' :
                             resource.type === 'nutrition' ? '🥗 Nutrición' :
                             '💪 Ejercicio'}
                          </span>
                          <span className={`px-2 py-1 text-xs rounded ${resource.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {resource.is_active ? "Activo" : "Inactivo"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

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
                      src={supplement.image_url}
                      alt={supplement.name}
                      className="w-full h-32 object-cover rounded-lg mb-3 bg-gray-100"
                    />
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold">{supplement.name}</h4>
                        <p className="text-lg font-bold text-green-600">${supplement.price.toLocaleString()}</p>
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

        {/* DIALOGS DE ADMINISTRACIÓN */}
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

        {showResourceDialog && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Agregar Nuevo Recurso</h3>
              <div className="space-y-4">
                {/* 🆕 SELECTOR CON EXERCISE INCLUIDO */}
                <select 
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  value={resourceType}
                  onChange={(e) => setResourceType(e.target.value as 'mindfulness' | 'nutrition' | 'exercise')}
                >
                  <option value="mindfulness">🧘‍♀️ Mindfulness</option>
                  <option value="nutrition">🥗 Nutrición</option>
                  <option value="exercise">💪 Ejercicio</option>
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
                  placeholder="URL (YouTube, Spotify, PDF, etc.)"
                  value={newResource.url}
                  onChange={(e) => setNewResource(prev => ({ ...prev, url: e.target.value }))}
                />
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="URL de imagen personalizada (opcional)"
                  value={newResource.image_url}
                  onChange={(e) => setNewResource(prev => ({ ...prev, image_url: e.target.value }))}
                />
                <div className="text-xs text-gray-500 bg-blue-50 p-2 rounded">
                  💡 <strong>Miniaturas automáticas:</strong> YouTube y Spotify se detectan automáticamente. 
                  Para PDFs puedes agregar una imagen personalizada.
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={addGlobalResource} 
                    className="flex-1 bg-green-500 text-white p-3 rounded-lg hover:bg-green-600"
                  >
                    Agregar Recurso
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

        {showSupplementDialog && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Agregar Suplemento</h3>
              <div className="space-y-4">
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
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Precio"
                  type="number"
                  value={newSupplement.price}
                  onChange={(e) => setNewSupplement(prev => ({ ...prev, price: e.target.value }))}
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
                          src={imagePreview} 
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

  if (connectionStatus === 'error') {
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

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <div onClick={handleLogoClick} className="cursor-pointer">
              <h1 className="text-2xl font-bold text-green-600">VitalMente</h1>
              <p className="text-gray-600">Tu compañero de bienestar personalizado</p>
              <span className="inline-block mt-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded">🌐 Conectado a Supabase</span>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="flex rounded-lg bg-gray-100 p-1">
              <button
                onClick={() => setShowRegister(false)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  !showRegister ? 'bg-white text-green-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Ingresar
              </button>
              <button
                onClick={() => setShowRegister(true)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  showRegister ? 'bg-white text-green-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
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
            ) : (
              <div className="space-y-4">
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Número de teléfono"
                  value={registerForm.phone}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, phone: e.target.value }))}
                />
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Nombre completo"
                  value={registerForm.name}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, name: e.target.value }))}
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Edad"
                    type="number"
                    value={registerForm.age}
                    onChange={(e) => setRegisterForm(prev => ({ ...prev, age: e.target.value }))}
                  />
                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Peso (kg)"
                    type="number"
                    value={registerForm.weight}
                    onChange={(e) => setRegisterForm(prev => ({ ...prev, weight: e.target.value }))}
                  />
                </div>
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Altura (cm)"
                  type="number"
                  value={registerForm.height}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, height: e.target.value }))}
                />
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={registerForm.goal}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, goal: e.target.value }))}
                >
                  <optgroup label="🎯 TRANSFORMACIÓN FÍSICA">
                  {GOALS.filter(goal => goal.category === 'physical').map(goal => (
                    <option key={goal.id} value={goal.id}>
                      {goal.label}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="💫 BIENESTAR EMOCIONAL">
                  {GOALS.filter(goal => goal.category === 'emotional').map(goal => (
                    <option key={goal.id} value={goal.id}>
                      {goal.label}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="⚖️ EQUILIBRIO TOTAL">
                  {GOALS.filter(goal => goal.category === 'holistic').map(goal => (
                    <option key={goal.id} value={goal.id}>
                      {goal.label}
                    </option>
                  ))}
                </optgroup>
                </select>
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  type="password"
                  placeholder="Código de acceso (10 dígitos)"
                  maxLength={10}
                  value={registerForm.accessCode}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, accessCode: e.target.value }))}
                />
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  type="password"
                  placeholder="Confirmar código"
                  maxLength={10}
                  value={registerForm.confirmCode}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, confirmCode: e.target.value }))}
                />
                <button 
                  onClick={handleRegister} 
                  className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 disabled:bg-gray-400 flex items-center justify-center gap-2" 
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
          </div>
        )}
      </div>
    )
  }

  const activeTips = globalTips.filter(tip => tip.is_active)
  const mindfulnessResources = globalResources.filter(r => r.type === 'mindfulness' && r.is_active)
  const nutritionResources = globalResources.filter(r => r.type === 'nutrition' && r.is_active)
  const exerciseResources = globalResources.filter(r => r.type === 'exercise' && r.is_active) // 🆕 NUEVO
  const caloriesProgress = getCaloriesProgress()

  return (
    <div className="min-h-screen bg-gray-50">
      <SaveStatusIndicator />
      
      {currentUser && <FloatingActionButtons />}
      
      <div className="pb-20">
        {/* Navegación de tabs */}
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
                    {getMotivationalMessage(currentUser?.goal || "")}
                  </p>
                  {getStreakDays() > 0 && (
                    <span className="inline-block mt-1 px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded">🔥 {getStreakDays()} días consecutivos</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => resetProgress('all')} 
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    title="Reiniciar todo el progreso"
                  >
                    {Icons.RotateCcw()}
                  </button>
                  <button 
                    onClick={handleLogout} 
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
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
                      style={{width: `${caloriesProgress.percentage}%`}}
                    ></div>
                  </div>
                  <p className="text-sm text-center">
                    {caloriesProgress.percentage}% de tu objetivo diario
                  </p>
                </div>
              )}

              {/* 🆕 PANEL DE GAMIFICACIÓN */}
              {userGamification && (
                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🎮</span>
                      <span className="font-semibold">Tu Progreso</span>
                    </div>
                    <span className="text-lg font-bold">
                      Nivel {userGamification.current_level}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold">{userGamification.total_points}</div>
                      <div className="text-xs">Puntos Totales</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold">{userGamification.streak_days}</div>
                      <div className="text-xs">Días Seguidos</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold">{userGamification.weekly_points}</div>
                      <div className="text-xs">Puntos Semana</div>
                    </div>
                  </div>
                </div>
              )}

              {/* 🆕 RECOMENDACIONES DE IA */}
              {aiRecommendations.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <span>🤖</span>
                    Recomendaciones Personalizadas
                  </h3>
                  {aiRecommendations.slice(0, 1).map(rec => (
                    <div key={rec.id} className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900">
                          {rec.supplement_names.join(" + ")}
                        </h4>
                        {rec.discount_percentage > 0 && (
                          <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">
                            -{rec.discount_percentage}%
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{rec.reason}</p>
                      <p className="text-sm font-medium text-blue-600">{rec.sales_angle}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-green-600">{getProgressPercentage()}%</div>
                  <p className="text-sm text-gray-600">Progreso diario general</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <div 
                    className="bg-green-500 h-3 rounded-full transition-all duration-300" 
                    style={{width: `${getProgressPercentage()}%`}}
                  ></div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className={`p-3 rounded-lg ${dailyProgress.water >= 8 ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <div className="text-center">
                      <span className="text-xl">{Icons.Droplets()}</span>
                      <div className="font-bold">{dailyProgress.water}/8</div>
                      <div>Vasos de agua</div>
                    </div>
                  </div>
                  
                  <div className={`p-3 rounded-lg ${dailyProgress.exercise >= 1 ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <div className="text-center">
                      <span className="text-xl">{Icons.Activity()}</span>
                      <div className="font-bold">{dailyProgress.exercise}</div>
                      <div>Ejercicios</div>
                    </div>
                  </div>
                  
                  <div className={`p-3 rounded-lg ${dailyProgress.mindfulness >= 1 ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <div className="text-center">
                      <span className="text-xl">{Icons.Brain()}</span>
                      <div className="font-bold">{dailyProgress.mindfulness}</div>
                      <div>Mindfulness</div>
                    </div>
                  </div>
                  
                  <div className={`p-3 rounded-lg ${(dailyProgress.desayuno + dailyProgress.almuerzo + dailyProgress.cena) >= 3 ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <div className="text-center">
                      <span className="text-xl">{Icons.UtensilsCrossed()}</span>
                      <div className="font-bold">{dailyProgress.desayuno + dailyProgress.almuerzo + dailyProgress.cena}/3</div>
                      <div>Comidas</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Controles rápidos mejorados */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg shadow p-4 text-center">
                  <span className="text-2xl">{Icons.Droplets()}</span>
                  <div className="flex justify-center items-center gap-2 mt-2">
                    <button 
                      onClick={() => updateProgress('water', -1)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:bg-gray-300"
                      disabled={saveStatus === 'saving'}
                    >
                      {Icons.Minus()}
                    </button>
                    <span className="font-bold text-lg min-w-[2rem]">{dailyProgress.water}</span>
                    <button 
                      onClick={() => updateProgress('water', 1)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 disabled:bg-gray-300"
                      disabled={saveStatus === 'saving'}
                    >
                      {Icons.Plus()}
                    </button>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Vasos de agua</p>
                </div>
                
                <div className="bg-white rounded-lg shadow p-4 text-center">
                  <span className="text-2xl">{Icons.Activity()}</span>
                  <div className="flex justify-center items-center gap-2 mt-2">
                    <button 
                      onClick={() => updateProgress('exercise', -1)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:bg-gray-300"
                      disabled={saveStatus === 'saving'}
                    >
                      {Icons.Minus()}
                    </button>
                    <span className="font-bold text-lg min-w-[2rem]">{dailyProgress.exercise}</span>
                    <button 
                      onClick={() => updateProgress('exercise', 1)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 disabled:bg-gray-300"
                      disabled={saveStatus === 'saving'}
                    >
                      {Icons.Plus()}
                    </button>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Ejercicios</p>
                </div>
              </div>

              {/* Historial de progreso */}
              {progressHistory.length > 0 && (
                <div className="bg-white rounded-lg shadow p-4">
                  <h3 className="font-semibold mb-3">Progreso reciente</h3>
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
                </div>
              )}
            </div>
          )}

          {/* TAB NUTRICIÓN */}
          {activeTab === 'nutricion' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">🍽 Nutrición</h2>
                <button 
                  onClick={() => resetProgress('meals')} 
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  title="Reiniciar comidas del día"
                >
                  {Icons.RotateCcw()}
                </button>
              </div>

              {/* 🆕 RECURSOS DE NUTRICIÓN CON MINIATURAS */}
              {nutritionResources.length > 0 && (
                <div className="bg-white rounded-lg shadow p-4">
                  <h3 className="font-semibold mb-4">Recursos recomendados</h3>
                  <div className="space-y-3">
                    {nutritionResources.map(resource => (
                      <div key={resource.id} className="flex gap-4 p-3 bg-green-50 rounded-lg">
                        {/* MINIATURA */}
                        <div className="relative w-20 h-16 flex-shrink-0">
                          <img
                            src={resource.image_url || getResourceThumbnail(resource.url, resource.type)}
                            alt={resource.title}
                            className="w-full h-full object-cover rounded-lg"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = getResourceThumbnail("", resource.type)
                            }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-black/60 text-white rounded-full p-1">
                              {isPDFUrl(resource.url) ? (
                                <span className="text-xs">📄</span>
                              ) : isYouTubeUrl(resource.url) ? (
                                <span className="text-xs">{Icons.Play()}</span>
                              ) : (
                                <span className="text-xs">🔗</span>
                              )}
                            </div>
                          </div>
                        </div>
                        {/* CONTENIDO */}
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold">{resource.title}</h4>
                              <p className="text-sm text-gray-600">{resource.description}</p>
                            </div>
                            <button 
                              onClick={() => window.open(resource.url, '_blank')}
                              className="p-2 text-gray-400 hover:text-gray-600 ml-2"
                            >
                              {Icons.ExternalLink()}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Progreso de macros */}
              {macroResults && currentUser && (
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">
                      {macroResults.goalType === 'emotional' ? 'Tu alimentación balanceada' : 'Tus macros diarios'}
                    </h3>
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">{macroResults.goalLabel}</span>
                  </div>
                  
                  {/* Progreso de macros vs objetivo */}
                  <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold mb-3 text-center">Progreso vs Objetivo</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{consumedMacros.calories}</div>
                        <div className="text-sm text-gray-600">Consumidas</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{macroResults.calories}</div>
                        <div className="text-sm text-gray-600">Objetivo</div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                        style={{width: `${caloriesProgress.percentage}%`}}
                      ></div>
                    </div>
                    <p className="text-center text-sm text-gray-600 mt-2">
                      {caloriesProgress.percentage}% del objetivo diario
                    </p>
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
                      <div className="text-xs text-gray-600">Objetivo</div>
                      <div className="text-sm font-medium text-blue-800">{consumedMacros.protein}g</div>
                      <div className="text-xs text-gray-600">Consumido</div>
                      <div className="text-xs">Proteínas</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{macroResults.carbs}g</div>
                      <div className="text-xs text-gray-600">Objetivo</div>
                      <div className="text-sm font-medium text-green-800">{consumedMacros.carbs}g</div>
                      <div className="text-xs text-gray-600">Consumido</div>
                      <div className="text-xs">Carbohidratos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-yellow-600">{macroResults.fats}g</div>
                      <div className="text-xs text-gray-600">Objetivo</div>
                      <div className="text-sm font-medium text-yellow-800">{consumedMacros.fats}g</div>
                      <div className="text-xs text-gray-600">Consumido</div>
                      <div className="text-xs">Grasas</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Registro de comidas con calculadora */}
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="font-semibold mb-4">Registro del día</h3>
                <div className="space-y-4">
                  {['desayuno', 'almuerzo', 'cena'].map(meal => (
                    <div key={meal} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <h4 className="font-semibold capitalize">{meal}</h4>
                          <p className="text-sm text-gray-600">
                            {dailyProgress[meal as keyof DailyProgress]} registro(s)
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => openMealCalculator(meal as 'desayuno' | 'almuerzo' | 'cena')}
                            className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 flex items-center gap-1 disabled:bg-gray-300"
                            disabled={saveStatus === 'saving'}
                          >
                            <span>{Icons.Calculator()}</span>
                            <span className="text-sm">Agregar</span>
                          </button>
                        </div>
                      </div>

                      {/* Mostrar alimentos consumidos en esta comida */}
                      {mealCompositions.filter(comp => comp.meal_type === meal).length > 0 && (
                        <div className="space-y-2">
                          <h5 className="text-sm font-medium text-gray-700">Alimentos consumidos:</h5>
                          {mealCompositions
                            .filter(comp => comp.meal_type === meal)
                            .map(comp => (
                              <div key={comp.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                <div>
                                  <span className="font-medium">{comp.food_name}</span>
                                  <span className="text-sm text-gray-600 ml-2">({comp.quantity_grams}g)</span>
                                  <div className="text-xs text-gray-500">
                                    {comp.calories_consumed} cal | P: {comp.protein_consumed}g | C: {comp.carbs_consumed}g | G: {comp.fats_consumed}g
                                  </div>
                                </div>
                                <button 
                                  onClick={() => removeFoodFromMeal(comp.id)}
                                  className="p-1 text-red-400 hover:text-red-600"
                                >
                                  {Icons.X()}
                                </button>
                              </div>
                            ))
                          }
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Lista de alimentos personalizados */}
              {userFoods.length > 0 && (
                <div className="bg-white rounded-lg shadow p-4">
                  <h3 className="font-semibold mb-4">Mis alimentos personalizados</h3>
                  <div className="space-y-2">
                    {userFoods.map(food => (
                      <div key={food.id} className="p-3 border rounded-lg">
                        <h4 className="font-semibold">{food.name}</h4>
                        <p className="text-sm text-gray-600">
                          {food.calories} cal | P: {food.protein}g | C: {food.carbs}g | G: {food.fats}g
                        </p>
                        <span className="inline-block mt-1 px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">{food.category}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Botón para agregar alimentos personalizados */}
              <div className="bg-white rounded-lg shadow p-4 text-center">
                <h4 className="font-semibold mb-2">¿No encuentras tu alimento?</h4>
                <p className="text-sm text-gray-600 mb-3">Crea tu propio alimento personalizado</p>
                <button 
                  onClick={() => {
                    setSelectedMeal('desayuno')
                    setShowFoodDialog(true)
                  }}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center gap-2 mx-auto"
                >
                  <span>{Icons.Plus()}</span>
                  Crear alimento personalizado
                </button>
              </div>
            </div>
          )}

          {/* 🆕 TAB EJERCICIO MEJORADO CON RECURSOS MULTIMEDIA */}
          {activeTab === 'ejercicio' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">💪 Ejercicio</h2>
                <button 
                  onClick={() => resetProgress('exercise')} 
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  title="Reiniciar ejercicios"
                >
                  {Icons.RotateCcw()}
                </button>
              </div>

              {/* 🆕 RECURSOS DE EJERCICIO CON MINIATURAS */}
              {exerciseResources.length > 0 && (
                <div className="bg-white rounded-lg shadow p-4">
                  <h3 className="font-semibold mb-4">Videos de entrenamiento</h3>
                  <div className="space-y-3">
                    {exerciseResources.map(resource => (
                      <div key={resource.id} className="flex gap-4 p-3 bg-blue-50 rounded-lg">
                        {/* MINIATURA */}
                        <div className="relative w-24 h-16 flex-shrink-0">
                          <img
                            src={getResourceThumbnail(resource.url, resource.type)}
                            alt={resource.title}
                            className="w-full h-full object-cover rounded-lg"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/placeholder.svg?height=64&width=96&text=💪+Video"
                            }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-red-600 text-white rounded-full p-2">
                              {isYouTubeUrl(resource.url) && <span className="text-xs">{Icons.Play()}</span>}
                              {isSpotifyUrl(resource.url) && <span className="text-xs">{Icons.Music()}</span>}
                              {!isYouTubeUrl(resource.url) && !isSpotifyUrl(resource.url) && (
                                <span className="text-xs">{Icons.Dumbbell()}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        {/* CONTENIDO */}
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold text-blue-800">{resource.title}</h4>
                              <p className="text-sm text-gray-600">{resource.description}</p>
                              {isYouTubeUrl(resource.url) && (
                                <span className="inline-block mt-1 px-2 py-1 text-xs bg-red-100 text-red-800 rounded">
                                  📹 YouTube
                                </span>
                              )}
                              {isSpotifyUrl(resource.url) && (
                                <span className="inline-block mt-1 px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                                  🎵 Spotify
                                </span>
                              )}
                            </div>
                            <button 
                              onClick={() => window.open(resource.url, '_blank')}
                              className="p-2 text-blue-400 hover:text-blue-600 ml-2"
                            >
                              {Icons.ExternalLink()}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-white rounded-lg shadow p-6 text-center">
                <span className="text-4xl">{Icons.Activity()}</span>
                <h3 className="text-xl font-bold mb-2 mt-4">Ejercicios completados</h3>
                <div className="text-3xl font-bold text-green-600 mb-4">{dailyProgress.exercise}</div>
                
                <div className="flex justify-center items-center gap-4">
                  <button 
                    onClick={() => updateProgress('exercise', -1)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 disabled:bg-gray-300"
                    disabled={saveStatus === 'saving'}
                  >
                    {Icons.Minus()}
                  </button>
                  <button 
                    onClick={() => updateProgress('exercise', 1)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:bg-gray-300"
                    disabled={saveStatus === 'saving'}
                  >
                    Agregar ejercicio
                  </button>
                </div>
              </div>

              {/* Ejercicios sugeridos mantenidos */}
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="font-semibold mb-4">Ejercicios sugeridos</h3>
                <div className="space-y-3">
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
                </div>
              </div>
            </div>
          )}

          {/* 🆕 TAB MINDFULNESS MEJORADO CON RECURSOS MULTIMEDIA */}
          {activeTab === 'mindfulness' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">🧘‍♀️ Mindfulness</h2>
                <button 
                  onClick={() => resetProgress('mindfulness')} 
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  title="Reiniciar mindfulness"
                >
                  {Icons.RotateCcw()}
                </button>
              </div>

              {/* Mensaje especial para objetivos emocionales */}
              {currentUser && GOALS.find(g => g.id === currentUser.goal)?.type === 'emotional' && (
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-4 text-center">
                  <h3 className="font-bold text-purple-800 mb-1">
                    ¡Perfecto para tu objetivo!
                  </h3>
                  <p className="text-sm text-purple-700">
                    {currentUser.goal === 'find_calm' && "El mindfulness es ideal para encontrar la calma que buscas 🧘"}
                    {currentUser.goal === 'balance' && "Las prácticas de mindfulness te ayudarán a encontrar el equilibrio perfecto ⚡"}
                    {currentUser.goal === 'feel_good' && "Estas sesiones te harán sentir increíble ✨"}
                    {currentUser.goal === 'vitalmente' && "¡El mindfulness es esencial para sentirte VitalMente! 🌟"}
                  </p>
                </div>
              )}

              {/* 🆕 RECURSOS DE MINDFULNESS CON MINIATURAS */}
              {mindfulnessResources.length > 0 && (
                <div className="bg-white rounded-lg shadow p-4">
                  <h3 className="font-semibold mb-4">Recursos de mindfulness</h3>
                  <div className="space-y-3">
                    {mindfulnessResources.map(resource => (
                      <div key={resource.id} className="flex gap-4 p-3 bg-purple-50 rounded-lg">
                        {/* MINIATURA */}
                        <div className="relative w-24 h-16 flex-shrink-0">
                          <img
                            src={getResourceThumbnail(resource.url, resource.type)}
                            alt={resource.title}
                            className="w-full h-full object-cover rounded-lg"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/placeholder.svg?height=64&width=96&text=🧘+Audio"
                            }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-purple-600 text-white rounded-full p-2">
                              {isYouTubeUrl(resource.url) && <span className="text-xs">{Icons.Play()}</span>}
                              {isSpotifyUrl(resource.url) && <span className="text-xs">{Icons.Music()}</span>}
                              {!isYouTubeUrl(resource.url) && !isSpotifyUrl(resource.url) && (
                                <span className="text-xs">🧘</span>
                              )}
                            </div>
                          </div>
                        </div>
                        {/* CONTENIDO */}
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold text-purple-800">{resource.title}</h4>
                              <p className="text-sm text-gray-600">{resource.description}</p>
                              {isYouTubeUrl(resource.url) && (
                                <span className="inline-block mt-1 px-2 py-1 text-xs bg-red-100 text-red-800 rounded">
                                  📹 YouTube
                                </span>
                              )}
                              {isSpotifyUrl(resource.url) && (
                                <span className="inline-block mt-1 px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                                  🎵 Spotify
                                </span>
                              )}
                            </div>
                            <button 
                              onClick={() => window.open(resource.url, '_blank')}
                              className="p-2 text-purple-400 hover:text-purple-600 ml-2"
                            >
                              {Icons.ExternalLink()}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contador de sesiones */}
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <span className="text-4xl">{Icons.Brain()}</span>
                <h3 className="text-xl font-bold mb-2 mt-4">Sesiones completadas</h3>
                <div className="text-3xl font-bold text-purple-600 mb-4">{dailyProgress.mindfulness}</div>
                
                <div className="flex justify-center items-center gap-4">
                  <button 
                    onClick={() => updateProgress('mindfulness', -1)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 disabled:bg-gray-300"
                    disabled={saveStatus === 'saving'}
                  >
                    {Icons.Minus()}
                  </button>
                  <button 
                    onClick={() => updateProgress('mindfulness', 1)}
                    className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 disabled:bg-gray-300"
                    disabled={saveStatus === 'saving'}
                  >
                    Completar sesión
                  </button>
                </div>
              </div>

              {/* Tips de bienestar */}
              {activeTips.length > 0 && (
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <span>Tips de bienestar</span>
                      <span>{Icons.Lightbulb()}</span>
                    </h3>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-lg">
                    <div className="text-2xl mb-2">{activeTips[currentTipIndex]?.icon}</div>
                    <h3 className="font-bold mb-2">{activeTips[currentTipIndex]?.title}</h3>
                    <p className="text-sm mb-4">{activeTips[currentTipIndex]?.content}</p>
                    <span className="inline-block px-2 py-1 text-xs bg-white/20 rounded">
                      {activeTips[currentTipIndex]?.category}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() => setCurrentTipIndex(prev => prev > 0 ? prev - 1 : activeTips.length - 1)}
                      className="p-2 text-gray-400 hover:text-gray-600"
                    >
                      {Icons.ChevronLeft()}
                    </button>
                    <span className="text-sm text-gray-500">
                      {currentTipIndex + 1} / {activeTips.length}
                    </span>
                    <button
                      onClick={() => setCurrentTipIndex(prev => prev < activeTips.length - 1 ? prev + 1 : 0)}
                      className="p-2 text-gray-400 hover:text-gray-600"
                    >
                      {Icons.ChevronRight()}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB SUPLEMENTOS */}
          {activeTab === 'suplementos' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-center">💊 Suplementos Recomendados</h2>

              <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg p-4 text-center">
                <span className="text-2xl">{Icons.Package()}</span>
                <h3 className="font-bold mb-1 mt-2">Productos Premium</h3>
                <p className="text-sm">Suplementos seleccionados para potenciar tu bienestar</p>
              </div>

              {supplements.length > 0 ? (
                <div className="space-y-4">
                  {supplements.map(supplement => (
                    <div key={supplement.id} className="bg-white rounded-lg shadow p-4">
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
                            <button 
                              onClick={() => handleSupplementContact(supplement)} 
                              className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 flex items-center gap-1"
                            >
                              <span>{Icons.Phone()}</span>
                              <span className="text-sm">Contactar</span>
                            </button>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{supplement.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {supplement.benefits.map((benefit, index) => (
                              <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
                                {benefit}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow p-6 text-center">
                  <span className="text-4xl text-gray-400">{Icons.Package()}</span>
                  <h3 className="text-lg font-semibold mb-2 mt-4">Próximamente</h3>
                  <p className="text-gray-600">Estamos preparando una selección especial de suplementos para ti.</p>
                </div>
              )}

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">💬 ¿Tienes dudas?</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Nuestro equipo está listo para asesorarte sobre el suplemento ideal para tus objetivos.
                </p>
                <button 
                  onClick={() => {
                    const whatsappUrl = `https://wa.me/573134852878?text=${encodeURIComponent("Hola! Me gustaría recibir asesoría sobre suplementos desde VitalMente. ¿Podrían ayudarme?")}`
                    window.open(whatsappUrl, '_blank')
                  }}
                  className="w-full bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
                >
                  <span>{Icons.Phone()}</span>
                  Asesoría personalizada
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODAL DE CALCULADORA DE MACROS */}
      {showMealCalculator && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-lg shadow-lg rounded-md bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <span>{Icons.Calculator()}</span>
                Calculadora de macros - {selectedMealType}
              </h3>
              <button 
                onClick={() => setShowMealCalculator(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                {Icons.X()}
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Selecciona un alimento y especifica la cantidad para calcular los macros automáticamente
            </p>
            
            <div className="space-y-4">
              {!selectedFood ? (
                <div>
                  <h4 className="font-semibold mb-3">Selecciona un alimento:</h4>
                  <div className="max-h-80 overflow-y-auto space-y-4">
                    
                    {getFoodsByCategory().map(category => (
                      category.foods.length > 0 && (
                        <div key={category.id}>
                          <h5 className="font-semibold text-sm flex items-center gap-2 mb-2 px-2 py-1 bg-gray-100 rounded">
                            <span>{category.icon}</span>
                            {category.name}
                          </h5>
                          <div className="space-y-1 ml-2">
                            {category.foods.map(food => (
                              <div 
                                key={food.id} 
                                className="p-3 border rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
                                onClick={() => setSelectedFood(food)}
                              >
                                <h6 className="font-semibold">{food.name}</h6>
                                <p className="text-sm text-gray-600">
                                  {Number(food.calories)} cal | P: {Number(food.protein)}g | C: {Number(food.carbs)}g | G: {Number(food.fats)}g
                                  <span className="text-xs text-gray-500 ml-2">(por 100g)</span>
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    ))}

                    {userFoods.length > 0 && (
                      <div>
                        <h5 className="font-semibold text-sm flex items-center gap-2 mb-2 px-2 py-1 bg-green-100 rounded">
                          <span>👨‍🍳</span>
                          Mis Alimentos Personalizados
                        </h5>
                        <div className="space-y-1 ml-2">
                          {userFoods.map(food => (
                            <div 
                              key={food.id} 
                              className="p-3 border border-green-200 rounded-lg cursor-pointer hover:bg-green-50 transition-colors"
                              onClick={() => setSelectedFood(food)}
                            >
                              <h6 className="font-semibold">{food.name}</h6>
                              <p className="text-sm text-gray-600">
                                {Number(food.calories)} cal | P: {Number(food.protein)}g | C: {Number(food.carbs)}g | G: {Number(food.fats)}g
                                <span className="text-xs text-gray-500 ml-2">(por 100g)</span>
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="border-t pt-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-3">¿No encuentras tu alimento?</p>
                        <button 
                          onClick={() => {
                            setShowMealCalculator(false)
                            setSelectedMeal(selectedMealType)
                            setShowFoodDialog(true)
                          }}
                          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center gap-2 mx-auto"
                        >
                          <span>{Icons.Plus()}</span>
                          Crear alimento personalizado
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h4 className="font-semibold">{selectedFood.name}</h4>
                      <p className="text-sm text-gray-600">Valores por 100g</p>
                    </div>
                    <button 
                      onClick={() => setSelectedFood(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {Icons.X()}
                    </button>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg mb-4">
                    <div className="grid grid-cols-4 gap-2 text-center text-sm">
                      <div>
                        <div className="font-bold">{Number(selectedFood.calories)}</div>
                        <div className="text-gray-600">cal</div>
                      </div>
                      <div>
                        <div className="font-bold text-blue-600">{Number(selectedFood.protein)}g</div>
                        <div className="text-gray-600">Proteína</div>
                      </div>
                      <div>
                        <div className="font-bold text-green-600">{Number(selectedFood.carbs)}g</div>
                        <div className="text-gray-600">Carbos</div>
                      </div>
                      <div>
                        <div className="font-bold text-yellow-600">{Number(selectedFood.fats)}g</div>
                        <div className="text-gray-600">Grasas</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">Cantidad consumida (gramos):</label>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setFoodQuantity(prev => Math.max(10, parseInt(prev) - 10).toString())}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        {Icons.Minus()}
                      </button>
                      <input
                        type="number"
                        value={foodQuantity}
                        onChange={(e) => setFoodQuantity(e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded-lg text-center font-bold focus:outline-none focus:ring-2 focus:ring-green-500"
                        min="1"
                      />
                      <button
                        onClick={() => setFoodQuantity(prev => (parseInt(prev) + 10).toString())}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        {Icons.Plus()}
                      </button>
                    </div>
                    
                    <div className="flex gap-2">
                      <button onClick={() => setFoodQuantity('50')} className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">50g</button>
                      <button onClick={() => setFoodQuantity('100')} className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">100g</button>
                      <button onClick={() => setFoodQuantity('150')} className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">150g</button>
                      <button onClick={() => setFoodQuantity('200')} className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">200g</button>
                    </div>
                  </div>

                  {parseInt(foodQuantity) > 0 && (
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2 text-center">Macros calculados para {foodQuantity}g:</h5>
                      <div className="grid grid-cols-4 gap-2 text-center">
                        <div>
                          <div className="text-lg font-bold text-green-600">
                            {Math.round(Number(selectedFood.calories) * parseInt(foodQuantity) / 100)}
                          </div>
                          <div className="text-xs text-gray-600">calorías</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-blue-600">
                            {Math.round(Number(selectedFood.protein) * parseInt(foodQuantity) / 100)}g
                          </div>
                          <div className="text-xs text-gray-600">proteína</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-green-600">
                            {Math.round(Number(selectedFood.carbs) * parseInt(foodQuantity) / 100)}g
                          </div>
                          <div className="text-xs text-gray-600">carbos</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-yellow-600">
                            {Math.round(Number(selectedFood.fats) * parseInt(foodQuantity) / 100)}g
                          </div>
                          <div className="text-xs text-gray-600">grasas</div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 pt-4">
                    <button 
                      onClick={() => setSelectedFood(null)} 
                      className="flex-1 bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600"
                    >
                      Cambiar alimento
                    </button>
                    <button 
                      onClick={addFoodToMeal} 
                      className="flex-1 bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 disabled:bg-gray-300"
                      disabled={!parseInt(foodQuantity) || parseInt(foodQuantity) <= 0}
                    >
                      Agregar a {selectedMealType}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL PARA AGREGAR ALIMENTOS PERSONALIZADOS */}
      {showFoodDialog && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Agregar alimento personalizado</h3>
            <p className="text-sm text-gray-600 mb-4">
              Crea un alimento con sus valores nutricionales por 100g
            </p>
            <div className="space-y-4">
              <input
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Nombre del alimento"
                value={newFood.name}
                onChange={(e) => setNewFood(prev => ({ ...prev, name: e.target.value }))}
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Calorías (por 100g)"
                  type="number"
                  value={newFood.calories}
                  onChange={(e) => setNewFood(prev => ({ ...prev, calories: e.target.value }))}
                />
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Proteínas (g)"
                  type="number"
                  value={newFood.protein}
                  onChange={(e) => setNewFood(prev => ({ ...prev, protein: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Carbohidratos (g)"
                  type="number"
                  value={newFood.carbs}
                  onChange={(e) => setNewFood(prev => ({ ...prev, carbs: e.target.value }))}
                />
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Grasas (g)"
                  type="number"
                  value={newFood.fats}
                  onChange={(e) => setNewFood(prev => ({ ...prev, fats: e.target.value }))}
                />
              </div>
              
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-700">
                  💡 <strong>Tip:</strong> Todos los valores deben ser por 100g del alimento. 
                  La calculadora ajustará automáticamente según la cantidad que consumas.
                </p>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={addUserFood} 
                  className="flex-1 bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 disabled:bg-gray-400 flex items-center justify-center gap-2" 
                  disabled={!newFood.name}
                >
                  <span>{Icons.Plus()}</span>
                  Crear alimento
                </button>
                <button 
                  onClick={() => setShowFoodDialog(false)}
                  className="flex-1 bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DIALOG DE LOGIN ADMIN */}
      {showAdminLogin && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-80 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Acceso Administrador</h3>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
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
