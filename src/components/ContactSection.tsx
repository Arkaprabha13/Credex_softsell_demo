
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail, Send, Check, Loader } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormData {
  name: string;
  email: string;
  company: string;
  licenseType: string;
  message: string;
}

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    licenseType: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.reveal');
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('visible');
              }, index * 100);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFocus = (field: string) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, licenseType: value }));
    
    // Clear error
    if (errors.licenseType) {
      setErrors(prev => ({ ...prev, licenseType: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      // Animate error fields
      Object.keys(errors).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
          element.classList.add('error-shake');
          setTimeout(() => {
            element.classList.remove('error-shake');
          }, 500);
        }
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      toast.success("Your message has been sent successfully!");
      
      // Reset form after showing success state
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          name: "",
          email: "",
          company: "",
          licenseType: "",
          message: "",
        });
      }, 2000);
    }, 1500);
  };

  return (
    <section id="contact" ref={sectionRef} className="section">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 reveal">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto reveal">
            Ready to unlock the value of your unused software licenses? Contact us today.
          </p>
        </div>

        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden reveal">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              <motion.div 
                className="lg:col-span-2 bg-primary-600 dark:bg-primary-800 p-8 lg:p-12 text-white flex flex-col justify-between"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div>
                  <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
                  <p className="mb-8 opacity-90">
                    Fill out the form and our team will get back to you within 24 hours.
                  </p>
                  
                  <div className="space-y-6">
                    <motion.div 
                      className="flex items-center gap-4"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Mail className="h-6 w-6" />
                      <span>contact@softsell.com</span>
                    </motion.div>
                  </div>
                </div>
                
                <div className="mt-12 lg:mt-0">
                  <p className="font-bold text-lg">SoftSell</p>
                  <p className="opacity-90">Maximizing Your Software Investment</p>
                </div>
              </motion.div>
              
              <div className="lg:col-span-3 p-8 lg:p-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className={`transition-all duration-200 ${focusedField === 'name' ? 'text-primary-600 dark:text-primary-400' : ''}`}>
                        Name*
                      </Label>
                      <motion.div
                        whileTap={{ scale: 0.995 }}
                        animate={{ 
                          boxShadow: focusedField === 'name' 
                            ? '0 0 0 2px rgba(14, 165, 233, 0.3)' 
                            : '0 0 0 0 rgba(0, 0, 0, 0)' 
                        }}
                      >
                        <Input 
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => handleFocus('name')}
                          onBlur={handleBlur}
                          placeholder="Your name"
                          className={`transition-all duration-200 ${errors.name ? 'border-red-500' : ''} ${focusedField === 'name' ? 'border-primary-400' : ''}`}
                        />
                      </motion.div>
                      <AnimatePresence>
                        {errors.name && (
                          <motion.p 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-sm text-red-500"
                          >
                            {errors.name}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className={`transition-all duration-200 ${focusedField === 'email' ? 'text-primary-600 dark:text-primary-400' : ''}`}>
                        Email*
                      </Label>
                      <motion.div
                        whileTap={{ scale: 0.995 }}
                        animate={{ 
                          boxShadow: focusedField === 'email' 
                            ? '0 0 0 2px rgba(14, 165, 233, 0.3)' 
                            : '0 0 0 0 rgba(0, 0, 0, 0)' 
                        }}
                      >
                        <Input 
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => handleFocus('email')}
                          onBlur={handleBlur}
                          placeholder="Your email"
                          className={`transition-all duration-200 ${errors.email ? 'border-red-500' : ''} ${focusedField === 'email' ? 'border-primary-400' : ''}`}
                        />
                      </motion.div>
                      <AnimatePresence>
                        {errors.email && (
                          <motion.p 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-sm text-red-500"
                          >
                            {errors.email}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="company" className={`transition-all duration-200 ${focusedField === 'company' ? 'text-primary-600 dark:text-primary-400' : ''}`}>
                        Company
                      </Label>
                      <motion.div
                        whileTap={{ scale: 0.995 }}
                        animate={{ 
                          boxShadow: focusedField === 'company' 
                            ? '0 0 0 2px rgba(14, 165, 233, 0.3)' 
                            : '0 0 0 0 rgba(0, 0, 0, 0)' 
                        }}
                      >
                        <Input 
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          onFocus={() => handleFocus('company')}
                          onBlur={handleBlur}
                          placeholder="Your company"
                          className={`transition-all duration-200 ${focusedField === 'company' ? 'border-primary-400' : ''}`}
                        />
                      </motion.div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="licenseType" className={`transition-all duration-200 ${focusedField === 'licenseType' ? 'text-primary-600 dark:text-primary-400' : ''}`}>
                        License Type
                      </Label>
                      <motion.div
                        whileTap={{ scale: 0.995 }}
                        animate={{ 
                          boxShadow: focusedField === 'licenseType' 
                            ? '0 0 0 2px rgba(14, 165, 233, 0.3)' 
                            : '0 0 0 0 rgba(0, 0, 0, 0)' 
                        }}
                      >
                        <Select 
                          value={formData.licenseType} 
                          onValueChange={handleSelectChange}
                          onOpenChange={() => handleFocus('licenseType')}
                        >
                          <SelectTrigger 
                            id="licenseType"
                            className={`transition-all duration-200 ${focusedField === 'licenseType' ? 'border-primary-400' : ''}`}
                          >
                            <SelectValue placeholder="Select license type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="microsoft">Microsoft</SelectItem>
                              <SelectItem value="adobe">Adobe</SelectItem>
                              <SelectItem value="autodesk">Autodesk</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </motion.div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message" className={`transition-all duration-200 ${focusedField === 'message' ? 'text-primary-600 dark:text-primary-400' : ''}`}>
                      Message*
                    </Label>
                    <motion.div
                      whileTap={{ scale: 0.995 }}
                      animate={{ 
                        boxShadow: focusedField === 'message' 
                          ? '0 0 0 2px rgba(14, 165, 233, 0.3)' 
                          : '0 0 0 0 rgba(0, 0, 0, 0)' 
                      }}
                    >
                      <Textarea 
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => handleFocus('message')}
                        onBlur={handleBlur}
                        placeholder="Your message"
                        rows={5}
                        className={`transition-all duration-200 ${errors.message ? 'border-red-500' : ''} ${focusedField === 'message' ? 'border-primary-400' : ''}`}
                      />
                    </motion.div>
                    <AnimatePresence>
                      {errors.message && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-sm text-red-500"
                        >
                          {errors.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: isSubmitting || isSuccess ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting || isSuccess ? 1 : 0.98 }}
                  >
                    <Button 
                      type="submit" 
                      size="lg"
                      disabled={isSubmitting || isSuccess}
                      className="w-full md:w-auto relative"
                    >
                      <AnimatePresence mode="wait">
                        {isSubmitting ? (
                          <motion.div
                            key="submitting"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center"
                          >
                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                            <span>Submitting...</span>
                          </motion.div>
                        ) : isSuccess ? (
                          <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="flex items-center text-green-500"
                          >
                            <Check className="mr-2 h-4 w-4" />
                            <span>Submitted</span>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="submit"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center"
                          >
                            <Send className="mr-2 h-4 w-4" />
                            <span>Submit</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Button>
                  </motion.div>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          50% { transform: translateX(8px); }
          75% { transform: translateX(-4px); }
          100% { transform: translateX(0); }
        }
        
        .error-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default ContactSection;
