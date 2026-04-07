import { useMemo } from 'react';

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

interface Star {
  x: number;
  y: number;
  r: number;
  opacity: number;
  twinkleDelay: number;
  twinkleDuration: number;
  shouldTwinkle: boolean;
}

function generateStars(count: number): Star[] {
  const rand = seededRandom(7391);
  return Array.from({ length: count }, (_, i) => ({
    x: rand() * 100,
    y: rand() * 100,
    r: rand() * 0.9 + 0.3,
    opacity: rand() * 0.35 + 0.1,
    twinkleDelay: rand() * 8,
    twinkleDuration: 10 + rand() * 12,
    shouldTwinkle: i % 4 === 0,
  }));
}

export function StarField() {
  const stars = useMemo(() => generateStars(55), []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-0 dark:opacity-100 transition-opacity duration-700"
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="star-blur">
            <feGaussianBlur stdDeviation="0.4" />
          </filter>
          <style>{`
            @keyframes star-twinkle {
              0%, 100% { opacity: var(--star-opacity); }
              50%       { opacity: calc(var(--star-opacity) * 0.15); }
            }
          `}</style>
        </defs>

        {/* Ambient nebula glow – very subtle */}
        <radialGradient id="nebula-a" cx="25%" cy="30%" r="40%">
          <stop offset="0%"  stopColor="hsl(265 85% 65%)" stopOpacity="0.04" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="nebula-b" cx="75%" cy="70%" r="35%">
          <stop offset="0%"  stopColor="hsl(200 80% 60%)" stopOpacity="0.03" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
        <rect width="100%" height="100%" fill="url(#nebula-a)" />
        <rect width="100%" height="100%" fill="url(#nebula-b)" />

        {/* Stars */}
        {stars.map((star, i) => (
          <circle
            key={i}
            cx={`${star.x}%`}
            cy={`${star.y}%`}
            r={star.r}
            fill="white"
            filter="url(#star-blur)"
            style={
              star.shouldTwinkle
                ? ({
                    '--star-opacity': star.opacity,
                    opacity: star.opacity,
                    animation: `star-twinkle ${star.twinkleDuration}s ${star.twinkleDelay}s ease-in-out infinite`,
                  } as React.CSSProperties)
                : { opacity: star.opacity }
            }
          />
        ))}
      </svg>
    </div>
  );
}
