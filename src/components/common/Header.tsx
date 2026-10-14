import React, { useState } from 'react';
import { Compass, Menu, X, Mail, Phone } from 'lucide-react';
import { useEnquiry } from '../../context/EnquiryContext';

export const Header: React.FC = () => {
  const { openEnquiryModal } = useEnquiry();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FBFBF9]/95 backdrop-blur-md border-b border-[#E8E6DE]">
      {/* Top micro announcement bar */}
      <div className="bg-[#082F26] text-[#E8E6DE] text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-[#C59B27] font-semibold tracking-wide">100% Eco-Friendly</span>
            <span className="hidden sm:inline text-white/50">·</span>
            <span className="hidden sm:inline">Certified Local Sherpa Guides</span>
            <span className="hidden md:inline text-white/50">·</span>
            <span className="hidden md:inline">Private & Tailor-Made Itineraries</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <a
              href="mailto:trekheartnepal@gmail.com"
              className="flex items-center gap-1.5 text-white/90 hover:text-[#C59B27] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#C59B27]" />
              <span className="hidden sm:inline">trekheartnepal@gmail.com</span>
            </a>
            <span className="text-white/30">|</span>
            <a
              href="https://wa.me/9779851000000"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-white/90 hover:text-[#C59B27] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C59B27]" />
              <span className="hidden sm:inline">Kathmandu & Namche HQ</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract: 3 Zones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element with logo emblem) */}
        <a href="#" className="flex items-center gap-3 shrink-0 group">
          <div className="w-10 h-10 rounded-lg bg-[#0E4D3E] flex items-center justify-center text-[#C59B27] shadow-sm group-hover:scale-105 transition-transform">
            <Compass className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-bold font-display tracking-tight text-[#0E4D3E] whitespace-nowrap">
              TREK HEART NEPAL
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#828D87] font-semibold">
              Himalayan Expeditions
            </span>
          </div>
        </a>

        {/* Zone 2: 4-5 single-line clean navigation links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#3B4642]">
          <a href="#destinations" className="hover:text-[#0E4D3E] transition-colors whitespace-nowrap shrink-0">
            Destinations
          </a>
          <a href="#heli-tours" className="hover:text-[#0E4D3E] transition-colors whitespace-nowrap shrink-0">
            Heli Tours
          </a>
          <a href="#cross-border" className="hover:text-[#0E4D3E] transition-colors whitespace-nowrap shrink-0">
            Bhutan & Tibet
          </a>
          <a href="#team" className="hover:text-[#0E4D3E] transition-colors whitespace-nowrap shrink-0">
            Our Team
          </a>
          <a href="#eco-pledge" className="hover:text-[#0E4D3E] transition-colors whitespace-nowrap shrink-0">
            Eco Pledge
          </a>
          <a href="#trip-planner" className="hover:text-[#0E4D3E] transition-colors whitespace-nowrap shrink-0">
            Trip Planner
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="hidden sm:flex items-center gap-4 shrink-0">
          <button
            onClick={() => openEnquiryModal(null, 'general', false)}
            className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#0E4D3E] hover:bg-[#09352A] rounded-md shadow-sm transition-all whitespace-nowrap shrink-0"
          >
            Plan Your Journey
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => openEnquiryModal(null, 'general', false)}
            className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#0E4D3E] rounded"
          >
            Enquire
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#3B4642] hover:text-[#0E4D3E]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FBFBF9] border-b border-[#E8E6DE] px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2 text-base font-medium text-[#3B4642]">
            <a
              href="#destinations"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded hover:bg-[#F2EFE9]"
            >
              Destinations & Treks
            </a>
            <a
              href="#heli-tours"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded hover:bg-[#F2EFE9]"
            >
              Himalayan Heli Tours
            </a>
            <a
              href="#cross-border"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded hover:bg-[#F2EFE9]"
            >
              Bhutan, Tibet & India (On Request)
            </a>
            <a
              href="#team"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded hover:bg-[#F2EFE9]"
            >
              Founders & Sherpa Team
            </a>
            <a
              href="#eco-pledge"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded hover:bg-[#F2EFE9]"
            >
              100% Eco-Friendly Pledge
            </a>
            <a
              href="#trip-planner"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded hover:bg-[#F2EFE9]"
            >
              Custom Private Planner
            </a>
          </nav>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openEnquiryModal(null, 'general', false);
              }}
              className="w-full py-3 text-center text-xs font-semibold uppercase tracking-wider text-white bg-[#0E4D3E] rounded-md shadow-sm"
            >
              Start Travel Enquiry
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
