import { motion } from "framer-motion";
import Image from "next/image";

export const testimonials = [
  {
    name: "Sarah Chen",
    title: "Marketing Director",
    image: "/api/placeholder/48/48",
    quote:
      "SlideFusion has revolutionized how we create presentations. What used to take hours now takes minutes, and the quality is consistently professional.",
  },
  {
    name: "Marcus Rodriguez",
    title: "Sales Manager",
    image: "/api/placeholder/48/48",
    quote:
      "The AI-generated content suggestions are spot-on. Our sales presentations have never looked better, and our close rate has improved significantly.",
  },
  {
    name: "Emily Thompson",
    title: "Design Lead",
    image: "/api/placeholder/48/48",
    quote:
      "As a designer, I appreciate the attention to detail in the themes and layouts. It's like having a design team at your fingertips.",
  },
];

interface TestimonialsProps {
  className?: string;
}

export function Testimonials({ className }: TestimonialsProps) {
  return (
    <div className={`grid grid-cols-1 gap-8 md:grid-cols-3 ${className || ""}`}>
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="p-6 border shadow-sm bg-card rounded-xl"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 overflow-hidden rounded-full">
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                className="object-cover w-full h-full"
                width={48}
                height={48}
              />
            </div>
            <div>
              <div className="font-semibold">{testimonial.name}</div>
              <div className="text-sm text-muted-foreground">
                {testimonial.title}
              </div>
            </div>
          </div>
          <p className="italic text-muted-foreground">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
        </motion.div>
      ))}
    </div>
  );
}
