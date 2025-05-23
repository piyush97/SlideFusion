import '@testing-library/cypress/add-commands';

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Custom command to mock authentication
Cypress.Commands.add('mockAuth', (options = {}) => {
  // Intercept Clerk auth requests
  cy.intercept('**/clerk/v1/client', {
    statusCode: 200,
    body: {
      response: {
        user: {
          id: 'test-user-id',
          email_addresses: [{ email_address: 'test@example.com' }],
          first_name: 'Test',
          last_name: 'User',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        session: {
          id: 'test-session-id',
          status: 'active',
          last_active_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        // Include any other needed properties
        ...options,
      },
    },
  }).as('clerkAuth');
  
  // Set localStorage to simulate authenticated state if needed
  localStorage.setItem('clerk-auth', JSON.stringify({
    isAuthenticated: true,
    userId: 'test-user-id',
  }));
});
