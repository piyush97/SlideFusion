import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Free",
    priceMonthly: "$0",
    description: "Perfect for trying out SlideFusion",
    features: [
      "5 presentations per month",
      "Basic AI generation",
      "3 themes",
      "Export to PDF",
      "Email support",
    ],
    buttonText: "Get Started",
    popular: false,
    delay: 0.1,
  },
  {
    name: "Pro",
    priceMonthly: "$19",
    description: "For professionals and small teams",
    features: [
      "Unlimited presentations",
      "Advanced AI generation",
      "All themes",
      "Real-time collaboration",
      "Export to multiple formats",
      "Priority support",
    ],
    buttonText: "Start Free Trial",
    popular: true,
    delay: 0.2,
  },
  {
    name: "Enterprise",
    priceMonthly: "$49",
    description: "For organizations with advanced needs",
    features: [
      "Everything in Pro",
      "Custom branding",
      "Team management",
      "Advanced analytics",
      "API access",
      "Dedicated account manager",
    ],
    buttonText: "Contact Sales",
    popular: false,
    delay: 0.3,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl gradient-text">
            Pricing Plans
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
            Choose the perfect plan for your presentation needs. Start with our
            free tier or upgrade for premium features.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {tiers.map((tier) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: tier.delay }}
              className={tier.popular ? "relative mt-8 md:mt-0 md:-mb-8" : ""}
            >
              <Card
                className={`h-full flex flex-col ${
                  tier.popular ? "border-primary shadow-lg" : ""
                }`}
              >
                {tier.popular && (
                  <div className="absolute inset-x-0 flex justify-center -top-4">
                    <Badge variant="default" className="px-3 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="flex flex-col space-y-1.5 pb-6">
                  <CardTitle className="text-2xl font-semibold">
                    {tier.name}
                  </CardTitle>
                  <div>
                    <span className="text-3xl font-bold">
                      {tier.priceMonthly}
                    </span>
                    <span className="ml-1 text-muted-foreground">/month</span>
                  </div>
                  <CardDescription className="mt-2">
                    {tier.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check className="flex-shrink-0 w-4 h-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${
                      tier.popular ? "" : "variant-outline"
                    }`}
                    variant={tier.popular ? "default" : "outline"}
                  >
                    {tier.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
