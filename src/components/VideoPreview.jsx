import React, { useEffect, useRef } from 'react';

/**
 * VideoPreview component for displaying screen share stream
 */
export function VideoPreview({ stream, setVideoElement }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      if (setVideoElement) {
        setVideoElement(videoRef.current);
      }
    }
  }, [stream, setVideoElement]);

  if (!stream) return null;

  return (
    <div className="relative bg-slate-900 rounded-xl overflow-hidden shadow-2xl">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-auto max-h-[60vh] object-contain"
      />
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 text-white text-sm font-medium rounded-full">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
          Live
        </span>
      </div>
    </div>
  );
}
