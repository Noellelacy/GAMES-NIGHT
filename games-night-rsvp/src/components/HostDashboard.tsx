import { RsvpSubmission } from '../types';
import { X, Download, Copy, Lock } from 'lucide-react';

interface HostDashboardProps {
  submissions: RsvpSubmission[];
  onClose: () => void;
}

const ATTENDANCE_LABELS: Record<string, string> = {
  locked_in: '🔥 Locked In',
  late: '⏳ Late',
  ghosting: '👻 Ghosting',
};

const PARKING_LABELS: Record<string, string> = {
  need_spot: '🚗 Spot',
  carpool: '👥 Carpool',
  rideshare: '🚕 Rideshare',
};

const POTLUCK_LABELS: Record<string, string> = {
  tequila: 'Tequila/Vodka',
  beer: '6-Pack',
  wine: 'Wine',
  mixers: 'Mixers',
  ice: 'Ice & Cups',
  suya: 'Suya/Wings',
  pizza: 'Pizza',
  chips: 'Chips & Dip',
  dessert: 'Dessert',
  cards: 'CAH',
  'drinking-games': 'Drinking Games',
  controller: 'Controller',
};

export const HostDashboard = ({ submissions, onClose }: HostDashboardProps) => {
  const formatWhatsAppBrief = () => {
    const confirmed = submissions.filter(s => s.attendance !== 'ghosting');
    const parking = submissions.filter(s => s.parking === 'need_spot');
    const items = submissions.flatMap(s => [
      ...s.potluckItems.map(id => POTLUCK_LABELS[id] || id),
      ...(s.customItem ? [s.customItem] : [])
    ]);

    let brief = `🎮 GAMES NIGHT ROSTER\n\n`;
    brief += `📊 Stats:\n`;
    brief += `• Confirmed: ${confirmed.length}\n`;
    brief += `• Parking: ${parking.length}/8 spots\n`;
    brief += `• Items: ${items.length}\n\n`;

    brief += `👥 GUEST LIST:\n`;
    submissions.forEach(s => {
      const status = ATTENDANCE_LABELS[s.attendance];
      const parkingStatus = PARKING_LABELS[s.parking];
      const bringing = [
        ...s.potluckItems.map(id => POTLUCK_LABELS[id] || id),
        ...(s.customItem ? [s.customItem] : [])
      ].join(', ') || 'None';

      brief += `\n${status} ${s.name}\n`;
      brief += `   🚗 ${parkingStatus}\n`;
      if (bringing !== 'None') brief += `   📦 ${bringing}\n`;
      if (s.songRequest) brief += `   🎵 ${s.songRequest}\n`;
    });

    return brief;
  };

  const copyToClipboard = () => {
    const brief = formatWhatsAppBrief();
    navigator.clipboard.writeText(brief);
  };

  const downloadCSV = () => {
    const headers = ['Name', 'Contact', 'Attendance', 'Parking', 'Items', 'Song Request', 'Timestamp'];
    const rows = submissions.map(s => [
      s.name,
      s.contact || '',
      s.attendance,
      s.parking,
      [...s.potluckItems, ...(s.customItem ? [s.customItem] : [])].join('; '),
      s.songRequest || '',
      new Date(s.timestamp).toLocaleString()
    ]);

    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `games-night-roster-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-gray-900/95 backdrop-blur-lg z-50 overflow-y-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Lock className="w-6 h-6 text-purple-500" />
            <h2 className="text-2xl font-bold text-white">Host Dashboard</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-500 hover:bg-purple-500/80 text-white font-medium transition-all"
          >
            <Copy className="w-5 h-5" />
            Copy WhatsApp Brief
          </button>
          <button
            onClick={downloadCSV}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-medium transition-all"
          >
            <Download className="w-5 h-5" />
            Download CSV
          </button>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="backdrop-blur-md bg-gray-800/60 border border-gray-700/50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">{submissions.length}</div>
            <div className="text-sm text-gray-400">Total RSVPs</div>
          </div>
          <div className="backdrop-blur-md bg-gray-800/60 border border-gray-700/50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-400">
              {submissions.filter(s => s.attendance !== 'ghosting').length}
            </div>
            <div className="text-sm text-gray-400">Attending</div>
          </div>
          <div className="backdrop-blur-md bg-gray-800/60 border border-gray-700/50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-cyan-500">
              {submissions.filter(s => s.parking === 'need_spot').length}
            </div>
            <div className="text-sm text-gray-400">Parking Spots</div>
          </div>
          <div className="backdrop-blur-md bg-gray-800/60 border border-gray-700/50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-pink-500">
              {submissions.reduce((acc, s) => acc + s.potluckItems.length + (s.customItem ? 1 : 0), 0)}
            </div>
            <div className="text-sm text-gray-400">Items Pledged</div>
          </div>
        </div>

        {/* Roster Table */}
        <div className="backdrop-blur-md bg-gray-800/60 border border-gray-700/50 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Parking</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Items</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-400 hidden md:table-cell">Request</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {submissions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                      No RSVPs yet
                    </td>
                  </tr>
                ) : (
                  submissions.map((submission) => (
                    <tr key={submission.id} className="hover:bg-gray-700/30 transition-colors">
                      <td className="px-4 py-3 text-white font-medium">{submission.name}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={submission.attendance === 'ghosting' ? 'text-gray-500' : 'text-green-400'}>
                          {ATTENDANCE_LABELS[submission.attendance]}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-300">
                        {PARKING_LABELS[submission.parking]}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-300">
                        {[
                          ...submission.potluckItems.map(id => POTLUCK_LABELS[id] || id),
                          ...(submission.customItem ? [submission.customItem] : [])
                        ].join(', ') || '—'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-400 hidden md:table-cell max-w-xs truncate">
                        {submission.songRequest || '—'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
