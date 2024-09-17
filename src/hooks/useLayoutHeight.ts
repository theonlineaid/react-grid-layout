import { useState, useEffect } from 'react';

const useLayoutHeight = (index: number) => {
  const [height, setHeight] = useState<number>(420); // Default height

  useEffect(() => {
    const l: string | null = localStorage.getItem('layout');

    if (l) {
      try {
        const r: any[] = JSON.parse(l);
        if (r && r.length > index && r[index]?.h) {
          const calculatedHeight = r[index].h * 100; // Convert to pixels
          setHeight(calculatedHeight);
        } else {
          setHeight(420); // Default height if index is out of bounds or property is missing
        }
      } catch (error) {
        console.error('Error parsing layout data from localStorage:', error);
        setHeight(420); // Default height if JSON parsing fails
      }
    } else {
      setHeight(420); // Default height if localStorage item is null
    }
  }, [index]);

  return height;
};

export default useLayoutHeight;