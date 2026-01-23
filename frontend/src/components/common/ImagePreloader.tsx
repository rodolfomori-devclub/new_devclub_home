import { useState, useEffect, ReactNode } from 'react'
import './ImagePreloader.css'

interface ImagePreloaderProps {
  children: ReactNode
}

const CRITICAL_IMAGES = [
  '/figma/hero-background.png',
  '/figma/Group.png',
  '/figma/image 35.png',
  '/figma/image 45.png',
  '/figma/image 38.png',
  '/figma/DevClub3654.png',
]

function ImagePreloader({ children }: ImagePreloaderProps) {
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let loadedCount = 0
    const totalImages = CRITICAL_IMAGES.length

    const preloadImage = (src: string): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image()
        img.onload = () => {
          loadedCount++
          setProgress(Math.round((loadedCount / totalImages) * 100))
          resolve()
        }
        img.onerror = () => {
          loadedCount++
          setProgress(Math.round((loadedCount / totalImages) * 100))
          resolve()
        }
        img.src = src
      })
    }

    Promise.all(CRITICAL_IMAGES.map(preloadImage)).then(() => {
      setImagesLoaded(true)
    })
  }, [])

  if (!imagesLoaded) {
    return (
      <div className="image-preloader">
        <div className="image-preloader__content">
          <img src="/figma/Group.png" alt="DevClub" className="image-preloader__logo" />
          <div className="image-preloader__progress-bar">
            <div
              className="image-preloader__progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="image-preloader__text">Carregando...</span>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

export default ImagePreloader
