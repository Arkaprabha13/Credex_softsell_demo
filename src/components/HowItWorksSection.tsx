
import { useEffect, useRef, useState } from "react";
import { Upload, Search, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

const HowItWorksSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      icon: <Upload className="h-12 w-12 text-white" />,
      title: "Upload License",
      description: "Upload your license to start the process.",
      color: "#9b87f5", // Primary purple
      delay: 0.2
    },
    {
      icon: <Search className="h-12 w-12 text-white" />,
      title: "Get Valuation",
      description: "We assess the value of your license based on current market conditions.",
      color: "#0EA5E9", // Ocean blue
      delay: 0.4
    },
    {
      icon: <DollarSign className="h-12 w-12 text-white" />,
      title: "Receive Payment",
      description: "Once approved, you'll receive payment directly.",
      color: "#F97316", // Bright orange
      delay: 0.6
    }
  ];

  // Puzzle piece SVG path
  const puzzlePath = "M50,0 C55.5,0 55.5,10 60,10 L100,10 C104.5,10 104.5,0 110,0 L110,50 C110,55.5 100,55.5 100,60 L100,100 C100,104.5 110,104.5 110,110 L60,110 C55.5,110 55.5,100 50,100 L10,100 C5.5,100 5.5,110 0,110 L0,60 C0,55.5 10,55.5 10,50 L10,10 C10,5.5 0,5.5 0,0 L50,0 Z";

  return (
    <section id="how-it-works" ref={sectionRef} className="section bg-gray-50 dark:bg-gray-900 py-20">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            How It Works
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Our streamlined process makes selling your unused software licenses simple and efficient.
          </motion.p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-0 relative">
          {/* Connecting Lines */}
          <div className="hidden md:block absolute top-1/2 left-1/4 w-1/2 h-1 bg-gradient-to-r from-[#9b87f5] via-[#0EA5E9] to-[#F97316] transform -translate-y-1/2 rounded-full z-0"></div>
          
          {steps.map((step, index) => (
            <div key={index} className="w-full md:w-1/3 px-4 flex justify-center relative z-10">
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, rotate: -5 }}
                animate={isVisible ? { opacity: 1, x: 0, rotate: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50, rotate: -5 }}
                transition={{ 
                  duration: 0.7, 
                  delay: step.delay,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05, 
                  rotate: 2,
                  transition: { duration: 0.3 } 
                }}
              >
                {/* Puzzle Piece Shape */}
                <svg 
                  width="280" 
                  height="280" 
                  viewBox="0 0 110 110" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="drop-shadow-xl"
                >
                  <path 
                    d={puzzlePath} 
                    fill={step.color}
                    className="transition-all duration-300"
                  />
                </svg>
                
                {/* Content inside puzzle piece */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  {/* Step number */}
                  <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold text-lg" style={{color: step.color}}>
                    {index + 1}
                  </div>
                  
                  {/* Icon */}
                  <div className="w-20 h-20 rounded-full bg-white/30 flex items-center justify-center mb-4">
                    {step.icon}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  
                  {/* Description */}
                  <p className="text-white/90 text-sm">{step.description}</p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
