export type PricingPlan = {
  title: string;
  priceLabel: string;
  description: string;
  features: string[];
  ctaLabel: string;
  href?: string;
  accent?: boolean;
  featured?: boolean;
  badge?: string;
};

export const planCards: PricingPlan[] = [
  {
    title: 'Starter Plan',
    priceLabel: '$12/mo',
    description: 'A clean entry point for your first link collection and audience growth.',
    features: ['One link page', 'Basic analytics', 'Unlimited clicks', 'Email support'],
    ctaLabel: 'Choose starter',
    href: '/stater_billing.html',
  },
  {
    title: 'Pro Plan',
    priceLabel: '$27/mo',
    description: 'Designed for active creators who want advanced insights and polish.',
    features: ['Custom branding', 'Priority support', 'Advanced analytics', 'Scheduled links'],
    ctaLabel: 'Try free for 7 days',
    accent: true,
    featured: true,
    badge: 'Recommended',
  },
  {
    title: 'Premium Plan',
    priceLabel: '$39/mo',
    description: 'A premium experience for established creators and teams.',
    features: ['Team sharing', 'Conversion funnels', 'Unlimited products', 'Dedicated onboarding'],
    ctaLabel: 'Try free for 7 days',
    accent: true,
  },
];

export const freePlan = {
  title: 'Free Plan',
  description: 'A simple way to get started with a link page that looks polished from day one.',
  ctaLabel: 'Start free',
};
