import React, { createContext, useContext, useEffect, useState } from 'react';
import { Logger } from '../utils/service.logger';

// Create a context for the logger
const LoggerContext = createContext();

// Provider component that wraps your app and makes logger available to all components
export const LoggerProvider = ({ children }) => {
  const [logger, setLogger] = useState(
    new Logger(
      'info', // Level
      {
        source: 'frontend',
        userID: 'anonymous',
        sessionID: 'anonymous',
        requestID: 'anonymous',
      }, // Metadata
      null, // Parent
      20, // batchSize
      10000 // batchInterval
    )
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLogger(
        new Logger(
          'info', // Level
          {
            source: 'frontend',
            userID: 'anonymous',
            sessionID: 'anonymous',
            requestID: 'anonymous',
            url: window.location.href,
            userAgent: window.navigator.userAgent,
            referrer: window.document.referrer,
            screen: `${window.screen.width}x${window.screen.height}`,
            viewport: `${window.innerWidth}x${window.innerHeight}`,
            colorDepth: window.screen.colorDepth,
            language: window.navigator.language,
            timeZone: window.Intl.DateTimeFormat().resolvedOptions().timeZone,
            location: window.navigator.geolocation,
          }, // Metadata
          null, // Parent
          20, // batchSize
          10000 // batchInterval
        )
      );
    }
  }, []);

  return (
    <LoggerContext.Provider value={logger}>{children}</LoggerContext.Provider>
  );
};

// Custom hook to use the logger context
export const useLogger = () => {
  const context = useContext(LoggerContext);
  if (context === undefined) {
    throw new Error('useLogger must be used within a LoggerProvider');
  }
  return context;
};
