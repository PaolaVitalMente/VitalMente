'use client'

import { useState } from 'react'
import { WebcamCapture } from '@/components/webcam-capture'
import { ImageUpload } from '@/components/image-upload'
import { FaceResults } from '@/components/face-results'
import { type FaceDetectionResult } from '@/hooks/use-face-detection'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Scan, Eye, Shield, Zap, Image, Video } from 'lucide-react'

export default function Home() {
  const [detectionResult, setDetectionResult] = useState<FaceDetectionResult | null>(null)
  const [isDetecting, setIsDetecting] = useState(false)

  const handleDetection = (result: FaceDetectionResult) => {
    setIsDetecting(false)
    setDetectionResult(result)
  }

  return (
    <main className='min-h-screen bg-background text-foreground'>
      {/* Header */}
      <header className='border-b border-border/50 bg-card/80 backdrop-blur-md sticky top-0 z-50'>
        <div className='max-w-7xl mx-auto px-4 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 rounded-xl bg-primary flex items-center justify-center'>
                <Scan className='w-5 h-5 text-primary-foreground' />
              </div>
              <div>
                <h1 className='text-xl font-bold tracking-tight'>FaceDetect</h1>
                <p className='text-xs text-muted-foreground'>
                  Biometría con IA
                </p>
              </div>
            </div>
            <div className='hidden sm:flex items-center gap-2 text-xs text-muted-foreground'>
              <span className='flex items-center gap-1'>
                <Shield className='w-3 h-3' />
                100% Local
              </span>
              <span className='w-1 h-1 rounded-full bg-muted-foreground' />
              <span>Sin servidor</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className='border-b border-border/30 bg-gradient-to-b from-card/50 to-background'>
        <div className='max-w-7xl mx-auto px-4 py-10 text-center'>
          <h2 className='text-3xl sm:text-4xl font-bold tracking-tight text-balance'>
            Detección y Análisis Facial
          </h2>
          <p className='mt-3 text-muted-foreground max-w-xl mx-auto text-pretty'>
            Detecta rostros, estima edad, género y analiza expresiones faciales en tiempo real
            usando inteligencia artificial directamente en tu navegador.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-5 gap-8'>
          {/* Input Section */}
          <div className='lg:col-span-3'>
            <Tabs defaultValue='upload' className='w-full'>
              <TabsList className='grid w-full grid-cols-2 h-12 bg-secondary/50 border border-border/50 p-1'>
                <TabsTrigger
                  value='upload'
                  className='data-[state=active]:bg-background data-[state=active]:shadow-sm gap-2'
                >
                  <Image className='w-4 h-4' />
                  Subir Imagen
                </TabsTrigger>
                <TabsTrigger
                  value='camera'
                  className='data-[state=active]:bg-background data-[state=active]:shadow-sm gap-2'
                >
                  <Video className='w-4 h-4' />
                  Cámara en Vivo
                </TabsTrigger>
              </TabsList>

              <TabsContent value='upload' className='mt-6'>
                <ImageUpload
                  onDetection={handleDetection}
                  isDetecting={isDetecting}
                />
              </TabsContent>

              <TabsContent value='camera' className='mt-6'>
                <WebcamCapture
                  onDetection={handleDetection}
                  isDetecting={isDetecting}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Results Section */}
          <div className='lg:col-span-2'>
            <div className='sticky top-24'>
              <FaceResults result={detectionResult} />
            </div>
          </div>
        </div>

        {/* Features */}
        <div className='mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4'>
          <div className='group bg-card/50 border border-border/50 rounded-xl p-5 hover:border-primary/30 transition-colors'>
            <div className='w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors'>
              <Eye className='w-5 h-5 text-primary' />
            </div>
            <h3 className='font-semibold text-foreground'>Detección Precisa</h3>
            <p className='text-sm text-muted-foreground mt-1'>
              Algoritmos de deep learning para detectar múltiples rostros con alta precisión
            </p>
          </div>

          <div className='group bg-card/50 border border-border/50 rounded-xl p-5 hover:border-primary/30 transition-colors'>
            <div className='w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors'>
              <Zap className='w-5 h-5 text-primary' />
            </div>
            <h3 className='font-semibold text-foreground'>Análisis Completo</h3>
            <p className='text-sm text-muted-foreground mt-1'>
              Extrae edad estimada, género y 7 tipos de expresiones faciales
            </p>
          </div>

          <div className='group bg-card/50 border border-border/50 rounded-xl p-5 hover:border-primary/30 transition-colors'>
            <div className='w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors'>
              <Shield className='w-5 h-5 text-primary' />
            </div>
            <h3 className='font-semibold text-foreground'>Privacidad Total</h3>
            <p className='text-sm text-muted-foreground mt-1'>
              Todo el procesamiento ocurre en tu dispositivo, sin enviar datos a servidores
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className='border-t border-border/30 mt-12'>
        <div className='max-w-7xl mx-auto px-4 py-6'>
          <p className='text-center text-xs text-muted-foreground'>
            Desarrollado con face-api.js y Next.js. Todos los datos se procesan localmente.
          </p>
        </div>
      </footer>
    </main>
  )
}

