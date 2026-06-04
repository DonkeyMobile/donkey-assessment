/* Donkey Inspire — public visitor site */

function fmtDate(d) {
  try {
    return new Date(d).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch (e) { return d; }
}

/* ---------- Header ---------- */
function PublicHeader({ onAdmin, onHome, activeCat, onCat }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll); onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const cats = ['Alles', ...window.DonkeyData.CATEGORIES];
  return (
    <header className={'sticky top-0 z-40 bg-charcoal text-paper transition-shadow ' + (scrolled ? 'shadow-lift' : '')}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="h-16 sm:h-[68px] flex items-center justify-between gap-4">
          <button onClick={onHome} className="shrink-0"><Logo light size={28} /></button>
          <nav className="hidden lg:flex items-center gap-1">
            {cats.map((c) => (
              <button key={c} onClick={() => onCat(c === 'Alles' ? null : c)}
                className={'px-3.5 py-2 rounded-full text-[13px] font-medium transition ' +
                  ((activeCat === null && c === 'Alles') || activeCat === c
                    ? 'bg-white/12 text-paper' : 'text-paper/65 hover:text-paper hover:bg-white/[0.07]')}>
                {c}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghostLight" size="sm" className="hidden sm:inline-flex" onClick={onAdmin}>
              Admin
            </Button>
            <button onClick={() => setOpen((o) => !o)} className="lg:hidden h-10 w-10 grid place-items-center rounded-full hover:bg-white/10 transition">
              {open ? <Ic.x size={20} /> : <Ic.menu size={20} />}
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-white/10 bg-charcoal">
          <div className="max-w-6xl mx-auto px-5 py-3 flex flex-wrap gap-1.5">
            {cats.map((c) => (
              <button key={c} onClick={() => { onCat(c === 'Alles' ? null : c); setOpen(false); }}
                className={'px-3.5 py-2 rounded-full text-[13px] font-medium transition ' +
                  ((activeCat === null && c === 'Alles') || activeCat === c
                    ? 'bg-white/14 text-paper' : 'text-paper/70 bg-white/[0.05]')}>
                {c}
              </button>
            ))}
            <button onClick={() => { onAdmin(); setOpen(false); }} className="px-3.5 py-2 rounded-full text-[13px] font-semibold bg-accent text-white">
              Admin portaal
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------- Hero (rotating featured quote) ---------- */
function Hero({ quotes, onExplore }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (quotes.length < 2) return;
    const t = setInterval(() => setI((x) => (x + 1) % quotes.length), 6500);
    return () => clearInterval(t);
  }, [quotes.length]);
  const q = quotes[i];
  return (
    <section className="relative overflow-hidden bg-charcoal text-paper">
      <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full blur-3xl opacity-30" style={{ background: 'var(--accent)' }} />
      <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full blur-3xl opacity-20" style={{ background: 'var(--accent)' }} />
      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
        <div className="flex items-center gap-2 text-paper/55 text-[12px] font-semibold tracking-[0.18em] uppercase mb-7">
          <Ic.sparkle size={15} className="text-accent" /> Dagelijkse inspiratie
        </div>
        {q && (
          <div key={q.id} className="max-w-3xl animate-rise">
            <blockquote className="font-serif text-[clamp(1.9rem,5vw,3.4rem)] leading-[1.12] tracking-[-0.01em] text-paper">
              <span className="text-accent">“</span>{q.quote}<span className="text-accent">”</span>
            </blockquote>
            <div className="mt-6 flex items-center gap-3 text-paper/55 text-sm">
              <span className="font-semibold text-paper/80 whitespace-nowrap">{q.author}</span>
              <span className="h-1 w-1 rounded-full bg-paper/30 shrink-0" />
              <span className="whitespace-nowrap">{q.category}</span>
            </div>
          </div>
        )}
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button variant="default" size="lg" onClick={onExplore}>
             Content verkennen <Ic.arrow size={17} />
          </Button>
          <div className="flex items-center gap-1.5 ml-1">
            {quotes.slice(0, 6).map((_, idx) => (
              <button key={idx} onClick={() => setI(idx)} aria-label={'Quote ' + (idx + 1)}
                className={'h-1.5 rounded-full transition-all ' + (idx === i ? 'w-6 bg-accent' : 'w-1.5 bg-paper/25 hover:bg-paper/45')} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Type filter ---------- */
function TypeFilter({ value, onChange }) {
  const types = [
    { id: null, label: 'Alles' },
    { id: 'quote', label: 'Quotes' },
    { id: 'article', label: 'Artikelen' },
    { id: 'photo', label: "Foto's" },
  ];
  return (
    <div className="flex items-center gap-4 flex-wrap">
      <div className="flex items-center gap-1.5 p-1 bg-ink/[0.05] rounded-full">
        {types.map((t) => (
          <button key={t.label} onClick={() => onChange(t.id)}
            className={'px-4 py-2 rounded-full text-[13px] font-semibold transition ' +
              (value === t.id ? 'bg-surface text-ink shadow-soft' : 'text-ink-soft hover:text-ink')}>
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- Content cards ---------- */
function QuoteCard({ item, onOpen }) {
  return (
    <Card onClick={() => onOpen(item)}
      className="group p-7 sm:p-8 cursor-pointer transition-all duration-300 hover:shadow-lift hover:-translate-y-1 hover-accent-border bg-gradient-to-br from-surface to-[oklch(0.97_0.02_72)]">
      <Ic.quote size={26} className="text-accent mb-4" />
      <p className="font-serif text-[1.45rem] leading-[1.3] text-ink tracking-[-0.005em]">{item.quote}</p>
      <div className="mt-6 flex items-center justify-between">
        <span className="text-sm font-semibold text-ink-soft">{item.author}</span>
        <Badge tone="accent" className="text-[11px]">{item.category}</Badge>
      </div>
    </Card>
  );
}
function ArticleCard({ item, onOpen }) {
  return (
    <Card onClick={() => onOpen(item)}
      className="group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lift hover:-translate-y-1 hover-accent-border">
      <Placeholder label="artikelfoto" ratio="16/9" rounded="rounded-none" />
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Badge tone="article">Artikel</Badge>
          <span className="text-[12px] text-faint">{item.category}</span>
        </div>
        <h3 className="font-sans font-bold text-lg leading-snug text-ink group-hover:text-accent transition-colors">{item.title}</h3>
        <p className="mt-2 text-[14px] text-ink-soft leading-relaxed line-clamp-3">{item.excerpt}</p>
        <div className="mt-4 flex items-center gap-2 text-[12px] text-faint">
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap"><Ic.clock size={13} /> {item.readingTime || 3} min lezen</span>
          <span className="h-1 w-1 rounded-full bg-faint/50" />
          <span className="whitespace-nowrap">{fmtDate(item.date)}</span>
        </div>
      </div>
    </Card>
  );
}
function PhotoCard({ item, onOpen }) {
  return (
    <Card onClick={() => onOpen(item)}
      className="group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lift hover:-translate-y-1 hover-accent-border p-0">
      <div className="relative">
        <Placeholder label="foto" ratio={item.ratio || '4/3'} rounded="rounded-none" />
        <div className="absolute top-3 left-3"><Badge tone="photo">Foto</Badge></div>
      </div>
      <div className="p-5">
        <h3 className="font-sans font-bold text-[15px] text-ink group-hover:text-accent transition-colors">{item.title}</h3>
        <p className="mt-1 text-[13px] text-ink-soft leading-relaxed">{item.caption}</p>
      </div>
    </Card>
  );
}
function ContentCard({ item, onOpen }) {
  if (item.type === 'quote') return <QuoteCard item={item} onOpen={onOpen} />;
  if (item.type === 'article') return <ArticleCard item={item} onOpen={onOpen} />;
  return <PhotoCard item={item} onOpen={onOpen} />;
}

/* ---------- Grid (masonry) ---------- */
function ContentGrid({ items, onOpen }) {
  if (items.length === 0) {
    return (
      <div className="text-center py-24">
        <div className="mx-auto h-14 w-14 grid place-items-center rounded-full bg-ink/[0.05] text-faint mb-4"><Ic.search size={22} /></div>
        <p className="font-serif text-xl text-ink">Niets gevonden</p>
        <p className="text-sm text-faint mt-1">Probeer een andere categorie of type.</p>
      </div>
    );
  }
  return (
    <div className="masonry">
      {items.map((it) => <div key={it.id} className="animate-rise"><ContentCard item={it} onOpen={onOpen} /></div>)}
    </div>
  );
}

/* ---------- Footer (brand) ---------- */
function Footer({ onAdmin }) {
  return (
    <footer className="bg-charcoal text-paper mt-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
        <h3 className="font-sans font-extrabold text-2xl sm:text-3xl leading-tight max-w-md">
          Donkey Inspire is een<br />initiatief van Donkey Mobile.
        </h3>
        <p className="mt-5 text-paper/55 text-sm leading-relaxed max-w-md">
          Wil je partner worden en jouw content aanbieden op Donkey Inspire?<br className="hidden sm:block" />
          Mail <a href="mailto:support@donkeymobile.app" className="text-accent font-medium hover:underline">support@donkeymobile.app</a>
        </p>
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5">
              <DonkeyMark size={30} />
              <span className="font-sans font-extrabold text-xl text-paper">Donkey Mobile</span>
            </div>
            <p className="mt-2 text-[12px] tracking-wide text-paper/45">We believe in the future of the church</p>
          </div>
          <div className="flex items-center gap-5 text-[13px] text-paper/55">
            <button onClick={onAdmin} className="hover:text-paper transition">Admin portaal</button>
            <span className="text-paper/25">·</span>
            <span>© 2026 Donkey Mobile</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, {
  fmtDate, PublicHeader, Hero, TypeFilter, ContentCard, ContentGrid, Footer,
});
