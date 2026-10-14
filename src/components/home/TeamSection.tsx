import React from 'react';
import { TEAM_MEMBERS } from '../../data/team';
import { Quote, MapPin, Award, HeartHandshake } from 'lucide-react';
import { useEnquiry } from '../../context/EnquiryContext';

export const TeamSection: React.FC = () => {
  const { openEnquiryModal } = useEnquiry();

  return (
    <section id="team" className="py-20 bg-[#F2EFE9] border-b border-[#E8E6DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#0E4D3E]">
            <span>Leadership & Sherpa Heritage</span>
            <span aria-hidden="true">·</span>
            <span>Namche & Kathmandu</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#093328] tracking-tight">
            Meet the Heart Behind Trek Heart Nepal
          </h2>
          <p className="text-sm sm:text-base text-[#3B4642] leading-relaxed">
            Our company was built on genuine passion for the Himalayas and an unwavering commitment to the Nepali people. 
            From our European co-founder advocating ethical community jobs to our lifelong Sherpa directors born under the shadow of Everest.
          </p>
        </div>

        {/* 3 Core Leaders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="bg-[#FBFBF9] border border-[#DCD7CB] rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#0E4D3E] transition-all hover:shadow-lg group"
            >
              <div>
                {/* Photo Header */}
                <div className="relative aspect-square overflow-hidden bg-[#E8E4DA]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Origin badge */}
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded text-xs flex items-center gap-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#C59B27]" />
                    <span>{member.origin}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7 space-y-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C59B27]">
                      {member.role}
                    </span>
                    <h3 className="text-2xl font-bold font-display text-[#093328] mt-1">
                      {member.name}
                    </h3>
                    <p className="text-xs text-[#828D87] font-medium">
                      {member.title}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-[#3B4642] leading-relaxed">
                    {member.bio}
                  </p>

                  {/* Highlights */}
                  <div className="pt-2 space-y-2 border-t border-[#E8E6DE]">
                    {member.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#1C2522]">
                        <span className="text-[#0E4D3E] font-bold">✓</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="p-4 bg-[#F2EFE9] rounded-xl border border-[#E0DCCE] relative">
                    <Quote className="w-4 h-4 text-[#C59B27] absolute top-3 right-3 opacity-60" />
                    <p className="text-xs italic text-[#3B4642] pr-4 leading-normal">
                      {member.quote}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => openEnquiryModal(null, 'general', true)}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-[#0E4D3E] bg-white border border-[#DCD7CB] hover:bg-[#0E4D3E] hover:text-white rounded-lg transition-colors text-center"
                >
                  Consult With {member.name.split(' ')[0]}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Founding Philosophy Banner */}
        <div className="mt-14 p-8 bg-white border border-[#DCD7CB] rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#0E4D3E]/10 flex items-center justify-center text-[#0E4D3E] shrink-0">
              <HeartHandshake className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#093328]">
                Karine Moix’s Social Commitment to Nepal
              </h4>
              <p className="text-xs text-[#5A6662] max-w-2xl mt-0.5">
                "Our agency was founded not just to organize treks, but to create meaningful employment, educate porter children, 
                and ensure that Himalayan tourism directly uplifts Nepali mountain families."
              </p>
            </div>
          </div>
          <button
            onClick={() => openEnquiryModal(null, 'general', true)}
            className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#0E4D3E] hover:bg-[#082F26] rounded-md transition-colors shrink-0"
          >
            Connect With Our Team
          </button>
        </div>
      </div>
    </section>
  );
};
