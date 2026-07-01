import { useState, useRef, useEffect } from 'react';

interface Props {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
}

export default function BeforeAfterSlider({ 
  beforeImage, 
  afterImage, 
  beforeAlt = "Before", 
  afterAlt = "After" 
}: Props) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', () => setIsDragging(false));
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', () => setIsDragging(false));
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', () => setIsDragging(false));
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', () => setIsDragging(false));
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-2xl cursor-ew-resize select-none aspect-video bg-slate-200"
      onMouseDown={(e) => {
        setIsDragging(true);
        handleMove(e.clientX);
      }}
      onTouchStart={(e) => {
        setIsDragging(true);
        handleMove(e.touches[0].clientX);
      }}
    >
      {/* Background (After) Image */}
      <img 
        src={afterImage} 
        alt={afterAlt} 
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />
      
      {/* Foreground (Before) Image container */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img 
          src={beforeImage} 
          alt={beforeAlt} 
          className="absolute inset-0 w-full h-full object-cover max-w-none"
          style={{ width: containerRef.current ? containerRef.current.offsetWidth : '100vw' }}
          draggable={false}
        />
      </div>

      {/* Slider handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_10px_rgba(0,0,0,0.5)] z-10"
        style={{ left: `calc(${sliderPosition}% - 2px)` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border border-slate-200">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-primary-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" className="rotate-90 origin-center" />
          </svg>
        </div>
      </div>
      
      {/* Labels */}
      <div className="absolute top-4 left-4 bg-slate-900/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium z-0">
        Before
      </div>
      <div className="absolute top-4 right-4 bg-primary-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium z-0">
        After
      </div>
    </div>
  );
}
