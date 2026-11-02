import './workflow-background.css';

const paths = [
  'M-40 180 C180 180 220 70 470 120 S760 300 1040 170 S1320 80 1480 140',
  'M-40 520 C180 520 280 250 510 300 S770 440 970 320 S1280 290 1480 380',
  'M-40 720 C210 650 310 800 530 650 S760 500 980 620 S1280 780 1480 650',
  'M360 -40 C340 180 650 170 670 400 S510 670 740 940',
  'M1160 -40 C970 180 1230 340 1130 540 S1000 750 1260 940',
];

// A tiny round dash travels along each path: no animation loop or SVG filters.
export const AnimatedWorkflowBackground = () => (
  <div className="workflow-background" aria-hidden="true">
    <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" focusable="false">
      {paths.map((d, index) => (
        <g key={d} className="workflow-route" style={{ '--travel-time': `${24 + index * 7}s`, '--travel-delay': `${-index * 6 - 3}s` }}>
          <path className="workflow-line" d={d} />
          <path className="workflow-dot workflow-dot-halo" d={d} pathLength="1" />
          <path className="workflow-dot" d={d} pathLength="1" />
        </g>
      ))}
      {[[420, 220], [820, 100], [1260, 420], [530, 750], [990, 820], [700, 500]].map(([cx, cy], index) => (
        <circle key={cx} className="workflow-particle" cx={cx} cy={cy} r={index % 2 ? 2 : 3}
          style={{ '--float-time': `${18 + index * 3}s`, '--float-delay': `${-index * 5}s`, '--float-direction': index % 2 ? 'alternate-reverse' : 'alternate' }} />
      ))}
    </svg>
  </div>
);
