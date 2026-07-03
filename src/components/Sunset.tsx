const Sunset = () => (
  <div className="sunset" aria-hidden="true">
    <svg className="sunset__scene" viewBox="0 0 200 100" preserveAspectRatio="xMidYMax meet">
      <defs>
        <clipPath id="sunset-above-horizon">
          <rect x="0" y="0" width="200" height="58" />
        </clipPath>
      </defs>

      <g clipPath="url(#sunset-above-horizon)">
        <g className="sunset__sun">
          <path className="sunset__disc" d="M 73 58 A 27 27 0 0 1 127 58" />
          <line className="sunset__ray sunset__ray--center" x1="100" y1="27" x2="100" y2="12" />
          <line className="sunset__ray sunset__ray--left" x1="78" y1="36" x2="67" y2="25" />
          <line className="sunset__ray sunset__ray--right" x1="122" y1="36" x2="133" y2="25" />
          <line className="sunset__ray sunset__ray--side-left" x1="73" y1="58" x2="58" y2="58" />
          <line className="sunset__ray sunset__ray--side-right" x1="127" y1="58" x2="142" y2="58" />
        </g>
      </g>

      <line className="sunset__horizon" x1="20" y1="58" x2="180" y2="58" />

      <g className="sunset__water">
        <line className="sunset__water-line sunset__water-line--far" x1="28" y1="74" x2="172" y2="74" />
        <line className="sunset__water-line sunset__water-line--near" x1="48" y1="84" x2="152" y2="84" />
      </g>
    </svg>
  </div>
);

export default Sunset;
