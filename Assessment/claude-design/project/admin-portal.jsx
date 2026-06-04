/* Donkey Inspire — admin portal (CRUD) */

/* ---------- empty templates per type ---------- */
function emptyItem(type) {
  const base = { id: null, type, status: 'published', category: 'Geloof', author: '', date: new Date().toISOString().slice(0, 10) };
  if (type === 'quote') return { ...base, title: '', quote: '', author: 'Donkey Inspire' };
  if (type === 'article') return { ...base, title: '', excerpt: '', body: '', readingTime: 3, author: 'Redactie' };
  return { ...base, title: '', caption: '', ratio: '4/3', author: 'Beeldarchief' };
}

/* ---------- Admin top bar ---------- */
function AdminBar({ onViewSite, onReset }) {
  return (
    <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur border-b border-line">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Logo size={26} />
          <span className="hidden sm:inline-flex items-center whitespace-nowrap text-[11px] font-bold tracking-wider uppercase text-faint border border-line rounded-full px-2.5 py-1">
            Admin portaal
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onReset} title="Voorbeelddata herstellen">
            <Ic.reset size={15} /> <span className="hidden sm:inline">Reset</span>
          </Button>
          <Button variant="outline" size="sm" onClick={onViewSite}>
            <Ic.eye size={15} /> Bekijk site
          </Button>
        </div>
      </div>
    </header>
  );
}

/* ---------- Stat tile ---------- */
function Stat({ label, value, icon, accent }) {
  return (
    <Card className="p-5 flex items-center gap-4">
      <div className={'h-11 w-11 shrink-0 grid place-items-center rounded-xl ' + (accent ? 'bg-accent text-white' : 'bg-ink/[0.05] text-ink-soft')}>
        {icon}
      </div>
      <div>
        <div className="text-2xl font-extrabold text-ink leading-none">{value}</div>
        <div className="text-[12px] text-faint mt-1">{label}</div>
      </div>
    </Card>
  );
}

