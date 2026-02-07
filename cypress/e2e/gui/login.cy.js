describe('Login', () => {
  let userName, userPassword;
  before(() => {
    cy.env(['userName', 'userPassword']).then(({ userName: user, userPassword: password }) => {
      userName = user;
      userPassword = password;
    });
  });
  it('successfully', () => {
    const options = { cacheSession: false };
    cy.login(userName, userPassword, options);

    cy.get('.qa-user-avatar').should('be.visible');
  });
});
