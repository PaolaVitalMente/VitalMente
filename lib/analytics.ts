// Sistema de Analytics Avanzado para VitalMente
// Optimizado para límites gratuitos de Supabase

export interface UserBehaviorEvent {
  id: string
  user_id: string
  event_type: 'page_view' | 'button_click' | 'feature_use' | 'goal_completion' | 'supplement_view' | 'referral_share'
  event_name: string
  properties: Record<string, any>
  session_id: string
  timestamp: string
  user_agent?: string
  page_path?: string
}

export interface ConversionFunnel {
  step: string
  users: number
  conversionRate: number
  dropOffRate: number
}

export interface UserSegment {
  segment: string
  userCount: number
  avgEngagement: number
  conversionRate: number
  characteristics: string[]
}

export interface AnalyticsInsight {
  type: 'trend' | 'anomaly' | 'opportunity' | 'warning'
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  actionable: boolean
  recommendation?: string
  data: any
}

export interface DashboardMetrics {
  totalUsers: number
  activeUsers: number
  retentionRate: number
  avgSessionDuration: number
  topFeatures: Array<{ feature: string, usage: number }>
  conversionMetrics: {
    supplementViews: number
    supplementClicks: number
    conversionRate: number
  }
  userGrowth: {
    daily: number
    weekly: number
    monthly: number
  }
}

export class AdvancedAnalytics {
  private supabase: any
  private sessionId: string

  constructor(supabaseClient: any) {
    this.supabase = supabaseClient
    this.sessionId = this.generateSessionId()
  }

