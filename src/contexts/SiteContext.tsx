// src/contexts/SiteContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Site = 'blog' | 'newsletter';

interface SiteContextType {
  site: Site;
  setSite: (s: Site) => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [site, setSite] = useState<Site>('newsletter');
  return (
    <SiteContext.Provider value={{ site, setSite }}>
      {children}
    </SiteContext.Provider>
  );
};

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used within a SiteProvider');
  return ctx;
}
