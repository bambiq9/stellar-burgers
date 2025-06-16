describe('Testing burger constructor page', () => {
  const ingredientsToClick = [
    { name: 'Краторная булка N-200i', type: 'bun' },
    { name: 'Филе Люминесцентного тетраодонтимформа', type: 'main' },
    { name: 'Биокотлета из марсианской Магнолии', type: 'main' },
    { name: 'Соус традиционный галактический', type: 'sauce' }
  ];
  beforeEach(() => {
    cy.intercept(`api/ingredients`, {
      fixture: '../fixtures/ingredients.json'
    });
    cy.visit('/');
  });

  afterEach(() => {
    cy.clearAllLocalStorage();
    cy.clearAllCookies();
  });

  it('Should add bun, mains and sauce into the constructor', () => {
    ingredientsToClick.forEach((ingredient) => {
      cy.addIngredientToConstructor(ingredient.name);
      const type = ingredient.type === 'sauce' ? 'main' : ingredient.type;
      // Constructor section of an ingredient's type
      // should contain an ingredient with the same name
      cy.get(`[data-cy="constructor-${type}"]`).contains(ingredient.name);
    });

    // Constructor should have two buns (top, bottom)
    // and three ingredients total
    cy.get('[data-cy="constructor-bun"]').should('have.length', 2);
    cy.get('[data-cy="constructor-main"]').children().should('have.length', 3);
  });

  it('Should open ingredient modal', () => {
    const ingredientId = '643d69a5c3f7b9001cfa094a';
    const ingredientName = 'Сыр с астероидной плесенью';

    cy.get(`[data-cy="ingredient-main-${ingredientId}"]`).click();
    cy.get('#modals').within(() => {
      cy.contains(/детали ингредиента/i);
      cy.contains(ingredientName);
    });
    cy.location('pathname').should('equal', `/ingredients/${ingredientId}`);
  });

  it('Should close ingredient modal on close button click', () => {
    cy.get('[data-cy^="ingredient-sauce"]').first().click();
    cy.get('[data-cy="modal-close-btn"]').click();
    cy.get('#modals').children().should('have.length', 0);
  });

  it('Should close ingredient modal on overlay click', () => {
    cy.get('[data-cy^="ingredient-sauce"]').first().click();
    cy.get('[data-cy="modal-overlay"]').click({ force: true });
    cy.get('#modals').children().should('have.length', 0);
  });

  it('Should set access tokens and place an order', () => {
    const orderId = 9876543210;

    cy.intercept('api/auth/login', { fixture: '../fixtures/user.json' });
    cy.intercept('api/orders', { fixture: '../fixtures/orders.json' });
    cy.visit('/login');

    cy.get('[name="email"]').type('test@test.test');
    cy.get('[name="password"]').type('test123@@@');
    cy.get('form').submit();

    cy.getAllLocalStorage().should(() => {
      expect(localStorage.getItem('refreshToken')).to.eq('refreshTokenTest');
    });
    cy.getCookie('accessToken').should(
      'have.property',
      'value',
      'accessTokenTest'
    );

    ingredientsToClick.forEach((ingredient) =>
      cy.addIngredientToConstructor(ingredient.name)
    );
    cy.contains(/оформить заказ/i).click();

    cy.get('#modals').as('modal');
    cy.get('@modal').within(() => {
      cy.contains(/идентификатор заказа/i);
      cy.contains(orderId);
    });

    cy.get('[data-cy="modal-close-btn"]').click();
    cy.get('@modal').children().should('have.length', 0);
    cy.get('[data-cy="constructor-bun"]').should('not.exist');
    cy.get('[data-cy="constructor-main"]')
      .children()
      .should('have.length', 1)
      .contains(/выберите начинку/i);
  });
});
