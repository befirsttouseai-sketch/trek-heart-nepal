import React from 'react';
import { ArrowRight, ShieldCheck, Mountain, Leaf, Sparkles } from 'lucide-react';
import { useEnquiry } from '../../context/EnquiryContext';

export const Hero: React.FC = () => {
  const { openEnquiryModal } = useEnquiry();

  return (
    <section className="relative overflow-hidden bg-[#FBFBF9] border-b border-[#E8E6DE]">
      {/* Background Mountain Motif */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:pt-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Value Proposition & Copy */}
          <div className="lg:col-span-7 space-y-6">
            {/* Unboxed natural kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#0E4D3E]">
              <span>Trek Heart Nepal</span>
              <span aria-hidden="true">·</span>
              <span>Kathmandu & Namche Bazaar</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#C59B27]">100% Eco-Friendly</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-[#093328] leading-[1.12] tracking-tight">
              Where the Soul of the Himalayas Meets Eco-Friendly Adventure
            </h1>

            <p className="text-base sm:text-lg text-[#3B4642] max-w-2xl leading-relaxed">
              Experience the world’s grandest mountains with deep local heritage. From legendary trails to Everest and Annapurna, 
              to private helicopter flights and tailor-made journeys into Bhutan and Tibet—guided with heart by native Sherpa leaders.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#destinations"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#0E4D3E] hover:bg-[#082F26] rounded-md shadow-sm transition-all whitespace-nowrap"
              >
                <span>Explore Expeditions</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => openEnquiryModal(null, 'luxury', true)}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#0E4D3E] bg-[#F2EFE9] hover:bg-[#E8E4DA] border border-[#DCD7CB] rounded-md transition-all whitespace-nowrap"
              >
                <span>Customize Private Journey</span>
              </button>
            </div>

            {/* Micro proof statement */}
            <div className="pt-4 flex items-center gap-6 text-xs text-[#5A6662] border-t border-[#E8E6DE]/80">
              <div className="flex items-center gap-2">
                <Mountain className="w-4 h-4 text-[#0E4D3E]" />
                <span>Everest · Annapurna · Manaslu · Mustang</span>
              </div>
              <span aria-hidden="true" className="text-neutral-300">|</span>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C59B27]" />
                <span>Cross-Border: Bhutan & Tibet</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-[#DCD7CB] shadow-lg bg-[#F2EFE9] group">
              <img
                src="/src/assets/images/hero_himalayas_nepal_1791965071383.jpg"
                alt="Sunrise over Mount Everest and Ama Dablam with fluttering prayer flags in Nepal"
                className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              {/* Measured contrast scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                <div className="text-xs uppercase font-mono tracking-widest text-[#E5C158] font-medium">
                  Everest Region · Solukhumbu
                </div>
                <div className="text-lg font-bold font-display leading-tight text-white mt-1">
                  Sunrise at Ama Dablam & Khumbu Valley
                </div>
                <div className="text-xs text-white/80 mt-1 flex items-center gap-2">
                  <span>Namche Bazaar Native Operations</span>
                  <span>·</span>
                  <span>Zero-Single-Use Plastic</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Feature/KPI Strip below the hero split */}
        <div className="mt-14 pt-8 border-t border-[#E8E6DE] grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#0E4D3E]">
              <Leaf className="w-4 h-4 text-[#0E4D3E]" />
              <span className="text-xs uppercase font-semibold tracking-wider">100% Eco-Friendly</span>
            </div>
            <p className="text-sm font-bold text-[#093328]">Leave No Trace Certified</p>
            <p className="text-xs text-[#5A6662]">Filtered mountain spring water, zero plastic waste, and carbon offset travel.</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#0E4D3E]">
              <Mountain className="w-4 h-4 text-[#0E4D3E]" />
              <span className="text-xs uppercase font-semibold tracking-wider">Local Sherpa Guides</span>
            </div>
            <p className="text-sm font-bold text-[#093328]">Namche & Everest Natives</p>
            <p className="text-xs text-[#5A6662]">Ancestral mountain knowledge, certified safety, and cultural integrity.</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#0E4D3E]">
              <ShieldCheck className="w-4 h-4 text-[#0E4D3E]" />
              <span className="text-xs uppercase font-semibold tracking-wider">Fair Porter Welfare</span>
            </div>
            <p className="text-sm font-bold text-[#093328]">Ethical Employment Code</p>
            <p className="text-xs text-[#5A6662]">Generous living wages, warm mountain gear, and comprehensive medical insurance.</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#0E4D3E]">
              <Sparkles className="w-4 h-4 text-[#C59B27]" />
              <span className="text-xs uppercase font-semibold tracking-wider">Custom Private Routes</span>
            </div>
            <p className="text-sm font-bold text-[#093328]">Personalized Pace & Style</p>
            <p className="text-xs text-[#5A6662]">Tailored for luxury travelers, families, solo female trekkers, and adventurers.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
