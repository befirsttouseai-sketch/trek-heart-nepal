import React, { useState } from 'react';
import { Sparkles, Calendar, Users, Send, CheckCircle2, ShieldCheck, Mail } from 'lucide-react';
import { DESTINATIONS } from '../../data/destinations';
import { useEnquiry } from '../../context/EnquiryContext';
import { TargetAudience } from '../../types';

export const CustomTripPlanner: React.FC = () => {
  const { submitEnquiry, generateMailtoLink } = useEnquiry();

  const [selectedDestId, setSelectedDestId] = useState(DESTINATIONS[0].id);
  const [travelStyle, setTravelStyle] = useState<TargetAudience>('luxury');
  const [travelers, setTravelers] = useState(2);
  const [estimatedMonth, setEstimatedMonth] = useState('October 2026');
  const [specialAddons, setSpecialAddons] = useState<string[]>([
    'Local Namche Sherpa guide',
    'Zero-plastic filtered water system',
  ]);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [successResult, setSuccessResult] = useState<{ ref: string; mailto: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const selectedDestination = DESTINATIONS.find((d) => d.id === selectedDestId) || DESTINATIONS[0];

  const toggleAddon = (addon: string) => {
    if (specialAddons.includes(addon)) {
      setSpecialAddons(specialAddons.filter((a) => a !== addon));
    } else {
      setSpecialAddons([...specialAddons, addon]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) {
      setErrorMsg('Please provide your name and email address.');
      return;
    }
    setErrorMsg('');
    setSubmitting(true);

    const fullMessage = `${message ? message + '\n\n' : ''}Customized Plan Details:\n- Destination: ${selectedDestination.title}\n- Target Travel Style: ${travelStyle}\n- Travelers: ${travelers}\n- Planned Window: ${estimatedMonth}\n- Selected Add-ons:\n${specialAddons.map((a) => `  * ${a}`).join('\n')}`;

    const submissionData = {
      fullName,
      email,
      phone,
      destinationId: selectedDestination.id,
      destinationTitle: selectedDestination.title,
      travelStyle,
      estimatedDate: estimatedMonth,
      travelerCount: travelers,
      message: fullMessage,
      isCustomPrivate: true,
    };

    try {
      const res = await submitEnquiry(submissionData);
      const mailto = generateMailtoLink(submissionData);
      setSuccessResult({ ref: res.refNumber || 'THN-CONFIRMED', mailto });
    } catch (err: any) {
      setErrorMsg(err.message || 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="trip-planner" className="py-20 bg-[#F2EFE9] border-b border-[#E8E6DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#0E4D3E]">
            <span>100% Tailored Private Expeditions</span>
            <span aria-hidden="true">·</span>
            <span>Direct Sherpa Consultation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#093328] tracking-tight">
            Build Your Custom Himalayan Itinerary
          </h2>
          <p className="text-sm sm:text-base text-[#3B4642] leading-relaxed">
            Every traveler is unique. Select your preferred mountain sanctuary, travel style, and tailor-made preferences. 
            Our founding directors in Kathmandu and Namche Bazaar will prepare a day-by-day customized proposal.
          </p>
        </div>

        {successResult ? (
          <div className="bg-white border border-[#0E4D3E] rounded-2xl p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-md space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#0E4D3E]/10 text-[#0E4D3E] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-2xl font-bold font-display text-[#093328]">
              Your Custom Itinerary Has Been Dispatched!
            </h3>
            <p className="text-xs font-mono text-[#C59B27] font-semibold">
              Reference #{successResult.ref} · Forwarded to trekheartnepal@gmail.com
            </p>
            <p className="text-sm text-[#3B4642] leading-relaxed max-w-lg mx-auto">
              Thank you, <span className="font-semibold text-[#093328]">{fullName}</span>. Karine Moix, Pemba Sherpa, 
              and Tshering Tenzing Sherpa have received your detailed inquiry. We will contact you with a bespoke route plan within 12 hours.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={successResult.mailto}
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#0E4D3E] hover:bg-[#082F26] rounded-md transition-all shadow-sm"
              >
                <Mail className="w-4 h-4" />
                <span>Open in Email Client (Backup)</span>
              </a>
              <button
                onClick={() => setSuccessResult(null)}
                className="px-5 py-3 text-xs font-semibold text-[#3B4642] hover:text-[#0E4D3E] transition-colors"
              >
                Plan Another Trip
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-[#DCD7CB] rounded-2xl p-6 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Step 1 & 2: Trip Details */}
            <div className="lg:col-span-7 space-y-6">
              {/* Destination Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#093328] mb-2">
                  01. Select Destination or Country
                </label>
                <select
                  value={selectedDestId}
                  onChange={(e) => setSelectedDestId(e.target.value)}
                  className="w-full bg-[#FBFBF9] border border-[#DCD7CB] text-[#1C2522] rounded-lg p-3 text-sm font-medium focus:outline-none focus:border-[#0E4D3E]"
                >
                  <optgroup label="Nepal Classic Treks">
                    {DESTINATIONS.filter((d) => d.category === 'trekking').map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.title} ({d.duration})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Helicopter Tours (Nepal)">
                    {DESTINATIONS.filter((d) => d.category === 'heli-tour').map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.title} ({d.duration})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Jungle Safari & Culture (Nepal)">
                    {DESTINATIONS.filter((d) => ['jungle-safari', 'cultural-tour'].includes(d.category)).map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.title} ({d.duration})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Cross-Border Expeditions (On Request)">
                    {DESTINATIONS.filter((d) => d.category === 'cross-border').map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.title} — {d.country} (On Request)
                      </option>
                    ))}
                  </optgroup>
                </select>
                {selectedDestination.isOnRequest && (
                  <p className="mt-1 text-xs text-[#C59B27] font-semibold">
                    * This destination is arranged on private custom request with special government permits.
                  </p>
                )}
              </div>

              {/* Travel Style Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#093328] mb-2">
                  02. Choose Your Travel Track
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'luxury', label: 'Luxury Private' },
                    { id: 'adventure-backpackers', label: 'Adventure / Backpacker' },
                    { id: 'families', label: 'Family with Kids' },
                    { id: 'solo-female', label: 'Solo Female Trek' },
                  ].map((style) => (
                    <button
                      type="button"
                      key={style.id}
                      onClick={() => setTravelStyle(style.id as TargetAudience)}
                      className={`p-3 text-xs font-medium rounded-lg border text-center transition-all ${
                        travelStyle === style.id
                          ? 'border-[#0E4D3E] bg-[#0E4D3E] text-white shadow-sm'
                          : 'border-[#DCD7CB] bg-[#FBFBF9] text-[#3B4642] hover:border-[#0E4D3E]'
                      }`}
                    >
                      {style.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Group Size & Time Window */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#093328] mb-1.5">
                    Travelers Count
                  </label>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#828D87]" />
                    <input
                      type="number"
                      min={1}
                      max={30}
                      value={travelers}
                      onChange={(e) => setTravelers(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full bg-[#FBFBF9] border border-[#DCD7CB] rounded-lg p-2.5 text-xs text-[#1C2522] focus:outline-none focus:border-[#0E4D3E]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#093328] mb-1.5">
                    Estimated Travel Month
                  </label>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#828D87]" />
                    <input
                      type="text"
                      value={estimatedMonth}
                      onChange={(e) => setEstimatedMonth(e.target.value)}
                      placeholder="e.g. October 2026, Spring 2027"
                      className="w-full bg-[#FBFBF9] border border-[#DCD7CB] rounded-lg p-2.5 text-xs text-[#1C2522] focus:outline-none focus:border-[#0E4D3E]"
                    />
                  </div>
                </div>
              </div>

              {/* Add-ons & Custom Preferences */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#093328] mb-2">
                  03. Custom Features & Inclusions
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    'Helicopter return option (save 3 walking days)',
                    'Certified female Sherpa guide',
                    'Deluxe lodge upgrade with en-suite bathrooms',
                    'Chitwan jungle safari extension (3 Days)',
                    'Private airport VIP transfer & luggage storage',
                    'Zero-plastic filtered water system',
                  ].map((addon) => {
                    const active = specialAddons.includes(addon);
                    return (
                      <button
                        type="button"
                        key={addon}
                        onClick={() => toggleAddon(addon)}
                        className={`p-2.5 text-left rounded-lg border transition-all flex items-center justify-between ${
                          active
                            ? 'border-[#0E4D3E] bg-[#0E4D3E]/5 text-[#0E4D3E] font-medium'
                            : 'border-[#E0DCCE] bg-[#FBFBF9] text-[#5A6662]'
                        }`}
                      >
                        <span className="truncate pr-2">{addon}</span>
                        <span className="font-bold">{active ? '✓' : '+'}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Step 4: Contact Info & Submission */}
            <div className="lg:col-span-5 bg-[#FBFBF9] p-6 rounded-xl border border-[#DCD7CB] flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#0E4D3E] uppercase tracking-wider mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>04. Your Contact Details</span>
                </div>
                <h4 className="text-lg font-bold font-display text-[#093328] mb-4">
                  Where should we send your quote?
                </h4>

                {errorMsg && (
                  <div className="p-3 mb-4 rounded bg-red-50 border border-red-200 text-red-700 text-xs">
                    {errorMsg}
                  </div>
                )}

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-[#5A6662] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Elena Rostova"
                      className="w-full bg-white border border-[#DCD7CB] rounded-lg p-2.5 text-xs text-[#1C2522] focus:outline-none focus:border-[#0E4D3E]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#5A6662] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. elena@example.com"
                      className="w-full bg-white border border-[#DCD7CB] rounded-lg p-2.5 text-xs text-[#1C2522] focus:outline-none focus:border-[#0E4D3E]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#5A6662] mb-1">
                      WhatsApp / Phone (with country code)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +41 79 123 4567"
                      className="w-full bg-white border border-[#DCD7CB] rounded-lg p-2.5 text-xs text-[#1C2522] focus:outline-none focus:border-[#0E4D3E]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#5A6662] mb-1">
                      Specific Notes, Fitness or Dietary Wishes
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Let us know about your fitness level, previous altitude experience, dietary needs, or specific peaks you wish to view."
                      className="w-full bg-white border border-[#DCD7CB] rounded-lg p-2.5 text-xs text-[#1C2522] focus:outline-none focus:border-[#0E4D3E]"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8E6DE] space-y-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#0E4D3E] hover:bg-[#082F26] rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  <Send className="w-4 h-4 text-[#C59B27]" />
                  <span>{submitting ? 'Submitting Enquiry...' : 'Send Enquiry to trekheartnepal@gmail.com'}</span>
                </button>
                <p className="text-[11px] text-center text-[#828D87]">
                  Dispatched straight to our Kathmandu & Namche Operations Desk. 100% spam-free.
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
