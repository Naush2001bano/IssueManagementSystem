"use client";

const points = [
  { day: "Mon", value: 28 },
  { day: "Tue", value: 42 },
  { day: "Wed", value: 35 },
  { day: "Thu", value: 58 },
  { day: "Fri", value: 48 },
  { day: "Sat", value: 22 },
  { day: "Sun", value: 18 },
];

export function TicketVolumeChart() {
  const width = 560;
  const height = 220;
  const padding = { top: 20, right: 16, bottom: 32, left: 36 };
  const max = 70;
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const coords = points.map((p, i) => {
    const x = padding.left + (i / (points.length - 1)) * chartW;
    const y = padding.top + chartH - (p.value / max) * chartH;
    return { ...p, x, y };
  });

  const line = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" ");
  const area = `${line} L ${coords[coords.length - 1].x} ${padding.top + chartH} L ${coords[0].x} ${padding.top + chartH} Z`;

  return (
    <div className="w-full overflow-hidden">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full">
        {[0, 20, 40, 60].map((tick) => {
          const y = padding.top + chartH - (tick / max) * chartH;
          return (
            <g key={tick}>
              <line
                x1={padding.left}
                x2={width - padding.right}
                y1={y}
                y2={y}
                stroke="#f3f4f6"
                strokeWidth="1"
              />
              <text
                x={padding.left - 8}
                y={y + 4}
                textAnchor="end"
                className="fill-gray-400 text-[10px]"
              >
                {tick}
              </text>
            </g>
          );
        })}
        <path d={area} fill="url(#volumeFill)" opacity="0.35" />
        <path d={line} fill="none" stroke="#4338ca" strokeWidth="2.5" strokeLinecap="round" />
        {coords.map((c) => (
          <circle key={c.day} cx={c.x} cy={c.y} r="4" fill="#4338ca" stroke="#fff" strokeWidth="2" />
        ))}
        {coords.map((c) => (
          <text
            key={`${c.day}-label`}
            x={c.x}
            y={height - 8}
            textAnchor="middle"
            className="fill-gray-500 text-[11px]"
          >
            {c.day}
          </text>
        ))}
        <defs>
          <linearGradient id="volumeFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4338ca" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#4338ca" stopOpacity="0.02" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
