"use client";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { products } from "@/global/constants";

const Page = () => {
  return <HeroParallax products={products} />;
};

export default Page;
