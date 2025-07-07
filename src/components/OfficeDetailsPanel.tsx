import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MapPin, Filter, Building2, Search } from "lucide-react";
import PHAOfficeCard from "./PHAOfficeCard";
import EmptyOfficeState from "./EmptyOfficeState";
import { Database } from "@/integrations/supabase/types";
import { USLocation } from "@/data/usLocations";

type PHAAgency = Database['public']['Tables']['pha_agencies']['Row'];

interface OfficeDetailsPanelProps {
  selectedOffice: PHAAgency | null;
  onOfficeClick: (office: PHAAgency) => void;
  phaAgencies: PHAAgency[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onShowAll?: () => void;
  hasFilter?: boolean;
  filteredLocation?: USLocation | null;
  onShowMap?: (office?: PHAAgency) => void;
}

const OfficeDetailsPanel: React.FC<OfficeDetailsPanelProps> = ({
  selectedOffice,
  onOfficeClick,
  phaAgencies,
  loading,
  currentPage,
  totalPages,
  totalCount,
  onPageChange,
  onShowAll,
  hasFilter,
  filteredLocation,
  onShowMap
}) => {
  // Show empty state when no agencies are available
  if (phaAgencies.length === 0 && !loading) {
    return (
      <EmptyOfficeState 
        loading={loading} 
        onShowAll={onShowAll}
        hasFilter={hasFilter}
        filteredLocation={filteredLocation}
      />
    );
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-gray-50 to-white">
      {/* Modern Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="p-4 lg:p-6">
          {/* Title Section */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  PHA Offices
                </h2>
                <p className="text-sm text-gray-500">
                  Find housing assistance near you
                </p>
              </div>
            </div>
            
            {hasFilter && onShowAll && (
              <Button
                onClick={onShowAll}
                variant="outline"
                size="sm"
                className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 border-purple-200 px-4 py-2"
              >
                <Filter className="w-4 h-4 mr-2" />
                Clear Filter
              </Button>
            )}
          </div>
          
          {/* Search Context */}
          {hasFilter && filteredLocation && (
            <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 p-4 mb-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-purple-900 mb-1">
                    Search Results
                  </div>
                  <div className="text-sm text-purple-700">
                    {filteredLocation.type === 'state' && (
                      <span>All offices in {filteredLocation.name}</span>
                    )}
                    {filteredLocation.type === 'city' && (
                      <span>Within 25 miles of {filteredLocation.name}, {filteredLocation.stateCode}</span>
                    )}
                    {filteredLocation.type === 'county' && (
                      <span>In {filteredLocation.name}, {filteredLocation.stateCode}</span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          )}
          
          {/* Results Count */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {loading ? (
                <div className="flex items-center gap-2 text-gray-500">
                  <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm font-medium">Loading offices...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-gray-400" />
                  <span className="text-sm font-semibold text-gray-900">
                    {totalCount.toLocaleString()} office{totalCount !== 1 ? 's' : ''} found
                  </span>
                </div>
              )}
            </div>
            
            {/* Page indicator */}
            {totalPages > 1 && (
              <div className="bg-gray-100 px-3 py-1 rounded-full">
                <span className="text-xs font-medium text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading PHA offices...</p>
            <p className="text-sm text-gray-500 mt-1">Please wait while we fetch the latest data</p>
          </div>
        </div>
      )}

      {/* Office List */}
      {!loading && (
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 lg:p-6 space-y-4">
            {phaAgencies.map((office, index) => (
              <div 
                key={office.id} 
                className="transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                <PHAOfficeCard
                  agency={office}
                  onOfficeClick={() => onOfficeClick(office)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modern Pagination */}
      {!loading && totalPages > 1 && (
        <div className="bg-white border-t border-gray-200 shadow-lg">
          <div className="p-4 lg:p-6">
            <div className="flex items-center justify-between gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="flex items-center gap-2 px-4 py-2 font-medium disabled:opacity-50 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Prev</span>
              </Button>
              
              {/* Enhanced Page Info */}
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <div className="text-sm font-semibold text-gray-900">
                    {currentPage} of {totalPages}
                  </div>
                  <div className="text-xs text-gray-500">
                    {totalCount.toLocaleString()} total results
                  </div>
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="flex items-center gap-2 px-4 py-2 font-medium disabled:opacity-50 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300"
              >
                <span className="hidden sm:inline">Next</span>
                <span className="sm:hidden">Next</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Enhanced Progress Bar */}
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(currentPage / totalPages) * 100}%` }}
              >
                <div className="h-full bg-white/20 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfficeDetailsPanel;
