import { faker } from '@faker-js/faker';

describe('Create Projects', () => {
  beforeEach(() => {
    const user = Cypress.env('user_name');
    const password = Cypress.env('user_password');
    const options = { cacheSession: true };

    cy.api_deleteProjects();
    cy.login(user, password, options);
  });

  it('Successfully', () => {
    const project = {
      name: `project-${faker.datatype.uuid()}`,
      description: faker.random.words(5),
    };

    cy.gui_createProject(project);

    cy.url().should(
      'be.equal',
      `${Cypress.config('baseUrl')}/${Cypress.env('user_name')}/${project.name}`
    );
    cy.contains(project.name).should('be.visible');
    cy.contains(project.description).should('be.visible');
  });
});
