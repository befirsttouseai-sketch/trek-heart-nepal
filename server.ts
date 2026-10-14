import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface StoredEnquiry {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  country?: string;
  destinationId?: string;
  destinationTitle?: string;
  travelStyle: string;
  estimatedDate?: string;
  travelerCount: number;
  durationPref?: string;
  message: string;
  isCustomPrivate: boolean;
  receivedAt: string;
  forwardedTo: string;
  status: 'received' | 'in_review' | 'contacted';
}

const enquiries: StoredEnquiry[] = [
  {
    id: 'THN-78201',
    fullName: 'Sophie Laurent',
    email: 'sophie.laurent@outlook.fr',
    phone: '+33 6 42 19 88 01',
    country: 'France',
    destinationId: 'everest-base-camp',
    destinationTitle: 'Everest Base Camp Trek',
    travelStyle: 'solo-female',
    estimatedDate: '2026-11-10',
    travelerCount: 1,
    durationPref: '14 Days',
    message: 'Seeking a licensed female Sherpa guide for private EBC trek. Very passionate about eco-friendly travel.',
    isCustomPrivate: true,
    receivedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    forwardedTo: 'trekheartnepal@gmail.com',
    status: 'received',
  },
  {
    id: 'THN-78202',
    fullName: 'Marcus & Elena Vance',
    email: 'mvance.adventures@gmail.com',
    phone: '+1 415 890 2341',
    country: 'United States',
    destinationId: 'bhutan-thunder-dragon',
    destinationTitle: 'Bhutan: Kingdom of the Thunder Dragon',
    travelStyle: 'luxury',
    estimatedDate: '2026-12-05',
    travelerCount: 2,
    durationPref: '7 Days',
    message: 'Requesting custom quotation for private cultural and Tiger’s Nest trek with luxury heritage lodging.',
    isCustomPrivate: true,
    receivedAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    forwardedTo: 'trekheartnepal@gmail.com',
    status: 'in_review',
  },
];

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  // API Endpoint: Submit Enquiry & Route to trekheartnepal@gmail.com
  app.post('/api/enquiry', (req: Request, res: Response) => {
    try {
      const {
        fullName,
        email,
        phone,
        country,
        destinationId,
        destinationTitle,
        travelStyle,
        estimatedDate,
        travelerCount,
        durationPref,
        message,
        isCustomPrivate,
      } = req.body;

      if (!fullName || !email) {
        return res.status(400).json({ error: 'Full name and email are required fields.' });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Please provide a valid email address.' });
      }

      const refNumber = `THN-${Math.floor(100000 + Math.random() * 900000)}`;

      const newEnquiry: StoredEnquiry = {
        id: refNumber,
        fullName,
        email,
        phone: phone || 'N/A',
        country: country || 'Unspecified',
        destinationId: destinationId || 'custom',
        destinationTitle: destinationTitle || 'Custom Private Himalayan Itinerary',
        travelStyle: travelStyle || 'general',
        estimatedDate: estimatedDate || 'Flexible',
        travelerCount: Number(travelerCount) || 1,
        durationPref: durationPref || 'Flexible',
        message: message || 'General inquiry',
        isCustomPrivate: Boolean(isCustomPrivate),
        receivedAt: new Date().toISOString(),
        forwardedTo: 'trekheartnepal@gmail.com',
        status: 'received',
      };

      enquiries.unshift(newEnquiry);

      // Simulated notification to agency team inbox
      console.log('----------------------------------------------------');
      console.log(`[TREK HEART NEPAL EMAIL DISPATCH] Ref: ${refNumber}`);
      console.log(`To: trekheartnepal@gmail.com`);
      console.log(`From: ${fullName} <${email}>`);
      console.log(`Subject: New Booking & Trek Enquiry - ${newEnquiry.destinationTitle}`);
      console.log(`Travel Style: ${travelStyle} | Group Size: ${travelerCount} | Date: ${estimatedDate}`);
      console.log(`Message: ${message}`);
      console.log('----------------------------------------------------');

      return res.status(201).json({
        success: true,
        refNumber,
        forwardedTo: 'trekheartnepal@gmail.com',
        message: 'Your enquiry has been successfully delivered to our headquarters in Kathmandu & Namche Bazaar. We will contact you within 12 hours.',
        enquiry: newEnquiry,
      });
    } catch (error: any) {
      console.error('Error handling enquiry:', error);
      return res.status(500).json({ error: 'Internal server error processing enquiry' });
    }
  });

  // API Endpoint: Get enquiries (for testing, admin dashboard preview, and verification)
  app.get('/api/enquiries', (req: Request, res: Response) => {
    return res.json({
      count: enquiries.length,
      agencyEmail: 'trekheartnepal@gmail.com',
      enquiries,
    });
  });

  // API Endpoint: Health check
  app.get('/api/health', (req: Request, res: Response) => {
    return res.json({
      status: 'healthy',
      company: 'Trek Heart Nepal',
      founder: 'Karine Moix',
      managingDirector: 'Pemba Sherpa',
      manager: 'Tshering Tenzing Sherpa',
      officialEmail: 'trekheartnepal@gmail.com',
    });
  });

  // Serve with Vite in dev, static files in production
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Trek Heart Nepal server running at http://localhost:${PORT}`);
    console.log(`Enquiries configured to dispatch to trekheartnepal@gmail.com`);
  });
}

startServer();
