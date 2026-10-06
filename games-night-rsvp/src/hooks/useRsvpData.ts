import { useState, useEffect } from 'react';
import { RsvpSubmission, RsvpStats } from '../types';
import { storage } from '../utils/storage';

export const useRsvpData = () => {
  const [submissions, setSubmissions] = useState<RsvpSubmission[]>([]);
  const [stats, setStats] = useState<RsvpStats>({
    confirmed: 0,
    parkingClaimed: 0,
    parkingTotal: 8,
    potluckItems: 0
  });

  useEffect(() => {
    const loadData = () => {
      const data = storage.getSubmissions();
      setSubmissions(data);
      setStats(storage.getStats());
    };

    loadData();

    // Listen for storage changes from other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'games-night-rsvps') {
        loadData();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const addSubmission = (submission: RsvpSubmission) => {
    storage.saveSubmission(submission);
    const updated = storage.getSubmissions();
    setSubmissions(updated);
    setStats(storage.getStats());
  };

  const clearAll = () => {
    storage.clearSubmissions();
    setSubmissions([]);
    setStats(storage.getStats());
  };

  return {
    submissions,
    stats,
    addSubmission,
    clearAll,
    remainingParking: storage.getRemainingParking()
  };
};
