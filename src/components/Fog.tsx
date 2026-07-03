type FogProps = {
  variant?: 'fog' | 'rime';
};

const LAYERS = [1, 2, 3] as const;

const Fog = ({ variant = 'fog' }: FogProps) => (
  <div className={`fog fog--${variant}`} aria-hidden="true">
    {LAYERS.map((layer) => (
      <div key={layer} className={`fog__layer fog__layer--${layer}`}>
        <span className="fog__image" />
        <span className="fog__image" />
      </div>
    ))}
  </div>
);

export default Fog;
