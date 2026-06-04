"use client";

export function Footer({ onAdmin }: { onAdmin: () => void }) {
  return (
    <footer className="bg-charcoal text-paper mt-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
        <h3 className="font-sans font-extrabold text-2xl sm:text-3xl leading-tight max-w-md">
          Donkey Inspire is een
          <br />
          initiatief van Donkey Mobile.
        </h3>
        <p className="mt-5 text-paper/55 text-sm leading-relaxed max-w-md">
          Wil je partner worden en jouw content aanbieden op Donkey Inspire?
          <br className="hidden sm:block" />
          Mail{" "}
          <a
            href="mailto:support@donkeymobile.app"
            className="text-accent font-medium hover:underline"
          >
            support@donkeymobile.app
          </a>
        </p>
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-sans font-extrabold text-xl text-paper">Donkey Mobile</span>
            </div>
            <p className="mt-2 text-[12px] tracking-wide text-paper/45">
              We believe in the future of the church
            </p>
          </div>
          <div className="flex items-center gap-5 text-[13px] text-paper/55">
            <button onClick={onAdmin} className="hover:text-paper transition">
              Admin portaal
            </button>
            <span className="text-paper/25">·</span>
            <span>© 2026 Donkey Mobile</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
