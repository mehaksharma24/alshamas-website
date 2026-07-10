import { ShieldCheck, Heart, Users, Leaf, Award, Globe2, ArrowRight } from 'lucide-react';
import { navigate } from '../lib/router';
import { useReveal } from '../lib/useReveal';
import SectionHeading from '../components/SectionHeading';
import { PageBanner } from '../components/PageBanner';

const img = (id: string) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=600`;

const timeline = [
  { year: '2013', title: 'The Beginning', text: 'ALSHAMAS launches in Canada with a single mission — premium halal frozen foods made the authentic way.' },
  { year: '2015', title: 'Going National', text: 'Products become available in major grocers across Ontario and Quebec.' },
  { year: '2018', title: 'Coast to Coast', text: 'Expansion into Western Canada — Alberta, BC, and Manitoba.' },
  { year: '2021', title: '50k+ Families', text: 'A trusted name in 50,000+ Canadian households and counting.' },
  { year: '2024', title: 'Heat-and-Eat Line', text: 'Launch of ready-in-minutes biryani bowls and entrées for busy families.' },
  { year: '2025', title: 'New & Bolder', text: 'Expanded range with harissa wings, popcorn chicken, and more.' },
];

const values = [
  { Icon: ShieldCheck, title: 'Halal, Always', text: 'Every product is 100% halal-certified — non-negotiable, from sourcing to packaging.' },
  { Icon: Heart, title: 'Quality First', text: 'Premium ingredients, authentic recipes, and rigorous quality checks on every line.' },
  { Icon: Users, title: 'Family at Heart', text: 'Built for Canadian families — convenient, affordable, and made with care.' },
  { Icon: Leaf, title: 'Natural & Clean', text: 'No artificial flavours, no MSG, no shortcuts. Just real food, frozen fresh.' },
];

export default function Brand() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div className="pt-16 sm:pt-20" ref={ref}>
      {/* Hero banner */}
      <PageBanner
        label="Our Story"
        title="A Canadian Halal Heritage"
        subtitle="Since 2013, ALSHAMAS has been transforming everyday meals into moments of joy — with high-quality, halal frozen foods Canadians rely on, coast to coast."
      />

      {/* Our Story */}
      <section className="py-16 sm:py-20">
        <div className="container-x">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="reveal">
              <SectionHeading
                label="Who We Are"
                title="Trusted Partner in Quality Halal Frozen Foods"
              />
              <div className="mt-5 space-y-4 text-base leading-relaxed text-ink-600">
                <p>
                  ALSHAMAS Food Products began with a simple belief: that every Canadian family deserves access to authentic, high-quality halal food — made the way it’s been made for generations.
                </p>
                <p>
                  What started as a small operation in Ontario has grown into one of Canada’s leading halal frozen food brands, carried in major grocers from coast to coast. Our kebabs, samosas, parathas, and ready-to-eat entrées are hand-crafted with the finest ingredients and the most authentic recipes.
                </p>
                <p>
                  We’re proud to preserve the ‘homemade’ taste — and prouder still to make it effortless. Freezer to table in minutes, every time.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {['Halal Certified', 'CFIA Approved', 'Made in Canada'].map((b) => (
                  <div key={b} className="flex items-center gap-2 rounded-2xl bg-primary-50 px-4 py-2.5 ring-1 ring-primary-200">
                    <Award size={16} className="text-primary-600" />
                    <span className="text-sm font-semibold text-primary-700">{b}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal reveal-delay-1 grid grid-cols-2 gap-4">
              <img src={img('37080242')} alt="Kebabs" className="aspect-square w-full rounded-3xl object-cover shadow-lg" />
              <img src={img('12737800')} alt="Paratha" className="mt-8 aspect-square w-full rounded-3xl object-cover shadow-lg" />
              <img src={img('6419732')} alt="Beef kebab" className="aspect-square w-full rounded-3xl object-cover shadow-lg" />
              <img src={img('7428284')} alt="Chicken nuggets" className="mt-8 aspect-square w-full rounded-3xl object-cover shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-ink-100/60 py-16 sm:py-20">
        <div className="container-x">
          <div className="reveal">
            <SectionHeading
              label="What We Stand For"
              title="Our Values"
              subtitle="The principles that guide every product we make."
              align="center"
            />
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ Icon, title, text }, i) => (
              <div
                key={title}
                className="reveal rounded-3xl bg-white p-6 shadow-sm ring-1 ring-ink-200/60 transition-all hover:-translate-y-1.5 hover:shadow-lg"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-100 text-primary-600">
                  <Icon size={24} />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-ink-900">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Presence in Canada */}
      <section className="py-16 sm:py-20">
        <div className="container-x">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="reveal order-2 lg:order-1">
              <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary-600 to-ink-900 p-8 text-white shadow-2xl">
                <Globe2 size={48} className="text-white/30" />
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {[
                    { num: '6', label: 'Provinces' },
                    { num: '16+', label: 'Retail Chains' },
                    { num: '50k+', label: 'Families' },
                  ].map((s) => (
                    <div key={s.label}>
                      <div className="font-display text-3xl font-extrabold">{s.num}</div>
                      <div className="text-xs text-white/70">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {['ON', 'QC', 'BC', 'AB', 'MB', 'NS'].map((p) => (
                    <span key={p} className="chip bg-white/15 text-white">{p}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="reveal reveal-delay-1 order-1 lg:order-2">
              <SectionHeading
                label="Our Presence"
                title="From Coast to Coast"
                subtitle="ALSHAMAS products are available in major grocers across Canada — and we’re growing all the time."
              />
              <button onClick={() => navigate('#/where-to-buy')} className="btn-primary mt-6 text-sm">
                Find a Store <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-ink-950 py-16 sm:py-24">
        <div className="container-x">
          <div className="reveal">
            <SectionHeading
              label="Our Journey"
              title="A Decade of Delicious"
              light
              align="center"
            />
          </div>
          <div className="relative mt-12">
            <div className="absolute left-4 top-0 h-full w-0.5 bg-primary-500/30 sm:left-1/2 sm:-translate-x-1/2" />
            <div className="space-y-8">
              {timeline.map((t, i) => (
                <div
                  key={t.year}
                  className={`reveal relative flex items-start gap-6 sm:w-1/2 ${
                    i % 2 === 0 ? 'sm:pr-12' : 'sm:ml-auto sm:pl-12'
                  }`}
                  style={{ transitionDelay: `${i * 0.06}s` }}
                >
                  <div className="absolute -left-1 top-1.5 h-4 w-4 rounded-full bg-primary-500 ring-4 ring-ink-950 sm:left-auto sm:-right-2" style={i % 2 === 0 ? {} : { right: 'auto', left: '-0.5rem' }} />
                  <div className="ml-8 rounded-3xl bg-white/5 p-5 ring-1 ring-white/10 backdrop-blur sm:ml-0">
                    <div className="font-display text-2xl font-extrabold text-primary-400">{t.year}</div>
                    <h3 className="mt-1 font-display text-lg font-bold text-white">{t.title}</h3>
                    <p className="mt-1.5 text-sm text-ink-300">{t.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cert badges */}
      <section className="py-16">
        <div className="container-x">
          <div className="reveal flex flex-col items-center gap-6 rounded-3xl bg-primary-50 p-8 text-center ring-1 ring-primary-200 sm:p-12">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-100 text-primary-600">
              <ShieldCheck size={40} />
            </div>
            <div>
              <h3 className="font-display text-2xl font-extrabold text-ink-900">Certified & Compliant</h3>
              <p className="mt-2 max-w-lg text-sm text-ink-600">
                All ALSHAMAS products are halal-certified and CFIA-approved. We maintain the highest standards of food safety and quality.
              </p>
            </div>
            <button onClick={() => navigate('#/certifications')} className="btn-dark text-sm">
              View Certifications <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
