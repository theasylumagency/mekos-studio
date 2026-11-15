/**
 * Small line drawings of the four installation types. Each one includes a person,
 * so the visitor reads the scale of the flowers at a glance.
 */
type Kind = 0 | 1 | 2 | 3;

const ground = 150;
const stem = "#6f8a72";
const ink = "#29372d";
const colors = ["var(--stripe-1)", "var(--stripe-3)", "var(--stripe-5)", "var(--stripe-2)", "var(--stripe-6)", "var(--stripe-4)"];

function Flower({ x, y, r, fill, stalk = true }: { x: number; y: number; r: number; fill: string; stalk?: boolean }) {
  return (
    <g>
      {stalk && <line x1={x} y1={y + r} x2={x} y2={ground} stroke={stem} strokeWidth={3} strokeLinecap="round" />}
      <circle cx={x} cy={y} r={r} fill={fill} />
      <circle cx={x} cy={y} r={r * .62} fill="none" stroke="#fff" strokeOpacity={.7} strokeWidth={1.5} />
      <circle cx={x} cy={y} r={r * .22} fill={ink} fillOpacity={.12} />
    </g>
  );
}

function Person({ x }: { x: number }) {
  return (
    <g fill={ink}>
      <circle cx={x} cy={99} r={6.5} />
      <path d={`M${x - 8} ${ground} L${x - 7} 116 Q${x - 7} 107 ${x} 107 Q${x + 7} 107 ${x + 7} 116 L${x + 8} ${ground} Z`} />
    </g>
  );
}

export function CompositionIcon({ kind }: { kind: Kind }) {
  return (
    <svg viewBox="0 0 240 160" role="presentation" aria-hidden="true">
      {kind === 3 && <line x1={18} y1={10} x2={222} y2={10} stroke={ink} strokeWidth={2} strokeLinecap="round" />}
      {kind === 3 && [[52, 62, 18], [96, 44, 22], [150, 52, 25], [198, 70, 16]].map(([x, y, r]) => (
        <line key={x} x1={x} y1={10} x2={x} y2={y - r} stroke={ink} strokeWidth={1} />
      ))}
      <line x1={8} y1={ground} x2={232} y2={ground} stroke={ink} strokeOpacity={.35} strokeWidth={1.5} />

      {kind === 0 && <>
        <Flower x={142} y={66} r={46} fill={colors[0]} />
        <Person x={64} />
      </>}

      {kind === 1 && <>
        <Flower x={84} y={104} r={22} fill={colors[1]} />
        <Flower x={132} y={70} r={34} fill={colors[0]} />
        <Flower x={186} y={98} r={25} fill={colors[2]} />
        <Flower x={222} y={124} r={12} fill={colors[3]} />
        <Person x={34} />
      </>}

      {kind === 2 && <>
        {Array.from({ length: 9 }, (_, index) => {
          const angle = Math.PI - (index * Math.PI) / 8;
          return <Flower key={index} x={120 + Math.cos(angle) * 84} y={ground - 24 - Math.sin(angle) * 84} r={index % 2 ? 15 : 19} fill={colors[index % colors.length]} stalk={false} />;
        })}
        <Person x={120} />
      </>}

      {kind === 3 && <>
        {[[52, 62, 18], [96, 44, 22], [150, 52, 25], [198, 70, 16]].map(([x, y, r], index) => (
          <Flower key={x} x={x} y={y} r={r} fill={colors[index]} stalk={false} />
        ))}
        <Person x={124} />
      </>}
    </svg>
  );
}
