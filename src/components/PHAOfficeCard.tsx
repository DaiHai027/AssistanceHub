import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, Heart, Phone, Building2, ExternalLink, Users, Calendar, Star, 
  Navigation, Mail, ArrowRight, CheckCircle2, Share, Clock
} from "lucide-react";
import { Database } from "@/integrations/supabase/types";
import { getPHATypeFromData, getPHATypeColor } from "@/utils/mapUtils";

type PHAAgency = Database['public']['Tables']['pha_agencies']['Row'];

interface PHAOfficeCardProps {
  agency: PHAAgency;
  onOfficeClick?: (office: PHAAgency) => void;
}

const PHAOfficeCard = ({ agency, onOfficeClick }: PHAOfficeCardProps) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  
  const fullAddress = agency.address || 'Address not available';
  const phaType = getPHATypeFromData(agency);

  const handleClick = () => {
    navigate(`/pha/${agency.id}`);
  };

  const handleCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (agency.phone) {
      window.location.href = `tel:${agency.phone}`;
    }
  };

  const handleEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (agency.email) {
      window.location.href = `mailto:${agency.email}`;
    }
  };

  const handleDirections = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (agency.address) {
      const encodedAddress = encodeURIComponent(agency.address);
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`, '_blank');
    }
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: agency.name,
        text: `Check out ${agency.name} - Housing Authority`,
        url: window.location.href
      });
    }
  };

  return (
    <Card 
      className="group overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer border-0 bg-white/95 backdrop-blur-sm hover:bg-white hover:scale-[1.02] shadow-lg animate-fade-in-up" 
      onClick={handleClick}
    >
      {/* Modern Header Section */}
      <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-600 p-5 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 20px 20px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
        
        {/* Header Content */}
        <div className="relative z-10">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-white text-lg leading-tight line-clamp-2 group-hover:text-blue-100 transition-colors">
                    {agency.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-xs font-semibold">
                      {agency.program_type || 'Housing Authority'}
                    </Badge>
                    <div className="flex items-center gap-1 text-yellow-300">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-xs font-medium">4.8</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                onClick={handleFavorite}
                variant="ghost"
                size="sm"
                className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                  isFavorite 
                    ? 'bg-red-500/90 text-white hover:bg-red-600' 
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              </Button>
              <Button
                onClick={handleShare}
                variant="ghost"
                size="sm"
                className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
              >
                <Share className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Status Indicators */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white text-sm font-medium">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-white/80" />
              <span className="text-white/80 text-sm">Quick Response</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Content Section */}
      <div className="p-6 space-y-6">
        {/* Address */}
        {fullAddress && (
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                {fullAddress}
              </p>
            </div>
          </div>
        )}
        
        {/* Contact Information Grid */}
        <div className="grid grid-cols-1 gap-3">
          {agency.phone && (
            <Button
              onClick={handleCall}
              variant="outline"
              className="flex items-center justify-start gap-3 p-4 h-auto border-green-200 bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800 transition-all duration-200"
            >
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4 text-white" />
              </div>
              <div className="text-left min-w-0 flex-1">
                <div className="text-xs text-green-600 font-medium">Call Now</div>
                <div className="font-semibold text-sm truncate">{agency.phone}</div>
              </div>
            </Button>
          )}
          
          {agency.email && (
            <Button
              onClick={handleEmail}
              variant="outline"
              className="flex items-center justify-start gap-3 p-4 h-auto border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 transition-all duration-200"
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 text-white" />
              </div>
              <div className="text-left min-w-0 flex-1">
                <div className="text-xs text-blue-600 font-medium">Send Email</div>
                <div className="font-semibold text-sm truncate">{agency.email}</div>
              </div>
            </Button>
          )}
          
          {agency.address && (
            <Button
              onClick={handleDirections}
              variant="outline"
              className="flex items-center justify-start gap-3 p-4 h-auto border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-700 hover:text-purple-800 transition-all duration-200"
            >
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Navigation className="w-4 h-4 text-white" />
              </div>
              <div className="text-left min-w-0 flex-1">
                <div className="text-xs text-purple-600 font-medium">Get Directions</div>
                <div className="font-semibold text-sm">View in Maps</div>
              </div>
            </Button>
          )}
        </div>

        {/* Enhanced Statistics */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="w-4 h-4 text-blue-600" />
              <span className="text-xs text-gray-500 font-medium">Families Served</span>
            </div>
            <p className="text-lg font-bold text-gray-900">1,200+</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-green-600" />
              <span className="text-xs text-gray-500 font-medium">Wait List</span>
            </div>
            <p className="text-lg font-bold text-green-600">Open</p>
          </div>
        </div>

        {/* Enhanced Services */}
        <div>
          <p className="text-sm text-gray-700 font-semibold mb-3">Available Services:</p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 px-3 py-1">
              Section 8 Vouchers
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1">
              Public Housing
            </Badge>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-3 py-1">
              Housing Choice
            </Badge>
          </div>
        </div>

        {/* Enhanced Action Footer */}
        <div className="border-t border-gray-100 pt-4">
          <Button
            onClick={handleClick}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
          >
            <CheckCircle2 className="w-5 h-5 mr-2 group-hover/btn:scale-110 transition-transform" />
            View Full Details
            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
          
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-500">Currently accepting applications</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <ExternalLink className="w-3 h-3" />
              <span>Quick Access</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </Card>
  );
};

export default PHAOfficeCard;
