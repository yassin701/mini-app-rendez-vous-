import React from 'react';
import axios from 'axios';

import { useForm } from 'react-hook-form';
import { Calendar, Clock, User, Mail, FileText, ChevronRight, CheckCircle2, Phone } from 'lucide-react';
const API_BACKEND = import.meta.env.VITE_API_BACKEND;


export default function AppointmentForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(API_BACKEND, data);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  if (isSubmitSuccessful) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
        <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-6 ring-4 ring-emerald-500/10">
          <CheckCircle2 size={40} />
        </div>
        <h3 className="text-3xl font-bold text-white mb-2">Booking Confirmed</h3>
        <p className="text-zinc-400 max-w-md">Your appointment request has been recorded. We will send a confirmation email shortly.</p>
        <button 
          onClick={() => reset()}
          className="mt-8 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-medium transition-all duration-300"
        >
          Book Another
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-8 sm:p-10 bg-zinc-900/40 backdrop-blur-2xl border border-white/5 shadow-2xl rounded-3xl relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="relative z-10">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-rose-400 tracking-tight">
            Schedule Appointment
          </h2>
          <p className="mt-3 text-zinc-400">Fill in your details below and we'll be in touch.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300 ml-1">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
                </div>
                <input
                  type="text"
                  {...register("full_Name", { required: "Name is required" })}

                  className={`w-full pl-11 pr-4 py-3 bg-black/20 border ${errors.full_Name ? 'border-rose-500/50' : 'border-white/10'} rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all`}
                  placeholder="John Doe"
                />
              </div>
              {errors.full_Name && <p className="text-rose-400 text-xs ml-1 mt-1">{errors.full_Name.message}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
                </div>
                <input
                  type="email"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                  })}

                  className={`w-full pl-11 pr-4 py-3 bg-black/20 border ${errors.email ? 'border-rose-500/50' : 'border-white/10'} rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all`}
                  placeholder="john@example.com"
                />
              </div>
              {errors.email && <p className="text-rose-400 text-xs ml-1 mt-1">{errors.email.message}</p>}
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300 ml-1">Phone Number</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
                </div>
                <input
                  type="tel"
                  {...register("phone_Num", { 
                    required: "Phone number is required",
                    pattern: { value: /^[0-9+\s-]{8,15}$/, message: "Invalid phone number" }
                  })}
                  className={`w-full pl-11 pr-4 py-3 bg-black/20 border ${errors.phone_Num ? 'border-rose-500/50' : 'border-white/10'} rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all`}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              {errors.phone_Num && <p className="text-rose-400 text-xs ml-1 mt-1">{errors.phone_Num.message}</p>}
            </div>

            {/* Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300 ml-1">Preferred Date</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
                </div>
                <input
                  type="date"
                  {...register("Date", { required: "Date is required" })}

                  className={`w-full pl-11 pr-4 py-3 bg-black/20 border ${errors.Date ? 'border-rose-500/50' : 'border-white/10'} rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all [color-scheme:dark]`}
                />
              </div>
              {errors.Date && <p className="text-rose-400 text-xs ml-1 mt-1">{errors.Date.message}</p>}
            </div>

            {/* Time */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300 ml-1">Preferred Time</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Clock className="h-5 w-5 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
                </div>
                <input
                  type="time"
                  {...register("Time", { required: "Time is required" })}

                  className={`w-full pl-11 pr-4 py-3 bg-black/20 border ${errors.Time ? 'border-rose-500/50' : 'border-white/10'} rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all [color-scheme:dark]`}
                />
              </div>
              {errors.Time && <p className="text-rose-400 text-xs ml-1 mt-1">{errors.Time.message}</p>}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2 mt-4">
            <label className="text-sm font-medium text-zinc-300 ml-1">Reason for Visit</label>
            <div className="relative group">
              <div className="absolute top-3 left-0 pl-4 flex items-start pointer-events-none">
                <FileText className="h-5 w-5 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
              </div>
              <textarea
                {...register("Reason_forVisit")}

                rows="4"
                className="w-full pl-11 pr-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all resize-none"
                placeholder="Tell us a little bit about why you're booking an appointment..."
              ></textarea>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full group mt-8 relative flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-rose-500 hover:from-indigo-400 hover:to-rose-400 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 transition-transform group-hover:-translate-x-1">
              {isSubmitting ? "Processing..." : "Confirm Appointment"}
            </span>
            {!isSubmitting && <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1 relative z-10" />}
          </button>
        </form>
      </div>
    </div>
  );
}
