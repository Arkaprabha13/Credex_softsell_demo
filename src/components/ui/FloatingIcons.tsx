import { useState, useEffect, useRef } from 'react';
import { 
  Star, 
  Triangle, 
  Square, 
  Circle, 
  CircleDot 
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Icon {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  component: JSX.Element;
  color: string;
}

interface FloatingIconsProps {
  count?: number;
  className?: string;
}

const FloatingIcons: React.FC<FloatingIconsProps> = ({ 
  count = 10, 
  className = '' 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [icons, setIcons] = useState<Icon[]>([]);
  const [mousePosition, setMousePosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const animationFrameId = useRef<number | null>(null);

  // Generate initial icons
  useEffect(() => {
    const iconComponents = [
      <Star />, 
      <Triangle />, 
      <Square />, 
      <Circle />, 
      <CircleDot />
    ];
    
    const colors = [
      '#9b87f5', // Primary purple
      '#0EA5E9', // Ocean blue
      '#F97316', // Bright orange
      '#D6BCFA', // Light purple
      '#7dd3fc', // Soft blue
    ];

    const initialIcons: Icon[] = Array.from({ length: count }).map((_, index) => ({
      id: index,
      x: Math.random() * window.innerWidth, // Use window size for full screen width
      y: Math.random() * window.innerHeight, // Use window size for full screen height
      size: 16 + Math.random() * 24,
      rotation: Math.random() * 360,
      component: iconComponents[Math.floor(Math.random() * iconComponents.length)],
      color: colors[Math.floor(Math.random() * colors.length)]
    }));

    setIcons(initialIcons);
  }, [count]);

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  // Animate icons away from mouse pointer
  useEffect(() => {
    const repelStrength = 100; // How strongly icons are pushed away
    const moveSpeed = 0.5; // How fast icons move
    const edgeBounce = 20; // Bounce when reaching edges
    
    const animate = () => {
      setIcons(prevIcons => 
        prevIcons.map(icon => {
          // Calculate distance from mouse
          const dx = icon.x - mousePosition.x;
          const dy = icon.y - mousePosition.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Calculate repel force (stronger when closer)
          const force = distance > 0 ? Math.min(repelStrength / (distance * distance), 10) : 0;
          
          // Calculate new position with repel force
          let newX = icon.x + (dx / distance) * force * moveSpeed;
          let newY = icon.y + (dy / distance) * force * moveSpeed;
          let newRotation = icon.rotation + 0.1; // Slow rotation
          
          // Bounce from edges if they go out of view
          if (newX < edgeBounce) {
            newX = edgeBounce;
          } else if (newX > window.innerWidth - edgeBounce) {
            newX = window.innerWidth - edgeBounce;
          }
          
          if (newY < edgeBounce) {
            newY = edgeBounce;
          } else if (newY > window.innerHeight - edgeBounce) {
            newY = window.innerHeight - edgeBounce;
          }
          
          return {
            ...icon,
            x: newX,
            y: newY,
            rotation: newRotation
          };
        })
      );
      
      animationFrameId.current = requestAnimationFrame(animate);
    };
    
    animationFrameId.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [mousePosition]);

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ zIndex: 1000 }} // Ensure it's always on top
    >
      {icons.map(icon => (
        <motion.div
          key={icon.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'absolute',
            left: `${icon.x}px`,
            top: `${icon.y}px`,
            width: `${icon.size}px`,
            height: `${icon.size}px`,
            transform: `rotate(${icon.rotation}deg)`,
            color: icon.color,
            opacity: 0.7,
          }}
        >
          {icon.component}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingIcons;
