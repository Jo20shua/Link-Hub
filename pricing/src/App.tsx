import { Sparkles } from 'lucide-react';
import { PricingCard } from './components/PricingCard';
import { freePlan, planCards } from './data/pricing';

function App() {
  return (
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(123,47,247,0.18),_transparent_32%),linear-gradient(180deg,#020617_0%,#0f172a_100%)] text-slate-100">
      <div className="mx-auto flex max-w-7xl flex-col px-6 py-6 sm:px-8 lg:px-10">
        <div className="mb-1 flex items-center justify-start">
          <img src="/logo.png" alt="Logo" className="h-20 w-auto" />
        </div>

        <section className="fade-in-stagger mb-5 space-y-3 text-center md:mb-6">
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-slate-950/85 px-7 py-6 shadow-soft backdrop-blur-xl sm:px-10">
            <p className="inline-flex items-center gap-2 rounded-full bg-violet-500/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-violet-200">
              <Sparkles className="h-4 w-4 text-violet-300" />
              Most flexible pricing
            </p>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Find the plan for you
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              You can cancel at any time.
            </p>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-4 xl:gap-8">
          {planCards.map((plan) => (
            <PricingCard
              key={plan.title}
              title={plan.title}
              priceLabel={plan.priceLabel}
              description={plan.description}
              features={plan.features}
              ctaLabel={plan.ctaLabel}
              href={plan.href}
              accent={plan.accent}
              featured={plan.featured}
              badge={plan.badge}
              className={plan.featured ? 'xl:col-span-2' : ''}
              extraContent={
                plan.title === 'Premium Plan' ? (
                  <div className="mt-6 rounded-3xl border border-violet-500/20 bg-slate-950/80 p-4 text-sm text-slate-200">
                    <p className="font-semibold text-slate-100">Premium bonus</p>
                    <p className="mt-2 text-slate-400">Extended onboarding, advanced funnels, and a dedicated account review to keep your profile polished.</p>
                  </div>
                ) : null
              }
            />
          ))}
        </section>

        <section className="mt-10 rounded-[2rem] border border-white/10 bg-slate-950/85 p-6 shadow-soft backdrop-blur-xl md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-300/80">Free Plan</p>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">No commitment, just the essentials.</h2>
              <p className="max-w-2xl text-sm leading-7 text-slate-400">
                Perfect for testing the experience before upgrading or sharing a simple landing page with your audience.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button className="inline-flex items-center justify-center rounded-2xl bg-white/10 px-6 py-3 text-sm font-semibold text-slate-100 transition duration-300 hover:bg-white/20 md:sticky md:bottom-6 md:z-20">
                {freePlan.ctaLabel}
              </button>
              <p className="text-sm text-slate-500">Access analytics, custom colors, and full support when you upgrade.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
