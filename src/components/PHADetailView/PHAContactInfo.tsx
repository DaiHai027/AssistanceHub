import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Users, MapPin, Clock, Globe, MessageCircle, Copy, ExternalLink } from "lucide-react";
import { Database } from "@/integrations/supabase/types";

type PHAAgency = Database['public']['Tables']['pha_agencies']['Row'];

interface PHAContactInfoProps {
  office: PHAAgency;
}

const PHAContactInfo: React.FC<PHAContactInfoProps> = ({ office }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-xl">
          <Users className="w-6 h-6 text-green-600" />
          Contact Information
        </CardTitle>
        <CardDescription className="text-base">
          Multiple ways to get in touch with this housing authority
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Primary Contact Methods */}
        <div className="space-y-4">
          {office.phone && (
            <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-xl border border-blue-200/50 group hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-700 mb-1">Main Phone</div>
                    <div className="text-lg font-bold text-blue-700 group-hover:text-blue-800">
                      {office.phone}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="bg-white/80 hover:bg-white"
                    onClick={() => copyToClipboard(office.phone)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => window.open(`tel:${office.phone}`, '_self')}
                  >
                    Call Now
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {office.email && (
            <div className="p-4 bg-gradient-to-r from-green-50 to-green-100/50 rounded-xl border border-green-200/50 group hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors duration-200">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-700 mb-1">General Email</div>
                    <div className="text-sm font-bold text-green-700 group-hover:text-green-800 truncate">
                      {office.email}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ml-3">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="bg-white/80 hover:bg-white"
                    onClick={() => copyToClipboard(office.email)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => window.open(`mailto:${office.email}`, '_self')}
                  >
                    Email
                  </Button>
                </div>
              </div>
            </div>
          )}

          {office.exec_dir_email && (
            <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100/50 rounded-xl border border-purple-200/50 group hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-200">
                    <Mail className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-700 mb-1">Executive Director</div>
                    <div className="text-sm font-bold text-purple-700 group-hover:text-purple-800 truncate">
                      {office.exec_dir_email}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ml-3">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="bg-white/80 hover:bg-white"
                    onClick={() => copyToClipboard(office.exec_dir_email)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={() => window.open(`mailto:${office.exec_dir_email}`, '_self')}
                  >
                    Email
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Address Information */}
        {office.address && (
          <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl border border-gray-200/50">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-gray-600" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-700 mb-1">Office Address</div>
                <div className="text-gray-900 font-medium mb-3">{office.address}</div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => copyToClipboard(office.address)}
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => window.open(`https://maps.google.com/maps?q=${encodeURIComponent(office.address)}`, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Directions
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Office Hours */}
        <div className="p-4 bg-gradient-to-r from-yellow-50 to-yellow-100/50 rounded-xl border border-yellow-200/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700">Office Hours</div>
              <div className="text-yellow-700 font-semibold">Monday - Friday</div>
            </div>
          </div>
          <div className="text-sm text-gray-600 space-y-1">
            <div className="flex justify-between">
              <span>Walk-in Hours:</span>
              <span className="font-medium">9:00 AM - 4:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span>Phone Hours:</span>
              <span className="font-medium">8:00 AM - 5:00 PM</span>
            </div>
            <div className="text-xs text-yellow-600 mt-2">
              * Closed on federal holidays
            </div>
          </div>
        </div>

        {/* Communication Preferences */}
        <div className="p-4 bg-gradient-to-r from-indigo-50 to-indigo-100/50 rounded-xl border border-indigo-200/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700">Best Contact Methods</div>
              <div className="text-indigo-700 font-semibold">For Different Purposes</div>
            </div>
          </div>
          <div className="text-sm text-gray-600 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span><strong>Applications:</strong> Visit in person with documents</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span><strong>General Questions:</strong> Call or email</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span><strong>Urgent Issues:</strong> Call during business hours</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span><strong>Complaints:</strong> Email executive director</span>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="p-4 bg-gradient-to-r from-red-50 to-red-100/50 rounded-xl border border-red-200/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <Phone className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700">Emergency Contact</div>
              <div className="text-red-700 font-semibold">After Hours Emergencies</div>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            For housing emergencies after business hours, contact your local emergency services or housing authority's emergency line.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PHAContactInfo;
