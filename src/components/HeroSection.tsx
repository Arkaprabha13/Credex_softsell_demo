
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import GlobeDemo from "@/components/globe-demo";
import Ribbons from "@/components/ui/Ribbons";
import VariableProximity from "@/components/ui/VariableProximity";
import FloatingIcons from "@/components/ui/FloatingIcons";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, 100);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (heroRef.current) {
      const elements = heroRef.current.querySelectorAll('.reveal');
      elements.forEach(element => observer.observe(element));
    }
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <section ref={heroRef} className="pt-21 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
  <div className="order-2 lg:order-1 flex flex-col items-start">
    <div className="absolute inset-0 z-0 pointer-events-none">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none" className="w-full h-full">
        <circle
          cx="-55"
          cy="100"
          r="50"
          fill="#f97316"
          opacity="0.3"
          className="transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:opacity-70 hover:fill-orange-500"
        />
        <circle
          cx="55"
          cy="160"
          r="50"
          fill="#38bdf8"
          opacity="0.3"
          className="transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:opacity-70 hover:fill-cyan-500"
        />
      </svg>
    </div>
  
      
<h1 
            ref={titleContainerRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 reveal"
            style={{ position: 'relative' }}
          >
            
            <VariableProximity
              label="Maximize the Value of Your"
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 1000, 'opsz' 40"
              containerRef={titleContainerRef}
              radius={100}
              falloff="linear"
              className="block"
            />
            <span className="text-primary-600 dark:text-primary-400 block">
              <VariableProximity
                label="Software Licenses"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={titleContainerRef}
                radius={100}
                falloff="linear"
              />
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 reveal" style={{transitionDelay: "0.1s"}}>
            Sell your unused software licenses in a few simple steps and get paid fast.
          </p>
          
          <Button size="lg" className="text-md px-8 py-6 reveal" style={{transitionDelay: "0.2s"}} asChild>
            <a href="#contact">Get a Quote</a>
          </Button>
        </div>
        
        <div className="order-1 lg:order-2 reveal h-[400px] md:h-[600px] w-full" style={{transitionDelay: "0.3s"}}>
          <div className="relative w-full h-full">
            <Ribbons
              baseThickness={30}
              colors={['#0ea5e9', '#38bdf8', '#7dd3fc']}
              speedMultiplier={0.5}
              maxAge={500}
              enableFade={true}
              enableShaderEffect={true}
              effectAmplitude={2}
            />
            <div className="absolute inset-0 z-10">
              <GlobeDemo />
            </div>
            <FloatingIcons count={15} className="z-20" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
