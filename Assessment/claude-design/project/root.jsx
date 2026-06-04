/* Donkey Inspire — root app, routing, detail view */
const { useMemo } = React;

/* ---------- Detail view (full reading overlay) ---------- */
function DetailView({ item, onClose, related, onOpen }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', onKey); };
  }, [item, onClose]);
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[70] bg-paper overflow-y-auto scroll-thin">
      {/* top bar */}
      <div className="sticky top-0 z-10 bg-paper/85 backdrop-blur border-b border-line">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 h-15 py-3 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onClose}><Ic.back size={16} /> Terug</Button>
          <div className="flex items-center gap-2">
            <Badge tone={TYPE_BADGE[item.type]}>{TYPE_LABEL[item.type]}</Badge>
            <Badge tone="neutral">{item.category}</Badge>
          </div>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-5 sm:px-8 pb-20">
        {item.type === 'quote' && (
          <div className="min-h-[58vh] flex flex-col justify-center py-16 text-center animate-rise">
            <Ic.quote size={40} className="text-accent mx-auto mb-8" />
            <blockquote className="font-serif text-[clamp(1.9rem,5.5vw,3.2rem)] leading-[1.18] tracking-[-0.01em] text-ink">
              {item.quote}
            </blockquote>
            <div className="mt-10 flex items-center justify-center gap-3 text-ink-soft">
              <span className="h-px w-8 bg-line" />
              <span className="font-semibold">{item.author}</span>
              <span className="h-px w-8 bg-line" />
            </div>
          </div>
        )}

        {item.type === 'article' && (
          <div className="py-10 animate-rise">
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-accent mb-3">{item.category}</p>
            <h1 className="font-sans font-extrabold text-[clamp(1.8rem,4.5vw,2.7rem)] leading-[1.12] tracking-tight text-ink">{item.title}</h1>
            <div className="mt-4 flex items-center gap-3 text-[13px] text-faint">
              <span className="font-semibold text-ink-soft">{item.author}</span>
              <span className="h-1 w-1 rounded-full bg-faint/50" />
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap"><Ic.clock size={14} /> {item.readingTime || 3} min lezen</span>
              <span className="h-1 w-1 rounded-full bg-faint/50" />
              <span className="whitespace-nowrap">{fmtDate(item.date)}</span>
            </div>
            <Placeholder label="artikelfoto" ratio="16/9" className="my-8" />
            {item.excerpt && <p className="font-serif text-xl leading-relaxed text-ink-soft italic mb-6">{item.excerpt}</p>}
            <div className="font-serif text-[1.18rem] leading-[1.75] text-ink space-y-5">
              {(item.body || '').split('\n').filter((p) => p.trim()).map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        )}

        {item.type === 'photo' && (
          <div className="py-10 animate-rise">
            <Placeholder label="foto" ratio={item.ratio || '4/3'} className="mb-7 shadow-soft" />
            <h1 className="font-sans font-bold text-2xl text-ink">{item.title}</h1>
            <p className="mt-3 font-serif text-xl leading-relaxed text-ink-soft italic">{item.caption}</p>
            <div className="mt-5 text-[13px] text-faint">{item.author} · {fmtDate(item.date)}</div>
          </div>
        )}

        {/* related */}
        {related && related.length > 0 && (
          <div className="mt-16 pt-10 border-t border-line">
            <h3 className="font-sans font-bold text-lg text-ink mb-5">Meer inspiratie</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {related.map((r) => (
                <button key={r.id} onClick={() => onOpen(r)} className="text-left group">
                  <Card className="p-5 h-full transition-all hover:shadow-soft hover:-translate-y-0.5 hover-accent-border">
                    <Badge tone={TYPE_BADGE[r.type]}>{TYPE_LABEL[r.type]}</Badge>
                    <p className="mt-3 font-serif text-[15px] leading-snug text-ink line-clamp-3 group-hover:text-accent transition-colors">
                      {r.quote || r.title}
                    </p>
                  </Card>
                </button>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}

/* ---------- Public site page ---------- */
function PublicSite({ items, onOpen, onAdmin }) {
  const [typeF, setTypeF] = useState(null);
  const [cat, setCat] = useState(null);
  const gridRef = useRef(null);

  const published = items.filter((i) => i.status === 'published');
  const quotes = published.filter((i) => i.type === 'quote');
  const visible = published.filter((i) => (!typeF || i.type === typeF) && (!cat || i.category === cat));

  const scrollToGrid = () => { if (gridRef.current) window.scrollTo({ top: gridRef.current.offsetTop - 80, behavior: 'smooth' }); };

  return (
    <div className="min-h-screen bg-paper">
      <PublicHeader onAdmin={onAdmin} onHome={() => { setCat(null); setTypeF(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        activeCat={cat} onCat={(c) => { setCat(c); setTimeout(scrollToGrid, 60); }} />
      <Hero quotes={quotes} onExplore={scrollToGrid} />

      <main ref={gridRef} className="max-w-6xl mx-auto px-5 sm:px-8 py-12 sm:py-16 scroll-mt-20">
        <div className="flex flex-col gap-6 mb-8">
          <div>
            <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-ink tracking-tight">
              {cat ? cat : 'Ontdek inspiratie'}
            </h2>
            <p className="text-sm text-faint mt-1.5">
              {visible.length} {visible.length === 1 ? 'item' : 'items'}{cat ? ' in ' + cat : ''} · quotes, artikelen en foto's
            </p>
          </div>
          <TypeFilter value={typeF} onChange={setTypeF} />
        </div>

        <ContentGrid items={visible} onOpen={onOpen} />
      </main>

      <Footer onAdmin={onAdmin} />
    </div>
  );
}

/* ---------- Tweaks ---------- */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#b5613c"
}/*EDITMODE-END*/;
window.__tweaks = { ...TWEAK_DEFAULTS };

/* ---------- Root ---------- */
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [items, setItems] = useState(() => window.DonkeyData.load());
  const [route, setRoute] = useState(() => window.location.hash || '#/');

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash || '#/');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const persist = (next) => { setItems(next); window.DonkeyData.save(next); };
  const create = (it) => persist([{ ...it, id: window.DonkeyData.uid() }, ...items]);
  const update = (it) => persist(items.map((x) => (x.id === it.id ? it : x)));
  const remove = (id) => persist(items.filter((x) => x.id !== id));
  const reset = () => persist(window.DonkeyData.reset());

  const go = (hash) => { window.location.hash = hash; };

  // apply tweaks: accent colour
  useEffect(() => {
    document.documentElement.style.setProperty('--accent', t.accent);
    window.__tweaks = t;
  }, [t.accent]);

  // routing
  const isAdmin = route.startsWith('#/admin');
  const itemMatch = route.match(/^#\/item\/(.+)$/);
  const selected = itemMatch ? items.find((i) => i.id === itemMatch[1]) : null;

  const openItem = (it) => go('#/item/' + it.id);
  const related = useMemo(() => {
    if (!selected) return [];
    return items.filter((i) => i.status === 'published' && i.id !== selected.id && i.category === selected.category).slice(0, 4);
  }, [selected, items]);

  return (
    <ToastProvider>
      {isAdmin ? (
        <AdminPortal items={items} onCreate={create} onUpdate={update} onDelete={remove}
          onViewSite={() => go('#/')} onReset={reset} />
      ) : (
        <PublicSite items={items} onOpen={openItem} onAdmin={() => go('#/admin')} />
      )}
      {selected && !isAdmin && (
        <DetailView item={selected} related={related} onOpen={openItem} onClose={() => go('#/')} />
      )}

      <TweaksPanel>
        <TweakSection label="Vormgeving" />
        <TweakColor label="Accentkleur" value={t.accent}
          options={['#b5613c', '#c0883a', '#a8503a', '#7e8a5e']}
          onChange={(v) => setTweak('accent', v)} />
      </TweaksPanel>
    </ToastProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
