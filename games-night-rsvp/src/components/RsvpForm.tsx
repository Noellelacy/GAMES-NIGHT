import { useState } from 'react';
import { AttendanceStatus, DrinkingVibe, ParkingStatus, RsvpSubmission } from '../types';
import { Fire, Clock, Ghost, GlassWater, CupSoda, Car, Users, CarTaxi, X } from 'lucide-react';

interface RsvpFormProps {
  onSubmit: (data: RsvpSubmission) => void;
  remainingParking: number;
}

const POTLUCK_OPTIONS = [
  { id: 'tequila', name: 'Tequila/Vodka Bottle', category: 'booze' as const },
  { id: 'beer', name: '6-Pack Beer/Cider', category: 'booze' as const },
  { id: 'wine', name: 'Wine/Prosecco', category: 'booze' as const },
  { id: 'mixers', name: 'Mixers/Sodas', category: 'booze' as const },
  { id: 'ice', name: 'Bag of Ice & Cups', category: 'booze' as const },
  { id: 'suya', name: 'Suya / Wings', category: 'bites' as const },
  { id: 'pizza', name: 'Pizza', category: 'bites' as const },
  { id: 'chips', name: 'Chips & Dip', category: 'bites' as const },
  { id: 'dessert', name: 'Dessert / Sweets', category: 'bites' as const },
  { id: 'cards', name: 'Cards Against Humanity', category: 'gear' as const },
  { id: 'drinking-games', name: 'Drinking Card Games', category: 'gear' as const },
  { id: 'controller', name: 'Extra Controller', category: 'gear' as const },
];

