
import { useEffect, useRef } from "react";
import DraggableCardsSection from "@/components/DraggableCardsSection";
import IconLoader from "@/components/IconLoader";
import { motion } from "motion/react";

const WhyChooseUsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.reveal');
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('visible');
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <section id="why-choose-us" ref={sectionRef} className="section">
      <div className="container-custom">
       

        <DraggableCardsSection />
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
