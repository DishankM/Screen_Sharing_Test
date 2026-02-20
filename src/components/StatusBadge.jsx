import React from 'react';

/**
 * StatusBadge component for displaying screen share state.
 */
export function StatusBadge({ status }) {
  const getStatusConfig = (value) => {
    const configs = {
      IDLE: {
        label: 'Ready',
        bgColor: 'bg-slate-100',
        textColor: 'text-slate-700',
        dotColor: 'bg-slate-500',
        pulse: false
      },
      UNSUPPORTED: {
        label: 'Not Supported',
        bgColor: 'bg-rose-100',
        textColor: 'text-rose-700',
        dotColor: 'bg-rose-500',
        pulse: false
      },
      REQUESTING: {
        label: 'Requesting Permission',
        bgColor: 'bg-amber-100',
        textColor: 'text-amber-700',
        dotColor: 'bg-amber-500',
        pulse: true
      },
      ACTIVE: {
        label: 'Sharing Active',
        bgColor: 'bg-emerald-100',
        textColor: 'text-emerald-700',
        dotColor: 'bg-emerald-500',
        pulse: true
      },
      STOPPED: {
        label: 'Stopped',
        bgColor: 'bg-slate-100',
        textColor: 'text-slate-700',
        dotColor: 'bg-slate-500',
        pulse: false
      },
      DENIED: {
        label: 'Permission Denied',
        bgColor: 'bg-rose-100',
        textColor: 'text-rose-700',
        dotColor: 'bg-rose-500',
        pulse: false
      },
      CANCELLED: {
        label: 'Picker Cancelled',
        bgColor: 'bg-amber-100',
        textColor: 'text-amber-700',
        dotColor: 'bg-amber-500',
        pulse: false
      },
      ERROR: {
        label: 'Error',
        bgColor: 'bg-rose-100',
        textColor: 'text-rose-700',
        dotColor: 'bg-rose-500',
        pulse: false
      }
    };

    return configs[value] || configs.IDLE;
  };

  const config = getStatusConfig(status);

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 ${config.bgColor} ${config.textColor} text-sm font-medium rounded-full`}>
      <span
        className={`h-2 w-2 rounded-full ${config.dotColor} ${config.pulse ? 'animate-pulse' : ''}`}
        aria-hidden="true"
      />
      {config.label}
    </span>
  );
}
