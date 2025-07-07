import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Image, Building2, MapPin, Users, Phone, Mail, Star, ExternalLink, Home, CheckCircle, Clock } from "lucide-react";
import { GoogleMapsService } from "@/services/googleMapsService";
import { Database } from "@/integrations/supabase/types";

type PHAAgency = Database['public']['Tables']['pha_agencies']['Row'];

interface PHAHeroSectionProps {
  office: PHAAgency;
}

const PHAHeroSection: React.FC<PHAHeroSectionProps> = ({ office }) => {
  const [imageError, setImageError] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  const fullAddress = office.address || '';

  // Get both Street View and Static Map images
  const { streetView: streetViewImageUrl, staticMap: staticMapImageUrl } = GoogleMapsService.getBestImageForAddress(fullAddress, '1200x600');

  const handleImageError = () => {
    console.log('Image error occurred, showFallback:', showFallback);
    if (!showFallback) {
      console.log('Switching to static map fallback');
      setShowFallback(true);
    } else {
      console.log('Static map also failed, showing default view');
      setImageError(true);
    }
  };

  // Generate fake but realistic stats for demonstration
  const getOfficeStats = () => {
    const nameHash = office.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return {
      units: (nameHash % 800) + 100,
      waitTime: Math.floor((nameHash % 24) + 1),
      rating: 4.2 + ((nameHash % 8) / 10),
      applications: (nameHash % 50) + 10
    };
  };

  const stats = getOfficeStats();

  // If no address or both images failed, show default gradient view
  if (!fullAddress || imageError) {
    return (
      <div className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 opacity-95">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <Card className="relative bg-white/10 backdrop-blur-xl border-0 shadow-2xl">
          <div className="px-8 py-12 lg:py-16">
            {/* Header Section */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
                {office.name}
              </h1>
              <div className="flex items-center justify-center gap-2 text-white/90 text-lg mb-6">
                <MapPin className="w-5 h-5" />
                <span>{fullAddress || 'Address not available'}</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                  <Home className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-black text-white mb-1">{stats.units}+</div>
                <div className="text-white/80 text-sm font-medium">Housing Units</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-black text-white mb-1">{stats.waitTime}</div>
                <div className="text-white/80 text-sm font-medium">Avg. Wait (months)</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-black text-white mb-1">{stats.rating}</div>
                <div className="text-white/80 text-sm font-medium">Community Rating</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-black text-white mb-1">{stats.applications}</div>
                <div className="text-white/80 text-sm font-medium">Applications This Month</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-white/90 font-bold px-8 py-6 text-lg rounded-xl shadow-lg"
              >
                Apply for Housing
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 font-bold px-8 py-6 text-lg rounded-xl backdrop-blur-sm"
              >
                Schedule Visit
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      <Card className="overflow-hidden shadow-2xl border-0 bg-white">
        <div className="relative h-80 lg:h-96 overflow-hidden">
          <img
            src={showFallback ? staticMapImageUrl : streetViewImageUrl}
            alt={`View of ${office.name}`}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            onError={handleImageError}
            onLoad={() => console.log('✅ Image loaded successfully:', showFallback ? 'Static Map' : 'Street View')}
          />
          
          {/* Modern Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Floating Elements */}
          <div className="absolute top-6 right-6 flex gap-3">
            <Badge className="bg-white/90 text-gray-800 font-semibold px-4 py-2 rounded-full shadow-lg backdrop-blur-sm">
              <Star className="w-4 h-4 mr-1 text-yellow-500" />
              {stats.rating}
            </Badge>
            <Badge className="bg-blue-600/90 text-white font-semibold px-4 py-2 rounded-full shadow-lg backdrop-blur-sm">
              <Image className="w-4 h-4 mr-1" />
              {showFallback ? 'Map View' : 'Street View'}
            </Badge>
          </div>

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="max-w-4xl">
              <h1 className="text-4xl lg:text-5xl font-black mb-4 drop-shadow-lg leading-tight">
                {office.name}
              </h1>
              <div className="flex items-center gap-2 text-white/95 text-lg mb-6 drop-shadow-md">
                <MapPin className="w-5 h-5" />
                <span>{fullAddress}</span>
              </div>
              
              {/* Quick Stats */}
              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm">
                  <Home className="w-4 h-4" />
                  <span className="font-semibold">{stats.units}+ Units</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm">
                  <Clock className="w-4 h-4" />
                  <span className="font-semibold">{stats.waitTime} mo. wait</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-semibold">Accepting Applications</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-white/90 font-bold px-8 py-6 text-lg rounded-xl shadow-lg"
                >
                  Apply Now
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/10 font-bold px-8 py-6 text-lg rounded-xl backdrop-blur-sm"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Visit Website
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PHAHeroSection;
