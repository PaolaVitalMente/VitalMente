// Sistema de Referidos Automático para VitalMente
// Códigos únicos, tracking y recompensas

import { createClient } from '@supabase/supabase-js'

export interface ReferralCode {
  id: string
  user_id: string
  code: string
  uses: number
  max_uses: number
  expires_at: string | null
  created_at: string
  is_active: boolean
}

export interface ReferralEvent {
  id: string
  referrer_id: string
  referred_id: string
  referral_code: string
  status: 'pending' | 'completed' | 'rewarded'
  reward_points: number
  completed_at: string | null
  created_at: string
}

export interface ReferralStats {
  totalReferrals: number
  completedReferrals: number
  pendingReferrals: number
  totalPointsEarned: number
  conversionRate: number
  monthlyReferrals: number
  topReferralCode: string
}

export interface ReferralReward {
  type: 'points' | 'level_boost' | 'premium_content' | 'supplement_discount'
  value: number
  description: string
  icon: string
}

export class ReferralSystem {
  private supabase: any

  constructor(supabaseClient: any) {
    this.supabase = supabaseClient
  }

  // Generar código único de referido
  generateReferralCode(userId: string): string {
    const prefix = 'VM'
    const userPart = userId.slice(-4).toUpperCase()
    const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase()
    return `${prefix}${userPart}${randomPart}`
  }

