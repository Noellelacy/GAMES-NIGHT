import { RsvpSubmission, RsvpStats } from '../types';

const STORAGE_KEY = 'games-night-rsvps';
const PARKING_TOTAL = 8;

export const STORAGE_CONFIG = {
  SUBMISSION_WEBHOOK_URL: '' // Add your Google Apps Script or Supabase endpoint here
};

export const storage = {
  getSubmissions: (): RsvpSubmission[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  },

  saveSubmission: (submission: RsvpSubmission): void => {
    try {
      const submissions = storage.getSubmissions();
      submissions.push(submission);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },

  clearSubmissions: (): void => {
    localStorage.removeItem(STORAGE_KEY);
  },

  getStats: (): RsvpStats => {
    const submissions = storage.getSubmissions();
    const confirmed = submissions.filter(s => s.attendance === 'locked_in' || s.attendance === 'late').length;
    const parkingClaimed = submissions.filter(s => s.parking === 'need_spot').length;
    const potluckItems = submissions.reduce((acc, s) => acc + s.potluckItems.length + (s.customItem ? 1 : 0), 0);

    return {
      confirmed,
      parkingClaimed,
      parkingTotal: PARKING_TOTAL,
      potluckItems
    };
  },

  getRemainingParking: (): number => {
    const stats = storage.getStats();
    return Math.max(0, stats.parkingTotal - stats.parkingClaimed);
  }
};

export const submitToWebhook = async (data: RsvpSubmission): Promise<boolean> => {
  if (!STORAGE_CONFIG.SUBMISSION_WEBHOOK_URL) {
    return false;
  }

  try {
    await fetch(STORAGE_CONFIG.SUBMISSION_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return true;
  } catch (error) {
    console.error('Error submitting to webhook:', error);
    return false;
  }
};
