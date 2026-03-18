'use client'

import { useEffect, useState, useCallback } from 'react'

export interface DetectedFace {
  x: number
  y: number
  width: number
  height: number
  age?: number
  gender?: string
  genderProbability?: number
  expressions?: {
    neutral: number
    happy: number
    sad: number
    angry: number
    fearful: number
    disgusted: number
    surprised: number
  }
}

export interface FaceDetectionResult {
  faces: DetectedFace[]
  totalFaces: number
  isLoading: boolean
  error: string | null
}

// Singleton state to prevent multiple loads
let faceapi: any = null
let isScriptLoading = false
let isScriptLoaded = false
let areModelsLoaded = false
let loadPromise: Promise<void> | null = null
const subscribers = new Set<() => void>()

function notifySubscribers() {
  subscribers.forEach((callback) => callback())
}

async function loadFaceApi(): Promise<void> {
  if (areModelsLoaded) return
  if (loadPromise) return loadPromise

  loadPromise = new Promise((resolve, reject) => {
    // Check if script is already in the page
    if ((window as any).faceapi) {
      faceapi = (window as any).faceapi
      isScriptLoaded = true
    }

    if (isScriptLoaded && faceapi) {
      // Models might already be loaded
      if (areModelsLoaded) {
        resolve()
        return
      }

      // Load models from unpkg (correct structure for face-api.js)
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(
          'https://unpkg.com/face-api.js@0.22.2/weights'
        ),
        faceapi.nets.faceLandmark68Net.loadFromUri(
          'https://unpkg.com/face-api.js@0.22.2/weights'
        ),
        faceapi.nets.faceRecognitionNet.loadFromUri(
          'https://unpkg.com/face-api.js@0.22.2/weights'
        ),
        faceapi.nets.faceExpressionNet.loadFromUri(
          'https://unpkg.com/face-api.js@0.22.2/weights'
        ),
        faceapi.nets.ageGenderNet.loadFromUri(
          'https://unpkg.com/face-api.js@0.22.2/weights'
        ),
      ])
        .then(() => {
          areModelsLoaded = true
          notifySubscribers()
          resolve()
        })
        .catch(reject)
      return
    }

    if (isScriptLoading) {
      // Wait for existing script to load
      const checkInterval = setInterval(() => {
        if (isScriptLoaded && areModelsLoaded) {
          clearInterval(checkInterval)
          resolve()
        }
      }, 100)
      return
    }

    isScriptLoading = true

    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js'
    script.async = true

    script.onload = async () => {
      faceapi = (window as any).faceapi
      isScriptLoaded = true

      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(
            'https://unpkg.com/face-api.js@0.22.2/weights'
          ),
          faceapi.nets.faceLandmark68Net.loadFromUri(
            'https://unpkg.com/face-api.js@0.22.2/weights'
          ),
          faceapi.nets.faceRecognitionNet.loadFromUri(
            'https://unpkg.com/face-api.js@0.22.2/weights'
          ),
          faceapi.nets.faceExpressionNet.loadFromUri(
            'https://unpkg.com/face-api.js@0.22.2/weights'
          ),
          faceapi.nets.ageGenderNet.loadFromUri(
            'https://unpkg.com/face-api.js@0.22.2/weights'
          ),
        ])
        areModelsLoaded = true
        notifySubscribers()
        resolve()
      } catch (err) {
        reject(err)
      }
    }

    script.onerror = () => {
      isScriptLoading = false
      reject(new Error('Error cargando la librería face-api.js'))
    }

    document.body.appendChild(script)
  })

  return loadPromise
}

export function useFaceDetection() {
  const [modelsLoaded, setModelsLoaded] = useState(areModelsLoaded)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Subscribe to state changes
    const updateState = () => {
      setModelsLoaded(areModelsLoaded)
    }
    subscribers.add(updateState)

    // If already loaded, just update state
    if (areModelsLoaded) {
      setModelsLoaded(true)
      return () => {
        subscribers.delete(updateState)
      }
    }

    // Start loading
    loadFaceApi().catch((err) => {
      setError(err instanceof Error ? err.message : 'Error desconocido al cargar modelos')
    })

    return () => {
      subscribers.delete(updateState)
    }
  }, [])

  const detectFaces = useCallback(async (input: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement): Promise<FaceDetectionResult> => {
    if (!areModelsLoaded || !faceapi) {
      return {
        faces: [],
        totalFaces: 0,
        isLoading: false,
        error: 'Los modelos aún se están cargando',
      }
    }

    try {
      const detections = await faceapi
        .detectAllFaces(input, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions()
        .withAgeAndGender()

      const faces: DetectedFace[] = detections.map(
        (detection: any) => ({
          x: Math.round(detection.detection.box.x),
          y: Math.round(detection.detection.box.y),
          width: Math.round(detection.detection.box.width),
          height: Math.round(detection.detection.box.height),
          age: Math.round(detection.age),
          gender: detection.gender,
          genderProbability: parseFloat(detection.genderProbability.toFixed(2)),
          expressions: detection.expressions,
        })
      )

      return {
        faces,
        totalFaces: faces.length,
        isLoading: false,
        error: null,
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error detectando rostros'
      return {
        faces: [],
        totalFaces: 0,
        isLoading: false,
        error: errorMessage,
      }
    }
  }, [])

  return {
    modelsLoaded,
    error,
    detectFaces,
  }
}