  // Crear código de referido para usuario
  async createReferralCode(userId: string, maxUses: number = 10): Promise<ReferralCode> {
    const code = this.generateReferralCode(userId)
    const expiresAt = new Date()
    expiresAt.setMonth(expiresAt.getMonth() + 6) // Expira en 6 meses

    const { data, error } = await this.supabase
      .from('referral_codes')
      .insert({
        user_id: userId,
        code,
        uses: 0,
        max_uses: maxUses,
        expires_at: expiresAt.toISOString(),
        is_active: true,
        created_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) throw new Error(error.message)
    return data
  }

  // Validar código de referido
  async validateReferralCode(code: string): Promise<{ valid: boolean, referralCode?: ReferralCode, reason?: string }> {
    const { data, error } = await this.supabase
      .from('referral_codes')
      .select('*')
      .eq('code', code.toUpperCase())
      .eq('is_active', true)
      .single()

    if (error || !data) {
      return { valid: false, reason: 'Código no encontrado' }
    }

    const now = new Date()
    const expiresAt = new Date(data.expires_at)

    if (data.expires_at && now > expiresAt) {
      return { valid: false, reason: 'Código expirado' }
    }

    if (data.uses >= data.max_uses) {
      return { valid: false, reason: 'Código agotado' }
    }

    return { valid: true, referralCode: data }
  }

  // Procesar referido (cuando un usuario se registra con código)
  async processReferral(referralCode: string, newUserId: string): Promise<ReferralEvent> {
    const validation = await this.validateReferralCode(referralCode)
    
    if (!validation.valid || !validation.referralCode) {
      throw new Error(validation.reason || 'Código inválido')
    }

    // Crear evento de referido
    const { data: referralEvent, error } = await this.supabase
      .from('referral_events')
      .insert({
        referrer_id: validation.referralCode.user_id,
        referred_id: newUserId,
        referral_code: referralCode.toUpperCase(),
        status: 'pending',
        reward_points: this.calculateReferralReward(validation.referralCode),
        created_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) throw new Error(error.message)

    // Incrementar uso del código
    await this.supabase
      .from('referral_codes')
      .update({ 
        uses: validation.referralCode.uses + 1,
        updated_at: new Date().toISOString()
      })
      .eq('id', validation.referralCode.id)

    return referralEvent
  }

  // Completar referido (cuando el usuario referido cumple condiciones)
  async completeReferral(referralEventId: string): Promise<void> {
    const now = new Date().toISOString()
    
    const { error } = await this.supabase
      .from('referral_events')
      .update({
        status: 'completed',
        completed_at: now,
        updated_at: now
      })
      .eq('id', referralEventId)
      .eq('status', 'pending')

    if (error) throw new Error(error.message)

    // Aquí podrías disparar notificaciones, etc.
  }

  // Otorgar recompensas por referido completado
  async rewardReferral(referralEventId: string): Promise<ReferralReward[]> {
    const { data: referralEvent, error } = await this.supabase
      .from('referral_events')
      .select('*')
      .eq('id', referralEventId)
      .eq('status', 'completed')
      .single()

    if (error || !referralEvent) {
      throw new Error('Evento de referido no encontrado')
    }

    const rewards = this.generateRewards(referralEvent)
    
    // Marcar como recompensado
    await this.supabase
      .from('referral_events')
      .update({
        status: 'rewarded',
        updated_at: new Date().toISOString()
      })
      .eq('id', referralEventId)

    // Aquí aplicarías las recompensas al usuario
    await this.applyRewardsToUser(referralEvent.referrer_id, rewards)

    return rewards
  }

  // Obtener estadísticas de referidos del usuario
  async getUserReferralStats(userId: string): Promise<ReferralStats> {
    const { data: referralEvents } = await this.supabase
      .from('referral_events')
      .select('*')
      .eq('referrer_id', userId)

    const { data: referralCodes } = await this.supabase
      .from('referral_codes')
      .select('*')
      .eq('user_id', userId)

    if (!referralEvents || !referralCodes) {
      return this.getEmptyStats()
    }

    const totalReferrals = referralEvents.length
    const completedReferrals = referralEvents.filter(e => e.status === 'completed' || e.status === 'rewarded').length
    const pendingReferrals = referralEvents.filter(e => e.status === 'pending').length
    const totalPointsEarned = referralEvents
      .filter(e => e.status === 'rewarded')
      .reduce((sum, e) => sum + e.reward_points, 0)

    const conversionRate = totalReferrals > 0 ? (completedReferrals / totalReferrals) * 100 : 0

    // Referidos del mes actual
    const thisMonth = new Date()
    thisMonth.setDate(1)
    const monthlyReferrals = referralEvents.filter(e => 
      new Date(e.created_at) >= thisMonth
    ).length

    // Código más exitoso
    const codeUsage = referralCodes.reduce((acc, code) => {
      acc[code.code] = code.uses
      return acc
    }, {} as Record<string, number>)
    
    const topReferralCode = Object.keys(codeUsage).reduce((a, b) => 
      codeUsage[a] > codeUsage[b] ? a : b
    , '') || 'Ninguno'

    return {
      totalReferrals,
      completedReferrals,
      pendingReferrals,
      totalPointsEarned,
      conversionRate,
      monthlyReferrals,
      topReferralCode
    }
  }

  // Obtener códigos activos del usuario
  async getUserReferralCodes(userId: string): Promise<ReferralCode[]> {
    const { data, error } = await this.supabase
      .from('referral_codes')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) throw new Error(error.message)
    return data || []
  }

  // Generar URL de referido
  generateReferralUrl(code: string, baseUrl: string = 'https://vitalmente.app'): string {
    return `${baseUrl}?ref=${code}`
  }

  // Generar mensaje para compartir
  generateShareMessage(code: string, userName: string): string {
    const url = this.generateReferralUrl(code)
    return `¡Hola! Te invito a unirte a VitalMente, la app que me está ayudando a mejorar mi bienestar. 
    
🌟 Usa mi código ${code} y obtén beneficios especiales
💪 Trackea tu progreso diario
🧘 Recursos de mindfulness y nutrición
🎯 Sistema de logros y desafíos

Descárgala aquí: ${url}

¡Nos vemos en VitalMente! - ${userName}`
  }

  // Verificar si usuario puede ser referido
  async canUserBeReferred(userId: string): Promise<boolean> {
    const { data } = await this.supabase
      .from('referral_events')
      .select('id')
      .eq('referred_id', userId)
      .limit(1)

    return !data || data.length === 0
  }

  // Verificar condiciones para completar referido
  async checkReferralCompletion(userId: string): Promise<boolean> {
    // Condiciones: usuario activo por 3 días y al menos 1 actividad registrada
    const { data: user } = await this.supabase
      .from('users')
      .select('created_at')
      .eq('id', userId)
      .single()

    if (!user) return false

    const createdAt = new Date(user.created_at)
    const threeDaysAgo = new Date()
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)

    if (createdAt > threeDaysAgo) return false

    // Verificar actividad
    const { data: progress } = await this.supabase
      .from('daily_progress')
      .select('id')
      .eq('user_id', userId)
      .or('water.gt.0,exercise.gt.0,mindfulness.gt.0')
      .limit(1)

    return progress && progress.length > 0
  }

