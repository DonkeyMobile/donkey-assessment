import type { InspirationItem } from "@donkey/shared";
import { Icon, Media } from "@/shared/ui";
import { formatDate } from "../lib/format";

function QuoteDetail({ item }: { item: InspirationItem }) {
  return (
    <div className="min-h-[58vh] flex flex-col justify-center py-16 text-center animate-rise">
      <Icon.quote size={40} className="text-accent mx-auto mb-8" />
      <blockquote className="font-serif text-[clamp(1.9rem,5.5vw,3.2rem)] leading-[1.18] tracking-[-0.01em] text-ink">
        {item.quote}
      </blockquote>
      <div className="mt-10 flex items-center justify-center gap-3 text-ink-soft">
        <span className="h-px w-8 bg-line" />
        <span className="font-semibold">{item.author}</span>
        <span className="h-px w-8 bg-line" />
      </div>
    </div>
  );
}

function ArticleDetail({ item }: { item: InspirationItem }) {
  return (
    <div className="py-10 animate-rise">
      <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-accent mb-3">
        {item.category}
      </p>
      <h1 className="font-sans font-extrabold text-[clamp(1.8rem,4.5vw,2.7rem)] leading-[1.12] tracking-tight text-ink">
        {item.title}
      </h1>
      <div className="mt-4 flex items-center gap-3 text-[13px] text-faint">
        <span className="font-semibold text-ink-soft">{item.author}</span>
        <span className="h-1 w-1 rounded-full bg-faint/50" />
        <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
          <Icon.clock size={14} /> {item.readingTime || 3} min lezen
        </span>
        <span className="h-1 w-1 rounded-full bg-faint/50" />
        <span className="whitespace-nowrap">{formatDate(item.date)}</span>
      </div>
      <Media src={item.imageUrl} label="artikelfoto" ratio="16/9" className="my-8" />
      {item.excerpt && (
        <p className="font-serif text-xl leading-relaxed text-ink-soft italic mb-6">
          {item.excerpt}
        </p>
      )}
      <div className="font-serif text-[1.18rem] leading-[1.75] text-ink space-y-5">
        {(item.body || "")
          .split("\n")
          .filter((p) => p.trim())
          .map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
      </div>
    </div>
  );
}

function PhotoDetail({ item }: { item: InspirationItem }) {
  return (
    <div className="py-10 animate-rise">
      <Media
        src={item.imageUrl}
        label="foto"
        ratio={item.ratio || "4/3"}
        className="mb-7 shadow-soft"
      />
      <h1 className="font-sans font-bold text-2xl text-ink">{item.title}</h1>
      <p className="mt-3 font-serif text-xl leading-relaxed text-ink-soft italic">{item.caption}</p>
      <div className="mt-5 text-[13px] text-faint">
        {item.author} · {formatDate(item.date)}
      </div>
    </div>
  );
}

/** Full reading view for one item; dispatches on content type. */
export function ContentDetail({ item }: { item: InspirationItem }) {
  if (item.type === "quote") {
    return <QuoteDetail item={item} />;
  }
  if (item.type === "article") {
    return <ArticleDetail item={item} />;
  }
  return <PhotoDetail item={item} />;
}
