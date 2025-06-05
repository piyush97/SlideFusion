import { motion } from "framer-motion";

interface StatsGridProps {
  className?: string;
}

export function StatsGrid({ className }: StatsGridProps) {
  const stats = [
    {
      value: "50K+",
      label: "Presentations Created",
    },
    {
      value: "98%",
      label: "Customer Satisfaction",
    },
    {
      value: "80%",
      label: "Time Saved",
    },
    {
      value: "150+",
      label: "Template Designs",
    },
  ];

  return (
    <motion.div
      className={`grid grid-cols-2 gap-6 md:grid-cols-4 ${className || ""}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {stats.map((stat, index) => (
        <div key={index} className="p-6 glass-card">
          <div className="mb-2 text-3xl font-bold">{stat.value}</div>
          <div className="text-sm text-muted-foreground">{stat.label}</div>
        </div>
      ))}
    </motion.div>
  );
}
