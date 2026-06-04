import { Placeholder } from "./placeholder";
import { cn } from "@/shared/lib";

/** Render a real image when a URL is given, otherwise the striped placeholder. */
export function Media({
  src,
  label,
  ratio = "4/3",
  rounded = "rounded-xl",
  className = "",
}: {
  src?: string | null;
  label: string;
  ratio?: string;
  rounded?: string;
  className?: string;
}) {
  if (!src) {
    return <Placeholder label={label} ratio={ratio} rounded={rounded} className={className} />;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={label}
      loading="lazy"
      className={cn("w-full object-cover", rounded, className)}
      style={{ aspectRatio: ratio.replace("/", " / ") }}
    />
  );
}