/* ---------- Content form dialog ---------- */
function ContentForm({ open, initial, onClose, onSave }) {
  const [item, setItem] = useState(initial || emptyItem('quote'));
  const [errors, setErrors] = useState({});
  useEffect(() => { if (open) { setItem(initial || emptyItem('quote')); setErrors({}); } }, [open, initial]);
  const isEdit = !!(initial && initial.id);
  const set = (k, v) => setItem((p) => ({ ...p, [k]: v }));
  const setType = (t) => setItem((p) => ({ ...emptyItem(t), id: p.id, category: p.category, status: p.status, title: p.title }));

  function validate() {
    const e = {};
    if (item.type !== 'quote' && !item.title.trim()) e.title = 'Titel is verplicht';
    if (item.type === 'quote' && !item.quote.trim()) e.quote = 'Quote is verplicht';
    if (item.type === 'article' && !item.body.trim()) e.body = 'Tekst is verplicht';
    if (item.type === 'photo' && !item.caption.trim()) e.caption = 'Bijschrift is verplicht';
    if (!item.author.trim()) e.author = 'Auteur is verplicht';
    setErrors(e);
    return Object.keys(e).length === 0;
  }
  function submit() { if (validate()) onSave(item); }

  const types = window.DonkeyData.TYPES;
  return (
    <Dialog open={open} onClose={onClose} size="lg">
      <div className="sticky top-0 bg-surface/95 backdrop-blur border-b border-line px-6 py-4 flex items-center justify-between z-10">
        <h2 className="font-sans font-bold text-lg text-ink">{isEdit ? 'Content bewerken' : 'Nieuwe content'}</h2>
        <button onClick={onClose} className="h-9 w-9 grid place-items-center rounded-full hover:bg-ink/[0.06] text-ink-soft transition"><Ic.x size={18} /></button>
      </div>
      <div className="px-6 py-5 space-y-5">
        {/* type segmented */}
        <div>
          <span className="block text-[13px] font-semibold text-ink mb-1.5">Type content</span>
          <div className="grid grid-cols-3 gap-2">
            {types.map((t) => {
              const Icn = t.id === 'quote' ? Ic.quote : t.id === 'article' ? Ic.article : Ic.image;
              const on = item.type === t.id;
              return (
                <button key={t.id} onClick={() => setType(t.id)} disabled={isEdit}
                  className={'flex flex-col items-center gap-1.5 py-3 rounded-xl border text-[13px] font-semibold transition ' +
                    (on ? 'border-accent bg-accent-soft text-accent' : 'border-line text-ink-soft hover:border-ink/25') +
                    (isEdit ? ' opacity-60 cursor-not-allowed' : '')}>
                  <Icn size={19} /> {t.nl}
                </button>
              );
            })}
          </div>
        </div>

        {item.type === 'quote' && (
          <Field label="Quote" error={errors.quote}>
            <Textarea rows={3} value={item.quote} invalid={!!errors.quote}
              onChange={(e) => set('quote', e.target.value)} placeholder="Een korte, inspirerende tekst…" />
          </Field>
        )}
        {item.type !== 'quote' && (
          <Field label="Titel" error={errors.title}>
            <Input value={item.title} invalid={!!errors.title} onChange={(e) => set('title', e.target.value)} placeholder="Titel van de content" />
          </Field>
        )}
        {item.type === 'article' && (
          <>
            <Field label="Samenvatting" hint="Korte intro op de overzichtskaart.">
              <Textarea rows={2} value={item.excerpt} onChange={(e) => set('excerpt', e.target.value)} placeholder="Korte samenvatting…" />
            </Field>
            <Field label="Tekst" error={errors.body} hint="Gebruik een lege regel voor een nieuwe alinea.">
              <Textarea rows={6} value={item.body} invalid={!!errors.body} onChange={(e) => set('body', e.target.value)} placeholder="De volledige tekst…" />
            </Field>
          </>
        )}
        {item.type === 'photo' && (
          <Field label="Bijschrift" error={errors.caption}>
            <Textarea rows={2} value={item.caption} invalid={!!errors.caption} onChange={(e) => set('caption', e.target.value)} placeholder="Korte beschrijving bij de foto…" />
          </Field>
        )}

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Auteur / bron" error={errors.author}>
            <Input value={item.author} invalid={!!errors.author} onChange={(e) => set('author', e.target.value)} />
          </Field>
          <Field label="Categorie">
            <Select value={item.category} onChange={(e) => set('category', e.target.value)}>
              {window.DonkeyData.CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </Select>
          </Field>
          {item.type === 'article' && (
            <Field label="Leestijd (min)">
              <Input type="number" min="1" max="60" value={item.readingTime} onChange={(e) => set('readingTime', parseInt(e.target.value || '1', 10))} />
            </Field>
          )}
          {item.type === 'photo' && (
            <Field label="Verhouding">
              <Select value={item.ratio} onChange={(e) => set('ratio', e.target.value)}>
                <option value="4/3">Liggend (4:3)</option>
                <option value="16/9">Breed (16:9)</option>
                <option value="1/1">Vierkant (1:1)</option>
                <option value="4/5">Staand (4:5)</option>
              </Select>
            </Field>
          )}
          <Field label="Status">
            <Select value={item.status} onChange={(e) => set('status', e.target.value)}>
              <option value="published">Gepubliceerd</option>
              <option value="draft">Concept</option>
            </Select>
          </Field>
        </div>
      </div>
      <div className="sticky bottom-0 bg-surface/95 backdrop-blur border-t border-line px-6 py-4 flex items-center justify-end gap-3">
        <Button variant="ghost" onClick={onClose}>Annuleren</Button>
        <Button variant="default" onClick={submit}><Ic.check size={16} /> {isEdit ? 'Wijzigingen opslaan' : 'Publiceren'}</Button>
      </div>
    </Dialog>
  );
}

/* ---------- Delete confirm ---------- */
function ConfirmDelete({ open, item, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose} size="sm">
      <div className="p-6">
        <div className="h-12 w-12 grid place-items-center rounded-full bg-red-50 text-red-600 mb-4"><Ic.trash size={22} /></div>
        <h2 className="font-sans font-bold text-lg text-ink">Content verwijderen?</h2>
        <p className="text-sm text-ink-soft mt-2 leading-relaxed">
          Weet je zeker dat je <span className="font-semibold text-ink">“{item ? (item.title || item.quote) : ''}”</span> wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose}>Annuleren</Button>
          <button onClick={onConfirm} className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition">
            <Ic.trash size={16} /> Verwijderen
          </button>
        </div>
      </div>
    </Dialog>
  );
}

