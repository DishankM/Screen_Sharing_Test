import React from 'react';

/**
 * MetadataPanel component for displaying stream information.
 */
export function MetadataPanel({ metadata }) {
  if (!metadata) return null;

  const getDisplaySurfaceLabel = (surface) => {
    const labels = {
      monitor: 'Entire Screen',
      window: 'Application Window',
      browser: 'Browser Tab',
      tab: 'Browser Tab',
      Unknown: 'Unknown'
    };
    return labels[surface] || surface || 'Unknown';
  };

  const formatResolution = () => {
    if (metadata.width === 'Unknown' || metadata.height === 'Unknown') {
      return 'Unknown';
    }

    return `${metadata.width} x ${metadata.height}`;
  };

  const formatFrameRate = () => {
    if (metadata.frameRate === 'Unknown') {
      return 'Unknown';
    }

    return `${Math.round(metadata.frameRate)} fps`;
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg w-full">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Stream Details</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-slate-50 rounded-lg p-4">
          <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Resolution</p>
          <p className="text-xl font-mono font-bold text-slate-800">{formatResolution()}</p>
        </div>
        <div className="bg-slate-50 rounded-lg p-4">
          <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Frame Rate</p>
          <p className="text-xl font-mono font-bold text-slate-800">{formatFrameRate()}</p>
        </div>
        <div className="bg-slate-50 rounded-lg p-4 sm:col-span-2">
          <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Display Type</p>
          <p className="text-lg font-semibold text-slate-800">
            {getDisplaySurfaceLabel(metadata.displaySurface)}
          </p>
        </div>
        <div className="bg-slate-50 rounded-lg p-4 sm:col-span-2">
          <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Source Label</p>
          <p className="text-sm font-mono text-slate-600 break-all" title={metadata.label}>
            {metadata.label}
          </p>
        </div>
      </div>
    </div>
  );
}
