import { faker } from '@faker-js/faker';

describe('Create Projects', () => {
  let userName, userPassword;

  before(() => {
    cy.env(['userName', 'userPassword']).then(({ userName: user, userPassword: password }) => {
      userName = user;
      userPassword = password;
    });
  });

  beforeEach(() => {
    const options = { cacheSession: true };
    cy.api_deleteProjects();
    cy.login(userName, userPassword, options);
  });

  it('Successfully', () => {
    const project = {
      name: `project-${faker.datatype.uuid()}`,
      description: faker.random.words(5),
    };

    cy.gui_createProject(project);

    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/${userName}/${project.name}`);
    cy.contains(project.name).should('be.visible');
    cy.contains(project.description).should('be.visible');
  });
});