/* ---------- Row (desktop) + card (mobile) ---------- */
function AdminRow({ item, onEdit, onDelete }) {
  const Icn = item.type === 'quote' ? Ic.quote : item.type === 'article' ? Ic.article : Ic.image;
  return (
    <tr className="group border-t border-line hover:bg-paper/60 transition">
      <td className="py-3.5 pl-5 pr-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 shrink-0 grid place-items-center rounded-lg bg-ink/[0.05] text-ink-soft"><Icn size={16} /></div>
          <div className="min-w-0">
            <div className="font-semibold text-ink text-[14px] truncate max-w-[260px]">{item.title || item.quote}</div>
            <div className="text-[12px] text-faint">{item.author}</div>
          </div>
        </div>
      </td>
      <td className="px-3"><Badge tone={TYPE_BADGE[item.type]}>{TYPE_LABEL[item.type]}</Badge></td>
      <td className="px-3 text-[13px] text-ink-soft">{item.category}</td>
      <td className="px-3"><Badge tone={item.status === 'published' ? 'published' : 'draft'}>{item.status === 'published' ? 'Live' : 'Concept'}</Badge></td>
      <td className="px-3 text-[13px] text-faint whitespace-nowrap">{fmtDate(item.date)}</td>
      <td className="pr-5 pl-3">
        <div className="flex items-center justify-end gap-1 opacity-60 group-hover:opacity-100 transition">
          <button onClick={() => onEdit(item)} className="h-9 w-9 grid place-items-center rounded-lg hover:bg-ink/[0.07] text-ink-soft hover:text-ink transition" title="Bewerken"><Ic.edit size={16} /></button>
          <button onClick={() => onDelete(item)} className="h-9 w-9 grid place-items-center rounded-lg hover:bg-red-50 text-ink-soft hover:text-red-600 transition" title="Verwijderen"><Ic.trash size={16} /></button>
        </div>
      </td>
    </tr>
  );
}
function AdminMobileCard({ item, onEdit, onDelete }) {
  const Icn = item.type === 'quote' ? Ic.quote : item.type === 'article' ? Ic.article : Ic.image;
  return (
    <Card className="p-4">
      <div className="flex items-start gap-3">
        <div className="h-9 w-9 shrink-0 grid place-items-center rounded-lg bg-ink/[0.05] text-ink-soft"><Icn size={16} /></div>
        <div className="min-w-0 flex-1">
          <div className="font-semibold text-ink text-[14px] leading-snug">{item.title || item.quote}</div>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <Badge tone={TYPE_BADGE[item.type]}>{TYPE_LABEL[item.type]}</Badge>
            <Badge tone={item.status === 'published' ? 'published' : 'draft'}>{item.status === 'published' ? 'Live' : 'Concept'}</Badge>
            <span className="text-[12px] text-faint">{item.category}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-line">
        <Button variant="subtle" size="sm" className="flex-1" onClick={() => onEdit(item)}><Ic.edit size={15} /> Bewerken</Button>
        <Button variant="danger" size="sm" onClick={() => onDelete(item)}><Ic.trash size={15} /></Button>
      </div>
    </Card>
  );
}

