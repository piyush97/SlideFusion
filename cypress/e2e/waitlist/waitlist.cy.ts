describe("Waitlist Page", () => {
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
      cy.visit("/waitlist");
    });

    it("should display the waitlist header", () => {
      cy.contains("h1", /join our waitlist/i).should("be.visible");
    });

    it("should display the SlideFusion logo and name", () => {
      cy.contains("span", /SlideFusion/i).should("be.visible");
      cy.get('a[href="/"]').should("be.visible");
    });

    it("should display the waitlist form", () => {
      // Check for the Clerk waitlist form container
      cy.get(".p-6.border").should("be.visible");
    });

    it("should have a footer with copyright information", () => {
      cy.get("footer").should("be.visible");
      cy.contains(new Date().getFullYear().toString()).should("be.visible");
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

      // Try to visit waitlist page when waitlist mode is disabled
      cy.visit("/waitlist", { failOnStatusCode: false });
    });

    it("should redirect from waitlist page when waitlist mode is disabled", () => {
      // Should be redirected to home or show 404
      cy.url().should("not.include", "/waitlist");
    });
  });
});
