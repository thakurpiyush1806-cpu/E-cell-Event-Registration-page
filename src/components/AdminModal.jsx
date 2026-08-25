import React, { useState, useEffect, useRef } from 'react';
import { fetchRegistrations } from '../api/registrationService';
import { X, Download, Search, RefreshCw, Database, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function AdminModal({ isOpen, onClose }) {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const pollIntervalRef = useRef(null);

  const loadData = async (showLoadingSpinner = true) => {
    if (showLoadingSpinner) setLoading(true);
    setError(null);
    try {
      const res = await fetchRegistrations();
      if (res && res.success && Array.isArray(res.registrations)) {
        setRegistrations(res.registrations);
      } else {
        throw new Error(res.message || 'Invalid response format from database');
      }
    } catch (err) {
      console.error('[Organizer Dashboard] Error fetching database registrations:', err);
      setError(err.message || 'Unable to load registrations. Please try again.');
    } finally {
      if (showLoadingSpinner) setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData(true);

      // Real-time polling interval every 5 seconds to automatically receive new submissions
      pollIntervalRef.current = setInterval(() => {
        loadData(false);
      }, 5000);
    } else {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
    }

    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = registrations.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      (item.registrationId || '').toLowerCase().includes(term) ||
      (item.teamName || '').toLowerCase().includes(term) ||
      (item.startupName || item.ideaName || '').toLowerCase().includes(term) ||
      (item.fullName || '').toLowerCase().includes(term) ||
      (item.email || '').toLowerCase().includes(term) ||
      (item.phone || '').toLowerCase().includes(term)
    );
  });

  const exportToCSV = () => {
    if (!registrations.length) return;
    const headers = ['Registration ID', 'Full Name', 'Email', 'Phone', 'Team Name', 'Startup Idea', 'Description', 'Status', 'CreatedAt'];
    const rows = registrations.map((r) => [
      `"${r.registrationId || ''}"`,
      `"${r.fullName || ''}"`,
      `"${r.email || ''}"`,
      `"${r.phone || ''}"`,
      `"${r.teamName || ''}"`,
      `"${r.startupName || r.ideaName || ''}"`,
      `"${(r.description || r.ideaDescription || '').replace(/"/g, '""')}"`,
      `"${r.status || 'pending'}"`,
      `"${r.createdAt || r.timestamp || ''}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ECELL_KUK_Pitch_Registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-ecell-red/10 border border-ecell-red/30 text-ecell-red">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span>E-Cell Organizer Dashboard</span>
                <span className="text-xs bg-slate-800 text-slate-300 font-normal px-2.5 py-0.5 rounded-full border border-slate-700">
                  {registrations.length} Submissions
                </span>
              </h3>
              <p className="text-xs text-slate-400">Live database query • Real-time synchronization active</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportToCSV}
              disabled={!registrations.length}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Search & Refresh Bar */}
        <div className="p-4 bg-slate-950/30 border-b border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search team, ID, or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-ecell-red"
            />
          </div>

          <button
            onClick={() => loadData(true)}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 self-end sm:self-center px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/60 hover:bg-slate-800 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Database</span>
          </button>
        </div>

        {/* Table / Content Area */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* State 1: Loading */}
          {loading ? (
            <div className="py-16 text-center text-slate-400 flex flex-col items-center gap-3">
              <RefreshCw className="w-8 h-8 animate-spin text-ecell-red" />
              <p className="text-sm font-medium">Loading registrations...</p>
            </div>
          ) : error ? (
            /* State 2: Error */
            <div className="py-16 text-center text-slate-300 space-y-4 max-w-md mx-auto">
              <div className="w-12 h-12 rounded-full bg-red-950/80 border border-red-800 flex items-center justify-center mx-auto text-red-400">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-white text-base">Unable to load registrations</h4>
                <p className="text-xs text-red-300">{error}</p>
              </div>
              <button
                onClick={() => loadData(true)}
                className="px-4 py-2 rounded-xl bg-ecell-red hover:bg-red-600 text-white font-semibold text-xs transition-colors flex items-center gap-2 mx-auto shadow-glow-red"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry</span>
              </button>
            </div>
          ) : filtered.length === 0 ? (
            /* State 3: Empty */
            <div className="py-16 text-center text-slate-400 space-y-2">
              <Database className="w-10 h-10 mx-auto text-slate-600" />
              <p className="text-base font-semibold text-slate-300">No registrations found.</p>
              <p className="text-xs text-slate-500">Submissions from the registration form will appear here automatically.</p>
            </div>
          ) : (
            /* State 4: Data Available */
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">ID</th>
                    <th className="p-3.5">Team Name</th>
                    <th className="p-3.5">Startup Idea</th>
                    <th className="p-3.5">Leader Name</th>
                    <th className="p-3.5">Email</th>
                    <th className="p-3.5">Phone</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 bg-slate-900/50">
                  {filtered.map((item) => (
                    <tr key={item.registrationId} className="hover:bg-slate-800/50 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-ecell-red whitespace-nowrap">
                        {item.registrationId}
                      </td>
                      <td className="p-3.5 font-semibold text-white">{item.teamName}</td>
                      <td className="p-3.5 font-medium text-slate-200">{item.startupName || item.ideaName}</td>
                      <td className="p-3.5">{item.fullName}</td>
                      <td className="p-3.5 text-slate-400">{item.email}</td>
                      <td className="p-3.5 text-slate-400">{item.phone}</td>
                      <td className="p-3.5">
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-amber-950 text-amber-400 border border-amber-800">
                          {item.status || 'pending'}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-500 text-[11px] whitespace-nowrap">
                        {item.createdAt ? new Date(item.createdAt).toLocaleString() : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
          <span>Showing {filtered.length} of {registrations.length} total entry/entries</span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
