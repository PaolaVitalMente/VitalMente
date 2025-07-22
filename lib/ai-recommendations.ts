// Sistema de IA para recomendaciones de suplementos basado en patrones
// Optimizado para funcionar dentro de límites gratuitos de Supabase

interface UserPattern {
  userId: string
  avgWaterIntake: number
  avgExerciseMinutes: number
  avgMindfulnessMinutes: number
  goalType: 'physical' | 'emotional'
  activityLevel: number
  consistencyScore: number // 0-100
  preferredMealTimes: string[]
  macroBalance: {
    protein: number
    carbs: number
    fats: number
  }
}

interface RecommendationEngine {
  analyzeUserPattern(dailyProgress: any[], userProfile: any): UserPattern
  generateSupplementRecommendations(pattern: UserPattern, supplements: any[]): any[]
  generateNutritionalTips(pattern: UserPattern): string[]
  calculateOptimalTiming(pattern: UserPattern): string[]
}

export class AIRecommendationEngine implements RecommendationEngine {
  
  analyzeUserPattern(dailyProgress: any[], userProfile: any): UserPattern {
    const recentProgress = dailyProgress.slice(-30) // Últimos 30 días
    
    const avgWater = this.calculateAverage(recentProgress, 'water')
    const avgExercise = this.calculateAverage(recentProgress, 'exercise')
    const avgMindfulness = this.calculateAverage(recentProgress, 'mindfulness')
    
    // Calcular consistencia (días con actividad vs días totales)
    const activeDays = recentProgress.filter(day => 
      day.water > 0 || day.exercise > 0 || day.mindfulness > 0
    ).length
    const consistencyScore = Math.round((activeDays / Math.max(recentProgress.length, 1)) * 100)
    
    // Detectar patrones de horarios preferidos
    const preferredMealTimes = this.detectMealPatterns(recentProgress)
    
    return {
      userId: userProfile.id,
      avgWaterIntake: avgWater,
      avgExerciseMinutes: avgExercise,
      avgMindfulnessMinutes: avgMindfulness,
      goalType: userProfile.goal?.includes('lose') || userProfile.goal?.includes('gain') ? 'physical' : 'emotional',
      activityLevel: userProfile.activity_level || 1.2,
      consistencyScore,
      preferredMealTimes,
      macroBalance: this.analyzeMacroBalance(recentProgress)
    }
  }

  generateSupplementRecommendations(pattern: UserPattern, supplements: any[]): any[] {
    const recommendations = []
    
    // Algoritmo de scoring basado en patrones
    for (const supplement of supplements) {
      let score = 0
      
      // Scoring basado en objetivos
      if (pattern.goalType === 'physical') {
        if (supplement.name.toLowerCase().includes('muscle') || 
            supplement.name.toLowerCase().includes('protein')) {
          score += 30
        }
        if (supplement.name.toLowerCase().includes('energy')) {
          score += 20
        }
      } else {
        if (supplement.name.toLowerCase().includes('relax') || 
            supplement.name.toLowerCase().includes('calm')) {
          score += 30
        }
        if (supplement.name.toLowerCase().includes('mind')) {
          score += 20
        }
      }
      
      // Scoring basado en consistencia
      if (pattern.consistencyScore < 50) {
        if (supplement.benefits.some(b => b.toLowerCase().includes('energía'))) {
          score += 25
        }
      }
      
      // Scoring basado en actividad
      if (pattern.avgExerciseMinutes > 30) {
        if (supplement.benefits.some(b => b.toLowerCase().includes('recuperación'))) {
          score += 20
        }
      }
      
      if (pattern.avgMindfulnessMinutes < 10) {
        if (supplement.benefits.some(b => b.toLowerCase().includes('estrés'))) {
          score += 25
        }
      }
      
      if (score > 20) {
        recommendations.push({
          ...supplement,
          aiScore: score,
          reasoning: this.generateReasoning(supplement, pattern)
        })
      }
    }
    
    // Ordenar por score y retornar top 3
    return recommendations
      .sort((a, b) => b.aiScore - a.aiScore)
      .slice(0, 3)
  }