/* ---------- Admin portal ---------- */
function AdminPortal({ items, onCreate, onUpdate, onDelete, onViewSite, onReset }) {
  const [q, setQ] = useState('');
  const [typeF, setTypeF] = useState('all');
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirming, setConfirming] = useState(null);
  const toast = useToast();

  const filtered = items.filter((it) => {
    if (typeF !== 'all' && it.type !== typeF) return false;
    if (q.trim()) {
      const s = (it.title + ' ' + (it.quote || '') + ' ' + (it.excerpt || '') + ' ' + it.author + ' ' + it.category).toLowerCase();
      if (!s.includes(q.toLowerCase())) return false;
    }
    return true;
  });
  const counts = {
    total: items.length,
    quote: items.filter((i) => i.type === 'quote').length,
    article: items.filter((i) => i.type === 'article').length,
    photo: items.filter((i) => i.type === 'photo').length,
    draft: items.filter((i) => i.status === 'draft').length,
  };

  function openNew() { setEditing(null); setFormOpen(true); }
  function openEdit(it) { setEditing(it); setFormOpen(true); }
  function handleSave(it) {
    if (it.id) { onUpdate(it); toast('Wijzigingen opgeslagen'); }
    else { onCreate(it); toast('Content gepubliceerd'); }
    setFormOpen(false);
  }
  function handleDelete() { onDelete(confirming.id); toast('Content verwijderd', { tone: 'danger' }); setConfirming(null); }

  return (
    <div className="min-h-screen bg-paper">
      <AdminBar onViewSite={onViewSite} onReset={() => { onReset(); toast('Voorbeelddata hersteld'); }} />
      <main className="max-w-6xl mx-auto px-5 sm:px-8 py-8">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="font-sans font-extrabold text-2xl sm:text-[28px] text-ink tracking-tight">Content beheren</h1>
            <p className="text-sm text-faint mt-1">Bekijk, voeg toe, bewerk en verwijder inspirerende content.</p>
          </div>
          <Button variant="default" className="hidden sm:inline-flex" onClick={openNew}><Ic.plus size={17} /> Nieuwe content</Button>
        </div>

        {/* stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
          <Stat label="Totaal items" value={counts.total} icon={<Ic.layout size={19} />} accent />
          <Stat label="Quotes" value={counts.quote} icon={<Ic.quote size={19} />} />
          <Stat label="Artikelen" value={counts.article} icon={<Ic.article size={19} />} />
          <Stat label="Concepten" value={counts.draft} icon={<Ic.eyeOff size={19} />} />
        </div>

        {/* toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Ic.search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-faint" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Zoek op titel, auteur of categorie…" className="pl-10" />
          </div>
          <div className="flex gap-3">
            <Select value={typeF} onChange={(e) => setTypeF(e.target.value)} className="sm:w-44">
              <option value="all">Alle types</option>
              <option value="quote">Quotes</option>
              <option value="article">Artikelen</option>
              <option value="photo">Foto's</option>
            </Select>
            <Button variant="default" className="sm:hidden flex-1" onClick={openNew}><Ic.plus size={17} /> Nieuw</Button>
          </div>
        </div>

        {/* desktop table */}
        <Card className="hidden md:block overflow-hidden p-0">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[11px] font-bold uppercase tracking-wider text-faint">
                <th className="py-3 pl-5 pr-3 font-bold">Content</th>
                <th className="px-3 font-bold">Type</th>
                <th className="px-3 font-bold">Categorie</th>
                <th className="px-3 font-bold">Status</th>
                <th className="px-3 font-bold">Datum</th>
                <th className="pr-5 pl-3 font-bold text-right">Acties</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((it) => <AdminRow key={it.id} item={it} onEdit={openEdit} onDelete={setConfirming} />)}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="py-16 text-center text-sm text-faint">Geen content gevonden.</div>}
        </Card>

        {/* mobile cards */}
        <div className="md:hidden space-y-3">
          {filtered.map((it) => <AdminMobileCard key={it.id} item={it} onEdit={openEdit} onDelete={setConfirming} />)}
          {filtered.length === 0 && <div className="py-12 text-center text-sm text-faint">Geen content gevonden.</div>}
        </div>
      </main>

      <ContentForm open={formOpen} initial={editing} onClose={() => setFormOpen(false)} onSave={handleSave} />
      <ConfirmDelete open={!!confirming} item={confirming} onClose={() => setConfirming(null)} onConfirm={handleDelete} />
    </div>
  );
}

Object.assign(window, { AdminPortal });
