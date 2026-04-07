import { useState } from 'react';
import controlButtonImg from '@assets/version_2_1773196773290.png';
import { ControlPanel } from './ControlPanel';

export function FloatingControlButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-6 top-32 md:right-8 md:top-40 z-40 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center transition-all duration-300 ease-out hover:scale-110 focus:outline-none group"
        aria-label="Open control panel"
        data-testid="button-control-panel"
      >
        {/* Soft glow on hover only — no background shape */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Standalone icon */}
        <img
          src={controlButtonImg}
          alt="Control panel"
          className="w-12 h-12 md:w-14 md:h-14 relative z-10 drop-shadow-lg group-hover:drop-shadow-[0_0_12px_rgba(139,92,246,0.6)] transition-all duration-300"
          style={{ willChange: 'transform, filter' }}
        />
      </button>

      <ControlPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
