import { MapPin, Phone, Clock, ArrowUpRight, Facebook, Instagram, Star } from 'lucide-react';

// Liens externes (remplacer par les vrais comptes réseaux quand disponibles)
const MAPS_URL = 'https://maps.app.goo.gl/PVWaAoi14BR8aqrs9';
const GOOGLE_REVIEWS_URL = 'https://share.google/zO5yZSomEHcDOjkdv';
const FACEBOOK_URL = '#';
const INSTAGRAM_URL = '#';
const TEL = 'tel:+33140356629';

const navLinks = [
  { label: 'La Boulangerie', href: '#cortex' },
  { label: 'Tradition', href: '#about' },
  { label: 'Savoir-Faire', href: '#solutions' },
  { label: 'Nous Trouver', href: '#nous-trouver' },
  { label: 'L’Atelier', href: '#atelier' },
  { label: 'Avis Clients', href: '#temoignages' },
];

const creations = ['Pains au Levain', 'Viennoiseries Pur Beurre', 'Pâtisseries Fines', 'Snacking & Sandwichs'];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-50 -mt-8 md:-mt-16 rounded-t-[28px] md:rounded-t-[48px] shadow-[0_-28px_80px_-30px_rgba(0,0,0,0.7)] bg-[#0b0705] text-white font-body pt-20 md:pt-28 pb-10 px-6 md:px-12 lg:px-[120px] overflow-hidden border-t border-amber-950/40">
      {/* Halo décoratif */}
      <div className="pointer-events-none absolute -top-24 right-10 w-[440px] h-[440px] rounded-full bg-amber-500/10 blur-[130px]" />

      <div className="relative">
        {/* Haut : marque + CTA */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 pb-14 border-b border-white/10">
          <div className="max-w-md">
            <div className="text-[11px] uppercase tracking-[0.2em] text-amber-400/70 mb-3">
              Boulangerie Pâtisserie · Paris 9ᵉ
            </div>
            <h2 className="font-heading italic text-4xl md:text-5xl leading-[0.95] mb-4">
              <span className="text-white">Miche </span>
              <span className="text-amber-300">de Pain</span>
            </h2>
            <p className="text-amber-100/60 text-sm leading-relaxed">
              Pain au levain naturel, viennoiseries pur beurre AOP et pâtisseries fines, façonnés à la
              main chaque matin au cœur de Paris.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-full px-5 py-3 text-sm font-semibold shadow-xl shadow-amber-500/10 transition-colors"
            >
              <MapPin className="w-4 h-4" />
              Itinéraire Google Maps
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href={TEL}
              className="inline-flex items-center gap-2 border border-amber-100/20 hover:border-amber-300/50 hover:bg-white/5 text-amber-100 rounded-full px-5 py-3 text-sm font-medium transition-colors"
            >
              <Phone className="w-4 h-4 text-amber-300" />
              Nous appeler
            </a>
          </div>
        </div>

        {/* Grille colonnes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-14">
          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-amber-400 mb-5">Nous trouver</h3>
            <ul className="space-y-4 text-sm text-amber-100/70">
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 text-amber-400/70 shrink-0 mt-0.5" />
                <span>42 Rue Cadet<br />75009 Paris, France</span>
              </li>
              <li>
                <a href={TEL} className="flex gap-3 hover:text-amber-300 transition-colors">
                  <Phone className="w-4 h-4 text-amber-400/70 shrink-0 mt-0.5" />
                  <span className="font-mono">+33 1 40 35 66 29</span>
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="w-4 h-4 text-amber-400/70 shrink-0 mt-0.5" />
                <span>
                  Lun — Ven : 07:00 — 20:00<br />
                  Sam : 07:30 — 19:30<br />
                  <span className="text-amber-400/50">Fermé le dimanche</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-amber-400 mb-5">Explorer</h3>
            <ul className="space-y-3 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-amber-100/70 hover:text-amber-300 hover:translate-x-1 inline-block transition-all">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Créations */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-amber-400 mb-5">Nos créations</h3>
            <ul className="space-y-3 text-sm">
              {creations.map((c) => (
                <li key={c}>
                  <a href="#atelier" className="text-amber-100/70 hover:text-amber-300 hover:translate-x-1 inline-block transition-all">
                    {c}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Suivez-nous */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-amber-400 mb-5">Suivez-nous</h3>
            <div className="flex gap-3 mb-6">
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-11 h-11 rounded-full bg-white/5 hover:bg-amber-400 text-amber-100 hover:text-stone-950 border border-white/10 flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-11 h-11 rounded-full bg-white/5 hover:bg-amber-400 text-amber-100 hover:text-stone-950 border border-white/10 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Maps"
                className="w-11 h-11 rounded-full bg-white/5 hover:bg-amber-400 text-amber-100 hover:text-stone-950 border border-white/10 flex items-center justify-center transition-colors"
              >
                <MapPin className="w-5 h-5" />
              </a>
            </div>

            {/* Note Google */}
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex flex-col gap-1.5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 p-4 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl font-semibold text-white leading-none">4,8</span>
                <span className="flex items-center gap-0.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FBBC04] text-[#FBBC04]" />
                  ))}
                </span>
              </div>
              <span className="flex items-center gap-1 text-xs text-amber-100/60 group-hover:text-amber-200 transition-colors">
                470 avis sur Google
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </a>
          </div>
        </div>

        {/* Bas */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10 text-xs text-amber-100/40">
          <div>© {year} Boulangerie Pâtisserie Miche de Pain. Tous droits réservés.</div>
          <div className="flex items-center gap-2 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            42 Rue Cadet · 75009 Paris · France
          </div>
        </div>
      </div>
    </footer>
  );
}
