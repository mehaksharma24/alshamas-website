import { ShieldCheck, Award, FileCheck, Download, ArrowRight, Leaf } from 'lucide-react';
import { navigate } from '../lib/router';
import { useReveal } from '../lib/useReveal';
import SectionHeading from '../components/SectionHeading';
import { PageBanner } from '../components/PageBanner';

const certs = [
  { title: 'Halal Certification', issuer: 'Canadian Halal Certifiers Association', date: 'Valid through 2026', desc: 'All ALSHAMAS products are certified 100% halal by an accredited Canadian halal authority.', icon: ShieldCheck, color: 'leaf' },
  { title: 'CFIA Approval', issuer: 'Canadian Food Inspection Agency', date: 'Annually renewed', desc: 'Our facilities and products meet all CFIA food safety and labeling standards.', icon: FileCheck, color: 'primary' },
  { title: 'HACCP Certified', issuer: 'Safe Food Canada', date: 'Valid through 2026', desc: 'Hazard Analysis and Critical Control Points — our production lines follow rigorous safety protocols.', icon: Award, color: 'gold' },
  { title: 'ISO 22000', issuer: 'International Organization for Standardization', date: 'Valid through 2026', desc: 'Food safety management systems certified to the international ISO 22000 standard.', icon: FileCheck, color: 'brand' },
];

const colorMap: Record<string, { bg: string; text: string; ring: string }> = {
  leaf: { bg: 'bg-primary-100', text: 'text-primary-600', ring: 'ring-primary-200' },
  primary: { bg: 'bg-primary-100', text: 'text-primary-600', ring: 'ring-primary-200' },
  gold: { bg: 'bg-gold-100', text: 'text-gold-600', ring: 'ring-gold-200' },
  brand: { bg: 'bg-brand-100', text: 'text-brand-600', ring: 'ring-brand-200' },
};

export default function Certifications() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div className="pt-16 sm:pt-20" ref={ref}>
      {/* Hero */}
      <PageBanner
        label="Compliance & Trust"
        title="Certifications"
        subtitle="We hold ourselves to the highest standards of food safety, quality, and halal integrity — verified by Canada’s leading certifying bodies."
      />

      {/* Prominent Halal badge */}
      <div className="container-x py-12">
        <div className="reveal flex flex-col items-center gap-6 rounded-3xl bg-gradient-to-br from-primary-500 to-primary-700 p-8 text-center text-white shadow-xl sm:p-12">
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/15 ring-4 ring-white/20">
              <ShieldCheck size={48} />
            </div>
            <div className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-gold-400 text-ink-900 shadow">
              <Leaf size={16} />
            </div>
          </div>
          <div>
            <h2 className="font-display text-3xl font-extrabold">100% Halal Certified</h2>
            <p className="mt-2 max-w-lg text-white/90">
              Every ALSHAMAS product — from sourcing to packaging — is certified halal by accredited Canadian authorities. No exceptions, ever.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {['Halal Certified', 'CFIA Approved', 'HACCP', 'ISO 22000'].map((b) => (
              <span key={b} className="chip bg-white/15 text-white backdrop-blur">{b}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Cert grid */}
      <div className="container-x pb-8">
        <div className="reveal">
          <SectionHeading
            label="Our Credentials"
            title="Verified & Compliant"
            subtitle="Downloadable documents and details for each certification."
            align="center"
          />
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {certs.map((c, i) => {
            const col = colorMap[c.color];
            return (
              <div
                key={c.title}
                className="reveal flex gap-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-ink-200/60 transition-all hover:-translate-y-1 hover:shadow-lg"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${col.bg} ${col.text}`}>
                  <c.icon size={28} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-lg font-bold text-ink-900">{c.title}</h3>
                      <p className="text-xs font-semibold text-ink-500">{c.issuer}</p>
                    </div>
                    <span className={`chip ${col.bg} ${col.text} text-[0.65rem]`}>{c.date}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{c.desc}</p>
                  <button className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-primary-600 transition-all hover:gap-2.5">
                    <Download size={14} /> Download PDF
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="container-x py-16">
        <div className="reveal flex flex-col items-center gap-4 rounded-3xl bg-ink-100/60 p-8 text-center sm:p-12">
          <h3 className="font-display text-2xl font-extrabold text-ink-900">Questions About Our Certifications?</h3>
          <p className="max-w-lg text-sm text-ink-500">
            We’re happy to share full documentation and answer any compliance questions.
          </p>
          <button onClick={() => navigate('#/contact')} className="btn-primary text-sm">
            Contact Us <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
