const segments = [
  { label: "Critical", value: 15, color: "#dc2626" },
  { label: "High", value: 30, color: "#ea580c" },
  { label: "Medium", value: 35, color: "#2563eb" },
  { label: "Low", value: 20, color: "#9ca3af" },
];

function describeArc(cx: number, cy: number, r: number, start: number, end: number) {
  const toXY = (angle: number) => {
    const rad = ((angle - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };
  const startPt = toXY(start);
  const endPt = toXY(end);
  const large = end - start > 180 ? 1 : 0;
  return `M ${startPt.x} ${startPt.y} A ${r} ${r} 0 ${large} 1 ${endPt.x} ${endPt.y}`;
}

export function PriorityDonut() {
  const size = 180;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 62;
  let angle = 0;

  const arcs = segments.map((seg) => {
    const sweep = (seg.value / 100) * 360;
    const start = angle;
    const end = angle + sweep - 1.5;
    angle += sweep;
    return { ...seg, d: describeArc(cx, cy, radius, start, end) };
  });

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {arcs.map((arc) => (
            <path
              key={arc.label}
              d={arc.d}
              fill="none"
              stroke={arc.color}
              strokeWidth="18"
              strokeLinecap="butt"
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-gray-900">142</span>
          <span className="text-xs text-muted">Total</span>
        </div>
      </div>

      <ul className="grid w-full grid-cols-2 gap-x-4 gap-y-2">
        {segments.map((seg) => (
          <li key={seg.label} className="flex items-center gap-2 text-sm text-gray-600">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: seg.color }}
            />
            <span className="flex-1">{seg.label}</span>
            <span className="font-semibold text-gray-800">{seg.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
