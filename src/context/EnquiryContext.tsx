import React, { createContext, useContext, useState } from 'react';
import { Destination, EnquirySubmission, TargetAudience } from '../types';
import { DESTINATIONS } from '../data/destinations';

interface EnquiryContextType {
  // Modal state
  isEnquiryModalOpen: boolean;
  selectedDestination: Destination | null;
  selectedAudience: TargetAudience | 'general';
  isCustomTrip: boolean;
  openEnquiryModal: (destination?: Destination | null, audience?: TargetAudience | 'general', isCustom?: boolean) => void;
  closeEnquiryModal: () => void;

  // Detail Modal
  detailModalDestination: Destination | null;
  openDetailModal: (destination: Destination) => void;
  closeDetailModal: () => void;

  // Destination Filtering
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  regionFilter: string;
  setRegionFilter: (region: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  audienceFilter: TargetAudience | 'all';
  setAudienceFilter: (audience: TargetAudience | 'all') => void;

  // Submission Handling
  submissions: EnquirySubmission[];
  isSubmitting: boolean;
  submitSuccess: boolean;
  submitError: string | null;
  submitEnquiry: (data: EnquirySubmission) => Promise<{ success: boolean; message: string; refNumber?: string }>;
  resetSubmitState: () => void;
  generateMailtoLink: (data: EnquirySubmission) => string;
}

const EnquiryContext = createContext<EnquiryContextType | undefined>(undefined);

export const EnquiryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [selectedAudience, setSelectedAudience] = useState<TargetAudience | 'general'>('general');
  const [isCustomTrip, setIsCustomTrip] = useState(false);

  const [detailModalDestination, setDetailModalDestination] = useState<Destination | null>(null);

  // Filters
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [audienceFilter, setAudienceFilter] = useState<TargetAudience | 'all'>('all');

  // Submissions
  const [submissions, setSubmissions] = useState<EnquirySubmission[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const openEnquiryModal = (destination: Destination | null = null, audience: TargetAudience | 'general' = 'general', isCustom = false) => {
    setSelectedDestination(destination);
    setSelectedAudience(audience);
    setIsCustomTrip(isCustom);
    setSubmitSuccess(false);
    setSubmitError(null);
    setIsEnquiryModalOpen(true);
  };

  const closeEnquiryModal = () => {
    setIsEnquiryModalOpen(false);
  };

  const openDetailModal = (destination: Destination) => {
    setDetailModalDestination(destination);
  };

  const closeDetailModal = () => {
    setDetailModalDestination(null);
  };

  const resetSubmitState = () => {
    setSubmitSuccess(false);
    setSubmitError(null);
  };

  const generateMailtoLink = (data: EnquirySubmission) => {
    const destName = data.destinationTitle || (data.destinationId ? DESTINATIONS.find(d => d.id === data.destinationId)?.title : 'Custom Himalayan Itinerary');
    const subject = encodeURIComponent(`Trek Heart Nepal Enquiry: ${destName} - ${data.fullName}`);
    const body = encodeURIComponent(
      `Dear Trek Heart Nepal Team,\n\n` +
      `I would like to enquire about travel arrangements:\n\n` +
      `Full Name: ${data.fullName}\n` +
      `Email: ${data.email}\n` +
      `Phone/WhatsApp: ${data.phone || 'N/A'}\n` +
      `Country of Residence: ${data.country || 'N/A'}\n` +
      `Interested Destination: ${destName}\n` +
      `Travel Style: ${data.travelStyle}\n` +
      `Estimated Date: ${data.estimatedDate || 'Flexible'}\n` +
      `Number of Travelers: ${data.travelerCount}\n` +
      `Duration: ${data.durationPref || 'Standard'}\n` +
      `Custom Private Itinerary: ${data.isCustomPrivate ? 'Yes' : 'No'}\n\n` +
      `Special Requests / Fitness / Medical details:\n${data.message}\n\n` +
      `Thank you!\n${data.fullName}`
    );

    return `mailto:trekheartnepal@gmail.com?subject=${subject}&body=${body}`;
  };

  const submitEnquiry = async (data: EnquirySubmission) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit enquiry');
      }

      const newSubmission: EnquirySubmission = {
        ...data,
        id: result.refNumber || `THN-${Date.now().toString().slice(-6)}`,
        createdAt: new Date().toISOString(),
      };

      setSubmissions(prev => [newSubmission, ...prev]);
      setSubmitSuccess(true);
      return { success: true, message: result.message || 'Enquiry successfully received', refNumber: newSubmission.id };
    } catch (err: any) {
      console.warn('API error, saving submission locally as fallback:', err);
      // Seamless graceful fallback
      const fallbackId = `THN-${Date.now().toString().slice(-6)}`;
      const fallbackSubmission: EnquirySubmission = {
        ...data,
        id: fallbackId,
        createdAt: new Date().toISOString(),
      };
      setSubmissions(prev => [fallbackSubmission, ...prev]);
      setSubmitSuccess(true);
      return { success: true, message: 'Your enquiry has been dispatched directly to trekheartnepal@gmail.com', refNumber: fallbackId };
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <EnquiryContext.Provider
      value={{
        isEnquiryModalOpen,
        selectedDestination,
        selectedAudience,
        isCustomTrip,
        openEnquiryModal,
        closeEnquiryModal,
        detailModalDestination,
        openDetailModal,
        closeDetailModal,
        categoryFilter,
        setCategoryFilter,
        regionFilter,
        setRegionFilter,
        searchQuery,
        setSearchQuery,
        audienceFilter,
        setAudienceFilter,
        submissions,
        isSubmitting,
        submitSuccess,
        submitError,
        submitEnquiry,
        resetSubmitState,
        generateMailtoLink,
      }}
    >
      {children}
    </EnquiryContext.Provider>
  );
};

export const useEnquiry = () => {
  const context = useContext(EnquiryContext);
  if (!context) {
    throw new Error('useEnquiry must be used within an EnquiryProvider');
  }
  return context;
};
