describe('Login', () => {
  it('Login com sucesso', () => {
    cy.login();
    cy.get('[data-qa-selector="welcome_title_content"]').should('be.visible');
  });
});
