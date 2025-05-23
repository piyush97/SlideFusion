describe("Home Page", () => {
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

    it("should display the hero section with CTA for waitlist", () => {
      cy.get("h1")
        .contains(/Create stunning presentations/i)
        .should("be.visible");
      cy.get("a")
        .contains(/Join Waitlist/i)
        .should("be.visible");
      cy.get("a")
        .contains(/Join Waitlist/i)
        .should("have.attr", "href", "/waitlist");
    });

    it("should display the features section", () => {
      cy.get("h2")
        .contains(/Features/i)
        .should("be.visible");

      // Check that all feature items are displayed
      cy.get('[id="features"]').within(() => {
        cy.contains("Creative AI Generation").should("be.visible");
        cy.contains("Theme Selection").should("be.visible");
        cy.contains("Smart Layouts").should("be.visible");
        cy.contains("Auto-Generated Images").should("be.visible");
      });
    });

    it('should display the "How It Works" section', () => {
      cy.get("h2")
        .contains(/How It Works/i)
        .should("be.visible");

      // Check that all steps are displayed
      cy.get('[id="how-it-works"]').within(() => {
        cy.contains("Enter Your Prompt").should("be.visible");
        cy.contains("Customize Your Slides").should("be.visible");
        cy.contains("Generate Visuals").should("be.visible");
      });
    });

    it("should not display the testimonials section in waitlist mode", () => {
      cy.contains(/Testimonials/i).should("not.exist");
    });

    it("should display the pricing section", () => {
      cy.get("h2")
        .contains(/Pricing/i)
        .should("be.visible");

      // Check for pricing tiers
      cy.get('[id="pricing"]').within(() => {
        cy.contains(/Free/i).should("be.visible");
        cy.contains(/Pro/i).should("be.visible");
        cy.contains(/Enterprise/i).should("be.visible");
      });
    });

    it("should display the footer with links", () => {
      cy.get("footer").should("be.visible");
      cy.get("footer")
        .contains(/SlideFusion/i)
        .should("be.visible");

      // Check for footer links
      cy.get("footer a").should("have.length.at.least", 3);
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

    it("should display the hero section with regular CTA", () => {
      cy.get("h1")
        .contains(/Create stunning presentations/i)
        .should("be.visible");
      cy.get("a")
        .contains(/Get Started/i)
        .should("be.visible");
    });

    it("should display the features section", () => {
      cy.get("h2")
        .contains(/Features/i)
        .should("be.visible");

      // Check that all feature items are displayed
      cy.get('[id="features"]').within(() => {
        cy.contains("Creative AI Generation").should("be.visible");
        cy.contains("Theme Selection").should("be.visible");
        cy.contains("Smart Layouts").should("be.visible");
        cy.contains("Auto-Generated Images").should("be.visible");
      });
    });

    it('should display the "How It Works" section', () => {
      cy.get("h2")
        .contains(/How It Works/i)
        .should("be.visible");

      // Check that all steps are displayed
      cy.get('[id="how-it-works"]').within(() => {
        cy.contains("Enter Your Prompt").should("be.visible");
        cy.contains("Customize Your Slides").should("be.visible");
        cy.contains("Generate Visuals").should("be.visible");
      });
    });

    it("should display the testimonials section when waitlist mode is disabled", () => {
      cy.contains(/Testimonials/i).should("be.visible");
    });

    it("should display the pricing section", () => {
      cy.get("h2")
        .contains(/Pricing/i)
        .should("be.visible");

      // Check for pricing tiers
      cy.get('[id="pricing"]').within(() => {
        cy.contains(/Free/i).should("be.visible");
        cy.contains(/Pro/i).should("be.visible");
        cy.contains(/Enterprise/i).should("be.visible");
      });
    });

    it("should display the footer with links", () => {
      cy.get("footer").should("be.visible");
      cy.get("footer")
        .contains(/SlideFusion/i)
        .should("be.visible");

      // Check for footer links
      cy.get("footer a").should("have.length.at.least", 3);
    });
  });
});