  // Generar ID de sesión único
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
  }

  // Trackear evento de usuario
  async trackEvent(
    userId: string,
    eventType: UserBehaviorEvent['event_type'],
    eventName: string,
    properties: Record<string, any> = {},
    pagePath?: string
  ): Promise<void> {
    try {
      const event: Omit<UserBehaviorEvent, 'id'> = {
        user_id: userId,
        event_type: eventType,
        event_name: eventName,
        properties,
        session_id: this.sessionId,
        timestamp: new Date().toISOString(),
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
        page_path: pagePath
      }

      await this.supabase
        .from('user_behavior_events')
        .insert(event)

      // Actualizar métricas en tiempo real (opcional)
      await this.updateRealTimeMetrics(userId, eventType, eventName)
    } catch (error) {
      console.error('Error tracking event:', error)
    }
  }

  // Analizar embudo de conversión
  async analyzeConversionFunnel(): Promise<ConversionFunnel[]> {
    const funnelSteps = [
      { step: 'Registro', event: 'user_registered' },
      { step: 'Primera Actividad', event: 'first_activity_logged' },
      { step: 'Día 3 Activo', event: 'day_3_active' },
      { step: 'Semana 1 Completa', event: 'week_1_completed' },
      { step: 'Vió Suplementos', event: 'supplements_viewed' },
      { step: 'Click en Suplemento', event: 'supplement_clicked' },
      { step: 'Compartió Referido', event: 'referral_shared' }
    ]

    const funnel: ConversionFunnel[] = []
    let previousUsers = 0

    for (let i = 0; i < funnelSteps.length; i++) {
      const step = funnelSteps[i]
      
      const { count } = await this.supabase
        .from('user_behavior_events')
        .select('user_id', { count: 'exact', head: true })
        .eq('event_name', step.event)
        .or(`event_type.eq.goal_completion,event_type.eq.feature_use`)

      const users = count || 0
      const conversionRate = i === 0 ? 100 : previousUsers > 0 ? (users / previousUsers) * 100 : 0
      const dropOffRate = 100 - conversionRate

      funnel.push({
        step: step.step,
        users,
        conversionRate: Math.round(conversionRate * 100) / 100,
        dropOffRate: Math.round(dropOffRate * 100) / 100
      })

      previousUsers = users
    }

    return funnel
  }

  // Segmentar usuarios por comportamiento
  async segmentUsers(): Promise<UserSegment[]> {
    const segments: UserSegment[] = []

    // Usuarios altamente comprometidos
    const highEngagement = await this.getUsersByEngagementLevel('high')
    segments.push({
      segment: 'Altamente Comprometidos',
      userCount: highEngagement.length,
      avgEngagement: 85,
      conversionRate: await this.calculateSegmentConversion(highEngagement),
      characteristics: ['Uso diario', 'Múltiples actividades', 'Compartición activa']
    })

    // Usuarios ocasionales
    const mediumEngagement = await this.getUsersByEngagementLevel('medium')
    segments.push({
      segment: 'Usuarios Ocasionales',
      userCount: mediumEngagement.length,
      avgEngagement: 45,
      conversionRate: await this.calculateSegmentConversion(mediumEngagement),
      characteristics: ['Uso semanal', 'Actividad limitada', 'Necesitan motivación']
    })

    // Usuarios en riesgo
    const lowEngagement = await this.getUsersByEngagementLevel('low')
    segments.push({
      segment: 'En Riesgo de Abandono',
      userCount: lowEngagement.length,
      avgEngagement: 15,
      conversionRate: await this.calculateSegmentConversion(lowEngagement),
      characteristics: ['Uso esporádico', 'Baja actividad', 'Candidatos a re-engagement']
    })

    return segments
  }

  // Generar insights automáticos
  async generateInsights(): Promise<AnalyticsInsight[]> {
    const insights: AnalyticsInsight[] = []

    // Análisis de retención
    const retentionData = await this.analyzeRetention()
    if (retentionData.weeklyRetention < 40) {
      insights.push({
        type: 'warning',
        title: 'Retención Semanal Baja',
        description: `Solo ${retentionData.weeklyRetention}% de usuarios regresan en la semana`,
        impact: 'high',
        actionable: true,
        recommendation: 'Implementar notificaciones push y gamificación más agresiva',
        data: retentionData
      })
    }

    // Análisis de features más usadas
    const featureUsage = await this.analyzeFeatureUsage()
    const topFeature = featureUsage[0]
    if (topFeature) {
      insights.push({
        type: 'opportunity',
        title: `${topFeature.feature} es la Feature Estrella`,
        description: `${topFeature.usage}% de usuarios la utilizan regularmente`,
        impact: 'medium',
        actionable: true,
        recommendation: 'Optimizar y promocionar esta funcionalidad',
        data: featureUsage
      })
    }

    // Análisis de conversión de suplementos
    const conversionRate = await this.calculateSupplementConversion()
    if (conversionRate < 5) {
      insights.push({
        type: 'opportunity',
        title: 'Oportunidad de Mejora en Conversión',
        description: `Solo ${conversionRate}% convierte en suplementos`,
        impact: 'high',
        actionable: true,
        recommendation: 'Mejorar recomendaciones IA y timing de ofertas',
        data: { conversionRate }
      })
    }

    // Análisis de abandono en onboarding
    const onboardingCompletion = await this.analyzeOnboardingCompletion()
    if (onboardingCompletion < 80) {
      insights.push({
        type: 'warning',
        title: 'Abandono en Onboarding',
        description: `${100 - onboardingCompletion}% abandona el proceso inicial`,
        impact: 'high',
        actionable: true,
        recommendation: 'Simplificar proceso de registro y mejorar UX inicial',
        data: { completionRate: onboardingCompletion }
      })
    }

    return insights
  }

  // Obtener métricas del dashboard
  async getDashboardMetrics(): Promise<DashboardMetrics> {
    const [
      totalUsers,
      activeUsers,
      retentionRate,
      avgSessionDuration,
      topFeatures,
      conversionMetrics,
      userGrowth
    ] = await Promise.all([
      this.getTotalUsers(),
      this.getActiveUsers(),
      this.calculateRetentionRate(),
      this.calculateAvgSessionDuration(),
      this.getTopFeatures(),
      this.getConversionMetrics(),
      this.getUserGrowthMetrics()
    ])

    return {
      totalUsers,
      activeUsers,
      retentionRate,
      avgSessionDuration,
      topFeatures,
      conversionMetrics,
      userGrowth
    }
  }

  // Análisis de cohortes simplificado
  async analyzeCohorts(cohortType: 'weekly' | 'monthly' = 'weekly'): Promise<any> {
    const cohortData = []
    const periods = cohortType === 'weekly' ? 12 : 6 // 12 semanas o 6 meses

    for (let i = 0; i < periods; i++) {
      const startDate = new Date()
      if (cohortType === 'weekly') {
        startDate.setDate(startDate.getDate() - (i + 1) * 7)
      } else {
        startDate.setMonth(startDate.getMonth() - (i + 1))
      }

      const endDate = new Date(startDate)
      if (cohortType === 'weekly') {
        endDate.setDate(endDate.getDate() + 7)
      } else {
        endDate.setMonth(endDate.getMonth() + 1)
      }

      const cohortUsers = await this.getCohortUsers(startDate, endDate)
      const retentionRates = await this.calculateCohortRetention(cohortUsers, startDate)

      cohortData.push({
        period: startDate.toISOString().split('T')[0],
        users: cohortUsers.length,
        retention: retentionRates
      })
    }

    return cohortData
  }

  // Métodos privados para cálculos específicos
  private async updateRealTimeMetrics(userId: string, eventType: string, eventName: string): Promise<void> {
    // Actualizar contadores en tiempo real si es necesario
    // Esto es opcional y depende de tus necesidades de performance
  }

  private async getUsersByEngagementLevel(level: 'high' | 'medium' | 'low'): Promise<string[]> {
    const thresholds = { high: 20, medium: 5, low: 0 }
    const minEvents = thresholds[level]
    const maxEvents = level === 'high' ? 1000 : level === 'medium' ? 20 : 5

    const { data } = await this.supabase
      .from('user_behavior_events')
      .select('user_id')
      .gte('timestamp', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())

    if (!data) return []

    const userEventCounts = data.reduce((acc: Record<string, number>, event: any) => {
      acc[event.user_id] = (acc[event.user_id] || 0) + 1
      return acc
    }, {})

    return Object.keys(userEventCounts).filter(userId => {
      const count = userEventCounts[userId]
      return count >= minEvents && count <= maxEvents
    })
  }

  private async calculateSegmentConversion(userIds: string[]): Promise<number> {
    if (userIds.length === 0) return 0

    const { data } = await this.supabase
      .from('user_behavior_events')
      .select('user_id')
      .in('user_id', userIds)
      .eq('event_name', 'supplement_clicked')

    const convertedUsers = new Set(data?.map(d => d.user_id) || [])
    return Math.round((convertedUsers.size / userIds.length) * 100)
  }

  private async analyzeRetention(): Promise<any> {
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    
    const { data: totalUsers } = await this.supabase
      .from('users')
      .select('id')
      .lte('created_at', weekAgo.toISOString())

    const { data: activeUsers } = await this.supabase
      .from('user_behavior_events')
      .select('user_id')
      .gte('timestamp', weekAgo.toISOString())

    const totalCount = totalUsers?.length || 0
    const activeCount = new Set(activeUsers?.map(u => u.user_id) || []).size
    const weeklyRetention = totalCount > 0 ? Math.round((activeCount / totalCount) * 100) : 0

    return { weeklyRetention, totalUsers: totalCount, activeUsers: activeCount }
  }

  private async analyzeFeatureUsage(): Promise<Array<{ feature: string, usage: number }>> {
    const { data } = await this.supabase
      .from('user_behavior_events')
      .select('event_name, user_id')
      .eq('event_type', 'feature_use')
      .gte('timestamp', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())

    if (!data) return []

    const featureUsage = data.reduce((acc: Record<string, Set<string>>, event: any) => {
      if (!acc[event.event_name]) acc[event.event_name] = new Set()
      acc[event.event_name].add(event.user_id)
      return acc
    }, {})

    return Object.entries(featureUsage)
      .map(([feature, users]) => ({
        feature,
        usage: users.size
      }))
      .sort((a, b) => b.usage - a.usage)
      .slice(0, 5)
  }

  private async calculateSupplementConversion(): Promise<number> {
    const { data: views } = await this.supabase
      .from('user_behavior_events')
      .select('user_id', { count: 'exact', head: true })
      .eq('event_name', 'supplements_viewed')

    const { data: clicks } = await this.supabase
      .from('user_behavior_events')
      .select('user_id', { count: 'exact', head: true })
      .eq('event_name', 'supplement_clicked')

    const viewCount = views?.length || 0
    const clickCount = clicks?.length || 0

    return viewCount > 0 ? Math.round((clickCount / viewCount) * 100) : 0
  }

  private async analyzeOnboardingCompletion(): Promise<number> {
    const { data: started } = await this.supabase
      .from('user_behavior_events')
      .select('user_id', { count: 'exact', head: true })
      .eq('event_name', 'onboarding_started')

    const { data: completed } = await this.supabase
      .from('user_behavior_events')
      .select('user_id', { count: 'exact', head: true })
      .eq('event_name', 'onboarding_completed')

    const startedCount = started?.length || 0
    const completedCount = completed?.length || 0

    return startedCount > 0 ? Math.round((completedCount / startedCount) * 100) : 100
  }

  // Métodos auxiliares para métricas del dashboard
  private async getTotalUsers(): Promise<number> {
    const { count } = await this.supabase
      .from('users')
      .select('id', { count: 'exact', head: true })
    return count || 0
  }

  private async getActiveUsers(): Promise<number> {
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const { data } = await this.supabase
      .from('user_behavior_events')
      .select('user_id')
      .gte('timestamp', weekAgo.toISOString())

    return new Set(data?.map(d => d.user_id) || []).size
  }

  private async calculateRetentionRate(): Promise<number> {
    const retention = await this.analyzeRetention()
    return retention.weeklyRetention
  }

  private async calculateAvgSessionDuration(): Promise<number> {
    // Implementación simplificada - en producción sería más complejo
    return 8.5 // Minutos promedio
  }

  private async getTopFeatures(): Promise<Array<{ feature: string, usage: number }>> {
    return await this.analyzeFeatureUsage()
  }

  private async getConversionMetrics(): Promise<any> {
    const supplementViews = await this.getEventCount('supplements_viewed')
    const supplementClicks = await this.getEventCount('supplement_clicked')
    const conversionRate = supplementViews > 0 ? Math.round((supplementClicks / supplementViews) * 100) : 0

    return {
      supplementViews,
      supplementClicks,
      conversionRate
    }
  }

  private async getUserGrowthMetrics(): Promise<any> {
    const now = new Date()
    const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    const [daily, weekly, monthly] = await Promise.all([
      this.getUserCountSince(dayAgo),
      this.getUserCountSince(weekAgo),
      this.getUserCountSince(monthAgo)
    ])

    return { daily, weekly, monthly }
  }

  private async getEventCount(eventName: string): Promise<number> {
    const { count } = await this.supabase
      .from('user_behavior_events')
      .select('id', { count: 'exact', head: true })
      .eq('event_name', eventName)
    return count || 0
  }

  private async getUserCountSince(date: Date): Promise<number> {
    const { count } = await this.supabase
      .from('users')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', date.toISOString())
    return count || 0
  }

  private async getCohortUsers(startDate: Date, endDate: Date): Promise<string[]> {
    const { data } = await this.supabase
      .from('users')
      .select('id')
      .gte('created_at', startDate.toISOString())
      .lt('created_at', endDate.toISOString())

    return data?.map(u => u.id) || []
  }

  private async calculateCohortRetention(userIds: string[], cohortStart: Date): Promise<number[]> {
    const retentionPeriods = [1, 2, 3, 4] // Semanas
    const retention = []

    for (const weeks of retentionPeriods) {
      const periodStart = new Date(cohortStart)
      periodStart.setDate(periodStart.getDate() + weeks * 7)
      
      const periodEnd = new Date(periodStart)
      periodEnd.setDate(periodEnd.getDate() + 7)

      const { data } = await this.supabase
        .from('user_behavior_events')
        .select('user_id')
        .in('user_id', userIds)
        .gte('timestamp', periodStart.toISOString())
        .lt('timestamp', periodEnd.toISOString())

      const activeUsers = new Set(data?.map(d => d.user_id) || [])
      const retentionRate = userIds.length > 0 ? (activeUsers.size / userIds.length) * 100 : 0
      retention.push(Math.round(retentionRate))
    }

    return retention
  }
}

