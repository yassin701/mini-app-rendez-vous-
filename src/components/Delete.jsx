import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AlertCircle, Trash2, X } from 'lucide-react';

const API_BACKEND = import.meta.env.VITE_API_BACKEND3;
export default function Delete() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state;

  // If someone navigates to /delete without a user, send them back
  if (!userData) {
    navigate('/users');
    return null;
  }

  const handleDelete = async () => {
    setIsSubmitting(true);
    setServerError('');
    try {
      const response = await axios.delete(
        `${API_BACKEND}?id=${userData.id}`
      );

      if (response.data.message === "deleted successfully") {
        navigate('/users');
      } else {
        setServerError(response.data.message || "Failed to delete");
      }
    } catch (error) {
      console.error(error);
      setServerError("Server error, please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-8 sm:p-10 bg-zinc-900/40 backdrop-blur-2xl border border-rose-500/20 shadow-2xl rounded-3xl relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-rose-500/20 text-rose-500 rounded-full flex items-center justify-center mb-6 ring-4 ring-rose-500/10">
          <AlertCircle size={40} />
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-2">
          Delete Appointment?
        </h2>
        
        <p className="mt-3 text-zinc-400 mb-6">
          Are you sure you want to permanently delete the appointment for 
          <span className="text-white font-semibold block mt-1 text-lg">"{userData.full_Name}"</span>
        </p>

        {serverError && (
          <div className="w-full mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm">
            {serverError}
          </div>
        )}

        <div className="w-full flex flex-col sm:flex-row gap-4 mt-4">
          <button
            onClick={() => navigate('/users')}
            disabled={isSubmitting}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-medium transition-all duration-300 disabled:opacity-50"
          >
            <X className="w-5 h-5" />
            Cancel
          </button>
          
          <button
            onClick={handleDelete}
            disabled={isSubmitting}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-bold transition-all duration-300 shadow-lg shadow-rose-500/25 disabled:opacity-70 disabled:cursor-not-allowed"
          >
             {isSubmitting ? (
              "Deleting..."
            ) : (
              <>
                <Trash2 className="w-5 h-5" />
                Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
