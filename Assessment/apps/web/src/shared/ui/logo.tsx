export function Logo({
  light = false,
  size = 30,
}: {
  light?: boolean;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={
        "font-sans font-extrabold tracking-tight leading-none " +
        (light ? "text-paper" : "text-ink")
      }
      style={{ fontSize: size * 0.62 }}
    >
      Donkey <span className="text-accent">Inspire</span>
    </span>
  );
}
