import { Button } from "@/components/ui/button";
import { IS_WAITLIST_MODE, WAITLIST_PATH } from "@/config";
import { motion } from "framer-motion";
import Link from "next/link";

interface CTASectionProps {
  className?: string;
}

export function CTASection({ className }: CTASectionProps) {
  return (
    <section
      className={`relative py-16 overflow-hidden md:py-24 ${className || ""}`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10" />
      <motion.div
        className="absolute z-0 w-64 h-64 rounded-full -top-20 -right-20 bg-primary/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
        }}
      />
      <div className="container relative z-10 px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Ready to Create{" "}
              <span className="gradient-text">Impressive Presentations</span> in
              Minutes?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Join thousands of professionals who are saving time and impressing
              their audiences with SlideFusion.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href={IS_WAITLIST_MODE ? WAITLIST_PATH : "/signin"}>
                <Button size="lg" className="text-base font-medium">
                  {IS_WAITLIST_MODE ? "Join Waitlist" : "Sign In"}
                </Button>
              </Link>
              <a href="mailto:business@piyushmehta.com">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base font-medium"
                >
                  Schedule a Demo
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
