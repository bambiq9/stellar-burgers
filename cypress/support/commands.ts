/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('addIngredientsToConstructor', () => {
  const buttonText = /добавить/i;

  // Add the first bun
  cy.get(`[data-cy^="ingredient-bun"]`)
    .first()
    .within(() => {
      cy.contains(buttonText).click();
    });

  // Should replace with the second bun
  cy.get(`[data-cy^="ingredient-bun"]`)
    .last()
    .within(() => {
      cy.contains(buttonText).click();
    });

  // Add two ingredients and one sauce
  cy.get(`[data-cy^="ingredient-main"]`)
    .first()
    .within(() => {
      cy.contains(buttonText).click();
    });

  cy.get(`[data-cy^="ingredient-main"]`)
    .last()
    .within(() => {
      cy.contains(buttonText).click();
    });

  cy.get(`[data-cy^="ingredient-sauce"]`)
    .first()
    .within(() => {
      cy.contains(buttonText).click();
    });
});
