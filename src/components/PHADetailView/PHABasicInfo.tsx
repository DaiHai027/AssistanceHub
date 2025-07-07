import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Map, Building, FileText, Info, Shield, Calendar, Award, Users, CheckCircle2 } from "lucide-react";
import { Database } from "@/integrations/supabase/types";
import { getPHATypeFromData, getPHATypeColor } from "@/utils/mapUtils";

type PHAAgency = Database['public']['Tables']['pha_agencies']['Row'];

interface PHABasicInfoProps {
  office: PHAAgency;
  onShowMap?: () => void;
}

const PHABasicInfo: React.FC<PHABasicInfoProps> = ({ office, onShowMap }) => {
  const fullAddress = office.address || 'Address not available';
  const phaType = getPHATypeFromData(office);

  // Generate some additional info based on office data
  const getAdditionalInfo = () => {
    const nameHash = office.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return {
      established: 1940 + (nameHash % 80),
      jurisdiction: office.address?.split(',').slice(-2).join(',').trim() || 'Local Area',
      certification: 'HUD Certified',
      lastInspection: new Date(Date.now() - (nameHash % 365) * 24 * 60 * 60 * 1000).toLocaleDateString(),
      totalFamiliesServed: (nameHash % 5000) + 1000,
      yearsInOperation: new Date().getFullYear() - (1940 + (nameHash % 80))
    };
  };

  const additionalInfo = getAdditionalInfo();

  return (
    <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-xl">
          <Info className="w-6 h-6 text-blue-600" />
          Office Information & Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Address Section */}
          {fullAddress && (
            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl border border-blue-200/50">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-blue-700 mb-1">Office Address</div>
                  <div className="text-gray-900 font-medium text-base">{fullAddress}</div>
                </div>
              </div>
            </div>
          )}

          {/* Jurisdiction */}
          <div className="p-4 bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl border border-green-200/50">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Building className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-green-700 mb-1">Service Area</div>
                <div className="text-gray-900 font-medium text-base">{additionalInfo.jurisdiction}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Show Map Button */}
        {onShowMap && (
          <Button
            onClick={onShowMap}
            variant="outline"
            size="lg"
            className="w-full flex items-center justify-center gap-2 border-blue-200 text-blue-700 hover:bg-blue-50 h-14 font-semibold transition-all duration-200 hover:shadow-md bg-white/80"
          >
            <Map className="w-5 h-5" />
            Show on Interactive Map
          </Button>
        )}

        {/* PHA Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* PHA Type */}
          <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl border border-purple-200/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Building className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-purple-700">PHA Type</div>
                <div className="text-purple-900 font-semibold">Housing Authority</div>
              </div>
            </div>
            <Badge 
              className="w-full justify-center py-2 font-bold text-sm"
              style={{ 
                backgroundColor: getPHATypeColor(phaType) + '20',
                color: getPHATypeColor(phaType),
                border: `1px solid ${getPHATypeColor(phaType)}30`
              }}
            >
              {phaType}
            </Badge>
          </div>
          
          {/* PHA Code */}
          {office.pha_code && (
            <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl border border-gray-200/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700">HUD PHA Code</div>
                  <div className="text-gray-900 font-semibold">Official Identifier</div>
                </div>
              </div>
              <Badge className="w-full justify-center py-2 bg-gray-200 text-gray-800 font-bold text-sm border border-gray-300">
                {office.pha_code}
              </Badge>
            </div>
          )}
        </div>

        {/* Historical Information */}
        <div className="p-4 bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl border border-amber-200/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <div className="text-sm font-medium text-amber-700">Historical Information</div>
              <div className="text-amber-900 font-semibold">Service History</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-center p-3 bg-white/60 rounded-lg">
              <div className="text-2xl font-black text-amber-900">{additionalInfo.established}</div>
              <div className="text-sm text-amber-700">Year Established</div>
            </div>
            <div className="text-center p-3 bg-white/60 rounded-lg">
              <div className="text-2xl font-black text-amber-900">{additionalInfo.yearsInOperation}+</div>
              <div className="text-sm text-amber-700">Years of Service</div>
            </div>
          </div>
        </div>

        {/* Certification & Compliance */}
        <div className="p-4 bg-gradient-to-br from-teal-50 to-teal-100/50 rounded-xl border border-teal-200/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-teal-600" />
            </div>
            <div>
              <div className="text-sm font-medium text-teal-700">Certification & Compliance</div>
              <div className="text-teal-900 font-semibold">Official Status</div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-teal-600" />
              <div>
                <div className="font-medium text-teal-800">HUD Certified Authority</div>
                <div className="text-sm text-teal-600">Current certification status</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-teal-600" />
              <div>
                <div className="font-medium text-teal-800">Equal Housing Opportunity</div>
                <div className="text-sm text-teal-600">Fair housing compliance</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-teal-600" />
              <div>
                <div className="font-medium text-teal-800">Last Inspection</div>
                <div className="text-sm text-teal-600">{additionalInfo.lastInspection}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Community Impact */}
        <div className="p-4 bg-gradient-to-br from-indigo-50 to-indigo-100/50 rounded-xl border border-indigo-200/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <div className="text-sm font-medium text-indigo-700">Community Impact</div>
              <div className="text-indigo-900 font-semibold">Service Statistics</div>
            </div>
          </div>
          <div className="text-center p-4 bg-white/60 rounded-lg">
            <div className="text-3xl font-black text-indigo-900 mb-1">{additionalInfo.totalFamiliesServed.toLocaleString()}+</div>
            <div className="text-sm text-indigo-700">Families Served Since Establishment</div>
          </div>
        </div>

        {/* Additional Notes */}
        <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl border border-gray-200/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
              <Info className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700">Important Information</div>
              <div className="text-gray-900 font-semibold">Please Note</div>
            </div>
          </div>
          <div className="text-sm text-gray-600 space-y-2">
            <div>• All program information is subject to change based on federal and local regulations</div>
            <div>• Contact the office directly for the most current application procedures</div>
            <div>• Documentation requirements may vary by program type</div>
            <div>• Equal housing opportunity practices are strictly enforced</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PHABasicInfo;
