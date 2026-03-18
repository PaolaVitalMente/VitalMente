'use client'

import { useRef, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useFaceDetection, type FaceDetectionResult } from '@/hooks/use-face-detection'
import { Video, VideoOff, Loader2, Camera, Download } from 'lucide-react'

interface WebcamCaptureProps {
  onDetection: (result: FaceDetectionResult) => void
  isDetecting: boolean
}

export function WebcamCapture({ onDetection, isDetecting }: WebcamCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [facesCount, setFacesCount] = useState(0)
  const { modelsLoaded, detectFaces } = useFaceDetection()
  const detectionIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const startCamera = async () => {
    setCameraError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: 'user' },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.onloadedmetadata = () => {
          setIsStreaming(true)
          startRealTimeDetection()
        }
      }
    } catch (err) {
      setCameraError('No se pudo acceder a la cámara. Verifica los permisos.')
    }
  }

  const stopCamera = () => {
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current)
      detectionIntervalRef.current = null
    }
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
    setIsStreaming(false)
    setFacesCount(0)
  }

  const startRealTimeDetection = () => {
    if (!modelsLoaded || detectionIntervalRef.current) return

    detectionIntervalRef.current = setInterval(async () => {
      if (videoRef.current && canvasRef.current && modelsLoaded) {
        const result = await detectFaces(videoRef.current)
        onDetection(result)
        setFacesCount(result.totalFaces)
        drawDetections(result)
      }
    }, 300)
  }

  const drawDetections = (result: FaceDetectionResult) => {
    if (!canvasRef.current || !videoRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight

    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)

    result.faces.forEach((face, index) => {
      // Glow effect
      ctx.shadowColor = '#00d4aa'
      ctx.shadowBlur = 12
      ctx.strokeStyle = '#00d4aa'
      ctx.lineWidth = 2
      ctx.strokeRect(face.x, face.y, face.width, face.height)
      ctx.shadowBlur = 0

      // Corner accents
      const cornerLen = Math.min(face.width, face.height) * 0.15
      ctx.lineWidth = 3
      ctx.strokeStyle = '#00ffcc'

      ctx.beginPath()
      ctx.moveTo(face.x, face.y + cornerLen)
      ctx.lineTo(face.x, face.y)
      ctx.lineTo(face.x + cornerLen, face.y)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(face.x + face.width - cornerLen, face.y)
      ctx.lineTo(face.x + face.width, face.y)
      ctx.lineTo(face.x + face.width, face.y + cornerLen)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(face.x, face.y + face.height - cornerLen)
      ctx.lineTo(face.x, face.y + face.height)
      ctx.lineTo(face.x + cornerLen, face.y + face.height)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(face.x + face.width - cornerLen, face.y + face.height)
      ctx.lineTo(face.x + face.width, face.y + face.height)
      ctx.lineTo(face.x + face.width, face.y + face.height - cornerLen)
      ctx.stroke()

      // Label
      const label = `#${index + 1} | ${face.gender === 'male' ? 'M' : 'F'} | ${face.age}`
      ctx.font = 'bold 12px system-ui'
      const textMetrics = ctx.measureText(label)
      const padding = 6
      const labelHeight = 20
      const labelY = face.y - labelHeight - 3

      ctx.fillStyle = 'rgba(0, 212, 170, 0.9)'
      ctx.beginPath()
      ctx.roundRect(face.x, labelY, textMetrics.width + padding * 2, labelHeight, 3)
      ctx.fill()

      ctx.fillStyle = '#0a0f1a'
      ctx.fillText(label, face.x + padding, labelY + 14)
    })
  }

  const captureSnapshot = () => {
    if (!canvasRef.current) return
    const link = document.createElement('a')
    link.download = `facedetect-capture-${Date.now()}.png`
    link.href = canvasRef.current.toDataURL('image/png')
    link.click()
  }

  useEffect(() => {
    return () => {
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current)
      }
      stopCamera()
    }
  }, [])

  return (
    <Card className='p-6 border-border/50'>
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='text-lg font-semibold text-foreground'>Cámara en Vivo</h3>
            <p className='text-sm text-muted-foreground'>
              {isStreaming
                ? `Detectando rostros en tiempo real`
                : 'Activa la cámara para detección automática'}
            </p>
          </div>
          {isStreaming && (
            <div className='flex items-center gap-2'>
              <span className='relative flex h-3 w-3'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75' />
                <span className='relative inline-flex rounded-full h-3 w-3 bg-primary' />
              </span>
              <span className='text-sm font-medium text-primary'>
                {facesCount} {facesCount === 1 ? 'rostro' : 'rostros'}
              </span>
            </div>
          )}
          {!modelsLoaded && (
            <div className='flex items-center gap-2 text-sm text-primary'>
              <Loader2 className='w-4 h-4 animate-spin' />
              Cargando IA...
            </div>
          )}
        </div>

        <div className='relative rounded-lg overflow-hidden bg-secondary/50 border border-border/50'>
          <video
            ref={videoRef}
            className='w-full hidden'
            autoPlay
            playsInline
            muted
          />
          <canvas
            ref={canvasRef}
            className={`w-full ${isStreaming ? 'block' : 'hidden'}`}
          />
          {!isStreaming && (
            <div className='aspect-video flex flex-col items-center justify-center gap-4'>
              <div className='w-20 h-20 rounded-full bg-secondary/80 flex items-center justify-center'>
                <Camera className='w-10 h-10 text-muted-foreground' />
              </div>
              <p className='text-muted-foreground text-center px-4'>
                {cameraError || 'Haz clic en "Iniciar Cámara" para comenzar la detección'}
              </p>
            </div>
          )}

          {isStreaming && (
            <div className='absolute top-3 left-3 flex gap-2'>
              <span className='bg-background/80 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded border border-border/50'>
                EN VIVO
              </span>
            </div>
          )}
        </div>

        <div className='flex gap-2'>
          {!isStreaming ? (
            <Button
              onClick={startCamera}
              disabled={!modelsLoaded || isDetecting}
              className='flex-1'
              size='lg'
            >
              <Video className='w-4 h-4 mr-2' />
              Iniciar Cámara
            </Button>
          ) : (
            <>
              <Button
                onClick={captureSnapshot}
                variant='outline'
                size='lg'
                className='flex-1'
              >
                <Download className='w-4 h-4 mr-2' />
                Capturar
              </Button>
              <Button
                onClick={stopCamera}
                variant='destructive'
                size='lg'
                className='flex-1'
              >
                <VideoOff className='w-4 h-4 mr-2' />
                Detener
              </Button>
            </>
          )}
        </div>
      </div>
    </Card>
  )
}

