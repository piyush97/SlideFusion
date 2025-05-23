describe("Authentication Flow", () => {
  // Test with waitlist mode enabled
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
    });

    it("should redirect to waitlist when accessing protected routes", () => {
      // Try to access a protected page
      cy.visit("/presentation");

      // Should be redirected to waitlist
      cy.url().should("include", "/waitlist");
    });

    it("should show the waitlist page", () => {
      cy.visit("/waitlist");
      cy.contains(/Join Our Waitlist/i).should("be.visible");
    });
  });

  // Test with waitlist mode disabled
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
    });

    it("should redirect to sign-in when accessing protected routes", () => {
      // Try to access a protected page
      cy.visit("/presentation");

      // Should be redirected to sign-in
      cy.url().should("include", "/signin");
    });

    it("should show the sign-in page", () => {
      cy.visit("/signin");
      cy.contains(/Sign in/i).should("be.visible");
    });

    it("should show the sign-up page", () => {
      cy.visit("/signup");
      cy.contains(/Sign up/i).should("be.visible");
    });
  });

  // Note: We'll mock actual auth in custom commands later
});
