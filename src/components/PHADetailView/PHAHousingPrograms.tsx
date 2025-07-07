import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Home, Users, DollarSign, Calendar, CheckCircle2, Info, Building, Heart } from "lucide-react";
import { Database } from "@/integrations/supabase/types";

type PHAAgency = Database['public']['Tables']['pha_agencies']['Row'];

interface PHAHousingProgramsProps {
  office: PHAAgency;
}

const PHAHousingPrograms: React.FC<PHAHousingProgramsProps> = ({ office }) => {
  const programs = [
    {
      id: 'section8',
      name: 'Section 8 Housing Choice Vouchers',
      description: 'Rental assistance program helping eligible families afford decent housing',
      icon: Home,
      color: 'blue',
      features: [
        'Portable assistance - move anywhere that accepts vouchers',
        'Pay approximately 30% of income toward rent',
        'Choose your own housing',
        'Includes utilities allowance'
      ],
      eligibility: 'Income at or below 50% of area median income',
      availability: 'Open',
      waitTime: '12-18 months'
    },
    {
      id: 'public',
      name: 'Public Housing Units',
      description: 'Government-owned housing with subsidized rent',
      icon: Building,
      color: 'green',
      features: [
        'Rent based on 30% of adjusted income',
        'On-site management and maintenance',
        'Various bedroom sizes available',
        'Community amenities included'
      ],
      eligibility: 'Income at or below 80% of area median income',
      availability: 'Limited',
      waitTime: '6-12 months'
    },
    {
      id: 'senior',
      name: 'Senior Housing Programs',
      description: 'Age-restricted housing for seniors 62 and older',
      icon: Heart,
      color: 'purple',
      features: [
        'Age-restricted communities',
        'Accessible design features',
        'On-site support services',
        'Social activities and programs'
      ],
      eligibility: 'Age 62+ with qualifying income',
      availability: 'Open',
      waitTime: '3-6 months'
    },
    {
      id: 'emergency',
      name: 'Emergency Housing Assistance',
      description: 'Temporary assistance for families facing homelessness',
      icon: Users,
      color: 'orange',
      features: [
        'Rapid rehousing assistance',
        'Temporary rental assistance',
        'Case management services',
        'Move-in cost assistance'
      ],
      eligibility: 'Homeless or at risk of homelessness',
      availability: 'Open',
      waitTime: 'Immediate'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        icon: 'text-blue-600',
        iconBg: 'bg-blue-100',
        text: 'text-blue-800',
        badge: 'bg-blue-100 text-blue-700'
      },
      green: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        icon: 'text-green-600',
        iconBg: 'bg-green-100',
        text: 'text-green-800',
        badge: 'bg-green-100 text-green-700'
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        icon: 'text-purple-600',
        iconBg: 'bg-purple-100',
        text: 'text-purple-800',
        badge: 'bg-purple-100 text-purple-700'
      },
      orange: {
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        icon: 'text-orange-600',
        iconBg: 'bg-orange-100',
        text: 'text-orange-800',
        badge: 'bg-orange-100 text-orange-700'
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const getAvailabilityBadge = (availability: string) => {
    if (availability === 'Open') {
      return <Badge className="bg-green-100 text-green-700 font-semibold">Open</Badge>;
    } else if (availability === 'Limited') {
      return <Badge className="bg-yellow-100 text-yellow-700 font-semibold">Limited</Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-700 font-semibold">Closed</Badge>;
    }
  };

  return (
    <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-xl">
          <Home className="w-6 h-6 text-purple-600" />
          Housing Programs Available
        </CardTitle>
        <CardDescription className="text-base">
          Comprehensive housing assistance programs offered by this authority
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {office.program_type && (
          <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-purple-100/50 rounded-xl border border-purple-200/50">
            <div className="flex items-center gap-2 mb-2">
              <Info className="w-5 h-5 text-purple-600" />
              <div className="text-sm font-medium text-purple-800">Primary Program Type</div>
            </div>
            <div className="text-lg font-bold text-purple-900">{office.program_type}</div>
          </div>
        )}

        <div className="grid gap-6">
          {programs.map((program) => {
            const colors = getColorClasses(program.color);
            const IconComponent = program.icon;
            
            return (
              <Card key={program.id} className={`${colors.bg} ${colors.border} border-2 shadow-md hover:shadow-lg transition-all duration-300`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 ${colors.iconBg} rounded-xl flex items-center justify-center`}>
                        <IconComponent className={`w-6 h-6 ${colors.icon}`} />
                      </div>
                      <div>
                        <h3 className={`font-bold ${colors.text} text-lg`}>{program.name}</h3>
                        <p className="text-gray-600 text-sm">{program.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      {getAvailabilityBadge(program.availability)}
                      <Badge className={colors.badge}>{program.waitTime}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className={`font-semibold ${colors.text} mb-2`}>Key Features:</h4>
                    <ul className="space-y-1">
                      {program.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className={`w-4 h-4 ${colors.icon} mt-0.5 flex-shrink-0`} />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-gray-200">
                    <div>
                      <h4 className={`font-semibold ${colors.text} mb-1 flex items-center gap-1`}>
                        <Users className="w-4 h-4" />
                        Eligibility
                      </h4>
                      <p className="text-sm text-gray-600">{program.eligibility}</p>
                    </div>
                    <div>
                      <h4 className={`font-semibold ${colors.text} mb-1 flex items-center gap-1`}>
                        <Calendar className="w-4 h-4" />
                        Typical Wait Time
                      </h4>
                      <p className="text-sm text-gray-600">{program.waitTime}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Information */}
        <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <Info className="w-4 h-4" />
            Important Notes
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Applications are processed on a first-come, first-served basis</li>
            <li>• Income limits and requirements may change annually</li>
            <li>• Background checks and references are required</li>
            <li>• Contact the office directly for the most current information</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default PHAHousingPrograms;
