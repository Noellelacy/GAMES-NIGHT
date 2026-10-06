export type AttendanceStatus = 'locked_in' | 'late' | 'ghosting';
export type DrinkingVibe = 'drinking' | 'light' | 'sober';
export type ParkingStatus = 'need_spot' | 'carpool' | 'rideshare';

export interface PotluckItem {
  id: string;
  name: string;
  category: 'booze' | 'bites' | 'gear';
}

export interface RsvpSubmission {
  id: string;
  name: string;
  contact?: string;
  attendance: AttendanceStatus;
  drinkingVibe: DrinkingVibe;
  parking: ParkingStatus;
  potluckItems: string[];
  customItem?: string;
  songRequest?: string;
  timestamp: number;
}

export interface RsvpStats {
  confirmed: number;
  parkingClaimed: number;
  parkingTotal: number;
  potluckItems: number;
}
