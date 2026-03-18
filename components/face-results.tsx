'use client'

import { type FaceDetectionResult, type DetectedFace } from '@/hooks/use-face-detection'
import { Card } from '@/components/ui/card'
import {
  AlertCircle,
  User,
  Smile,
  Frown,
  Angry,
  Meh,
  Heart,
  Zap,
  Search,
} from 'lucide-react'

interface FaceResultsProps {
  result: FaceDetectionResult | null
}

const expressionLabels: Record<string, { label: string; icon: React.ReactNode }> = {
  neutral: { label: 'Neutral', icon: <Meh className='w-3 h-3' /> },
  happy: { label: 'Feliz', icon: <Smile className='w-3 h-3' /> },
  sad: { label: 'Triste', icon: <Frown className='w-3 h-3' /> },
  angry: { label: 'Enojado', icon: <Angry className='w-3 h-3' /> },
  fearful: { label: 'Asustado', icon: <Zap className='w-3 h-3' /> },
  disgusted: { label: 'Disgustado', icon: <Frown className='w-3 h-3' /> },
  surprised: { label: 'Sorprendido', icon: <Heart className='w-3 h-3' /> },
}

function getDominantExpression(expressions: DetectedFace['expressions']) {
  if (!expressions) return null
  const entries = Object.entries(expressions)
  const sorted = entries.sort((a, b) => b[1] - a[1])
  return sorted[0]
}

export function FaceResults({ result }: FaceResultsProps) {
  if (!result) {
    return (
      <Card className='p-6 border-border/50'>
        <div className='flex flex-col items-center justify-center py-12 text-center gap-4'>
          <div className='w-16 h-16 rounded-full bg-secondary/80 flex items-center justify-center'>
            <Search className='w-8 h-8 text-muted-foreground' />
          </div>
          <div>
            <p className='font-medium text-foreground'>Sin análisis</p>
            <p className='text-sm text-muted-foreground mt-1'>
              Sube una imagen o usa la cámara para comenzar
            </p>
          </div>
        </div>
      </Card>
    )
  }

  if (result.error) {
    return (
      <Card className='p-6 border-destructive/30 bg-destructive/5'>
        <div className='flex items-start gap-3'>
          <div className='w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0'>
            <AlertCircle className='w-5 h-5 text-destructive' />
          </div>
          <div>
            <p className='font-medium text-destructive'>Error de detección</p>
            <p className='text-sm text-destructive/80 mt-1'>{result.error}</p>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className='p-6 border-border/50'>
      <div className='space-y-4'>
        {/* Header */}
        <div className='flex items-center justify-between pb-3 border-b border-border/50'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center'>
              <User className='w-5 h-5 text-primary' />
            </div>
            <div>
              <h3 className='font-semibold text-foreground'>Análisis Facial</h3>
              <p className='text-xs text-muted-foreground'>
                {result.totalFaces} {result.totalFaces === 1 ? 'rostro detectado' : 'rostros detectados'}
              </p>
            </div>
          </div>
          {result.totalFaces > 0 && (
            <span className='text-2xl font-bold text-primary'>{result.totalFaces}</span>
          )}
        </div>

        {result.totalFaces === 0 ? (
          <div className='py-8 text-center'>
            <p className='text-muted-foreground'>No se detectaron rostros</p>
            <p className='text-xs text-muted-foreground mt-1'>
              Intenta con otra imagen o mejor iluminación
            </p>
          </div>
        ) : (
          <div className='space-y-4 max-h-[60vh] overflow-y-auto pr-1'>
            {result.faces.map((face, index) => {
              const dominant = getDominantExpression(face.expressions)

              return (
                <div
                  key={index}
                  className='bg-secondary/30 rounded-xl p-4 border border-border/30'
                >
                  {/* Face Header */}
                  <div className='flex items-center justify-between mb-4'>
                    <div className='flex items-center gap-2'>
                      <span className='w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold'>
                        {index + 1}
                      </span>
                      <span className='font-medium text-foreground'>
                        {face.gender === 'male' ? 'Hombre' : 'Mujer'}
                      </span>
                    </div>
                    <span className='text-xl font-bold text-foreground'>
                      {face.age} <span className='text-sm font-normal text-muted-foreground'>años</span>
                    </span>
                  </div>

                  {/* Stats Grid */}
                  <div className='grid grid-cols-2 gap-2 mb-4'>
                    <div className='bg-background/50 rounded-lg p-2.5'>
                      <p className='text-xs text-muted-foreground'>Confianza género</p>
                      <p className='font-semibold text-foreground'>
                        {Math.round((face.genderProbability || 0) * 100)}%
                      </p>
                    </div>
                    <div className='bg-background/50 rounded-lg p-2.5'>
                      <p className='text-xs text-muted-foreground'>Posición</p>
                      <p className='font-semibold text-foreground text-xs'>
                        {face.x}, {face.y}
                      </p>
                    </div>
                  </div>

                  {/* Dominant Expression */}
                  {dominant && (
                    <div className='bg-primary/10 rounded-lg p-3 mb-4'>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                          {expressionLabels[dominant[0]]?.icon}
                          <span className='text-sm font-medium text-foreground'>
                            {expressionLabels[dominant[0]]?.label || dominant[0]}
                          </span>
                        </div>
                        <span className='text-sm font-bold text-primary'>
                          {Math.round(dominant[1] * 100)}%
                        </span>
                      </div>
                    </div>
                  )}

                  {/* All Expressions */}
                  {face.expressions && (
                    <div className='space-y-2'>
                      <p className='text-xs font-medium text-muted-foreground uppercase tracking-wide'>
                        Todas las expresiones
                      </p>
                      <div className='space-y-1.5'>
                        {Object.entries(face.expressions)
                          .sort((a, b) => b[1] - a[1])
                          .map(([emotion, probability]) => (
                            <div key={emotion} className='flex items-center gap-2'>
                              <span className='text-muted-foreground'>
                                {expressionLabels[emotion]?.icon}
                              </span>
                              <span className='w-16 text-xs text-muted-foreground'>
                                {expressionLabels[emotion]?.label || emotion}
                              </span>
                              <div className='flex-1 h-1.5 bg-secondary rounded-full overflow-hidden'>
                                <div
                                  className='h-full bg-primary transition-all duration-300'
                                  style={{ width: `${Math.round(probability * 100)}%` }}
                                />
                              </div>
                              <span className='w-8 text-right text-xs font-medium text-foreground'>
                                {Math.round(probability * 100)}%
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </Card>
  )
}

