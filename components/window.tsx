"use client"
import { useState, useEffect } from 'react';

const useWindowSize = () => {
    type Dimensions = {
        width: undefined | number,
        height: undefined | number
    }
  const [windowSize, setWindowSize] = useState<Dimensions>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial size
    handleResize();

    // Attach the event listener
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;