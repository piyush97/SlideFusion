/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

// Augment the Cypress namespace to include custom commands
declare namespace Cypress {
  interface Chainable {
    // Add custom commands here
    mockAuth(options?: Record<string, unknown>): Chainable<void>;
  }
}
