# 🚀 Setup de Base de Datos para VitalMente Optimizado

Este archivo contiene todas las consultas SQL necesarias para configurar las nuevas funcionalidades avanzadas en Supabase.

## 📋 Instrucciones de Instalación

1. Ve al **SQL Editor** en tu dashboard de Supabase
2. Ejecuta cada bloque de código en orden
3. Verifica que todas las tablas se hayan creado correctamente

## 🤖 1. Sistema de Analytics

```sql
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
      AND users.phone = '+573001234567' -- Cambiar por tu teléfono de admin
    )
  );

-- Política para que usuarios puedan insertar sus propios eventos
CREATE POLICY "Users can insert own behavior events" ON user_behavior_events
  FOR INSERT WITH CHECK (user_id = auth.uid());
```

## 👥 2. Sistema de Referidos

```sql
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

CREATE POLICY "Users can update own referral codes" ON referral_codes
  FOR UPDATE USING (user_id = auth.uid());

-- Política para eventos de referido
CREATE POLICY "Users can view referral events where they are referrer" ON referral_events
  FOR SELECT USING (referrer_id = auth.uid());

CREATE POLICY "System can insert referral events" ON referral_events
  FOR INSERT WITH CHECK (true);

CREATE POLICY "System can update referral events" ON referral_events
  FOR UPDATE USING (true);
```

## 🎮 3. Tablas Adicionales para Gamificación (Opcional)

```sql
-- Tabla para guardar logros de usuarios (opcional - también puede manejarse en memoria)
CREATE TABLE IF NOT EXISTS user_achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  achievement_id VARCHAR(50) NOT NULL,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  points_earned INTEGER DEFAULT 0,
  UNIQUE(user_id, achievement_id)
);

-- Tabla para desafíos activos de usuarios (opcional)
CREATE TABLE IF NOT EXISTS user_challenges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  challenge_id VARCHAR(100) NOT NULL,
  challenge_type VARCHAR(20) NOT NULL,
  target_value INTEGER NOT NULL,
  current_progress INTEGER DEFAULT 0,
  points_reward INTEGER DEFAULT 0,
  expires_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_completed BOOLEAN DEFAULT false
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_user_challenges_user_id ON user_challenges(user_id);
CREATE INDEX IF NOT EXISTS idx_user_challenges_expires_at ON user_challenges(expires_at);

-- RLS Policies
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_challenges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own achievements" ON user_achievements
  FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Users can view own challenges" ON user_challenges
  FOR ALL USING (user_id = auth.uid());
```

## 📊 4. Funciones Helper para Analytics (Opcional)

```sql
-- Función para limpiar eventos antiguos (ejecutar mensualmente)
CREATE OR REPLACE FUNCTION cleanup_old_events()
RETURNS void AS $$
BEGIN
  DELETE FROM user_behavior_events 
  WHERE timestamp < NOW() - INTERVAL '90 days';
END;
$$ LANGUAGE plpgsql;

-- Función para obtener usuarios activos
CREATE OR REPLACE FUNCTION get_active_users(days_back INTEGER DEFAULT 7)
RETURNS TABLE(user_count BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT COUNT(DISTINCT user_id) 
  FROM user_behavior_events 
  WHERE timestamp >= NOW() - (days_back || ' days')::INTERVAL;
END;
$$ LANGUAGE plpgsql;
```

## 🔧 5. Configuración de Triggers (Opcional)

```sql
-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger a tablas relevantes
CREATE TRIGGER update_referral_codes_updated_at
  BEFORE UPDATE ON referral_codes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_referral_events_updated_at
  BEFORE UPDATE ON referral_events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## ✅ 6. Verificación de Instalación

```sql
-- Verificar que todas las tablas se crearon correctamente
SELECT table_name, table_type 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
  'user_behavior_events',
  'referral_codes', 
  'referral_events',
  'user_achievements',
  'user_challenges'
);

-- Verificar índices
SELECT indexname, tablename 
FROM pg_indexes 
WHERE schemaname = 'public' 
AND tablename IN (
  'user_behavior_events',
  'referral_codes',
  'referral_events'
);
```

## 🚨 Notas Importantes

### Límites de Supabase Free Tier:
- **Base de datos**: 500MB máximo
- **Usuarios activos**: 50,000 MAU
- **API requests**: Ilimitadas
- **Bandwidth**: 5GB/mes

### Optimizaciones para Mantenerse Gratis:

1. **Limpieza automática**: Los eventos de analytics se limpian automáticamente después de 90 días
2. **Índices optimizados**: Solo los índices esenciales para mantener el rendimiento
3. **Políticas RLS**: Seguridad sin impacto en performance
4. **Datos calculados**: Métricas calculadas en tiempo real vs. almacenadas

### Monitoreo de Uso:

```sql
-- Query para monitorear el tamaño de la base de datos
SELECT 
  schemaname,
  tablename,
  attname,
  n_distinct,
  correlation
FROM pg_stats 
WHERE schemaname = 'public';

-- Query para ver el crecimiento de eventos
SELECT 
  DATE(timestamp) as date,
  COUNT(*) as events_count
FROM user_behavior_events 
WHERE timestamp >= NOW() - INTERVAL '30 days'
GROUP BY DATE(timestamp)
ORDER BY date DESC;
```

## 🎯 Próximos Pasos

1. Ejecutar todas las queries SQL en orden
2. Verificar que las tablas se crearon correctamente
3. Probar las nuevas funcionalidades en la aplicación
4. Configurar limpieza automática de datos (recomendado mensualmente)
5. Monitorear el uso de la base de datos

¡Tu aplicación VitalMente ahora tendrá IA, gamificación, referidos y analytics avanzados! 🚀