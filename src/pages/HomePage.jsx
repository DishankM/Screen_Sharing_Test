import React, { useState, useEffect } from 'react';
import { LayoutWrapper } from '../components/LayoutWrapper';
import { Button } from '../components/Button';

/**
 * HomePage component - Part A of the requirements
 */
export function HomePage({ onNavigate }) {
  const [isSupported, setIsSupported] = useState(true);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check browser support for getDisplayMedia
    const checkSupport = () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
        setIsSupported(false);
      }
      setIsChecking(false);
    };
    
    checkSupport();
  }, []);

  const handleStartTest = () => {
    const supported = !!(navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia);

    if (!supported) {
      setIsSupported(false);
      return;
    }

    if (isSupported) {
      onNavigate('screen-test');
    }
  };

  return (
    <LayoutWrapper status="IDLE">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <div className="text-center">
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Screen Share Test App
          </h2>
          
          <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
            Verify that your browser supports screen sharing and test the permission workflow.
          </p>

          {!isChecking && !isSupported && (
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-6 mb-8 max-w-md mx-auto">
              <div className="flex items-center gap-3 mb-2">
                <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h3 className="text-lg font-semibold text-rose-800">Browser Not Supported</h3>
              </div>
              <p className="text-rose-700">
                Your browser does not support the Screen Sharing API. 
                Please use Chrome or Edge for this feature.
              </p>
            </div>
          )}

          {!isChecking && isSupported && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-8 max-w-md mx-auto">
              <div className="flex items-center gap-2 text-emerald-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-medium">Your browser supports screen sharing</span>
              </div>
            </div>
          )}

          <Button
            onClick={handleStartTest}
            disabled={!isSupported || isChecking}
            loading={isChecking}
            className="text-lg px-8 py-4"
          >
            Start Screen Test
          </Button>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 text-center">
            What will be tested:
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h4 className="font-semibold text-slate-800 mb-1">Permission Flow</h4>
              <p className="text-sm text-slate-600">Test the browser's screen sharing permission dialog</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-slate-800 mb-1">Live Preview</h4>
              <p className="text-sm text-slate-600">View your screen in real-time</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="font-semibold text-slate-800 mb-1">Lifecycle</h4>
              <p className="text-sm text-slate-600">Detect when sharing stops</p>
            </div>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}
