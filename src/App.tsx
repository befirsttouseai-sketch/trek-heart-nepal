import React from 'react';
import { EnquiryProvider } from './context/EnquiryContext';
import { Header } from './components/common/Header';
import { Hero } from './components/home/Hero';
import { TargetAudienceSection } from './components/home/TargetAudienceSection';
import { DestinationsSection } from './components/home/DestinationsSection';
import { TeamSection } from './components/home/TeamSection';
import { EcoPledgeSection } from './components/home/EcoPledgeSection';
import { CustomTripPlanner } from './components/home/CustomTripPlanner';
import { Footer } from './components/common/Footer';
import { EnquiryModal } from './components/enquiry/EnquiryModal';
import { DestinationDetailModal } from './components/destinations/DestinationDetailModal';

export default function App() {
  return (
    <EnquiryProvider>
      <div className="min-h-screen flex flex-col bg-[#FBFBF9] text-[#1C2522]">
        {/* Navigation */}
        <Header />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* Hero Section */}
          <Hero />

          {/* Target Audience Tracks: Luxury / Adventure Backpackers / Families / Solo Female */}
          <TargetAudienceSection />

          {/* Destinations: Nepal Treks, Heli Tours, Jungle Safari & Bhutan/Tibet On Request */}
          <DestinationsSection />

          {/* Leadership & Sherpa Team: Karine Moix, Pemba Sherpa, Tshering Tenzing Sherpa */}
          <TeamSection />

          {/* 100% Eco-Friendly & Ethical Porter Welfare */}
          <EcoPledgeSection />

          {/* Interactive Custom Itinerary Builder with direct dispatch to trekheartnepal@gmail.com */}
          <CustomTripPlanner />
        </main>

        {/* Footer */}
        <Footer />

        {/* Interactive Modals */}
        <EnquiryModal />
        <DestinationDetailModal />
      </div>
    </EnquiryProvider>
  );
}
