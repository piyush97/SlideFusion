"use client";
import { Footer } from "@/components/home/Footer";
import { Navbar } from "@/components/home/Navbar";
import { Pricing } from "@/components/home/Pricing";
import { Button } from "@/components/ui/button";
import { IS_WAITLIST_MODE, WAITLIST_PATH } from "@/config";
import { motion } from "framer-motion";
import {
  Image as ImageIcon,
  Layout,
  LayoutDashboard,
  Moon,
  Palette,
  Smartphone,
  Sparkles,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

// Define feature items
const features = [
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
    title: "Real-time Collaboration",
    description:
      "Work simultaneously with your team members to create, edit, and refine presentations together.",
    icon: Users,
    delay: 0.1,
  },
  {
    title: "Project Management",
    description:
      "Organize your presentations in projects, with version history and comments.",
    icon: LayoutDashboard,
    delay: 0.2,
  },
  {
    title: "Responsive Design",
    description:
      "Your presentations look great on any device, from desktop presentations to mobile viewing.",
    icon: Smartphone,
    delay: 0.3,
  },
  {
    title: "Dark/Light Mode",
    description:
      "Switch between dark and light themes to adapt to your presentation environment.",
    icon: Moon,
    delay: 0.4,
  },
];

// Define how it works steps
const howItWorks = [
  {
    number: "01",
    title: "Enter Your Prompt",
    description:
      "Describe your presentation idea or topic, and our AI will generate a complete outline with structured content.",
  },
  {
    number: "02",
    title: "Customize Your Slides",
    description:
      "Edit text, rearrange slides, apply themes, and add your personal touch to the presentation.",
  },
  {
    number: "03",
    title: "Generate Visuals",
    description:
      "Let our AI create relevant images, charts, and icons to enhance your message and captivate your audience.",
  },
  {
    number: "04",
    title: "Share & Present",
    description:
      "Export your presentation, share it with collaborators, or present directly from our platform.",
  },
];

