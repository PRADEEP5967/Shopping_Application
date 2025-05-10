
import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    const media = window.matchMedia(query);
    
    // Set the initial value
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    
    // Create an event listener
    const listener = () => {
      setMatches(media.matches);
    };
    
    // Add the listener
    media.addEventListener("change", listener);
    
    // Remove the listener on cleanup
    return () => {
      media.removeEventListener("change", listener);
    };
  }, [query, matches]);
  
  return matches;
}
