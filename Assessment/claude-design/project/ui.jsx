/* Donkey Inspire — shadcn-style UI primitives */
const { useState, useEffect, useRef, useCallback, createContext, useContext } = React;

/* ---------- Icons (simple line glyphs) ---------- */
function Icon({ path, size = 18, stroke = 1.7, fill, className = '', children }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill || 'none'}
      stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      {children || <path d={path} />}
    </svg>
  );
}
const Ic = {
  search:  (p) => <Icon {...p}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></Icon>,
  plus:    (p) => <Icon {...p} path="M12 5v14M5 12h14" />,
  edit:    (p) => <Icon {...p}><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></Icon>,
  trash:   (p) => <Icon {...p}><path d="M3 6h18" /><path d="M8 6V4h8v2" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /></Icon>,
  x:       (p) => <Icon {...p} path="M18 6 6 18M6 6l12 12" />,
  menu:    (p) => <Icon {...p} path="M3 6h18M3 12h18M3 18h18" />,
  back:    (p) => <Icon {...p} path="M19 12H5M12 19l-7-7 7-7" />,
  arrow:   (p) => <Icon {...p} path="M5 12h14M12 5l7 7-7 7" />,
  quote:   (p) => <Icon {...p}><path d="M7 7c-2 0-3 1.6-3 3.5S5.4 14 7 14c.9 0 1.4-.3 1.7-.6C8.6 16 7.4 17 6 17.5M17 7c-2 0-3 1.6-3 3.5S15.4 14 17 14c.9 0 1.4-.3 1.7-.6C18.6 16 17.4 17 16 17.5" /></Icon>,
  image:   (p) => <Icon {...p}><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="1.6" /><path d="m3 17 4.5-4.5a2 2 0 0 1 2.8 0L17 19" /></Icon>,
  article: (p) => <Icon {...p}><path d="M4 4h16v16H4z" /><path d="M8 8h8M8 12h8M8 16h5" /></Icon>,
  sparkle: (p) => <Icon {...p}><path d="M12 3l1.6 4.8L18 9.4l-4.4 1.6L12 16l-1.6-5L6 9.4l4.4-1.6L12 3Z" /></Icon>,
  chevron: (p) => <Icon {...p} path="M6 9l6 6 6-6" />,
  mail:    (p) => <Icon {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></Icon>,
  check:   (p) => <Icon {...p} path="M20 6 9 17l-5-5" />,
  eye:     (p) => <Icon {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="2.5" /></Icon>,
  eyeOff:  (p) => <Icon {...p}><path d="M9.9 5.2A9.5 9.5 0 0 1 12 5c6.5 0 10 7 10 7a16 16 0 0 1-3 3.6M6.4 6.4A16 16 0 0 0 2 12s3.5 7 10 7a9.5 9.5 0 0 0 4-.9" /><path d="m3 3 18 18" /></Icon>,
  layout:  (p) => <Icon {...p}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></Icon>,
  grid:    (p) => <Icon {...p}><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></Icon>,
  clock:   (p) => <Icon {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Icon>,
  reset:   (p) => <Icon {...p}><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></Icon>,
};

/* ---------- Donkey wordmark + mark ---------- */
function DonkeyMark({ size = 30, tone = 'amber' }) {
  const fill = tone === 'amber' ? 'var(--accent)' : 'currentColor';
  // simple two-ear mark built from basic rounded shapes
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <rect x="13" y="6" width="6.6" height="20" rx="3.3" transform="rotate(-13 16.3 16)" fill={fill} />
      <rect x="20.4" y="6" width="6.6" height="20" rx="3.3" transform="rotate(13 23.7 16)" fill={fill} />
      <path d="M11 25c0-2.8 4-4.5 9-4.5s9 1.7 9 4.5c0 4.5-4 8-9 8s-9-3.5-9-8Z" fill={fill} opacity="0.92" />
    </svg>
  );
}
function Logo({ light = false, size = 30, className = '' }) {
  return (
    <div className={'flex items-center gap-2.5 ' + className}>
      <DonkeyMark size={size} />
      <span className={'font-sans font-extrabold tracking-tight leading-none ' + (light ? 'text-paper' : 'text-ink')}
        style={{ fontSize: size * 0.62 }}>
        Donkey <span className="text-accent">Inspire</span>
      </span>
    </div>
  );
}

/* ---------- Button ---------- */
function Button({ variant = 'default', size = 'md', className = '', children, ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 font-sans font-semibold whitespace-nowrap rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-accent disabled:opacity-50 disabled:pointer-events-none select-none';
  const sizes = {
    sm: 'h-9 px-4 text-[13px]',
    md: 'h-11 px-5 text-sm',
    lg: 'h-12 px-7 text-[15px]',
    icon: 'h-10 w-10',
    iconSm: 'h-9 w-9',
  };
  const variants = {
    default: 'bg-accent text-white shadow-soft hover:brightness-[1.06] active:brightness-95 hover:-translate-y-[1px]',
    dark:    'bg-charcoal text-paper hover:bg-charcoal-soft hover:-translate-y-[1px] shadow-soft',
    outline: 'border border-line bg-surface text-ink hover:bg-paper hover:border-ink/20',
    ghost:   'text-ink-soft hover:bg-ink/[0.05] hover:text-ink',
    ghostLight: 'text-paper/70 hover:bg-white/10 hover:text-paper',
    subtle:  'bg-ink/[0.05] text-ink hover:bg-ink/[0.09]',
    danger:  'bg-surface border border-line text-ink hover:border-red-300 hover:bg-red-50 hover:text-red-700',
  };
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

/* ---------- Card ---------- */
function Card({ className = '', children, ...props }) {
  return <div className={'bg-surface border border-line rounded-2xl ' + className} {...props}>{children}</div>;
}

/* ---------- Badge ---------- */
function Badge({ tone = 'neutral', className = '', children }) {
  const tones = {
    neutral: 'bg-ink/[0.06] text-ink-soft',
    accent:  'text-accent',
    quote:   'bg-amber-soft/50 text-terracotta-dark',
    article: 'bg-[oklch(0.92_0.03_150)] text-[oklch(0.42_0.06_150)]',
    photo:   'bg-[oklch(0.92_0.035_240)] text-[oklch(0.44_0.07_245)]',
    draft:   'bg-[oklch(0.93_0.02_70)] text-faint',
    published:'bg-[oklch(0.92_0.04_150)] text-[oklch(0.44_0.07_150)]',
  };
  return (
    <span className={'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase ' + (tones[tone] || tones.neutral) + ' ' + className}>
      {children}
    </span>
  );
}
const TYPE_BADGE = { quote: 'quote', article: 'article', photo: 'photo' };
const TYPE_LABEL = { quote: 'Quote', article: 'Artikel', photo: 'Foto' };

/* ---------- Inputs ---------- */
function Field({ label, hint, error, children }) {
  return (
    <label className="block">
      {label && <span className="block text-[13px] font-semibold text-ink mb-1.5">{label}</span>}
      {children}
      {error ? <span className="block text-[12px] text-red-600 mt-1.5">{error}</span>
        : hint ? <span className="block text-[12px] text-faint mt-1.5">{hint}</span> : null}
    </label>
  );
}
function Input({ className = '', invalid, ...props }) {
  return <input className={'w-full h-11 px-3.5 rounded-xl bg-surface border text-sm text-ink placeholder:text-faint/70 transition focus:outline-none focus:ring-2 ring-accent ' + (invalid ? 'border-red-300' : 'border-line focus:border-accent') + ' ' + className} {...props} />;
}
function Textarea({ className = '', invalid, ...props }) {
  return <textarea className={'w-full px-3.5 py-3 rounded-xl bg-surface border text-sm text-ink placeholder:text-faint/70 leading-relaxed transition focus:outline-none focus:ring-2 ring-accent resize-y ' + (invalid ? 'border-red-300' : 'border-line focus:border-accent') + ' ' + className} {...props} />;
}
function Select({ className = '', children, ...props }) {
  return (
    <div className="relative">
      <select className={'w-full h-11 pl-3.5 pr-10 rounded-xl bg-surface border border-line text-sm text-ink appearance-none transition focus:outline-none focus:ring-2 ring-accent focus:border-accent ' + className} {...props}>
        {children}
      </select>
      <Ic.chevron size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-faint pointer-events-none" />
    </div>
  );
}

/* ---------- Dialog (modal) ---------- */
function Dialog({ open, onClose, children, className = '', size = 'md' }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, onClose]);
  if (!open) return null;
  const widths = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl' };
  return (
    <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-0 sm:p-6">
      <div className="absolute inset-0 bg-charcoal/45 backdrop-blur-[2px] animate-fade-in" onClick={onClose} />
      <div className={'relative w-full ' + widths[size] + ' bg-surface rounded-t-2xl sm:rounded-2xl shadow-lift border border-line max-h-[92vh] overflow-y-auto scroll-thin animate-scale-in ' + className}>
        {children}
      </div>
    </div>
  );
}

/* ---------- Toast ---------- */
const ToastCtx = createContext(null);
function useToast() { return useContext(ToastCtx); }
function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const push = useCallback((msg, opts = {}) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, msg, ...opts }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), opts.duration || 2600);
  }, []);
  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-2 w-full px-4 sm:px-0 sm:w-auto pointer-events-none">
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto flex items-center gap-2.5 bg-charcoal text-paper rounded-full pl-3.5 pr-5 py-2.5 shadow-lift animate-rise text-sm font-medium">
            <span className={'grid place-items-center h-5 w-5 rounded-full ' + (t.tone === 'danger' ? 'bg-red-500/90' : 'bg-accent')}>
              {t.tone === 'danger' ? <Ic.trash size={12} /> : <Ic.check size={13} />}
            </span>
            {t.msg}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

/* ---------- Striped image placeholder ---------- */
function Placeholder({ label = 'foto', ratio = '4/3', rounded = 'rounded-xl', className = '' }) {
  return (
    <div className={'relative w-full overflow-hidden ' + rounded + ' ' + className}
      style={{ aspectRatio: ratio.replace('/', ' / '),
        background: 'repeating-linear-gradient(135deg, oklch(0.93 0.02 70) 0 14px, oklch(0.955 0.012 72) 14px 28px)' }}>
      <div className="absolute inset-0 grid place-items-center">
        <span className="font-mono text-[11px] tracking-wider text-faint/80 bg-surface/70 px-2.5 py-1 rounded-md backdrop-blur-sm">
          {label}
        </span>
      </div>
    </div>
  );
}

/* expose */
Object.assign(window, {
  Ic, DonkeyMark, Logo, Button, Card, Badge, TYPE_BADGE, TYPE_LABEL,
  Field, Input, Textarea, Select, Dialog, ToastProvider, useToast, Placeholder,
});
