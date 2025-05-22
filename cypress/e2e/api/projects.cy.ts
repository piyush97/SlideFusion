describe("Projects API", () => {
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

      // Mock authentication
      cy.mockAuth();
    });

    it("should not allow access to projects API in waitlist mode", () => {
      // Intercept the API request to check if it's even made
      cy.intercept("GET", "**/api/projects", (req) => {
        req.reply({
          statusCode: 403,
          body: { error: "Waitlist mode active" },
        });
      }).as("getProjectsBlocked");

      // Visit the page
      cy.visit("/presentation");

      // We should be redirected to waitlist instead of making API calls
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

      // Mock authentication
      cy.mockAuth();
    });

    it("should fetch projects for authenticated users", () => {
      // Load fixture data
      cy.fixture("projects.json").then((projectsData) => {
        // Intercept the API request
        cy.intercept("GET", "**/api/projects", {
          statusCode: 200,
          body: projectsData,
        }).as("getProjects");

        // Visit the page that would trigger this API call
        cy.visit("/presentation");

        // Wait for the API call
        cy.wait("@getProjects");
      });
    });

    it("should handle API errors gracefully", () => {
      // Intercept with an error response
      cy.intercept("GET", "**/api/projects", {
        statusCode: 500,
        body: { error: "Server error" },
      }).as("getProjectsError");

      // Visit the page
      cy.visit("/presentation");

      // Wait for the API call
      cy.wait("@getProjectsError");
    });
  });
});
