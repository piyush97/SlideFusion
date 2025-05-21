"use client";
import { Footer } from "@/components/home/Footer";
import { Navbar } from "@/components/home/Navbar";
import { Pricing } from "@/components/home/Pricing";
import { Button } from "@/components/ui/button";
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

const Index = () => {
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
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10" />
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-6 text-center md:text-left"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tighter">
                Create Stunning Presentations with{" "}
                <span className="gradient-text">AI-Powered</span> SlideFusion
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-[700px]">
                Transform your ideas into professional presentations in minutes.
                Save time, impress your audience, and pitch with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button size="lg" className="font-medium text-base">
                  Get Started Free
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="font-medium text-base"
                >
                  See how it works
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-video overflow-hidden rounded-xl shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-slide-blue/90 to-slide-purple/90 z-10" />
                <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=2620&q=80')] bg-cover bg-center" />
                <div className="absolute inset-0 z-20 flex items-center justify-center p-8">
                  <div className="w-full bg-white/20 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                    <div className="h-6 w-full flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                      <div className="h-3 w-2/3 bg-white/30 rounded-full ml-4" />
                    </div>
                    <div className="space-y-2 mb-3">
                      <div className="h-8 bg-white/30 rounded-md w-3/4" />
                      <div className="h-20 bg-white/20 rounded-md" />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="h-24 bg-white/20 rounded-md" />
                      <div className="h-24 bg-white/20 rounded-md" />
                      <div className="h-24 bg-white/20 rounded-md" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-12 -right-8 w-24 h-24 bg-yellow-300/20 rounded-full backdrop-blur-md z-0"
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
                className="absolute -bottom-8 -left-8 w-20 h-20 bg-primary/20 rounded-full backdrop-blur-md z-0"
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 md:mt-24 text-center"
          >
            <div className="p-6 glass-card">
              <div className="text-3xl font-bold mb-2">3000+</div>
              <div className="text-sm text-muted-foreground">
                Presentations Created
              </div>
            </div>
            <div className="p-6 glass-card">
              <div className="text-3xl font-bold mb-2">98%</div>
              <div className="text-sm text-muted-foreground">
                Customer Satisfaction
              </div>
            </div>
            <div className="p-6 glass-card">
              <div className="text-3xl font-bold mb-2">80%</div>
              <div className="text-sm text-muted-foreground">Time Saved</div>
            </div>
            <div className="p-6 glass-card">
              <div className="text-3xl font-bold mb-2">150+</div>
              <div className="text-sm text-muted-foreground">
                Template Designs
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Powerful Features for Stunning Presentations
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our AI-powered tools streamline the presentation creation process,
              giving you more time to focus on what matters: your message.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: feature.delay }}
                className="feature-card"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
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
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              How SlideFusion Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Creating professional presentations has never been this simple.
              Follow these steps to transform your ideas into compelling slides.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-6xl font-bold text-primary/10 absolute -top-6 left-0">
                  {step.number}
                </div>
                <div className="pt-6 relative">
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
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
            className="mt-16 relative aspect-video overflow-hidden rounded-xl shadow-2xl mx-auto max-w-4xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slide-blue/90 to-slide-purple/90 z-10" />
            <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2620&q=80')] bg-cover bg-center" />
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
                <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Professionals across industries are saving time and impressing
              their audiences with SlideFusion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 shadow-sm border"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-full w-full object-cover"
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
                <p className="text-muted-foreground italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <Pricing />

      {/* CTA Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10" />
        <motion.div
          className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl z-0"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
          }}
        />
        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Create{" "}
                <span className="gradient-text">Impressive Presentations</span>{" "}
                in Minutes?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of professionals who are saving time and
                impressing their audiences with SlideFusion.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="font-medium text-base">
                  Get Started Free
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="font-medium text-base"
                >
                  Schedule a Demo
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
