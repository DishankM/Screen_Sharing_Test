import React from 'react';
import { LayoutWrapper } from '../components/LayoutWrapper';
import { Button } from '../components/Button';
import { VideoPreview } from '../components/VideoPreview';
import { MetadataPanel } from '../components/MetadataPanel';
import { useScreenShare } from '../hooks/useScreenShare';

/**
 * ScreenTestPage component - Part B & C of the requirements
 * Handles screen sharing permission, preview, metadata, and lifecycle
 */
export function ScreenTestPage({ onNavigate }) {
  const {
    stream,
    status,
    error,
    metadata,
    startSharing,
    stopSharing,
    retry,
    setVideoElement,
  } = useScreenShare();

  // Handle status changes
  const isRequesting = status === 'REQUESTING';
  const isActive = status === 'ACTIVE';
  const isStopped = status === 'STOPPED';
  const isDenied = status === 'DENIED';
  const isCancelled = status === 'CANCELLED';
  const isError = status === 'ERROR';
  const isUnsupported = status === 'UNSUPPORTED';

  const handleRetry = () => {
    retry();
  };

  const handleBackToHome = () => {
    stopSharing();
    onNavigate('home');
  };

  // If browser is not supported
  if (isUnsupported) {
    return (
      <LayoutWrapper status={status}>
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center">
            <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              Browser Not Supported
            </h2>
            <p className="text-slate-600 mb-8">
              Your browser does not support the Screen Sharing API.
              Please use Chrome or Edge.
            </p>
            <Button onClick={handleBackToHome} variant="secondary">
              Back to Home
            </Button>
          </div>
        </div>
      </LayoutWrapper>
    );
  }

  // If permission denied
  if (isDenied) {
    return (
      <LayoutWrapper status={status}>
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center">
            <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              Permission Denied
            </h2>
            <p className="text-slate-600 mb-8">
              You denied the screen sharing permission. 
              Please allow access when prompted to continue.
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={handleBackToHome} variant="secondary">
                Back to Home
              </Button>
              <Button onClick={handleRetry}>
                Retry Screen Test
              </Button>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    );
  }

  if (isCancelled) {
    return (
      <LayoutWrapper status={status}>
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              Screen Picker Cancelled
            </h2>
            <p className="text-slate-600 mb-8">
              You closed the screen selection dialog before choosing a source.
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={handleBackToHome} variant="secondary">
                Back to Home
              </Button>
              <Button onClick={handleRetry}>
                Retry Screen Test
              </Button>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    );
  }

  // If error occurred
  if (isError) {
    return (
      <LayoutWrapper status={status}>
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center">
            <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              Error Occurred
            </h2>
            <p className="text-slate-600 mb-2">
              {error || 'An unexpected error occurred'}
            </p>
            <div className="flex gap-4 justify-center mt-8">
              <Button onClick={handleBackToHome} variant="secondary">
                Back to Home
              </Button>
              <Button onClick={handleRetry}>
                Retry Screen Test
              </Button>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    );
  }

  // If sharing has stopped (either by user or browser)
  if (isStopped) {
    return (
      <LayoutWrapper status={status}>
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              Screen Sharing Stopped
            </h2>
            <p className="text-slate-600 mb-8">
              The screen sharing session has ended.
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={handleBackToHome} variant="secondary">
                Back to Home
              </Button>
              <Button onClick={handleRetry}>
                Retry Screen Test
              </Button>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    );
  }

  // Active sharing state
  if (isActive) {
    return (
      <LayoutWrapper status={status}>
        <div className="space-y-6">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <p className="text-emerald-700 font-medium text-center">Screen stream active</p>
          </div>

          <VideoPreview stream={stream} setVideoElement={setVideoElement} />
          
          <div>
            <MetadataPanel metadata={metadata} />
          </div>
          
          <div className="flex justify-center">
            <Button onClick={stopSharing} variant="danger">
              Stop Sharing
            </Button>
          </div>
        </div>
      </LayoutWrapper>
    );
  }

  // Initial/Requesting state
  return (
    <LayoutWrapper status={status}>
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <div className="text-center">
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            Start Screen Sharing
          </h2>
          
          <p className="text-slate-600 mb-8 max-w-md mx-auto">
            Click the button below to start the screen sharing test. 
            You'll be prompted to select what you want to share.
          </p>

          {isRequesting && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 max-w-md mx-auto">
              <div className="flex items-center gap-2 text-amber-700">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="font-medium">Waiting for your selection...</span>
              </div>
            </div>
          )}

          <div className="flex gap-4 justify-center">
            <Button 
              onClick={startSharing} 
              disabled={isRequesting}
              loading={isRequesting}
              className="text-lg px-8 py-4"
            >
              {isRequesting ? 'Select a screen...' : 'Start Screen Share'}
            </Button>
            <Button onClick={handleBackToHome} variant="secondary">
              Back
            </Button>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 text-center">
            What to expect:
          </h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-indigo-600 font-semibold">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-1">Permission Prompt</h4>
                <p className="text-sm text-slate-600">A dialog will appear asking which screen or window to share</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-indigo-600 font-semibold">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-1">Select Source</h4>
                <p className="text-sm text-slate-600">Choose a screen, window, or browser tab to share</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-indigo-600 font-semibold">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-1">Live Preview</h4>
                <p className="text-sm text-slate-600">See your screen in real-time with metadata</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-indigo-600 font-semibold">4</span>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-1">Stop When Ready</h4>
                <p className="text-sm text-slate-600">Use the Stop button or browser controls to end</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}
