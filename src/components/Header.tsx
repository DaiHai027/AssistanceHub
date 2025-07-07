import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X, Home, Utensils, Shield, Bell, Sparkles } from "lucide-react";
import { USLocation } from "@/data/usLocations";
import CitySearch from "./CitySearch";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onCitySelect?: (location: USLocation) => void;
  showSearch?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onCitySelect, showSearch = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCitySelectFromHeader = (location: USLocation) => {
    console.log('🏙️ Header location selected:', location);
    if (onCitySelect) {
      onCitySelect(location);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigation = [
    { 
      name: 'Section 8', 
      href: '/section8', 
      icon: Home, 
      description: 'Housing Assistance'
    },
    { 
      name: 'SNAP', 
      href: '/snap', 
      icon: Utensils, 
      description: 'Food Benefits'
    },
    { 
      name: 'Admin', 
      href: '/auth', 
      icon: Shield, 
      description: 'Management'
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Notice Banner */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-center gap-2 text-center">
            <Bell className="w-4 h-4 text-amber-600" />
            <p className="text-sm text-amber-800 font-medium">
              <span className="font-semibold">Notice:</span> This is a private platform, not affiliated with government agencies.
            </p>
          </div>
        </div>
      </div>
      
      {/* Main Header */}
      <header className={`sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200 transition-all duration-300 ${
        scrolled ? 'shadow-md' : ''
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">AH</span>
                </div>
                <div className="hidden sm:block">
                  <div className="text-xl font-bold text-gray-900">AssistanceHub</div>
                  <div className="text-xs text-gray-500 -mt-1">Find Help Near You</div>
                </div>
              </Link>
            </div>

            {/* Desktop Search */}
            {!isMobile && showSearch && onCitySelect && (
              <div className="flex-1 max-w-2xl mx-8">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-full focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-transparent bg-white">
                    <CitySearch 
                      onCitySelect={handleCitySelectFromHeader}
                      placeholder="Search your city, county, or ZIP code..."
                      variant="header"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Desktop Navigation */}
            {!isMobile && (
              <nav className="flex items-center space-x-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-700 hover:text-purple-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <item.icon className="w-4 h-4" />
                      {item.name}
                    </div>
                  </Link>
                ))}
              </nav>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            )}
          </div>

          {/* Mobile Search */}
          {isMobile && showSearch && onCitySelect && (
            <div className="pb-4 border-t border-gray-100">
              <div className="pt-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-full focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-transparent bg-white">
                    <CitySearch 
                      onCitySelect={handleCitySelectFromHeader}
                      placeholder="Search your location..."
                      variant="header"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Navigation */}
          {isMobile && isMobileMenuOpen && (
            <div className="border-t border-gray-100 py-4">
              <nav className="space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-700 hover:text-purple-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isActive(item.href) ? 'bg-white/20' : 'bg-gray-100'
                    }`}>
                      <item.icon className={`w-5 h-5 ${
                        isActive(item.href) ? 'text-white' : 'text-gray-600'
                      }`} />
                    </div>
                    <div>
                      <div className="font-semibold">{item.name}</div>
                      <div className={`text-sm ${
                        isActive(item.href) ? 'text-white/80' : 'text-gray-500'
                      }`}>
                        {item.description}
                      </div>
                    </div>
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