  private calculateReferralReward(referralCode: ReferralCode): number {
    // Recompensa base de 50 puntos
    let points = 50

    // Bonificación por código nuevo (primeros 3 usos)
    if (referralCode.uses < 3) {
      points += 25
    }

    // Bonificación por código premium (más de 5 usos exitosos)
    if (referralCode.uses >= 5) {
      points += 50
    }

    return points
  }

  private generateRewards(referralEvent: ReferralEvent): ReferralReward[] {
    const rewards: ReferralReward[] = [
      {
        type: 'points',
        value: referralEvent.reward_points,
        description: `${referralEvent.reward_points} puntos por referido exitoso`,
        icon: '🎯'
      }
    ]

    // Recompensas adicionales basadas en cantidad de referidos
    const referralCount = Math.floor(referralEvent.reward_points / 50) // Aproximación

    if (referralCount >= 5) {
      rewards.push({
        type: 'level_boost',
        value: 100,
        description: '100 puntos bonus por 5+ referidos',
        icon: '🚀'
      })
    }

    if (referralCount >= 10) {
      rewards.push({
        type: 'supplement_discount',
        value: 15,
        description: '15% descuento en suplementos',
        icon: '💊'
      })
    }

    return rewards
  }

  private async applyRewardsToUser(userId: string, rewards: ReferralReward[]): Promise<void> {
    // Aquí aplicarías las recompensas al perfil del usuario
    // Por ejemplo, sumar puntos, desbloquear contenido, etc.
    const totalPoints = rewards
      .filter(r => r.type === 'points' || r.type === 'level_boost')
      .reduce((sum, r) => sum + r.value, 0)

    if (totalPoints > 0) {
      // Actualizar puntos del usuario (esto dependería de tu implementación de gamificación)
      console.log(`Aplicando ${totalPoints} puntos al usuario ${userId}`)
    }
  }

  private getEmptyStats(): ReferralStats {
    return {
      totalReferrals: 0,
      completedReferrals: 0,
      pendingReferrals: 0,
      totalPointsEarned: 0,
      conversionRate: 0,
      monthlyReferrals: 0,
      topReferralCode: 'Ninguno'
    }
  }
}

// Funciones helper para usar en componentes
export const initializeReferralSystem = (supabaseClient: any) => {
  return new ReferralSystem(supabaseClient)
}

export const processNewUserReferral = async (
  referralSystem: ReferralSystem,
  referralCode: string | null,
  newUserId: string
) => {
  if (!referralCode) return null

  try {
    const referralEvent = await referralSystem.processReferral(referralCode, newUserId)
    return referralEvent
  } catch (error) {
    console.error('Error procesando referido:', error)
    return null
  }
}

// Schema SQL para Supabase (ejecutar en SQL Editor)
export const REFERRAL_SCHEMA = `
-- Tabla para códigos de referido
CREATE TABLE IF NOT EXISTS referral_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  code VARCHAR(20) UNIQUE NOT NULL,
  uses INTEGER DEFAULT 0,
  max_uses INTEGER DEFAULT 10,
  expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla para eventos de referido
CREATE TABLE IF NOT EXISTS referral_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_id UUID REFERENCES users(id) ON DELETE CASCADE,
  referred_id UUID REFERENCES users(id) ON DELETE CASCADE,
  referral_code VARCHAR(20) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'rewarded')),
  reward_points INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para optimización
CREATE INDEX IF NOT EXISTS idx_referral_codes_user_id ON referral_codes(user_id);
CREATE INDEX IF NOT EXISTS idx_referral_codes_code ON referral_codes(code);
CREATE INDEX IF NOT EXISTS idx_referral_events_referrer_id ON referral_events(referrer_id);
CREATE INDEX IF NOT EXISTS idx_referral_events_referred_id ON referral_events(referred_id);

-- RLS Policies
ALTER TABLE referral_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE referral_events ENABLE ROW LEVEL SECURITY;

-- Política para que usuarios solo vean sus propios códigos
CREATE POLICY "Users can view own referral codes" ON referral_codes
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create own referral codes" ON referral_codes
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Política para eventos de referido
CREATE POLICY "Users can view referral events where they are referrer" ON referral_events
  FOR SELECT USING (referrer_id = auth.uid());
`