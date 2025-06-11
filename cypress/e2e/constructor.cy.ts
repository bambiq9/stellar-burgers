describe('проверяем доступность приложения', function () {
  it('сервис должен быть доступен по адресу localhost:5173', function () {
    cy.visit('http://localhost:4000/');

    const buttonText = 'добавить';
    const options = { matchCase: false };

    cy.contains('булки', options).next().contains(buttonText, options).click();
    cy.contains('начинки', options).next().contains(buttonText, options).click();
    cy.contains('соусы', options).next().contains(buttonText, options).click();
  });
});
