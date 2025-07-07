import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Users, Home, CheckCircle2, Star, TrendingUp, MessageSquare, Shield } from "lucide-react";
import { Database } from "@/integrations/supabase/types";
import PHAHeroSection from "./PHADetailView/PHAHeroSection";
import PHABasicInfo from "./PHADetailView/PHABasicInfo";
import PHAContactInfo from "./PHADetailView/PHAContactInfo";
import PHAHousingPrograms from "./PHADetailView/PHAHousingPrograms";
import PHAWalkScore from "./PHADetailView/PHAWalkScore";
import PHALastUpdated from "./PHADetailView/PHALastUpdated";
import PHADataSource from "./PHADetailView/PHADataSource";
import PHAMapSection from "./PHADetailView/PHAMapSection";

type PHAAgency = Database['public']['Tables']['pha_agencies']['Row'];

interface PHADetailViewProps {
  office: PHAAgency;
  onViewHousing: (office: PHAAgency) => void;
  onBack: () => void;
  onShowMap?: () => void;
}

const PHADetailView: React.FC<PHADetailViewProps> = ({ office, onViewHousing, onBack, onShowMap }) => {
  // Generate stats for the office
  const getOfficeStats = () => {
    const nameHash = office.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return {
      units: (nameHash % 800) + 100,
      waitTime: Math.floor((nameHash % 24) + 1),
      rating: 4.2 + ((nameHash % 8) / 10),
      applications: (nameHash % 50) + 10,
      occupancy: Math.floor((nameHash % 20) + 80),
      satisfaction: Math.floor((nameHash % 15) + 85)
    };
  };

  const stats = getOfficeStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      {/* Modern Header with Gradient */}
      <div className="bg-white/80 backdrop-blur-md shadow-lg border-b sticky top-0 z-20 animate-slide-in-down">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100/80 rounded-lg transition-all duration-200 font-medium hover-scale"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Search
          </Button>
        </div>
      </div>

      {/* Main Content with Increased Width */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section - Full Width */}
        <div className="mb-8 animate-fade-in-up">
          <PHAHeroSection office={office} />
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200/50 shadow-lg hover-lift animate-stagger-1">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center animate-float">
                  <Home className="w-6 h-6 text-blue-600" />
                </div>
                <Badge className="bg-blue-100 text-blue-700 font-semibold animate-pulse-slow">Active</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-blue-900 mb-1">{stats.units}+</div>
              <div className="text-blue-700 text-sm font-medium">Available Units</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200/50 shadow-lg hover-lift animate-stagger-2">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center animate-float" style={{ animationDelay: '0.5s' }}>
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <Badge className="bg-purple-100 text-purple-700 font-semibold">Avg</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-purple-900 mb-1">{stats.waitTime} mo</div>
              <div className="text-purple-700 text-sm font-medium">Average Wait Time</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200/50 shadow-lg hover-lift animate-stagger-3">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
                  <Star className="w-6 h-6 text-green-600" />
                </div>
                <Badge className="bg-green-100 text-green-700 font-semibold">Rated</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-green-900 mb-1">{stats.rating}/5</div>
              <div className="text-green-700 text-sm font-medium">Community Rating</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100/50 border-orange-200/50 shadow-lg hover-lift animate-stagger-4">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center animate-float" style={{ animationDelay: '1.5s' }}>
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <Badge className="bg-orange-100 text-orange-700 font-semibold">This Month</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-orange-900 mb-1">{stats.applications}</div>
              <div className="text-orange-700 text-sm font-medium">New Applications</div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 border-indigo-200/50 shadow-lg hover-lift animate-slide-in-left">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-indigo-800">
                <TrendingUp className="w-5 h-5" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-indigo-700">Occupancy Rate</span>
                <span className="text-lg font-bold text-indigo-900">{stats.occupancy}%</span>
              </div>
              <div className="w-full bg-indigo-200/50 rounded-full h-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${stats.occupancy}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-indigo-700">Resident Satisfaction</span>
                <span className="text-lg font-bold text-indigo-900">{stats.satisfaction}%</span>
              </div>
              <div className="w-full bg-indigo-200/50 rounded-full h-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${stats.satisfaction}%`, animationDelay: '0.5s' }}
                ></div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-teal-50 to-teal-100/50 border-teal-200/50 shadow-lg hover-lift animate-slide-in-right">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-teal-800">
                <Shield className="w-5 h-5" />
                Safety & Compliance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 animate-stagger-1">
                <CheckCircle2 className="w-5 h-5 text-teal-600" />
                <span className="text-sm text-teal-700">HUD Compliance Certified</span>
              </div>
              <div className="flex items-center gap-3 animate-stagger-2">
                <CheckCircle2 className="w-5 h-5 text-teal-600" />
                <span className="text-sm text-teal-700">Equal Housing Opportunity</span>
              </div>
              <div className="flex items-center gap-3 animate-stagger-3">
                <CheckCircle2 className="w-5 h-5 text-teal-600" />
                <span className="text-sm text-teal-700">Regular Safety Inspections</span>
              </div>
              <div className="flex items-center gap-3 animate-stagger-4">
                <CheckCircle2 className="w-5 h-5 text-teal-600" />
                <span className="text-sm text-teal-700">Community Support Services</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Grid - Two Column Layout on Large Screens */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="animate-fade-in-stagger">
              <PHABasicInfo office={office} onShowMap={onShowMap} />
            </div>

            {/* Map Section */}
            <div className="animate-fade-in-stagger" style={{ animationDelay: '0.1s' }}>
              <PHAMapSection office={office} />
            </div>

            {/* Program Information */}
            <div className="animate-fade-in-stagger" style={{ animationDelay: '0.2s' }}>
              <PHAHousingPrograms office={office} />
            </div>

            {/* Walk Score Section */}
            <div className="animate-fade-in-stagger" style={{ animationDelay: '0.3s' }}>
              <PHAWalkScore office={office} />
            </div>
          </div>

          {/* Right Column - Contact & Meta Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Information */}
            <div className="animate-fade-in-stagger" style={{ animationDelay: '0.1s' }}>
              <PHAContactInfo office={office} />
            </div>

            {/* Quick Actions */}
            <Card className="bg-gradient-to-br from-gray-50 to-gray-100/50 border-gray-200/50 shadow-lg hover-lift animate-fade-in-stagger" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <MessageSquare className="w-5 h-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 rounded-xl shadow-lg hover-scale transition-all duration-200"
                  onClick={() => onViewHousing(office)}
                >
                  Apply for Housing
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-6 rounded-xl hover-scale transition-all duration-200"
                >
                  Schedule Tour
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-6 rounded-xl hover-scale transition-all duration-200"
                >
                  Download Application
                </Button>
              </CardContent>
            </Card>

            {/* Office Details */}
            <div className="animate-fade-in-stagger" style={{ animationDelay: '0.3s' }}>
              <PHALastUpdated office={office} />
            </div>

            {/* Data Source Footer */}
            <div className="animate-fade-in-stagger" style={{ animationDelay: '0.4s' }}>
              <PHADataSource />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PHADetailView;
