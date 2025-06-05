import { motion } from "framer-motion";
import {
  ImageIcon,
  Layout,
  LayoutDashboard,
  Moon,
  Palette,
  Smartphone,
  Sparkles,
  Users,
} from "lucide-react";

// Define feature items
export const features = [
  {
    title: "Creative AI Generation",
    description:
      "Generate complete presentation outlines with a simple prompt. Our AI creates structured content that you can refine.",
    icon: Sparkles,
    delay: 0.1,
  },
  {
    title: "Theme Selection",
    description:
      "Choose from dozens of professionally designed themes to match your brand identity and presentation goals.",
    icon: Palette,
    delay: 0.2,
  },
  {
    title: "Smart Layouts",
    description:
      "Our AI suggests the optimal layout for your content, ensuring readability and visual hierarchy.",
    icon: Layout,
    delay: 0.3,
  },
  {
    title: "Auto-Generated Images",
    description:
      "Automatically generate relevant images and icons to illustrate your key points.",
    icon: ImageIcon,
    delay: 0.4,
  },
  {
    title: "Interactive Dashboards",
    description:
      "Create dynamic dashboards with charts, graphs, and interactive elements that engage your audience.",
    icon: LayoutDashboard,
    delay: 0.5,
  },
  {
    title: "Collaboration Tools",
    description:
      "Work together with your team in real-time, share feedback, and maintain version control effortlessly.",
    icon: Users,
    delay: 0.6,
  },
  {
    title: "Dark Mode Support",
    description:
      "Switch between light and dark themes to match your presentation environment and personal preference.",
    icon: Moon,
    delay: 0.7,
  },
  {
    title: "Mobile Optimization",
    description:
      "Access and edit your presentations on any device with our responsive design and mobile-first approach.",
    icon: Smartphone,
    delay: 0.8,
  },
];

interface FeaturesGridProps {
  className?: string;
}

export function FeaturesGrid({ className }: FeaturesGridProps) {
  return (
    <div
      className={`grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 ${
        className || ""
      }`}
    >
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: feature.delay,
          }}
          className="group"
        >
          <div className="relative h-full p-6 transition-all duration-300 border shadow-sm bg-card rounded-xl hover:shadow-lg hover:shadow-primary/10 hover:border-primary/20">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center justify-center w-12 h-12 transition-colors duration-300 rounded-lg bg-primary/10 group-hover:bg-primary/20">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
            </div>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
