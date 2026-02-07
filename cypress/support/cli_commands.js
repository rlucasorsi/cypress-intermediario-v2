Cypress.Commands.add('cloneViaSSH', (project) => {
  const domain = Cypress.config('baseUrl').replace('http://', '');

  cy.env(['userName', 'sshKeyPath']).then((env) => {
    const { userName, sshKeyPath } = env;
        
    cy.exec(
      `mkdir -p cypress/downloads && GIT_SSH_COMMAND="ssh -i ${sshKeyPath} -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null" git clone git@${domain}:${userName}/${project.name}.git cypress/downloads/${project.name}`
    );
  });
});