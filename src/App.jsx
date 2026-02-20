import React, { useCallback, useEffect, useState } from 'react';
import { HomePage } from './pages/HomePage';
import { ScreenTestPage } from './pages/ScreenTestPage';

/**
 * Main App component with lightweight pathname routing.
 */
function App() {
  const getRouteFromPath = useCallback((pathname) => {
    if (pathname === '/screen-test') {
      return 'screen-test';
    }
    return 'home';
  }, []);

  const [currentPage, setCurrentPage] = useState(
    getRouteFromPath(window.location.pathname)
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getRouteFromPath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [getRouteFromPath]);

  const handleNavigate = (page) => {
    if (page === 'screen-test') {
      window.history.pushState({}, '', '/screen-test');
      setCurrentPage('screen-test');
      return;
    }

    window.history.pushState({}, '', '/');
    setCurrentPage('home');
  };

  return (
    <>
      {currentPage === 'home' && (
        <HomePage onNavigate={handleNavigate} />
      )}
      {currentPage === 'screen-test' && (
        <ScreenTestPage onNavigate={handleNavigate} />
      )}
    </>
  );
}

export default App;
