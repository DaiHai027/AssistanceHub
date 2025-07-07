import React, { useState } from 'react';
import { Search, MapPin, Phone, CheckCircle, ArrowRight, Play, Sparkles, Star, Zap, Shield, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const GettingStartedSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const steps = [
    {
      id: 1,
      title: "Search Your Area",
      description: "Enter your city, state, or ZIP code to find housing authorities and SNAP offices near you",
      icon: Search,
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
      features: ["Real-time search results", "Location-based filtering", "Comprehensive database"],
      tip: "Pro tip: Use your ZIP code for the most accurate results"
    },
    {
      id: 2,
      title: "Browse Resources",
      description: "View detailed information about housing authorities, waitlist status, and available programs",
      icon: MapPin,
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50",
      features: ["Interactive maps", "Detailed listings", "Contact information"],
      tip: "Check waitlist status to save time on your applications"
    },
    {
      id: 3,
      title: "Connect & Apply",
      description: "Contact housing authorities directly with provided phone numbers and application guidance",
      icon: Phone,
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50",
      features: ["Direct contact info", "Application guidance", "Office hours"],
      tip: "Call during business hours for fastest response times"
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get results in seconds",
      color: "from-yellow-400 to-orange-400"
    },
    {
      icon: Shield,
      title: "100% Free",
      description: "No hidden fees or charges",
      color: "from-blue-400 to-cyan-400"
    },
    {
      icon: Users,
      title: "Trusted Platform",
      description: "Used by 100k+ families",
      color: "from-purple-400 to-pink-400"
    },
    {
      icon: Clock,
      title: "24/7 Access",
      description: "Search anytime, anywhere",
      color: "from-green-400 to-emerald-400"
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      location: "California",
      quote: "Found my perfect apartment in just 2 days! The search was so easy and the information was accurate.",
      rating: 5
    },
    {
      name: "Michael R.",
      location: "Texas",
      quote: "AssistanceHub helped me navigate the complex process. The guidance was invaluable.",
      rating: 5
    },
    {
      name: "Jennifer L.",
      location: "New York",
      quote: "Quick, reliable, and completely free. Exactly what I needed during a difficult time.",
      rating: 5
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-slate-100 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-r from-green-200/30 to-emerald-200/30 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-pink-200/20 to-orange-200/20 rounded-full blur-3xl animate-pulse delay-1000 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg">
            <Play className="w-4 h-4 text-green-500 animate-pulse" />
            <span>Simple Process</span>
            <Sparkles className="w-4 h-4 text-purple-500 animate-pulse" />
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800">
              Getting Started
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              Is This Easy
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Follow our simple 3-step process to find the housing assistance you need. 
            <span className="font-semibold text-blue-600"> No paperwork, no fees</span> - just results.
          </p>
        </div>

        {/* Steps Section */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <Card
                key={step.id}
                className={`group relative overflow-hidden border-0 shadow-2xl hover:shadow-4xl transition-all duration-500 transform hover:scale-105 cursor-pointer bg-gradient-to-br ${step.bgColor}`}
                onMouseEnter={() => setActiveStep(index)}
                onMouseLeave={() => setActiveStep(0)}
              >
                {/* Step Number */}
                <div className="absolute top-6 right-6 w-12 h-12 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30">
                  <span className="text-2xl font-black text-gray-800">{step.id}</span>
                </div>

                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <CardHeader className="relative z-10 pb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center shadow-xl mb-6 transform group-hover:scale-110 transition-all duration-300`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
                    {step.title}
                  </CardTitle>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {step.description}
                  </p>
                </CardHeader>

                <CardContent className="relative z-10 space-y-6">
                  {/* Features */}
                  <div className="space-y-3">
                    {step.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className={`flex items-center gap-3 transform transition-all duration-300 ${
                          activeStep === index ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-70'
                        }`}
                      >
                        <CheckCircle className={`w-5 h-5 text-green-500 flex-shrink-0`} />
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pro Tip */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-white/70 to-white/50 rounded-2xl border border-white/30">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold text-blue-600">💡 {step.tip}</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="mb-20">
          <h3 className="text-4xl font-black text-center text-gray-900 mb-12">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">AssistanceHub</span>?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="group relative bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:bg-white/90 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${benefit.color} flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-all duration-300`}>
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-black text-gray-900 mb-3">{benefit.title}</h4>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <h3 className="text-4xl font-black text-center text-gray-900 mb-12">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Users Say</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-0">
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic text-lg leading-relaxed mb-6">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{testimonial.name[0]}</span>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{testimonial.name}</div>
                      <div className="text-gray-600 text-sm">{testimonial.location}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 shadow-2xl">
          <h3 className="text-4xl md:text-5xl font-black text-white mb-6">
            Ready to Find Your Home?
          </h3>
          <p className="text-blue-100 text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of families who have successfully found housing assistance through our platform. 
            Your perfect home is just a search away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-bold rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <Search className="w-6 h-6 mr-3" />
              Start Your Search Now
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-bold rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <MapPin className="w-6 h-6 mr-3" />
              Browse by Location
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GettingStartedSection;
