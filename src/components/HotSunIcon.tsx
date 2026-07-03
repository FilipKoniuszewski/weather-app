import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { assetUrl } from '../utils/assetUrl';

type HotSunIconProps = {
  label: string;
};

const HotSunIcon = ({ label }: HotSunIconProps) => {
  const reducedMotion = useReducedMotion();

  return (
    <div className="today__icon-lottie" role="img" aria-label={label}>
      <DotLottieReact
        className="today__icon-lottie__animation"
        src={assetUrl('assets/animations/hot-sun.lottie')}
        backgroundColor="#00000000"
        loop={!reducedMotion}
        autoplay
        speed={reducedMotion ? 0.35 : 1}
      />
    </div>
  );
};

export default HotSunIcon;
