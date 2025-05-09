import React from "react";
import {
  Computer,
  DollarSign,
  Lock,
  Cloud,
  File,
  RefreshCcw,
  Check
} from "lucide-react"; // Importing icons from lucide-react

import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";
import IconLoader from "./IconLoader"; // Assuming you have this component

// Mapping of icon names to actual icon components
const iconMap = {
  Computer: <Computer />,
  DollarSign: <DollarSign />,
  Lock: <Lock />,
  Cloud: <Cloud />,
  File: <File />,
  RefreshCcw: <RefreshCcw />,
  Check: <Check />,
};

export default function DraggableCardsSection() {
  const items = [
    {
      title: "Expert Valuation",
      description: "Our team of experts provide accurate and fair valuation for your software licenses.",
      className: "absolute top-10 left-[20%] rotate-[-5deg]",
      icon: "Computer", // Icon string to map
    },
    {
      title: "Fast Payments",
      description: "Get paid within 48 hours after your license valuation is approved.",
      className: "absolute top-40 left-[25%] rotate-[-7deg]",
      icon: "DollarSign",
    },
    {
      title: "Secure Transactions",
      description: "End-to-end encryption and secure payment processing for all transactions.",
      className: "absolute top-5 left-[40%] rotate-[8deg]",
      icon: "Lock",
    },
    {
      title: "Global Marketplace",
      description: "Connect with buyers and sellers from around the world to maximize value.",
      className: "absolute top-32 left-[55%] rotate-[10deg]",
      icon: "Cloud",
    },
    {
      title: "License Verification",
      description: "We verify all licenses to ensure authenticity and proper transfer.",
      className: "absolute top-20 right-[35%] rotate-[2deg]",
      icon: "File",
    },
    {
      title: "Professional Support",
      description: "Our team is available to assist you through the entire process.",
      className: "absolute top-24 left-[45%] rotate-[-7deg]",
      icon: "RefreshCcw",
    },
    {
      title: "Competitive Rates",
      description: "Maximize your ROI with our industry-leading commission rates.",
      className: "absolute top-8 left-[30%] rotate-[4deg]",
      icon: "DollarSign",
    },
    {
      title: "Zero Upfront Fees",
      description: "No fees until your license is successfully sold and payment is received.",
      className: "absolute top-16 left-[18%] rotate-[6deg]",
      icon: "Check",
    },
    {
      title: "Compliance Guaranteed",
      description: "We ensure all transactions comply with licensing regulations and requirements.",
      className: "absolute top-36 right-[25%] rotate-[-3deg]",
      icon: "Lock",
    },
    {
      title: "Seamless Process",
      description: "Our streamlined process makes selling your unused licenses simple and efficient.",
      className: "absolute top-28 right-[40%] rotate-[5deg]",
      icon: "RefreshCcw",
    },
  ];

  return (
    <section id="draggable-cards" className="section bg-gray-50 dark:bg-gray-900 py-20">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#F97D16] reveal"> {/* Indian-inspired color */}
            Why Choose SoftSell?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto reveal">
            Drag the cards to explore the top 10 reasons businesses trust SoftSell for their software license transactions.
          </p>
        </div>

        <DraggableCardContainer className="relative flex min-h-[700px] md:min-h-[600px] w-full items-center justify-center overflow-clip">
          <p className="absolute top-1/2 mx-auto max-w-sm -translate-y-3/4 text-center text-2xl font-black text-neutral-400 md:text-4xl dark:text-neutral-800">
            Interactive Experience
          </p>
          {items.map((item, index) => (
            <DraggableCardBody
              key={index}
              // className={`bg-gradient-to-r from-[#ffbb33] to-[#f78f1e] text-white rounded-xl shadow-lg p-6 transform transition-all hover:scale-105 ${item.className}`}
            className={`bg-gradient-to-r from-[#3fbee9] to-[#0a5bf3] text-white rounded-xl shadow-lg p-6 transform transition-all hover:scale-105 ${item.className}`}

>
              <div className="flex flex-col items-center justify-center h-full">
                {/* Dynamically rendering the icon based on the 'icon' string */}
                <div className="icon-container mb-4 p-4 rounded-full bg-[#f7c8a2] shadow-md">
                  {iconMap[item.icon]} {/* Rendering the correct icon */}
                </div>

                <h3 className="mt-6 text-center text-xl font-bold text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-center text-neutral-200">
                  {item.description}
                </p>
              </div>
            </DraggableCardBody>
          ))}
        </DraggableCardContainer>
      </div>
    </section>
  );
}
