import React from 'react';

/**
 * Reusable Button component with multiple variants
 */
export function Button({ 
  children, 
  variant = 'primary', 
  onClick, 
  disabled = false, 
  loading = false,
  className = '',
  type = 'button'
}) {
  const baseStyles = 'px-6 py-3 rounded-lg font-semibold transition-all duration-200 inline-flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 disabled:bg-indigo-400',
    secondary: 'border-2 border-slate-300 text-slate-700 hover:bg-slate-100 active:bg-slate-200 disabled:text-slate-400',
    danger: 'bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800 disabled:bg-rose-400'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${className} ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      {loading && (
        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
}
