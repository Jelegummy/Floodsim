'use client'

import { useEffect, useRef, useState } from 'react'

const WaterWave = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const animationRef = useRef<number>(0)
  const mousePos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!

    const updateDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight / 2
      const dpr = window.devicePixelRatio || 1
      canvas.style.width = `${canvas.width}px`
      canvas.style.height = `${canvas.height}px`
      canvas.width = canvas.width * dpr
      canvas.height = canvas.height * dpr
      ctx.scale(dpr, dpr)
    }

    updateDimensions()

    const waves = [
      {
        amplitude: 25,
        frequency: 0.005,
        phase: 0,
        speed: 0.015,
        color: 'rgba(32, 156, 238, 0.3)',
        y: canvas.height / 2 - 50,
      },
      {
        amplitude: 20,
        frequency: 0.008,
        phase: Math.PI / 2,
        speed: 0.02,
        color: 'rgba(65, 182, 230, 0.4)',
        y: canvas.height / 2 - 20,
      },
      {
        amplitude: 15,
        frequency: 0.012,
        phase: Math.PI,
        speed: 0.025,
        color: 'rgba(91, 192, 235, 0.5)',
        y: canvas.height / 2,
      },
      {
        amplitude: 30,
        frequency: 0.006,
        phase: Math.PI / 4,
        speed: 0.018,
        color: 'rgba(118, 201, 233, 0.6)',
        y: canvas.height / 2 + 30,
      },
      {
        amplitude: 22,
        frequency: 0.01,
        phase: Math.PI / 3,
        speed: 0.022,
        color: 'rgba(142, 209, 232, 0.7)',
        y: canvas.height / 2 + 60,
      },
    ]

    const createGradient = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, '#001e3c')
      gradient.addColorStop(1, '#03254c')
      return gradient
    }

    const drawWave = (wave: (typeof waves)[0], time: number) => {
      ctx.beginPath()

      ctx.moveTo(0, wave.y)

      const interactiveAmplitude = isHovering
        ? wave.amplitude * 1.3
        : wave.amplitude
      const interactiveFrequency = isHovering
        ? wave.frequency * 1.1
        : wave.frequency

      for (let x = 0; x < canvas.width; x++) {
        const distanceFromMouse = Math.abs(x - mousePos.current.x)
        const mouseInfluence = isHovering
          ? Math.max(0, 1 - distanceFromMouse / 200) * 15
          : 0

        const y =
          wave.y +
          interactiveAmplitude *
            Math.sin(x * interactiveFrequency + wave.phase + time) +
          mouseInfluence * Math.sin(x * 0.02 + time * 2)

        ctx.lineTo(x, y)
      }

      ctx.lineTo(canvas.width, canvas.height)
      ctx.lineTo(0, canvas.height)
      ctx.closePath()

      ctx.fillStyle = wave.color
      ctx.fill()

      ctx.beginPath()
      ctx.moveTo(0, wave.y)

      for (let x = 0; x < canvas.width; x++) {
        const distanceFromMouse = Math.abs(x - mousePos.current.x)
        const mouseInfluence = isHovering
          ? Math.max(0, 1 - distanceFromMouse / 200) * 15
          : 0

        const y =
          wave.y +
          interactiveAmplitude *
            Math.sin(x * interactiveFrequency + wave.phase + time) +
          mouseInfluence * Math.sin(x * 0.02 + time * 2)

        ctx.lineTo(x, y)
      }

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
      ctx.lineWidth = 2
      ctx.stroke()
    }

    const animate = () => {
      const time = performance.now() * 0.001

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = createGradient()
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < 50; i++) {
        const x =
          (Math.sin(time * 0.1 + i) * canvas.width) / 2 + canvas.width / 2
        const y =
          (Math.cos(time * 0.1 + i * 0.7) * canvas.height) / 3 +
          canvas.height / 3
        const size = Math.sin(time + i) * 1 + 2

        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${0.1 + Math.sin(time + i) * 0.05})`
        ctx.fill()
      }

      for (let i = 0; i < waves.length; i++) {
        const wave = waves[i]
        wave.phase += wave.speed
        drawWave(wave, time)
      }

      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      updateDimensions()
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const handleMouseEnter = () => {
      setIsHovering(true)
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
    }

    window.addEventListener('resize', handleResize)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseenter', handleMouseEnter)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('resize', handleResize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseenter', handleMouseEnter)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationRef.current)
    }
  }, [isHovering])

  return (
    <div className="relative h-full w-full overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute left-0 top-0 z-0 min-h-screen w-screen"
      />
    </div>
  )
}

export default WaterWave
