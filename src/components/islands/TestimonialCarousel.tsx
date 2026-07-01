import { useState, useEffect } from 'react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}

interface Props {
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({ testimonials }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance
  useEffect(() => {
    if (testimonials.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="relative overflow-hidden bg-primary-900 px-6 lg:px-8 min-h-[80vh] flex items-center justify-center">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_center,theme(colors.primary.800),theme(colors.primary.950))] opacity-80"></div>
      
      <div className="mx-auto max-w-7xl relative w-full">
        {/* Navigation Arrows */}
        {testimonials.length > 1 && (
          <>
            <button 
              onClick={handlePrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all focus:outline-none"
              aria-label="Previous testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button 
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all focus:outline-none"
              aria-label="Next testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </>
        )}

        <div className="mx-auto max-w-3xl lg:max-w-5xl relative min-h-[400px] flex items-center justify-center px-12 sm:px-20">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className={`absolute w-full transition-all duration-700 ease-in-out ${
                index === currentIndex 
                  ? 'opacity-100 scale-100 z-10' 
                  : 'opacity-0 scale-95 z-0 pointer-events-none'
              }`}
            >
              <figure className="text-center">
                <div className="flex justify-center mb-8">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`h-8 w-8 ${i < testimonial.rating ? 'text-yellow-400' : 'text-slate-600'}`} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-2xl font-medium leading-10 text-white sm:text-4xl sm:leading-snug">
                  <p>"{testimonial.content}"</p>
                </blockquote>
                <figcaption className="mt-10">
                  <div className="mt-4 flex flex-col items-center justify-center space-y-2">
                    <div className="font-semibold text-lg text-primary-400">{testimonial.name}</div>
                    <div className="text-sm text-slate-400">{testimonial.role}</div>
                  </div>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
        
        {/* Pagination Dots */}
        {testimonials.length > 1 && (
          <div className="flex justify-center mt-12 gap-3 z-20 relative">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-primary-500 w-8' : 'bg-slate-600 hover:bg-slate-500'}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
