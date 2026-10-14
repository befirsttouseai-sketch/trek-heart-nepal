import React from 'react';
import { Crown, Compass, Users, Sparkles, ArrowRight } from 'lucide-react';
import { TargetAudience } from '../../types';
import { useEnquiry } from '../../context/EnquiryContext';

interface AudienceCard {
  id: TargetAudience;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  perks: string[];
  recommendedTrips: string;
}

export const TargetAudienceSection: React.FC = () => {
  const { openEnquiryModal, setAudienceFilter } = useEnquiry();

  const AUDIENCES: AudienceCard[] = [
    {
      id: 'luxury',
      title: 'Luxury Himalayan Journeys',
      subtitle: 'Uncompromising Comfort & Private Heli Transfers',
      description: 'Experience the raw grandeur of the 8,000m summits while resting in hand-picked luxury lodges, enjoying gourmet dining at 3,880m, and utilizing private Airbus H125 helicopter transfers.',
      icon: Crown,
      perks: [
        'Private chartered helicopter flights with scenic flyovers',
        'Five-star heritage stays & premium Everest panoramic lodges',
        'Dedicated senior Sherpa expedition leader & private baggage team',
      ],
      recommendedTrips: 'Everest Heli Champagne Breakfast · Upper Mustang Private Safari · Bhutan Druk Deluxe',
    },
    {
      id: 'adventure-backpackers',
      title: 'Adventure & High-Pass Backpackers',
      subtitle: 'Pure Himalayan Wilderness & Technical Passes',
      description: 'For those who crave high-altitude passes, glaciated valleys, and authentic tea-house camaraderie. We handle the complex permits, logistics, and safety, leaving you free to explore the raw trail.',
      icon: Compass,
      perks: [
        'Challenging high-pass crossings (Cho La, Renjo La, Larkya La)',
        'Experienced mountain safety guides & wilderness emergency protocols',
        'Transparent ethical pricing with zero hidden fees',
      ],
      recommendedTrips: 'Manaslu Circuit Trek · Everest Three Passes · Annapurna Circuit',
    },
    {
      id: 'families',
      title: 'Families & Multi-Gen Travelers',
      subtitle: 'Gentle Pacing, Safe Trails & Cultural Wonder',
      description: 'Introduce your children to the magic of the Himalayas without stress. We design gradual acclimatization profiles, comfortable family suites, and blend scenic gentle trails with jungle wildlife safaris.',
      icon: Users,
      perks: [
        'Customized daily walking hours (3-4 hrs max) & pack-pony options',
        'Warm, child-friendly family-run tea houses with heated dining halls',
        'Wildlife safaris in Chitwan: rhinos, elephants & cultural pottery',
      ],
      recommendedTrips: 'Ghorepani Poon Hill · Chitwan Wildlife Safari · Kathmandu Valley Heritage',
    },
    {
      id: 'solo-female',
      title: 'Solo Female Travelers',
      subtitle: 'Empowered, Secure & Mentored by Female Guides',
      description: 'Trek Heart Nepal was co-founded by Karine Moix with an uncompromising commitment to female safety and women empowerment. We provide dedicated female guides on request and vetted safe lodgings.',
      icon: Sparkles,
      perks: [
        'Option for certified female Sherpa & Tamang licensed mountain guides',
        'Pre-vetted private-room lodges with trusted hosts',
        '24/7 satellite check-in & personalized communication with Karine’s team',
      ],
      recommendedTrips: 'Annapurna Sanctuary · Langtang Valley · Bhutan Cultural Pilgrimage',
    },
  ];

  return (
    <section className="py-20 bg-[#F2EFE9] border-b border-[#E8E6DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#0E4D3E]">
            <span>Tailor-Made Experience</span>
            <span aria-hidden="true">·</span>
            <span>Private & Small Groups</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#093328] tracking-tight">
            Crafted for Your Unique Himalayan Style
          </h2>
          <p className="text-sm sm:text-base text-[#3B4642] leading-relaxed">
            Whether you seek high-altitude isolation, ultra-luxury helicopter comfort, family-friendly wildlife safaris, 
            or the confidence of solo female trekking, our local Sherpa team designs the perfect route for your pace.
          </p>
        </div>

        {/* 4 Audience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {AUDIENCES.map((aud) => {
            const Icon = aud.icon;
            return (
              <div
                key={aud.id}
                className="bg-[#FBFBF9] border border-[#DCD7CB] rounded-xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#0E4D3E] transition-all hover:shadow-md group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-[#0E4D3E]/10 text-[#0E4D3E] flex items-center justify-center group-hover:bg-[#0E4D3E] group-hover:text-[#C59B27] transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-[#828D87] uppercase tracking-wider">
                      Tailored Track
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-display text-[#093328] group-hover:text-[#0E4D3E] transition-colors">
                    {aud.title}
                  </h3>
                  <p className="text-xs text-[#C59B27] font-semibold tracking-wide uppercase mt-1 mb-3">
                    {aud.subtitle}
                  </p>
                  <p className="text-sm text-[#3B4642] leading-relaxed mb-6">
                    {aud.description}
                  </p>

                  <div className="space-y-2.5 mb-6 pt-4 border-t border-[#E8E6DE]">
                    {aud.perks.map((perk, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-[#1C2522]">
                        <span className="text-[#0E4D3E] font-bold text-sm leading-none mt-0.5">✓</span>
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E8E6DE]/70 flex items-center justify-between">
                  <div className="text-[11px] text-[#5A6662] max-w-[65%] truncate">
                    <span className="font-semibold text-[#093328]">Top Choice:</span> {aud.recommendedTrips}
                  </div>
                  <button
                    onClick={() => {
                      setAudienceFilter(aud.id);
                      openEnquiryModal(null, aud.id, true);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0E4D3E] hover:text-[#082F26] group-hover:translate-x-0.5 transition-transform whitespace-nowrap"
                  >
                    <span>Plan {aud.id.replace('-', ' ')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
