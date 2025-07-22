// Sistema de Gamificación para VitalMente
// Puntos, niveles, logros y desafíos

export interface UserLevel {
  level: number
  title: string
  requiredPoints: number
  color: string
  icon: string
  benefits: string[]
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  category: 'water' | 'exercise' | 'mindfulness' | 'nutrition' | 'consistency' | 'social'
  condition: string
  points: number
  isUnlocked: boolean
  unlockedAt?: string
}

export interface Challenge {
  id: string
  title: string
  description: string
  type: 'daily' | 'weekly' | 'monthly'
  category: 'water' | 'exercise' | 'mindfulness' | 'nutrition' | 'all'
  target: number
  currentProgress: number
  points: number
  expiresAt: string
  isCompleted: boolean
}

export interface UserStats {
  totalPoints: number
  currentLevel: number
  weeklyPoints: number
  streak: number
  longestStreak: number
  achievements: Achievement[]
  activeChallenges: Challenge[]
  completedChallenges: number
}

// Definición de niveles
export const LEVELS: UserLevel[] = [
  { level: 1, title: "Principiante", requiredPoints: 0, color: "gray", icon: "🌱", benefits: ["Acceso básico"] },
  { level: 2, title: "Aprendiz", requiredPoints: 100, color: "blue", icon: "🌿", benefits: ["Tips personalizados"] },
  { level: 3, title: "Comprometido", requiredPoints: 300, color: "green", icon: "🌳", benefits: ["Desafíos semanales"] },
  { level: 4, title: "Disciplinado", requiredPoints: 600, color: "yellow", icon: "⭐", benefits: ["Análisis avanzado"] },
  { level: 5, title: "Experto", requiredPoints: 1000, color: "orange", icon: "🏆", benefits: ["Coaching IA"] },
  { level: 6, title: "Maestro", requiredPoints: 1500, color: "purple", icon: "💎", benefits: ["Contenido exclusivo"] },
  { level: 7, title: "VitalMente", requiredPoints: 2500, color: "gold", icon: "👑", benefits: ["Acceso completo"] }
]

// Definición de logros
export const ACHIEVEMENTS: Omit<Achievement, 'isUnlocked' | 'unlockedAt'>[] = [
  // Hidratación
  { id: "first_water", title: "Primera Gota", description: "Registra tu primer vaso de agua", icon: "💧", category: "water", condition: "water >= 1", points: 10 },
  { id: "hydration_hero", title: "Héroe de Hidratación", description: "Bebe 8 vasos en un día", icon: "🌊", category: "water", condition: "daily_water >= 8", points: 25 },
  { id: "water_week", title: "Semana Hidratada", description: "Cumple tu meta de agua 7 días seguidos", icon: "💦", category: "water", condition: "water_streak >= 7", points: 50 },
  
  // Ejercicio
  { id: "first_move", title: "Primer Movimiento", description: "Registra tu primera sesión de ejercicio", icon: "🏃‍♂️", category: "exercise", condition: "exercise >= 10", points: 10 },
  { id: "workout_warrior", title: "Guerrero del Ejercicio", description: "Ejercítate 30 minutos en un día", icon: "💪", category: "exercise", condition: "daily_exercise >= 30", points: 25 },
  { id: "fitness_streak", title: "Racha Fitness", description: "Ejercítate 5 días consecutivos", icon: "🔥", category: "exercise", condition: "exercise_streak >= 5", points: 40 },
  
  // Mindfulness
  { id: "first_breath", title: "Primera Respiración", description: "Completa tu primera sesión de mindfulness", icon: "🧘‍♀️", category: "mindfulness", condition: "mindfulness >= 5", points: 10 },
  { id: "zen_master", title: "Maestro Zen", description: "Practica mindfulness 20 minutos en un día", icon: "☯️", category: "mindfulness", condition: "daily_mindfulness >= 20", points: 25 },
  { id: "calm_week", title: "Semana de Calma", description: "Practica mindfulness 7 días seguidos", icon: "🕯️", category: "mindfulness", condition: "mindfulness_streak >= 7", points: 50 },
  
  // Nutrición
  { id: "first_meal", title: "Primera Comida", description: "Registra tu primera comida", icon: "🍽️", category: "nutrition", condition: "meals >= 1", points: 10 },
  { id: "balanced_day", title: "Día Balanceado", description: "Registra desayuno, almuerzo y cena", icon: "⚖️", category: "nutrition", condition: "daily_meals >= 3", points: 20 },
  { id: "macro_master", title: "Maestro de Macros", description: "Cumple tus macros 3 días seguidos", icon: "📊", category: "nutrition", condition: "macro_streak >= 3", points: 35 },
  
  // Consistencia
  { id: "week_warrior", title: "Guerrero Semanal", description: "Completa todas las actividades 7 días", icon: "📅", category: "consistency", condition: "perfect_days >= 7", points: 75 },
  { id: "month_master", title: "Maestro del Mes", description: "Mantén actividad 30 días seguidos", icon: "📆", category: "consistency", condition: "activity_streak >= 30", points: 150 },
  { id: "point_collector", title: "Coleccionista", description: "Acumula 500 puntos", icon: "💰", category: "consistency", condition: "total_points >= 500", points: 50 },
  
  // Social/Referidos
  { id: "first_referral", title: "Primer Referido", description: "Invita a tu primer amigo", icon: "👥", category: "social", condition: "referrals >= 1", points: 30 },
  { id: "influencer", title: "Influencer", description: "Invita a 5 amigos", icon: "📢", category: "social", condition: "referrals >= 5", points: 100 }
]

