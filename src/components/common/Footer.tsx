import React from 'react';
import { Compass, Mail, Phone, MapPin, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#082F26] text-[#E8E6DE] pt-16 pb-12 border-t border-[#041E18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand & Story */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-[#0E4D3E] flex items-center justify-center text-[#C59B27]">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold font-display text-white tracking-tight">
                TREK HEART NEPAL
              </span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed">
              Founded by Karine Moix, Pemba Sherpa, and Tshering Tenzing Sherpa. 
              We offer authentic, 100% eco-friendly Himalayan trekking, helicopter tours, 
              and cross-border expeditions in Nepal, Bhutan, Tibet, and India, dedicated to empowering local mountain communities.
            </p>
            <div className="text-xs text-[#E5C158] font-medium flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 fill-[#E5C158]" />
              <span>Generating sustainable, dignified jobs for the people of Nepal.</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C59B27]">
              Destinations
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li><a href="#destinations" className="hover:text-white transition-colors">Everest Base Camp</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Annapurna Sanctuary</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Langtang Valley</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Upper Mustang Kingdom</a></li>
              <li><a href="#heli-tours" className="hover:text-white transition-colors">Himalayan Heli Tours</a></li>
              <li><a href="#cross-border" className="hover:text-white transition-colors">Bhutan & Tibet (On Request)</a></li>
            </ul>
          </div>

          {/* Travel Tracks */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C59B27]">
              Custom Tracks
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li><a href="#trip-planner" className="hover:text-white transition-colors">Luxury Private Treks</a></li>
              <li><a href="#trip-planner" className="hover:text-white transition-colors">Adventure Backpackers</a></li>
              <li><a href="#trip-planner" className="hover:text-white transition-colors">Family Journeys with Kids</a></li>
              <li><a href="#trip-planner" className="hover:text-white transition-colors">Solo Female Travelers</a></li>
              <li><a href="#eco-pledge" className="hover:text-white transition-colors">Leave No Trace Pledge</a></li>
            </ul>
          </div>

          {/* Direct Office & Contact */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C59B27]">
              Official Contact & Inquiries
            </h4>
            <div className="space-y-2 text-xs text-white/75">
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                <div>
                  <a
                    href="mailto:trekheartnepal@gmail.com"
                    className="font-mono text-[#E5C158] hover:underline"
                  >
                    trekheartnepal@gmail.com
                  </a>
                  <p className="text-[11px] text-white/50">Direct inbox for all booking & custom route enquiries</p>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <MapPin className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Kathmandu Head Office</p>
                  <p className="text-[11px] text-white/60">Thamel Marg, Ward 26, Kathmandu, Nepal</p>
                  <p className="font-semibold text-white mt-1">Khumbu Field Operations</p>
                  <p className="text-[11px] text-white/60">Namche Bazaar (Gateway of Everest), Solukhumbu</p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1 font-mono">
                <Phone className="w-4 h-4 text-[#C59B27] shrink-0" />
                <span>+977 9851 000000 (24/7 Mountain Emergency WhatsApp)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Accreditations & Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-white/50">
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1 text-white/70">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>Govt. of Nepal Reg. #14892/080</span>
            </span>
            <span>·</span>
            <span>TAAN Member</span>
            <span>·</span>
            <span>Nepal Mountaineering Association (NMA)</span>
            <span>·</span>
            <span>KEEP Certified Eco-Operator</span>
          </div>

          <div className="text-center md:text-right">
            © {new Date().getFullYear()} Trek Heart Nepal Pvt. Ltd. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
