describe("Theme Functionality", () => {
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
      cy.visit("/");
    });

    it("should have dark theme by default", () => {
      // Check if html has dark class
      cy.get("html").should("have.class", "dark");
    });

    it("should toggle theme when theme button is clicked", () => {
      // Find and click the theme toggle button
      cy.get('button[aria-label="Toggle theme"]').click();

      // Check if the theme changed
      cy.get("html").should("not.have.class", "dark");

      // Toggle back
      cy.get('button[aria-label="Toggle theme"]').click();
      cy.get("html").should("have.class", "dark");
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
      cy.visit("/");
    });

    it("should have dark theme by default", () => {
      // Check if html has dark class
      cy.get("html").should("have.class", "dark");
    });

    it("should toggle theme when theme button is clicked", () => {
      // Find and click the theme toggle button
      cy.get('button[aria-label="Toggle theme"]').click();

      // Check if the theme changed
      cy.get("html").should("not.have.class", "dark");

      // Toggle back
      cy.get('button[aria-label="Toggle theme"]').click();
      cy.get("html").should("have.class", "dark");
    });

    it("should persist theme preference across page loads", () => {
      // Toggle to light theme
      cy.get('button[aria-label="Toggle theme"]').click();
      cy.get("html").should("not.have.class", "dark");

      // Reload the page
      cy.reload();

      // Theme preference should persist
      cy.get("html").should("not.have.class", "dark");

      // Reset to dark theme for other tests
      cy.get('button[aria-label="Toggle theme"]').click();
    });
  });
});