  generateNutritionalTips(pattern: UserPattern): string[] {
    const tips = []
    
    if (pattern.avgWaterIntake < 6) {
      tips.push("💧 Aumenta tu hidratación: Tu consumo promedio está por debajo del ideal. Intenta beber un vaso al despertar.")
    }
    
    if (pattern.avgExerciseMinutes < 20) {
      tips.push("🏃‍♂️ Incrementa actividad física: Pequeñas caminatas de 10 minutos pueden hacer gran diferencia.")
    }
    
    if (pattern.consistencyScore < 70) {
      tips.push("📅 Mejora tu consistencia: Crear rutinas pequeñas pero diarias es más efectivo que esfuerzos esporádicos grandes.")
    }
    
    if (pattern.macroBalance.protein < 20) {
      tips.push("🥩 Aumenta proteína: Tu balance actual podría beneficiarse de más proteína para mejor saciedad y recuperación.")
    }
    
    return tips.slice(0, 3)
  }

  calculateOptimalTiming(pattern: UserPattern): string[] {
    const timing = []
    
    // Basado en patrones de actividad
    if (pattern.avgExerciseMinutes > 20) {
      timing.push("🕐 Mejor momento para suplementos: 30 minutos antes del ejercicio para energía, 30 minutos después para recuperación")
    }
    
    if (pattern.avgMindfulnessMinutes > 0) {
      timing.push("🌙 Suplementos para relajación: Mejor tomarlos 1 hora antes de tu sesión de mindfulness o antes de dormir")
    }
    
    timing.push("🌅 Vitaminas generales: Mejor absorción en ayunas o con el desayuno")
    
    return timing
  }

  private calculateAverage(data: any[], field: string): number {
    if (data.length === 0) return 0
    const sum = data.reduce((acc, item) => acc + (item[field] || 0), 0)
    return Math.round(sum / data.length)
  }

  private detectMealPatterns(progress: any[]): string[] {
    // Análisis simple de patrones de comidas
    const mealCounts = { morning: 0, afternoon: 0, evening: 0 }
    
    progress.forEach(day => {
      if (day.desayuno > 0) mealCounts.morning++
      if (day.almuerzo > 0) mealCounts.afternoon++
      if (day.cena > 0) mealCounts.evening++
    })
    
    const total = progress.length || 1
    const patterns = []
    
    if (mealCounts.morning / total > 0.7) patterns.push('morning')
    if (mealCounts.afternoon / total > 0.7) patterns.push('afternoon')  
    if (mealCounts.evening / total > 0.7) patterns.push('evening')
    
    return patterns
  }

  private analyzeMacroBalance(progress: any[]): { protein: number, carbs: number, fats: number } {
    // Análisis simplificado - en una implementación real usarías datos de meal_compositions
    return {
      protein: 25,
      carbs: 45,
      fats: 30
    }
  }

  private generateReasoning(supplement: any, pattern: UserPattern): string {
    const reasons = []
    
    if (pattern.consistencyScore < 50) {
      reasons.push("tu constancia puede mejorar")
    }
    
    if (pattern.goalType === 'physical' && supplement.name.toLowerCase().includes('muscle')) {
      reasons.push("se alinea con tus objetivos físicos")
    }
    
    if (pattern.avgMindfulnessMinutes < 10 && supplement.benefits.some(b => b.toLowerCase().includes('estrés'))) {
      reasons.push("puede ayudar con el manejo del estrés")
    }
    
    return `Recomendado porque ${reasons.join(' y ')}.`
  }
}

// Función helper para usar en el componente principal
export const getAIRecommendations = async (
  dailyProgress: any[], 
  userProfile: any, 
  supplements: any[]
) => {
  const engine = new AIRecommendationEngine()
  const pattern = engine.analyzeUserPattern(dailyProgress, userProfile)
  
  return {
    supplements: engine.generateSupplementRecommendations(pattern, supplements),
    nutritionalTips: engine.generateNutritionalTips(pattern),
    optimalTiming: engine.calculateOptimalTiming(pattern),
    userPattern: pattern
  }
}