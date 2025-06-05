describe("Protected Presentation Routes", () => {
  context("Waitlist Mode Enabled", () => {
    beforeEach(() => {
      // Mock IS_WAITLIST_MODE as true
      cy.intercept("**/constants*", (req) => {
        req.reply((res) => {
          if (res.body) {
            res.body = res.body.replace(
              /IS_WAITLIST_MODE\s*=\s*false/,
              "IS_WAITLIST_MODE = true",
            );
          }
        });
      });
    });

    context("Unauthenticated user", () => {
      beforeEach(() => {
        // No auth mock, visit as unauthenticated user
        cy.visit("/presentation");
      });

      it("should redirect to waitlist page", () => {
        cy.url().should("include", "/waitlist");
      });
    });

    context("Authenticated user", () => {
      beforeEach(() => {
        // Mock authentication
        cy.mockAuth();
        cy.visit("/presentation");
      });

      it("should still redirect to waitlist page even when authenticated", () => {
        cy.url().should("include", "/waitlist");
      });
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
              "IS_WAITLIST_MODE = false",
            );
          }
        });
      });
    });

    context("Unauthenticated user", () => {
      beforeEach(() => {
        // No auth mock, visit as unauthenticated user
        cy.visit("/presentation");
      });

      it("should redirect to sign-in page", () => {
        cy.url().should("include", "/signin");
      });
    });

    context("Authenticated user", () => {
      beforeEach(() => {
        // Mock authentication
        cy.mockAuth();
        cy.visit("/presentation");
      });

      it("should allow access to presentation page", () => {
        // This test might fail initially since our mock may not fully simulate Clerk auth
        // Will need refinement based on actual implementation
        cy.url().should("include", "/presentation");
      });
    });
  });
});
