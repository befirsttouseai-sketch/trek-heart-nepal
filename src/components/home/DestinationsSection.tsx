import React, { useMemo } from 'react';
import { Search, Compass, Calendar, Mountain, ArrowUpRight, CheckCircle2, Plane } from 'lucide-react';
import { DESTINATIONS } from '../../data/destinations';
import { useEnquiry } from '../../context/EnquiryContext';
import { Destination } from '../../types';

export const DestinationsSection: React.FC = () => {
  const {
    categoryFilter,
    setCategoryFilter,
    searchQuery,
    setSearchQuery,
    audienceFilter,
    setAudienceFilter,
    openEnquiryModal,
    openDetailModal,
  } = useEnquiry();

  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter((dest) => {
      // Category filter
      if (categoryFilter === 'trekking' && dest.category !== 'trekking') return false;
      if (categoryFilter === 'heli-tour' && dest.category !== 'heli-tour') return false;
      if (categoryFilter === 'safari-culture' && !['jungle-safari', 'cultural-tour'].includes(dest.category)) return false;
      if (categoryFilter === 'cross-border' && dest.category !== 'cross-border') return false;

      // Audience filter
      if (audienceFilter !== 'all' && !dest.audienceFit.includes(audienceFilter)) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = dest.title.toLowerCase().includes(query);
        const matchCountry = dest.country.toLowerCase().includes(query);
        const matchRegion = dest.regionDisplay.toLowerCase().includes(query);
        const matchSummary = dest.summary.toLowerCase().includes(query);
        return matchTitle || matchCountry || matchRegion || matchSummary;
      }

      return true;
    });
  }, [categoryFilter, audienceFilter, searchQuery]);

  return (
    <section id="destinations" className="py-20 bg-[#FBFBF9] border-b border-[#E8E6DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#0E4D3E]">
              <span>Curated Himalayan Journeys</span>
              <span aria-hidden="true">·</span>
              <span>100% Eco-Friendly</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#093328] tracking-tight">
              Trekking & Adventure Destinations
            </h2>
            <p className="text-sm sm:text-base text-[#3B4642] leading-relaxed">
              Explore the iconic mountain kingdoms of the Himalayas. All journeys feature licensed local guides, 
              private group options, and ethical environmental standards. Cross-border journeys to Bhutan, Tibet, and India are customized on request.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-[#828D87] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Everest, Bhutan, Safari..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#DCD7CB] rounded-lg text-xs text-[#1C2522] focus:outline-none focus:border-[#0E4D3E] shadow-sm transition-colors"
            />
          </div>
        </div>

        {/* Filter Controls (Segmented Tabs) */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-4 border-b border-[#E8E6DE]">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F2EFE9] rounded-lg border border-[#E0DCCE]">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                categoryFilter === 'all'
                  ? 'bg-[#0E4D3E] text-white shadow-sm'
                  : 'text-[#3B4642] hover:text-[#0E4D3E]'
              }`}
            >
              All Destinations
            </button>
            <button
              onClick={() => setCategoryFilter('trekking')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                categoryFilter === 'trekking'
                  ? 'bg-[#0E4D3E] text-white shadow-sm'
                  : 'text-[#3B4642] hover:text-[#0E4D3E]'
              }`}
            >
              Nepal Classic Treks
            </button>
            <button
              onClick={() => setCategoryFilter('heli-tour')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                categoryFilter === 'heli-tour'
                  ? 'bg-[#0E4D3E] text-white shadow-sm'
                  : 'text-[#3B4642] hover:text-[#0E4D3E]'
              }`}
            >
              Himalayan Heli Tours
            </button>
            <button
              onClick={() => setCategoryFilter('safari-culture')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                categoryFilter === 'safari-culture'
                  ? 'bg-[#0E4D3E] text-white shadow-sm'
                  : 'text-[#3B4642] hover:text-[#0E4D3E]'
              }`}
            >
              Jungle Safari & Culture
            </button>
            <button
              onClick={() => setCategoryFilter('cross-border')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                categoryFilter === 'cross-border'
                  ? 'bg-[#0E4D3E] text-white shadow-sm'
                  : 'text-[#3B4642] hover:text-[#0E4D3E]'
              }`}
            >
              Bhutan, Tibet & India (On Request)
            </button>
          </div>

          {/* Quick Audience Tag Filter */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#828D87] font-medium">Style:</span>
            <select
              value={audienceFilter}
              onChange={(e) => setAudienceFilter(e.target.value as any)}
              className="bg-white border border-[#DCD7CB] text-[#1C2522] rounded px-2.5 py-1.5 focus:outline-none focus:border-[#0E4D3E] text-xs font-medium"
            >
              <option value="all">All Styles</option>
              <option value="luxury">Luxury Travelers</option>
              <option value="adventure-backpackers">Adventure Backpackers</option>
              <option value="families">Families</option>
              <option value="solo-female">Solo Female Trekkers</option>
            </select>
          </div>
        </div>

        {/* Destinations Grid */}
        {filteredDestinations.length === 0 ? (
          <div className="text-center py-16 bg-[#F2EFE9] rounded-xl border border-dashed border-[#DCD7CB]">
            <Compass className="w-10 h-10 text-[#828D87] mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#093328]">No destinations match your criteria</h3>
            <p className="text-xs text-[#5A6662] mt-1 max-w-sm mx-auto">
              Try adjusting your search terms or filters, or contact our team directly for a fully custom route.
            </p>
            <button
              onClick={() => {
                setCategoryFilter('all');
                setAudienceFilter('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-[#0E4D3E] bg-white border border-[#DCD7CB] rounded hover:bg-[#E8E4DA]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((dest: Destination) => (
              <div
                key={dest.id}
                className="bg-white border border-[#E0DCCE] rounded-xl overflow-hidden flex flex-col justify-between hover:border-[#0E4D3E] transition-all hover:shadow-lg group"
              >
                <div>
                  {/* Image container */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#F2EFE9]">
                    <img
                      src={dest.image}
                      alt={dest.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    {/* Top Scrim Tag */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <div className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-sm text-white text-[11px] font-medium">
                        {dest.regionDisplay}
                      </div>
                      {dest.isOnRequest ? (
                        <div className="px-2.5 py-1 rounded bg-[#C59B27] text-[#082F26] text-[11px] font-bold tracking-wider uppercase shadow-sm">
                          On Request
                        </div>
                      ) : (
                        <div className="px-2.5 py-1 rounded bg-[#0E4D3E] text-white text-[11px] font-medium tracking-wide">
                          {dest.startingPrice}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    {/* Clean unboxed metadata with subtle dots */}
                    <div className="flex items-center gap-2 text-xs text-[#5A6662] mb-2 font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#0E4D3E]" />
                        <span>{dest.duration}</span>
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Mountain className="w-3.5 h-3.5 text-[#0E4D3E]" />
                        <span>{dest.maxAltitude}</span>
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#0E4D3E] font-semibold">{dest.difficulty}</span>
                    </div>

                    <h3 className="text-xl font-bold font-display text-[#093328] group-hover:text-[#0E4D3E] transition-colors leading-snug">
                      {dest.title}
                    </h3>
                    <p className="text-xs text-[#828D87] font-medium mt-1 mb-3 line-clamp-1">
                      {dest.subtitle}
                    </p>
                    <p className="text-xs text-[#3B4642] leading-relaxed line-clamp-3 mb-4">
                      {dest.summary}
                    </p>

                    {/* Eco highlight tag */}
                    <div className="pt-3 border-t border-[#F2EFE9] flex items-center gap-1.5 text-[11px] text-[#0E4D3E]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C59B27] shrink-0" />
                      <span className="truncate">{dest.ecoHighlights[0]}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-6 pt-0 flex items-center gap-3">
                  <button
                    onClick={() => openDetailModal(dest)}
                    className="flex-1 py-2.5 px-3 text-xs font-semibold text-[#0E4D3E] bg-[#F6F5F0] hover:bg-[#EAE6DC] border border-[#DCD7CB] rounded transition-colors text-center"
                  >
                    View Itinerary
                  </button>
                  <button
                    onClick={() => openEnquiryModal(dest, 'general', dest.isOnRequest)}
                    className={`flex-1 py-2.5 px-3 text-xs font-semibold uppercase tracking-wider rounded transition-all text-center ${
                      dest.isOnRequest
                        ? 'bg-[#C59B27] hover:bg-[#B38A1E] text-[#082F26] shadow-sm'
                        : 'bg-[#0E4D3E] hover:bg-[#082F26] text-white shadow-sm'
                    }`}
                  >
                    {dest.isOnRequest ? 'Enquire (On Request)' : 'Enquire Now'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bhutan, Tibet & India Special Highlight Banner */}
        <div id="cross-border" className="mt-16 bg-[#082F26] rounded-2xl p-8 sm:p-10 text-white relative overflow-hidden">
          <div className="max-w-2xl space-y-4 relative z-10">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#E5C158]">
              <span>Special Cross-Border Expeditions</span>
              <span aria-hidden="true">·</span>
              <span>On Request Only</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Bhutan, Tibet & Northern India Journeys
            </h3>
            <p className="text-sm text-white/80 leading-relaxed">
              We operate exclusive, permitted journeys to Bhutan’s Tiger’s Nest, Tibet’s Lhasa & North Everest Base Camp, 
              and the sacred high valleys of Sikkim & Ladakh. All itineraries are private, tailored strictly on request, 
              and processed directly with our Kathmandu expedition office.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  const bhutanDest = DESTINATIONS.find((d) => d.id === 'bhutan-thunder-dragon') || null;
                  openEnquiryModal(bhutanDest, 'luxury', true);
                }}
                className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#082F26] bg-[#C59B27] hover:bg-[#D4AF37] rounded-md transition-all shadow-md"
              >
                Request Bhutan / Tibet Quote
              </button>
              <a
                href="mailto:trekheartnepal@gmail.com?subject=Cross-Border%20Trek%20Enquiry%20(Bhutan%2FTibet%2FIndia)"
                className="px-5 py-3 text-xs font-semibold text-white/90 hover:text-white underline underline-offset-4 transition-colors"
              >
                Direct Email: trekheartnepal@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
