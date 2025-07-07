import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Search, MapPin, Home, Utensils, CheckCircle, ArrowRight, Zap, Shield, Users, Clock, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ServicesSection = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      id: 1,
      title: "Section 8 Housing",
      subtitle: "Housing Choice Voucher Program",
      description: "Discover affordable housing opportunities through our comprehensive PHA network. Find your perfect home with personalized assistance and real-time availability.",
      icon: Home,
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50",
      features: [
        "Smart PHA locator with real-time data",
        "Waitlist status notifications",
        "Instant contact information",
        "Application guidance & support"
      ],
      stats: { number: "2,500+", label: "Housing Authorities" },
      link: "/section8",
      buttonText: "Find Housing",
      accent: "purple"
    },
    {
      id: 2,
      title: "SNAP Benefits",
      subtitle: "Supplemental Nutrition Assistance",
      description: "Access food assistance programs quickly and easily. Navigate the application process with confidence and connect with local SNAP offices.",
      icon: Utensils,
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50",
      features: [
        "Comprehensive office directory",
        "Real-time office hours & locations",
        "Eligibility calculator tools",
        "Application process guidance"
      ],
      stats: { number: "10,000+", label: "SNAP Offices" },
      link: "/snap",
      buttonText: "Get Food Assistance",
      accent: "green"
    }
  ];

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get results in seconds with our optimized search engine",
      color: "from-yellow-400 to-orange-400"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your information is protected with enterprise-grade security",
      color: "from-blue-400 to-cyan-400"
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "24/7 guidance from housing assistance specialists",
      color: "from-purple-400 to-pink-400"
    },
    {
      icon: Clock,
      title: "Always Updated",
      description: "Real-time data ensures you get the latest information",
      color: "from-green-400 to-emerald-400"
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-200/30 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse delay-1000 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg">
            <Star className="w-4 h-4 text-yellow-500 animate-pulse" />
            <span>Premium Services</span>
            <Sparkles className="w-4 h-4 text-purple-500 animate-pulse" />
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-purple-800 to-pink-800">
              Your Success
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600">
              Starts Here
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Experience the future of government assistance with our AI-powered platform. 
            <span className="font-semibold text-purple-600"> Connect, discover, and succeed</span> with confidence.
          </p>
        </div>

        {/* Main Services */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {services.map((service, index) => (
            <Card
              key={service.id}
              className={`group relative overflow-hidden border-0 shadow-2xl hover:shadow-4xl transition-all duration-500 transform hover:scale-105 cursor-pointer bg-gradient-to-br ${service.bgColor}`}
              onMouseEnter={() => setActiveCard(service.id)}
              onMouseLeave={() => setActiveCard(null)}
            >
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Floating Elements */}
              <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <CardHeader className="relative z-10 pb-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-all duration-300`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-gray-900">{service.stats.number}</div>
                    <div className="text-sm text-gray-600 font-medium">{service.stats.label}</div>
                  </div>
                </div>
                <CardTitle className="text-2xl md:text-3xl font-black text-gray-900 mb-2">
                  {service.title}
                </CardTitle>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  {service.subtitle}
                </p>
              </CardHeader>

              <CardContent className="relative z-10 space-y-6">
                <p className="text-gray-700 text-lg leading-relaxed font-medium">
                  {service.description}
                </p>
                
                {/* Features List */}
                <div className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className={`flex items-center gap-3 transform transition-all duration-300 delay-${featureIndex * 100} ${
                        activeCard === service.id ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-70'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center shadow-lg`}>
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* CTA Button */}
                <Link to={service.link} className="inline-block mt-8">
                  <Button
                    className={`group relative overflow-hidden bg-gradient-to-r ${service.color} text-white px-8 py-4 text-lg font-bold rounded-2xl shadow-2xl hover:shadow-${service.accent}-500/25 transition-all duration-300 transform hover:scale-105 border-0`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center gap-2">
                      <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      {service.buttonText}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <h3 className="text-4xl font-black text-center text-gray-900 mb-12">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">AssistanceHub</span>?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:bg-white/90 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-all duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-black text-gray-900 mb-3">{feature.title}</h4>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 shadow-2xl">
          <h3 className="text-4xl font-black text-white mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-purple-100 text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of families who have found their perfect home through our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/section8">
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-4 text-lg font-bold rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <Home className="w-6 h-6 mr-3" />
                Start Your Housing Search
              </Button>
            </Link>
            <Link to="/snap">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg font-bold rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <Utensils className="w-6 h-6 mr-3" />
                Find Food Assistance
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
