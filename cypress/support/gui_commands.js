Cypress.Commands.add('login', (user = null, password = null, { cacheSession = true } = {}) => {
  cy.env(['userName', 'userPassword']).then(({ userName, userPassword }) => {
    const loginUser = user ?? userName;
    const loginPassword = password ?? userPassword;

    const performLogin = () => {
      cy.visit('/users/sign_in');
      cy.get('[data-qa-selector="login_field"]').type(loginUser);
      cy.get('[data-qa-selector="password_field"]').type(loginPassword, { log: false });
      cy.get('[data-qa-selector="sign_in_button"]').click();
    };

    const validate = () => {
      cy.visit('/');
      cy.location('pathname', { timeout: 4000 }).should('not.eq', '/users/sign_in');
    };

    const options = {
      cacheAcrossSpecs: true,
      validate,
    };

    if (cacheSession) {
      cy.session(loginUser, performLogin, options);
    } else {
      performLogin();
    }
  });
});

Cypress.Commands.add('logout', () => {
  cy.get('[data-qa-selector="user_menu"]').click();
  cy.get('[data-qa-selector="sign_out_link"]').click();
});

Cypress.Commands.add('gui_createProject', (project) => {
  cy.visit('/projects/new');

  cy.get('#project_name').type(project.name);
  cy.get('#project_description').type(project.description);
  cy.get('.qa-initialize-with-readme-checkbox').check();
  cy.contains('Create project').click();
});

Cypress.Commands.add('gui_createIssue', (issue) => {
  cy.env(['userName']).then(({ userName }) => {
    cy.visit(`/${userName}/${issue.project.name}/issues/new`);

    cy.get('#issue_title').type(issue.title);
    cy.get('#issue_description').type(issue.description);
    cy.contains('Submit issue').click();
  });
});

Cypress.Commands.add('gui_setLabelOnIssue', (label) => {
  cy.get('.qa-edit-link-labels').click();
  cy.contains(label.name).click();
  cy.get('body').click();
});

Cypress.Commands.add('gui_setMilestoneOnIssue', (milestone) => {
  cy.get('.block.milestone .edit-link').click();
  cy.contains(milestone.title).click();
});
