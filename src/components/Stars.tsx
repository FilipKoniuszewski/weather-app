import { useMemo, type CSSProperties } from 'react';

const STAR_COUNT = 110;

type Star = {
  top: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
};

const Stars = () => {
  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: STAR_COUNT }, () => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 0.75 + Math.random() * 1.5,
        delay: Math.random() * -4,
        duration: 2.5 + Math.random() * 3,
      })),
    [],
  );

  return (
    <div className="stars" aria-hidden="true">
      {stars.map((star, index) => (
        <span
          key={index}
          className="stars__star"
          style={
            {
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              '--star-delay': `${star.delay}s`,
              '--star-duration': `${star.duration}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
};

export default Stars;