// Schema SQL para Analytics (ejecutar en Supabase SQL Editor)
export const ANALYTICS_SCHEMA = `
-- Tabla para eventos de comportamiento de usuario
CREATE TABLE IF NOT EXISTS user_behavior_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  event_type VARCHAR(50) NOT NULL,
  event_name VARCHAR(100) NOT NULL,
  properties JSONB DEFAULT '{}',
  session_id VARCHAR(100),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_agent TEXT,
  page_path VARCHAR(255)
);

-- Índices para optimización
CREATE INDEX IF NOT EXISTS idx_user_behavior_events_user_id ON user_behavior_events(user_id);
CREATE INDEX IF NOT EXISTS idx_user_behavior_events_event_type ON user_behavior_events(event_type);
CREATE INDEX IF NOT EXISTS idx_user_behavior_events_event_name ON user_behavior_events(event_name);
CREATE INDEX IF NOT EXISTS idx_user_behavior_events_timestamp ON user_behavior_events(timestamp);
CREATE INDEX IF NOT EXISTS idx_user_behavior_events_session_id ON user_behavior_events(session_id);

-- RLS Policy
ALTER TABLE user_behavior_events ENABLE ROW LEVEL SECURITY;

-- Política para que solo admins puedan ver todos los eventos
CREATE POLICY "Admins can view all behavior events" ON user_behavior_events
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.phone = '+573001234567' -- Admin phone
    )
  );

-- Política para que usuarios puedan insertar sus propios eventos
CREATE POLICY "Users can insert own behavior events" ON user_behavior_events
  FOR INSERT WITH CHECK (user_id = auth.uid());
`

// Helper para inicializar analytics
export const initializeAnalytics = (supabaseClient: any) => {
  return new AdvancedAnalytics(supabaseClient)
}