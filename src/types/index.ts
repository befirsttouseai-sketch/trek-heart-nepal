export type Region = 'nepal' | 'bhutan' | 'tibet' | 'india';

export type Category = 
  | 'trekking' 
  | 'heli-tour' 
  | 'jungle-safari' 
  | 'cultural-tour' 
  | 'cross-border';

export type TargetAudience = 
  | 'luxury' 
  | 'adventure-backpackers' 
  | 'families' 
  | 'solo-female';

export interface ItineraryDay {
  day: number;
  title: string;
  altitude?: string;
  highlights: string;
}

export interface Destination {
  id: string;
  title: string;
  subtitle: string;
  region: Region;
  regionDisplay: string;
  country: string;
  category: Category;
  duration: string;
  maxAltitude: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Strenuous';
  idealSeason: string;
  image: string;
  summary: string;
  ecoHighlights: string[];
  startingPrice?: string;
  isOnRequest: boolean; // Tibet, Bhutan, India are "On Request"
  featured?: boolean;
  audienceFit: TargetAudience[];
  itinerary: ItineraryDay[];
  included: string[];
  excluded: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  title: string;
  origin: string;
  image: string;
  bio: string;
  quote: string;
  highlights: string[];
}

export interface EnquirySubmission {
  id?: string;
  fullName: string;
  email: string;
  phone?: string;
  country?: string;
  destinationId?: string;
  destinationTitle?: string;
  travelStyle: TargetAudience | 'general';
  estimatedDate?: string;
  travelerCount: number;
  durationPref?: string;
  message: string;
  isCustomPrivate: boolean;
  createdAt?: string;
}
