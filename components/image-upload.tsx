'use client'

import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useFaceDetection, type FaceDetectionResult, type DetectedFace } from '@/hooks/use-face-detection'
import { Upload, Download, X, Loader2 } from 'lucide-react'

interface ImageUploadProps {
  onDetection: (result: FaceDetectionResult) => void
  isDetecting: boolean
}

export function ImageUpload({ onDetection, isDetecting }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string>('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const { modelsLoaded, detectFaces } = useFaceDetection()

  const drawFaceBoxes = (
    canvas: HTMLCanvasElement,
    img: HTMLImageElement,
    faces: DetectedFace[]
  ) => {
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight
    ctx.drawImage(img, 0, 0)

    faces.forEach((face, index) => {
      // Glow effect
      ctx.shadowColor = '#00d4aa'
      ctx.shadowBlur = 15
      ctx.strokeStyle = '#00d4aa'
      ctx.lineWidth = 3
      ctx.strokeRect(face.x, face.y, face.width, face.height)
      ctx.shadowBlur = 0

      // Corner accents
      const cornerLen = Math.min(face.width, face.height) * 0.15
      ctx.lineWidth = 4
      ctx.strokeStyle = '#00ffcc'

      // Top-left
      ctx.beginPath()
      ctx.moveTo(face.x, face.y + cornerLen)
      ctx.lineTo(face.x, face.y)
      ctx.lineTo(face.x + cornerLen, face.y)
      ctx.stroke()

      // Top-right
      ctx.beginPath()
      ctx.moveTo(face.x + face.width - cornerLen, face.y)
      ctx.lineTo(face.x + face.width, face.y)
      ctx.lineTo(face.x + face.width, face.y + cornerLen)
      ctx.stroke()

      // Bottom-left
      ctx.beginPath()
      ctx.moveTo(face.x, face.y + face.height - cornerLen)
      ctx.lineTo(face.x, face.y + face.height)
      ctx.lineTo(face.x + cornerLen, face.y + face.height)
      ctx.stroke()

      // Bottom-right
      ctx.beginPath()
      ctx.moveTo(face.x + face.width - cornerLen, face.y + face.height)
      ctx.lineTo(face.x + face.width, face.y + face.height)
      ctx.lineTo(face.x + face.width, face.y + face.height - cornerLen)
      ctx.stroke()

      // Label background
      const label = `#${index + 1} | ${face.gender === 'male' ? 'M' : 'F'} | ${face.age} años`
      ctx.font = 'bold 14px system-ui'
      const textMetrics = ctx.measureText(label)
      const padding = 8
      const labelHeight = 24
      const labelY = face.y - labelHeight - 4

      ctx.fillStyle = 'rgba(0, 212, 170, 0.95)'
      ctx.beginPath()
      ctx.roundRect(face.x, labelY, textMetrics.width + padding * 2, labelHeight, 4)
      ctx.fill()

      // Label text
      ctx.fillStyle = '#0a0f1a'
      ctx.fillText(label, face.x + padding, labelY + 17)
    })

    setProcessedImage(canvas.toDataURL('image/png'))
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    setIsProcessing(true)
    setProcessedImage(null)

    const reader = new FileReader()
    reader.onload = async (event) => {
      const src = event.target?.result as string
      setPreview(src)

      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = async () => {
        const result = await detectFaces(img)
        onDetection(result)

        if (canvasRef.current && result.faces.length > 0) {
          drawFaceBoxes(canvasRef.current, img, result.faces)
        }
        setIsProcessing(false)
      }
      img.src = src
    }
    reader.readAsDataURL(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      if (file.type.startsWith('image/')) {
        if (inputRef.current) {
          const dataTransfer = new DataTransfer()
          dataTransfer.items.add(file)
          inputRef.current.files = dataTransfer.files
          const event = new Event('change', { bubbles: true })
          inputRef.current.dispatchEvent(event)
        }
      }
    }
  }

  const handleDownload = () => {
    if (!processedImage) return
    const link = document.createElement('a')
    link.download = `facedetect-${fileName}`
    link.href = processedImage
    link.click()
  }

  const handleClear = () => {
    setPreview(null)
    setProcessedImage(null)
    setFileName('')
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <Card className='p-6 border-border/50'>
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='text-lg font-semibold text-foreground'>Subir Imagen</h3>
            <p className='text-sm text-muted-foreground'>
              Sube una foto para analizar y detectar rostros
            </p>
          </div>
          {!modelsLoaded && (
            <div className='flex items-center gap-2 text-sm text-primary'>
              <Loader2 className='w-4 h-4 animate-spin' />
              Cargando IA...
            </div>
          )}
        </div>

        <div
          className={`border-2 border-dashed rounded-lg p-6 cursor-pointer transition-all duration-200 ${
            isDragging
              ? 'border-primary bg-primary/10 scale-[1.02]'
              : 'border-border hover:border-primary/50 hover:bg-secondary/30'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type='file'
            accept='image/*'
            className='hidden'
            onChange={handleFileChange}
            disabled={!modelsLoaded || isDetecting}
          />

          <div className='flex flex-col items-center justify-center gap-3 py-6'>
            <div className='w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center'>
              <Upload className='w-7 h-7 text-primary' />
            </div>
            <div className='text-center'>
              <p className='text-sm font-medium text-foreground'>
                {isDragging ? 'Suelta la imagen aquí' : 'Arrastra y suelta una imagen'}
              </p>
              <p className='text-xs text-muted-foreground mt-1'>
                o haz clic para seleccionar - PNG, JPG, WEBP
              </p>
            </div>
          </div>
        </div>

        {(preview || processedImage) && (
          <div className='space-y-3'>
            <div className='flex items-center justify-between'>
              <p className='text-sm text-muted-foreground truncate flex-1'>
                <span className='text-foreground font-medium'>{fileName}</span>
              </p>
              <div className='flex gap-2'>
                {processedImage && (
                  <Button size='sm' variant='outline' onClick={handleDownload}>
                    <Download className='w-4 h-4 mr-1' />
                    Descargar
                  </Button>
                )}
                <Button size='sm' variant='ghost' onClick={handleClear}>
                  <X className='w-4 h-4' />
                </Button>
              </div>
            </div>
            <div className='relative w-full rounded-lg overflow-hidden bg-secondary/50 border border-border/50'>
              {isProcessing && (
                <div className='absolute inset-0 bg-background/80 flex flex-col items-center justify-center z-10'>
                  <div className='relative'>
                    <div className='w-16 h-16 border-4 border-primary/30 rounded-full' />
                    <div className='absolute top-0 left-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin' />
                  </div>
                  <p className='text-sm text-muted-foreground mt-4'>Analizando rostros...</p>
                </div>
              )}
              <canvas ref={canvasRef} className='hidden' />
              <img
                src={processedImage || preview || ''}
                alt='preview'
                className='w-full h-auto'
              />
            </div>
          </div>
        )}

        <Button
          onClick={() => inputRef.current?.click()}
          disabled={!modelsLoaded || isProcessing}
          className='w-full'
          size='lg'
        >
          {isProcessing ? (
            <>
              <Loader2 className='w-4 h-4 mr-2 animate-spin' />
              Procesando...
            </>
          ) : (
            'Seleccionar Nueva Imagen'
          )}
        </Button>
      </div>
    </Card>
  )
}

