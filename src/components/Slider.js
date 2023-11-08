import { useState, useRef } from 'react';
import '../assets/styles/Slider.css'

const Slider = ({ predefinedPositions, onChange }) => {
  const [thumbPosition, setThumbPosition] = useState(0)
  const thumbPositionRef = useRef(thumbPosition)
  const slider = useRef(null)
  const sliderTrack = useRef(null)
  const linearGradient = `linear-gradient(to right, blue ${thumbPosition}%, rgb(209,213,219) ${thumbPosition}%)`

  const handleMousePosition = (e) => {
    e.preventDefault()
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleThumbUp)
  }

  const handleThumbPosition = () => {
    document.addEventListener('touchmove', handleThumbMove, { passive: false })
    document.addEventListener('touchend', handleThumbUp)
  }
  
  const getClosestPosition = (position) => {
    return predefinedPositions.reduce((prev, curr) => (
      Math.abs(curr - position) < Math.abs(prev - position) ? curr : prev
    ))
  }

  const handleMove = (xPosition) => {
    if (slider && slider.current) {
      const sliderCurrent = slider.current
      const sliderWidth = sliderCurrent.offsetWidth
      const newPosition = Math.min(Math.max((xPosition - sliderCurrent.getBoundingClientRect().left) / sliderWidth, 0), 1) * 100
      setThumbPosition(newPosition)
      thumbPositionRef.current = newPosition
    }
  }

  const handleMouseMove = (event) => {
    handleMove(event.clientX)
  }

  const handleThumbMove = (event) => {
    event.preventDefault()
    handleMove(event.touches[0].clientX)
  }

  const handleThumbUp = () => {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleThumbUp)
    document.removeEventListener('touchmove', handleThumbMove)
    document.removeEventListener('touchend', handleThumbUp)
    
    const closestPosition = getClosestPosition(thumbPositionRef.current / 100)
    setThumbPosition(closestPosition * 100)
    const indexPosition = predefinedPositions.indexOf(closestPosition)
    onChange(indexPosition)
  }

  return (
    <div
      ref={slider}
      className="slider"
      style={{ background: linearGradient }}
    >
      <span
        ref={sliderTrack}
        className='slider-track' 
        style={{ left: `calc(${thumbPosition}% - 0.5rem)` }} 
        onMouseDown={handleMousePosition}
        onTouchStart={handleThumbPosition}
      />
      {predefinedPositions.map((position) => (
        <div key={position}>
          <span 
            className='slider-position-label'
            style={{ left: `calc(${position * 100}% - 1rem)` }}
          >{position}</span>
          <span 
            key={position} 
            className='slider-position-track'
            style={{ left: `${position * 100}%` }}
          />
        </div>
      ))}
    </div>
  )
}

export default Slider