export const RsvpForm = ({ onSubmit, remainingParking }: RsvpFormProps) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [attendance, setAttendance] = useState<AttendanceStatus>('locked_in');
  const [drinkingVibe, setDrinkingVibe] = useState<DrinkingVibe>('drinking');
  const [parking, setParking] = useState<ParkingStatus>('rideshare');
  const [potluckItems, setPotluckItems] = useState<string[]>([]);
  const [customItem, setCustomItem] = useState('');
  const [songRequest, setSongRequest] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSelectParking = remainingParking > 0;

  const togglePotluckItem = (id: string) => {
    setPotluckItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);

    const submission: RsvpSubmission = {
      id: Date.now().toString(),
      name: name.trim(),
      contact: contact.trim() || undefined,
      attendance,
      drinkingVibe,
      parking,
      potluckItems,
      customItem: customItem.trim() || undefined,
      songRequest: songRequest.trim() || undefined,
      timestamp: Date.now(),
    };

    // Simulate network delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));

    onSubmit(submission);
    setIsSubmitting(false);
  };

  const attendanceOptions = [
    { value: 'locked_in' as AttendanceStatus, label: '🔥 100% Locked In', icon: Fire },
    { value: 'late' as AttendanceStatus, label: '⏳ Pulling Up Late (After 9:30 PM)', icon: Clock },
    { value: 'ghosting' as AttendanceStatus, label: '👻 Respectfully Ghosting', icon: Ghost },
  ];

  const drinkingOptions = [
    { value: 'drinking' as DrinkingVibe, label: '🍸 Down to drink / play drinking games', icon: GlassWater },
    { value: 'light' as DrinkingVibe, label: '🥂 Light sipping / casual', icon: CupSoda },
    { value: 'sober' as DrinkingVibe, label: '🧃 Designated Driver / Sober vibes', icon: CupSoda },
  ];

  const parkingOptions = [
    { value: 'need_spot' as ParkingStatus, label: '🚗 Need 1 Parking Spot', icon: Car, disabled: !canSelectParking },
    { value: 'carpool' as ParkingStatus, label: '👥 Driving + Got empty carpool seats', icon: Users },
    { value: 'rideshare' as ParkingStatus, label: '🚕 Uber / Lyft / Dropped off (No car)', icon: CarTaxi },
  ];

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto px-4 pb-12">
      <div className="backdrop-blur-lg bg-gray-800/80 border border-gray-700/70 rounded-3xl p-6 md:p-8 space-y-8">
        {/* Guest Identity */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Guest Identity</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Name / Nickname *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                placeholder="Enter your name..."
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Phone or Handle (optional)</label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                placeholder="For the group chat..."
              />
            </div>
          </div>
        </div>

        {/* Roll Call Status */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Roll Call Status</h2>
          <div className="grid grid-cols-1 gap-3">
            {attendanceOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setAttendance(option.value)}
                  className={`flex items-center gap-3 px-4 py-4 rounded-xl border-2 transition-all ${
                    attendance === option.value
                      ? 'border-pink-500 bg-pink-500/10 text-white'
                      : 'border-gray-700 bg-gray-900/30 text-gray-400 hover:border-gray-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Drinking Vibe Check */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Drinking Vibe Check</h2>
          <div className="grid grid-cols-1 gap-3">
            {drinkingOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setDrinkingVibe(option.value)}
                  className={`flex items-center gap-3 px-4 py-4 rounded-xl border-2 transition-all ${
                    drinkingVibe === option.value
                      ? 'border-purple-500 bg-purple-500/10 text-white'
                      : 'border-gray-700 bg-gray-900/30 text-gray-400 hover:border-gray-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Parking & Transit */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Parking & Transit</h2>
          <div className="grid grid-cols-1 gap-3">
            {parkingOptions.map((option) => {
              const Icon = option.icon;
              const isDisabled = option.disabled;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => !isDisabled && setParking(option.value)}
                  disabled={isDisabled}
                  className={`flex items-center gap-3 px-4 py-4 rounded-xl border-2 transition-all ${
                    parking === option.value
                      ? 'border-cyan-500 bg-cyan-500/10 text-white'
                      : isDisabled
                      ? 'border-gray-800 bg-gray-900/20 text-gray-600 cursor-not-allowed'
                      : 'border-gray-700 bg-gray-900/30 text-gray-400 hover:border-gray-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{option.label}</span>
                  {isDisabled && (
                    <span className="ml-auto text-xs text-red-400">Full</span>
                  )}
                </button>
              );
            })}
          </div>
          {remainingParking === 0 && parking === 'need_spot' && (
            <p className="text-sm text-amber-400 mt-2">
              ⚠️ Parking is full! Consider rideshare or carpooling.
            </p>
          )}
        </div>

        {/* BYOB & Potluck */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">BYOB & Potluck</h2>
          <p className="text-sm text-gray-400">Tap to select what you're bringing:</p>

          {/* Booze Section */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-pink-500 mb-2">🍹 Booze & Bar</h3>
            <div className="flex flex-wrap gap-2">
              {POTLUCK_OPTIONS.filter(item => item.category === 'booze').map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => togglePotluckItem(item.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    potluckItems.includes(item.id)
                      ? 'bg-pink-500 text-white border-pink-500'
                      : 'bg-gray-900/50 text-gray-400 border border-gray-700 hover:border-gray-600'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Bites Section */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-purple-500 mb-2">🍕 Bites</h3>
            <div className="flex flex-wrap gap-2">
              {POTLUCK_OPTIONS.filter(item => item.category === 'bites').map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => togglePotluckItem(item.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    potluckItems.includes(item.id)
                      ? 'bg-purple-500 text-white border-purple-500'
                      : 'bg-gray-900/50 text-gray-400 border border-gray-700 hover:border-gray-600'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Gear Section */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-cyan-500 mb-2">🎮 Gear</h3>
            <div className="flex flex-wrap gap-2">
              {POTLUCK_OPTIONS.filter(item => item.category === 'gear').map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => togglePotluckItem(item.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    potluckItems.includes(item.id)
                      ? 'bg-cyan-500 text-white border-cyan-500'
                      : 'bg-gray-900/50 text-gray-400 border border-gray-700 hover:border-gray-600'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Item */}
          <div className="mt-4">
            <input
              type="text"
              value={customItem}
              onChange={(e) => setCustomItem(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              placeholder="Custom item (optional)..."
            />
          </div>
        </div>

        {/* Aux Cord & Requests */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Aux Cord & House Requests</h2>
          <textarea
            value={songRequest}
            onChange={(e) => setSongRequest(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-midnight-900/50 border border-midnight-700 text-white placeholder-gray-500 focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-all resize-none"
            placeholder="Drop a song request for the party playlist or a game you want in the rotation..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!name.trim() || isSubmitting}
          className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold text-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Securing Your Spot...</span>
            </div>
          ) : (
            '🎮 Lock In Your RSVP'
          )}
        </button>
      </div>
    </form>
  );
};
