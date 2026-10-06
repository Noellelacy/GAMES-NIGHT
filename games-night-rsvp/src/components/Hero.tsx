import { RsvpStats } from '../types';
import { Users, Car, Utensils } from 'lucide-react';

interface HeroProps {
  stats: RsvpStats;
}

export const Hero = ({ stats }: HeroProps) => {
  const parkingPercentage = (stats.parkingClaimed / stats.parkingTotal) * 100;
  const parkingColor = parkingPercentage >= 90 ? 'bg-red-500' : parkingPercentage >= 60 ? 'bg-amber-500' : 'bg-green-500';

  return (
    <div className="relative overflow-hidden" style={{ backgroundColor: 'var(--color-midnight-900)' }}>
      {/* Background gradients */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.15) 0%, transparent 70%)', opacity: 0.5 }} />
      <div className="absolute top-0 right-0 w-96 h-96" style={{ background: 'radial-gradient(circle at center, rgba(255, 42, 95, 0.1) 0%, transparent 70%)', opacity: 0.3 }} />

      <div className="relative max-w-4xl mx-auto px-4 py-12 md:py-16">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md text-sm font-medium bg-gray-800/60 border border-gray-700/50 text-pink-500">
            <span>🔞</span>
            <span>21+ • BYOB • House Rules Apply</span>
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-4 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
          AFTER DARK
        </h1>
        <p className="text-xl md:text-2xl text-center text-gray-400 mb-8 tracking-wider">
          // Adult Games Night
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {/* Confirmed Squad */}
          <div className="backdrop-blur-md bg-gray-800/60 border border-gray-700/50 rounded-2xl p-6 text-center transition-all hover:scale-105">
            <Users className="w-8 h-8 mx-auto mb-3 text-purple-500" />
            <div className="text-3xl font-bold text-white mb-1">{stats.confirmed}</div>
            <div className="text-sm text-gray-400">Confirmed Squad</div>
          </div>

          {/* Parking Grid */}
          <div className="backdrop-blur-md bg-gray-800/60 border border-gray-700/50 rounded-2xl p-6 text-center transition-all hover:scale-105">
            <Car className="w-8 h-8 mx-auto mb-3 text-cyan-500" />
            <div className="text-3xl font-bold text-white mb-1">
              {stats.parkingClaimed} / {stats.parkingTotal}
            </div>
            <div className="text-sm text-gray-400 mb-3">Driveway Spots</div>
            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full ${parkingColor} transition-all duration-500`}
                style={{ width: `${parkingPercentage}%` }}
              />
            </div>
          </div>

          {/* Bar & Bites */}
          <div className="backdrop-blur-md bg-gray-800/60 border border-gray-700/50 rounded-2xl p-6 text-center transition-all hover:scale-105">
            <Utensils className="w-8 h-8 mx-auto mb-3 text-pink-500" />
            <div className="text-3xl font-bold text-white mb-1">{stats.potluckItems}</div>
            <div className="text-sm text-gray-400">Bar & Bites Pledged</div>
          </div>
        </div>
      </div>
    </div>
  );
};
