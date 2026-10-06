import { RsvpSubmission } from '../types';
import { CheckCircle, RotateCcw } from 'lucide-react';

interface ConfirmationProps {
  submission: RsvpSubmission;
  onReset: () => void;
}

const POTLUCK_LABELS: Record<string, string> = {
  tequila: 'Tequila/Vodka Bottle',
  beer: '6-Pack Beer/Cider',
  wine: 'Wine/Prosecco',
  mixers: 'Mixers/Sodas',
  ice: 'Bag of Ice & Cups',
  suya: 'Suya / Wings',
  pizza: 'Pizza',
  chips: 'Chips & Dip',
  dessert: 'Dessert / Sweets',
  cards: 'Cards Against Humanity',
  'drinking-games': 'Drinking Card Games',
  controller: 'Extra Controller',
};

const ATTENDANCE_LABELS: Record<string, string> = {
  locked_in: '🔥 100% Locked In',
  late: '⏳ Pulling Up Late',
  ghosting: '👻 Respectfully Ghosting',
};

export const Confirmation = ({ submission, onReset }: ConfirmationProps) => {
  const itemNames = [
    ...submission.potluckItems.map(id => POTLUCK_LABELS[id] || id),
    ...(submission.customItem ? [submission.customItem] : [])
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 pb-12">
      <div className="backdrop-blur-lg bg-gray-800/80 border border-gray-700/70 rounded-3xl p-6 md:p-8 text-center space-y-6">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-400" />
          </div>
        </div>

        {/* Heading */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">You're In, {submission.name}!</h2>
          <p className="text-gray-400">Your RSVP has been secured</p>
        </div>

        {/* Guest Pass Card */}
        <div className="backdrop-blur-md bg-gray-800/60 border border-gray-700/50 rounded-2xl p-6 text-left space-y-4">
          <div className="flex items-center justify-between border-b border-gray-700 pb-4">
            <span className="text-gray-400">Status</span>
            <span className="text-white font-medium">{ATTENDANCE_LABELS[submission.attendance]}</span>
          </div>

          {submission.contact && (
            <div className="flex items-center justify-between border-b border-gray-700 pb-4">
              <span className="text-gray-400">Contact</span>
              <span className="text-white font-medium">{submission.contact}</span>
            </div>
          )}

          {itemNames.length > 0 && (
            <div className="border-b border-gray-700 pb-4">
              <span className="text-gray-400 block mb-2">Bringing</span>
              <div className="flex flex-wrap gap-2">
                {itemNames.map((item, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {submission.songRequest && (
            <div className="border-b border-gray-700 pb-4">
              <span className="text-gray-400 block mb-2">Song Request</span>
              <p className="text-white text-sm">{submission.songRequest}</p>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-gray-400">Parking</span>
            <span className="text-white font-medium">
              {submission.parking === 'need_spot' ? '🚗 Parking Spot Reserved' :
               submission.parking === 'carpool' ? '👥 Carpooling' : '🚕 Rideshare'}
            </span>
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 w-full py-4 px-6 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-medium transition-all"
        >
          <RotateCcw className="w-5 h-5" />
          Submit Another RSVP
        </button>
      </div>
    </div>
  );
};
