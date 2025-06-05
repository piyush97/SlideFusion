describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display the navbar", () => {
    cy.get("nav").should("be.visible");
  });

  it("should display hero section with call to action button", () => {
    cy.contains("h1", /Create AI Presentations/i).should("be.visible");
    cy.get('a[href*="/presentation"]').should("be.visible");
  });

  it("should display features section", () => {
    cy.contains("h2", /Features/i).should("be.visible");
    cy.contains("Creative AI Generation").should("be.visible");
    cy.contains("Theme Selection").should("be.visible");
  });

  it("should display the pricing section", () => {
    cy.contains("h2", /Pricing/i).should("be.visible");
  });

  it("should display footer with relevant links", () => {
    cy.get("footer").should("be.visible");
  });
});
