import './gui_commands';
import './api_commands';
import './cli_commands';
// import 'cypress-plugin-api';

Cypress.ElementSelector.defaults({
  selectorPriority: ['data-cy'],
});

before(() => {
  const domain = Cypress.config('baseUrl').replace('http://', '');
  cy.exec(`ssh-keyscan -H ${domain} >> ~/.ssh/known_hosts`, { failOnNonZeroExit: false });
});