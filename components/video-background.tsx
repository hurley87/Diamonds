'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export const VideoBackground = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Only show on homepage
  const isHomepage = pathname === '/';

  // Handle client-side mounting to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isHomepage) return null;

  return (
    <div className="absolute top-0 left-0 w-full h-screen overflow-hidden z-0 pointer-events-none">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 min-w-full min-h-full object-cover"
      >
        <source src="/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Gradient overlay to help text readability */}
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)',
        }}
      />
    </div>
  );
};
