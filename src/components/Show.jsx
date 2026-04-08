import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Clock, User, Mail, FileText, Phone, ArrowLeft, Info } from 'lucide-react';

export default function Show() {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state;

  // Protect against direct navigation without a user object
  if (!userData) {
    navigate('/users');
    return null;
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-8 sm:p-10 bg-zinc-900/40 backdrop-blur-2xl border border-white/5 shadow-2xl rounded-3xl relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-white/10">
          <div className="w-14 h-14 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center ring-4 ring-blue-500/10 shrink-0">
            <Info size={28} />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 tracking-tight">
              Appointment Details
            </h2>
            <p className="mt-1 text-zinc-400">Viewing information for ID #{userData.id}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Full Name */}
            <div className="bg-black/20 p-4 rounded-xl border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <User className="h-4 w-4 text-zinc-500" />
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Full Name</span>
              </div>
              <p className="text-white text-lg font-medium">{userData.full_Name}</p>
            </div>

            {/* Email */}
            <div className="bg-black/20 p-4 rounded-xl border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="h-4 w-4 text-zinc-500" />
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Email Address</span>
              </div>
              <p className="text-white font-medium">{userData.email}</p>
            </div>

            {/* Phone Number */}
            <div className="bg-black/20 p-4 rounded-xl border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <Phone className="h-4 w-4 text-zinc-500" />
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Phone Number</span>
              </div>
              <p className="text-white font-medium">{userData.phone_Num}</p>
            </div>

            {/* Date Workspace */}
            <div className="bg-black/20 p-4 rounded-xl border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-zinc-500" />
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Preferred Date</span>
              </div>
              <p className="text-white font-medium">{userData.Date}</p>
            </div>

            {/* Time */}
            <div className="bg-black/20 p-4 rounded-xl border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-zinc-500" />
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Preferred Time</span>
              </div>
              <p className="text-white font-medium">{userData.Time}</p>
            </div>
          </div>

          {/* Reason */}
          <div className="bg-black/20 p-5 rounded-xl border border-white/5 mt-4">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-4 w-4 text-zinc-500" />
              <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Reason for Visit</span>
            </div>
            <p className="text-zinc-300 leading-relaxed min-h-[60px]">
              {userData.Reason_forVisit || "No reason provided."}
            </p>
          </div>

          {/* Action button */}
          <div className="mt-8 pt-6 border-t border-white/10 flex justify-center">
            <button
              onClick={() => navigate("/users")}
              className="group flex items-center justify-center gap-2 px-8 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-medium transition-all duration-300 ring-1 ring-white/10 hover:ring-white/20"
            >
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              Back to Users
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
