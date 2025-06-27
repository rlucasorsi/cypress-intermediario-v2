Cypress.Commands.add(
  'login',
  (user = Cypress.env('user_name'), password = Cypress.env('user_password')) => {
    cy.visit('/users/sign_in');
    cy.get('#user_login').type(user);
    cy.get('#user_password').type(password, { log: false });
    cy.get('[data-qa-selector="sign_in_button"]').click();
  }
);
