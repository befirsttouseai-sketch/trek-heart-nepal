import React from 'react';
import { Droplet, Award, ShieldAlert, HeartHandshake, Trees, Sun } from 'lucide-react';

export const EcoPledgeSection: React.FC = () => {
  const PLEDGES = [
    {
      icon: Droplet,
      title: 'Zero Single-Use Plastic Policy',
      desc: 'We supply medical-grade gravity water filters and UV sterilizers to all our groups. No plastic bottled water is purchased on trail, preventing thousands of plastic bottles from entering high alpine ecosystems annually.',
    },
    {
      icon: HeartHandshake,
      title: 'Porter Rights & Dignified Living Wage',
      desc: 'Our porters carry a strict maximum load of 20kg (well below the industry norm), receive above-market wages, hot meals, warm windproof clothing, proper mountain boots, and full healthcare insurance.',
    },
    {
      icon: Trees,
      title: 'Himalayan Reforestation Partnership',
      desc: 'For every trekker who travels with Trek Heart Nepal, we sponsor the planting of five indigenous pine, rhododendron, or walnut saplings in community reforestation projects across the Solukhumbu and Annapurna basins.',
    },
    {
      icon: Sun,
      title: 'Solar & Renewable Lodge Selection',
      desc: 'We prioritize family-run tea houses equipped with solar thermal showers and photovoltaic lighting, actively minimizing reliance on scarce high-altitude firewood and kerosene.',
    },
    {
      icon: Award,
      title: 'Leave No Trace (LNT) Principles',
      desc: 'All non-biodegradable waste generated during camping and lodge treks is packed out and transported down to municipal recycling facilities in Kathmandu.',
    },
    {
      icon: ShieldAlert,
      title: 'Grassroots Community Reinvestment',
      desc: 'A fixed 5% of all agency profits is routed directly to the Namche Village School fund and local health clinics, championing women guides and Sherpa youth mountain rescue training.',
    },
  ];

  return (
    <section id="eco-pledge" className="py-20 bg-[#FBFBF9] border-b border-[#E8E6DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#0E4D3E]">
            <span>Our Core USP & Responsibility</span>
            <span aria-hidden="true">·</span>
            <span>100% Eco-Friendly</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#093328] tracking-tight">
            Protecting the Sacred Himalayas We Call Home
          </h2>
          <p className="text-sm sm:text-base text-[#3B4642] leading-relaxed">
            The Himalayas are facing unprecedented ecological pressures. At Trek Heart Nepal, eco-friendly travel is not a marketing buzzword—it is our operating charter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PLEDGES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 bg-white border border-[#E0DCCE] rounded-xl hover:border-[#0E4D3E] transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#0E4D3E]/10 text-[#0E4D3E] flex items-center justify-center mb-4 group-hover:bg-[#0E4D3E] group-hover:text-[#C59B27] transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#093328] mb-2 font-display">
                  {item.title}
                </h3>
                <p className="text-xs text-[#5A6662] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
