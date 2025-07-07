import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import OfficeDetailsPanel from "@/components/OfficeDetailsPanel";
import MapContainer from "@/components/MapContainer";
import Header from "@/components/Header";
import MobileSection8Layout from "@/components/MobileSection8Layout";
import { useMapLogic } from "@/hooks/useMapLogic";
import { useIsMobile } from "@/hooks/use-mobile";
import { Database } from "@/integrations/supabase/types";
import { Search, MapPin, Building2, Phone, Clock, Users, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type PHAAgency = Database['public']['Tables']['pha_agencies']['Row'];

const Section8 = () => {
  console.log('Section8 component rendering...');
  
  const location = useLocation();
  const searchLocation = location.state?.searchLocation;
  const [showHero, setShowHero] = useState(true);
  
  const {
    mapboxToken,
    selectedOffice,
    selectedLocation,
    filteredLocation,
    tokenError,
    mapRef,
    phaAgencies,
    loading,
    currentPage,
    totalPages,
    totalCount,
    setSelectedOffice,
    setTokenError,
    handleTokenChange,
    handlePageChange,
    handleCitySelect,
    setSelectedLocation,
    clearLocationFilter,
    resetToUSView,
  } = useMapLogic();

  const isMobile = useIsMobile();

  // Handle navigation from state page
  useEffect(() => {
    if (searchLocation && mapRef.current) {
      console.log('🏛️ Received search location from state page:', searchLocation);
      handleCitySelect(searchLocation);
      setShowHero(false);
    }
  }, [searchLocation, handleCitySelect]);

  // Reset to US view when component mounts (only if no search location)
  useEffect(() => {
    if (!searchLocation) {
      const timer = setTimeout(() => {
        if (mapRef.current) {
          console.log('🇺🇸 Initial page load - showing US map');
          resetToUSView();
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [searchLocation]);

  // Hide hero when user performs a search
  useEffect(() => {
    if (filteredLocation || selectedLocation) {
      setShowHero(false);
    }
  }, [filteredLocation, selectedLocation]);

  const handleOfficeClick = (office: PHAAgency) => {
    console.log('🎯 Office clicked from panel:', office.name);
    setSelectedOffice(office);
  };

  const handleHeaderCitySelect = (location: any) => {
    console.log('🏙️ Section8 received location selection:', location);
    handleCitySelect(location);
    setShowHero(false);
  };

  if (!mapboxToken) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-xl">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Configuration Required</h2>
          <p className="text-gray-600">Please configure your Mapbox token to view the interactive map.</p>
        </div>
      </div>
    );
  }

  const heroSection = showHero && (
    <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Hero Content */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl lg:text-5xl font-black mb-2">
                Section 8 Housing
              </h1>
              <p className="text-xl text-purple-100">
                Find affordable housing assistance near you
              </p>
            </div>
          </div>
          
          <p className="text-lg text-purple-100 max-w-3xl mx-auto leading-relaxed">
            Search thousands of Public Housing Authorities (PHAs) across the United States. 
            Find contact information, program details, and apply for housing assistance in your area.
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <Search className="w-6 h-6 text-white" />
              <h2 className="text-xl font-bold text-white">Find Housing Assistance</h2>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-purple-600" />
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Enter your city, county, or ZIP code..."
                    className="w-full text-lg text-gray-900 placeholder-gray-500 border-none outline-none bg-transparent"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        // Handle search
                        setShowHero(false);
                      }
                    }}
                  />
                </div>
                <Button 
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold"
                  onClick={() => setShowHero(false)}
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white p-6 hover:bg-white/20 transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg">Nationwide Coverage</h3>
            </div>
            <p className="text-purple-100">
              Access information for thousands of PHAs across all 50 states and territories.
            </p>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white p-6 hover:bg-white/20 transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg">Direct Contact</h3>
            </div>
            <p className="text-purple-100">
              Get phone numbers, addresses, and contact information for each PHA office.
            </p>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white p-6 hover:bg-white/20 transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg">Real-time Updates</h3>
            </div>
            <p className="text-purple-100">
              Current information on housing programs, waiting lists, and application status.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header 
        showSearch={true}
        onCitySelect={handleHeaderCitySelect}
      />

      
      {/* Main Content */}
      <div className="flex-1">
        {isMobile ? (
          <MobileSection8Layout
            mapboxToken={mapboxToken}
            selectedOffice={selectedOffice}
            filteredLocation={filteredLocation}
            mapRef={mapRef}
            phaAgencies={phaAgencies}
            loading={loading}
            currentPage={currentPage}
            totalPages={totalPages}
            totalCount={totalCount}
            viewState="overview"
            detailOffice={null}
            setSelectedOffice={setSelectedOffice}
            handleOfficeClick={handleOfficeClick}
            handleViewHousing={() => {}}
            handleBackToOverview={() => {}}
            handleBackToPHADetail={() => {}}
            handlePageChange={handlePageChange}
            clearLocationFilter={clearLocationFilter}
            setTokenError={setTokenError}
            selectedLocation={selectedLocation}
          />
        ) : (
          <div className="h-[calc(100vh-64px)] overflow-hidden">
             <div className="flex h-full bg-white">
                {/* Left Panel - Map */}
                <div className="w-3/5 h-full bg-gray-100 border-r border-gray-200">
                  <MapContainer
                    ref={mapRef}
                    mapboxToken={mapboxToken}
                    phaAgencies={phaAgencies}
                    onOfficeSelect={handleOfficeClick}
                    onTokenError={setTokenError}
                    selectedOffice={selectedOffice}
                    selectedLocation={selectedLocation}
                  />
                </div>
                
                {/* Right Panel - Office List */}
                <div className="w-2/5 h-full overflow-y-auto bg-white">
                  <OfficeDetailsPanel
                    selectedOffice={selectedOffice}
                    onOfficeClick={handleOfficeClick}
                    phaAgencies={phaAgencies}
                    loading={loading}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalCount={totalCount}
                    onPageChange={handlePageChange}
                    onShowAll={clearLocationFilter}
                    hasFilter={!!filteredLocation}
                    filteredLocation={filteredLocation}
                  />
                </div>
              </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Section8;
