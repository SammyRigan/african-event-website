"use client"

import { CheckCircle, X } from "lucide-react"
import { useState, useEffect } from "react"

interface SuccessToastProps {
  title: string
  description: string
  onClose: () => void
  duration?: number
}

export function SuccessToast({ 
  title, 
  description, 
  onClose, 
  duration = 5000 
}: SuccessToastProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    // Show toast with animation
    const showTimer = setTimeout(() => setIsVisible(true), 100)
    
    // Auto-hide after duration
    const hideTimer = setTimeout(() => {
      setIsClosing(true)
      setTimeout(onClose, 300) // Wait for animation to complete
    }, duration)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [duration, onClose])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(onClose, 300)
  }

  return (
    <div className={`
      fixed top-4 right-4 z-50 max-w-md w-full
      transform transition-all duration-300 ease-in-out
      ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      ${isClosing ? 'translate-x-full opacity-0' : ''}
    `}>
      <div className="
        bg-gradient-to-r from-green-50 to-emerald-50 
        border-2 border-green-200 
        shadow-2xl 
        p-6 
        rounded-none
        relative
        overflow-hidden
      ">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-500"></div>
        <div className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        
        {/* Close button */}
        <button
          onClick={handleClose}
          className="
            absolute top-3 right-3 
            p-1 
            text-green-600 hover:text-green-800 
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2
          "
        >
          <X className="w-4 h-4" />
        </button>

        {/* Content */}
        <div className="flex items-start space-x-4 pr-8">
          {/* Icon */}
          <div className="flex-shrink-0">
            <div className="
              w-10 h-10 
              bg-gradient-to-r from-green-400 to-emerald-500 
              rounded-full 
              flex items-center justify-center
              shadow-lg
            ">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Text content */}
          <div className="flex-1 min-w-0">
            <h3 className="
              text-lg font-bold 
              text-green-900 
              mb-1
            ">
              {title}
            </h3>
            <p className="
              text-sm 
              text-green-700 
              leading-relaxed
            ">
              {description}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-green-100">
          <div 
            className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-300 ease-linear"
            style={{ 
              width: isClosing ? '0%' : '100%',
              transitionDuration: `${duration}ms`
            }}
          />
        </div>
      </div>
    </div>
  )
}

export function ErrorToast({ 
  title, 
  description, 
  onClose, 
  duration = 5000 
}: SuccessToastProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    const showTimer = setTimeout(() => setIsVisible(true), 100)
    
    const hideTimer = setTimeout(() => {
      setIsClosing(true)
      setTimeout(onClose, 300)
    }, duration)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [duration, onClose])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(onClose, 300)
  }

  return (
    <div className={`
      fixed top-4 right-4 z-50 max-w-md w-full
      transform transition-all duration-300 ease-in-out
      ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      ${isClosing ? 'translate-x-full opacity-0' : ''}
    `}>
      <div className="
        bg-gradient-to-r from-red-50 to-pink-50 
        border-2 border-red-200 
        shadow-2xl 
        p-6 
        rounded-none
        relative
        overflow-hidden
      ">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 to-pink-500"></div>
        <div className="absolute top-2 right-2 w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
        
        {/* Close button */}
        <button
          onClick={handleClose}
          className="
            absolute top-3 right-3 
            p-1 
            text-red-600 hover:text-red-800 
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2
          "
        >
          <X className="w-4 h-4" />
        </button>

        {/* Content */}
        <div className="flex items-start space-x-4 pr-8">
          {/* Icon */}
          <div className="flex-shrink-0">
            <div className="
              w-10 h-10 
              bg-gradient-to-r from-red-400 to-pink-500 
              rounded-full 
              flex items-center justify-center
              shadow-lg
            ">
              <X className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Text content */}
          <div className="flex-1 min-w-0">
            <h3 className="
              text-lg font-bold 
              text-red-900 
              mb-1
            ">
              {title}
            </h3>
            <p className="
              text-sm 
              text-red-700 
              leading-relaxed
            ">
              {description}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-red-100">
          <div 
            className="h-full bg-gradient-to-r from-red-400 to-pink-500 transition-all duration-300 ease-linear"
            style={{ 
              width: isClosing ? '0%' : '100%',
              transitionDuration: `${duration}ms`
            }}
          />
        </div>
      </div>
    </div>
  )
}
