
import AnimatedTestimonialsDemo from "@/components/animated-testimonials-demo";

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="section bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 reveal">What Our Clients Say</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto reveal" style={{transitionDelay: "0.1s"}}>
            Don't just take our word for it. Here's what our satisfied clients have to say about SoftSell.
          </p>
        </div>
        
        <div className="reveal" style={{transitionDelay: "0.2s"}}>
          <AnimatedTestimonialsDemo />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
