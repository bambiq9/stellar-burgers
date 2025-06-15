/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    addIngredientsToConstructor(): Chainable<any>;
  }
}
