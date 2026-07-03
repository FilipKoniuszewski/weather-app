import { useMemo, type CSSProperties } from 'react';

export type CloudVariant = 'overcast' | 'light';

type CloudsProps = {
  variant: CloudVariant;
};

type Cloud = {
  top: number;
  scale: number;
  delay: number;
  duration: number;
};

const CLOUD_COUNT: Record<CloudVariant, number> = {
  overcast: 6,
  light: 4,
};

const Clouds = ({ variant }: CloudsProps) => {
  const clouds = useMemo<Cloud[]>(
    () =>
      Array.from({ length: CLOUD_COUNT[variant] }, () => ({
        top: 8 + Math.random() * (variant === 'overcast' ? 46 : 32),
        scale:
          variant === 'overcast' ? 0.7 + Math.random() * 0.5 : 0.5 + Math.random() * 0.4,
        delay: Math.random() * -120,
        duration:
          variant === 'overcast' ? 90 + Math.random() * 60 : 110 + Math.random() * 60,
      })),
    [variant],
  );

  return (
    <div className={`clouds clouds--${variant}`} aria-hidden="true">
      {clouds.map((cloud, index) => (
        <span
          key={index}
          className="clouds__cloud"
          style={
            {
              top: `${cloud.top}%`,
              '--cloud-scale': cloud.scale,
              '--cloud-delay': `${cloud.delay}s`,
              '--cloud-duration': `${cloud.duration}s`,
            } as CSSProperties
          }
        >
          <span />
          <span />
          <span />
          <span />
        </span>
      ))}
    </div>
  );
};

export default Clouds;
