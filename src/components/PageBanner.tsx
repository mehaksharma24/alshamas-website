interface PageBannerProps {
  label: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export function PageBanner({ label, title, subtitle, children }: PageBannerProps) {
  return (
    <div className="relative overflow-hidden banner-anim py-14 text-white sm:py-20">
      <div className="absolute inset-0 bg-grain opacity-10" />
      <div className="banner-orb left-[-5%] top-[10%] h-48 w-48 bg-primary-400/30" />
      <div className="banner-orb right-[-5%] bottom-[10%] h-56 w-56 bg-brand-500/25" style={{ animationDelay: '2s' }} />
      <div className="banner-orb left-[30%] bottom-[5%] h-40 w-40 bg-accent-500/20" style={{ animationDelay: '4s' }} />
      <div className="container-x relative">
        <div className="reveal max-w-2xl">
          <div className="section-label text-white/90">
            <span className="h-px w-6 bg-white/60" /> {label}
          </div>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 max-w-xl text-white/90">{subtitle}</p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
