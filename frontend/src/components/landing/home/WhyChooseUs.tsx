import { Truck, CreditCard, RotateCcw, Headphones } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    desc: 'On all orders above ₹1,299',
  },
  {
    icon: CreditCard,
    title: 'Payment & Policy',
    desc: 'Multiple payment methods accepted',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    desc: 'Return or exchange within 7 days',
  },
  {
    icon: Headphones,
    title: 'Quality Support',
    desc: '24/7 customer support available',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-10 bg-surface border-y border-border">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Icon size={22} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-foreground">{feat.title}</h4>
                  <p className="text-xs text-on-surface-variant mt-0.5">{feat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
