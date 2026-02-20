import { useState, useCallback, useEffect, useRef } from 'react';

/**
 * Custom hook for managing screen sharing functionality
 * Handles getDisplayMedia API, stream lifecycle, and cleanup
 */
export function useScreenShare() {
  const [stream, setStream] = useState(null);
  const [status, setStatus] = useState('IDLE'); // IDLE, REQUESTING, ACTIVE, STOPPED, DENIED, CANCELLED, ERROR, UNSUPPORTED
  const [error, setError] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const videoRef = useRef(null);
  const tracksRef = useRef([]);
  const isRequestingRef = useRef(false);

  // Check browser support on mount
  useEffect(() => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
      setStatus('UNSUPPORTED');
    }
  }, []);

  const detachTracks = useCallback(() => {
    tracksRef.current.forEach((track) => {
      track.onended = null;
    });
    tracksRef.current = [];
  }, []);

  // Cleanup function to stop all tracks and release DOM stream refs
  const cleanup = useCallback(() => {
    if (tracksRef.current.length > 0) {
      tracksRef.current.forEach((track) => {
        try {
          track.stop();
        } catch (e) {
          console.warn('Error stopping track:', e);
        }
      });
    }
    detachTracks();

    setStream(null);
    setMetadata(null);

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, [detachTracks]);

  // Handle stream ending from browser controls or unexpected end.
  const handleStreamEnded = useCallback(() => {
    if (isRequestingRef.current) {
      return;
    }

    setStatus('STOPPED');
    cleanup();
  }, [cleanup]);

  const applyMetadataFromTrack = useCallback((videoTrack) => {
    if (!videoTrack) {
      setMetadata(null);
      return;
    }

    const settings = videoTrack.getSettings();

    setMetadata({
      width: settings.width ?? 'Unknown',
      height: settings.height ?? 'Unknown',
      frameRate: settings.frameRate ?? 'Unknown',
      displaySurface: settings.displaySurface ?? 'Unknown',
      label: videoTrack.label || 'Screen'
    });
  }, []);

  const activateStream = useCallback(
    (displayStream) => {
      const tracks = displayStream.getTracks();
      tracksRef.current = tracks;

      tracks.forEach((track) => {
        track.onended = handleStreamEnded;
      });

      applyMetadataFromTrack(displayStream.getVideoTracks()[0]);
      setStream(displayStream);
      setStatus('ACTIVE');
    },
    [applyMetadataFromTrack, handleStreamEnded]
  );

  const requestDisplayMedia = useCallback(async () => {
    if (isRequestingRef.current || status === 'ACTIVE') {
      return;
    }

    cleanup();

    isRequestingRef.current = true;
    setStatus('REQUESTING');
    setError(null);

    try {
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: { ideal: 30 } },
        audio: false
      });

      activateStream(displayStream);
      return;
    } catch (err) {
      console.error('Screen share error:', err);

      if (err.name === 'AbortError') {
        setStatus('CANCELLED');
      } else if (err.name === 'NotAllowedError') {
        setStatus('DENIED');
      } else if (err.name === 'NotSupportedError') {
        setStatus('UNSUPPORTED');
      } else {
        setStatus('ERROR');
        setError(err.message || 'Unknown error occurred');
      }

      cleanup();
    } finally {
      isRequestingRef.current = false;
    }
  }, [activateStream, cleanup, status]);

  // Start screen sharing
  const startSharing = useCallback(async () => {
    await requestDisplayMedia();
  }, [requestDisplayMedia]);

  // Stop screen sharing
  const stopSharing = useCallback(() => {
    cleanup();
    setStatus('STOPPED');
  }, [cleanup]);

  // Set video element ref
  const setVideoElement = useCallback((element) => {
    videoRef.current = element;
    if (element && stream) {
      element.srcObject = stream;
    }
  }, [stream]);

  // Retry by creating a fresh getDisplayMedia request.
  const retry = useCallback(async () => {
    await requestDisplayMedia();
  }, [requestDisplayMedia]);

  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  return {
    stream,
    status,
    error,
    metadata,
    startSharing,
    stopSharing,
    retry,
    setVideoElement
  };
}
