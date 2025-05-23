describe("Navbar Component", () => {
  context("Waitlist Mode Enabled", () => {
    beforeEach(() => {
      // Mock IS_WAITLIST_MODE as true
      cy.intercept("**/constants*", (req) => {
        req.reply((res) => {
          if (res.body) {
            res.body = res.body.replace(
              /IS_WAITLIST_MODE\s*=\s*false/,
              "IS_WAITLIST_MODE = true"
            );
          }
        });
      });
      cy.visit("/");
    });

    it("should display the logo and brand name", () => {
      cy.get(".flex.items-center.gap-2").within(() => {
        cy.get(".w-5.h-1.bg-white").should("be.visible"); // The logo bar
        cy.contains("SlideFusion").should("be.visible");
      });
    });

    it("should show navigation links on desktop without testimonials", () => {
      // Use viewport to simulate desktop
      cy.viewport(1200, 800);

      cy.get("nav").within(() => {
        cy.contains("a", "Features").should("be.visible");
        cy.contains("a", "How It Works").should("be.visible");
        cy.contains("a", "Pricing").should("be.visible");
        cy.contains("a", "Testimonials").should("not.exist");
      });
    });

    it("should have waitlist CTA button", () => {
      cy.contains("a", "Join Waitlist").should("be.visible");
      cy.contains("a", "Join Waitlist").should(
        "have.attr",
        "href",
        "/waitlist"
      );
    });

    it("should navigate to the correct section when clicked", () => {
      cy.contains("a", "Features").click();
      cy.hash().should("eq", "#features");

      cy.contains("a", "Pricing").click();
      cy.hash().should("eq", "#pricing");
    });
  });

  context("Waitlist Mode Disabled", () => {
    beforeEach(() => {
      // Mock IS_WAITLIST_MODE as false
      cy.intercept("**/constants*", (req) => {
        req.reply((res) => {
          if (res.body) {
            res.body = res.body.replace(
              /IS_WAITLIST_MODE\s*=\s*true/,
              "IS_WAITLIST_MODE = false"
            );
          }
        });
      });
      cy.visit("/");
    });

    it("should display the logo and brand name", () => {
      cy.get(".flex.items-center.gap-2").within(() => {
        cy.get(".w-5.h-1.bg-white").should("be.visible"); // The logo bar
        cy.contains("SlideFusion").should("be.visible");
      });
    });

    it("should show navigation links on desktop with testimonials", () => {
      // Use viewport to simulate desktop
      cy.viewport(1200, 800);

      cy.get("nav").within(() => {
        cy.contains("a", "Features").should("be.visible");
        cy.contains("a", "How It Works").should("be.visible");
        cy.contains("a", "Testimonials").should("be.visible");
        cy.contains("a", "Pricing").should("be.visible");
      });
    });

    it("should have sign in and sign up buttons", () => {
      cy.contains("a", "Sign In").should("be.visible");
      cy.contains("a", "Sign Up").should("be.visible");
    });

    it("should navigate to the correct section when clicked", () => {
      cy.contains("a", "Features").click();
      cy.hash().should("eq", "#features");

      cy.contains("a", "Testimonials").click();
      cy.hash().should("eq", "#testimonials");

      cy.contains("a", "Pricing").click();
      cy.hash().should("eq", "#pricing");
    });
  });
});
