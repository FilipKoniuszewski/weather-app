import { useMemo, type CSSProperties } from 'react';

export type RainVariant = 'drizzle' | 'rain';

type RainProps = {
  variant: RainVariant;
};

type Drop = {
  left: number;
  delay: number;
  duration: number;
};

const DROP_COUNT: Record<RainVariant, number> = {
  drizzle: 18,
  rain: 40,
};

const Rain = ({ variant }: RainProps) => {
  const drops = useMemo<Drop[]>(
    () =>
      Array.from({ length: DROP_COUNT[variant] }, () => ({
        left: Math.random() * 100,
        delay: Math.random() * (variant === 'drizzle' ? -2 : -1.2),
        duration:
          variant === 'drizzle' ? 1 + Math.random() * 0.6 : 0.6 + Math.random() * 0.4,
      })),
    [variant],
  );

  return (
    <div className={`rain rain--${variant}`} aria-hidden="true">
      {drops.map((drop, index) => (
        <span
          key={index}
          className="rain__drop"
          style={
            {
              left: `${drop.left}%`,
              '--rain-delay': `${drop.delay}s`,
              '--rain-duration': `${drop.duration}s`,
            } as CSSProperties
          }
        >
          <span className="rain__stem" />
          {variant === 'rain' && <span className="rain__splat" />}
        </span>
      ))}
    </div>
  );
};

export default Rain;