// Define testimonials
const testimonials = [
  {
    quote:
      "SlideFusion has completely transformed our pitch process. What used to take days now takes hours, and the quality is even better.",
    name: "Alex Thompson",
    title: "Startup Founder",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    quote:
      "As a marketing manager, I need to create compelling presentations quickly. SlideFusion's AI features have become my secret weapon.",
    name: "Sarah Chen",
    title: "Marketing Director",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    quote:
      "The real-time collaboration feature has made it so much easier for our distributed team to work together on important client presentations.",
    name: "James Wilson",
    title: "Project Manager",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

const Page = () => {
  // Simplified component without unused variables

  useEffect(() => {
    const handleScroll = () => {
      // Simplified scroll handler for future use if needed
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update document title and meta tags for SEO
  useEffect(() => {
    document.title = "SlideFusion - AI-Powered Presentation Tool";

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      "content",
      "Create stunning presentations with AI-powered SlideFusion. Save time and impress your audience with creative AI generation, smart layouts, and auto-generated visuals."
    );

    // Update og tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute(
        "content",
        "SlideFusion - AI-Powered Presentation Tool"
      );
    }

    const ogDescription = document.querySelector(
      'meta[property="og:description"]'
    );
    if (ogDescription) {
      ogDescription.setAttribute(
        "content",
        "Create stunning presentations with AI-powered SlideFusion. Save time and impress your audience."
      );
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden md:pt-32 md:pb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10" />
        <div className="container px-4 md:px-6">
          <div className="grid items-center grid-cols-1 gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-6 text-center md:text-left"
            >
              <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl">
                Create Stunning Presentations with{" "}
                <span className="gradient-text">AI-Powered</span> SlideFusion
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-[700px]">
                Transform your ideas into professional presentations in minutes.
                Save time, impress your audience, and pitch with confidence.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
                <Link href={IS_WAITLIST_MODE ? WAITLIST_PATH : "/signin"}>
                  <Button size="lg" className="text-base font-medium">
                    {IS_WAITLIST_MODE ? "Join Waitlist" : "Sign In"}
                  </Button>
                </Link>
                <a href="#how-it-works">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base font-medium"
                  >
                    See how it works
                  </Button>
                </a>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative overflow-hidden shadow-2xl aspect-video rounded-xl">
                <div className="absolute inset-0 z-10 bg-gradient-to-br from-slide-blue/90 to-slide-purple/90" />
                <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=2620&q=80')] bg-cover bg-center" />
                <div className="absolute inset-0 z-20 flex items-center justify-center p-8">
                  <div className="w-full p-4 rounded-lg shadow-lg bg-white/20 backdrop-blur-sm">
                    <div className="flex items-center w-full h-6 gap-2 mb-3">
                      <div className="w-3 h-3 bg-red-400 rounded-full" />
                      <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                      <div className="w-3 h-3 bg-green-400 rounded-full" />
                      <div className="w-2/3 h-3 ml-4 rounded-full bg-white/30" />
                    </div>
                    <div className="mb-3 space-y-2">
                      <div className="w-3/4 h-8 rounded-md bg-white/30" />
                      <div className="h-20 rounded-md bg-white/20" />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="h-24 rounded-md bg-white/20" />
                      <div className="h-24 rounded-md bg-white/20" />
                      <div className="h-24 rounded-md bg-white/20" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute z-0 w-24 h-24 rounded-full -top-12 -right-8 bg-yellow-300/20 backdrop-blur-md"
                animate={{
                  y: [0, 15, 0],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                }}
              />
              <motion.div
                className="absolute z-0 w-20 h-20 rounded-full -bottom-8 -left-8 bg-primary/20 backdrop-blur-md"
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  delay: 1,
                }}
              />
            </motion.div>
          </div>

          {/* Stats */}
          {!IS_WAITLIST_MODE && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-2 gap-4 mt-16 text-center md:grid-cols-4 md:mt-24"
            >
              <div className="p-6 glass-card">
                <div className="mb-2 text-3xl font-bold">3000+</div>
                <div className="text-sm text-muted-foreground">
                  Presentations Created
                </div>
              </div>
              <div className="p-6 glass-card">
                <div className="mb-2 text-3xl font-bold">98%</div>
                <div className="text-sm text-muted-foreground">
                  Customer Satisfaction
                </div>
              </div>
              <div className="p-6 glass-card">
                <div className="mb-2 text-3xl font-bold">80%</div>
                <div className="text-sm text-muted-foreground">Time Saved</div>
              </div>
              <div className="p-6 glass-card">
                <div className="mb-2 text-3xl font-bold">150+</div>
                <div className="text-sm text-muted-foreground">
                  Template Designs
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mb-12 text-center md:mb-16">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl gradient-text">
              Powerful Features for Stunning Presentations
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
              Our AI-powered tools streamline the presentation creation process,
              giving you more time to focus on what matters: your message.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: feature.delay }}
                className="feature-card"
              >
                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-primary/10">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="mb-12 text-center md:mb-16">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl gradient-text">
              How SlideFusion Works
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
              Creating professional presentations has never been this simple.
              Follow these steps to transform your ideas into compelling slides.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="absolute left-0 text-6xl font-bold text-primary/10 -top-6">
                  {step.number}
                </div>
                <div className="relative pt-6">
                  <h3 className="mb-3 text-xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Demo Video/Animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative max-w-4xl mx-auto mt-16 overflow-hidden shadow-2xl aspect-video rounded-xl"
          >
            <div className="absolute inset-0 z-10 bg-gradient-to-br from-slide-blue/90 to-slide-purple/90" />
            <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2620&q=80')] bg-cover bg-center" />
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="flex items-center justify-center w-20 h-20 transition-colors rounded-full cursor-pointer bg-white/20 backdrop-blur-md hover:bg-white/30">
                <div className="w-0 h-0 ml-1 border-t-8 border-b-8 border-t-transparent border-l-12 border-l-white border-b-transparent" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      {!IS_WAITLIST_MODE && (
        <section id="testimonials" className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mb-12 text-center md:mb-16">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl gradient-text">
                What Our Users Say
              </h2>
              <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
                Professionals across industries are saving time and impressing
                their audiences with SlideFusion.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
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
          </div>
        </section>
      )}

      {/* Pricing Section */}
      <Pricing />

      {/* CTA Section */}
      <section className="relative py-16 overflow-hidden md:py-24">
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
                <span className="gradient-text">Impressive Presentations</span>{" "}
                in Minutes?
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Join thousands of professionals who are saving time and
                impressing their audiences with SlideFusion.
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

      <Footer />
    </div>
  );
};

export default Page;
