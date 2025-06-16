/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    addIngredientToConstructor(ingredient: string): Chainable<any>;
  }
}
