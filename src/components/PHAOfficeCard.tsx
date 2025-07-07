import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { MapPin, Heart, Phone, Building2, ExternalLink, Users, Calendar, Star } from "lucide-react";
import { Database } from "@/integrations/supabase/types";
import { getPHATypeFromData, getPHATypeColor } from "@/utils/mapUtils";

type PHAAgency = Database['public']['Tables']['pha_agencies']['Row'];

interface PHAOfficeCardProps {
  agency: PHAAgency;
  onOfficeClick?: (office: PHAAgency) => void;
}

const PHAOfficeCard = ({ agency, onOfficeClick }: PHAOfficeCardProps) => {
  const navigate = useNavigate();
  
  const fullAddress = agency.address || 'Address not available';
  const phaType = getPHATypeFromData(agency);

  const handleClick = () => {
    navigate(`/pha/${agency.id}`);
  };

  return (
    <Card 
      className="group overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-200 bg-white hover:border-purple-300 hover:-translate-y-1" 
      onClick={handleClick}
    >
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 border-b border-gray-100">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 text-lg leading-tight line-clamp-2 group-hover:text-purple-700 transition-colors">
                  {agency.name}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span 
                    className="px-2 py-1 rounded-full text-xs font-semibold border"
                    style={{ 
                      backgroundColor: getPHATypeColor(phaType) + '15',
                      borderColor: getPHATypeColor(phaType) + '30',
                      color: getPHATypeColor(phaType)
                    }}
                  >
                    {agency.program_type}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-xs font-medium">4.2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <button 
            className="p-2 hover:bg-white/60 rounded-full transition-colors flex-shrink-0 group"
            onClick={(e) => {
              e.stopPropagation();
              // Handle favorite functionality
            }}
          >
            <Heart className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5">
        {/* Address */}
        {fullAddress && (
          <div className="flex items-start gap-3 mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                {fullAddress}
              </p>
            </div>
          </div>
        )}
        
        {/* Contact Info */}
        {agency.phone && (
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Phone className="w-4 h-4 text-green-600" />
            </div>
            <div className="flex-1">
              <span className="text-sm text-gray-700 font-medium">
                {agency.phone}
              </span>
              <p className="text-xs text-gray-500 mt-1">
                Call for assistance & applications
              </p>
            </div>
          </div>
        )}

        {/* Additional Info */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Families Served</p>
              <p className="text-sm font-semibold text-gray-900">1,200+</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Wait List</p>
              <p className="text-sm font-semibold text-green-600">Open</p>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-2">Available Services:</p>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">
              Section 8 Vouchers
            </span>
            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
              Public Housing
            </span>
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
              Housing Choice
            </span>
          </div>
        </div>

        {/* Action Footer */}
        <div className="border-t border-gray-100 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <ExternalLink className="w-3 h-3" />
              <span>View Details</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-500">Currently accepting applications</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </Card>
  );
};

export default PHAOfficeCard;
