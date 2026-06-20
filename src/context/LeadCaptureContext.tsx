import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import LeadCaptureModal from '../components/gateway/LeadCaptureModal';
import type { LeadCaptureConfig } from '../core/content/leadCapture';

type LeadCaptureContextValue = {
  openLeadCapture: (config: LeadCaptureConfig) => void;
};

const LeadCaptureContext = createContext<LeadCaptureContextValue | null>(null);

export const LeadCaptureProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState<LeadCaptureConfig>({
    title: 'Get in touch',
  });

  const openLeadCapture = useCallback((next: LeadCaptureConfig) => {
    setConfig(next);
    setOpen(true);
  }, []);

  const closeLeadCapture = useCallback(() => setOpen(false), []);

  return (
    <LeadCaptureContext.Provider value={{ openLeadCapture }}>
      {children}
      <LeadCaptureModal open={open} onClose={closeLeadCapture} {...config} />
    </LeadCaptureContext.Provider>
  );
};

export function useLeadCapture(): LeadCaptureContextValue {
  const ctx = useContext(LeadCaptureContext);
  if (!ctx) {
    throw new Error('useLeadCapture must be used within LeadCaptureProvider');
  }
  return ctx;
}
