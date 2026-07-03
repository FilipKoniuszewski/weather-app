import { useMemo, type CSSProperties } from 'react';

export type SnowVariant = 'snow' | 'shower';

type SnowProps = {
  variant: SnowVariant;
};

type FlakeSize = 'sm' | 'md' | 'lg';
type FlakeBlur = 'none' | 'soft' | 'heavy';

type Flake = {
  left: number;
  leftIni: number;
  leftEnd: number;
  delay: number;
  duration: number;
  size: FlakeSize;
  blur: FlakeBlur;
};

const FLAKE_COUNT: Record<SnowVariant, number> = {
  snow: 32,
  shower: 40,
};

const SIZE_OPTIONS: FlakeSize[] = ['sm', 'md', 'lg'];
const BLUR_OPTIONS: FlakeBlur[] = ['none', 'soft', 'heavy'];

const pick = <T,>(items: T[]) => items[Math.floor(Math.random() * items.length)];

const Snow = ({ variant }: SnowProps) => {
  const flakes = useMemo<Flake[]>(
    () =>
      Array.from({ length: FLAKE_COUNT[variant] }, () => ({
        left: Math.random() * 100,
        leftIni: (Math.random() - 0.5) * 12,
        leftEnd: (Math.random() - 0.5) * 14,
        delay: -(Math.random() * 12),
        duration:
          variant === 'shower' ? 6 + Math.random() * 6 : 9 + Math.random() * 8,
        size: pick(SIZE_OPTIONS),
        blur: pick(BLUR_OPTIONS),
      })),
    [variant],
  );

  return (
    <div className={`snow snow--${variant}`} aria-hidden="true">
      {flakes.map((flake, index) => (
        <span
          key={index}
          className={`snow__flake snow__flake--${flake.size} snow__flake--blur-${flake.blur}`}
          style={
            {
              left: `${flake.left}%`,
              '--snow-left-ini': `${flake.leftIni}vw`,
              '--snow-left-end': `${flake.leftEnd}vw`,
              '--snow-delay': `${flake.delay}s`,
              '--snow-duration': `${flake.duration}s`,
            } as CSSProperties
          }
        >
          &#10052;
        </span>
      ))}
    </div>
  );
};

export default Snow;
