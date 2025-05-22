import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-12 mt-24 border-t bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-gradient-to-br from-slide-blue to-slide-purple">
                <div className="w-5 h-1 bg-white rounded-sm"></div>
              </div>
              <span className="text-xl font-bold tracking-tight">
                SlideFusion
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Create stunning presentations with AI-powered tools that save time
              and impress clients.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="transition-colors text-muted-foreground hover:text-foreground"
              >
                <Twitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="#"
                className="transition-colors text-muted-foreground hover:text-foreground"
              >
                <Facebook className="w-5 h-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="#"
                className="transition-colors text-muted-foreground hover:text-foreground"
              >
                <Instagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="#"
                className="transition-colors text-muted-foreground hover:text-foreground"
              >
                <Linkedin className="w-5 h-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="#"
                className="transition-colors text-muted-foreground hover:text-foreground"
              >
                <Github className="w-5 h-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Product</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm transition-colors text-muted-foreground hover:text-foreground"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm transition-colors text-muted-foreground hover:text-foreground"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm transition-colors text-muted-foreground hover:text-foreground"
                >
                  Enterprise
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm transition-colors text-muted-foreground hover:text-foreground"
                >
                  Roadmap
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm transition-colors text-muted-foreground hover:text-foreground"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm transition-colors text-muted-foreground hover:text-foreground"
                >
                  Tutorials
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm transition-colors text-muted-foreground hover:text-foreground"
                >
                  Templates
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm transition-colors text-muted-foreground hover:text-foreground"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Company</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm transition-colors text-muted-foreground hover:text-foreground"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm transition-colors text-muted-foreground hover:text-foreground"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm transition-colors text-muted-foreground hover:text-foreground"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm transition-colors text-muted-foreground hover:text-foreground"
                >
                  Terms & Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 mt-8 text-center border-t">
          <p className="text-sm text-muted-foreground">
            Made with ❤️ by{" "}
            <Link href="https://piyushmehta.com">Piyush Mehta </Link> ©{" "}
            {new Date().getFullYear()} SlideFusion. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
