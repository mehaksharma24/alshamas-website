import { useState } from 'react';
import { User, Mail, Phone, MessageSquare, Send, Check, MapPin, Clock } from 'lucide-react';
import { useReveal } from '../lib/useReveal';
import SectionHeading from '../components/SectionHeading';
import { PageBanner } from '../components/PageBanner';

export default function Contact() {
  const ref = useReveal<HTMLDivElement>();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="pt-16 sm:pt-20" ref={ref}>
      {/* Hero */}
      <PageBanner
        label="Get in Touch"
        title="Contact Us"
        subtitle="Questions, feedback, or partnership ideas? We’d love to hear from you."
      />

      <div className="container-x py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          {/* Info */}
          <div className="reveal space-y-5">
            <SectionHeading label="Visit Us" title="Let’s Talk" />
            <div className="space-y-4">
              {[
                { Icon: MapPin, title: 'Head Office', text: '1500 Creditstone Rd, Concord, ON L4K 0E3, Canada' },
                { Icon: Phone, title: 'Phone', text: '+1 (416) 555-0199' },
                { Icon: Mail, title: 'Email', text: 'hello@alshamasfood.ca' },
                { Icon: Clock, title: 'Hours', text: 'Mon–Fri, 9:00 AM – 5:00 PM EST' },
              ].map(({ Icon, title, text }) => (
                <div key={title} className="flex items-start gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-ink-200/60">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
                    <Icon size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-ink-400">{title}</div>
                    <div className="mt-0.5 text-sm font-semibold text-ink-800">{text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="reveal reveal-delay-1">
            <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-ink-200/60 sm:p-8">
              {sent ? (
                <div className="flex flex-col items-center py-12 text-center animate-scale-in">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                    <Check size={32} />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-extrabold text-ink-900">Message Sent!</h3>
                  <p className="mt-2 max-w-sm text-sm text-ink-500">
                    Thanks for reaching out, {form.name || 'friend'}. We’ll get back to you within 1–2 business days.
                  </p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setForm({ name: '', email: '', phone: '', message: '' });
                    }}
                    className="btn-outline mt-6 text-xs"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-5">
                  <h3 className="font-display text-xl font-bold text-ink-900">Send us a message</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-500">Name</label>
                      <div className="relative">
                        <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                        <input
                          required
                          value={form.name}
                          onChange={(e) => update('name', e.target.value)}
                          placeholder="Your name"
                          className="input-field pl-10"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-500">Phone</label>
                      <div className="relative">
                        <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => update('phone', e.target.value)}
                          placeholder="(416) 555-0199"
                          className="input-field pl-10"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-500">Email</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => update('email', e.target.value)}
                        placeholder="you@example.com"
                        className="input-field pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-500">Message</label>
                    <div className="relative">
                      <MessageSquare size={16} className="absolute left-3.5 top-3.5 text-ink-400" />
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => update('message', e.target.value)}
                        placeholder="How can we help?"
                        className="input-field pl-10 pt-3"
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn-primary w-full text-sm">
                    <Send size={16} /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