export class GamificationEngine {
  
  // Calcular puntos por actividad
  calculateActivityPoints(activity: string, value: number): number {
    const pointsMap = {
      water: Math.min(value * 2, 16), // Max 16 puntos por día (8 vasos)
      exercise: Math.min(Math.floor(value / 5) * 5, 60), // 5 puntos cada 5 min, max 60
      mindfulness: Math.min(Math.floor(value / 5) * 5, 40), // 5 puntos cada 5 min, max 40
      meal: 10 // 10 puntos por comida registrada
    }
    return pointsMap[activity as keyof typeof pointsMap] || 0
  }
  
  // Calcular puntos de bonificación por rachas
  calculateStreakBonus(streak: number, activity: string): number {
    const bonusMap = {
      3: 10,   // 3 días seguidos
      7: 25,   // 1 semana
      14: 50,  // 2 semanas
      30: 100  // 1 mes
    }
    
    let bonus = 0
    for (const [days, points] of Object.entries(bonusMap)) {
      if (streak >= parseInt(days)) {
        bonus = points
      }
    }
    return bonus
  }
  
  // Determinar nivel actual
  getCurrentLevel(totalPoints: number): UserLevel {
    let currentLevel = LEVELS[0]
    for (const level of LEVELS) {
      if (totalPoints >= level.requiredPoints) {
        currentLevel = level
      } else {
        break
      }
    }
    return currentLevel
  }
  
  // Verificar logros desbloqueados
  checkAchievements(userStats: any, dailyProgress: any[]): Achievement[] {
    const unlockedAchievements: Achievement[] = []
    
    for (const achievement of ACHIEVEMENTS) {
      if (this.evaluateAchievementCondition(achievement.condition, userStats, dailyProgress)) {
        unlockedAchievements.push({
          ...achievement,
          isUnlocked: true,
          unlockedAt: new Date().toISOString()
        })
      }
    }
    
    return unlockedAchievements
  }
  
  // Generar desafíos dinámicos
  generateDailyChallenges(userPattern: any): Challenge[] {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    const challenges: Challenge[] = [
      {
        id: `daily_water_${today.toISOString().split('T')[0]}`,
        title: "Hidratación Diaria",
        description: "Bebe 6 vasos de agua hoy",
        type: "daily",
        category: "water",
        target: 6,
        currentProgress: 0,
        points: 15,
        expiresAt: tomorrow.toISOString(),
        isCompleted: false
      },
      {
        id: `daily_move_${today.toISOString().split('T')[0]}`,
        title: "Movimiento Diario",
        description: "Ejercítate al menos 15 minutos",
        type: "daily",
        category: "exercise",
        target: 15,
        currentProgress: 0,
        points: 20,
        expiresAt: tomorrow.toISOString(),
        isCompleted: false
      },
      {
        id: `daily_calm_${today.toISOString().split('T')[0]}`,
        title: "Momento de Calma",
        description: "Practica mindfulness 5 minutos",
        type: "daily",
        category: "mindfulness",
        target: 5,
        currentProgress: 0,
        points: 15,
        expiresAt: tomorrow.toISOString(),
        isCompleted: false
      }
    ]
    
    return challenges
  }
  
  generateWeeklyChallenges(): Challenge[] {
    const today = new Date()
    const nextWeek = new Date(today)
    nextWeek.setDate(nextWeek.getDate() + 7)
    
    return [
      {
        id: `weekly_consistency_${today.toISOString().split('T')[0]}`,
        title: "Semana Perfecta",
        description: "Completa todas las actividades 5 días esta semana",
        type: "weekly",
        category: "all",
        target: 5,
        currentProgress: 0,
        points: 75,
        expiresAt: nextWeek.toISOString(),
        isCompleted: false
      },
      {
        id: `weekly_exercise_${today.toISOString().split('T')[0]}`,
        title: "Atleta Semanal",
        description: "Acumula 150 minutos de ejercicio esta semana",
        type: "weekly",
        category: "exercise",
        target: 150,
        currentProgress: 0,
        points: 50,
        expiresAt: nextWeek.toISOString(),
        isCompleted: false
      }
    ]
  }
  
