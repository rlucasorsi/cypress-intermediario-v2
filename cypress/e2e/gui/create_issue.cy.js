import { faker } from '@faker-js/faker';

describe('Create issue', () => {
  const issue = {
    title: `issue-${faker.datatype.uuid()}`,
    description: faker.random.words(5),
    project: {
      name: `project-${faker.datatype.uuid()}`,
      description: faker.random.words(5),
    },
  };
  beforeEach(() => {
    cy.api_deleteProjects();
    cy.login();
    cy.gui_createProject(issue.project);
  });
  it('Successfully', () => {
    cy.gui_createIssue(issue);

    cy.get('.issue-details').should('contain', issue.title).and('contain', issue.description);
  });
});
