import React from 'react';
import { X, Calendar, Mountain, ShieldCheck, Check, Sparkles, MapPin, Send } from 'lucide-react';
import { useEnquiry } from '../../context/EnquiryContext';

export const DestinationDetailModal: React.FC = () => {
  const { detailModalDestination, closeDetailModal, openEnquiryModal } = useEnquiry();

  if (!detailModalDestination) return null;

  const dest = detailModalDestination;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative bg-[#FBFBF9] w-full max-w-4xl rounded-2xl shadow-2xl border border-[#DCD7CB] overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header with image */}
        <div className="relative h-64 sm:h-80 shrink-0 bg-[#082F26]">
          <img
            src={dest.image}
            alt={dest.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 flex flex-col justify-between p-6">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-xs rounded font-medium flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C59B27]" />
                {dest.regionDisplay}
              </span>
              <button
                onClick={closeDetailModal}
                className="w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <div className="flex items-center gap-3 text-xs text-[#E5C158] font-semibold uppercase tracking-wider mb-1">
                <span>{dest.duration}</span>
                <span>·</span>
                <span>Max Altitude: {dest.maxAltitude}</span>
                <span>·</span>
                <span>{dest.difficulty}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
                {dest.title}
              </h2>
              <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-2xl">
                {dest.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 divide-y divide-[#E8E6DE]">
          {/* Overview & Quick Stats */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-display text-[#093328]">
              Expedition Overview
            </h3>
            <p className="text-sm text-[#3B4642] leading-relaxed">
              {dest.summary}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="p-3 bg-[#F2EFE9] rounded-lg">
                <span className="text-[11px] uppercase font-bold text-[#828D87]">Best Season</span>
                <p className="text-xs font-semibold text-[#093328] mt-0.5">{dest.idealSeason}</p>
              </div>
              <div className="p-3 bg-[#F2EFE9] rounded-lg">
                <span className="text-[11px] uppercase font-bold text-[#828D87]">Difficulty</span>
                <p className="text-xs font-semibold text-[#093328] mt-0.5">{dest.difficulty}</p>
              </div>
              <div className="p-3 bg-[#F2EFE9] rounded-lg">
                <span className="text-[11px] uppercase font-bold text-[#828D87]">Max Altitude</span>
                <p className="text-xs font-semibold text-[#093328] mt-0.5">{dest.maxAltitude}</p>
              </div>
              <div className="p-3 bg-[#F2EFE9] rounded-lg">
                <span className="text-[11px] uppercase font-bold text-[#828D87]">Investment</span>
                <p className="text-xs font-semibold text-[#0E4D3E] mt-0.5">
                  {dest.isOnRequest ? 'On Request' : dest.startingPrice}
                </p>
              </div>
            </div>
          </div>

          {/* Eco Highlights */}
          <div className="pt-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0E4D3E]">
              <Sparkles className="w-4 h-4 text-[#C59B27]" />
              <span>Eco-Responsible Highlights</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {dest.ecoHighlights.map((eco, idx) => (
                <div key={idx} className="p-3 bg-white border border-[#E0DCCE] rounded-lg text-xs text-[#3B4642] flex items-start gap-2">
                  <span className="text-[#0E4D3E] font-bold">✓</span>
                  <span>{eco}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Day by Day Itinerary */}
          <div className="pt-6 space-y-4">
            <h3 className="text-lg font-bold font-display text-[#093328]">
              Day-by-Day Itinerary Outline
            </h3>
            <div className="space-y-3">
              {dest.itinerary.map((item, idx) => (
                <div key={idx} className="p-3.5 bg-white border border-[#E0DCCE] rounded-xl flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#0E4D3E] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 font-mono">
                    {item.day || idx + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h4 className="text-sm font-bold text-[#093328]">{item.title}</h4>
                      {item.altitude && (
                        <span className="text-xs font-mono text-[#0E4D3E] font-medium bg-[#0E4D3E]/10 px-2 py-0.5 rounded">
                          {item.altitude}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#5A6662] mt-1 leading-relaxed">
                      {item.highlights}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0E4D3E] mb-3">
                What is Included
              </h4>
              <ul className="space-y-2 text-xs text-[#3B4642]">
                {dest.included.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#0E4D3E] shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#828D87] mb-3">
                What is Not Included
              </h4>
              <ul className="space-y-2 text-xs text-[#828D87]">
                {dest.excluded.map((exc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-red-400 font-bold shrink-0 mt-0.5">✕</span>
                    <span>{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-4 sm:p-6 bg-[#F2EFE9] border-t border-[#DCD7CB] flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="text-xs text-[#5A6662]">
            Questions? Contact <span className="font-semibold text-[#093328]">trekheartnepal@gmail.com</span>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={closeDetailModal}
              className="flex-1 sm:flex-initial px-4 py-2.5 text-xs font-semibold text-[#5A6662] hover:text-[#093328]"
            >
              Close
            </button>
            <button
              onClick={() => {
                closeDetailModal();
                openEnquiryModal(dest, 'general', dest.isOnRequest);
              }}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#0E4D3E] hover:bg-[#082F26] rounded-md shadow-sm transition-all"
            >
              <Send className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>{dest.isOnRequest ? 'Enquire (On Request)' : 'Enquire for This Trip'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