  // Calcular estadísticas completas del usuario
  calculateUserStats(dailyProgress: any[], achievements: Achievement[] = []): UserStats {
    const totalPoints = this.calculateTotalPoints(dailyProgress, achievements)
    const currentLevel = this.getCurrentLevel(totalPoints).level
    const weeklyPoints = this.calculateWeeklyPoints(dailyProgress)
    const streakData = this.calculateStreaks(dailyProgress)
    
    return {
      totalPoints,
      currentLevel,
      weeklyPoints,
      streak: streakData.current,
      longestStreak: streakData.longest,
      achievements,
      activeChallenges: this.generateDailyChallenges({}),
      completedChallenges: achievements.filter(a => a.isUnlocked).length
    }
  }
  
  private evaluateAchievementCondition(condition: string, userStats: any, dailyProgress: any[]): boolean {
    // Evaluador simple de condiciones - en producción sería más robusto
    try {
      // Reemplazar variables con valores reales
      let evaluableCondition = condition
        .replace(/water_streak/g, userStats.waterStreak || 0)
        .replace(/exercise_streak/g, userStats.exerciseStreak || 0)
        .replace(/mindfulness_streak/g, userStats.mindfulnessStreak || 0)
        .replace(/total_points/g, userStats.totalPoints || 0)
        .replace(/daily_water/g, userStats.dailyWater || 0)
        .replace(/daily_exercise/g, userStats.dailyExercise || 0)
        .replace(/daily_mindfulness/g, userStats.dailyMindfulness || 0)
        .replace(/referrals/g, userStats.referrals || 0)
      
      return eval(evaluableCondition)
    } catch (error) {
      return false
    }
  }
  
  private calculateTotalPoints(dailyProgress: any[], achievements: Achievement[]): number {
    let points = 0
    
    // Puntos por actividades diarias
    dailyProgress.forEach(day => {
      points += this.calculateActivityPoints('water', day.water || 0)
      points += this.calculateActivityPoints('exercise', day.exercise || 0)  
      points += this.calculateActivityPoints('mindfulness', day.mindfulness || 0)
      points += this.calculateActivityPoints('meal', (day.desayuno > 0 ? 1 : 0) + (day.almuerzo > 0 ? 1 : 0) + (day.cena > 0 ? 1 : 0))
    })
    
    // Puntos por logros
    achievements.forEach(achievement => {
      if (achievement.isUnlocked) {
        points += achievement.points
      }
    })
    
    return points
  }
  
  private calculateWeeklyPoints(dailyProgress: any[]): number {
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
    
    const weeklyProgress = dailyProgress.filter(day => 
      new Date(day.date) >= oneWeekAgo
    )
    
    return this.calculateTotalPoints(weeklyProgress, [])
  }
  
  private calculateStreaks(dailyProgress: any[]): { current: number, longest: number } {
    // Calcular racha actual y más larga
    let currentStreak = 0
    let longestStreak = 0
    let tempStreak = 0
    
    const sortedProgress = dailyProgress.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    
    for (let i = 0; i < sortedProgress.length; i++) {
      const day = sortedProgress[i]
      const hasActivity = (day.water > 0) || (day.exercise > 0) || (day.mindfulness > 0)
      
      if (hasActivity) {
        tempStreak++
        if (i === 0) currentStreak = tempStreak // Racha actual
      } else {
        longestStreak = Math.max(longestStreak, tempStreak)
        tempStreak = 0
        if (i === 0) currentStreak = 0 // Se rompió la racha
      }
    }
    
    longestStreak = Math.max(longestStreak, tempStreak)
    
    return { current: currentStreak, longest: longestStreak }
  }
}

// Función helper para usar en componentes
export const updateUserGamification = async (
  userId: string,
  dailyProgress: any[],
  currentAchievements: Achievement[] = []
) => {
  const engine = new GamificationEngine()
  
  // Calcular estadísticas actuales
  const stats = engine.calculateUserStats(dailyProgress, currentAchievements)
  
  // Verificar nuevos logros
  const newAchievements = engine.checkAchievements(stats, dailyProgress)
  
  // Generar desafíos activos
  const dailyChallenges = engine.generateDailyChallenges(stats)
  const weeklyChallenges = engine.generateWeeklyChallenges()
  
  return {
    ...stats,
    newAchievements,
    dailyChallenges,
    weeklyChallenges,
    nextLevel: LEVELS.find(level => level.requiredPoints > stats.totalPoints),
    progressToNextLevel: LEVELS.find(level => level.requiredPoints > stats.totalPoints) 
      ? ((stats.totalPoints - engine.getCurrentLevel(stats.totalPoints).requiredPoints) / 
         (LEVELS.find(level => level.requiredPoints > stats.totalPoints)!.requiredPoints - engine.getCurrentLevel(stats.totalPoints).requiredPoints)) * 100
      : 100
  }
}