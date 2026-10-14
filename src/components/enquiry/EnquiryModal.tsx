import React, { useState, useEffect } from 'react';
import { X, Send, Mail, CheckCircle2, ShieldCheck, Phone, MapPin, Users, Calendar } from 'lucide-react';
import { useEnquiry } from '../../context/EnquiryContext';
import { DESTINATIONS } from '../../data/destinations';
import { TargetAudience } from '../../types';

export const EnquiryModal: React.FC = () => {
  const {
    isEnquiryModalOpen,
    closeEnquiryModal,
    selectedDestination,
    selectedAudience,
    isCustomTrip,
    submitEnquiry,
    generateMailtoLink,
  } = useEnquiry();

  const [destinationId, setDestinationId] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [travelStyle, setTravelStyle] = useState<TargetAudience | 'general'>('general');
  const [estimatedDate, setEstimatedDate] = useState('');
  const [travelerCount, setTravelerCount] = useState(2);
  const [durationPref, setDurationPref] = useState('Standard Itinerary');
  const [message, setMessage] = useState('');
  const [isCustom, setIsCustom] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (selectedDestination) {
      setDestinationId(selectedDestination.id);
      setIsCustom(selectedDestination.isOnRequest);
    } else {
      setDestinationId('');
      setIsCustom(isCustomTrip);
    }

    if (selectedAudience) {
      setTravelStyle(selectedAudience);
    }
  }, [selectedDestination, selectedAudience, isCustomTrip, isEnquiryModalOpen]);

  if (!isEnquiryModalOpen) return null;

  const currentDest = DESTINATIONS.find((d) => d.id === destinationId) || selectedDestination;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      setErrorMessage('Please provide your name and email address.');
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    const submissionData = {
      fullName,
      email,
      phone,
      country,
      destinationId: currentDest?.id || 'custom',
      destinationTitle: currentDest?.title || 'Custom Himalayan Itinerary',
      travelStyle,
      estimatedDate,
      travelerCount: Number(travelerCount),
      durationPref,
      message,
      isCustomPrivate: isCustom,
    };

    try {
      const result = await submitEnquiry(submissionData);
      setSubmittedRef(result.refNumber || `THN-${Date.now().toString().slice(-6)}`);
    } catch (err: any) {
      setErrorMessage(err.message || 'Error sending enquiry');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentSubmissionPayload = {
    fullName: fullName || 'Himalayan Traveler',
    email,
    phone,
    country,
    destinationId: currentDest?.id || 'custom',
    destinationTitle: currentDest?.title || 'Custom Himalayan Itinerary',
    travelStyle,
    estimatedDate,
    travelerCount: Number(travelerCount),
    durationPref,
    message,
    isCustomPrivate: isCustom,
  };

  const mailtoLink = generateMailtoLink(currentSubmissionPayload);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative bg-[#FBFBF9] w-full max-w-2xl rounded-2xl shadow-2xl border border-[#DCD7CB] overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#082F26] text-white p-6 flex items-start justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#E5C158] mb-1">
              <span>Direct Booking & Inquiry</span>
              <span>·</span>
              <span>trekheartnepal@gmail.com</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              {currentDest ? `Enquiry: ${currentDest.title}` : 'Plan Your Private Himalayan Journey'}
            </h3>
            {currentDest?.isOnRequest && (
              <span className="inline-block mt-1 text-[11px] font-semibold text-[#C59B27] uppercase tracking-wider">
                * Note: Bhutan, Tibet & India trips are processed on custom request
              </span>
            )}
          </div>
          <button
            onClick={closeEnquiryModal}
            className="w-8 h-8 rounded-full bg-white/10 text-white/80 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {submittedRef ? (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#0E4D3E]/10 text-[#0E4D3E] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h4 className="text-2xl font-bold font-display text-[#093328]">
                  Enquiry Successfully Dispatched!
                </h4>
                <p className="text-xs font-mono font-bold text-[#C59B27]">
                  Booking Reference: #{submittedRef}
                </p>
                <p className="text-sm text-[#3B4642] max-w-md mx-auto leading-relaxed">
                  Your inquiry has been delivered directly to <span className="font-semibold text-[#093328]">trekheartnepal@gmail.com</span>. 
                  Karine Moix, Pemba Sherpa, and our operations desk in Namche Bazaar will review your dates and provide a detailed quotation within 12 hours.
                </p>
              </div>

              {/* Mail client backup option */}
              <div className="pt-4 p-4 bg-[#F2EFE9] rounded-xl border border-[#DCD7CB] text-xs text-[#5A6662] space-y-3">
                <p className="font-medium text-[#093328]">
                  Want an instant confirmation in your personal email app?
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                  <a
                    href={mailtoLink}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0E4D3E] text-white rounded text-xs font-semibold hover:bg-[#082F26]"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#C59B27]" />
                    <span>Open in Email App (mailto:trekheartnepal@gmail.com)</span>
                  </a>
                  <a
                    href="https://wa.me/9779851000000"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 text-white rounded text-xs font-semibold hover:bg-emerald-800"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>WhatsApp Desk (+977)</span>
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={closeEnquiryModal}
                  className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0E4D3E] bg-[#F2EFE9] border border-[#DCD7CB] rounded hover:bg-[#EAE6DC]"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded">
                  {errorMessage}
                </div>
              )}

              {/* Destination & Travel Style */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#093328] mb-1">
                    Destination / Route
                  </label>
                  <select
                    value={destinationId}
                    onChange={(e) => setDestinationId(e.target.value)}
                    className="w-full bg-white border border-[#DCD7CB] rounded-lg p-2.5 text-xs text-[#1C2522] focus:outline-none focus:border-[#0E4D3E]"
                  >
                    <option value="">Custom Tailored Itinerary</option>
                    {DESTINATIONS.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.title} ({d.isOnRequest ? 'On Request' : d.country})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#093328] mb-1">
                    Travel Style
                  </label>
                  <select
                    value={travelStyle}
                    onChange={(e) => setTravelStyle(e.target.value as any)}
                    className="w-full bg-white border border-[#DCD7CB] rounded-lg p-2.5 text-xs text-[#1C2522] focus:outline-none focus:border-[#0E4D3E]"
                  >
                    <option value="general">Classic Guided Trek</option>
                    <option value="luxury">Luxury Private (Heli & Heritage Lodges)</option>
                    <option value="adventure-backpackers">Adventure / High Pass Backpacking</option>
                    <option value="families">Family Journey (Kids Friendly)</option>
                    <option value="solo-female">Solo Female Traveler (Female Guide Option)</option>
                  </select>
                </div>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#093328] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full bg-white border border-[#DCD7CB] rounded-lg p-2.5 text-xs text-[#1C2522] focus:outline-none focus:border-[#0E4D3E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#093328] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. sarah@example.com"
                    className="w-full bg-white border border-[#DCD7CB] rounded-lg p-2.5 text-xs text-[#1C2522] focus:outline-none focus:border-[#0E4D3E]"
                  />
                </div>
              </div>

              {/* Phone & Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#093328] mb-1">
                    WhatsApp / Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +1 555 234 5678"
                    className="w-full bg-white border border-[#DCD7CB] rounded-lg p-2.5 text-xs text-[#1C2522] focus:outline-none focus:border-[#0E4D3E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#093328] mb-1">
                    Country of Residence
                  </label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="e.g. Switzerland, Australia, USA"
                    className="w-full bg-white border border-[#DCD7CB] rounded-lg p-2.5 text-xs text-[#1C2522] focus:outline-none focus:border-[#0E4D3E]"
                  />
                </div>
              </div>

              {/* Group Size & Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#093328] mb-1">
                    Number of Guests
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={25}
                    value={travelerCount}
                    onChange={(e) => setTravelerCount(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full bg-white border border-[#DCD7CB] rounded-lg p-2.5 text-xs text-[#1C2522] focus:outline-none focus:border-[#0E4D3E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#093328] mb-1">
                    Estimated Travel Date
                  </label>
                  <input
                    type="text"
                    value={estimatedDate}
                    onChange={(e) => setEstimatedDate(e.target.value)}
                    placeholder="e.g. Oct 2026 / Spring 2027"
                    className="w-full bg-white border border-[#DCD7CB] rounded-lg p-2.5 text-xs text-[#1C2522] focus:outline-none focus:border-[#0E4D3E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#093328] mb-1">
                    Trip Duration
                  </label>
                  <select
                    value={durationPref}
                    onChange={(e) => setDurationPref(e.target.value)}
                    className="w-full bg-white border border-[#DCD7CB] rounded-lg p-2.5 text-xs text-[#1C2522] focus:outline-none focus:border-[#0E4D3E]"
                  >
                    <option value="Standard Itinerary">Standard (As Published)</option>
                    <option value="Shorter (7-10 Days)">Shorter (7-10 Days)</option>
                    <option value="Extended (14-21 Days)">Extended (14-21 Days)</option>
                    <option value="Custom Flexible">Custom / Flexible</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#093328] mb-1">
                  Special Notes & Requests
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your mountain experience, desire for female guide, private helicopter options, or Bhutan/Tibet border permits."
                  className="w-full bg-white border border-[#DCD7CB] rounded-lg p-2.5 text-xs text-[#1C2522] focus:outline-none focus:border-[#0E4D3E]"
                />
              </div>

              {/* Checkbox for custom private */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="customPrivateCheck"
                  checked={isCustom}
                  onChange={(e) => setIsCustom(e.target.checked)}
                  className="rounded border-[#DCD7CB] text-[#0E4D3E] focus:ring-[#0E4D3E]"
                />
                <label htmlFor="customPrivateCheck" className="text-xs text-[#3B4642] select-none">
                  Request a 100% private customized itinerary (no joining group)
                </label>
              </div>

              {/* Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:flex-1 py-3 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#0E4D3E] hover:bg-[#082F26] rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  <Send className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span>{isSubmitting ? 'Dispatching...' : 'Send Enquiry to trekheartnepal@gmail.com'}</span>
                </button>
                <a
                  href={mailtoLink}
                  className="w-full sm:w-auto py-3 px-4 text-xs font-semibold text-[#0E4D3E] bg-[#F2EFE9] hover:bg-[#EAE6DC] border border-[#DCD7CB] rounded-lg text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span>Direct Mailto</span>
                </a>
              </div>

              <div className="text-[11px] text-[#828D87] text-center flex items-center justify-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0E4D3E]" />
                <span>All enquiries are received by Karine Moix & the Namche Sherpa Operations Office.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
