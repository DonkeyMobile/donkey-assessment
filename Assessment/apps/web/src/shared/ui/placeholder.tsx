/** Striped image placeholder used where a real image would go. */
export function Placeholder({
  label = "foto",
  ratio = "4/3",
  rounded = "rounded-xl",
  className = "",
}: {
  label?: string;
  ratio?: string;
  rounded?: string;
  className?: string;
}) {
  return (
    <div
      className={"relative w-full overflow-hidden " + rounded + " " + className}
      style={{
        aspectRatio: ratio.replace("/", " / "),
        background:
          "repeating-linear-gradient(135deg, oklch(0.93 0.02 70) 0 14px, oklch(0.955 0.012 72) 14px 28px)",
      }}
    >
      <div className="absolute inset-0 grid place-items-center">
        <span className="font-mono text-[11px] tracking-wider text-faint/80 bg-surface/70 px-2.5 py-1 rounded-md backdrop-blur-sm">
          {label}
        </span>
      </div>
    </div>
  );
}
