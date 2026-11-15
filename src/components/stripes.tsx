/** The six pastel ribbons from the Meko's logo, hanging like strips of Isolon. */
export function Stripes({ className = "" }: { className?: string }) {
  return (
    <span className={`stripes ${className}`} aria-hidden="true">
      {Array.from({ length: 6 }, (_, index) => <span key={index} />)}
    </span>
  );
}
