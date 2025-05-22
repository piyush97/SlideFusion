describe("Home Page CTA", () => {
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

    it("should display waitlist CTA button", () => {
      // Check for a waitlist CTA button
      cy.contains("a", /Join Waitlist/i).should("be.visible");
      cy.contains("a", /Join Waitlist/i).should(
        "have.attr",
        "href",
        "/waitlist"
      );
    });

    it("should navigate to waitlist page when CTA is clicked", () => {
      cy.contains("a", /Join Waitlist/i).click();
      cy.url().should("include", "/waitlist");
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

    it("should display regular CTA buttons", () => {
      // Check for regular CTA buttons
      cy.contains("a", /Get Started/i).should("be.visible");
      cy.contains("a", /Sign In/i).should("be.visible");
    });

    it("should navigate to sign-up page when Get Started is clicked", () => {
      cy.contains("a", /Get Started/i).click();
      cy.url().should("include", "/signup");
    });

    it("should navigate to sign-in page when Sign In is clicked", () => {
      cy.contains("a", /Sign In/i).click();
      cy.url().should("include", "/signin");
    });
  });
});
