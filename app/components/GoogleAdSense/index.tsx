import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface GoogleAdSenseProps {
  className?: string;
  style?: React.CSSProperties;
  client?: string;
  slot: string;
  format?: string;
  responsive?: string;
  layoutKey?: string;
}

const GoogleAdSense = ({
  className,
  style,
  client = "ca-pub-1293594318302254", // Default from root.tsx
  slot,
  format = "auto",
  responsive = "true",
  layoutKey,
}: GoogleAdSenseProps) => {
  const isDev = import.meta.env.DEV;

  useEffect(() => {
    if (isDev) return; // Don't load ads in dev mode

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error", e);
    }
  }, [isDev]);

  if (isDev) {
    return (
      <div
        className={className}
        style={{ 
          display: 'block', 
          backgroundColor: '#f0f0f0',
          border: '1px dashed #ccc',
          textAlign: 'center',
          color: '#666',
          fontSize: '12px',
          padding: '8px',
          minHeight: style?.height || '100px', // Ensure visibility
          ...style,
        }}
      >
        <span style={{ display: 'block', pointerEvents: 'none' }}>
          AdSense Placeholder<br/>
          (Slot: {slot})<br/>
          Visible on Localhost only
        </span>
      </div>
    );
  }

  return (
    <ins
      className={`adsbygoogle ${className || ''}`}
      style={{ display: 'block', ...style }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive}
      data-ad-layout-key={layoutKey}
    />
  );
};

export default GoogleAdSense;
