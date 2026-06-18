import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

interface Stat {
  end: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

const STATS: Stat[] = [
  { end: 150, suffix: "+", label: "Projects Delivered" },
  { end: 98, suffix: "%", label: "Client Satisfaction" },
  { end: 300, suffix: "%", label: "Average Client Growth" },
  { end: 10, suffix: "+", label: "Industries Served" },
  { end: 500, prefix: "₦", suffix: "M+", label: "Revenue Generated For Clients" },
];

export function StatsBanner() {
  return (
    <section id="stats" className="bg-brand-blue py-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 text-center sm:grid-cols-3 lg:grid-cols-5">
          {STATS.map((stat) => (
            <AnimatedCounter key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
